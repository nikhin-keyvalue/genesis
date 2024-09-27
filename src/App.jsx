import { Routes, Route } from "react-router-dom";
import Layout from "./layout/layout";
import Login from "./pages/login";
import Home from "./pages/Home";
import GenerateQuestion from "./pages/generate";
import Questions from "./pages/questions";

import "./App.css";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/pdf-viewer" element={<Home />} />
        <Route path="/generate-test" element={<GenerateQuestion />} />
        <Route path="/questions" element={<Questions />} />
      </Routes>
    </Layout>
  );
}

export default App;
