import React, { useState } from "react";
import allIcon from "./../../../assets/aside_title.svg";
import addIcon from "./../../../assets/aside_add.svg";
import deleteIcon from "./../../../assets/aside_delete.svg";
import exitIcon from "./../../../assets/aside_exit.svg";
import { useDispatch, useSelector } from "react-redux";
import { addCategory, deleteCategory, logOutUser, setCurrentCategory} from "../../../redux/reducers/mainReducer";
import { toast } from 'react-toastify';

const Aside = ()=>{
    const dispatch = useDispatch();
    const {categoriesColor, user, currentCategory, isTasks} = useSelector((state)=>state.mainReducer);

    const [pop, setPop] = useState(false);
    const [color, setColor] = useState(categoriesColor[0]);
    const [title, setTitle] = useState('');

    const addCategories = ()=>{
        const newCategory = {
            id: user.categories.length+1,
            title,
            color,
            tasks: []
        }

        if(user.categories.findIndex((item)=>item.title === title) > -1){
            toast.error('Категория под таким именем уже существует!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }else{
            dispatch(addCategory(newCategory));
        }

        setTitle('');
    }

    return(
        <aside className="aside">
            <button onClick={()=>dispatch(logOutUser())} type="button" className="aside__exit">Выйти</button>
            <div style={{display: isTasks && 'none'}} className="aside__top">
                <div className={`aside__title ${currentCategory.title === 'Все задачи' && 'active'}`} onClick={()=>dispatch(setCurrentCategory({
                    title: 'Все задачи',
                    color: '#000000'
                }))}>
                    <img className="aside__title-icon" src={allIcon} alt="" />
                    <h4 className="aside__title-text">Все задачи</h4>
                </div>
                <ul className="aside__tasks">
                    {user.categories.map((item)=>(
                        <li key={item.id} className={`aside__task ${currentCategory.title === item.title && 'active'}`} onClick={()=>dispatch(setCurrentCategory({
                            title: item.title,
                            color: item.color
                        }))}>
                            <span style={{backgroundColor: item.color}} className="aside__task-icon"></span>
                            <span className="aside__task-title">{item.title}</span>
                            <img onClick={()=>dispatch(deleteCategory(item.id))} src={deleteIcon} alt="" className="aside__task-delete" />
                        </li>
                    ))}
                </ul>
            </div>

            <div className="aside__add">
                <div onClick={()=>setPop(true)} className="aside__text">
                    <span className="aside__text-icon"><img src={addIcon} alt="" /></span>
                    <span className="aside__text-title">Добавить папку</span>
                </div>

                <div style={{display: pop ? 'flex' : 'none'}} className="aside__pop">
                    <input value={title} onChange={(e)=>setTitle(e.target.value)} type="text" className="aside__pop-field" placeholder="Название папки" />
                    <ul className="aside__pop-categories">
                        {categoriesColor.map((item, id)=>(
                            <li onClick={()=>setColor(item)} key={id} style={{backgroundColor: item, border: item === color && '2px solid #525252'}} className="aside__pop-category"></li>
                        ))}
                    </ul>
                    <button onClick={()=>{
                            setPop(false);
                            addCategories();
                            setColor('#C9D1D3');
                        }} className="aside__pop-btn" type="button">Добавить</button>
                    <span onClick={()=>setPop(false)} className="aside__pop-exit"><img src={exitIcon} alt="" /></span>
                </div>
            </div>
        </aside>
    )
}

export default Aside;