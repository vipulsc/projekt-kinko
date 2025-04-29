import { useEffect, useState } from "react";
import "./App.css";
import WelcomeScreen from "./component/WelcomeScreen";
import HomeWithTheme from "./component/HomeWithTheme"; // Import the merged component

function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return <>{showWelcome ? <WelcomeScreen /> : <HomeWithTheme />}</>;
}

export default App;
