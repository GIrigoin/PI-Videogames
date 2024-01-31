import { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import NotFound from "./views/NotFound/NotFound";
import Landing from "./views/Landing/Landing";
import Home from "./views/Home/Home";
import Detail from "./views/Detail/Detail";
import AddGame from "./views/AddGame/AddGame";
import { useDispatch } from "react-redux";
import { loadGames, loadGenres } from "./redux/actions";
function App() {
  //Al cargar la app traer del back los juegos y los géneros al estado de Redux
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadGames());
    dispatch(loadGenres());
  }, []);

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
