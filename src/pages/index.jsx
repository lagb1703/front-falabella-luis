import ExamplePage from "./examplePage";
import RegisterPage from "./registerPage";
import CategoryPage from "./categoryPage";
import RecoveryEmailPage from "./recoveryEmailPage";
import ChangePasswordPage from "./changePasswordPage";
import AccountPage from "./accoutPage";
import ConfirmPasswordPage from "./confirmPasswordPage";
import ProductPage from "./productPage";
import ShoppingCartPage from "./shoppingCartPage";
import PqrPage from "./pqrPage";
import { Route } from "react-router";
import { v4 as uuidv4 } from 'uuid';

export const projectRoutes = [
    <Route path="/" element={<ExamplePage/>} key={uuidv4()}/>,
    <Route path="/registration" element={<RegisterPage/>} key={uuidv4()}/>,
    <Route path="/categories/:id" element={<CategoryPage/>} key={uuidv4()}/>,
    <Route path="/recover/email" element={<RecoveryEmailPage/>} key={uuidv4()}/>,
    <Route path="/recover/ResetPasswordForm" element={<ChangePasswordPage/>} key={uuidv4()}/>,
    <Route path="/myAccount/*" element={<AccountPage/>} key={uuidv4()}/>,
    <Route path="/recover/ConfirmPasswordForm" element={<ConfirmPasswordPage/>} key={uuidv4()}/>,
    <Route path="/product/:id" element={<ProductPage/>} key={uuidv4()}/>,
    <Route path="/shoppingCart" element={<ShoppingCartPage/>} key={uuidv4()}/>,
    <Route path="/pqr" element={<PqrPage/>} key={uuidv4()}/>,
];

projectRoutes.push(
    <Route path="*" element={(<h1>Esta pagina no esta disponible</h1>)} key={uuidv4()}/>
);
export const backendURL = import.meta.env.VITE_BACK || "https://supreme-lamp-7v9rxv55wxg929q9-3000.app.github.dev/";

export const isDevelopment = false;
