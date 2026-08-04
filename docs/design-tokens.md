# Design tokens — log de extração

Fonte: screenshots de `Tela inicial` (1:74) e `Tela Dashboard` (38:299), + nomes de camada do `get_metadata`. Nenhum valor confirmado via `get_design_context` ainda (rate limit do Figma MCP atingido nesta sessão) — todos os valores abaixo são **provisional (screenshot-derived)**.

## Cores

| Token | Valor | Status | Uso |
|---|---|---|---|
| `background.gradientStart` | `#241B4D` | provisional | topo do gradiente (splash, headers) |
| `background.gradientEnd` | `#6E4FB0` | provisional | base do gradiente |
| `surface.default` | `#FFFFFF` | provisional | cards, inputs |
| `surface.muted` | `#F4F2FA` | provisional | fundo de telas com lista sobre fundo claro |
| `primary.default` | `#4C3A8F` | provisional | texto/ícone sobre botão branco, títulos |
| `primary.accent` | `#8B5CF6` | provisional | destaques, ícones ativos |
| `danger.default` | `#E63950` | provisional | botão de pânico/SOS |
| `success.default` | `#2FA36B` | provisional | badges de status positivo (ex. "GPS ativo") |
| `text.onDark` | `#FFFFFF` | provisional | texto sobre gradiente |
| `text.onDarkMuted` | `rgba(255,255,255,0.72)` | provisional | subtítulos sobre gradiente |
| `text.primary` | `#1F1B3D` | provisional | texto sobre fundo claro |
| `text.secondary` | `#6B7280` | provisional | texto secundário sobre fundo claro |
| `border.subtle` | `rgba(255,255,255,0.16)` | provisional | bordas de cards translúcidos |

## Tipografia

| Token | Tamanho/peso | Status |
|---|---|---|
| `heading1` | 28/bold | provisional |
| `heading2` | 22/bold | provisional |
| `heading3` | 18/semibold | provisional |
| `body` | 16/regular | provisional |
| `bodySmall` | 14/regular | provisional |
| `caption` | 12/medium | provisional |

## Espaçamento (grid de 4/8)

`xs=4, sm=8, md=12, lg=16, xl=24, xxl=32, xxxl=40`

## Raios

`sm=8, md=16, lg=24, pill=999`

## Próximos passos

Quando a cota do Figma MCP resetar, rodar `get_variable_defs` e `get_design_context` nos nós 1:74 e 38:299 e reconciliar os valores acima, atualizando o status para `confirmed`.

## Atualização pós-implementação

Todas as 24 telas lógicas do app foram construídas reaproveitando esses tokens (nenhum valor novo de cor/tipografia foi introduzido fora deste arquivo) e verificadas visualmente via preview `expo start --web` + Playwright. O resultado ficou visualmente muito próximo dos screenshots originais do Figma (gradiente, cards, tipografia, bottom tab bar). Os valores continuam `provisional` no sentido estrito (não confirmados via `get_design_context`), mas já passaram por validação visual extensiva em todas as telas do app.
