import ExamplePage from "./examplePage";
import { Route } from "react-router";
import { v4 as uuidv4 } from 'uuid';

export const projectRoutes = [
    <Route path="/" element={<ExamplePage/>} key={uuidv4()}/>,
];

export const backendURL = "";