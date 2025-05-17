let cart = JSON.parse(localStorage.getItem('cart')) || [];
localStorage.setItem('cartCount', parseInt(document.getElementById('total-items').innerHTML));
let cartCount = parseInt(localStorage.getItem('cartCount')) || 0;
console.log(cart)
console.log(cartCount)

function updateCartIcon() {
  const header = document.getElementById('main-header');
  if (header) {
	cnt = 0;
	  cart.forEach((item, index) => {
		cnt += item.cnt;
	});
    header.innerHTML = `
	  <a href="index.html">Home</a> |
      <a href="products.html">Products</a> |
      <a href="cart.html">Cart (<span id="cart-count">${cnt}</span>)</a>
    `;
  }
}

function addItem() {
  const container = document.getElementById('cart-items');
  container.innerHTML = '';
  let totalItems = 0;
  let totalCost = 0;
	  
  cart.forEach((item, index) => {
    const div = document.createElement('div');
	item.cnt = item.cnt || 1
    div.innerHTML = `
      <img src="${item.img}" width="50"> ${item.name} - $${item.price}
      <button onclick="updateQuantity(${index}, 1, ${item.price})">+</button>
	  <button id="counter-${index}">${item.cnt}</button>
      <button onclick="updateQuantity(${index}, -1, ${item.price})">-</button>
      <button onclick="removeItem(${index})">Delete</button>
    `;
    container.appendChild(div);
    totalItems += item.cnt;
    totalCost += item.price * item.cnt;
  });

  document.getElementById('total-items').textContent = totalItems;
  document.getElementById('total-cost').textContent = totalCost;
  localStorage.setItem('cart', JSON.stringify(cart));
  localStorage.setItem('cartCount', totalItems);

}

function updateQuantity(index, delta, price) {
  counter = document.getElementById("counter-" + index);
  count = parseInt(counter.innerHTML);
  if(!(delta<0 && count==1)){
	counter.innerHTML = count + delta;
	cart[index].cnt = count + delta;
  }
  else
	  removeItem(index)
  count = parseInt(counter.innerHTML);
  console.log(count)
  let totalCost = 0;
  totalCost = parseInt(document.getElementById('total-cost').innerHTML) + parseInt(price) * delta;
  if(totalCost < 0)
	  totalCost = 0

  document.getElementById('total-items').innerHTML = parseInt(document.getElementById('total-items').innerHTML) + delta;
  if(parseInt(document.getElementById('total-items').innerHTML) < 0)
	  document.getElementById('total-items').innerHTML = 0;
  
  document.getElementById('total-cost').innerHTML = totalCost;
  localStorage.setItem('cartCount', parseInt(document.getElementById('total-items').innerHTML));
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartIcon();
}

function removeItem(index) {
  cart.splice(index, 1);
  addItem();
  updateCartIcon();
}

function checkout() {
  alert('Checkout Coming Soon!');
}

addItem();
updateCartIcon();