# SÓC.IA — brand kit

Pasta organizada a partir dos exports oficiais.

## Cores
- bronze `#C7844A`
- off-white `#EDE8E1`
- matte black `#0C0A08`

## Uso no site
| Arquivo | Onde |
|---|---|
| `/favicon.svg` + `/favicon-32.png` | metadata / aba do browser |
| `/apple-touch-icon.png` | iOS |
| `/og.png` | Open Graph / WhatsApp / LinkedIn |
| `/brand/lockup-horizontal.svg` | header |
| `/brand/icon-mark.svg` | marca isolada |
| `/images/nathalia-fava.jpg` | web 1600×2400 (q90) |
| `/images/nathalia-fava-original.jpg` | master Canon 4160×6240 |

## Favicon HTML (já no layout.tsx via Metadata API)
```html
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" sizes="32x32" href="/favicon-32.png">
<link rel="icon" sizes="16x16" href="/favicon-16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
```
