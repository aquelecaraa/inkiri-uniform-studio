# Fotos das peças (simulador)

Cada peça usa 2 arquivos:

- `{nome}.webp` — foto em tons de cinza (sombras e textura), fundo transparente.
- `{nome}.regions.png` — mapa de regiões: canal **R** = mangas, canal **G** = gola/punhos; o resto é o corpo.

O componente `src/components/inkiri/Garment.tsx` multiplica a cor escolhida por região sobre a foto.

## Adicionar um modelo novo
1. Foto da peça branca/cinza clara, fundo magenta puro, em `raw-photos/` (ex.: `hoodie-front.jpg`).
2. `python3 scripts/garments/remove_magenta.py` → gera o `.webp` (e `.png`) sem fundo.
3. Gerar o `.regions.png` (`scripts/garments/build_regions.py`). Os polígonos de gola/punho são
   desenhados à mão (em % da imagem) para as fotos atuais; para uma peça nova, adicione os
   polígonos ou, para tingir a peça inteira de uma cor só, use um `.regions.png` todo preto.
4. Registrar o shape na tabela `PHOTOS` em `Garment.tsx`. Shapes sem foto continuam no SVG antigo.

Requer: `pip install pillow numpy opencv-python`.
