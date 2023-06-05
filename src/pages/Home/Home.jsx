import React from "react";
import { useSelector } from "react-redux";
import { Navigate} from "react-router-dom";
import Aside from "./Aside/Aside";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Content from "./Content/Content";

const Home = ()=>{
    const {user} = useSelector((state)=>state.mainReducer);

    if(!user.email.length){
        return <Navigate to="/login" />
    }

    return(
        <div className="home">
            <ToastContainer />
            <Aside/>
            <Content/>
        </div>
    )
}

export default Home;