
export const getProducts = async () => {
    return [
      { 
        id: 1, 
        name: "Producto 1", 
        price: 1000000, 
        originalPrice: 1500000, 
        brand: "X", 
        rating: 4.5, 
        freeShipping: true 
      },
      { 
        id: 2, 
        name: "Producto 2", 
        price: 1200000, 
        originalPrice: 1800000, 
        brand: "X", 
        rating: 4.2, 
        freeShipping: false 
      },
      { 
        id: 3, 
        name: "Producto 3", 
        price: 800000, 
        originalPrice: 1000000, 
        brand: "Y", 
        rating: 4.0, 
        freeShipping: true 
      },
      { 
        id: 4, 
        name: "Producto 4", 
        price: 1500000, 
        originalPrice: 2000000, 
        brand: "Z", 
        rating: 4.7, 
        freeShipping: true 
      },
      { 
        id: 5, 
        name: "Producto 5", 
        price: 900000, 
        originalPrice: 1200000, 
        brand: "X", 
        rating: 3.9, 
        freeShipping: false 
      },
      { 
        id: 6, 
        name: "Producto 6", 
        price: 2000000, 
        originalPrice: 2500000, 
        brand: "Y", 
        rating: 4.8, 
        freeShipping: true 
      },
      { 
        id: 7, 
        name: "Producto 7", 
        price: 700000, 
        originalPrice: 1000000, 
        brand: "Z", 
        rating: 4.1, 
        freeShipping: true 
      }
    ];
  };
  
  export const getFilters = () => {
    return {
      brands: ["X", "Y", "Z"],
      priceRanges: [
        "Hasta $1.000.000",
        "$1.000.000 a $2.000.000", 
        "Más de $2.000.000"
      ],
      discounts: ["10% o más", "20% o más", "30% o más"],
      shipping: ["Envío gratis", "Llega mañana"]
    };
  };