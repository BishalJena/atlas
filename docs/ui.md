# AIDP Compute Arena — Design System

> A holistic design document for a professional, minimal Web3 dashboard.

---

## Part I: Philosophy & Vision

### The Problem with "AI Vibe Coded" UI

Most AI-generated interfaces share recognizable patterns:
- Overuse of glassmorphism and blur effects
- Rainbow gradients and neon glows everywhere
- Emoji icons instead of proper iconography
- Animation on every element
- Dark themes with excessive accent colors
- No breathing room (whitespace)

These patterns signal **"template"** rather than **"crafted"**.

### Our Design Philosophy

```
"The best interface is the one you don't notice."
— Don Norman
```

| Principle | Meaning |
|-----------|---------|
| **Invisible Design** | UI should facilitate the task, not draw attention to itself |
| **Earned Complexity** | Show complexity only when the user needs it |
| **Honest Simplicity** | Simple ≠ simplistic; every element has purpose |
| **Respectful of Time** | Users find what they need in under 5 seconds |
| **Trust Through Clarity** | Transparency in data builds trust in the platform |

### Design Vision for AIDP

AIDP Compute Arena should feel like a **professional infrastructure tool** used by serious developers and enterprises—not a flashy demo. Reference products:

| Product | What to Learn |
|---------|---------------|
| **Vercel Dashboard** | Data density without clutter, monochrome with single accent |
| **Linear** | Premium feel, smooth interactions, focused typography |
| **Phantom Wallet** | Web3 done right—clean, trustworthy, accessible |
| **Stripe Dashboard** | Complex data made scannable |
| **Raycast** | Functional minimalism, speed-first |

---

## Part II: Design Tokens

### Color System

#### Semantic Colors
```css
:root {
  /* Backgrounds */
  --bg-primary: #0A0A0B;      /* Main background */
  --bg-secondary: #111113;    /* Elevated surfaces */
  --bg-tertiary: #18181B;     /* Cards, inputs */
  
  /* Text */
  --text-primary: #FAFAFA;    /* Headings, important */
  --text-secondary: #A1A1AA;  /* Body text */
  --text-muted: #52525B;      /* Labels, captions */
  
  /* Borders */
  --border-subtle: rgba(255, 255, 255, 0.06);
  --border-default: rgba(255, 255, 255, 0.1);
  --border-strong: rgba(255, 255, 255, 0.2);
  
  /* Accent (use sparingly) */
  --accent-primary: #3B82F6;  /* Primary actions */
  --accent-hover: #2563EB;    /* Hover state */
  
  /* Status */
  --status-success: #10B981;  /* Online, positive */
  --status-warning: #F59E0B;  /* Busy, pending */
  --status-error: #EF4444;    /* Offline, errors */
}
```

#### Color Usage Rules
1. **Backgrounds**: Maximum 3 shades of dark gray
2. **Accent color**: Only for interactive elements (buttons, links)
3. **Status colors**: Only for status indicators, never decorative
4. **No gradients** except on the primary CTA button

### Typography

```css
:root {
  /* Font Families */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: 'JetBrains Mono', 'SF Mono', Consolas, monospace;
  
  /* Font Sizes */
  --text-xs: 0.75rem;     /* 12px - labels */
  --text-sm: 0.875rem;    /* 14px - body small */
  --text-base: 1rem;      /* 16px - body */
  --text-lg: 1.125rem;    /* 18px - emphasis */
  --text-xl: 1.25rem;     /* 20px - card titles */
  --text-2xl: 1.5rem;     /* 24px - section headers */
  --text-3xl: 1.875rem;   /* 30px - page titles */
  
  /* Font Weights */
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  
  /* Line Heights */
  --leading-tight: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
  
  /* Letter Spacing */
  --tracking-tight: -0.025em;
  --tracking-normal: 0;
}
```

#### Typography Rules
1. **Headings**: Inter Semibold, tight letter-spacing
2. **Body**: Inter Regular, 1.5 line-height
3. **Metrics/Data**: JetBrains Mono Medium
4. **Labels**: Inter Medium, uppercase optional for small labels
5. **Maximum 2 font families** total

### Spacing System

```css
:root {
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
}
```

#### Spacing Rules
1. **Components**: Minimum 16px internal padding
2. **Sections**: 32-48px between major sections
3. **Related items**: 8-12px spacing
4. **Touch targets**: Minimum 44px on mobile

### Border Radius

```css
:root {
  --radius-sm: 6px;     /* Small elements */
  --radius-md: 8px;     /* Buttons, inputs */
  --radius-lg: 12px;    /* Cards */
  --radius-xl: 16px;    /* Large containers */
  --radius-full: 9999px; /* Pills, avatars */
}
```

---

## Part III: Component Specifications

### Cards

```
Structure:
┌─────────────────────────────────────┐
│  padding: 24px                      │
│  background: var(--bg-tertiary)     │
│  border: 1px solid var(--border-subtle)
│  border-radius: 12px                │
│  box-shadow: none                   │
└─────────────────────────────────────┘

Hover State:
- border-color: var(--border-default)
- transition: 150ms ease

Active/Selected:
- border-color: var(--accent-primary)
- background: rgba(59, 130, 246, 0.05)
```

### Buttons

#### Primary Button
```
background: var(--accent-primary)
color: white
padding: 12px 24px
border-radius: 8px
font-weight: 500
font-size: 14px

Hover: background darkens 10%
Active: scale(0.98)
Disabled: opacity 0.5, cursor not-allowed
```

#### Secondary Button
```
background: transparent
border: 1px solid var(--border-default)
color: var(--text-secondary)
padding: 12px 24px
border-radius: 8px

Hover: background rgba(255,255,255,0.05)
```

#### Ghost Button
```
background: transparent
border: none
color: var(--text-secondary)
padding: 8px 12px

Hover: color var(--text-primary)
```

### Form Inputs

```
background: var(--bg-tertiary)
border: 1px solid var(--border-default)
border-radius: 8px
padding: 12px 16px
color: var(--text-primary)
font-size: 14px

Focus:
- border-color: var(--accent-primary)
- outline: none
- box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1)

Placeholder: var(--text-muted)
```

### Status Indicators

```
Online:  8px circle, var(--status-success), subtle glow
Busy:    8px circle, var(--status-warning)
Offline: 8px circle, var(--status-error)

With pulse animation only for "processing" states
```

---

## Part IV: Map Component Specification

### Technology
- **Library**: `react-simple-maps` (lightweight, SVG-based)
- **Geography**: Natural Earth TopoJSON (110m resolution)
- **Projection**: geoMercator or geoNaturalEarth1

### Visual Design
```
Countries:
  fill: #1a1a1e
  stroke: rgba(255, 255, 255, 0.03)
  stroke-width: 0.5

Ocean/Background:
  fill: transparent (inherits page background)

Graticules (optional):
  stroke: rgba(255, 255, 255, 0.02)
```

### Node Markers
```
Default:
  - Circle: 10px diameter
  - Fill: var(--status-success) for online
  - Border: 2px solid rgba(255,255,255,0.2)
  
Hover:
  - Scale: 1.2
  - Box-shadow: 0 0 12px rgba(16, 185, 129, 0.4)
  
Selected:
  - Scale: 1.3
  - Border: 2px solid white
  
Tooltip (on hover):
  - Background: var(--bg-secondary)
  - Border: 1px solid var(--border-default)
  - Padding: 8px 12px
  - Font-size: 12px
  - Shows: Node name, GPU model, latency
```

### Connection Lines
```
- Stroke: rgba(59, 130, 246, 0.2)
- Stroke-width: 1px
- Stroke-dasharray: 4, 4
- Animate: subtle flow on selected connections
```

---

## Part V: Iconography

### Icon Library
**Use**: Lucide React (`lucide-react`)

**Why**:
- Consistent 24px grid
- 1.5px stroke weight (matches our minimal aesthetic)
- MIT licensed
- Extensive library (1000+ icons)

### Icon Usage Map

| Element | Icon Name |
|---------|-----------|
| LLM/Chat | `message-square` |
| Image Generation | `image` |
| Video | `video` |
| GPU | `cpu` |
| Network | `globe` |
| Metrics | `activity` |
| Cost | `dollar-sign` |
| Time | `clock` |
| Temperature | `thermometer` |
| Online | `circle` (filled green) |
| Settings | `settings` |
| Wallet | `wallet` |
| Menu | `menu` |
| Close | `x` |
| Expand | `maximize-2` |
| Copy | `copy` |

### Icon Rules
1. **Size**: 16px for inline, 20px for buttons, 24px for section headers
2. **Color**: Inherit from text color (`currentColor`)
3. **Stroke**: 1.5px default
4. **No emoji** anywhere in the application

---

## Part VI: Responsive Design

### Breakpoints

```css
/* Mobile First */
--screen-sm: 640px;   /* Small tablets */
--screen-md: 768px;   /* Tablets */
--screen-lg: 1024px;  /* Laptops */
--screen-xl: 1280px;  /* Desktops */
--screen-2xl: 1536px; /* Large screens */
```

### Layout Behavior

#### Mobile (< 640px)
```
- Single column layout
- Map: Full width, 200px height
- Node cards: Horizontal scroll or 2-column grid
- Sidebar: Bottom sheet (slide up)
- Navigation: Hamburger menu
- Font sizes: Reduce by ~10%
```

#### Tablet (640px - 1024px)
```
- Two column layout
- Map: Full width, 280px height
- Sidebar: Right column (40% width)
- Cards: 2-column grid
```

#### Desktop (> 1024px)
```
- Three column layout
- Map: Left side (60% width)
- Sidebar: Right side (40% width)
- Maximum content width: 1440px
- Centered with auto margins
```

### Touch Considerations
```
- Minimum tap target: 44px × 44px
- Swipe gestures for node selection on mobile
- Bottom sheet for filters/options
- Pull-to-refresh for metrics
```

---

## Part VII: Animation Guidelines

### Allowed Animations

| Element | Animation | Duration | Easing |
|---------|-----------|----------|--------|
| Page transitions | Fade | 150ms | ease-out |
| Hover states | Color/opacity | 150ms | ease |
| Button press | Scale to 0.98 | 100ms | ease-out |
| Modal open | Fade + slight scale | 200ms | ease-out |
| Metrics counter | Number slide | 300ms | ease-out |
| Loading spinner | Rotation | 1000ms | linear |
| Status pulse | Opacity pulse | 2000ms | ease-in-out |

### Animation Rules
1. **No animation > 300ms** except looping states
2. **No bouncing** or elastic easings
3. **Reduce motion**: Respect `prefers-reduced-motion`
4. **One animation at a time** per element
5. **Purpose**: Animation must serve function, not decoration

### Prohibited
- Background animations
- Floating/parallax effects
- Continuous glow pulses
- Page scroll animations
- Text reveal effects

---

## Part VIII: Implementation Plan

### Phase 1: Foundation

1. **Install dependencies**
   ```bash
   npm install react-simple-maps lucide-react
   npm install -D @types/react-simple-maps
   ```

2. **Update globals.css**
   - Remove all glassmorphism
   - Add CSS custom properties (tokens)
   - Simplify utility classes

### Phase 2: Components

| Component | Changes |
|-----------|---------|
| `GPUMap.tsx` | Replace with react-simple-maps |
| `Header.tsx` | Simplify, add mobile menu |
| `NodeSelector.tsx` | Remove glow, use clean cards |
| `WorkloadPicker.tsx` | Replace emoji with Lucide icons |
| `MetricsPanel.tsx` | Cleaner layout, Lucide icons |
| `PromptInput.tsx` | Simplify styling |
| `OutputDisplay.tsx` | Remove effects |
| `SessionStats.tsx` | Minimal bar |

### Phase 3: Polish

- Mobile responsive testing
- Animation audit
- Accessibility check (contrast, focus states)
- Performance audit (bundle size)

---

## Part IX: Accessibility

### Requirements

1. **Color Contrast**: WCAG AA minimum (4.5:1 for text)
2. **Focus States**: Visible focus ring on all interactive elements
3. **Keyboard Navigation**: Full app usable without mouse
4. **Screen Readers**: Proper ARIA labels
5. **Reduced Motion**: Honor user preferences

### Focus Styles
```css
:focus-visible {
  outline: 2px solid var(--accent-primary);
  outline-offset: 2px;
}
```

---

## Part X: Quality Checklist

Before considering the UI complete:

- [ ] Maximum 3-4 colors used (excluding status colors)
- [ ] No emoji anywhere in the interface
- [ ] All icons from Lucide
- [ ] No glassmorphism or blur effects
- [ ] No rainbow/multi-color gradients
- [ ] Proper mobile layout (single column)
- [ ] Touch targets ≥ 44px on mobile
- [ ] Loading states for all async operations
- [ ] Empty states for all data lists
- [ ] Respects prefers-reduced-motion
- [ ] Passes WCAG AA contrast requirements
