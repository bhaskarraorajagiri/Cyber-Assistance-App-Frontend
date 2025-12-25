import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Password from "./pages/Password";
import Phishing from "./pages/Phishing";
import RiskScore from "./pages/RiskScore";
import AIAssistant from "./pages/AIAssistant";
import History from "./pages/History";

import "./app.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/password" element={<Password />} />
        <Route path="/phishing" element={<Phishing />} />
        <Route path="/risk-score" element={<RiskScore />} />
        <Route path="/ai" element={<AIAssistant />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
