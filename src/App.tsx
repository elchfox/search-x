import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import History from "./pages/History";
import Home from "./pages/Home";
import Result from "./pages/Result";

const App = () => {
  return (
    <>
       <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Result />} />
        <Route path="/history" element={<History />} />
      </Routes>
      </BrowserRouter>
      {/* <Home /> */}
    </>
  );
};

export default App;
