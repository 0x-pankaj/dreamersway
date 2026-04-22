# College Detail Page Redesign Plan

## Problem Analysis

The current college detail page (`src/app/colleges/[id]/page.tsx`) has several issues:

1. **Recognitions shown as count only** - `recognised_by` array exists in DB but only the count is displayed, not the actual names (e.g., "Nepal Medical Council", "WHO Listed")
2. **Missing data sections** - `nearest_borders`, `access_modes`, `hospital_address`, `gallery_images` are saved in the database but not rendered on the detail page at all
3. **Random color gradients** - Each section uses different color gradients (amber→orange, blue→indigo, purple→pink, green→emerald) making it look scattered and unprofessional
4. **Inconsistent design** - Different background tints per section break visual cohesion

## Design Approach

Use a **clean, cohesive design** with the project's existing warm gold/yellow primary color (`oklch(0.75 0.15 85)`) as the single accent. No random color gradients. All sections use consistent white/dark card backgrounds with subtle primary-colored accents (icon containers, borders, badges).

## File to Modify

**`src/app/colleges/[id]/page.tsx`** - Complete redesign of the college detail page (single file change)

## New Page Structure

### 1. Hero Section (keep existing structure, clean up)
- Cover image with dark overlay
- Logo, college name, type badge, affiliation badge, featured badge
- Address with map pin
- Remove the `from-primary/20` gradient overlay - use solid dark overlay only

### 2. Quick Stats Bar (redesigned)
- **Established Year** - Calendar icon
- **Bed Capacity** - Bed icon
- **Programs Count** - GraduationCap icon (total of bachelor + pg programs)
- **Recognitions** - Award icon (show count but link to section below)

### 3. Main Content (2-column: 2/3 + 1/3)

#### Left Column (2/3):

**a) About the College** - Description text in clean white card

**b) Recognitions & Affiliations** (NEW - currently missing)
- Show the affiliation prominently (e.g., "Tribhuvan University (TU)")
- List each `recognised_by` item with Award icon (e.g., "Nepal Medical Council", "WHO Listed")
- Clean list layout, no colored backgrounds

**c) Why Choose Us (Highlights)**
- Clean checkmark list in 2-column grid
- White cards with subtle primary-colored left border accent
- Remove amber/orange gradient background

**d) Academic Programs**
- Bachelor's and Postgraduate in side-by-side cards
- Clean white cards with primary accent icons
- Remove blue/indigo gradient background

**e) Campus Facilities**
- Clean pill/chip layout with icons
- White/gray chips with primary hover state
- Remove green gradient hover effects

**f) Gallery** (NEW - currently missing)
- If `gallery_images` has items, show image grid
- Responsive grid: 2-3 columns
- Click to view (simple)

**g) Additional Information**
- Clean white card with description text
- Remove purple/pink gradient

#### Right Column (1/3) - Sidebar:

**a) Contact Card (sticky)**
- Phone, Email, Website - clean icon + label + value layout
- Apply Now button with solid primary color (no gradient)

**b) Location & Access** (NEW - currently missing)
- Hospital Address (if different from college address)
- Nearest Indian Borders with distances
- How To Reach / Access Modes (bus, flight, etc.)

## Design System (Consistent across all sections)

- **Cards**: `bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800`
- **Section headings**: Left-aligned with a small primary-colored vertical bar accent (`w-1 h-6 bg-primary rounded-full`)
- **Icon containers**: `w-10 h-10 bg-primary/10 rounded-lg` with primary-colored icons
- **No gradients** on backgrounds, borders, or text
- **Primary accent** used sparingly: icon tints, badge borders, hover states
- **Spacing**: Consistent `p-6` or `p-8` padding, `space-y-6` between sections
- **Typography**: `font-bold text-xl` for section titles, `font-semibold` for items

## Implementation Details

### New imports needed:
```
MapPin, Globe, Mail, Phone, Building2, Bed, CheckCircle2, Calendar,
Users, Award, GraduationCap, Stethoscope, Star, Shield, Route,
Landmark, Image as ImageIcon, Hospital
```

### Key data display changes:
- `recognised_by` → Full list with Award/Shield icons
- `affiliation` → Prominent display with Landmark icon
- `nearest_borders` → List with MapPin + distance
- `access_modes` → List with Route/transport icon + description
- `hospital_address` → Shown with Hospital icon if present
- `gallery_images` → Responsive image grid
- `programs_bachelor` + `programs_pg` → Combined count in stats bar

## Verification

1. Run `npm run build` to ensure no TypeScript/build errors
2. Visual check: all sections render with consistent styling
3. Dark mode: verify all sections look correct in dark mode
4. Data completeness: every field from the College type that has data is displayed
