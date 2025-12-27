import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css"

const Home = lazy(() => import("./pages/Home"));
const Password = lazy(() => import("./pages/Password"));
const Phishing = lazy(() => import("./pages/Phishing"));
const Risk = lazy(() => import("./pages/RiskScore"));
const History = lazy(() => import("./pages/History"));
const AIAssistant = lazy(() => import("./pages/AIAssistant"));
export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="loading">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/password" element={<Password />} />
          <Route path="/phishing" element={<Phishing />} />
          <Route path="/risk-score" element={<Risk />} />
          <Route path="/history" element={<History />} />
          <Route path="/ai" element={<AIAssistant />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
