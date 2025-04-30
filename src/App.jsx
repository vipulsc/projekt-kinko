import { useEffect, useState } from "react";
import "./App.css";
import WelcomeScreen from "./component/WelcomeScreen";
import HomeWithTheme from "./component/HomeWithTheme";
import { Routes, Route } from "react-router-dom";

import { lazy, Suspense } from "react";

const ImportWallet = lazy(() => import("./component/ImportWallet"));

function App() {
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  if (showWelcome) {
    return <WelcomeScreen />;
  }

  return (
    <Suspense fallback={<div className="loading-spinner">Loading...</div>}>
      <Routes>
        <Route path="/" element={<HomeWithTheme />} />
        <Route path="/import" element={<ImportWallet />} />
      </Routes>
    </Suspense>
  );
}

export default App;
