import { addToCart } from "./cartFunctions.js";

function drawGridCards(item) {
  const section = document.querySelector(".productSession__grid");

  const card = document.createElement("div");
  card.classList.add("grid__card");
  card.setAttribute("id", item.id);

  const img = document.createElement("img");
  img.src = item.image;
  img.alt = item.name;
  img.classList.add("card__image");

  const h3 = document.createElement("h3");
  h3.innerText = item.name;
  h3.classList.add("card__title");

  const p = document.createElement("p");
  p.innerText = `R$ ${item.price}`;
  p.classList.add("card__price");
  p.setAttribute("value", item.price);
  p.setAttribute("discount", item.discounts ? item.discounts : "0");

  const button = document.createElement("button");
  button.innerText = "Adicionar ao Carrinho";
  button.classList.add("card__button");
  button.addEventListener("click", () => {
    addToCart(item);
  });

  card.appendChild(img);
  card.appendChild(button);
  card.appendChild(h3);
  card.appendChild(p);

  section.appendChild(card);
}

export default drawGridCards;
