import { addToCart } from "./cartFunctions.js";

function drawGridCards(item) {
  const $section = $(".productSession__grid");

  const $card = $("<div>").addClass("grid__card").attr("id", item.id);

  const $img = $("<img>")
    .attr("src", item.image)
    .attr("alt", item.name)
    .addClass("card__image");

  const $h3 = $("<h3>").text(item.name).addClass("card__title");

  const $p = $("<p>")
    .text(`R$ ${item.price}`)
    .addClass("card__price")
    .attr("value", item.price)
    .attr("discount", item.discounts ? item.discounts : "0");

  const $button = $("<button>")
    .text("Adicionar ao Carrinho")
    .addClass("card__button")
    .on("click", () => {
      addToCart(item);
    });

  $card.append($img, $button, $h3, $p);
  $card.hide().prependTo($section).fadeIn(400);
}

export default drawGridCards;
