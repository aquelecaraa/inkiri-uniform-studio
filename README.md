# Inkiri Uniform Studio

Plataforma oficial de e-commerce corporativo e simulação em tempo real da **Inkiri DTF**, especializada na produção e personalização de uniformes em 24 horas. 

Este repositório contém a infraestrutura frontend da loja virtual, incluindo o Estúdio Simulador 2D, automação de cotações B2B e integração direta de pedidos via WhatsApp.

## 🚀 Funcionalidades da Plataforma

* **Estúdio Simulador 2D Interativo:** Ferramenta desenvolvida em Canvas/SVG que permite aos clientes visualizar uniformes (Camisas, Polos, Corta-Ventos, Moletons) em tempo real, testando cores e aplicando suas próprias logos e estampas.
* **Automação de Orçamentos:** Grade de tamanhos inteligente (modelagem unissex e baby look), calculadora de desconto por volume (atacado) e seletor técnico de tecidos e acabamentos (DTF ou Bordado Industrial).
* **Integração Comercial via WhatsApp:** Geração instantânea de ficha técnica estruturada a partir da simulação do cliente, enviada diretamente para a esteira comercial, eliminando falhas de comunicação.
* **Catálogo Corporativo & Pronta-Entrega:** Navegação categorizada entre linhas Corporativa, Eventos, Gastronomia e Inverno, com foco em produtos a pronta-entrega (estoque 24h).

## 🛠️ Stack Tecnológico

* **Frontend:** React, TypeScript, Tailwind CSS, shadcn/ui
* **Recursos Gráficos:** Manipulação dinâmica de SVG/Canvas para o renderizador de peças.
* **Infraestrutura:** Vercel / Lovable

## 📦 Como rodar o projeto localmente

Pré-requisitos: [Node.js](https://nodejs.org/) e npm instalados.

```bash
# 1. Clone o repositório
git clone [https://github.com/aquelecaraa/inkiri-uniform-studio.git](https://github.com/aquelecaraa/inkiri-uniform-studio.git)

# 2. Acesse a pasta do projeto
cd inkiri-uniform-studio

# 3. Instale as dependências
npm install

# 4. Inicie o servidor de desenvolvimento
npm run dev
