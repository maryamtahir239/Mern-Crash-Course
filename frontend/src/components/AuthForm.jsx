import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Text,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useAppContext } from "./Context/appContext";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

const AuthForm = () => {
  const [values, setValues] = useState(initialState);
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages
  const { registerUser, user, loginUser } = useAppContext(); // Assuming registerUser handles the registration
  const navigate = useNavigate();

  // Toggle between Sign Up and Sign In
  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
    setErrorMessage(""); // Clear error when toggling forms
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  // Navigate on successful login/registration
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    }
  }, [user, navigate]);

  // Validate name for Sign Up
  const isNameValid = (name) => {
    return name.trim().length >= 3; // Example: Name should be at least 3 characters long
  };

  // Validate password strength
  const isPasswordStrong = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;

    // Check if all required fields are filled
    if (!email || !password || (!isMember && !name)) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    // Additional checks for Sign Up
    if (!isMember) {
      if (!isNameValid(name)) {
        setErrorMessage("Name must be at least 3 characters long.");
        return;
      }

      if (!isPasswordStrong(password)) {
        setErrorMessage(
          "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character."
        );
        return;
      }
    }

    const currentUser = { name, email, password };

    try {
      if (isMember) {
        // Login case
        await loginUser(currentUser);
        setErrorMessage(""); // Clear any previous error on success
      } else {
        // Register case
        await registerUser(currentUser);
        setErrorMessage(""); // Clear any previous error on success
      }
    } catch (error) {
      // Show appropriate error message
      setErrorMessage(
        isMember
          ? "Invalid credentials. Please check your email and password."
          : error.message || "An error occurred during registration."
      );
    }
  };

  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      maxW="md"
      mx="auto"
      mt={10}
      p={6}
      rounded="md"
      boxShadow="md"
      bg="white"
      _dark={{ bg: "gray.800" }}
    >
      <Heading textAlign="center" mb={6}>
        {values.isMember ? "Sign In" : "Sign Up"}
      </Heading>
      {errorMessage && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          {errorMessage}
        </Alert>
      )}
      <VStack spacing={4}>
        {!values.isMember && (
          <FormControl id="name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={values.name}
              onChange={handleChange}
            />
          </FormControl>
        )}
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={values.email}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={values.password}
            onChange={handleChange}
          />
        </FormControl>
        <Button colorScheme="blue" size="lg" width="full" type="submit">
          {values.isMember ? "Sign In" : "Sign Up"}
        </Button>
      </VStack>
      <Text mt={4} textAlign="center">
        {values.isMember ? "Don't have an account?" : "Already have an account?"}{" "}
        <Button variant="link" colorScheme="blue" onClick={toggleMember}>
          {values.isMember ? "Sign Up" : "Sign In"}
        </Button>
      </Text>
    </Box>
  );
};

export default AuthForm;
