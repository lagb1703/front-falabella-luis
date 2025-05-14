import {
  Box,
  Grid,
  Image,
  Text,
  Button,
  GridItem,
  VStack,
  HStack,
  Divider,
  Badge,
  UnorderedList,
  Heading,
  Progress,
  ListItem,
  Icon,
  Flex,
  Avatar,
  Input,
  Wrap,
  WrapItem,
  Center,
} from "@chakra-ui/react";
import {
  useGetProduct,
  useCart
} from "./productPage.service.jsx";
import "./productPageStyles.css";
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Circle } from "@chakra-ui/react";
import ImageCarousel from "./productPageCarrousel.jsx";
import { RiHeartAddLine } from "react-icons/ri";
import { TbTruckDelivery } from "react-icons/tb";
import { BoxSelectIcon, PackageCheck } from 'lucide-react';
import { LuPackageSearch } from "react-icons/lu";
import StaticRating from "@/components/starRating";
import { RiStarFill} from "react-icons/ri";
import { 
  useShoppingCartNumberItems,
  useUserLogin,
  useUserLocationChance,
  defaultUserName,
  defaultUserLocation,
  useGetColombiaStatesMenuOption,
  useItemEvents,
  useAdministrateMenu,
  useGetColombiaCityMenuOption,
  useDeleteInput,
  useGetColombiaNeighborhoodMenuOption,
  saveClick
} from "./popUps/popUps.service";
import { DespachoDomicilio } from "./popUps/popUps.jsx";
import { Star, ThumbsUp, ThumbsDown } from "lucide-react"
import { comment } from "postcss";
import ProductCarousel from "@/components/productCarousel";

export default function ProductPage() {
  const getProduct = useGetProduct();
  return (
    <>
      <Product
        product={{
          name: getProduct?.nombre || "Celular Motorola Edge 50 Fusion 256GB",
          brand: getProduct?.getProduct || "MOTOROLA",
          code: getProduct?._id || "MOT50FUSION256",
          shopCode: getProduct?._id || "MOT50FUSION256",
          rating: getProduct?.calificacion|| 4.5,
          price: (getProduct?.precio * (1 - getProduct?.descuento)) || "899.900",
          originalPrice: getProduct?.precio || "2.299.900",
          comment: 
            (getProduct?.comentarios?.length > 0) 
              ? getProduct.comentarios.slice(0, 4).map((item) => {
                  // Debug each item before processing
                  console.log("Processing comment:", item);
                  
                  return {
                    name: item?.nombre || "Anonymous",
                    frase: item?.frase || "",
                    rating: item?.calificacion || item?.calificación || 0, // Handle both spellings
                    commentInfo: item?.comentario || "No review provided",
                    recommendable: item?.recomendable || false
                  }
                })
              : [],
          discount: getProduct?.descuento * 100,
          basicSpecifications:
            (getProduct) ? getProduct.especificaciones.slice(0, 4).map((item) => {
              return {
                name: item.expecificacion,
                value: item.valor
              }
            }) : [],
          specifications:
            (getProduct) ? getProduct.especificaciones.slice(4, getProduct.especificaciones.length).map((item) => {
              return {
                name: item.expecificacion,
                value: item.valor
              }
            }) : [],
          moreInfo: getProduct?.informacionAdicional || "No hay información adicional disponible",
          imagesProduct: (getProduct) ? getProduct?.imagenes : []
        }}
      />
    </>
  );
}

const Product = ({ product }) => {
  const { 
    addToCart,
    getAmount,
    addAmount,
    removeAmount,
    setInputAmount
  } = useCart(product);
  return (
    <>
      <Box
        p={5}
        bg="white"
        maxW="92vw"
        mx="auto"
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="md"
        marginTop={4}
        marginBottom={4}
        fontFamily="products.title"
      >

        <Grid templateColumns={{ base: "1fr", md: "1fr 1.3fr" }} gap={6}>

          <ImageCarousel imagesProduct={product.imagesProduct} />


          <VStack align="right" p={4} borderRadius="md">

            <ProductHeader product={product} />

            <StaticRating rating={product.rating} />

            <Divider 
              borderColor="gray.200" 
              borderWidth="1px"     
              my={6}                
            />

            <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>

              <VStack p={4} borderRadius="md"> {/*Columna de la izquierda*/}
                <ProductSpecifications basicSpecifications={product.basicSpecifications} />
                <DeliveryOptions />
              </VStack>

              <Box p={4} borderRadius="md"> {/*Columna de la derecha*/}

                <Grid templateColumns={{ base: "1fr", md: "fr 1fr" }} gap={6}>
                  <Image src="https://www.falabella.com.co/a/fa/product/static/styles/svg/cmrIcon-alt.svg" alt="Sigue lloviendo el corazón" />
                </Grid>

                <HStack>
                  <Text fontSize="1.7rem" color="red.500">
                    ${product.price}
                  </Text>
                  <Badge bg="red" color="white" >{product.discount}%</Badge>
                  <Box display="flex" width={"100%"} justifyContent="right" alignContent="right">
                    <RiHeartAddLine size="35px" color="#90959B" strokeWidth={"0.3"}/>
                  </Box>
                </HStack>


                <Text
                  fontSize="1.2rem"
                  textDecoration="line-through"
                  color="gray.500"
                >
                  ${product.originalPrice}
                </Text>

                <Divider />
                <Flex 
                  as="div"
                  w="112px"
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  m="10px 0">
                  <Button 
                    fontSize="0.9rem"
                    fontWeight="500"
                    bottom="10px"
                    color="#333"
                    backgroundColor="#eee"
                    borderRadius="2px"
                    left="0"
                    top="0"
                    width="35px"
                    height="35px"
                    onClick={removeAmount}
                    disabled={getAmount == 1}>-</Button>
                  <Input 
                    p="0"
                    textAlign="center"
                    fontSize="0.9rem"
                    fontWeight="400"
                    lineHeight="19.2px"
                    backgroundColor="transparent"
                    border="none"
                    value={getAmount} 
                    onChange={setInputAmount}
                    type="number" 
                    min="1"/>
                  <Button 
                    fontSize="0.9rem"
                    fontWeight="500"
                    bottom="10px"
                    color="#333"
                    backgroundColor="#eee"
                    borderRadius="2px"
                    left="0"
                    top="0"
                    width="35px"
                    height="35px"
                    onClick={addAmount}>+</Button>
                </Flex>
                <HStack>
                  <Button
                    w="100%"
                    borderRadius="30px"
                    onClick={addToCart}>Agregar al Carro</Button>
                </HStack>
              </Box>
            </Grid>
          </VStack>
        </Grid>
      </Box>

      <Box>
        <ProductSpecsContainer
          moreInfo={product.moreInfo}
        />
      </Box>

      <Box 
        marginTop={4}
        marginBottom={4}
        p={5}
        bg="white"
        maxW="92vw"
        mx="auto"
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="md">
        <ProductCarousel categoryId="68065330709a122a6c8628b8" nameBanner="Más opciones similares" carouselWidth="100%"/>
      </Box>

      <Box 
        marginTop={4}
        marginBottom={4}
        p={5}
        bg="white"
        maxW="92vw"
        mx="auto"
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="md">
        <ProductCarousel categoryId="67f3d66fcf122c47fcb4422f" nameBanner="También podría interesarte" carouselWidth="92vw"/>
      </Box>

      <Box>
        <ProductCommentsContainer product={product} /> 
      </Box>

    </>
  );
};

function ProductHeader({ product }) {

  // const Demo = () => {
  //     const store = useRatingGroup({ count: 5, defaultValue: 3 })   
  //     return (  
  //     <RatingGroup.RootProvider value={product.rating} size="sm"> 
  //     <RatingGroup.HiddenInput /> 
  //     <RatingGroup.Control />    
  //     </RatingGroup.RootProvider>
  //     )
  //   }


  return (
    <Grid templateColumns={{ base: "3fr", md: "2fr 1fr" }} gap={6}>

      <Text fontSize="13px" fontWeight="bold">
        {product.brand}
      </Text>

      <Text fontSize="11px" textAlign="right" fontWeight="regular">
        Código: {product.code}
      </Text>

      {/* <Text fontSize="11px" textAlign="right" fontWeight="regular">
        Cód.tienda: {product.shopCode}
      </Text> */}

      <Text gridColumn="span 3" color="#515151" fontSize="18px" fontWeight="light">
        {product.name}
      </Text>

    </Grid>
  );
}

const ProductSpecifications = ({ basicSpecifications }) => {
  return (
    <Box
      bg="#FAFAFA"
      mt={6}
      borderWidth="1px"
      borderRadius="lg"
      borderColor={"white"}
      p={4}
      boxShadow="sm"
      fontSize="14px"
    >
      <Text fontSize="16px" fontWeight="bold" mb={4}>
        Especificaciones principales
      </Text>

      <VStack align="stretch" spacing={3} divider={<Divider />}>
        <UnorderedList styleType="none" m={0} p={0}>
          {basicSpecifications.map((spec, index) => (
            <ListItem key={index} display="flex" gap={2}>
              <Text fontWeight="medium" color="gray.600">
                {spec.name}:
              </Text>
              <Text>{spec.value}</Text>
            </ListItem>
          ))}
        </UnorderedList>
      </VStack>


      <Accordion allowToggle mt={4}>
        <AccordionItem border="none">
          <AccordionButton px={0} _hover={{ bg: "transparent" }}>
            <Box flex="1" textAlign="left">
              <Text color="text.200" fontWeight="medium">
                Ver más especificaciones
              </Text>
            </Box>
            <AccordionIcon color="blue.500" />
          </AccordionButton>
          <AccordionPanel pb={4} px={0}>
            {/* Additional specifications would go here */}
            <Text color="gray.500">Más detalles técnicos aparecerían aquí...</Text>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

    </Box>
  );
};

function DeliveryOptions() {
  return (
    <Box
      borderWidth="1px"
      borderRadius="md"
      borderColor="#41E770"
      fontSize="12px"
      p={2}
      mt={3}
      width="100%"
      overflow="hidden"
    >
      <Grid templateColumns="repeat(3, minmax(0, 1fr))" gap={4} alignItems="stretch">
        {[
          { text: "Despacho a domicilio", icon: <TbTruckDelivery size="25px" strokeWidth={"1.4"} color="#276749" /> },
          { text: "Retira tu compra", icon: <PackageCheck  size="25px" strokeWidth={"1.4"} color="#276749" /> },
          { text: "Stock en tienda", icon: <LuPackageSearch size="25px" strokeWidth={"1.4"} color="#276749" /> }
        ].map((item) => (
          <GridItem key={item.text} display="flex">
            <Button
              variant="unstyled"
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              width="100%"
              height="100%"
              p={2}
            >
              <Circle size="50px" bg="#DAFEE3" mb={2} borderWidth="1px" borderColor="#41E770">
                {item.icon}
              </Circle>
              <Text 
                fontWeight="medium" 
                fontSize="12px"
                textAlign="center"
                whiteSpace="wrap"
                textDecoration="underline" 
              >
                {item.text}
              </Text>
            </Button>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
}

const ProductSpecsContainer = ({ moreInfo }) => { //NO TOCAR ESTO ESTA MUY MALO PERO SIRVE COMO PLACEHOLDER
  return (
    <Box
      p={5}
      bg="white"
      maxW="92vw"
      mx="auto"
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="md"
      marginTop={4}
      marginBottom={4}
    >

      <Grid templateColumns={{ base: "1fr", md: "0.7fr 1fr" }} gap={4} mb={6}>
        <Box ml={"20px"} mr={"20px"}>
          <Text fontSize="1rem" fontWeight="bold" color="gray.600" mb={4}>
            Especificaciones
          </Text>
          <Divider borderWidth={"1.7px"} borderColor={"#495867"} marginBottom={"15px"}/>
          <Text fontSize="0.8rem" color="gray.600">
            {moreInfo}
          </Text>
        </Box>
      
        <Box ml={"20px"} mr={"20px"}>
          <Text fontSize="1rem" fontWeight="bold" color="gray.600" mb={4}>
            Información adicional
          </Text>
          <Divider borderWidth={"1.7px"} borderColor={"#495867"} marginBottom={"15px"}/>
          <Text fontSize="0.8rem" color="gray.600">
            No hay información adicional sobre este producto
          </Text>
        </Box>
      </Grid>

      {/*{moreInfo?.additionalSpecs && (
        <Accordion allowToggle>
          <AccordionItem border="none">
            <AccordionButton px={0} _hover={{ bg: "transparent" }}>
              <Box flex="1" textAlign="left">
                <Text color="blue.500" fontWeight="medium">
                  Ver más
                </Text>
              </Box>
              <AccordionIcon color="blue.500" />
            </AccordionButton>
            <AccordionPanel pb={4} px={0}>
              <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                {moreInfo.additionalSpecs.map((spec, index) => (
                  <Box key={index}>
                    <Text fontSize="sm" color="gray.600" mb={1}>
                      {spec.name}
                    </Text>
                    <Text fontWeight="medium">{spec.value}</Text>
                    {index < moreInfo.additionalSpecs.length - 1 && <Divider my={3} />}
                  </Box>
                ))}
              </Grid>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      )}*/}
    </Box>
  );
};

const ProductCommentsContainer = ( {product} ) => { // BAJO CONSTRUCCIÓN NO TOCAR QUE SE EXPLOTA TODO


  const ratingDistribution = [
    { stars: 5, number: 65 },
    { stars: 4, number: 20 },
    { stars: 3, number: 10 },
    { stars: 2, number: 3 },
    { stars: 1, number: 2 },
  ]

  return (
    <Box
      p={5}
      bg="white"
      maxW="92vw"
      mx="auto"
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="md"
      marginTop={4}
      marginBottom={4}
    >

        <Box ml={"20px"} mr={"20px"}>
          <Text fontSize="1rem" fontWeight="bold" color="gray.600" mb={4}>
            Comentarios de este producto
          </Text>
          <Divider borderWidth={"1.7px"} borderColor={"#495867"} marginBottom={"15px"}/>

          <Box bg="white" borderRadius="md" p={6} mb={4}>

            <Grid templateColumns={{ base: "1fr", md: "450px 1fr" }} gap={8}>

              <GridItem mb={4}>
                <HStack align="start" spacing={4}>

                  <Box textAlign="center" alignItems="center" w="50%">
                    <Heading size="xl">{product.rating} / 5</Heading>
                    <Box alignItems="center" w="100%">
                      <StaticRating rating={product.rating} />
                    </Box>
                    <Text fontSize="sm" color="gray.500">
                      Basado en muchas valoraciones
                    </Text>
                  </Box>

                  <Box w="100%">
                    {ratingDistribution.map((item) => (
                      <HStack key={item.stars} mb={2}>
                        <Icon as={RiStarFill}
                            w={5}
                            h={3}
                            color="gray"/>
                        <Progress value={item.number} size="sm" colorScheme="gray" h="3px" w="full" borderRadius="full" />
                        <Text fontSize="sm" w="40px">
                          {item.number}
                        </Text>
                      </HStack>
                    ))}
                  </Box>
                </HStack>
              </GridItem>

            </Grid>

            <Wrap  align={"top"} justify="left" w={"100%"} spacing="10px">
                {product.comment.map((comment) => (
                    <WrapItem key={comment.id} w="30%">
                        <Box
                            p={4}
                            borderWidth="1px"
                            borderRadius="md"
                            boxShadow="sm"
                            bg="white"
                            minW={"100%"}
                          >
                          <Avatar name={comment.name} size="sm" bg="gray.300" />
                            <HStack mb={1}>
                              <Text fontWeight="bold">{comment.name}</Text>
                            </HStack>
                            <StaticRating rating={comment.rating} />
                            <Text fontWeight="medium" mb={1}>
                              {comment.frase}
                            </Text>
                            <Text fontSize="sm" mb={3}>
                              {comment.commentInfo}
                            </Text>
                            {/* <HStack>
                              <Button size="xs" variant="ghost" leftIcon={<Icon as={ThumbsUp} boxSize={3} />}>
                                {comment.likes}
                              </Button>
                              <Button size="xs" variant="ghost" leftIcon={<Icon as={ThumbsDown} boxSize={3} />}>
                                {comment.dislikes}
                              </Button>
                            </HStack> */}
                        </Box>
                    </WrapItem>
                  ))}
              </Wrap> 

              <Button variant="outline" size="sm" mt={6} mx="auto" display="block">
                  Ver más comentarios
              </Button>
          </Box>
        </Box>
    </Box>
  )
}
