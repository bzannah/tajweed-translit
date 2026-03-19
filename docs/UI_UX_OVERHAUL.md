# UI/UX Overhaul — From Image Viewer to Living Book

## The Problem

The current UI is a flat image pasted on a blank background. There is no atmosphere, no tactile feel, no sense that the user is holding and reading sacred scripture. It feels like a PDF viewer, not a Mushaf.

## The Vision

When a user opens Quran Tajweed Transliteration, they should feel like they just opened a beautiful, leather-bound Tajweed Mushaf on a warm reading desk. Every interaction — turning a page, opening the sidebar, tapping a bookmark — should feel intentional, weighted, and respectful of the sacred content.

## Design Direction: "Warm Study" Aesthetic

Think: a scholar's reading room at night. Warm desk lamp. Rich leather book cover. Thick cream pages that catch the light. The soft whisper of a page turning.

---

## 1. ATMOSPHERE & BACKGROUND

### Current
- Flat #121212 background. Dead. Empty.

### Target
- **Layered background with depth:**
  - Base: deep warm charcoal (#1a1614) — not pure black, not grey, warm
  - Subtle leather/linen texture overlay at 3-5% opacity (CSS noise pattern, not an image)
  - Very subtle radial gradient from center: slightly lighter where the book sits, as if a desk lamp is illuminating the reading area
  - Faint vignette at edges (darker corners) to draw focus to the book

### Implementation
```css
.reading-surface {
  background-color: #1a1614;
  background-image:
    radial-gradient(ellipse at 50% 45%, rgba(214,168,83,0.04) 0%, transparent 70%),
    url("data:image/svg+xml,..."); /* subtle noise texture */
}
```

---

## 2. THE BOOK CONTAINER

### Current
- Page images floating in space. No frame, no context.

### Target
- **A visible book object sitting on the reading surface:**
  - Outer shadow: large, soft, warm — the book casts a shadow on the desk
  - Book "cover" border: thin dark border with very subtle rounded corners (2-3px)
  - Inner page area: slightly inset, cream/off-white tinted border simulating page edges
  - **Spine/binding gutter** in dual-page mode: a thin vertical shadow/gradient down the center where pages meet the binding
  - **Page thickness effect**: stacked page edges visible on the outer side (right edge in single mode, both outer edges in dual) — 3-4px of layered slight offsets suggesting pages beneath

### Book Shadow Stack
```css
.book-container {
  box-shadow:
    /* Page stack edges */
    2px 2px 0 0 #d4c5a9,
    4px 4px 0 0 #c9b898,
    /* Book shadow on desk */
    8px 12px 30px rgba(0,0,0,0.4),
    2px 4px 10px rgba(0,0,0,0.3);
  border-radius: 3px 8px 8px 3px; /* spine side flat, outer edge slightly rounded */
}
```

### Binding Gutter (dual-page mode)
```css
.book-gutter {
  width: 16px;
  background: linear-gradient(
    to right,
    rgba(0,0,0,0.15) 0%,
    rgba(0,0,0,0.05) 30%,
    rgba(0,0,0,0) 50%,
    rgba(0,0,0,0.05) 70%,
    rgba(0,0,0,0.15) 100%
  );
  /* Also: subtle inner shadow on both page edges meeting the gutter */
}
```

### Page Edge Stacking (the "thickness" of the book)
On the outer edge of the book (the side opposite the spine), show 3-4 offset lines that suggest stacked pages:
```css
.page-stack-right::after {
  content: '';
  position: absolute;
  right: -6px;
  top: 4px;
  bottom: 4px;
  width: 6px;
  background: linear-gradient(to right,
    #e8dcc8 0px, #e8dcc8 1px,
    #e0d4be 1px, #e0d4be 2px,
    #d8ccb4 2px, #d8ccb4 3px,
    transparent 3px
  );
  border-radius: 0 2px 2px 0;
}
```

---

## 3. PAGE TURN ANIMATION

### Current
- Instant swap. No transition. Feels like clicking slides.

### Target
- **Realistic 3D page flip animation** that simulates turning a physical page.
- Two tiers: full 3D flip for capable devices, graceful slide fallback for low-power devices.

### Tier 1: 3D Page Flip (desktop + modern mobile)
- The page lifts from the right edge, rotates around the Y axis (like turning a real page), revealing the next page underneath
- Duration: 500-600ms
- Easing: custom cubic-bezier for natural paper feel — fast lift, slow settle
- During the flip, the back of the turning page shows a subtle shadow/darkened version
- The new page is already positioned beneath, revealed as the old page flips over
- CSS `perspective`, `transform-style: preserve-3d`, `backface-visibility`

```css
@keyframes page-flip-forward {
  0% {
    transform: perspective(2000px) rotateY(0deg);
    box-shadow: 0 0 0 rgba(0,0,0,0);
  }
  30% {
    transform: perspective(2000px) rotateY(-15deg);
    box-shadow: 10px 0 40px rgba(0,0,0,0.15);
  }
  100% {
    transform: perspective(2000px) rotateY(-180deg);
    box-shadow: 0 0 0 rgba(0,0,0,0);
  }
}

.page-turning {
  transform-origin: left center;
  animation: page-flip-forward 600ms cubic-bezier(0.645, 0.045, 0.355, 1) forwards;
}
```

### Tier 2: Graceful Slide (fallback)
- Page slides out left while new page slides in from right
- Subtle scale effect: departing page scales down slightly (0.97)
- Duration: 300ms
- Easing: ease-out

```css
@keyframes page-slide-out {
  to {
    transform: translateX(-30px) scale(0.97);
    opacity: 0;
  }
}

@keyframes page-slide-in {
  from {
    transform: translateX(30px) scale(0.97);
    opacity: 0;
  }
}
```

### Direction Awareness
- Next page: flip/slide from RIGHT to LEFT (turning forward)
- Previous page: flip/slide from LEFT to RIGHT (turning backward)
- Keyboard and swipe both trigger the same directional animation

### Performance Guardrails
- Use `will-change: transform` only during animation, remove after
- Detect `prefers-reduced-motion` — disable flip, use instant swap
- On devices with < 4GB RAM (if detectable), default to slide instead of 3D flip

---

## 4. PAGE SURFACE TREATMENT

### Current
- Raw WebP image with no styling.

### Target
- **Pages should look like physical paper:**
  - Cream/ivory tint overlay (very subtle — 2-3% warm wash) so pages don't look like raw digital images
  - Faint paper texture overlay (CSS or SVG noise at very low opacity)
  - Inner shadow on all four edges — pages in a book have a slight shadow at the edges from the cover
  - Extremely subtle page curl effect in the bottom-right corner (CSS pseudo-element with gradient)
  - On hover (desktop only): the tiniest lift — 1px upward transform with enhanced shadow, suggesting the page responds to your attention

### Inner Page Shadows
```css
.page-image-wrapper {
  position: relative;
}
.page-image-wrapper::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  box-shadow: inset 0 0 30px rgba(0,0,0,0.08);
  border-radius: 1px;
}
```

### Subtle Page Curl
```css
.page-image-wrapper::before {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  width: 40px;
  height: 40px;
  background: linear-gradient(
    -135deg,
    rgba(0,0,0,0.04) 0%,
    transparent 50%
  );
  pointer-events: none;
  z-index: 2;
}
```

---

## 5. SIDEBAR DESIGN UPGRADE

### Current
- Functional but plain. No character.

### Target
- **The sidebar should feel like the ornate index page of a Mushaf:**
  - Header area: subtle Islamic geometric pattern as a background (CSS-generated, very low opacity)
  - Gold (#d4a853) ornamental divider between header and tab area
  - Tab underline: not a flat line but a subtle ornamental stroke
  - Surah items: on hover, a warm glow rather than a flat colour change
  - Active surah: gold left border accent (3px) + warm background tint
  - Scrollbar: thin, gold-tinted, rounded
  - Bottom fade: content fades to transparent at the bottom of the scroll area

### Ornamental Divider (CSS-only)
```css
.ornamental-divider {
  height: 1px;
  background: linear-gradient(
    to right,
    transparent 0%,
    #d4a853 20%,
    #d4a853 50%,
    #d4a853 80%,
    transparent 100%
  );
  position: relative;
}
.ornamental-divider::before {
  content: '◆';
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: #d4a853;
  font-size: 10px;
  background: var(--color-sidebar);
  padding: 0 8px;
}
```

---

## 6. BOTTOM BAR REFINEMENT

### Current
- Functional but flat.

### Target
- Frosted glass effect (backdrop-blur) so the reading surface shows through faintly
- Navigation buttons (Next/Previous) with subtle arrow animation on hover (arrow slides 3px)
- Action buttons with a soft glow on active state (when the panel they control is open)
- Thin gold top-border accent line (matching the sidebar divider style)

---

## 7. LOADING & TRANSITION STATES

### Current
- None. Pages either appear or they don't.

### Target
- **Page skeleton:** While a page image loads, show a pulsing cream rectangle with faint horizontal lines (simulating text lines on a page). NOT a generic spinner.
- **First load:** The book "opens" — a subtle scale-up from 0.95 to 1.0 with fade-in, as if the book is being placed on the desk and opened.
- **Resume reading toast:** "Continuing from Page 42 — Surah Al-Baqara" appears as a warm, translucent toast at the bottom, fades after 3 seconds.

---

## 8. MICRO-INTERACTIONS

- **Bookmark toggle:** When bookmarking, the icon fills with gold AND a tiny gold particle burst (3-4 particles, 200ms, CSS-only)
- **Panel open/close:** Panels slide up with a slight overshoot and settle (spring easing), not linear
- **Sidebar open:** Slides in with backdrop fade, content area subtly shifts right on desktop
- **Theme toggle:** Smooth 300ms colour transition on all themed elements (no jarring snap)
- **Tab switch:** Active tab underline slides horizontally to the new position (not jump-cut)

---

## 9. LIGHT THEME ADJUSTMENTS

The light theme should feel like reading in a bright, airy study:
- Background: warm parchment (#f5f0e8) not cold white
- Book container: more pronounced outer shadow (the book pops off the light surface)
- Reading surface: subtle linen texture more visible than in dark mode
- Pages: no cream overlay needed (already light), but keep the inner shadows and page curl

---

## 10. TYPOGRAPHY TOUCHES

- Page number display: use a serif font (Georgia) for the page number below the book — this is not UI, it's content context
- Sidebar surah names: slightly increase letter-spacing (0.01em) for elegance
- Bottom bar labels: uppercase with letter-spacing (0.05em) for a refined look
- Toast messages: italic serif for the surah name within the toast

---

## PRIORITY ORDER

1. **Background atmosphere** (biggest visual impact, easiest to implement)
2. **Book container with shadows and binding** (transforms the feel instantly)
3. **Page turn animation** (the signature interaction)
4. **Page surface treatment** (inner shadows, curl, texture)
5. **Sidebar ornamental design**
6. **Micro-interactions** (polish layer)
7. **Loading states**
8. **Bottom bar glass effect**
