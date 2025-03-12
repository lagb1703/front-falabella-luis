import ExamplePage from "./examplePage";
import RegisterPage from "./registerPage";
import { Route } from "react-router";
import { v4 as uuidv4 } from 'uuid';

export const projectRoutes = [
    <Route path="/" element={<ExamplePage/>} key={uuidv4()}/>,
    <Route path="/registration" element={<RegisterPage/>} key={uuidv4()}/>
];

export const backendURL = "https://25djsx5x-3000.use2.devtunnels.ms/";