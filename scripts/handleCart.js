function toggleCartVisibility() {
  const cartButton = document.querySelector(".showCart__button");
  const cart = document.querySelector(".navbar__cart");
  const cartComputedStyle = window.getComputedStyle(cart);
  const transition = cartComputedStyle.transition;

  cartButton.addEventListener("click", () => {
    if (transition == "none") {
      cart.style.display = "flex";
      setTimeout(() => {
        cart.style.transition = "transform 300ms ease-in 120ms";
        cart.style.transform = "translateX(0)";
      }, 100);
      return;
    }
  });
}

function closeCart() {
  const cartCloseButton = document.querySelector(".cart__close");
  const cart = document.querySelector(".navbar__cart");

  cartCloseButton.addEventListener("click", () => {
    cart.style.transform = "translateX(150%)";
    setTimeout(() => {
      cart.style.transition = "none";
      cart.style.display = "none";
    }, 450);
  });
}

export { closeCart, toggleCartVisibility };
