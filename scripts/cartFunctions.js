var cartList = JSON.parse(localStorage.getItem("list")) || [];
var checkoutList = [];

function drawCartItems(item) {
  const container = document.querySelector(".cart__itemsContainer");

  const cartItem = document.createElement("div");
  cartItem.classList.add("cart__item");
  cartItem.setAttribute("id", item.id);

  const itemImg = document.createElement("img");
  itemImg.src = item.image;
  itemImg.alt = item.name;
  itemImg.classList.add("item__img");

  const itemInfo = document.createElement("div");
  itemInfo.classList.add("item__info");

  const itemInfoTitle = document.createElement("p");
  itemInfoTitle.innerText = item.name;
  itemInfoTitle.classList.add("item__title");

  const itemInfoQuantity = document.createElement("div");
  itemInfoQuantity.classList.add("item__quantity");

  const itemInfoQuantityValue = document.createElement("p");
  itemInfoQuantityValue.classList.add("item__quantity--value");
  itemInfoQuantityValue.innerText = item.quantity.toString();

  const itemInfoQuantityMinus = document.createElement("button");
  itemInfoQuantityMinus.classList.add("item__quantity--minus");
  itemInfoQuantityMinus.dataset.id = item.id;
  itemInfoQuantityMinus.addEventListener("click", () => {
    const storagedItem = cartList.find(
      (storagedItem) => storagedItem.id == item.id
    );
    if (storagedItem.quantity > 1) {
      storagedItem.quantity -= 1;
      itemInfoQuantityValue.innerText = storagedItem.quantity.toString();
    }
    checkoutList = cartList.filter(
      (storagedItem) => storagedItem.selected === true
    );
    localStorage.setItem("checkoutList", JSON.stringify(checkoutList));
    localStorage.setItem("list", JSON.stringify(cartList));
    showPriceAndQuantity(checkoutList);
  });

  const itemInfoQuantityMinusImg = document.createElement("img");
  itemInfoQuantityMinusImg.src = "./assets/minus.svg";
  itemInfoQuantityMinusImg.alt = "Reduzir quantidade";

  const itemInfoQuantityPlus = document.createElement("button");
  itemInfoQuantityPlus.classList.add("item__quantity--plus");
  itemInfoQuantityPlus.dataset.id = item.id;
  itemInfoQuantityPlus.addEventListener("click", () => {
    const storagedItem = cartList.find(
      (storagedItem) => storagedItem.id == item.id
    );
    if (storagedItem.quantity < 99) {
      storagedItem.quantity += 1;
      itemInfoQuantityValue.innerText = storagedItem.quantity.toString();
    }
    checkoutList = cartList.filter(
      (storagedItem) => storagedItem.selected === true
    );
    localStorage.setItem("checkoutList", JSON.stringify(checkoutList));
    localStorage.setItem("list", JSON.stringify(cartList));
    showPriceAndQuantity(checkoutList);
  });

  const itemInfoQuantityPlusImg = document.createElement("img");
  itemInfoQuantityPlusImg.src = "./assets/plus.svg";
  itemInfoQuantityPlusImg.alt = "Aumentar quantidade";

  const itemPrice = document.createElement("p");
  itemPrice.innerText = `R$ ${item.price}`;
  itemPrice.classList.add("item__price");
  itemPrice.setAttribute("value", item.price);

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("item__buttons--delete");
  deleteButton.dataset.id = item.id;
  deleteButton.addEventListener("click", () => {
    cartItem.remove();
    cartList = cartList.filter((storagedItem) => storagedItem.id !== item.id);
    localStorage.setItem("list", JSON.stringify(cartList));
    checkoutList = checkoutList.filter(
      (storagedItem) => storagedItem.id !== item.id
    );
    localStorage.setItem("checkoutList", JSON.stringify(checkoutList));
    showPriceAndQuantity(checkoutList);
  });

  const deleteButtonImg = document.createElement("img");
  deleteButtonImg.src = "./assets/delete.svg";
  deleteButtonImg.alt = "Remover do carrinho";

  const checkButton = document.createElement("button");
  checkButton.classList.add("item__buttons--select");
  checkButton.dataset.checked = "true";
  checkButton.addEventListener("click", () => {
    const storagedItem = cartList.find(
      (storagedItem) => storagedItem.id === item.id
    );
    if (checkButton.dataset.checked === "false") {
      checkButtonImg.src = "./assets/checked.svg";
      checkButton.dataset.checked = "true";
      storagedItem.selected = true;
      localStorage.setItem("list", JSON.stringify(cartList));
      checkoutList = cartList.filter(
        (storagedItem) => storagedItem.selected == true
      );
      localStorage.setItem("checkoutList", JSON.stringify(checkoutList));
      showPriceAndQuantity(checkoutList);
      return;
    }
    checkButtonImg.src = "./assets/unchecked.svg";
    checkButton.dataset.checked = "false";
    storagedItem.selected = false;
    localStorage.setItem("list", JSON.stringify(cartList));
    checkoutList = cartList.filter(
      (storagedItem) => storagedItem.selected == true
    );
    localStorage.setItem("checkoutList", JSON.stringify(checkoutList));
    showPriceAndQuantity(checkoutList);
  });

  const checkButtonImg = document.createElement("img");
  checkButtonImg.classList.add("button--select--img");
  checkButtonImg.src = "./assets/checked.svg";
  checkButtonImg.alt = "Selecionar produto";

  itemInfoQuantityMinus.appendChild(itemInfoQuantityMinusImg);
  itemInfoQuantityPlus.appendChild(itemInfoQuantityPlusImg);

  itemInfoQuantity.appendChild(itemInfoQuantityMinus);
  itemInfoQuantity.appendChild(itemInfoQuantityValue);
  itemInfoQuantity.appendChild(itemInfoQuantityPlus);

  itemInfo.appendChild(itemInfoTitle);
  itemInfo.appendChild(itemInfoQuantity);

  deleteButton.appendChild(deleteButtonImg);
  checkButton.appendChild(checkButtonImg);

  cartItem.appendChild(checkButton);
  cartItem.appendChild(itemImg);
  cartItem.appendChild(itemInfo);
  cartItem.appendChild(itemPrice);
  cartItem.appendChild(deleteButton);

  container.prepend(cartItem);
  showPriceAndQuantity(checkoutList);
}

function selectAllItems() {
  const selectAll = document.querySelector(".item__buttons--select-all");
  const selectAllImg = document.querySelector(".select-all--image");
  selectAll.addEventListener("click", () => {
    const checked = selectAll.dataset.checked === "false";

    selectAllImg.src = checked
      ? "./assets/checked.svg"
      : "./assets/unchecked.svg";
    selectAll.dataset.checked = checked ? "true" : "false";

    const selectOnly = document.querySelectorAll(".item__buttons--select");
    const selectOnlyImg = document.querySelectorAll(".button--select--img");

    selectOnly.forEach((btn, index) => {
      btn.dataset.checked = checked ? "true" : "false";
      selectOnlyImg[index].src = checked
        ? "./assets/checked.svg"
        : "./assets/unchecked.svg";
      cartList[index].selected = checked; // atualiza cada storagedItem
    });

    checkoutList = checked ? [...cartList] : [];
    localStorage.setItem("list", JSON.stringify(cartList));
    localStorage.setItem("checkoutList", JSON.stringify(checkoutList));
    showPriceAndQuantity(checkoutList);
  });
}

function addToCart(item) {
  if (!cartList.some((storagedItem) => storagedItem.id === item.id)) {
    const list = { ...item, quantity: 1, selected: true };

    cartList.unshift(list);
    localStorage.setItem("list", JSON.stringify(cartList));
    checkoutList = cartList;
    localStorage.setItem("checkoutList", JSON.stringify(checkoutList));
    drawCartItems(list);
  }
}

function calculateTotalPrice(item) {
  let discount = 0;
  let price = 0;

  item.map(
    (storagedItem) =>
      (discount +=
        parseFloat(storagedItem.discounts) *
          parseFloat(storagedItem.quantity) || 0)
  );
  item.map(
    (storagedItem) =>
      (price +=
        parseFloat(storagedItem.price) * parseFloat(storagedItem.quantity))
  );

  var totalPrice = price - discount;

  totalPrice = totalPrice.toFixed(2);
  discount = discount.toFixed(2);

  return { totalPrice, discount };
}

function showPriceAndQuantity(item) {
  const discountDisplay = document.querySelector(".discount__value");
  const priceDisplay = document.querySelector(".total__value");
  const quantityDisplay = document.querySelector(".showCart__quantity");
  const { totalPrice, discount } = calculateTotalPrice(item);

  discountDisplay.innerText = `R$ ${discount.toString()}`;
  priceDisplay.innerText = `R$ ${totalPrice.toString()}`;
  quantityDisplay.innerText = calculateQuantity();
}

function calculateQuantity() {
  const list = JSON.parse(localStorage.getItem("list"));
  let quantity = 0;
  list.map((storagedItem) => (quantity += parseInt(storagedItem.quantity)));
  quantity = quantity.toString();
  return quantity;
}

export { drawCartItems, addToCart, selectAllItems, showPriceAndQuantity };
