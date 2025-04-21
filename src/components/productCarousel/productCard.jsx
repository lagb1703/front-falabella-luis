import { Box, Text } from "@chakra-ui/react";

export default function ProductCard({ product }) {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      textAlign="center"
      background="white"
    >
      <Text fontWeight="bold">{product.name}</Text>
    </Box>
  );
}
