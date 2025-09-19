# 🛒 Carrinho de Compras

Este projeto é uma aplicação web de carrinho de compras desenvolvida com HTML, CSS e JavaScript puro. Ele simula a experiência de adicionar produtos, controlar quantidades, aplicar descontos e selecionar itens para checkout, com persistência de dados via `localStorage`.

---

## 🚀 Funcionalidades

- Adicionar produtos ao carrinho
- Alterar quantidade com botões de incremento/decremento
- Remover itens individualmente
- Selecionar itens para checkout
- Selecionar todos os itens com um clique
- Cálculo automático de:
- Desconto total
- Preço final
- Persistência de dados no `localStorage`

---

## 📁 Estrutura dos Arquivos

- miniCart/
  - assets/
  - css/
    - reset.css
    - style.css
  - data/
    - data.js
  - scripts/
    - cartFunctions.js
    - drawGridCards.js
    - handleCart.js
    - main.js
  - index.html

---

## 🧠 Módulos JavaScript

| Arquivo            | Função principal                                                                         |
| ------------------ | ---------------------------------------------------------------------------------------- |
| `cartFunctions.js` | Gerencia o carrinho: adicionar, remover, alterar quantidade, calcular preços e descontos |
| `drawGridCards.js` | Renderiza os cards de produtos disponíveis para compra                                   |
| `handleCart.js`    | Controla a exibição e interações do carrinho                                             |
| `main.js`          | Integra todos os módulos e inicializa os eventos da aplicação                            |

---

## 🗂 Organização dos Dados

- `cartList`: array completo de itens no carrinho
- `checkoutList`: array filtrado com itens marcados (`selected: true`)
- Ambos são armazenados no `localStorage` como:
  - `"list"` → carrinho completo
  - `"checkoutList"` → itens selecionados

---

## 📦 Requisitos

- Navegador moderno com suporte a ES6+
- Nenhuma dependência externa

---
