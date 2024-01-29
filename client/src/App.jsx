import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import NotFound from "./views/NotFound";
import Landing from "./views/Landing";
import Home from "./views/Home";
import Detail from "./views/Detail";
import AddGame from "./views/AddGame";

function App() {
  return (
    <div>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/addgame" element={<AddGame />} />
      </Routes>
    </div>
  );
}

export default App;
