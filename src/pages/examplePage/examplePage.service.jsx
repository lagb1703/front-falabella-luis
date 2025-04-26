import {
    backendURL,
    isDevelopment
  } from "@/pages"
import subfooterNavigationMock from "./mocks/subFooterHome.mock.json";
import {
  useState,
  useEffect,
  useCallback,
} from "react";

export function useGetNavigationSubFooter(){
    const [getData, setData] = useState([])
    useEffect(()=>{
        // const data = fetch(backendURL)
        // data.then(res => res.json()).then(res => setData(res.data))
        setData(subfooterNavigationMock);
    }, [])
    return getData
}

export function useGetProductsByCategoryId(
  category,
  setLoading
) {
  const [getProducts, setProducts] = useState([]);
  const fetchProducts = useCallback(async () => {
    try {
      if (!category) return;
      const data = await getProductsByCategoryId({
        categoryId: category.id,
      });
      setLoading(true);
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, [category]);
  useEffect(() => {
    fetchProducts();
  }, [category]);
  return getProducts;
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
  