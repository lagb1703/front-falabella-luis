import ExamplePage from "./examplePage";
import RegisterPage from "./registerPage";
import RecoveryEmailPage from "./recoveryEmailPage";
import ChangePasswordPage from "./changePasswordPage";
import { Route } from "react-router";
import { v4 as uuidv4 } from 'uuid';

export const projectRoutes = [
    <Route path="/" element={<ExamplePage/>} key={uuidv4()}/>,
    <Route path="/registration" element={<RegisterPage/>} key={uuidv4()}/>,
    <Route path="/recover/email" element={<RecoveryEmailPage/>} key={uuidv4()}/>,
    <Route path="/recover/ResetPasswordForm" element={<ChangePasswordPage/>} key={uuidv4()}/>,
];

projectRoutes.push(
    <Route path="*" element={(<h1>Esta pagina no esta disponible</h1>)} key={uuidv4()}/>
);
export const backendURL = "https://s6511xdz-3000.use2.devtunnels.ms/";