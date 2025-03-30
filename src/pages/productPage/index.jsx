import { Box, Grid, Image, Text, Button, VStack, HStack, Divider, Badge, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Slider from "react-slick";

export default function ProductPage() {
    return (  
        <Product product={{
            name: "Motorola Edge 50 Fusion 256GB",
            image: "https://link-to-image.com",
            price: 899900,
            originalPrice: 2299900,
            discount: 61,
            description: "Celular con cámara de 50MP, pantalla de 6.7 pulgadas y procesador Snapdragon 6 Gen 1."
        }}
        />
    );
}

const Product = ({ product }) => {
  return (
    <Box p={5} bg="green.200" maxW="92vw" mx="auto" borderWidth="1px" borderRadius="lg" boxShadow="md">
       <Grid templateColumns="repeat(2, 1fr)" gap={4}>
        {/* Product Image */}
        <ImageCarousel />

        {/* Product Details */}
        <VStack bg="blue.200" align="start" p={4} borderRadius="md">
            <Text fontSize="2xl" fontWeight="bold">{product.name}</Text>
        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
          <HStack bg="red.200" p={4} borderRadius="md">
            <Text>{product.description}</Text>
          </HStack>

          <Box bg="green.200" p={4} borderRadius="md">
                <Badge colorScheme="green">{product.discount}% OFF</Badge>
                <Text fontSize="xl" color="red.500" fontWeight="bold">
                ${product.price}
                </Text>
                <Text fontSize="lg" textDecoration="line-through" color="gray.500">
                ${product.originalPrice}
                </Text>
                <Divider />
                <HStack>
                    <Button colorScheme="blue">Agregar al Carrito</Button>
                </HStack>
            </Box>
        </Grid>
        </VStack>
      </Grid>
    </Box>
  );
};


function ImageCarousel() {
  const [slider, setSlider] = useState(null);
  const [hoverPos, setHoverPos] = useState({ x: 50, y: 50 }); // Initial position
  const [currentSlide, setCurrentSlide] = useState(0);

  const sizeBox = "200px";
  const thumbnailBox = "60px";

  const cards = [
    "/home_images/anuncioHome1.webp",
    "/home_images/anuncioHome2.webp",
    "/home_images/anuncioHome3.webp",
    "/home_images/anuncioHome4.webp",
    "/home_images/cute.jpg",
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: false,
    adaptiveHeight: true,
    beforeChange: (_, newIndex) => setCurrentSlide(newIndex), // Update current slide index
  };

  // Handle Mouse Move
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100; // % position inside image
    const y = ((e.clientY - top) / height) * 100;
    setHoverPos({ x, y });
  };

  return (
    <Box position="relative" height={sizeBox + thumbnailBox} width="full" overflow="hidden" alignItems="center">
      {/* Left Icon */}
      <IconButton
        aria-label="left-arrow"
        borderRadius="full"
        position="absolute"
        left="5%"
        top="50%"
        transform="translate(0%, -50%)"
        zIndex={2}
        onClick={() => slider?.slickPrev()}
      >
        <IoIosArrowBack />
      </IconButton>

      {/* Right Icon */}
      <IconButton
        aria-label="right-arrow"
        borderRadius="full"
        position="absolute"
        right="5%"
        top="50%"
        transform="translate(0%, -50%)"
        zIndex={2}
        onClick={() => slider?.slickNext()}
      >
        <IoIosArrowForward />
      </IconButton>

      {/* Slider */}
      <Slider {...settings} ref={setSlider}>
        {cards.map((url, index) => (
          <Box key={index} height={sizeBox} minHeight={sizeBox} overflow="hidden">
            <Image
              src={url}
              alt={`Slide ${index}`}
              objectFit="cover"
              width="100%"
              height="100%"
              display="block"
              transition="transform 0.1s ease-out"
              onMouseMove={handleMouseMove}
              _hover={{
                transform: `scale(1.4) translate(${50 - hoverPos.x}%, ${50 - hoverPos.y}%)`,
              }}
            />
          </Box>
        ))}
      </Slider>

      {/* Thumbnails Below Carousel */}
      <HStack mt={4} justify="center" spacing={2}>
        {cards.map((url, index) => (
          <Image
            key={index}
            src={url}
            alt={`Thumbnail ${index}`}
            width={thumbnailBox}
            height={thumbnailBox}
            objectFit="cover"
            cursor="pointer"
            borderRadius="md"
            border={index === currentSlide ? "3px solid blue" : "2px solid transparent"}
            onClick={() => slider?.slickGoTo(index)}
            transition="0.3s"
            _hover={{ transform: "scale(1.1)", border: "3px solid blue" }}
          />
        ))}
      </HStack>

    </Box>
  );
}


