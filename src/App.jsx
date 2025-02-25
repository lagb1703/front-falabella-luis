import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter, Routes } from "react-router";
import { projectRoutes } from "./pages";
import theme from "./theme";
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <Routes>
          {projectRoutes}
        </Routes>
      </ChakraProvider>
    </BrowserRouter>
  )
}
export default App
