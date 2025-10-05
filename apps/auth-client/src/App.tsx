import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Navbar } from "@/components/Navbar";
import GetAuthTokenPage from "@/pages/GetAuthToken";
import { LoginPage } from "@/pages/Login";
import { PaymentPage } from "@/pages/Payment";
import Profile from "@/pages/Profile";
import { RegistrationPage } from "@/pages/Registration";

import { ThemeProvider } from "./components/theme-provider";
import Home from "./pages/Home";

function App() {
    return (
        <ThemeProvider defaultTheme="dark">
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegistrationPage />} />
                    <Route path="/payment" element={<PaymentPage />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route
                        path="/get-auth-token"
                        element={<GetAuthTokenPage />}
                    />
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;
