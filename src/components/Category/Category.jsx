import React, { useState } from "react";
import contentTitle from './../../assets/content_title.svg';
import taskAdd from './../../assets/content_add.svg';
import taskDel from './../../assets/content_del.svg';
import { useDispatch } from "react-redux";
import { addTask, changeCategoryTitle, completeTask, deleteTask, setCurrentCategory} from "../../redux/reducers/mainReducer";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';

const Category = ({el, oneCategory})=>{
    const dispatch = useDispatch();

    const {register, reset, handleSubmit, formState: {errors}} = useForm({mode: 'onBlur'})
    const [addMenu, setAddMenu] = useState(false);
    const [titleMenu, setTitleMenu] = useState(false);

    const addTasks = (data)=>{
        const newTask = {
            id: el.tasks.length+1,
            ...data,
            isCompleted: false
        }
        
        if(el.tasks.findIndex((item)=>item.title === data.title) > -1){
            toast.error('Задание под таким именем уже существует!', {
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
            dispatch(addTask({
                task: newTask,
                categoryId: el.id
            }));
        }

        setAddMenu(false);
        reset();
    }

    const changeCategory = (data)=>{
        dispatch(changeCategoryTitle({
            categoryId: el.id,
            categoryTitle: data.categoryTitle,
            color: el.color
        }))

        setTitleMenu(false);
    }

    return(
        <div className="category">
            {/* Category title */}
            <div style={{cursor: oneCategory && 'pointer', display: titleMenu && 'none'}} onClick={()=>{
                if(oneCategory){
                    setTitleMenu(true);
                }
            }} className="category__title">
                <h2 style={{color: el.color}} className="category__title-text">{el.title}</h2>
                {oneCategory && <span className="category__title-icon"><img src={contentTitle} alt="" /></span>}
            </div>

            <form onSubmit={handleSubmit(changeCategory)} style={{display: !titleMenu && 'none'}} className="category__title">
                <label >
                    <input style={{color: el.color}} defaultValue={el.title} {...register('categoryTitle', {
                        required: {
                            message: 'Название не должно быть пустым',
                            value: true
                        }
                    })} type="text" className="category__title-field" />
                    <p className="category__title-err">{errors.categoryTitle && errors.categoryTitle.message}</p>
                </label>
                <button className="category__title-btn" type="submit">Изменить</button>
            </form>
            {/* tasks */}
            <ul className="tasks">
                {el.tasks.map((item)=>(
                    <li key={item.id} className="tasks__task">
                        <div onClick={()=>dispatch(completeTask({
                            categoryId: el.id,
                            task: item
                        }))} className={`tasks__task-check ${item.isCompleted && 'active'}`}></div>
                        <h4 className="tasks__task-title">{item.title}</h4>
                        <span onClick={()=>dispatch(deleteTask({
                            categoryId: el.id,
                            taskId: item.id
                        }))} style={{display: !oneCategory && 'none'}} className="tasks__task-del"><img src={taskDel} alt="" /></span>
                    </li>
                ))}
                {oneCategory && <li className="tasks__add">
                    {addMenu ? 
                    <form className="tasks__menu" onSubmit={handleSubmit(addTasks)}>
                        <label className="tasks__menu-field">
                            <input {...register('title', {
                                required: {
                                    message: '*Поле не может быть пустым',
                                    value: true
                                }
                            })} placeholder="Текст задачи" maxLength='80' type="text" className="tasks__menu-input" />
                            <p className="tasks__menu-err">{errors.title && errors.title.message}</p>
                        </label>
                        <div className="tasks__menu-btns">
                            <button className="tasks__menu-add" type="submit">Добавить задачу</button>
                            <button onClick={()=>{
                                setAddMenu(false);
                                reset();
                            }} className="tasks__menu-cancel" type="button">Отмена</button>
                        </div>
                    </form> 
                    : 
                    <div onClick={()=>setAddMenu(true)} className="tasks__text">
                        <span className="tasks__text-icon"><img src={taskAdd} alt="" /></span>
                        <span className="tasks__text-text">Новая задача</span>
                    </div>}
                </li>}
            </ul>
        </div>
    )
}

export default Category;