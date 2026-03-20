# Research: Dark-First Modern UI for Quiz Application

## Tailwind CSS v4 Theme Configuration

**Decision**: Use `@theme inline` directive in `globals.css` to define all design tokens as CSS custom properties  
**Rationale**: Tailwind v4 removed `tailwind.config.js` in favor of CSS-first configuration. The `@theme inline` directive generates utility classes from CSS custom properties, enabling `bg-base`, `text-primary`, `bg-answer-ruby` etc.  
**Alternatives considered**: Inline hex values in every class (rejected — no theming, hard to maintain), CSS modules (rejected per constitution constraint)

## Dark-First Color Palette

**Decision**: Slate-based dark palette (#0f172a → #1e293b → #334155) with indigo accent  
**Rationale**: Slate provides neutral dark tones without the harshness of pure black. Indigo (#6366f1) is already in the app's CSS variables and provides good contrast on dark backgrounds. Used by Linear, Vercel, and other modern dark UIs.  
**Alternatives considered**: Pure black backgrounds (rejected — too harsh, causes eye strain), warm dark tones (rejected — doesn't match quiz energy), purple-heavy (rejected — too similar to current gradient)

## Answer Button Colors (Jewel Tones)

**Decision**: Ruby #dc2626, Sapphire #2563eb, Amber #d97706, Emerald #059669  
**Rationale**: These are Tailwind's 600-level palette colors which pass WCAG AA contrast (4.5:1) against dark card backgrounds (#1e293b). They are distinct enough for color-blind users when paired with position labels (A/B/C/D or icons).  
**Alternatives considered**: Tailwind 500-level (rejected — marginal contrast on dark), fully saturated (rejected — too bright, clashes with dark theme), pastel (rejected — fails contrast)

## Toast Notification Pattern

**Decision**: Fixed-position bottom-center toasts with auto-dismiss (4s) and optional action button  
**Rationale**: Bottom-center is the least intrusive position and works on both mobile and desktop. Auto-dismiss prevents notification pile-up during fast quiz gameplay. Aligns with the spec's "non-blocking" requirement.  
**Alternatives considered**: Top-right (rejected — hidden by mobile browser chrome), modal dialogs (rejected — blocks flow per spec), inline errors (rejected — not chosen per clarification)

## Timer Visual Representation

**Decision**: Circular SVG progress ring with stroke-dasharray animation  
**Rationale**: Circular timers are the Kahoot standard and provide intuitive urgency feedback. SVG allows smooth animation without JavaScript frame-by-frame updates (CSS `stroke-dashoffset`). Color shifts from accent → warning (amber) → error (red) as time decreases.  
**Alternatives considered**: Linear bar (acceptable but less iconic), numeric-only (rejected per spec FR-003)

## Micro-interaction Approach

**Decision**: CSS transitions and keyframe animations only (no animation library)  
**Rationale**: Keeps bundle size minimal. Tailwind v4 supports arbitrary keyframes via `@keyframes` in `globals.css`. For a quiz app with simple state transitions, CSS animations are sufficient and performant.  
**Alternatives considered**: Framer Motion (rejected — adds dependency for simple transitions), React Spring (rejected — overkill), GSAP (rejected — too heavy for this use case)

## Component Architecture

**Decision**: Extract monolithic room page into ~10 focused components, each handling one visual concern  
**Rationale**: The current 421-line room page is unmaintainable. Component extraction enables independent development, testing, and reuse. Follows React composition patterns.  
**Alternatives considered**: Keep monolithic (rejected — violates maintainability), over-fragment into atoms (rejected — unnecessary complexity for this scope)
