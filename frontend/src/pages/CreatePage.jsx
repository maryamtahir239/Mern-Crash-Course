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
	  if (newProduct.image) formData.append("file", newProduct.image);
  
	  const { success, message } = await createProduct(formData);
  
	  if (!success) {
		toast({
		  title: "Error",
		  description: message,
		  status: "error",
		  isClosable: true,
		});
	  } else {
		toast({
		  title: "Success",
		  description: message,
		  status: "success",
		  isClosable: true,
		});
		setNewProduct({ name: "", price: "", image: null });
	  }
	};
  
	return (
	  <Container maxW={"container.sm"}>
		<VStack spacing={8}>
		  <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8} mt={10}>
			Create New Product
		  </Heading>
  
		  <Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"}>
			<VStack spacing={4}>
			  <Input
				placeholder="Product Name"
				name="name"
				value={newProduct.name}
				onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
			  />
			  <Input
				placeholder="Price"
				name="price"
				type="number"
				value={newProduct.price}
				onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
			  />
			  <Input
				placeholder="Upload Image"
				name="image"
				type="file"
				onChange={(e) => setNewProduct({ ...newProduct, image: e.target.files[0] })}
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
  