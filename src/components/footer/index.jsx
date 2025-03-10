import { Box, Container, Stack, SimpleGrid, Text, IconButton } from "@chakra-ui/react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Link } from "react-router"
import { FaInstagram } from "react-icons/fa";
import { TiSocialFacebook } from "react-icons/ti";
import { useGetNavigationFooter } from "./Footer.service";
import { v4 as uuid } from "uuid";
export default function Footer() {
  return (
    <Box as="footer" color="white">
      <Container
        bg={
          {
            base: "footer.600",
            md: "footer.500"
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
        bg="footer.600"
        maxW="100%"
        marginX="0"
        px={
          {
            base: "40",
            sm: "10",
            md: "40"
          }
        }>
        <Stack direction={{ base: "column", md: "row" }} py={4} spacing={6} borderBottom="1px" borderColor="whiteAlpha.300">
          <Stack
            direction="row"
            spacing={2}
            justify="center" align="center">
            <IconButton
              aria-label="Facebook"
              icon={<TiSocialFacebook fontSize="1.5em" />}
              size="xs"
              color="white"
              variant="ghost"
              backgroundColor="#495867"
              borderRadius="50%"
              _hover={{ bg: "#6c7883" }}
            />
            <IconButton
              aria-label="Instagram"
              icon={<FaInstagram fontSize="1.5em" />}
              size="xs"
              color="white"
              variant="ghost"
              backgroundColor="#495867"
              borderRadius="50%"
              _hover={{ bg: "#6c7883" }}
            />
          </Stack>
          <Stack
            direction={{ base: "column", md: "row" }}
            spacing={{ base: "0", md: "4" }}
            flex={1}
            justify="center" align="center">
            <Link href="#">
              <Text
                as="span"
                fontSize="xs"
                _hover={{ color: "#d4d8dd" }}>
                Términos y condiciones
              </Text>
            </Link>
            <Link href="#">
              <Text
                as="span"
                fontSize="xs"
                _hover={{ color: "#d4d8dd" }}>
                Política de cookies
              </Text>
            </Link>
            <Link href="#">
              <Text
                as="span"
                fontSize="xs"
                _hover={{ color: "#d4d8dd" }}>
                Política de privacidad
              </Text>
            </Link>
          </Stack>
        </Stack>
        <Stack spacing={0} py={5} fontFamily="footer.p" fontWeight="700">
          <Text height="4" as="span" fontSize="9px" lineHeight="20px" letterSpacing="0.2px" textAlign="left">© TODOS LOS DERECHOS RESERVADOS</Text>
          <Text as="span" fontSize="9px" lineHeight="20px" letterSpacing="0.2px" textAlign="left">Falabella.com S.A.S. NIT 900.499.362-8. Calle 99 #14-49 Piso 9, Bogotá, Colombia</Text>
        </Stack>
      </Container>
    </Box>
  )
}

function Navigation() {
  const data = useGetNavigationFooter()
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
                            _hover={{ color: "#d4d8dd" }}>{l.name}</Text>
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
                      _hover={{ color: "#d4d8dd" }}>{l.name}</Text>
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