import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Mock data for demonstration
const mockProducts = [
  { id: 1, name: "Product 1", categoryId: "cat123" },
  { id: 2, name: "Product 2", categoryId: "cat123" },
  { id: 3, name: "Product 3", categoryId: "cat123" },
  // Add more as needed
];

export function useGetCategory() {
  const { categoryId } = useParams(); // example route: /products/:categoryId
  return { id: categoryId, name: `Category ${categoryId}` };
}

export function usePagination(categoryId) {
  const [getCurrentPage] = useState(1);
  return { getCurrentPage };
}

export function usePriceRange(categoryId) {
  return { getMin: null, getMax: null };
}

export function useGetTradeMarks(categoryId) {
  return { getTradeMarkFilter: null };
}

export function useLoading() {
  const [getLoading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // simulate loading
    return () => clearTimeout(timer);
  }, []);
  return { getLoading, setLoading };
}

export function useGetProductsByCategoryId(category, page, min, max, trademarks, setLoading) {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      const filtered = mockProducts.filter(p => p.categoryId === category?.id);
      setProducts(filtered);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [category, page, min, max, trademarks]);

  return products;
}
