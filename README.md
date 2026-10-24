# Inkiri Uniform Studio

Prompt Mestre Unificado — Site & Simulador Inkiri DTF
> Atue como um Desenvolvedor Full-Stack Sênior e Especialista em UI/UX focado em E-commerce B2B e Confecção de Alta Conversão.
> Crie uma aplicação web completa, moderna, responsiva e de alta conversão (usando React, Tailwind CSS e Lucide Icons) para a Inkiri DTF — Uniformes Prontos em 24 Horas, localizada no ABC Paulista - SP com envio para todo o Brasil. O foco do site é unir o diferencial de Estoque Inteligente a Pronta Entrega + Personalização In-House (DTF e Bordado) com um Estúdio Simulador 2D em Tempo Real, automação de orçamento por volume e envio de ficha técnica direto para o WhatsApp comercial.
> 1. Estúdio Simulador 2D Interativo (Sem depender de fotos estáticas)
> Desenvolva um componente central ("Estúdio Inkiri Express") baseado em SVGs vetoriais dinâmicos em camadas ou HTML5 Canvas, onde o cliente visualiza a peça sendo montada instantaneamente:
>  * Filtro Inicial de Propósito: Botões no topo do simulador para alternar entre "Uniforme Empresarial", "Camisas para Eventos" e "Linha Inverno / Operacional".
>  * Escolha de Modelos Vetoriais (Estoque Inkiri):
>    * Linha Corporativa: Camisa Gola Polo, T-Shirt Tradicional (Gola Redonda), T-Shirt Manga Longa com punho em ribana e Baby Look Feminina.
>    * Linha Eventos & Esportiva: Camiseta Poliamida/Dry-Fit, Camiseta Proteção UV50+ (Manga Curta e Longa) e Regata/Abadá.
>    * Linha Frio & Gastronomia: Jaqueta Corta-Vento Impermeável, Moletom Careca, Moletom Canguru (com bolso e capuz) e Avental Gastronômico.
>  * Personalização de Cores Independentes (Estoque 24h):
>    * Seletor de paleta de cores que altera em tempo real a cor do Corpo da peça, das Mangas e, no caso da Gola Polo e Manga Longa, a cor da Gola e dos Punhos.
>    * Exibir selo verde: "Cor disponível a pronta-entrega (Produção 24h)" (Preto, Branco, Azul Marinho, Cinza Mescla, Chumbo, Vermelho, Azul Royal e Verde).
>  * Upload, Redimensionamento e Posicionamento de Arte:
>    * Botão para o usuário enviar sua logo/estampa (PNG, SVG ou JPG).
>    * Permitir arrastar e redimensionar a logo livremente ou usar botões de Posicionamento Rápido: Peito Esquerdo (Padrão Empresa), Centro da Frente (Padrão Evento), Mangas e Costas Superiores/Central (para site, telefone ou patrocinadores).
>  * Ferramenta de Inserção de Texto:
>    * Permitir adicionar textos personalizados direto na peça (ex: nome da empresa, cargo, frase do evento ou numeração) com escolha de fonte e cor.
>  * Alternância de Visão: Botões para girar a peça entre Frente e Costas mantendo todas as edições salvas na tela.
> 2. Automação de Orçamento, Regras Técnicas e Grade de Pedido
> Conectado ao lado do simulador, crie um painel configurador inteligente passo a passo:
>  * Recomendador Automático de Tecido (com dicas de uso):
>    * Algodão 30.1 Penteado: "Conforto premium e toque macio para escritórios e eventos corporativos".
>    * Malha Piquet Corporativa: "Recomendado automaticamente para Camisa Polo; alta elegância e estrutura".
>    * Poliamida & Dry-Fit UV50+: "Toque gelado, secagem rápida e proteção solar para eventos externos, corridas e trabalho ao sol".
>    * Tecido Impermeável / Moletom Alta Gramatura: "Para linha de inverno, corta-vento e agasalhos corporativos".
>  * Seleção de Técnica de Personalização In-House (com orientação automática):
>    * Impressão DTF Digital (Direct to Film): Selo "Sem limite de cores, permite degradês/fotos, zero custo de tela e alta durabilidade em qualquer tecido (inclusive Corta-Vento e Dry-Fit)".
>    * Bordado Computadorizado Industrial: Selo "Ideal para Polos, Moletons e Corta-Vento — máxima sofisticação e durabilidade".
>  * Grade de Tamanhos Inteligente (Masculino/Unissex e Baby Look):
>    * Campos numéricos separados entre modelagem Tradicional/Unissex e Baby Look Feminina para distribuir quantidades por tamanho (PP, P, M, G, GG, XG).
>    * Soma total de peças calculada em tempo real e validação de pedido mínimo configurável (ex: mínimo de 10 peças).
>  * Barra de Progresso de Desconto por Volume (Atacado):
>    * Barra visual que incentiva o aumento do pedido mostrando as faixas de benefício: Lote Express (10 a 29 peças) | Lote Empresarial (30 a 99 peças - Desconto Progressivo) | Lote Atacado/Grandes Eventos (100+ peças - Condição Especial).
>  * Verificador de Prazo, Urgência e Logística:
>    * Chave seletora:
>      * "⚡ Urgência 24h: Retirada ou Entrega Expressa (ABC Paulista e Grande SP)"
>      * "🚚 Envio Nacional Express (Sedex / Transportadora com rastreio)"
>    * Campo de calendário opcional: "Você tem uma data limite ou data marcada para o evento?" que destaca automaticamente se o pedido requer prioridade máxima na esteira.
> 3. Automação de Contato e Fechamento (WhatsApp & CRM)
>  * Gerador de Ficha Técnica Automatizada:
>    * Ao clicar em "Receber Orçamento Express no WhatsApp", abrir um modal rápido solicitando apenas: Nome, Nome da Empresa (ou Evento) e WhatsApp.
>    * Ao confirmar, redirecionar automaticamente para [https://wa.me/5511940882448](https://wa.me/5511940882448) com o pedido inteiro formatado e pronto para o vendedor fechar:
>      > "Olá, equipe Inkiri! Fiz uma simulação no site:
>      > - Cliente/Empresa: [Nome]
>      > - Propósito: [Uniforme / Evento]
>      > - Modelo e Cores: [Modelo + Cor Corpo/Gola]
>      > - Tecido e Técnica: [Tecido] + [DTF ou Bordado]
>      > - Posição das Logos/Textos: [Ex: Peito Esquerdo + Costas]
>      > - Quantidade Total: [X] peças | Grade: [Detalhamento Masculino/Baby Look por tamanho]
>      > - Logística/Prazo: [Urgência 24h ABC/SP ou Envio Nacional + Data do Evento]"
>      > 
>  * Botão Flutuante Contextual do WhatsApp:
>    * Acompanha a navegação e muda a mensagem automática de acordo com a seção em que o usuário está (ex: no catálogo envia "Quero saber sobre o estoque a pronta-entrega"; na seção de DTF envia "Tenho uma arte colorida para avaliar em DTF").
> 4. Seções Essenciais de Conversão do Site
>  * Barra de Topo (Urgência em Tempo Real): Indicador fixo "⚡ Produção Expressa 24h Ativa | Atendimento Imediato para ABC Paulista, SP e Envio Nacional".
>  * Hero Section de Alto Impacto:
>    * Headline: "Uniformes Prontos em 24 Horas. Sem Atrasos, Sem Dor de Cabeça."
>    * Subheadline focada em padronização imediata para empresas e eventos de última hora com tecnologia DTF e Bordado Industrial.
>    * Dois CTAs principais: "Simular Meu Uniforme Agora" (rola suavemente para o Simulador) e "Orçamento Rápido no WhatsApp".
>    * Selos de Diferenciais B2B abaixo da dobra: Produção Recorde 24h, Emissão de Nota Fiscal (CNPJ), Sem Limite de Cores (DTF) e Desconto Progressivo por Volume.
>  * Como Entregamos em 24 Horas (Linha do Tempo Industrial):
>    * Explicação visual em 4 passos: 1. Escolha e Simule no Site -> 2. Estoque Inteligente (Peças já prontas na prateleira) -> 3. Personalização In-House (Maquinário próprio DTF e Bordado) -> 4. Logística Prioritária (Retirada/Envio em 24h).
>  * Catálogo Interativo "Campeões de Venda" (Cards Individualizados):
>    * Abas de filtro: Todos | Corporativo & Polos | Eventos & T-Shirts | Linha UV & Esportiva | Inverno (Corta-Vento & Moletom) | Bermudas & Calças | Gastronomia (Aventais & Dólmãs).
>    * Cada peça em seu próprio card individual (Corta-Vento, Moletom Careca, Moletom Canguru, Calça Jogger Moletom, Bermuda Moletom, Bermuda Poliamida, Bermuda UV, Camisa Polo, T-Shirt Algodão, T-Shirt Manga Longa, Camiseta Poliamida, Camiseta UV Curta, Camiseta UV Longa e Avental).
>    * Cada card deve ter especificações de tecido e um botão "Simular Minha Logo Nesta Peça", que rola para o Simulador já selecionando aquele produto automaticamente.
>  * Comparativo Tecnológico Visual (DTF Digital vs. Bordado vs. Serigrafia Tradicional):
>    * Seção educativa mostrando por que o DTF da Inkiri não cobra telas/matrizes, aceita fotos e degradês, não racha e adere em algodão, sintéticos e impermeáveis, além de indicar quando usar o Bordado Computadorizado.
>  * Guia de Medidas com Calculadora Inteligente:
>    * Tabela de medidas em centímetros por modelo + Calculadora de Tamanho Ideal, onde o usuário digita altura e peso e o site recomenda o tamanho (P ao XG).
>  * Provas Sociais e Portfólio em Abas:
>    * Galeria filtrável entre "Empresas Padronizadas" e "Eventos Atendidos em 24h", junto com depoimentos de clientes elogiando a velocidade de entrega.
>  * FAQ Automatizado (Acordeão) e Rodapé Completo:
>    * Perguntas frequentes: vantagens do DTF, resistência a lavagens, requisitos de arquivo (PDF, AI, CDR ou PNG 300 DPI), envio nacional (Sedex/Transportadora) e logística expressa no ABC Paulista.
>    * Rodapé com dados oficiais: Localização ABC Paulista - SP, WhatsApp (11) 94088-2448, E-mail contato@inkiri.com.br e horário de atendimento (Seg-Sex 08h às 18h, Sáb 08h às 12h).
> 5. Diretrizes de Design e UI/UX
>  * Estilo Visual: Corporativo moderno, industrial premium e ágil (tons neutros de fundo como azul marinho escuro, chumbo e branco gelo para dar total destaque às cores das peças no simulador, com botões de conversão em verde vibrante).
>  * 100% Mobile-First: No celular, o canvas da camisa deve ficar visível e fluido no topo enquanto os controles de cor, upload de logo e tamanhos ficam organizados em abas fáceis de tocar com o polegar.
>

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://inkiri-uniform-studio.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/92fd7713-cd88-4826-a492-376c5d0b3e2a).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
