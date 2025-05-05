import {
  Box,
  IconButton,
} from "@chakra-ui/react";
import { useCarrusel } from "./productCarousel.service.jsx";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Slider from "react-slick";
import ProductCard from "@/components/productCard"; // Adjust path if needed
import { 
  useProducts 
} from "./productCarousel.service.jsx";
import "./productCarousel.css";

export default function ProductCarousel({ categoryId, userId }) {
  const {
    slider,
    setSlider,
    settings
  } = useCarrusel();
  const { products } = useProducts(categoryId, userId);
  return (
    <Box position="relative" width="70%" overflow="hidden" alignItems="center" textAlign="left">
      <IconButton
        aria-label="left-arrow"
        position="absolute"
        left="0"
        top="50%"
        transform="translate(0%, -50%)"
        zIndex={2}
        opacity={0.5}
        borderRadius="none"
        color="#343E49"
        height="50px"
        backgroundColor="white"
        boxShadow="0 0 5px rgba(0, 0, 0, 0.2)"
        onClick={() => slider?.slickPrev()}
      >
        <IoIosArrowBack size="25px" />
      </IconButton>
      <IconButton
        aria-label="right-arrow"
        position="absolute"
        right="0"
        top="50%"
        transform="translate(0%, -50%)"
        zIndex={2}
        opacity={0.5}
        borderRadius="none"
        color="#343E49"
        height="70px"
        backgroundColor="white"
        boxShadow="0 0 5px rgba(0, 0, 0, 0.2)"
        onClick={() => slider?.slickNext()}
      >
        <IoIosArrowForward size="25px" />
      </IconButton>

      <Slider {...settings} ref={setSlider}>
        {products?.map((product, index) => (
          <Box key={index} px={2}>
            <div className="mini-product-style">
              <ProductCard product={product} />
            </div>
          </Box>
        ))}
      </Slider>
    </Box>
  );
}
