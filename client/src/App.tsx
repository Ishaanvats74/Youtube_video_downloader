import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { SignIn } from "@clerk/clerk-react";
import Download from "./pages/Download";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <BrowserRouter>
    <div className="bg-black text-white overflow-hidden   flex flex-col h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/Download" element={<Download />} />
        <Route path="/History" element={<Download />} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}
