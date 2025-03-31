import {
  useState,
  useEffect,
  useCallback,
  useRef
} from "react";
import {
  backendURL,
  isDevelopment
} from "@/pages"
import {
  useParams
} from "react-router"
import productsMock from "./mocks/products.mock";

const PRODUCTLIMIT = 56;

const FILTERPRICENUMEBER = 5;

export function useLoading() {
  const [getLoading, setLoading] = useState(true);
  return {
    getLoading,
    setLoading
  };
}

export function useGetCategory() {
  const { id } = useParams();
  const [getCategory, setCategory] = useState(null);
  const fetchCategory = useCallback(async () => {
    try {
      const categoryName = await getCategoryByCategoryId(id);
      setCategory(
        {
          id,
          name: categoryName
        }
      );
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  }, [id]);
  useEffect(() => {
    fetchCategory();
  }, [id]);
  return getCategory;
}

export function usePagination(categoryId) {
  const [getCurrentPage, setCurrentPage] = useState(1);
  const maxProducts = useRef(0);
  const totalPages = useRef(0);
  const fectMaxProducts = useCallback(
    async () => {
      try {
        const MAX = await getMaxProducts(categoryId);
        maxProducts.current = MAX;
        totalPages.current = Math.ceil(maxProducts / PRODUCTLIMIT);
      } catch (error) {
        console.error("Error fetching max products:", error);
      }
    },
    [categoryId]
  );
  const nextPage = useCallback(
    () => getCurrentPage < totalPages.current && setCurrentPage(getCurrentPage + 1),
    [getCurrentPage]
  );
  const prevPage = useCallback(
    () => getCurrentPage > 1 && setCurrentPage(getCurrentPage - 1),
    [getCurrentPage]
  );
  useEffect(() => {
    if (!categoryId) return;
    fectMaxProducts();
  }, [categoryId]);
  return {
    getCurrentPage,
    setCurrentPage,
    nextPage,
    prevPage,
    maxProducts,
    totalPages
  }
}

export function usePriceRange(categoryId) {
  const [getMinPrice, setMinPrice] = useState(0);
  const [getMaxPrice, setMaxPrice] = useState(0);
  const [getPriceFilter, setPriceFilter] = useState([]);
  const [getMax, setMax] = useState(0);
  const [getMin, setMin] = useState(0);
  const fetchMinPrice = useCallback(async () => {
    try {
      const minPrice = await getMinPriceServer(categoryId);
      setMinPrice(minPrice);
    } catch (error) {
      console.error("Error fetching min price:", error);
    }
  }, [categoryId]);
  const fetchMaxPrice = useCallback(async () => {
    try {
      const maxPrice = await getManPriceServer(categoryId);
      setMaxPrice(maxPrice);
    } catch (error) {
      console.error("Error fetching max price:", error);
    }
  }, [categoryId]);
  useEffect(() => {
    if (!categoryId) return;
    fetchMinPrice();
    fetchMaxPrice();
  }, [categoryId]);
  useEffect(() => {
    if (getMinPrice === 0 || getMaxPrice === 0) return;
    const priceRange = [];
    const range = Math.floor((getMaxPrice - getMinPrice) / FILTERPRICENUMEBER);
    priceRange.push({
      filter: `Hasta ${getMinPrice}`,
      click: (e) => {
        e.preventDefault();
        setMin(getMinPrice);
        setMax(getMinPrice);
      }
    });
    for (let i = 1; i < FILTERPRICENUMEBER; i++) {
      const min = getMinPrice + range * (i - 1);
      const max = getMinPrice + range * i;
      priceRange.push({
        filter: `${min} a ${max}`,
        click: (e) => {
          e.preventDefault();
          setMin(min);
          setMax(max);
        }
      });
    }
    priceRange.push({
      filter: `Mas de ${getMaxPrice}`,
      click: (e) => {
        e.preventDefault();
        setMin(getMaxPrice);
        setMax(getMaxPrice);
      }
    });
    setPriceFilter(priceRange);
  }, [getMinPrice, getMaxPrice]);
  return {
    getMin,
    getMax,
    getPriceFilter
  };
}

export function useGetProductsByCategoryId(
  category,
  getPage,
  getMinPrice,
  getMaxPrice,
  getTradeMark,
  setLoading
) {
  const [getProducts, setProducts] = useState([]);
  const fetchProducts = useCallback(async () => {
    try {
      if (!category) return;
      console.log("TradeMark:", getTradeMark);
      const data = await getProductsByCategoryId({
        categoryId: category.id,
        page: getPage,
        marca: getTradeMark,
        minPrice: getMinPrice,
        maxPrice: getMaxPrice
      });
      setLoading(true);
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, [category, getPage, getMinPrice, getMaxPrice, getTradeMark]);
  useEffect(() => {
    fetchProducts();
  }, [category, getPage, getMinPrice, getMaxPrice, getTradeMark]);
  return getProducts;
}

export function useGetTradeMarks(categoryId) {
  const [getTradeMarks, setTradeMarks] = useState([]);
  const [getTradeMarkFilter, setTradeMarkFilter] = useState("");
  const fetchTradeMark = useCallback(async () => {
    try {
      const data = await getAllTradeMarks(categoryId);
      setTradeMarks(data.map((item) => {
        return {
          filter: item,
          click: (e) => {
            e.preventDefault();
            setTradeMarkFilter(item);
          }
        };
      }));
    } catch (error) {
      console.error("Error fetching trade marks:", error);
    }
  }, [categoryId]);
  useEffect(() => {
    if (!categoryId) return;
    fetchTradeMark();
  }, [categoryId]);
  return {
    getTradeMarks,
    getTradeMarkFilter
  };
}

const getCategoryByCategoryId = async (categoryId) => {
  if (!isDevelopment) {
    const data = await fetch(`${backendURL}products/categoryName/${categoryId}`);
    return (await data.json())["Categoria"];
  }
  return "Categoria de ejemplo";
}

const getProductsByCategoryId = async (
  {
    categoryId,
    page,
    marca,
    minPrice,
    maxPrice
  }
) => {
  if (!isDevelopment) {
    const data = await fetch(
      `${backendURL}products/category/${categoryId}?page=${page}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          marca,
          minPrice,
          maxPrice
        })
      }
    );
    return await data.json();
  }
  return productsMock;
};

const getMaxProducts = async (categoryId) => {
  if (!isDevelopment) {
    const data = await fetch(`${backendURL}products/number/${categoryId}`);
    return parseInt(await data.text());
  }
  return 100;
};

const getMinPriceServer = async (categoryId) => {
  if (!isDevelopment) {
    const data = await fetch(`${backendURL}products/minPrice/${categoryId}`);
    return parseInt(await data.text());
  }
  return 0;
};

const getManPriceServer = async (categoryId) => {
  if (!isDevelopment) {
    const data = await fetch(`${backendURL}products/maxPrice/${categoryId}`);
    return parseInt(await data.text());
  }
  return 0;
};

const getAllTradeMarks = async (categoryId) => {
  if (!isDevelopment) {
    const data = await fetch(`${backendURL}products/tradeMark/${categoryId}`);
    return await data.json();
  }
  return ["marca generica 1", "marca generica 2", "marca generica 3"];
};