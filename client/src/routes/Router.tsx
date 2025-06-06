import HomePage from "@/pages/HomePage";
import { Routes, Route } from "react-router-dom";
import Transactions from "@/pages/Transactions";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage /> } />
            <Route path="/transactions" element={<Transactions /> } />
            <Route path="*" element={ <div className="text-red-600 text-2xl px-8 text-center">Page not found</div> } />
        </Routes>
    )
}

export default Router;