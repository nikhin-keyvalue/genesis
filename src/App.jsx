import { Routes, Route } from "react-router-dom";
import Layout from "./layout/layout";
import Login from "./pages/login";
import Home from "./pages/home";

import "./App.css";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Layout>
  );
}

export default App;
