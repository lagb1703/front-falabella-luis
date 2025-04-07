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

export const calculateTotal = (items) => {
  return items.reduce((total, item) => total + (item.price - (item.discount || 0)), 0);
};

export const formatPrice = (price) => {
  return new Intl.NumberFormat('es-CO').format(price);
};