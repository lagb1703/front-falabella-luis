import { HStack, Icon } from "@chakra-ui/react";
import { RiStarFill, RiStarHalfFill, RiStarLine } from "react-icons/ri";

export default function StaticRating({ rating, maxStars = 5 }) {
  return (
    <HStack spacing={1}>
      {Array.from({ length: maxStars }).map((_, index) => {
        const currentStar = index + 1;

        if (rating >= currentStar) {
          // Full star
          return (
            <Icon
              as={RiStarFill}
              key={index}
              w={5}
              h={5}
              color="yellow.400"
            />
          );
        } else if (rating >= currentStar - 0.5) {
          // Half star
          return (
            <Icon
              as={RiStarHalfFill}
              key={index}
              w={5}
              h={5}
              color="yellow.400"
            />
          );
        } else {
          // Empty star
          return (
            <Icon
              as={RiStarLine}
              key={index}
              w={5}
              h={5}
              color="gray.300"
            />
          );
        }
      })}
    </HStack>
  );
}
