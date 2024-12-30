
import { Box ,  useColorModeValue} from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import AuthForm from "./components/AuthForm.jsx";

function App() {
  

  return (
    <Box minH={"100vh"}  bg={useColorModeValue("gray.100", "gray.900")} >
      <Navbar/>

      <Routes>
        <Route path="/" element={<LandingPage/>} /> 
        <Route path="/home" element={<HomePage />} /> 
        <Route path="/create" element={<CreatePage />} />
        <Route path="/auth" element={<AuthForm />} />
        
      </Routes>
    </Box>
    
  );
}

export default App;
