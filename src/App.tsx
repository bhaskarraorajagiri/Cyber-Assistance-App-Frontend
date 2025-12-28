import { lazy, Suspense } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

//import Navbar from "./components/Navbar";
import "./App.css";

/* -------- Lazy-loaded Pages -------- */
const Home = lazy(() => import("./pages/Home"));
const Password = lazy(() => import("./pages/Password"));
const Phishing = lazy(() => import("./pages/Phishing"));
const RiskScore = lazy(() => import("./pages/RiskScore"));
const History = lazy(() => import("./pages/History"));
const AIAssistant = lazy(() => import("./pages/AIAssistant"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const NotFound = lazy(() => import("./pages/NotFound"));

/* -------- Page Wrapper for Animations -------- */
function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      style={{ minHeight: "100%" }}
    >
      {children}
    </motion.div>
  );
}

/* -------- Animated Routes -------- */
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageWrapper>
              <Home />
            </PageWrapper>
          }
        />

        <Route
          path="/password"
          element={
            <PageWrapper>
              <Password />
            </PageWrapper>
          }
        />

        <Route
          path="/phishing"
          element={
            <PageWrapper>
              <Phishing />
            </PageWrapper>
          }
        />

        <Route
          path="/risk-score"
          element={
            <PageWrapper>
              <RiskScore />
            </PageWrapper>
          }
        />

        <Route
          path="/history"
          element={
            <PageWrapper>
              <History />
            </PageWrapper>
          }
        />

        <Route
          path="/ai-assistant"
          element={
            <PageWrapper>
              <AIAssistant />
            </PageWrapper>
          }
        />

        <Route
          path="/dashboard"
          element={
            <PageWrapper>
              <Dashboard />
            </PageWrapper>
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

/* -------- App Root -------- */
export default function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="loading">
            Loading...
          </div>
        }
      >
        <AnimatedRoutes />
      </Suspense>
    </BrowserRouter>
  );
}
