var cartList = JSON.parse(localStorage.getItem("list")) || [];
var checkoutList = [];

function drawCartItems(item) {
  const $container = $(".cart__itemsContainer");

  const $cartItem = $("<div></div>").addClass("cart__item").attr("id", item.id);

  const $itemImg = $("<img>")
    .attr("src", item.image)
    .attr("alt", item.name)
    .addClass("item__img");

  const $itemInfo = $("<div></div>").addClass("item__info");

  const $itemInfoTitle = $("<p></p>").text(item.name).addClass("item__title");

  const $itemInfoQuantity = $("<div></div>").addClass("item__quantity");

  const $itemInfoQuantityValue = $("<p></p>")
    .addClass("item__quantity--value")
    .text(item.quantity.toString());

  const $itemInfoQuantityMinus = $("<button>")
    .addClass("item__quantity--minus")
    .attr("data-id", item.id)
    .on("click", function () {
      const storagedItem = cartList.find(
        (storagedItem) => storagedItem.id == item.id
      );
      if (storagedItem.quantity > 1) {
        storagedItem.quantity -= 1;
        $itemInfoQuantityValue.text(storagedItem.quantity.toString());
      }
      checkoutList = cartList.filter(
        (storagedItem) => storagedItem.selected === true
      );
      localStorage.setItem("checkoutList", JSON.stringify(checkoutList));
      localStorage.setItem("list", JSON.stringify(cartList));
      showPriceAndQuantity(checkoutList);
    });

  const $itemInfoQuantityMinusImg = $("<img>")
    .attr("src", "./assets/minus.svg")
    .attr("alt", "Reduzir quantidade");

  const $itemInfoQuantityPlus = $("<button>")
    .addClass("item__quantity--plus")
    .attr("data-id", item.id)
    .on("click", function () {
      const storagedItem = cartList.find(
        (storagedItem) => storagedItem.id == item.id
      );
      if (storagedItem.quantity < 99) {
        storagedItem.quantity += 1;
        $itemInfoQuantityValue.text(storagedItem.quantity.toString());
      }
      checkoutList = cartList.filter(
        (storagedItem) => storagedItem.selected === true
      );
      localStorage.setItem("checkoutList", JSON.stringify(checkoutList));
      localStorage.setItem("list", JSON.stringify(cartList));
      showPriceAndQuantity(checkoutList);
    });

  const $itemInfoQuantityPlusImg = $("<img>")
    .attr("src", "./assets/plus.svg")
    .attr("alt", "Aumentar quantidade");

  const $itemPrice = $("<p>")
    .text(`R$ ${item.price}`)
    .addClass("item__price")
    .attr("value", item.price);

  const $deleteButton = $("<button>")
    .addClass("item__buttons--delete")
    .attr("data-id", item.id)
    .on("click", function () {
      $cartItem.remove();
      cartList = cartList.filter((storagedItem) => storagedItem.id !== item.id);
      localStorage.setItem("list", JSON.stringify(cartList));
      checkoutList = checkoutList.filter(
        (storagedItem) => storagedItem.id !== item.id
      );
      localStorage.setItem("checkoutList", JSON.stringify(checkoutList));
      showPriceAndQuantity(checkoutList);
    });

  const $deleteButtonImg = $("<img>")
    .attr("src", "./assets/delete.svg")
    .attr("alt", "Remover do carrinho");

  const $checkButtonImg = $("<img>")
    .addClass("button--select--img")
    .attr("src", "./assets/checked.svg")
    .attr("alt", "Selecionar produto");

  const $checkButton = $("<button>")
    .addClass("item__buttons--select")
    .attr("data-checked", "true")
    .on("click", function () {
      const storagedItem = cartList.find(
        (storagedItem) => storagedItem.id === item.id
      );

      const isChecked = $(this).attr("data-checked") === "true";

      if (!isChecked) {
        $checkButtonImg.attr("src", "./assets/checked.svg");
        $(this).attr("data-checked", "true");
        storagedItem.selected = true;
      } else {
        $checkButtonImg.attr("src", "./assets/unchecked.svg");
        $(this).attr("data-checked", "false");
        storagedItem.selected = false;
      }

      localStorage.setItem("list", JSON.stringify(cartList));
      checkoutList = cartList.filter(
        (storagedItem) => storagedItem.selected === true
      );
      localStorage.setItem("checkoutList", JSON.stringify(checkoutList));
      showPriceAndQuantity(checkoutList);
    });

  $checkButton.append($checkButtonImg);

  $itemInfoQuantityMinus.append($itemInfoQuantityMinusImg);
  $itemInfoQuantityPlus.append($itemInfoQuantityPlusImg);

  $itemInfoQuantity.append($itemInfoQuantityMinus);
  $itemInfoQuantity.append($itemInfoQuantityValue);
  $itemInfoQuantity.append($itemInfoQuantityPlus);

  $itemInfo.append($itemInfoTitle);
  $itemInfo.append($itemInfoQuantity);

  $deleteButton.append($deleteButtonImg);
  $checkButton.append($checkButtonImg);

  $cartItem.append($checkButton);
  $cartItem.append($itemImg);
  $cartItem.append($itemInfo);
  $cartItem.append($itemPrice);
  $cartItem.append($deleteButton);

  $cartItem.hide().prependTo($container).slideDown("normal");
  showPriceAndQuantity(checkoutList);
}

function selectAllItems() {
  const $selectAll = $(".item__buttons--select-all");
  const $selectAllImg = $(".select-all--image");

  $selectAll.on("click", function () {
    const checked = $(this).attr("data-checked") === "false";

    $selectAllImg.attr(
      "src",
      checked ? "./assets/checked.svg" : "./assets/unchecked.svg"
    );
    $(this).attr("data-checked", checked ? "true" : "false");

    const $selectOnly = $(".item__buttons--select");
    const $selectOnlyImg = $(".button--select--img");

    $selectOnly.each(function (index) {
      $(this).attr("data-checked", checked ? "true" : "false");
      $selectOnlyImg
        .eq(index)
        .attr(
          "src",
          checked ? "./assets/checked.svg" : "./assets/unchecked.svg"
        );
      cartList[index].selected = checked;
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
  const { totalPrice, discount } = calculateTotalPrice(item);

  $(".discount__value").text(`R$ ${discount.toString()}`);
  $(".total__value").text(`R$ ${totalPrice.toString()}`);
  $(".showCart__quantity").text(calculateQuantity());
}

function calculateQuantity() {
  const list = JSON.parse(localStorage.getItem("list"));
  let quantity = 0;
  list.map((storagedItem) => (quantity += parseInt(storagedItem.quantity)));
  quantity = quantity.toString();
  return quantity;
}

export { drawCartItems, addToCart, selectAllItems, showPriceAndQuantity };
