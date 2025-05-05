import {
  Box,
  Grid,
  Image,
  HStack,
  IconButton,
  border,
} from "@chakra-ui/react";
import { useState, useContext } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Slider from "react-slick";
import imageContext from "@/gobal/image/image.context";
import {
  useImage
} from "@/components/productCard/productCard.service.jsx";
import "./productPageStyles.css";

export default function ImageCarousel({ imagesProduct }) {
  const [slider, setSlider] = useState(null);
  const [hoverPos, setHoverPos] = useState({ x: 50, y: 50 }); // Initial position
  const [currentSlide, setCurrentSlide] = useState(0);
  const sizeBox = "486px";
  const thumbnailBox = "60px";

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100; // % position inside image
    const y = ((e.clientY - top) / height) * 100;
    setHoverPos({ x, y });
  };

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
        position="absolute"
        left="0%"
        top="50%"
        transform="translate(0%, -100%)"
        zIndex={2}
        opacity={0.5}
        borderRadius="none"
        _hover={{}}
        color={"#343E49"}
        height="70px"
        backgroundColor={"white"}
        boxShadow="0 0 5px rgba(0, 0, 0, 0.2)"
        onClick={() => slider?.slickPrev()}
      >
        <IoIosArrowBack size="25px" />
      </IconButton>

      {/* Right Icon */}

      <IconButton
        aria-label="right-arrow"
        position="absolute"
        right="0%"
        top="50%"
        transform="translate(0%, -100%)"
        zIndex={2}
        opacity={0.5}
        borderRadius="none"
        _hover={{}}
        color={"#343E49"}
        height="70px"
        backgroundColor={"white"}
        boxShadow="0 0 5px rgba(0, 0, 0, 0.2)"
        onClick={() => slider?.slickNext()}
      >
        <IoIosArrowForward size="25px" />
      </IconButton>

      {/* Slider */}

      <Slider {...settings} ref={setSlider}>
        {imagesProduct?.map((url, index) => <BoxImage key={index} url={url} index={index} sizeBox={sizeBox} hoverPos={hoverPos} handleMouseMove={handleMouseMove} />)}
      </Slider>

      {/* Thumbnails Below Carousel */}

      <HStack mt={4} justify="center" spacing={2}>
        {imagesProduct?.map((url, index) => (
          <BigImage
            key={index}
            url={url}
            index={index}
            slider={slider}
            currentSlide={currentSlide}
            thumbnailBox={thumbnailBox}
          />
        ))}
      </HStack>
    </Box>
  );
}

function BigImage({ url, index, slider, currentSlide, thumbnailBox }) {
  const image = useImage(url);
  return (
    <Image
      src={image}
      alt={`Thumbnail ${index}`}
      width={thumbnailBox}
      height={thumbnailBox}
      objectFit="cover"
      cursor="pointer"
      borderRadius="none"
      borderBottom={index === currentSlide ? "3px solid gray" : "2px solid transparent"}
      onClick={() => slider?.slickGoTo(index)}
      transition="0.3s"
      _hover={{ transform: "scale(1.1)" }}
    />
  )
}

function BoxImage({ url, index, sizeBox, hoverPos, handleMouseMove }) {
  
  const image = useImage(url);
  return (
    <Box
      height={sizeBox}
      minHeight={sizeBox}
      overflow="hidden"
    >
      <Image
        src={image}
        alt={`Slide ${index}`}
        objectFit="contain"
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
  )

}