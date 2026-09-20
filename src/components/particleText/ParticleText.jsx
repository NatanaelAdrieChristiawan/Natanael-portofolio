import { useEffect, useRef } from 'react';
import './ParticleText.css';

/* ─── pure helpers (defined once, outside component) ─── */
const hexToRgb = hex => {
  const c = hex.replace('#', '');
  if (!/^[0-9a-fA-F]{6}$/.test(c)) return null;
  return {
    r: parseInt(c.slice(0, 2), 16),
    g: parseInt(c.slice(2, 4), 16),
    b: parseInt(c.slice(4, 6), 16),
  };
};

const mixRgb = (a, b, t) => ({
  r: Math.round(a.r + (b.r - a.r) * t),
  g: Math.round(a.g + (b.g - a.g) * t),
  b: Math.round(a.b + (b.b - a.b) * t),
});

const rgbCss = ({ r, g, b }) => `rgb(${r},${g},${b})`;

const clamp  = (v, lo, hi) => v < lo ? lo : v > hi ? hi : v;
const easeOut3 = t => 1 - (1 - t) ** 3;

const resolveFontSize = (value, container, weight, family) => {
  if (typeof value === 'number') return value;
  const el = document.createElement('span');
  el.textContent = 'M';
  Object.assign(el.style, {
    position: 'absolute', visibility: 'hidden', pointerEvents: 'none',
    fontSize: value, fontWeight: String(weight), fontFamily: family,
  });
  container.appendChild(el);
  const px = parseFloat(getComputedStyle(el).fontSize) || 96;
  el.remove();
  return px;
};

const waitForFonts = async font => {
  if (!('fonts' in document)) return;
  try { await document.fonts.load(font); } catch (_) {}
  await document.fonts.ready;
};

/* ─── component ─── */
const ParticleText = ({
  text          = 'React Bits',
  particleSize  = 2,
  density       = 5,           // higher = fewer particles (lighter)
  color         = '#ffffff',
  highlightColor= '#8b5cf6',
  scatter       = 160,
  gatherDuration= 1200,
  stagger       = 300,
  pointerRepel  = 36,
  repelRadius   = 100,
  idleDrift     = 0,            // 0 = no perpetual RAF after gather done
  trigger       = 'mount',      // 'mount' | 'hover' | 'click'
  fontSize      = 'clamp(2.2rem, 5.2vw, 76px)',
  fontWeight    = 700,
  fontFamily    = 'inherit',
  letterSpacing = '0.035em',
  textAlign     = 'auto',
  className     = '',
  style         = {},
}) => {
  const containerRef = useRef(null);
  const canvasRef    = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas    = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    /* ── state ── */
    let raf         = null;
    let resizeRaf   = null;
    let w = 0, h = 0, dpr = 1;
    let particles   = [];
    let gatherStart = 0;
    let gathering   = false;
    let buildId     = 0;
    let reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

    /* pointer state — separate object avoids object spread GC pressure */
    let ptrX = -9999, ptrY = -9999;
    let ptrSmoothX = 0,  ptrSmoothY = 0;
    let ptrActive = false;

    /* ── RAF management ─────────────────────────────────────────── */
    /*  We STOP the loop when idle (nothing moving), and RESTART it   */
    /*  only when there's actual work (gathering or pointer active).   */
    const stopLoop = () => {
      if (raf !== null) { cancelAnimationFrame(raf); raf = null; }
    };

    const startLoop = () => {
      if (raf === null) raf = requestAnimationFrame(tick);
    };

    /* ── scatter → gather ───────────────────────────────────────── */
    const startGather = (fromScatter = true) => {
      if (!particles.length) return;
      const spread = reducedMotion ? 0 : scatter;
      const now    = performance.now();

      for (const p of particles) {
        if (fromScatter) {
          const angle = p.seed * Math.PI * 2;
          const dist  = spread * (0.35 + p.depth * 0.75);
          p.x = p.tx + Math.cos(angle) * dist + (p.depth - 0.5) * spread * 0.55;
          p.y = p.ty + Math.sin(angle) * dist + (p.seed  - 0.5) * spread * 0.55;
        }
        p.sx    = p.x;
        p.sy    = p.y;
        p.delay = reducedMotion ? 0 : p.seed * stagger;
      }
      gatherStart = now;
      gathering   = true;
      startLoop();
    };

    /* ── draw one particle ──────────────────────────────────────── */
    const drawParticle = (p, alpha) => {
      ctx.globalAlpha = alpha;
      ctx.fillStyle   = p.color;
      const s = p.size;
      if (s <= 2.5) {
        // fillRect is faster than arc for tiny squares
        ctx.fillRect(p.x - s * 0.5, p.y - s * 0.5, s, s);
      } else {
        ctx.beginPath();
        ctx.arc(p.x, p.y, s * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    /* ── main tick ──────────────────────────────────────────────── */
    const tick = now => {
      ctx.clearRect(0, 0, w, h);

      /* smooth pointer */
      ptrSmoothX += (ptrX - ptrSmoothX) * 0.15;
      ptrSmoothY += (ptrY - ptrSmoothY) * 0.15;

      let stillAnimating = false;

      /* No shadow blur — far too expensive per-frame on canvas */
      ctx.shadowBlur = 0;

      for (const p of particles) {
        let bx = p.tx, by = p.ty;
        let progress = 1;

        /* --- gather phase --- */
        if (gathering) {
          const local = (now - gatherStart - p.delay) / Math.max(1, reducedMotion ? 1 : gatherDuration);
          progress = clamp(local, 0, 1);
          const eased = easeOut3(progress);
          bx = p.sx + (p.tx - p.sx) * eased;
          by = p.sy + (p.ty - p.sy) * eased;
          if (progress < 1) stillAnimating = true;
        }

        /* --- idle drift (only if enabled) --- */
        if (!gathering && idleDrift > 0 && !reducedMotion) {
          const t = now * 0.001;
          bx += Math.sin(t * 0.9 + p.seed * 10) * idleDrift * p.depth;
          by += Math.cos(t * 0.75 + p.depth * 10) * idleDrift * p.depth;
          stillAnimating = true;
        }

        /* --- pointer repel --- */
        if (ptrActive && !reducedMotion && pointerRepel > 0) {
          const dx = bx - ptrSmoothX;
          const dy = by - ptrSmoothY;
          const d2 = dx * dx + dy * dy;
          if (d2 < repelRadius * repelRadius && d2 > 0) {
            const d     = Math.sqrt(d2);
            const force = (1 - d / repelRadius) ** 2 * pointerRepel;
            bx += (dx / d) * force;
            by += (dy / d) * force;
            stillAnimating = true;
          }
        }

        /* lerp towards target (bx/by) */
        const follow = reducedMotion ? 1 : 0.22;
        p.x += (bx - p.x) * follow;
        p.y += (by - p.y) * follow;

        /* detect if this particle is still settling toward its rest position */
        if (!stillAnimating) {
          const dx = p.x - p.tx;
          const dy = p.y - p.ty;
          if (dx * dx + dy * dy > 0.25) stillAnimating = true; // >0.5px displaced
        }

        drawParticle(p, clamp(0.35 + progress * 0.65, 0, 1));
      }

      ctx.globalAlpha = 1;

      /* mark gather done */
      if (gathering && !stillAnimating) gathering = false;

      if (stillAnimating) {
        raf = requestAnimationFrame(tick);
      } else {
        /* truly idle — stop loop, draw clean static frame */
        raf = null;
        renderStaticFrame();
      }
    };

    /* draw all particles at rest — one shot, no RAF */
    const renderStaticFrame = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        drawParticle(p, 1);
      }
      ctx.globalAlpha = 1;
    };

    /* ── text sampling ──────────────────────────────────────────── */
    const sampleText = async () => {
      const cid  = ++buildId;
      const rect = container.getBoundingClientRect();
      w = Math.floor(rect.width);
      h = Math.floor(rect.height);
      if (w <= 0 || h <= 0) return;

      dpr = Math.min(devicePixelRatio || 1, 2);
      canvas.width  = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const computed        = getComputedStyle(container);
      const resolvedFamily  = fontFamily === 'inherit' ? (computed.fontFamily || 'sans-serif') : fontFamily;
      let   resolvedSize    = resolveFontSize(fontSize, container, fontWeight, resolvedFamily);
      let   font            = `${fontWeight} ${resolvedSize}px ${resolvedFamily}`;

      await waitForFonts(font);
      if (cid !== buildId) return;

      const off    = document.createElement('canvas');
      const offCtx = off.getContext('2d', { willReadFrequently: true });
      if (!offCtx) return;

      const lines = String(text || ' ').split('\n');
      offCtx.font = font;

      const calcTracking = sz => {
        if (typeof letterSpacing === 'number') return letterSpacing;
        if (typeof letterSpacing === 'string') {
          if (letterSpacing.endsWith('em')) return parseFloat(letterSpacing) * sz;
          if (letterSpacing.endsWith('px')) return parseFloat(letterSpacing);
          return parseFloat(letterSpacing) || 0;
        }
        return 0;
      };

      let trackingPx = calcTracking(resolvedSize);

      const measureLine = l => {
        const chars = Array.from(l);
        if (!chars.length) return 0;
        let totalW = 0;
        for (let idx = 0; idx < chars.length; idx++) {
          totalW += offCtx.measureText(chars[idx]).width;
          if (idx < chars.length - 1) {
            let extra = 0;
            const c = chars[idx];
            const next = chars[idx + 1];
            // Optical kerning breather for tight pairs where strokes collide (e.g. 'rn', 'ro', 'rm', 'ra')
            if (c === 'r' && (next === 'n' || next === 'o' || next === 'm' || next === 'a')) {
              extra = Math.max(1.5, resolvedSize * 0.035);
            }
            totalW += trackingPx + extra;
          }
        }
        return totalW;
      };

      let maxW = 0;
      for (const l of lines) {
        const mw = measureLine(l);
        if (mw > maxW) maxW = mw;
      }

      const maxTextW = w * 0.95;
      if (maxW > maxTextW) {
        resolvedSize = Math.max(16, resolvedSize * (maxTextW / maxW));
        font         = `${fontWeight} ${resolvedSize}px ${resolvedFamily}`;
        trackingPx   = calcTracking(resolvedSize);
        await waitForFonts(font);
        if (cid !== buildId) return;
        offCtx.font = font;
        maxW        = 0;
        for (const l of lines) {
          const mw = measureLine(l);
          if (mw > maxW) maxW = mw;
        }
      }

      const lineMetrics = lines.map(l => {
        const width = Math.max(1, Math.ceil(measureLine(l)));
        return {
          text   : l,
          width,
          ascent : Math.ceil(resolvedSize * 0.78),
          descent: Math.ceil(resolvedSize * 0.22),
        };
      });

      const maxAsc  = Math.max(...lineMetrics.map(m => m.ascent));
      const maxDesc = Math.max(...lineMetrics.map(m => m.descent));
      const lh      = Math.round(resolvedSize * 1.18);
      const totalH  = (lines.length - 1) * lh + maxAsc + maxDesc;
      const pad     = Math.max(8, Math.ceil(resolvedSize * 0.08));
      const maxMW   = Math.max(...lineMetrics.map(m => m.width));

      off.width  = Math.ceil(maxMW + pad * 2);
      off.height = Math.ceil(totalH + pad * 2);
      offCtx.clearRect(0, 0, off.width, off.height);
      offCtx.font         = font;
      offCtx.textBaseline = 'alphabetic';
      offCtx.fillStyle    = '#fff';

      const effAlign = textAlign === 'auto'
        ? (computed.textAlign === 'center' ? 'center' : 'left')
        : textAlign;

      for (let i = 0; i < lineMetrics.length; i++) {
        const m = lineMetrics[i];
        let xPos = pad;
        if (effAlign === 'center') xPos = pad + (maxMW - m.width) / 2;
        else if (effAlign === 'right') xPos = pad + (maxMW - m.width);

        const yPos = pad + maxAsc + i * lh;
        offCtx.textAlign = 'left';

        const chars = Array.from(m.text);
        let curX = xPos;
        for (let cIdx = 0; cIdx < chars.length; cIdx++) {
          const char = chars[cIdx];
          offCtx.fillText(char, curX, yPos);
          let extra = 0;
          if (cIdx < chars.length - 1) {
            const next = chars[cIdx + 1];
            if (char === 'r' && (next === 'n' || next === 'o' || next === 'm' || next === 'a')) {
              extra = Math.max(1.5, resolvedSize * 0.035);
            }
          }
          curX += offCtx.measureText(char).width + trackingPx + extra;
        }
      }

      const imgData = offCtx.getImageData(0, 0, off.width, off.height);
      const targets = [];
      const step    = Math.max(2, Math.ceil(density));   // ceil = fewer pixels = lighter

      let oxOff = 0;
      if (effAlign === 'center') oxOff = Math.floor((w - off.width) / 2);
      else if (effAlign === 'right') oxOff = Math.floor(w - off.width);
      const oyOff = Math.floor((h - off.height) / 2);

      for (let y = 0; y < off.height; y += step) {
        for (let x = 0; x < off.width; x += step) {
          if (imgData.data[(y * off.width + x) * 4 + 3] > 40) {
            targets.push({ x: oxOff + x, y: oyOff + y });
          }
        }
      }

      if (!targets.length) { particles = []; return; }

      const primary   = hexToRgb(color)         || { r: 255, g: 255, b: 255 };
      const highlight = hexToRgb(highlightColor) || { r: 139, g:  92, b: 246 };

      particles = targets.map((t, i) => {
        const seed  = ((Math.sin(i * 9999.13) + 1) * 0.5);
        const depth = ((Math.cos(i * 333.77)  + 1) * 0.5);
        return {
          tx: t.x, ty: t.y,
          x:  t.x, y:  t.y,
          sx: t.x, sy: t.y,
          seed, depth, delay: 0,
          size : Math.max(1, particleSize * (0.8 + depth * 0.45)),
          color: rgbCss(mixRgb(primary, highlight, depth * 0.65)),
        };
      });

      /* only scatter→gather on first mount (trigger='mount') */
      if (trigger === 'mount') {
        startGather(true);
      } else {
        /* 'hover'/'click' — place at rest until triggered */
        renderStaticFrame();
      }
    };

    const queueSample = () => {
      if (resizeRaf !== null) cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(() => { resizeRaf = null; sampleText(); });
    };

    /* ── pointer handlers ───────────────────────────────────────── */
    const onMove = e => {
      // On touch devices, swiping is for scrolling the page — ignore to avoid scroll lag or text distortion
      if (e.pointerType === 'touch') return;

      const r = canvas.getBoundingClientRect();
      ptrX = e.clientX - r.left;
      ptrY = e.clientY - r.top;
      if (!ptrActive) {
        ptrActive   = true;
        ptrSmoothX  = ptrX;
        ptrSmoothY  = ptrY;
      }
      startLoop();   // ensure RAF is running while pointer is inside
    };

    const onLeave = () => {
      ptrActive = false;
      ptrX = -9999; ptrY = -9999;
      /* let the loop run one more frame to settle, then it will stop itself */
    };

    const onEnter = e => {
      if (e.pointerType === 'touch') return;
      onMove(e);
      /* trigger='hover' re-scatters; 'mount' only repels */
      if (trigger === 'hover') startGather(true);
    };

    const onClick = () => {
      if (trigger === 'click') startGather(true);
    };

    /* reduced-motion listener */
    const mqReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    const onRMChange      = ev => { reducedMotion = ev.matches; sampleText(); };
    mqReducedMotion?.addEventListener('change', onRMChange);

    /* resize observer */
    const ro = new ResizeObserver(queueSample);
    ro.observe(container);

    canvas.addEventListener('pointerenter', onEnter);
    canvas.addEventListener('pointermove',  onMove);
    canvas.addEventListener('pointerleave', onLeave);
    canvas.addEventListener('click',        onClick);

    sampleText();

    return () => {
      buildId++;
      ro.disconnect();
      stopLoop();
      if (resizeRaf !== null) { cancelAnimationFrame(resizeRaf); resizeRaf = null; }
      mqReducedMotion?.removeEventListener('change', onRMChange);
      canvas.removeEventListener('pointerenter', onEnter);
      canvas.removeEventListener('pointermove',  onMove);
      canvas.removeEventListener('pointerleave', onLeave);
      canvas.removeEventListener('click',        onClick);
    };
  }, [
    text, particleSize, density, color, highlightColor,
    scatter, gatherDuration, stagger, pointerRepel, repelRadius,
    idleDrift, trigger, fontSize, fontWeight, fontFamily, letterSpacing, textAlign,
  ]);

  const sr = String(text || '').replace(/\n/g, ' ');

  return (
    <div
      ref={containerRef}
      className={`particle-text ${className}`.trim()}
      style={style}
      aria-label={sr}
    >
      <canvas ref={canvasRef} className="particle-text__canvas" aria-hidden="true" />
      <h1 className="particle-text__sr">{sr}</h1>
    </div>
  );
};

export default ParticleText;
