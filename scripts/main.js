import products from "../data/data.js";
import drawGridCards from "./drawGridCards.js";
import {
  selectAllItems,
  drawCartItems,
  showPriceAndQuantity,
} from "./cartFunctions.js";
import { toggleCartVisibility, closeCart } from "./handleCart.js";

const storagedProduct = JSON.parse(localStorage.getItem("list")) || [];
const storagedSelectedProduct =
  JSON.parse(localStorage.getItem("checkoutList")) || [];

document.addEventListener("DOMContentLoaded", () => {
  init();
});

function populateCards() {
  products.map((x) => drawGridCards(x));
}

function populateCart() {
  storagedProduct.map((x) => drawCartItems(x));
  selectAllItems();
  showPriceAndQuantity(storagedSelectedProduct);
}

function init() {
  populateCards();
  populateCart();
  toggleCartVisibility();
  closeCart();
}
