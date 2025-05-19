import {
  Box,
  IconButton,
  useBreakpointValue,
  Container,
  Stack,
  SimpleGrid,
  Text,
  Image,
  Flex
} from "@chakra-ui/react";
import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Slider from "react-slick"; // npm install react-slick slick-carousel
import "./examplePage.css";
import ProductCarousel from "@/components/productCarousel";
import { useGetNavigationSubFooter, useGetProductsByCategoryId } from "./examplePage.service.jsx"; //ERROR
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Link } from "react-router"
import { v4 as uuid } from "uuid";

export default function ExamplePage() {

  return (
    <Box bg="white">
      <Carousel />
      <ProductCarousel categoryId="67f3d66fcf122c47fcb4422f" nameBanner="Lo más vendido en Tecnología" carouselWidth="85%"/>
      <ProductCarousel categoryId="68065330709a122a6c8628b8" nameBanner="Inspirado en lo que viste" carouselWidth="85%"/>
      <ProductCarousel categoryId="67f4135dfa50f2b6c86a5876" nameBanner="Lo más vendido" carouselWidth="85%"/>
      <SubFooter />
    </Box>
  );
}

function Carousel() {
  const [slider, setSlider] = useState(null);

  const top = useBreakpointValue({ base: "50%", md: "50%" }); // Centrar
  const side = useBreakpointValue({ base: "5%", md: "20px" }); // Separar del borde
  const sizeBox = "345px"

  const cards = [
    "/home_images/anuncioHome1.webp",
    "/home_images/anuncioHome2.webp",
    "/home_images/anuncioHome3.webp",
    "/home_images/anuncioHome4.webp",
    "/home_images/cute.jpg",
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,  // para que solo se vea una imagen a la vez
    slidesToScroll: 1,
    variableWidth: false,  // Que la imagen no se vaya a alargar
    adaptiveHeight: true,  // Que se adapte al alto de la imagen
  };

  return (
    <Box position="relative" height={sizeBox} width="full" overflow="hidden" alignItems="center">
      {/* Left Icon */}
      <IconButton
        aria-label="left-arrow"
        borderRadius="full"
        position="absolute"
        left={side}
        top={top}
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
        right={side}
        top={top}
        transform="translate(0%, -50%)"
        zIndex={2}
        onClick={() => slider?.slickNext()}
      >
        <IoIosArrowForward />
      </IconButton>

      {/* Slider */}
      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {cards.map((url, index) => (
          <Box key={index} height={sizeBox} minHeight={sizeBox} position="relative" >
            <Image
              src={url}
              alt={`Slide ${index}`}
              objectFit="cover"
              width="100%"
              height="100%"
              display="block"
            />
          </Box>
        ))}
      </Slider>
    </Box>
  );
}

function SubFooter() {
  return (
    <Box as="section" color="#525252">
      <Container
        bg={
          {
            base: "subfooter.600",
            md: "subfooter.700"
          }
        }
        marginX="0"
        maxW="100%"
        py={10}
        px={
          {
            base: "10",
            md: "40",
            lg: "60"
          }
        }>
        <Navigation />
      </Container>
      <Container
        bg="subfooter.600"
        maxW="100%"
        marginX="0"
        px={
          {
            base: "40",
            sm: "10",
            md: "40"
          }
        }>
      </Container>
    </Box>
  )
}

function Navigation() {
  const data = useGetNavigationSubFooter()
  if (window.innerWidth < 720)
    return (
      <Accordion type="single" collapsible className="w-full">
        {data.map((item, i) => {
          return (
            <AccordionItem className="py-10" value={`item-${i}`} fontFamily="footer.p" key={uuid()}>
              <AccordionTrigger
                key={uuid()}
              >
                <Text
                  fontWeight="bold"
                  fontSize={{ base: "sm", md: "md" }}
                  mb={2}
                  key={uuid()}
                >
                  <b>{item.tittle}</b>
                </Text>
              </AccordionTrigger>
              <AccordionContent className="">
                <Stack spacing={0} fontFamily="footer.p" key={uuid()}>
                  {
                    item.links.map(l => {
                      return (
                        <Link href={l.href} key={uuid()}>
                          <Text
                            as="span"
                            fontSize={{ base: "xs", md: "sm" }}
                            _hover={{ color: "#525252" }}>{l.name}</Text>
                        </Link>)
                    })
                  }
                </Stack>
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
    )
  return (
    <SimpleGrid columns={{ base: 2, md: 4 }} spacing="16" mb={8}>{
      data.map(item => {
        return (
          <Stack spacing={0} fontFamily="footer.p" key={uuid()}>
            <Text
              fontWeight="bold"
              fontSize={{ base: "xs", md: "sm" }}
              mb={2}
              key={uuid()}
            >
              <b>{item.tittle}</b>
            </Text>
            {
              item.links.map(l => {
                return (
                  <Link href={l.href} key={uuid()}>
                    <Text
                      as="span"
                      fontSize={{ base: "xs", md: "sm" }}
                      _hover={{ color: "#525252" }}>{l.name}</Text>
                  </Link>)
              })
            }
          </Stack>
        )
      })
    }
    </SimpleGrid>
  )
}
