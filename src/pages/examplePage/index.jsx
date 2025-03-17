import { useGetInformation } from "./examplePage";
import { useEffect } from "react";
import { v4 as uuid } from "uuid";
import { Button, Box, IconButton, useBreakpointValue } from "@chakra-ui/react";
import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Slider from "react-slick"; // npm install react-slick slick-carousel
import "./examplePage.css";

export default function ExamplePage() {
  return (
    <>
      <img src="/home_images/anuncio1.png" alt="Imagen de primer anuncio" />
      <Carousel />
    </>
  );
}



export function Carousel() {
  
  const [slider, setSlider] = useState(null);

  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const side = useBreakpointValue({ base: "30%", md: "10px" });

  const cards = [
    "/home_images/anuncio2.png",
    "/home_images/anuncio3.png",
  ];

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 2,
    arrows: false,
  };

  return (
    <Box position={"relative"} height={"345px"} width={"full"} overflow={"hidden"}>
      {/* Left Icon */}
      <IconButton
        aria-label="left-arrow"
        colorScheme="messenger"
        borderRadius="full"
        position="absolute"
        left={side}
        top={top}
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={() => slider?.slickPrev()}
      >
        <IoIosArrowBack />
      </IconButton>
      {/* Right Icon */}
      <IconButton
        aria-label="right-arrow"
        colorScheme="messenger"
        borderRadius="full"
        position="absolute"
        right={side}
        top={top}
        transform={"translate(0%, -50%)"}
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
            height={"6xl"}
            position="relative"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            backgroundImage={`url(${url})`}
          />
        ))}
      </Slider>
    </Box>
  );
}