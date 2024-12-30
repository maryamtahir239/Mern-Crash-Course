import React from "react";
import { Box, Button, Text, VStack, HStack, Image, useColorMode, useBreakpointValue } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  
  // Breakpoint for responsive design
  const imageSize = useBreakpointValue({ base: "150px", sm: "200px" });

  return (
    <Box
      bg={colorMode === "light" ? "gray.50" : "gray.800"}
      color={colorMode === "light" ? "black" : "white"}
      minH="100vh"
      py={10}
      px={5}
      transition="background-color 0.3s ease"
    >
      {/* Hero Section */}
      <VStack spacing={5} textAlign="center" py={10}>
        <Text
          fontSize="4xl"
          fontWeight="bold"
          bgGradient="linear(to-r, cyan.400, blue.500)"
          bgClip="text"
          transition="color 0.3s ease"
        >
          Discover the Best Products, All in One Place!
        </Text>
        <Text
          fontSize="lg"
          color={colorMode === "light" ? "gray.600" : "gray.400"}
          maxW="600px"
          mx="auto"
		  
        >
          Browse, shop, and manage your products effortlessly.
        </Text>
        <HStack spacing={5}>
          <Link to="/auth?mode=signup">
            <Button colorScheme="blue" size="lg" px={10} marginTop={10}>
              Sign Up
            </Button>
          </Link>
        </HStack>
      </VStack>

      {/* Feature Highlights */}
      <HStack
        spacing={10}
        justify="center"
        py={10}
        wrap="wrap"
        transition="transform 0.3s ease"
        _hover={{ transform: "scale(1.05)" }}
      >
        <VStack
          spacing={4}
          align="center"
          transition="transform 0.3s ease"
          _hover={{ transform: "scale(1.1)" }}
        >
          <Image
            boxSize={imageSize}
            src="/images/feature1.png.webp"
            alt="Wide Product Range"
            borderRadius="lg"
            boxShadow="md"
            _hover={{ boxShadow: "xl" }}
          />
          <Text fontWeight="bold" fontSize="lg" color={colorMode === "light" ? "black" : "white"}>
            Wide Product Range
          </Text>
        </VStack>
        <VStack
          spacing={4}
          align="center"
          transition="transform 0.3s ease"
          _hover={{ transform: "scale(1.1)" }}
        >
          <Image
            boxSize={imageSize}
            src="/images/feature2.png.webp"
            alt="Fast Delivery"
            borderRadius="lg"
            boxShadow="md"
            _hover={{ boxShadow: "xl" }}
          />
          <Text fontWeight="bold" fontSize="lg" color={colorMode === "light" ? "black" : "white"}>
            Fast Delivery
          </Text>
        </VStack>
        <VStack
          spacing={4}
          align="center"
          transition="transform 0.3s ease"
          _hover={{ transform: "scale(1.1)" }}
        >
          <Image
            boxSize={imageSize}
            src="https://storage.googleapis.com/a1aa/image/ad5d2506-a728-4309-926e-6afd81e3432a.jpeg"
            alt="Secure Payments"
            borderRadius="lg"
            boxShadow="md"
            _hover={{ boxShadow: "xl" }}
          />
          <Text fontWeight="bold" fontSize="lg" color={colorMode === "light" ? "black" : "white"}>
            Secure Payments
          </Text>
        </VStack>
      </HStack>

      {/* Footer */}
      <Box textAlign="center" pt={10}>
        <Text fontSize="sm" color={colorMode === "light" ? "gray.500" : "gray.300"}>
          &copy; 2024 Product Store. All rights reserved.
        </Text>
      </Box>

      {/* Toggle color mode button */}
      
    </Box>
  );
};

export default LandingPage;
