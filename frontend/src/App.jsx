import { lazy, Suspense } from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Loader from "./components/Loader";

const Login = lazy(() => import("./components/Login"));
const Home = lazy(() => import("./components/Home"));

const App = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </Suspense>
  );
};

export default App;
