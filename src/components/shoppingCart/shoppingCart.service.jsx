export const cartItems = [{
  id: 1,
  name: 'Xiaomi Redmi Note 14 Pro 256/8GB Azul',
  brand: 'XIAOMI',
  seller: 'Lisertec',
  price: 2199900,
  discount: 1133000,
  freeShipping: true,
  arrives: 'Llega mañana',
  imageUrl: ''
}];

// Verifica si el carrito está realmente vacío
export const isCartEmpty = (items) => {
  if (items.length === 0) return true;
  if (items.length === 1 && Object.keys(items[0]).length === 0) return true;
  return false;
};

export const calculateTotal = (items) => {
  if (isCartEmpty(items)) return 0;
  return items.reduce((total, item) => total + (item.price - (item.discount || 0)), 0);
};

export const formatPrice = (price) => {
  return new Intl.NumberFormat('es-CO').format(price);
};