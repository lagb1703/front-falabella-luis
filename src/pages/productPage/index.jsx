import {
  Box,
  Grid,
  Image,
  Text,
  Button,
  VStack,
  HStack,
  Divider,
  Badge,
  IconButton,
  UnorderedList,
  ListItem
} from "@chakra-ui/react";
import { useState } from "react";
import "./productPageStyles.css";
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Circle} from "@chakra-ui/react";
import ImageCarousel from "./productPageCarrousel.jsx";
import { RiHeartAddLine } from "react-icons/ri";
import { TbTruckDelivery } from "react-icons/tb";
import { PiBoxArrowDownBold  } from "react-icons/pi";
import { LuPackageSearch } from "react-icons/lu";
// import { RatingGroup } from "@chakra-ui/react"

export default function ProductPage() { //Here the info about the product is loaded
  return (
    <>
    <Product
      product={{
        name: "Celular Motorola Edge 50 Fusion 256GB | 8GB RAM | Cámara posterior 50MP | Cámara frontal 32MP | Pantalla 6.7 pulgadas + Qualcomm Snapdragon 6 Gen 1",
        brand: "MOTOROLA",
        code: "MOT50FUSION256",
        shopCode: "MOT50FUSION256",
        rating: 4.5,
        price: "899.900",
        originalPrice: "2.299.900",
        discount: 61,
        description:
          "Celular con cámara de 50MP, pantalla de 6.7 pulgadas y procesador Snapdragon 6 Gen 1.",
        basicSpecifications: [
            { name: "Capacidad de almacenamiento", value: "256GB" },
            { name: "Conectividad", value: "5G" },
            { name: "Marca y modelo del procesador", value: "Snapdragon 6 Gen 1" },
            { name: "Sistema operativo", value: "Android 14" },
            { name: "Memoria RAM", value: "8GB" }
        ],
        specifications: [
          { name: "Memoria externa incluida", value: "No" },
          { name: "GPS integrado", value: "Sí" },
          { name: "Marca", value: "Motorola" }
        ],
        moreInfo: {
          title: "Información adicional",
          additionalSpecs: [
            { name: "Resolución de pantalla", value: "Full HD+" },
            { name: "Tipo de pantalla", value: "pOLED" }
          ],
      },
      imagesProduct: [
        "/testingImages/placeholder1.webp",
        "/testingImages/placeholder2.webp",
        "/testingImages/placeholder3.webp",
        "/testingImages/placeholder4.webp",
      ]
      }}
    />
    </>
  );
}

const Product = ({ product }) => {
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
        {/* Product Image */}

          <ImageCarousel imagesProduct={product.imagesProduct}/>


        <VStack align="right" p={4} borderRadius="md">

          <ProductHeader product={product} />

          <Grid templateColumns="repeat(2, 1fr)" gap={4}>

            <VStack p={4} borderRadius="md"> {/*Columna de la izquierda*/}
                <ProductSpecifications basicSpecifications={product.basicSpecifications} />
                <DeliveryOptions />
            </VStack>

            <Box p={4} borderRadius="md"> {/*Columna de la derecha*/}

            <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6}>
              <Image src="https://www.falabella.com.co/a/fa/product/static/styles/svg/cmrIcon-alt.svg" alt="Sigue lloviendo el corazón" />
              <Box display="flex" justifyContent="right" alignContent="right">
                <RiHeartAddLine size="30px" color="black" />
              </Box>
            </Grid> 

            <HStack>
              <Text fontSize="1.7rem" color="red.500">
                  ${product.price}
              </Text>
              <Badge bg="red" color="white" >{product.discount}%</Badge>
            </HStack>


              <Text
                fontSize="1.2rem"
                textDecoration="line-through"
                color="gray.500"
              >
                ${product.originalPrice}
              </Text>

              <Divider />

              <HStack>
                <Button>Agregar al Carro</Button>
              </HStack>
            </Box>
          </Grid>
        </VStack>
      </Grid>
    </Box>

    <Box>
    <ProductSpecsContainer 
      specifications={product.specifications}
      moreInfo={product.moreInfo}
    />
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

      <Text  fontSize="13px" fontWeight="bold">
        {product.brand}
      </Text>

      <Text fontSize="11px" textAlign="right" fontWeight="regular">
        Código: {product.code}
      </Text>

      <Text fontSize="11px" textAlign="right" fontWeight="regular">
        Cód.tienda: {product.shopCode}
      </Text>

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

const DeliveryOptions = () => {
  return (
    <Box 
      borderWidth="1px" 
      borderRadius="md" 
      borderColor="#41E770"
      fontSize="12px"
      p={2}
      mt={3}
    >
      <Grid templateColumns="repeat(3, 1fr)" gap={4} > 

        <Box textAlign="center" display="flex" flexDirection="column" alignItems="center">
          <Circle size="50px" bg="#DAFEE3" mb={2} borderWidth="1px" borderColor="#41E770">
            <TbTruckDelivery size="25px" color="#276749"/>
          </Circle>
          <Text fontWeight="medium">Despacho a domicilio</Text>
        </Box>
        
        <Box textAlign="center" display="flex" flexDirection="column" alignItems="center">
          <Circle size="50px" bg="#DAFEE3" mb={2} borderWidth="1px" borderColor="#41E770">
            <PiBoxArrowDownBold  size="25px" color="#276749"/>
          </Circle>
          <Text fontWeight="medium">Retira tu compra</Text>
        </Box>
        
        <Box textAlign="center" display="flex" flexDirection="column" alignItems="center">
          <Circle size="50px" bg="#DAFEE3" mb={2} borderWidth="1px" borderColor="#41E770">
            <LuPackageSearch size="25px" color="#276749"/>
          </Circle>
          <Text fontWeight="medium">Stock en tienda</Text>
        </Box>
      </Grid>

    </Box>
  );
};

const ProductSpecsContainer = ({ specifications, moreInfo }) => { //NO TOCAR ESTO ESTA MUY MALO PERO SIRVE COMO PLACEHOLDER
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
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Especificaciones
      </Text>
      
      {moreInfo && (
        <Badge colorScheme="blue" mb={4}>
          {moreInfo.title}
        </Badge>
      )}

      <Grid templateColumns="repeat(2, 1fr)" gap={4} mb={6}>
        {specifications?.map((spec, index) => (
          <Box key={index}>
            <Text fontSize="sm" color="gray.600" mb={1}>
              {spec.name}
            </Text>
            <Text fontWeight="medium">{spec.value}</Text>
            {index < specifications.length - 1 && <Divider my={3} />}
          </Box>
        ))}
      </Grid>

      {moreInfo?.additionalSpecs && (
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
      )}
    </Box>
  );
};