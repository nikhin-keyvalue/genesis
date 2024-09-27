import { Routes, Route } from "react-router-dom";
import Layout from "./layout/layout";
import Login from "./pages/login";
import Home from "./pages/Home";
import GenerateQuestion from "./pages/generate";

import "./App.css";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/generate-questions" element={<GenerateQuestion />} />
      </Routes>
    </Layout>
  );
}

export default App;
