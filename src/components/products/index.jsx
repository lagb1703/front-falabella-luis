import { useState, useEffect } from "react";
import { FiTruck, FiStar, FiChevronDown, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { getProducts, getFilters } from "./products.service.jsx";
import "./products.css";

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

  // Lógica de paginación
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  // Formatear precios
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO').format(price);
  };

  // Calcular descuento
  const calculateDiscount = (price, originalPrice) => {
    return Math.round(100 - (price / originalPrice * 100));
  };

  // Opciones de ordenamiento
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
      <h1 className="category-title">Refrigeración Congeladores</h1>
      <p className="results-count">Resultados ({filteredProducts.length})</p>
      
      <div className="productos-content">
        {/* Panel de filtros lateral */}
        <div className="filters-sidebar">
          <div className="filter-box">
            <h3 className="filter-section-title">Envío</h3>
            <div className="filter-option">
              <div className="shipping-icon-container">
                <FiTruck className="shipping-icon" />
              </div>
              <div className="shipping-info">
                <span className="filter-label">Envío gratis</span>
                <span className="filter-description">En productos seleccionados por compras desde $149.990</span>
              </div>
            </div>
            <div className="filter-option">
              <div className="shipping-icon-container">
                <FiTruck className="shipping-icon" />
              </div>
              <div className="shipping-info">
                <span className="filter-label">Envío a domicilio</span>
                <span className="filter-description">Llega mañana</span>
              </div>
            </div>
          </div>

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

        {/* Contenido principal */}
        <div className="products-main">
          {/* Barra de ordenamiento y paginación */}
          <div className="sort-and-pagination">
            <div className="sort-banner">
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
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`pagination-number ${currentPage === number ? 'active' : ''}`}
                >
                  {number}
                </button>
              ))}
              
              <button 
                onClick={nextPage} 
                disabled={currentPage === totalPages}
                className="pagination-button"
              >
                <FiChevronRight />
              </button>
            </div>
          </div>

          {/* Grid de productos */}
          <div className="products-grid">
            {currentProducts.map(product => {
              const discount = calculateDiscount(product.price, product.originalPrice);
              
              return (
                <div key={product.id} className="product-card">
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
                      src={`https://via.placeholder.com/250x250?text=${product.brand}+${product.id}`}
                      alt={product.name}
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
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;