import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/signup";
//import Login from "./pages/Login"; //<Route path="/login" element={<Login />} />
        //<Route path="/profile" element={<Profile />} />
//import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
       
      </Routes>
    </Router>
  );
}

export default App;