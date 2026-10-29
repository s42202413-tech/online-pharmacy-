let cart = [];

const searchInput = document.getElementById("search");
const productCards = document.querySelectorAll(".product-card");
const noResults = document.getElementById("no-results");

searchInput.addEventListener("input", function () {
  const query = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  productCards.forEach(function (product) {
    const name = product.dataset.name;
    const matches = name.includes(query);

    product.hidden = !matches;

    if (matches) {
      visibleCount++;
    }
  });

  noResults.hidden = visibleCount !== 0;
});

document.querySelectorAll(".add-btn").forEach(function (button) {
  button.addEventListener("click", function () {
    const name = button.dataset.name;
    const price = Number(button.dataset.price);

    const existing = cart.find(function (item) {
      return item.name === name;
    });

    if (existing) {
      existing.quantity++;
    } else {
      cart.push({ name: name, price: price, quantity: 1 });
    }

    updateCart();
  });
});

function updateCart() {
  const container = document.getElementById("cart-items");
  const count = document.getElementById("cart-count");
  const totalElement = document.getElementById("total");

  container.replaceChildren();

  if (cart.length === 0) {
    container.textContent = "Your cart is empty.";
  }

  let total = 0;
  let itemCount = 0;

  cart.forEach(function (item) {
    total += item.price * item.quantity;
    itemCount += item.quantity;

    const row = document.createElement("div");
    row.className = "cart-row";

    const description = document.createElement("span");
    description.textContent =
      item.name + " × " + item.quantity +
      " — ETB " + item.price * item.quantity;

    const removeButton = document.createElement("button");
    removeButton.className = "remove-btn";
    removeButton.textContent = "Remove";

    removeButton.addEventListener("click", function () {
      item.quantity--;

      if (item.quantity <= 0) {
        cart = cart.filter(function (product) {
          return product.name !== item.name;
        });
      }

      updateCart();
    });

    row.append(description, removeButton);
    container.appendChild(row);
  });

  count.textContent = itemCount;
  totalElement.textContent = total;
}

document.getElementById("clear-cart").addEventListener("click", function () {
  cart = [];
  updateCart();
});

updateCart();
