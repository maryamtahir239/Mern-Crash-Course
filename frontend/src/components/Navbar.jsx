import { Button, Container, Flex, HStack, Text, useColorMode } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { useState, useEffect } from "react";
import { useAppContext } from "./Context/appContext"; // Import context for user state

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { user, logoutUser } = useAppContext(); // Get user info from context
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  // Set authentication state when user logs in or out
  useEffect(() => {
    if (user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [user]);

  // Handle logout
  const handleLogout = () => {
    logoutUser(); // Call the logout function from context
    setIsAuthenticated(false); // Update the state
    navigate("/"); // Redirect to the landing page
  };

  // Handle navigation for the logo
  const handleLogoClick = () => {
    if (isAuthenticated) {
      navigate("/home"); // Redirect to the home page if authenticated
    } else {
      navigate("/auth?mode=signin"); // Redirect to sign-in page if not authenticated
    }
  };

  return (
    <Container
      maxW="100%" // Full width container
      px={{ base: 4, sm: 8 }} // Adjust the padding on different screen sizes
      bg={colorMode === "light" ? "gray.50" : "gray.800"}
      color={colorMode === "light" ? "black" : "white"}
      borderRadius="md" // Optional: Adds rounded corners
    >
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
      >
        {/* Logo */}
        <Text
          fontSize={{ base: "22", sm: "28" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
          cursor={"pointer"} // Add cursor pointer for interactivity
          onClick={handleLogoClick} // Handle click event
        >
          Product Store 🛒
        </Text>

        {/* Navigation Buttons */}
        <HStack spacing={2} alignItems={"center"}>
          {/* Only show Plus button if the user is authenticated */}
          {isAuthenticated && (
            <Button onClick={() => navigate("/create")}>
              <PlusSquareIcon fontSize={20} />
            </Button>
          )}

          {/* Toggle Light/Dark Mode */}
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <IoMoon /> : <LuSun size="20" />}
          </Button>

          {/* Logout or Sign In/Sign Up */}
          {isAuthenticated ? (
            <Button variant="link" 
			colorScheme="black"
			marginLeft={5}
			 onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button
              variant="link" 
              colorScheme="black" 
              size="lg"
			  marginLeft={5}
              onClick={() => navigate("/auth?mode=signin")}
            >
              Sign In
            </Button>
          )}
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
