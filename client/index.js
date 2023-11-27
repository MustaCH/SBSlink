const mp = new MercadoPago("TEST-cbff67a2-899f-4a6d-9d50-407188cf772e");

document.getElementById("checkout-btn").addEventListener("click", function () {
  const orderData = {
    quantity: document.getElementById("quantity").innerHTML,
    description: document.getElementById("product-description").innerHTML,
    price: document.getElementById("unit-price").innerHTML,
  };

  fetch("http://localhost:8080/create_preference", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (preference) {
      createCheckoutButton(preference.id);
    })
    .catch(function () {
      alert("Unexpected error");
    });
});

function createCheckoutButton(preferenceId) {
  // Initialize the checkout
  const bricksBuilder = mp.bricks();

  const renderComponent = async (bricksBuilder) => {
    if (window.checkoutButton) window.checkoutButton.unmount();
    await bricksBuilder.create("wallet", "wallet_container", {
      initialization: {
        preferenceId: preferenceId,
      },
      callbacks: {
        onError: (error) => console.error(error),
        onReady: () => {},
      },
    });
  };
  window.checkoutButton = renderComponent(bricksBuilder);
}
