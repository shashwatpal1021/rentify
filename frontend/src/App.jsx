import "./App.css";
import {
  Route,
  Routes,
} from "react-router-dom";
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Profile from "./pages/Profile";
import AddPorperty from "./pages/AddPorperty";
import PropertyPage from "./pages/PropertyPage";
import Appbar from "./components/Appbar";
import { useAuthState } from "./atoms";
import { useEffect } from "react";

function App() {
  const [authState, setAuthState] = useAuthState();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthState({ loggedIn: true, data: token });
    }
  }, [setAuthState]);

  return (
    <>
      <Appbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={<ProtectedRoutes to="/signin" />}        >
          <Route path="/profile" element={<Profile />} />
          <Route path='property/:id' element={<PropertyPage />} />
          <Route path="/addproperty" element={<AddPorperty />} />
        </Route>

      </Routes>
      {/* <RouterProvider router={router} /> */}
    </>
  );
}

export default App;
