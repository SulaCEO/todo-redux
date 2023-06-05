import React from "react";
import { useSelector } from "react-redux";
import Category from "../../../components/Category/Category";

const Content = ()=>{
    const {currentCategory, user} = useSelector((state)=>state.mainReducer);
    const oneCategory = true;

    return(
        <div className="content">
            {
                currentCategory.title === 'Все задачи' ?
                user.categories.map((item)=>(
                    <Category key={item.id} el={item}/>
                )) : <Category oneCategory={oneCategory} el={user.categories.find((el)=>el.title === currentCategory.title)}/>
            }
        </div>
    )
}

export default Content;