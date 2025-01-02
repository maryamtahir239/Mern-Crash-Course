import { Box, Button, Container, Heading, Input, useColorModeValue, useToast, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useProductStore } from "../store/product";


export default function CreatePage() {
	const [newProduct, setNewProduct] = useState({
	  name: "",
	  price: "",
	  image: null, // Changed to store a file
	});
	const toast = useToast();
	const { createProduct } = useProductStore();
  
	const handleAddProduct = async () => {
		const formData = new FormData();
		formData.append("name", newProduct.name);
		formData.append("price", newProduct.price);
		if (newProduct.image) formData.append("file", newProduct.image); // Match backend key
		try {
		  const response = await fetch("http://localhost:5000/api/products", {
			method: "POST",
			body: formData,
		  });
		  const result = await response.json();
	  
		  if (!response.ok) {
			toast({
			  title: "Error",
			  description: result.message,
			  status: "error",
			  isClosable: true,
			});
		  } else {
			toast({
			  title: "Success",
			  description: result.message,
			  status: "success",
			  isClosable: true,
			});
			setNewProduct({ name: "", price: "", image: null });
		  }
		} catch (error) {
		  console.error("Error creating product:", error.message);
		  toast({
			title: "Error",
			description: "An unexpected error occurred",
			status: "error",
			isClosable: true,
		  });
		}
	  };
	  
  
	  return (
		<Container maxW={"container.sm"}>
		  <VStack spacing={8}>
			<Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8} mt={10}>
			  Create New Product
			</Heading>
	  
			<Box
			  w={"full"}
			  bg={useColorModeValue("white", "gray.800")}
			  p={6}
			  rounded={"lg"}
			  shadow={"md"}
			>
			  <VStack spacing={4}>
				<Input
				  placeholder="Product Name"
				  name="name"
				  value={newProduct.name}
				  onChange={(e) =>
					setNewProduct({ ...newProduct, name: e.target.value })
				  }
				/>
				<Input
				  placeholder="Price"
				  name="price"
				  type="number"
				  value={newProduct.price}
				  onChange={(e) =>
					setNewProduct({ ...newProduct, price: e.target.value })
				  }
				/>
	  
				{/* Styled Image Input */}
				<Button
				  as="label"
				  htmlFor="image-upload"
				  colorScheme="blue"
				  w="full"
				  textAlign="center"
				  cursor="pointer"
				>
				  Upload Image
				</Button>
				<Input
				  id="image-upload"
				  type="file"
				  accept="image/*"
				  hidden
				  onChange={(e) =>
					setNewProduct({ ...newProduct, image: e.target.files[0] })
				  }
				/>
	  
				<Button colorScheme="blue" onClick={handleAddProduct} w="full">
				  Add Product
				</Button>
			  </VStack>
			</Box>
		  </VStack>
		</Container>
	  );
	}	  