# DESIGN.md - Design Tokens & Visual Language System

## 1. Palette & Color System (Prestige Dark Tech)

```css
:root {
  /* Neutral Grounds */
  --bg-primary: #0c0c1d;         /* Deep void background */
  --bg-secondary: #111132;       /* Subtle dark depth for section transitions */
  --bg-card: rgba(255, 255, 255, 0.03); /* Translucent glass card base */
  --bg-card-hover: rgba(255, 255, 255, 0.06);

  /* Borders & Dividers */
  --border-subtle: rgba(255, 255, 255, 0.08);
  --border-active: rgba(139, 92, 246, 0.35);

  /* Typography Colors */
  --text-primary: #f8fafc;       /* Highest contrast text for headings */
  --text-secondary: #94a3b8;     /* Clean slate neutral for body copy */
  --text-muted: #64748b;         /* Subtle metadata and timestamps */

  /* Single Locked Accent (Electric Violet / Lavender) */
  --accent-primary: #8b5cf6;     /* Primary interactive accent */
  --accent-light: #a78bfa;       /* Secondary accent / pill badges */
  --accent-glow: #c4b5fd;        /* High-light particle glow */
  --accent-bg-tint: rgba(139, 92, 246, 0.12); /* Translucent accent pill ground */
}
```

### Color Rules
- **Single Accent Constraint**: The primary accent across all sections (Hero, About, Portfolio, Contact) is strictly Electric Violet (`#8b5cf6` / `#a78bfa`).
- **No Clashing Accents**: Banned: raw un-tokenized colors (`orange`, `gray`), arbitrary gold gradients on headers.
- **Text Contrast**: All body text meets WCAG AA contrast ratio (> 4.5:1) against `#0c0c1d`.

---

## 2. Typography System

- **Font Family**: `"DM Sans", -apple-system, BlinkMacSystemFont, sans-serif`
- **Heading Hierarchy**:
  - **Hero Main Heading**: `clamp(2.2rem, 5.2vw, 76px)` (desktop), `clamp(1.7rem, 6.8vw, 32px)` (mobile), weight: 700.
  - **Section Super-titles / Accents**: `0.875rem` (14px), uppercase, `letter-spacing: 0.2em`, color: `#a78bfa`, weight: 600.
  - **Section Titles (H2)**: `font-size: 3rem` (48px) desktop, `2rem` (32px) mobile, color: `#f8fafc`, weight: 700.
  - **Project Titles**: `font-size: 57px` desktop, `32px` mobile, weight: 700.
  - **Body / Descriptions**: `16px - 18px`, `line-height: 1.6`, color: `#94a3b8`, weight: 400.

---

## 3. Motion & Animation Tokens

- **Deceleration Curve**:
  - `cubic-bezier(0.16, 1, 0.3, 1)` (*easeOutExpo*) — smooth, natural, mathematical deceleration.
  - **Banned**: Bouncy overshoot curves (`cubic-bezier(0.34, 1.56, 0.64, 1)`) and elastic oscillations.
- **Durations**:
  - Micro-interactions (hover, active): `0.25s - 0.3s`.
  - Layout reveals & page transitions: `0.6s - 0.8s`.
  - Particle text scatter/gather: `1.1s` with staggered entry.
- **Reduced Motion**:
  - Respect `prefers-reduced-motion: reduce` by zeroing out particle scatter and disabling continuous ambient floating lines animations.

---

## 4. Spacing, Grid & Layout

- **Base Unit**: 8px grid (4px, 8px, 16px, 24px, 32px, 48px, 64px, 80px).
- **Max Container Width**: `1250px` centered with fluid `padding: 0 20px`.
- **Viewport Height Stability**: Uses `calc(var(--vh, 1vh) * 100)` dynamically calculated in `App.jsx` to prevent mobile address bar jump.
- **Cards**: Bento grid layout, `border-radius: 20px - 24px`, glassmorphism backdrop filter `blur(16px)`.

---

## 5. Anti-Slop Discipline Checklist
- [x] No gradient-clipped text on headings.
- [x] No bouncy/elastic CSS transition easings.
- [x] No raw un-tokenized color declarations.
- [x] 100% WCAG AA contrast on form inputs and interactive buttons.
