---
name: Signal Three
description: A fictional three-chair barbershop dispatch board and sales demo.
colors:
  charcoal: "#171918"
  panel: "#222623"
  cream: "#f0f0e8"
  muted: "#bcc4b8"
  chartreuse: "#d8ff3e"
  line: "#495046"
  paper-muted: "#4e5849"
  field: "#fffef8"
  summary: "#dce2d2"
typography:
  display:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "clamp(90px, 15vw, 250px)"
    fontWeight: 700
    lineHeight: 0.9
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "clamp(46px, 6vw, 88px)"
    fontWeight: 700
    lineHeight: 0.97
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "36px"
    fontWeight: 700
    lineHeight: 0.97
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Arial, Helvetica, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Arial, Helvetica, sans-serif"
    fontSize: "13px"
    lineHeight: 1.6
rounded:
  square: "0px"
spacing:
  gutter: "clamp(20px, 4vw, 72px)"
  section: "110px"
  section-tablet: "80px"
  section-phone: "65px"
components:
  button-primary:
    backgroundColor: "{colors.chartreuse}"
    textColor: "{colors.charcoal}"
    rounded: "{rounded.square}"
    padding: "17px 24px"
  button-primary-hover:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.charcoal}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.cream}"
    rounded: "{rounded.square}"
    padding: "17px 24px"
  filter-selected:
    backgroundColor: "{colors.chartreuse}"
    textColor: "{colors.charcoal}"
    rounded: "{rounded.square}"
    padding: "12px 21px"
  input:
    backgroundColor: "{colors.field}"
    textColor: "{colors.charcoal}"
    rounded: "{rounded.square}"
    padding: "13px 12px"
  chair-board:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.cream}"
    padding: "25px 28px 20px"
  confirmation-ticket:
    backgroundColor: "{colors.charcoal}"
    textColor: "{colors.cream}"
    padding: "25px"
---

# Design System: Signal Three

## Overview

**Creative North Star: "The Three-Chair Dispatch Board"**

The implemented world is direct, compact and mechanical: broad condensed lettering, numbered chair rows, rectangular photographs and paper tickets. Charcoal and cream establish the material; chartreuse marks action and readiness. This code-first record captures the finished implementation, not a pre-build approval.

Quick state changes support queue and booking previews. Content stays visible before entrance effects run. The fictional identity deliberately differs from Sunday House's soft salon direction.

**Key Characteristics:**
- Monumental condensed type and tabular queue numerals.
- Flat, square surfaces with strong tonal separation.
- Physical ticket details and quick, controllable motion.

## Colors

The palette combines warm paper, green-tinted charcoal and a sharp chartreuse signal. Frontmatter values are normative.

### Primary
- **Chartreuse:** Primary actions, ready-chair states, selected filters, filled loyalty stamps and ticker band.

### Neutral
- **Charcoal:** Main ground, reverse text on paper, dark confirmation tickets.
- **Panel:** Chair board and loyalty container.
- **Cream:** Main foreground and full-width service, membership and visit surfaces.
- **Muted:** Secondary copy on dark surfaces; **Paper Muted:** secondary copy on cream.
- **Line:** Dark-surface dividers; **Field:** input fill; **Summary:** modal summary and option hover fill.

**The Readiness Rule.** Use chartreuse for actions and meaningful active states; preserve clear dark text on chartreuse.

## Typography

Barlow Condensed carries headings, identity and large numbers; Arial/Helvetica carries reading and controls. Use the frontmatter hierarchy as the default, with context-specific sizes already present in the implementation.

The hero display becomes (19.3vw) on phones. Section headings become (48px), while dialogue headings are (48px) desktop and (40px) phone. Queue titles use (32px) desktop and (28px) phone; wait numbers use compact condensed numerals. Body paragraphs cap at (65ch); key service and product descriptions remain (16px), including on phones. Small functional labels use (13px).

**The Two-Voice Rule.** Keep condensed type for identity, headings and numerals; use the body face for instructions and form controls.

## Layout

The wrapper caps at (1800px) with fluid gutters; phone gutters are (20px). Desktop compositions use unequal split columns, ruled lists and three-item barber/product rows. Section rhythm steps from desktop to tablet to phone as recorded in frontmatter.

Responsive rules occur at (1150px), (900px), (640px) and (360px). Below (900px) the desktop navigation disappears. At (640px) the queue precedes the hero photograph, major split sections stack, products become image/text rows, and a fixed cream queue action includes safe-area padding. The gallery shifts from six tracks to two. Narrow-screen overrides simplify chair labels and reduce numeric sizes. Preserve these content priorities when extending the layout.

## Elevation & Depth

Flat tonal planes and rules provide most separation. Secondary button outlines use inset strokes rather than raised cards. The fixed phone queue bar uses a soft upper shadow (0 -5px 25px #0002). Photo captions use a local black fade for legibility; ticket barcode stripes are a material detail. These existing gradients are functional, not a general background treatment.

## Shapes

Controls and structural surfaces have square corners. Thin rules organize queue rows and prices; dashed lines and the sample ticket's serrated lower edge establish the paper artifact. The static sample ticket rotates (3deg), or (2deg) on phones; reduced motion removes the rotation. The mock phone preview is the specific rounded exception (25px shell, 13px message corners).

## Components

### Buttons

Chartreuse primary controls have a minimum height of (56px); compact controls use (48px). Secondary controls are transparent with a one-pixel inset outline, reversing to dark text on cream sections. Fine-pointer hover lifts a primary control by (2px) and changes its fill; press moves it down by (2px). Disabled controls use reduced opacity. Focus is a (3px) outline, offset (5px), chartreuse on dark and charcoal on light.

### Chips and options

Square gallery filters switch from outlined dark-surface controls to chartreuse when pressed. Booking options invert to charcoal/cream when selected. Keep selection programmatically expressed with aria-pressed and retain the visible focus treatment.

### Cards / Containers

Chair and loyalty boards are flat panels. Price and membership rows rely on rules instead of independent raised cards. The queue board maintains three aligned columns and tabular numerals. Its phone padding is (20px 15px), with further narrow-screen adaptations.

### Inputs / Fields

Light, square, one-pixel stroked fields use body text at (16px), explicit labels and full available width. Confirmation and error copy remain in the dialogue. No field action persists data or sends a message in this demo.

### Navigation

Desktop links are plain body text (14px) with chartreuse hover. The phone layout uses the fixed queue action and direct in-page calls to action. Do not infer an unimplemented mobile menu.

### Tickets, imagery and motion

The paper sample ticket uses a serrated edge, dashed rules, oversized ticket number and barcode pattern; generated confirmations use reversed charcoal material. Raster product images are contained in rectangular frames, while barber and cut photos use cover crops with grayscale treatment. Product assets are paste.webp, oil.webp and brush.webp; prompt provenance lives with their asset records. Icons use inline stroked SVG.

State motion uses the shared ease-out curve and short durations recorded in the sidecar. Board updates take (220ms), confirmations (240ms), and finite scroll entrances (280ms) with (65ms) staggering. The decorative ticker loops over (26s). Pause controls and prefers-reduced-motion suppress decoration; pausing cannot freeze an open dialogue or confirmation.

## Do's and Don'ts

### Do:
- **Do** preserve the charcoal, cream and chartreuse hierarchy.
- **Do** keep queue rows readable and primary actions ahead of imagery on phones.
- **Do** use ticket material and inline SVG icons where those patterns recur.
- **Do** keep fictional-demo labels and visible focus states alongside interactions.

### Don't:
- **Don't** introduce soft salon arches, serif display type or ornamental barber clipart.
- **Don't** replace raster product photography with CSS object stand-ins.
- **Don't** hide necessary content behind slow motion or freeze task dialogues when decoration is paused.
