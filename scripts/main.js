let cart = JSON.parse(localStorage.getItem('cart')) || [];
let cartCount = parseInt(localStorage.getItem('cartCount')) || 0;


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

function getPlantById(id) {
  const plants = [
    { id: 1, name: 'Snake Plant', price: 15, img: 'images/plant1.jpg', cnt: 1},
    { id: 2, name: 'Spider Plant', price: 12, img: 'images/plant2.jpg', cnt: 1},
    { id: 3, name: 'Bamboo Palm', price: 18, img: 'images/plant3.jpg', cnt: 1 },
    { id: 4, name: 'Rubber Plant', price: 20, img: 'images/plant4.jpg', cnt: 1 },
    { id: 5, name: 'Aloe Vera', price: 10, img: 'images/plant5.jpg', cnt: 1 },
    { id: 6, name: 'Cactus', price: 8, img: 'images/plant6.jpg', cnt: 1 },
  ];
  return plants.find(p => p.id === id);
}

function addToCart(plantId, button) {
  const plant = getPlantById(plantId);
  isThere = 0;
  cart.forEach((item, index)=>{
	  if(item.id == plantId){
		  item.cnt += 1;
		  isThere = 1;
	  }
  });
  if(!isThere)
	cart.push(plant);
  localStorage.setItem('cart', JSON.stringify(cart));
  button.disabled = true;
  localStorage.setItem('cartCount', cartCount + 1);
  updateCartIcon();
}


updateCartIcon();