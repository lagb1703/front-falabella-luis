import { useState, useEffect } from "react";
import { FiTruck, FiStar, FiChevronDown, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import {
  useGetCategory,
  usePagination,
  useLoading,
  usePriceRange,
  useGetTradeMarks,
  useGetProductsByCategoryId
} from "./products.service.jsx";
import ProductCard from "../productCard/index.jsx";
import ProductCarousel from "@/components/productCarousel";
import "./products.css";


const Products = () => {
  const getCategory = useGetCategory();
  const { getLoading, setLoading } = useLoading();
  const {
    getTradeMarks,
    getTradeMarkFilter
  } = useGetTradeMarks(getCategory?.id);
  const {
    getMin,
    getMax,
    getPriceFilter
  } = usePriceRange(getCategory?.id);
  const {
    getCurrentPage,
    setCurrentPage,
    nextPage,
    prevPage,
    maxProducts,
    totalPages
  } = usePagination(getCategory?.id);
  const getProducts = useGetProductsByCategoryId(
    getCategory,
    getCurrentPage,
    getMin,
    getMax,
    getTradeMarkFilter,
    setLoading
  )
  const [activeFilter, setActiveFilter] = useState(null);
  const [sortOption, setSortOption] = useState("recommended");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [selectedPickup, setSelectedPickup] = useState(null);

  const handleDeliverySelect = (option) => {
    setSelectedDelivery(option === selectedDelivery ? null : option);
    setSelectedPickup(null);
  };

  const handlePickupSelect = (option) => {
    setSelectedPickup(option === selectedPickup ? null : option);
    setSelectedDelivery(null);
  };

  const sortOptions = [
    { value: "recommended", label: "Recomendados" },
    { value: "price-asc", label: "Precio de menor a mayor" },
    { value: "price-desc", label: "Precio de mayor a menor" },
    { value: "brand", label: "Marca" },
    { value: "rating", label: "Los mejores evaluados" },
    { value: "new", label: "Nuevos productos" }
  ];

  if (getLoading) {
    return <div className="loading">Cargando productos...</div>;
  }

  return (
    <div className="productos-container">
      <div className="productos-content">
        <div className="filters-sidebar">
          <h1 className="category-title">{getCategory?.name}</h1>
          <p className="results-count">Resultados {getProducts?.length}</p>

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
                {getTradeMarks?.map(brand => (
                  <div className="filter-item" key={brand.filter}>
                    <input 
                      onClick={brand.click}
                      type="checkbox" 
                      id={`brand-${brand.filter}`} />
                    <label htmlFor={`brand-${brand.filter}`}>{brand.filter}</label>
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
                {getPriceFilter?.map(range => (
                  <div
                    className="filter-item"
                    key={range.filter}>
                    <input
                      onClick={range.click}
                      type="checkbox"
                      id={`price-${range.filter}`} />
                    <label htmlFor={`price-${range.filter}`}>{range.filter}</label>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 6. Filtro de Color */}
          {/* <div className="filter-box">
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
          </div> */}
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
                disabled={getCurrentPage == 1}
                className="pagination-button"
              >
                <FiChevronLeft />
              </button>

              <button
                className="pagination-number active"
              >
                {getCurrentPage}
              </button>

              <button
                onClick={nextPage}
                disabled={getCurrentPage == totalPages.current}
                className="pagination-button"
              >
                <FiChevronRight />
              </button>
            </div>
          </div>

          <div className="products-mama">

          <div className="products-grid">

            {getProducts?.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

            <div className="products-carousel" >
            <ProductCarousel categoryId="68065330709a122a6c8628b8" nameBanner="Productos recomendados" carouselWidth="100%"/>
            </div>

          </div>


        </div>
      </div>

    </div>

  );
};

export default Products;