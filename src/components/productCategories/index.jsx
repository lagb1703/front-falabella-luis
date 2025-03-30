import { useState, useEffect } from "react";
import { FiTruck, FiStar, FiChevronDown, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { getProducts, getFilters } from "./products.service.jsx";
import "./products.css";

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const discount = Math.round(100 - (product.price / product.originalPrice * 100));

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO').format(price);
  };

  return (
    <div 
      className="product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {product.sponsored && (
        <span className="sponsored-badge">Patrocinado</span>
      )}
      {product.freeShipping && (
        <span className="free-shipping-badge">
          <FiTruck className="truck-icon" /> Envío gratis
        </span>
      )}
      
      <div className="product-image">
        <img
          src={product.thumbnail}
          alt={product.name}
          className="product-img"
          onError={(e) => {
            e.target.src = '/images/placeholder-product.jpg';
          }}
        />
      </div>
      
      <div className="product-info">
        <div className="product-brand">{product.brand}</div>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-seller">Por {product.brand}</p>
        
        <div className="price-container">
          <span className="current-price">$ {formatPrice(product.price)}</span>
          {discount > 0 && (
            <>
              <span className="discount">{discount}% OFF</span>
              <span className="original-price">$ {formatPrice(product.originalPrice)}</span>
            </>
          )}
        </div>
        
        <div className="rating-info">
          <FiStar className="star-icon" />
          <span>{product.rating.toFixed(1)}</span>
        </div>
        
        <div className="product-color">
          Color: {product.color}
        </div>

        <div className={`view-product-button ${isHovered ? 'visible' : ''}`}>
          <button className="view-product-btn">
            Ver producto
          </button>
        </div>
      </div>
    </div>
  );
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState(null);
  const [sortOption, setSortOption] = useState("recommended");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  const [filters, setFilters] = useState({});
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [selectedPickup, setSelectedPickup] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, filtersData] = await Promise.all([
          getProducts(),
          getFilters()
        ]);
        setProducts(productsData);
        setFilteredProducts(productsData);
        setFilters(filtersData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDeliverySelect = (option) => {
    setSelectedDelivery(option === selectedDelivery ? null : option);
    setSelectedPickup(null);
  };

  const handlePickupSelect = (option) => {
    setSelectedPickup(option === selectedPickup ? null : option);
    setSelectedDelivery(null);
  };

  // Lógica de paginación
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  const sortOptions = [
    { value: "recommended", label: "Recomendados" },
    { value: "price-asc", label: "Precio de menor a mayor" },
    { value: "price-desc", label: "Precio de mayor a menor" },
    { value: "brand", label: "Marca" },
    { value: "rating", label: "Los mejores evaluados" },
    { value: "new", label: "Nuevos productos" }
  ];

  if (loading) {
    return <div className="loading">Cargando productos...</div>;
  }

  return (
    <div className="productos-container">
      <div className="productos-content">
        <div className="filters-sidebar">
          <h1 className="category-title">Producto X</h1>
          <p className="results-count">Resultados ({filteredProducts.length})</p>

          {/* 1. Filtro de Envío Gratis */}
          <div className="filter-box">
            <div className="shipping-option">
              <FiTruck className="shipping-icon" />
              <div>
                <h3 className="filter-label">Envío gratis</h3>
                <p className="filter-description">En productos seleccionados por compras desde $149.990</p>
              </div>
            </div>
          </div>

          {/* 2. Filtro de Envío a Domicilio - CON ICONO */}
          <div className="filter-box">
            <div className="filter-header">
              <FiTruck className="filter-icon" />
              <h3 className="filter-section-title">Envío a domicilio</h3>
            </div>
            <div className="shipping-time-options">
              <button
                className={`time-option ${selectedDelivery === 'today' ? 'active' : ''}`}
                onClick={() => handleDeliverySelect('today')}
              >
                Llega hoy
              </button>
              <button
                className={`time-option ${selectedDelivery === 'tomorrow' ? 'active' : ''}`}
                onClick={() => handleDeliverySelect('tomorrow')}
              >
                Llega mañana
              </button>
            </div>
          </div>

          {/* 3. Filtro de Retiro en Tienda */}
          <div className="filter-box">
            <h3 className="filter-section-title">Retiro en un punto</h3>
            <p className="filter-description">Si compras hasta las 16:00 horas retira hoy</p>
            <div className="pickup-time-options">
              <button
                className={`time-option ${selectedPickup === 'today' ? 'active' : ''}`}
                onClick={() => handlePickupSelect('today')}
              >
                Retira hoy
              </button>
              <button
                className={`time-option ${selectedPickup === 'tomorrow' ? 'active' : ''}`}
                onClick={() => handlePickupSelect('tomorrow')}
              >
                Retira mañana
              </button>
            </div>
          </div>

          {/* 4. Filtro de Marcas */}
          <div className="filter-box">
            <div 
              className="filter-header" 
              onClick={() => setActiveFilter(activeFilter === 'brand' ? null : 'brand')}
            >
              <h3 className="filter-title">Marcas</h3>
              <FiChevronDown className={`filter-arrow ${activeFilter === 'brand' ? 'open' : ''}`} />
            </div>
            {activeFilter === 'brand' && (
              <div className="filter-content">
                {filters.brands?.map(brand => (
                  <div className="filter-item" key={brand}>
                    <input type="checkbox" id={`brand-${brand}`} />
                    <label htmlFor={`brand-${brand}`}>{brand}</label>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 5. Filtro de Precio */}
          <div className="filter-box">
            <div 
              className="filter-header" 
              onClick={() => setActiveFilter(activeFilter === 'price' ? null : 'price')}
            >
              <h3 className="filter-title">Precio</h3>
              <FiChevronDown className={`filter-arrow ${activeFilter === 'price' ? 'open' : ''}`} />
            </div>
            {activeFilter === 'price' && (
              <div className="filter-content">
                {filters.priceRanges?.map(range => (
                  <div className="filter-item" key={range}>
                    <input type="checkbox" id={`price-${range}`} />
                    <label htmlFor={`price-${range}`}>{range}</label>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 6. Filtro de Color */}
          <div className="filter-box">
            <div 
              className="filter-header" 
              onClick={() => setActiveFilter(activeFilter === 'color' ? null : 'color')}
            >
              <h3 className="filter-title">Color</h3>
              <FiChevronDown className={`filter-arrow ${activeFilter === 'color' ? 'open' : ''}`} />
            </div>
            {activeFilter === 'color' && (
              <div className="filter-content">
                {filters.colors?.map(color => (
                  <div className="filter-item" key={color}>
                    <input type="checkbox" id={`color-${color}`} />
                    <label htmlFor={`color-${color}`}>{color}</label>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="products-main">
          <div className="sort-and-pagination">
            <div className="sort-container">
              <span className="sort-label">Ordenar por:</span>
              
              <div className="sort-dropdown">
                <button 
                  className="sort-dropdown-toggle"
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                >
                  {sortOptions.find(opt => opt.value === sortOption)?.label || "Recomendados"}
                  <FiChevronDown className={`dropdown-icon ${showSortDropdown ? 'open' : ''}`} />
                </button>
                
                {showSortDropdown && (
                  <div className="sort-dropdown-menu">
                    {sortOptions.map(option => (
                      <button
                        key={option.value}
                        className={`dropdown-item ${sortOption === option.value ? 'active' : ''}`}
                        onClick={() => {
                          setSortOption(option.value);
                          setShowSortDropdown(false);
                        }}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="pagination">
              <button 
                onClick={prevPage} 
                disabled={currentPage === 1}
                className="pagination-button"
              >
                <FiChevronLeft />
              </button>
              
              <button
                className="pagination-number active"
              >
                {currentPage}
              </button>
              
              <button 
                onClick={nextPage} 
                disabled={currentPage === totalPages}
                className="pagination-button"
              >
                <FiChevronRight />
              </button>
            </div>
          </div>

          <div className="products-grid">
            {currentProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;