# Design Brief: FEROW

**Purpose:** Professional institutional website for a youth political movement (FEROW) targeting 18–35 year-olds, students, leaders, and African diaspora.

**Tone:** Modern, premium, institutional. Inspired by international NGOs and political movements. Bold, credible, inspiring action.

**Differentiation:** Dark-mode-first with deep navy blue accents and high-contrast white text. Geometric precision with premium spacing. Institutional credibility meets youth energy.

## Color Palette

| Token | OKLCH | Hex | Usage |
|-------|-------|-----|-------|
| `--primary` | 0.42 0.12 254 | #1E3A8A | CTA buttons, hero accents, active states |
| `--accent` | 0.60 0.18 254 | #3B82F6 | Secondary highlights, hover states, icons |
| `--background` | 0.05 0 0 | #0B0B0B | Page background, dominant dark zones |
| `--card` | 0.08 0 0 | #111827 | Card backgrounds, elevated surfaces |
| `--foreground` | 1.0 0 0 | #FFFFFF | Primary text, high contrast |
| `--muted-foreground` | 0.70 0.02 254 | #9CA3AF | Secondary text, labels, quiet UI |
| `--border` | 0.15 0 0 | #1F2937 | Subtle dividers, component borders |

## Typography

| Layer | Font | Weight | Size | Usage |
|-------|------|--------|------|-------|
| Display | General Sans (Poppins-like) | Bold (700) | 2.25rem–3.5rem | Section headings, hero title |
| Display | General Sans | Semi-bold (600) | 1.5rem–2rem | Card titles, subsections |
| Body | DM Sans (Inter-like) | Regular (400) | 1rem | Body copy, descriptions |
| Body | DM Sans | Medium (500) | 1rem | Labels, emphasis |
| Mono | System | Regular | 0.875rem | Code, data display |

## Structural Zones

| Zone | Background | Border | Usage |
|------|-----------|--------|-------|
| Header/Navbar | `--card` (#111827) | top border subtle | Sticky navigation with blue CTA |
| Hero | `--background` (#0B0B0B) | none | Full viewport, centered text, gradient overlay |
| Content Sections | `--background` (#0B0B0B) | none | Default page zones, alternating card sections |
| Cards | `--card` (#111827) | border-border/20 | Elevated content, values, activities, blog |
| Form Inputs | `--input` (#0D0D0D) | border-border | Dark input backgrounds, blue ring focus |
| Footer | `--card` (#111827) | border-t border-border/20 | Contact, social, copyright |

## Component Patterns

- **Buttons:** Primary (solid #1E3A8A, white text, px-6 py-3, rounded-lg). Secondary (outlined white, border-2, hover darkens). All have transition-smooth.
- **Cards:** bg-card, border-border/20, rounded-xl, shadow-elevated. Hover: slight lift via transform or opacity. Icons inside cards styled with accent blue.
- **Section Headings:** text-4xl font-display font-bold, text-foreground, centered, text-balance. Optional blue underline accent (width-12 h-1 mx-auto mt-2 gradient-accent).
- **Statistics:** Large bold numbers in accent blue (#3B82F6), labels in muted-foreground. Counters use Framer Motion count-up.
- **Form Elements:** Dark backgrounds, white text, rounded-lg, blue focus ring (ring-2 ring-accent), font-body.
- **Badges/Tags:** Small bg-primary/20 or bg-accent/20, text-accent, rounded-full, px-3 py-1, font-medium.

## Motion & Interactions

| Element | Animation | Timing | Trigger |
|---------|-----------|--------|---------|
| Page sections | fade-in then slide-up | 0.5s / 0.6s | On page load |
| Hero CTA button | hover: opacity-90 | transition-smooth (0.3s) | On hover |
| Card hover | shadow-glow, slight scale | 0.3s ease-out | On hover/focus |
| Counter stats | count-up animation | 1.5s–2s | Scroll into view (Framer Motion) |
| Links & interactive | transition-smooth | 0.3s | Default for all interactive |
| Navbar scroll | fade-in, sticky positioning | instant on scroll | Page scroll down |

## Spacing & Rhythm

- **Container:** 2rem max padding, center-aligned
- **Section gaps:** 5rem (vertical), 2rem (horizontal)
- **Card padding:** 1.5rem (default), 2rem (large cards)
- **Text hierarchy:** H1–H4 line-height 1.2–1.4, body line-height 1.6, letter-spacing +0.5px for headings

## Responsive Breakpoints

- **Mobile:** 320px–640px (vertical stack, 1 column, compact padding)
- **Tablet:** 641px–1024px (2 columns, moderate spacing)
- **Desktop:** 1025px+ (3–4 columns, full spacing)

## Accessibility & Contrast

- All foreground-on-background has WCAG AAA contrast (white #FFFFFF on #0B0B0B = 21:1)
- All interactive elements have 44px minimum hit target
- Focus rings visible (ring-2 ring-accent, 2px offset)
- Semantic HTML, ARIA labels on dynamic content
- Form labels associated with inputs

## Signature Detail

**Blue accent glow:** Cards and CTAs use subtle gradient from primary (#1E3A8A) to accent (#3B82F6) on hover. Gradient-accent utility provides reusable 135deg gradient. Footer and borders subtly enforce institutional credibility through aligned geometric spacing.

## Anti-Patterns to Avoid

- Generic light grey backgrounds (use dark #0B0B0B only)
- Purple/pink gradients (navy blue palette only)
- Weak shadows (use shadow-elevated: 0 12px 24px -4px rgba(0,0,0,0.3))
- Rounded corners everywhere (use rounded-lg on cards, rounded-full on badges, square on inputs)
- Rainbow color usage (blue + white + black only)
