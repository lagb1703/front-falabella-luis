import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter, Routes } from "react-router";
import { projectRoutes } from "./pages";
import theme from "./theme";
import FooterComponent from './components/Footer/Index';
import Header from "./components/Header/Index";
import Menu from './components/Menu/Index'
import ShoppingCartContext from './gobal/shoppingCart/shoppingCart.global';
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <ShoppingCartContext>
          <Header />
          <Routes>
            {projectRoutes}
          </Routes>
        </ShoppingCartContext>
        <FooterComponent />
      </ChakraProvider>
    </BrowserRouter>
  )
}
export default App
