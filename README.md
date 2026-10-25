# Signal Three — fictional barbershop sales demo

Created October 25, 2026 for Clinch Valley Digital. Separate from Sunday House and all production business websites.

Published October 25, 2026:
- Live: https://signal-three-barbershop-demo.vercel.app/
- Private GitHub: https://github.com/KingKhao/signal-three-barbershop-demo
- Vercel project: wkb-projects/signal-three-barbershop-demo; connected to GitHub main for deployments.
- Static hosting only; no backend, payment, SMS or API credentials. Search indexing disabled. Development notes and prompt sidecars excluded from hosting.

## Preview in five lines
1. Open `Signal-Three.html` in a current browser.
2. Stay online for the Unsplash photos and optional Google Font.
3. Use fictional details to try Join the Line and Book Ahead.
4. Try gallery filters, Cut Club, loyalty stamps and mock shop checkout.
5. Resize for mobile; no installation, server, API key or build is required.

Alternatively open index.html with styles.css and app.js beside it. The single-file edition embeds all application CSS/JavaScript and the three generated product images. Unsplash photos and the optional font remain remote. The local preview is http://127.0.0.1:43827/.

## Fictional facts
Signal Three, 3 Signal Lane, Rogersville TN 37857 (invented address; do not travel). Tue–Fri 9–6, Sat 9–3, Sun/Mon closed. Eastern time. Jace “Jet” Miles, Morgan “Moss” Reed, Theo “T” Lane are invented identities shown using stock portraits. Sample quotes are explicitly invented. Stock gallery is style/consultation inspiration, not this shop's work. Designs filter shows a consultation/process image, not an actual finished pattern.

## Features mapped to the brief
| Problem | Working demonstration |
|---|---|
| 1. Walk-in chaos | Three-chair board, estimated sample waits, choose barber/first available, ticket, position advancement, mock SMS and leave-line action |
| 2. Phone-only booking | Service → chair → date/time → details → explicit mock confirmation; required fields and phone validation |
| 3. Missing prices | Ten price-board entries with price/duration; design add-on clearly totals $50 /55 min with a taper |
| 4. Clients follow barbers | Three fictional profiles with specialties, experience and direct booking; shop-wide client-notes concept clearly labeled as future integration |
| 5. Quiet midweek chairs | Date-aware sample Tuesday–Thursday opening preselects service, barber and time |
| 6. No recurring revenue | $64 Cut Club and $20 Beard Club, terms, mock signup and no enrollment/payment confirmation |
| 7. Forgotten repeat cuts | Two/three-week reminder preview calculated from the selected appointment; never sends/schedules SMS |
| 8. No loyalty | Add/reset a sample ten-visit tracker and unlock a fictional reward |
| 9. Work trapped on Instagram | Five style filters, stock gallery and keyboard lightbox |
| 10. Invisible on Google | Discoverable local details, semantic headings and service content demonstrate the foundations; demo deliberately noindex, not a claim of rankings or a real business listing |
| 11. Unclear service scope | Kids, simple designs, hot towel shave, grey blend, beard and combo prices plus FAQ |

Retail adds three AI-generated fictional product images, quantities, cart arithmetic and mock checkout. No actual products sold.

## Privacy and limits
No backend, API keys, tracking, cookies, localStorage or sessionStorage. Form entries remain in page memory and are removed when closing the flow. Nothing is saved or submitted. The cart and loyalty state last only in memory until reload. Unsplash and Google Fonts make normal third-party image/font requests independent of forms. Use fictional details. External CVD links navigate to the agency website.

Queue is a simulation, not actual shop status. Auto board updates pause while a flow is open, on reduced motion, when hidden or using Pause motion. A ticket advances only by pressing its demo button. Booking runs tomorrow through 60 days, excludes Sunday/Monday and slots that finish after closing. No payment details ever requested. Shared client records, real marketing consent, recurring billing and genuine local SEO are not implemented.

## Verification
44 automated Chromium checks passed: all mock flows, validation, correct totals/durations, no form requests, safe name rendering, dialog cleanup, gallery, FAQ, keyboard focus, reduced motion, loaded photos and no horizontal overflow at 1440/1024/768/390/320. Desktop/tablet/mobile screenshots inspected. Emulation is not actual phone hardware; touch keyboard/safe-area checks remain for a real device. Visual research and design details are in RESEARCH.md and DESIGN.md.

Direct-file navigation was blocked by the automated browser runner’s file-protocol policy. The single-file edition was therefore smoke-tested over localhost: embedded product images, queue and cart controls work without external application files. A normal browser may open the downloaded HTML directly; Unsplash and font requests still need internet.
