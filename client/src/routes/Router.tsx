import HomePage from "@/pages/HomePage";
import { Routes, Route } from "react-router-dom";
import Transactions from "@/pages/Transactions";
import Login from "@/components/authentication/Login";
import Register from "@/components/authentication/Register";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage /> } />
            <Route path="/login" element={<Login /> } />
            <Route path="/register" element={<Register /> } />
            <Route path="/transactions" element={<Transactions /> } />
            <Route path="*" element={ <div className="text-red-600 text-2xl px-8 text-center">Page not found</div> } />
        </Routes>
    )
}

export default Router;