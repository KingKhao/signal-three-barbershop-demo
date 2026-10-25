# Design review — October 25, 2026

## Direction and evidence
Research completed before implementation: 2026 barbershop collection plus direct desktop rendering of Fort Worth Barber Shop, Crowsnest and Scissors & Scotch; Crowsnest mobile examined. See RESEARCH.md for direct links and limits. Taste draw chose Name as a monument, with user-pinned chair board, dark/cream/accent world and concise kinetic interaction taking priority over conflicting preset section recipes. Impeccable seed reference was corroborated during finish correction, not claimed as a pre-build approval.

## Render critique
- One-second / five-second read: the large name, three-chair wait board, fictional shop descriptor and Join the Line action identify the barber experience. On phone, fixed Join the Line is always available and the chair board precedes photography.
- Composition / frame / edges: matching outer gutters, table-like service list, three staff columns, uneven gallery, quieter ticket and loyalty scenes, strong cream membership passage and accent midweek slot. Three chairs provide the repeated logic. First screen at short desktop heights uses the header's Join the Line while lower board actions need a small scroll.
- Typography / color: Barlow Condensed display versus Arial functional text; cream/charcoal fields with chartreuse primary actions. No salon arches, serif headlines, slow parallax or postcard layers. Functional labels raised to at least 13px in inspected views. Different numeric roles and responsive display sizes explain the inspector's size-count warning.
- Pictures / material: real stock haircut process, portrait and buzz images; original generated raster product set. All image URLs load. Gallery Design shows a consultation process, explicitly not a finished pattern.
- Rhythm / fullness: all requested sections contain working content; the midweek opening band includes the available time at display scale. Full-page desktop/tablet/phone sheets inspected; lower mobile shop/visit/FAQ/footer captured separately.
- Interaction: finite 160–280ms feedback/entrances, simulated board advance, ticket advancement, pulsing state dot and ticker with pause/reduced motion. Inspector's still-page allowance is intentional: the required quick WAAPI motion is too brief for its scroll sampler. It is not evidence that animation is absent. No authentic shop footage exists, so no autoplay video was added.
- Substance / honesty: every service has price/time; addon includes base taper in the booking total; membership/loyalty terms explicit; no fake rating or real queue/booking/payment claims. No form requests or storage.
- Collisions / phone: fixed-bar safe-area padding, clear dialog focus, no document overflow320–1440. The pause-dialog opacity defect was found and fixed; new regression check included. Actual-device keyboard, safe-area and touch testing remains outstanding.

Self-critique after fixes (not an independent award): design7.8, usability8.1, creativity7.8, content7.7; weighted7.88. Main limitation is stock consultation imagery rather than an authentic finished-cut portfolio; intentionally no production integrations.

## Verification and review
44 automated Chromium checks passed covering all functional flows, required-field/phone checks, closed days and duration bounds, calculated totals, safe text rendering, cleanup, no form submissions, empty local/session storage, gallery, FAQ, focus, loaded images, reduced motion and overflow1440/1024/768/390/320.

Taste third visual pass reported zero FAIL and seven style warnings under recorded allowances for the requested queue board, ticket perforations, photo contrast and fast motion. These are visual heuristics, not a WCAG certification. The one required Impeccable detector run found small-text issues subsequently fixed; remaining style flags reflected brief-required ticker/pulse, diagram/packaging and the empty unopened lightbox image.

Fresh finish reviewer requested a valid ticket recapture, then three corrections. Verdict pass scored all three resolved: corroborated honest seed record, raster product material and SVG icon system. Disposition: ship, at the scope of those fixes, not a newly repeated whole-surface audit. New-world documentation is recorded in DESIGN.md and .impeccable/design.json.
