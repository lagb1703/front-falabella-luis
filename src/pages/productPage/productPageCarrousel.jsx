import {
  Box,
  Grid,
  Image,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Slider from "react-slick";
import "./productPageStyles.css";

export default function ImageCarousel() {
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
    infinite: true,

    speed: 500,

    slidesToShow: 1,

    slidesToScroll: 1,

    variableWidth: false,

    adaptiveHeight: true,

    arrows: false,

    beforeChange: (_, newIndex) => setCurrentSlide(newIndex), // Update current slide index
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();

    const x = ((e.clientX - left) / width) * 100; // % position inside image

    const y = ((e.clientY - top) / height) * 100;

    setHoverPos({ x, y });
  };

  return (
    <Box
      position="relative"
      height={sizeBox + thumbnailBox}
      width="full"
      overflow="hidden"
      alignItems="center"
    >
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
          <Box
            key={index}
            height={sizeBox}
            minHeight={sizeBox}
            overflow="hidden"
          >
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
                transform: `scale(1.8)`,

                transformOrigin: `${hoverPos.x}% ${hoverPos.y}%`, // THANK GOD THE FUCKING ZOOM WORKS
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
            border={
              index === currentSlide
                ? "3px solid blue"
                : "2px solid transparent"
            }
            onClick={() => slider?.slickGoTo(index)}
            transition="0.3s"
            _hover={{ transform: "scale(1.1)", border: "3px solid blue" }}
          />
        ))}
      </HStack>
    </Box>
  );
}
