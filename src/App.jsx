import { useEffect, useState, lazy, Suspense } from "react";
import "./App.css";
import WelcomeScreen from "./component/WelcomeScreen";
import HomeWithTheme from "./component/HomeWithTheme";
import { Routes, Route } from "react-router-dom";
import Footer from "./component/Footer";
const ImportWallet = lazy(() => import("./component/ImportWallet"));

function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (showWelcome) {
    return <WelcomeScreen />;
  }

  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          Loading...
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<HomeWithTheme />} />
        <Route path="/import" element={<ImportWallet />} />
      </Routes>
      <Footer />
    </Suspense>
  );
}

export default App;
