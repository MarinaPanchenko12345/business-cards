import "./App.css";
import Footer from "./components/Footer";
import { Routes, Route, useLocation } from "react-router-dom";
import { useTransition, animated } from "react-spring";
import Navbar from "./components/navbar/Navbar";
import BusinessCards from "./components/pages/BusinessCards";
import About from "./components/pages/About";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import Favorites from "./components/pages/Favorites";
import MyCards from "./components/pages/MyCards";
import SandBox from "./components/pages/SandBox";
import { useState, useEffect } from "react";
import Theme from "./contexts/themeContext";

function App() {
  const location = useLocation();
  const transitions = useTransition(location, {
    key: location.key,
    from: { opacity: 0, transform: "translateX(50%)" },
    enter: { opacity: 1, transform: "translateX(0)" },
    leave: { opacity: 0, transform: "translateX(-50%)" },
  });

  const [darkMode, setDarkMode] = useState(true);
  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? "#ffffff" : "#555555";
  }, [darkMode]);

  return (
    <Theme darkMode={darkMode}>
      <div className='App' style={{ position: "relative" }}>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        {transitions((props, item) => (
          <animated.div style={props}>
            <div style={{ position: "absolute", width: "100%" }}>
              <Routes location={item}>
                <Route path='/' element={<BusinessCards />} />
                <Route path='/about' element={<About />} />
                <Route path='/favorites' element={<Favorites />} />
                <Route path='/my cards' element={<MyCards />} />
                <Route path='/sandbox' element={<SandBox />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/login' element={<Login />} />
              </Routes>
            </div>
          </animated.div>
        ))}
        <Footer />
      </div>
    </Theme>
  );
}

export default App;
