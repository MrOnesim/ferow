# Design Brief: Pantheon

**Purpose:** Professional institutional website for a youth political movement (Pantheon) targeting 18–35 year-olds, students, leaders, and African diaspora.

**Tone:** Modern, premium, institutional. Inspired by international NGOs and political movements. Bold, credible, inspiring action.

**Differentiation:** Dark-mode-first with royal gold accents and high-contrast white text. Geometric precision with premium spacing. Institutional credibility meets youth energy.

## Color Palette

| Token | OKLCH | Hex | Usage |
|-------|-------|-----|-------|
| `--primary` | 0.75 0.12 85 | #C9A84C | CTA buttons, hero accents, active states |
| `--accent` | 0.82 0.10 85 | #D4B76A | Secondary highlights, hover states, icons |
| `--background` | 0.07 0.008 270 | #0B0B0B | Page background, dominant dark zones |
| `--card` | 0.10 0.01 270 | #111111 | Card backgrounds, elevated surfaces |
| `--foreground` | 0.97 0 0 | #FFFFFF | Primary text, high contrast |
| `--muted-foreground` | 0.62 0.012 270 | #9CA3AF | Secondary text, labels, quiet UI |
| `--border` | 0.18 0.01 270 | #1F2937 | Subtle dividers, component borders |

## Typography

| Layer | Font | Weight | Size | Usage |
|-------|------|--------|------|-------|
| Display | Poppins | Bold (700) | 2.25rem–3.5rem | Section headings, hero title |
| Display | Poppins | Semi-bold (600) | 1.5rem–2rem | Card titles, subsections |
| Body | Inter | Regular (400) | 1rem | Body copy, descriptions |
| Body | Inter | Medium (500) | 1rem | Labels, emphasis |
| Mono | System | Regular | 0.875rem | Code, data display |

## Structural Zones

| Zone | Background | Border | Usage |
|------|-----------|--------|-------|
| Header/Navbar | `--card` (#111111) | top border subtle | Sticky navigation with gold CTA |
| Hero | `--background` (#0B0B0B) | none | Full viewport, centered text, gradient overlay |
| Content Sections | `--background` (#0B0B0B) | none | Default page zones, alternating card sections |
| Cards | `--card` (#111111) | border-border/20 | Elevated content, values, activities, blog |
| Member Directory | `--background` (#0B0B0B) | none | Grid of member cards with photo, name, title, bio. Responsive: 1 col mobile, 2 col tablet, 3-4 col desktop |
| Gallery Admin | `--card` (#111111) | border-border/20 | Photo grid preview (3 cols), file upload input, delete buttons per photo |
| Admin Access Tab | `--card` (#111111) | border-border/20 | Table of current admins (president/assistant), add assistant form, revoke buttons |
| Form Inputs | `--input` (#0D0D0D) | border-border | Dark input backgrounds, gold ring focus |
| Footer | `--card` (#111111) | border-t border-border/20 | Contact, social, copyright |

## Component Patterns

- **Buttons:** Primary (solid #C9A84C, dark text, px-6 py-3, rounded-lg). Secondary (outlined white, border-2, hover darkens). All have transition-smooth.
- **Cards:** bg-card, border-border/20, rounded-xl, shadow-elevated. Hover: slight lift via transform or opacity. Icons inside cards styled with accent gold.
- **Member Cards:** Photo with 4:5 aspect ratio, name (text-lg font-semibold), title (text-sm muted), bio (text-sm body). Hover: lift 8px, border accent glow, enhanced shadow.
- **Gallery Admin:** Dark form with file inputs (gold ring focus), photo grid preview (3 columns on desktop, responsive), delete button (red/destructive), reorder drag handles (if applicable).
- **Admin Access Tab:** List of current admins (table: president + assistant roles), add assistant form (principal input, create button), revoke buttons on each row (red/destructive).
- **Section Headings:** text-4xl font-display font-bold, text-foreground, centered, text-balance. Optional gold underline accent (width-12 h-1 mx-auto mt-2 gradient-accent).
- **Statistics:** Large bold numbers in accent gold (#C9A84C), labels in muted-foreground. Counters use Framer Motion count-up.
- **Form Elements:** Dark backgrounds, white text, rounded-lg, gold focus ring (ring-2 ring-accent), font-body.
- **Badges/Tags:** Small bg-primary/20 or bg-accent/20, text-primary, rounded-full, px-3 py-1, font-medium.
- **Admin Status Badge:** bg-primary/20, text-primary, px-2.5 py-0.5, rounded-full, text-xs font-medium. Indicates active/inactive admin status.

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
- Focus rings visible (ring-2 ring-primary, 2px offset)
- Semantic HTML, ARIA labels on dynamic content
- Form labels associated with inputs

## Signature Detail

**Gold accent glow:** Cards and CTAs use subtle gradient from primary (#C9A84C) to accent (#D4B76A) on hover. Gradient-accent utility provides reusable 135deg gradient. Footer and borders subtly enforce institutional credibility through aligned geometric spacing.

## Anti-Patterns to Avoid

- Generic light grey backgrounds (use dark #0B0B0B only)
- Blue or purple accents (royal gold palette only)
- Weak shadows (use shadow-elevated: 0 12px 24px -4px rgba(0,0,0,0.5))
- Rounded corners everywhere (use rounded-lg on cards, rounded-full on badges, square on inputs)
- Rainbow color usage (gold + white + black only)
