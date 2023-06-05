import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { setUser } from "./redux/reducers/mainReducer";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  useEffect(()=>{
    if(localStorage.getItem('user') !== null){
      dispatch(setUser(JSON.parse(localStorage.getItem('user'))));
    }
  }, [])

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </div>
  );
}

export default App;
