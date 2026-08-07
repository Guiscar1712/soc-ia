# SÓC.IA — brand kit

Assets oficiais do Guia de Design Caixa Preta SÓC.IA v1.0.

## Variantes
| Arquivo | Uso |
|---|---|
| `lockup-horizontal-nav.png` | Header / fundo escuro (transparente) |
| `lockup-horizontal.png` | Assinatura horizontal dark |
| `lockup-horizontal-light.png` | Assinatura horizontal fundo claro |
| `lockup-stacked.png` / `-light.png` | Peças estreitas / capa |
| `lockup-stacked-nav.png` | Stacked transparente |
| `icon-mark.png` | Ícone com fundo preto |
| `icon-mark-transparent.png` | Símbolo isolado |
| `official/` | Originais enviados pela marca |

## React
```tsx
import { BrandLockup, BrandMark, BrandLockupStacked } from "@/components/brand-mark";

<BrandLockup priority />           // nav (dark)
<BrandLockup variant="light" />    // fundo claro
<BrandMark className="h-8 w-8" />
```

## Cores
`#0C0A08` · `#C7844A` · `#EDE8E1` · `#7D6F61`
