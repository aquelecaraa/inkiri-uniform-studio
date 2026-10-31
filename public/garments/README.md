# Fotos das peças (simulador)

Cada peça (frente e costas) tem 2 arquivos, gerados por `scripts/garments/build_assets.py`:

- `{nome}.webp`    foto em tons de cinza (sombras e textura), **fundo transparente** (magenta removido).
- `{nome}.map.png` mapa de regiões: canal **R** = parte editável (gola, punhos, barra, cós), canal **B** = linha de costura.
                   O corpo/mangas é sempre uma cor só (o que sobra).

Peças: tshirt, polo, longsleeve, babylook, tank, crewneck (moletom careca), hoodie (canguru),
jacket (corta-vento), pants (calça moletom), shorts (bermuda moletom), shortspoli, shortsuv.

## Gerar de novo / adicionar peça
1. Fotos com fundo magenta puro em `raw-photos/`, nomeadas `{peça}-front.jpg` e `{peça}-back.jpg`.
2. `pip install pillow numpy opencv-python`
3. `GARMENT_SRC=./raw-photos python3 scripts/garments/build_assets.py`
   (também atualiza `src/lib/garments.ts`, com tamanhos e pontos de posicionamento).
4. Para peça nova com gola/punho/barra/cós, descreva a região no dicionário `TRIM` do script
   (em % da imagem). Sem entrada em `TRIM` = peça de cor única.
5. Registre o `shape` em `src/lib/inkiri.ts` (tipo `Shape`, `TRIM_LABEL` e o modelo).
