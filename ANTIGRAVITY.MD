# UI/UX Redesign & Content Implementation

## Objective

Redesign the website into a modern, premium, and highly interactive experience inspired by the visual quality, storytelling, typography, and animation style of **Studio Namma**.

### References

* **Layout & Design Inspiration**

  * https://studionamma.com/

* **Existing Website (Content Source)**

  * https://huggingface.co/buckets/upi-0/exx/resolve/uploads/index.html

* **GSAP Animation References**

  * https://animation-addons.com/blog/gsap-animation-examples-effects/

---

# General Requirements

The implementation should follow these principles:

* Modern editorial layout.
* Premium typography hierarchy.
* Generous whitespace.
* Smooth scrolling.
* Fully responsive.
* Preserve the existing branding and color palette unless improvements are required for readability.
* Support both Dark and Light themes while maintaining consistency.
* Use **GSAP** as the primary animation library.
* Use **ScrollTrigger** throughout the experience.
* Optimize performance.
* Animations should play once unless looping is intentionally required.
* Respect `prefers-reduced-motion`.
* Every section should have its own entrance animation.
* Maintain elegant, cinematic transitions.
* Avoid excessive animation that reduces usability.

---

# Content Source

Extract and adapt all content from:

https://huggingface.co/buckets/upi-0/exx/resolve/uploads/index.html

The implementation should **analyze and recreate the content**, not copy the existing HTML structure.

Populate the following sections:

* About
* Berita
* Jadwal
* Polling
* Tag
* Tautan

---

# Design Direction

The overall visual direction should be inspired by:

https://studionamma.com/

Characteristics:

* Premium portfolio aesthetic
* Editorial composition
* Grid-based layout
* Large typography
* Smooth scrolling
* High-end interaction design
* Image reveal transitions
* Layered animation
* Storytelling-based content flow
* Minimal but expressive interface

> **Important:** Do **not** clone the reference website. Use it only as inspiration to create an original implementation.

---

# Animation Requirements

All animations must use **GSAP**.

Required plugins/effects:

* ScrollTrigger
* SplitText
* Text Replace
* Text Hover Image Effect
* Image Reveal
* Clip-path transitions
* Fade + Translate
* Scale transitions
* Stagger animations
* Scrub animations (where appropriate)

Animations should feel premium, cinematic, and polished.

---

# About Section

Populate content from the source website.

Create a premium editorial layout.

### Animation

* ScrollTrigger
* Text Hover Image Effect

Reference:

https://animation-addons.com/blog/gsap-animation-examples-effects/

### Requirements

* Important keywords become interactive.
* Hovering a keyword reveals a floating image.
* Images are loaded from the local `/public` folder.
* Each keyword displays a contextually relevant image.
* Floating image follows the cursor smoothly.
* Apply subtle rotation and easing.
* Fade + scale reveal.
* Smooth hide animation on mouse leave.
* GPU-accelerated transforms only.

Example mapping:

| Keyword    | Image          |
| ---------- | -------------- |
| Devacctto   | devacto.png  |
| deadline   | deadline.jpg   |
| produksi | produksi.jpg |
| Community  | community.jpg  |

---

# Berita Section

Populate all news from the source website.

Use a premium editorial card layout.

### Animation

* ScrollTrigger
* Text Replace

Reference:

https://animation-addons.com/blog/gsap-animation-examples-effects/

### Requirements

* Headline uses Text Replace animation.
* Cards reveal sequentially.
* Image scale on hover.
* Premium hover interactions.
* Animated buttons.
* Responsive grid.

---

# Jadwal Section

Populate schedule data from the source website.

Create a modern timeline/calendar experience.

### Animation

* ScrollTrigger

### Requirements

* Progressive timeline reveal.
* Active event highlighting.
* Animated date badges.
* Sequential card reveal.
* Animated connecting line.
* Responsive timeline.
* Desktop layout inspired by modern event websites.

---

# Polling Section

Populate polling information from the source website.

Redesign into a premium polling interface.

### Animation

* ScrollTrigger

### Requirements

* Fade-up container.
* Sequential option animation.
* Animated progress bars.
* Animated percentage counters.
* Button micro-interactions.
* Frontend-only live result simulation if backend is unavailable.

Visual style:

* Minimal
* Modern
* Premium

---

# Tag Section

Populate all tags from the source website.

### Animation

* SplitText

Reference:

https://animation-addons.com/blog/gsap-animation-examples-effects/

### Requirements

* Character-by-character reveal.
* Stagger animation.
* Hover enlargement.
* Smooth background transition.
* Animated pill design.

---

# Tautan Section

Populate useful links from the source website.

### Animation

* ScrollTrigger
* Text Replace

Reference:

https://animation-addons.com/blog/gsap-animation-examples-effects/

### Requirements

* Animated entrance.
* Text Replace title animation.
* Sliding arrow icon.
* Card lift hover.
* External link indicator.
* Premium card design.

---

# Global UI Enhancements

## Custom Cursor

* Custom cursor
* Magnetic hover
* Dynamic cursor labels

---

## Image Reveal

Use:

* Clip-path
* Mask animation
* Scale transitions

---

## Buttons

Buttons should include:

* Magnetic hover
* Smooth easing
* Hover lift
* Subtle glow
* Optional ripple effect

---

## Typography

* Large editorial typography
* Strong visual hierarchy
* Modern font pairing

---

## Section Transition

Every section should include:

* Fade
* Translate
* Blur reduction
* Stagger reveal
* Smooth easing

---

## Scroll Experience

Use:

* ScrollTrigger pinning
* Scrub animations
* Progress-driven animation
* Subtle layered parallax

Avoid excessive parallax.

---

# Performance

The implementation should:

* Lazy-load images.
* Optimize GSAP timelines.
* Kill ScrollTriggers on component unmount.
* Avoid layout shifts.
* Use GPU-accelerated transforms.
* Be fully responsive.

---

# Accessibility

* Semantic HTML
* Proper heading hierarchy
* Keyboard accessible
* Focus states
* Alt text on images
* Sufficient color contrast
* Respect `prefers-reduced-motion`

---

# Data Management

## Important

Do **not** hardcode content directly inside components.

All extracted content must first be stored inside reusable JavaScript/TypeScript objects or arrays, then rendered dynamically.

## Recommended Structure

```text
src/
│
├── data/
│   └── content.ts
│saya 
├── components/
│   ├── About.tsx
│   ├── Berita.tsx
│   ├── Jadwal.tsx
│   ├── Polling.tsx
│   ├── Tag.tsx
│   └── Tautan.tsx
```

Example:

```js
export const aboutData = { ... }

export const newsData = [ ... ]

export const scheduleData = [ ... ]

export const pollingData = { ... }

export const tagData = [ ... ]

export const linksData = [ ... ]
```

### Requirements

* Never hardcode text inside JSX.
* Separate data from presentation.
* Store all website content inside `src/data/content.js`.
* Components should consume data via imports.
* Render collections using `.map()`.
* Use descriptive property names.
* Store image paths using relative references to `/public`.
* Future content updates should only require editing the data file.
* UI components should remain unchanged when content changes.

---

# Code Quality

* Production-ready code.
* Reusable components.
* Modular architecture.
* Maintainable folder structure.
* Consistent naming conventions.
* Clean TypeScript types/interfaces.
* No duplicated logic.
* No unnecessary re-renders.
* Proper cleanup for all GSAP timelines.

---

# Expected Deliverable

Produce production-ready code that:

* Extracts and adapts content from the provided source website.
* Stores **all website content in structured variables** inside `src/data/content.js`.
* Renders every section dynamically from those variables.
* Redesigns the experience with a premium Studio Namma-inspired aesthetic.
* Implements all requested GSAP animations.
* Uses reusable and modular components.
* Follows modern frontend best practices.
* Is responsive, accessible, performant, and maintainable.

The final result should feel like a premium interactive editorial website with cinematic animations and polished user interactions, rather than a conventional corporate website.
