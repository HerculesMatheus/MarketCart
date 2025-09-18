var cartList = JSON.parse(localStorage.getItem("list")) || [];
var checkoutList = [];

function drawCartItems(params) {
  const container = document.querySelector(".cart__itemsContainer");

  const cartItem = document.createElement("div");
  cartItem.classList.add("cart__item");
  cartItem.setAttribute("id", params.id);

  const itemImg = document.createElement("img");
  itemImg.src = params.image;
  itemImg.alt = params.name;
  itemImg.classList.add("item__img");

  const itemInfo = document.createElement("div");
  itemInfo.classList.add("item__info");

  const itemInfoTitle = document.createElement("p");
  itemInfoTitle.innerText = params.name;
  itemInfoTitle.classList.add("item__title");

  const itemInfoQuantity = document.createElement("div");
  itemInfoQuantity.classList.add("item__quantity");

  const itemInfoQuantityValue = document.createElement("p");
  itemInfoQuantityValue.classList.add("item__quantity--value");
  itemInfoQuantityValue.innerText = params.qty.toString();

  const itemInfoQuantityMinus = document.createElement("button");
  itemInfoQuantityMinus.classList.add("item__quantity--minus");
  itemInfoQuantityMinus.dataset.id = params.id;
  itemInfoQuantityMinus.addEventListener("click", () => {
    const obj = cartList.find((item) => item.id == params.id);
    if (obj.qty > 1) {
      obj.qty -= 1;
      itemInfoQuantityValue.innerText = obj.qty.toString();
    }
    localStorage.setItem("list", JSON.stringify(cartList));
    checkoutList = cartList;
    localStorage.setItem("checkoutList", JSON.stringify(checkoutList));
    showPriceAndQty(checkoutList);
  });

  const itemInfoQuantityMinusImg = document.createElement("img");
  itemInfoQuantityMinusImg.src = "./assets/minus.svg";
  itemInfoQuantityMinusImg.alt = "Reduzir quantidade";

  const itemInfoQuantityPlus = document.createElement("button");
  itemInfoQuantityPlus.classList.add("item__quantity--plus");
  itemInfoQuantityPlus.dataset.id = params.id;
  itemInfoQuantityPlus.addEventListener("click", () => {
    const obj = cartList.find((item) => item.id == params.id);
    if (obj.qty < 99) {
      obj.qty += 1;
      itemInfoQuantityValue.innerText = obj.qty.toString();
    }
    checkoutList = cartList.filter((item) => item.selected === true);
    localStorage.setItem("checkoutList", JSON.stringify(checkoutList));
    localStorage.setItem("list", JSON.stringify(cartList));
    showPriceAndQty(checkoutList);
  });

  const itemInfoQuantityPlusImg = document.createElement("img");
  itemInfoQuantityPlusImg.src = "./assets/plus.svg";
  itemInfoQuantityPlusImg.alt = "Aumentar quantidade";

  const itemPrice = document.createElement("p");
  itemPrice.innerText = `R$ ${params.price}`;
  itemPrice.classList.add("item__price");
  itemPrice.setAttribute("value", params.price);

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("item__buttons--delete");
  deleteButton.dataset.id = params.id;
  deleteButton.addEventListener("click", () => {
    cartItem.remove();
    cartList = cartList.filter((item) => item.id !== params.id);
    localStorage.setItem("list", JSON.stringify(cartList));
    checkoutList = checkoutList.filter((item) => item.id !== params.id);
    localStorage.setItem("checkoutList", JSON.stringify(checkoutList));
    showPriceAndQty(checkoutList);
  });

  const deleteButtonImg = document.createElement("img");
  deleteButtonImg.src = "./assets/delete.svg";
  deleteButtonImg.alt = "Remover do carrinho";

  const checkButton = document.createElement("button");
  checkButton.classList.add("item__buttons--select");
  checkButton.dataset.checked = "true";
  checkButton.addEventListener("click", () => {
    const obj = cartList.find((item) => item.id === params.id);
    if (checkButton.dataset.checked === "false") {
      checkButtonImg.src = "./assets/checked.svg";
      checkButton.dataset.checked = "true";
      obj.selected = true;
      localStorage.setItem("list", JSON.stringify(cartList));
      checkoutList = cartList.filter((item) => item.selected == true);
      localStorage.setItem("checkoutList", JSON.stringify(checkoutList));
      showPriceAndQty(checkoutList);
      return;
    }
    checkButtonImg.src = "./assets/unchecked.svg";
    checkButton.dataset.checked = "false";
    obj.selected = false;
    localStorage.setItem("list", JSON.stringify(cartList));
    checkoutList = cartList.filter((item) => item.selected == true);
    localStorage.setItem("checkoutList", JSON.stringify(checkoutList));
    showPriceAndQty(checkoutList);
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
  showPriceAndQty(checkoutList);
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
      cartList[index].selected = checked; // atualiza cada item
    });

    checkoutList = checked ? [...cartList] : [];
    localStorage.setItem("list", JSON.stringify(cartList));
    localStorage.setItem("checkoutList", JSON.stringify(checkoutList));
    showPriceAndQty(checkoutList);
  });
}

function addToCart(params) {
  if (!cartList.some((item) => item.id === params.id)) {
    const list = { ...params, qty: 1, selected: true };

    cartList.unshift(list);
    localStorage.setItem("list", JSON.stringify(cartList));
    checkoutList = cartList;
    localStorage.setItem("checkoutList", JSON.stringify(checkoutList));
    drawCartItems(list);
  }
}

function calcTotalPrice(params) {
  let discount = 0;
  let price = 0;

  params.map(
    (obj) => (discount += parseFloat(obj.discounts) * parseFloat(obj.qty) || 0)
  );
  params.map((obj) => (price += parseFloat(obj.price) * parseFloat(obj.qty)));

  var totalPrice = price - discount;

  totalPrice = totalPrice.toFixed(2);
  discount = discount.toFixed(2);

  return { totalPrice, discount };
}

function showPriceAndQty(params) {
  const discountDisplay = document.querySelector(".discount__value");
  const priceDisplay = document.querySelector(".total__value");
  const quantityDisplay = document.querySelector(".showCart__quantity");
  const { totalPrice, discount } = calcTotalPrice(params);

  discountDisplay.innerText = `R$ ${discount.toString()}`;
  priceDisplay.innerText = `R$ ${totalPrice.toString()}`;
  quantityDisplay.innerText = showQty();
}

function showQty() {
  const list = JSON.parse(localStorage.getItem("list"));
  let quantity = 0;
  list.map((obj) => (quantity += parseInt(obj.qty)));
  quantity = quantity.toString();
  return quantity;
}

export { drawCartItems, addToCart, selectAllItems, showPriceAndQty };
