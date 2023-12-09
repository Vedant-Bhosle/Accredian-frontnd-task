import Homepage from "./components/Homepage/Homepage";
import Signin from "./components/signin/Signin";
// import Signincomp from "./components/signin/Signincomp";
import Signup from "./components/signup/Signup";

// import logo from "./logo.svg";
// import './App.css';

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
