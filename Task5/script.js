 // ----------------- Product Data -----------------
const products = [
  { id: 1, name: "Wireless Headphones", price: 1999, img: "https://m.media-amazon.com/images/I/61wSmw6oC7L._SX522_.jpg" },
  { id: 2, name: "Smart Watch", price: 2499, img: "https://m.media-amazon.com/images/I/616e2t492uL._SX679_.jpg" },
  { id: 3, name: "Bluetooth Speaker", price: 1599, img: "https://www.boat-lifestyle.com/cdn/shop/files/MainImage_3f8de721-c1d3-45a0-86c3-784c8d3418bc_1500x.jpg?v=1720590558" },
  { id: 4, name: "Gaming Mouse", price: 999, img: "https://m.media-amazon.com/images/I/51UCF1KOnKL._SX522_.jpg" },
  { id: 5, name: "Laptop", price: 45999, img: "https://m.media-amazon.com/images/I/71+gQ9gOTuL._SX679_.jpg" },
  { id: 6, name: "Smartphone", price: 29999, img: "https://m.media-amazon.com/images/I/71v2jVh6nIL._SX679_.jpg" },
  { id: 7, name: "Mechanical Keyboard", price: 1899, img: "https://m.media-amazon.com/images/I/616TXB1YkqL.jpg" },
  { id: 8, name: "Digital Camera", price: 25999, img: "https://m.media-amazon.com/images/I/510xogyTNqL.jpg" },
  { id: 9, name: "Tablet", price: 18999, img: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcS-xsGoy8qf1dRHkiWeLUBFgTGE7L8Nchs_6wya0jKrGepJOvZ-6ercW123GCMgZ9CBzAM9gInQMXQO7Efmr_aC5Nrac1e9nf-Ozj6ufYomckcRZ9KJIdYAOo-WzJZlbShne5-g2ZKxwg&usqp=CAc" },
  { id: 10, name: "Power Bank", price: 899, img: "https://erdshop.com/cdn/shop/files/67.PB-190PowerBankGray_20000mAh_25w1.webp?v=1725871575&width=900" },
  { id: 11, name: "Wireless Charger", price: 799, img: "https://www.bbassets.com/media/uploads/p/l/40326660_1-dubstep-powerblitz-x1-10000-mah-20w-12w-fast-charging-wired-wireless-compatible-with-magsafe-devices-compact-pocket-size-power-bank-with-type-c-to-type-c-cable-black.jpg" },
  { id: 12, name: "Fitness Band", price: 1499, img: "https://rukminim2.flixcart.com/image/312/312/xif0q/smart-band-tag/9/u/e/-original-imah8bgfgewq9tpn.jpeg?q=70" },
  { id: 13, name: "Earbuds", price: 1299, img: "https://www.bbassets.com/media/uploads/p/l/40334208_1-realme-buds-t110-tws-earbuds-with-ai-noise-cancellation-ipx5-water-resistant-38-hours-playback-jazz-blue.jpg" },
  { id: 14, name: "Portable Hard Drive", price: 3499, img: "https://m.media-amazon.com/images/I/41eFUZh+nHL._UF1000,1000_QL80_.jpg" },
  { id: 15, name: "Smart TV", price: 45999, img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRU8Lg0UTrDPpfieYJ1cyvtaJzV9NgkaDceyGX_Bt8vo7I_NPo9VBYlB6BFvNTfmfMXkgIs3aNy-XCaXd9q2TcQQA8Z0Zjq9HSTr-g89T1NlKO9meBj1MMs" }
];

// ----------------- Local Storage Helpers -----------------
function readCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function writeCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// ----------------- Cart Count -----------------
function updateCartCount() {
  const countSpan = document.getElementById("cart-count");
  if (!countSpan) return;
  const cart = readCart();
  countSpan.textContent = cart.length;
}

// ----------------- Add to Cart -----------------
function addToCartById(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;
  const cart = readCart();
  cart.push(product);
  writeCart(cart);
  updateCartCount();
  alert(`${product.name} added to cart!`);
}

// ----------------- Render Product List -----------------
function renderProductList() {
  const productList = document.getElementById("product-list");
  if (!productList) return;

  productList.innerHTML = "";
  products.forEach(p => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${p.img}" alt="${p.name}" loading="lazy">
      <h3>${p.name}</h3>
      <p>₹${p.price}</p>
      <button class="btn add-to-cart" data-id="${p.id}">Add to Cart</button>
    `;
    productList.appendChild(div);
  });

  productList.addEventListener("click", (e) => {
    const btn = e.target.closest("button.add-to-cart");
    if (!btn) return;
    const id = parseInt(btn.dataset.id, 10);
    addToCartById(id);
  });
}

// ----------------- Render Cart Page -----------------
function renderCartPage() {
  const container = document.getElementById("cart-items");
  const totalDiv = document.getElementById("cart-total");
  if (!container || !totalDiv) return;

  const cart = readCart();
  container.innerHTML = "";
  if (cart.length === 0) {
    container.innerHTML = "<h2>Your cart is empty!</h2>";
    totalDiv.textContent = "";
    return;
  }

  let total = 0;
  cart.forEach((item, idx) => {
    total += Number(item.price || 0);
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${item.img}" alt="${item.name}" loading="lazy">
      <h3>${item.name}</h3>
      <p>₹${item.price}</p>
      <button class="btn remove-from-cart" data-index="${idx}">Remove</button>
    `;
    container.appendChild(div);
  });

  totalDiv.textContent = `Total: ₹${total}`;

  container.addEventListener("click", (e) => {
    const btn = e.target.closest("button.remove-from-cart");
    if (!btn) return;
    const idx = parseInt(btn.dataset.index, 10);
    removeFromCartAtIndex(idx);
  });

  const clearBtn = document.getElementById("clear-cart");
  if (clearBtn) {
    clearBtn.onclick = () => {
      if (!confirm("Clear all items from cart?")) return;
      writeCart([]);
      renderCartPage();
      updateCartCount();
      alert("Cart cleared.");
    };
  }
}

// ----------------- Remove from Cart -----------------
function removeFromCartAtIndex(index) {
  const cart = readCart();
  if (index < 0 || index >= cart.length) return;
  const removed = cart.splice(index, 1);
  writeCart(cart);
  updateCartCount();
  renderCartPage();
  alert(`${removed[0].name} removed from cart.`);
}

// ----------------- DOM Ready -----------------
document.addEventListener("DOMContentLoaded", () => {
  renderProductList();
  renderCartPage();
  updateCartCount();
});
