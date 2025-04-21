import {
    Box,
    HStack,
    IconButton,
  } from "@chakra-ui/react";
  import { useState } from "react";
  import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
  import Slider from "react-slick";
  import ProductCard from "@/components/productCard"; // Adjust path if needed
  import "./productCarousel.css";
  
  export default function ProductCarousel({ products }) {
    const [slider, setSlider] = useState(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const thumbnailBox = "60px";
  
    const settings = {
      infinite: true,
      slidesToShow: 6,
      slidesToScroll: 3,
      variableWidth: false,
      adaptiveHeight: true,
      beforeChange: (_, newIndex) => setCurrentSlide(newIndex),
    };
  
    return (
      <Box position="relative" width="70%" overflow="hidden" alignItems="center" textAlign="left">
        {/* Left Arrow */}
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
  
        {/* Right Arrow */}
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
  
        {/* ProductCard Slider */}
        <Slider {...settings} ref={setSlider}>
          {products?.map((product, index) => (
            <Box key={index} px={2}>
              <ProductCard product={product} />
            </Box>
          ))}
        </Slider>
  
       {/* Optional: Thumbnail dots 
        <HStack mt={4} justify="center" spacing={2}>
          {products?.map((_, index) => (
            <Box
              key={index}
              width={thumbnailBox}
              height="5px"
              backgroundColor={index === currentSlide ? "gray.600" : "gray.300"}
              borderRadius="md"
              cursor="pointer"
              onClick={() => slider?.slickGoTo(index)}
            />
          ))}
        </HStack>*/}
      </Box>
    );
  }
  