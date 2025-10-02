import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { LoginPage } from "@/pages/Login";
import { RegistrationPage } from "@/pages/Registration";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegistrationPage />} />
            </Routes>
        </Router>
    );
}

export default App;
