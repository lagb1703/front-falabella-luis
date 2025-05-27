import {
  Box,
  IconButton,
  useBreakpointValue,
  Container,
  Stack,
  SimpleGrid,
  Text,
  Image,
  Flex,
  Grid,
  GridItem
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
    
  const setOfAds_1 = [
      ["/AdsFolder/Set1/Ad1.webp","67f3d66fcf122c47fcb4422f","a"],
      ["/AdsFolder/Set1/Ad2.webp","67f3d66fcf122c47fcb4422f","b"],
      ["/AdsFolder/Set1/Ad3.webp","67f3d66fcf122c47fcb4422f","c"],
      ["/AdsFolder/Set1/Ad4.webp","67f3d66fcf122c47fcb4422f","d"],
      ["/AdsFolder/Set1/Ad5.webp","67f3d66fcf122c47fcb4422f","e"],
      ["/AdsFolder/Set1/Ad6.webp","67f3d66fcf122c47fcb4422f","f"],
      ["/AdsFolder/Set1/Ad7.webp","67f3d66fcf122c47fcb4422f","g"],
      ["/AdsFolder/Set1/Ad8.webp","67f3d66fcf122c47fcb4422f","h"],
      ["/AdsFolder/Set1/Ad9.webp","67f3d66fcf122c47fcb4422f","i"],
      ["/AdsFolder/Set1/Ad10.webp","67f3d66fcf122c47fcb4422f","j"],
      ["/AdsFolder/Set1/Ad11.webp","67f3d66fcf122c47fcb4422f","k"],
    ];

    const setOfAds_2 = [
      ["/AdsFolder/Set2/Ad1.webp","67f3d66fcf122c47fcb4422f","a"],
      ["/AdsFolder/Set2/Ad2.webp","67f3d66fcf122c47fcb4422f","b"],
      ["/AdsFolder/Set2/Ad3.webp","67f3d66fcf122c47fcb4422f","c"],
      ["/AdsFolder/Set2/Ad4.webp","67f3d66fcf122c47fcb4422f","d"],
      ["/AdsFolder/Set2/Ad5.webp","67f3d66fcf122c47fcb4422f","e"],
      ["/AdsFolder/Set2/Ad6.webp","67f3d66fcf122c47fcb4422f","f"],
      ["/AdsFolder/Set2/Ad7.webp","67f3d66fcf122c47fcb4422f","g"],
      ["/AdsFolder/Set2/Ad8.webp","67f3d66fcf122c47fcb4422f","h"],
      ["/AdsFolder/Set2/Ad9.webp","67f3d66fcf122c47fcb4422f","i"],
      ["/AdsFolder/Set2/Ad10.webp","67f3d66fcf122c47fcb4422f","j"],
      ["/AdsFolder/Set2/Ad11.webp","67f3d66fcf122c47fcb4422f","k"],
    ];

    const setOfAds_3 = [
      ["/AdsFolder/Set3/Ad1.webp","67f3d66fcf122c47fcb4422f","a"],
      ["/AdsFolder/Set3/Ad2.webp","67f3d66fcf122c47fcb4422f","b"],
      ["/AdsFolder/Set3/Ad3.webp","67f3d66fcf122c47fcb4422f","c"],
      ["/AdsFolder/Set3/Ad4.webp","67f3d66fcf122c47fcb4422f","d"],
      ["/AdsFolder/Set3/Ad5.webp","67f3d66fcf122c47fcb4422f","e"],
    ];

    const sizeBox = "90%"

  return (
    <Box bg="white">
      <Carousel />
      <ProductCarousel categoryId="67f3d66fcf122c47fcb4422f" nameBanner="Lo más vendido en Tecnología" carouselWidth={sizeBox}/>
      <AdGrid setOfAds={setOfAds_1} sizeBox={sizeBox} typeAdWindow={1} />
      <ProductCarousel categoryId="68065330709a122a6c8628b8" nameBanner="Inspirado en lo que viste" carouselWidth={sizeBox}/>
      <AdGrid setOfAds={setOfAds_2} sizeBox={sizeBox} typeAdWindow={2} />
      <ProductCarousel categoryId="67f4135dfa50f2b6c86a5876" nameBanner="Lo más vendido" carouselWidth={sizeBox}/>
      <AdGrid setOfAds={setOfAds_3} sizeBox={sizeBox} typeAdWindow={3} />
      <ProductCarousel categoryId="67f3d66fcf122c47fcb4422f" nameBanner="Lo más vendido en Tecnología" carouselWidth={sizeBox}/>
      <SubFooter/>
    </Box>
  );
}

function Carousel() {
  const [slider, setSlider] = useState(null);

  const top = useBreakpointValue({ base: "50%", md: "50%" }); // Centrar
  const side = useBreakpointValue({ base: "5%", md: "20px" }); // Separar del borde
  const sizeBox = "345px"

  const cards = [
    ["/home_images/anuncioHome1.webp","67f3d66fcf122c47fcb4422f"],
    ["/home_images/anuncioHome2.webp","67f3d66fcf122c47fcb4422f"],
    ["/home_images/anuncioHome3.webp","67f3d66fcf122c47fcb4422f"],
    ["/home_images/anuncioHome4.webp","67f3d66fcf122c47fcb4422f"],
    ["/home_images/cute.jpg","67f3d66fcf122c47fcb4422f"],
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
        {cards.map(([url, adLink], index) => (
          <Box key={index} height={sizeBox} minHeight={sizeBox} position="relative" >
            <Link to={`/categories/${adLink}`}>
              <Image
              src={url}
              alt={`Slide ${index}`}
              objectFit="cover"
              width="100%"
              height="100%"
              display="block"
            />
            </Link>
          </Box>
        ))}
      </Slider>
    </Box>
  );
}

function SubFooter() {
  return (
    <Box as="section" color="#525252" >
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
            lg: "90"
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

function AdGrid({ setOfAds, sizeBox, typeAdWindow }) {

  const gridConfigs = {
    1: { 
        n : 11,
        rows: 'auto auto auto auto', 
        columns: 'auto auto auto auto', 
        gap: 3, 
        templateAreas: `"a a a a a a a a a a a a" 
                        "b b b b c c c c d d d d"
                        "e e e e f f f f g g g g"
                        "h h h i i i j j j k k k"` },  
    2: { 
        n : 11,
        rows: 'auto auto auto auto', 
        columns: 'auto auto auto auto', 
        gap: 3, 
        templateAreas: `"a a a a" 
                        "b c d e"
                        "f g h i"
                        "j j k k"` },
    3: { 
        n : 5,
        rows: 'auto auto auto auto', 
        columns: 'auto auto auto auto', 
        gap: 3, 
        templateAreas: `"a b" 
                        "c d"
                        "e e"` },
  };

  const config = gridConfigs[typeAdWindow] || gridConfigs[1]; // Default to type 1

    return (
      <Box 
        position="relative" 
        marginY="2%" 
        width={sizeBox} 
        maxWidth="100%"
        mx="auto"
        height="auto"
      >
        <Grid
          templateAreas={`${config.templateAreas}`}
          templateRows={`repeat(${config.rows}, 1fr)`}
          templateColumns={`repeat(${config.columns}, 1fr)`}
          gap={config.gap}
        >
          {setOfAds.slice(0,config.n).map(([url, adLink, area], index) => (
            <GridItem 
              key={index}
              area={area}
              position="relative"
              overflow="hidden"
              _hover={{ // EL SEÑOR DE LA NOCHE (es un hover que oscurece la imagen y le da un brillo)
                opacity: 1,
                filter: 'brightness(0.9)',
            }}
              width="auto"
              height="auto"
              objectFit="cover"
            >
              <Link to={`/categories/${adLink}`}>
                <Image
                  src={url}
                  alt={`Advertisement ${index + 1}`}
                  width="auto"
                  height="auto"
                  objectFit="contain"
                />
              </Link>
            </GridItem>
          ))}
        </Grid>
      </Box>
    );
}

