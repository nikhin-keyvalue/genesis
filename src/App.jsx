import { Routes, Route } from "react-router-dom";
import Layout from "./layout/layout";
import Login from "./pages/login";
import Home from "./pages/home";
import GenerateQuestion from "./pages/generate";
import Questions from "./pages/questions";
import Onboarding from "./pages/onboarding";

import "./App.css";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/pdf-viewer" element={<Home />} />
        <Route path="/generate-test" element={<GenerateQuestion />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/onboarding" element={<Onboarding />} />
      </Routes>
    </Layout>
  );
}

export default App;
