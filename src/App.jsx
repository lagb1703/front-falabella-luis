import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter, Routes } from "react-router";
import { projectRoutes } from "./pages";
import theme from "./theme";
import FooterComponent from './components/footer';
import Header from "./components/header";
import Menu from './components/menu'
import products from './pages/productCategories'
import ShoppingCartContext from './gobal/shoppingCart/shoppingCart.global';
import UserContext from "./gobal/user/user.global"
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <ShoppingCartContext>
          <UserContext>
            <Header />
            <Routes>
              {projectRoutes}
            </Routes>
          </UserContext>
        </ShoppingCartContext>
        <FooterComponent />
      </ChakraProvider>
    </BrowserRouter>
  )
}
export default App
