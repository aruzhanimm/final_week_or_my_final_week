let token = "";
const output = document.getElementById("output");
const log = (data) => (output.textContent = JSON.stringify(data, null, 2));

async function req(path, method = "GET", body) {
  const res = await fetch(path, {
    method,
    headers: { "Content-Type": "application/json", Authorization: token },
    body: body ? JSON.stringify(body) : undefined
  });
  return res.json();
}

async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const data = await req("/api/auth/login", "POST", { username, password });
  token = data.token || "";
  log(data);
}

async function loadProducts() {
  const data = await req("/api/products/");
  const list = document.getElementById("products");
  list.innerHTML = "";
  data.forEach((p) => {
    const li = document.createElement("li");
    li.textContent = `${p.id}: ${p.name} - $${p.price}`;
    list.appendChild(li);
  });
  log(data);
}

async function createOrder() {
  const product_id = Number(document.getElementById("productId").value);
  const quantity = Number(document.getElementById("quantity").value);
  const data = await req("/api/orders/", "POST", { user_id: 1, product_id, quantity });
  log(data);
}

async function payAndNotify() {
  const order_id = Number(document.getElementById("orderId").value);
  const payment = await req("/api/payments/", "POST", { order_id, amount: 49.99 });
  const note = await req("/api/notifications/", "POST", { user_id: 1, message: `Order ${order_id} paid` });
  log({ payment, notification: note });
}

async function loadProfile() {
  const userId = document.getElementById("profileUserId").value;
  const data = await req(`/api/profiles/${userId}`);
  log(data);
}
