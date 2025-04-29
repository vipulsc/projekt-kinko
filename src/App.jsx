import { useEffect, useState } from "react";
import "./App.css";
import WelcomeScreen from "./component/WelcomeScreen";
import Theme from "./component/ThemeToggler";
import HomePage from "./component/HomePage";
function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showWelcome ? <WelcomeScreen /> : <Theme />}
      <HomePage />
    </>
  );
}

export default App;
