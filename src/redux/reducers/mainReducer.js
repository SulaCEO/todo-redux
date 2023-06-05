import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

export const registerUser = createAsyncThunk(
    'mainReducer/registerUser',
    async (data, {rejectWithValue, dispatch})=>{
        try{
            const res = await axios.post('register', data);

            const user = {
                token: res.data.accessToken,
                ...res.data.user
            }

            dispatch(setUser(user));
            localStorage.setItem('user', JSON.stringify(user));
        }catch(err){
            return rejectWithValue(err.message);
        }
    }
)

export const loginUser = createAsyncThunk(
    'mainReducer/loginReducer',
    async (data, {rejectWithValue, dispatch})=>{
        try{
            const res = await axios.post('login', data);

            const user = {
                token: res.data.accessToken,
                ...res.data.user
            }

            dispatch(setUser(user));
            localStorage.setItem('user', JSON.stringify(user));
        }catch(err){
            return rejectWithValue(err.message);
        }
    }
)

export const addCategory = createAsyncThunk(
    'mainReducer/addCategory',
    async (newCategory, {rejectWithValue, getState, dispatch})=>{
        try{
            const res = await axios.patch(`users/${getState().mainReducer.user.id}`, {categories: [...getState().mainReducer.user.categories, newCategory]});
    
            dispatch(setUser(res.data));
            localStorage.setItem('user', JSON.stringify(res.data));
        }catch(err){
            return rejectWithValue(err.message);
        }
    }
)

export const deleteCategory = createAsyncThunk(
    'mainReducer/deleteCategory',
    async (id, {rejectWithValue, getState, dispatch})=>{
        try{
            const res = await axios.patch(`users/${getState().mainReducer.user.id}`, {categories: getState().mainReducer.user.categories.filter((el)=>el.id !== id)});

            dispatch(setCurrentCategory({
                title: 'Все задачи',
                color: '#000000'
            }))
            dispatch(setUser(res.data));
            localStorage.setItem('user', JSON.stringify(res.data));
        }catch(err){
            return rejectWithValue(err.message);
        }
    }
)

export const changeCategoryTitle = createAsyncThunk(
    'mainReducer/changeCategoryTitle',
    async ({categoryId, categoryTitle, color}, {rejectWithValue, getState, dispatch})=>{
        try{
            const categories = getState().mainReducer.user.categories;
            const category = getState().mainReducer.user.categories.find((el)=>el.id === categoryId);
            const res = await axios.patch(`users/${getState().mainReducer.user.id}`, {categories: [...categories.filter((el)=>el.id !== categoryId), {...category, title: categoryTitle}]});

            dispatch(setCurrentCategory({
                title: categoryTitle,
                color
            }))

            dispatch(setUser(res.data));
            localStorage.setItem('user', JSON.stringify(res.data));
            
        }catch(err){
            return rejectWithValue(err.message);
        }
    }
)

export const addTask = createAsyncThunk(
    'mainReducer/addTask',
    async ({categoryId, task}, {rejectWithValue, getState, dispatch})=>{
        try{
            const categories = getState().mainReducer.user.categories;
            const category = getState().mainReducer.user.categories.find((el)=>el.id === categoryId);
            const res = await axios.patch(`users/${getState().mainReducer.user.id}`, {categories: [...categories.filter((el)=>el.id !== categoryId), {...category, tasks: [...category.tasks, task]}].reverse()});

            dispatch(setUser(res.data));
            localStorage.setItem('user', JSON.stringify(res.data));
        }catch(err){
            return rejectWithValue(err.message);
        }
    }
)

export const deleteTask = createAsyncThunk(
    'mainReducer/deleteTask',
    async ({categoryId, taskId}, {rejectWithValue, getState, dispatch}) =>{
        try{
            const categories = getState().mainReducer.user.categories;
            const category = getState().mainReducer.user.categories.find((el)=>el.id === categoryId);
            const res = await axios.patch(`users/${getState().mainReducer.user.id}`, {categories: [...categories.filter((el)=>el.id !== categoryId), {...category, tasks: category.tasks.filter((el)=>el.id !== taskId)}]});
            
            dispatch(setUser(res.data));
            localStorage.setItem('user', JSON.stringify(res.data));
        }catch(err){
            return rejectWithValue(err.message);
        }
    }
)

export const completeTask = createAsyncThunk(
    'mainReducer/completeTask',
    async ({categoryId, task}, {rejectWithValue, getState, dispatch})=>{
        try{
            const categories = getState().mainReducer.user.categories;
            const category = getState().mainReducer.user.categories.find((el)=>el.id === categoryId);
            const res = await axios.patch(`users/${getState().mainReducer.user.id}`, {categories: [...categories.filter((el)=>el.id !== categoryId), {...category, tasks: [...category.tasks.filter((el)=>el.id !== task.id), {...task, isCompleted: !task.isCompleted}]}]});
            
            dispatch(setUser(res.data));
            localStorage.setItem('user', JSON.stringify(res.data));
        }catch(err){
            return rejectWithValue(err.message);
        }
    }
)

const mainReducer = createSlice({
    name: 'mainReducer',
    initialState: {
        user: {
            email: '',
            password: '',
            categories: []
        },
        categoriesColor: ['#C9D1D3', '#42B883', '#64C4ED', '#FFBBCC', '#B6E6BD', '#C355F5', '#09011A', '#FF6464'],
        currentCategory: {
            title: 'Все задачи',
            color: '#000000'
        },
        titleField: '',
        isTasks: false
    },
    reducers: {
        setUser: (state, action)=>{
            state.user = action.payload;
        },
        logOutUser: (state)=>{
            localStorage.removeItem('user');
            state.user = {
                email: '',
                password: '',
                categories: []
            }
        },
        setCurrentCategory: (state, action)=>{
            state.currentCategory = action.payload;
        },
        setIsTasks: (state, action)=>{
            state.isTasks = action.payload;
        }
    }
})

export default mainReducer.reducer;
export const {setUser, logOutUser, setCurrentCategory, setTitleField, setIsTasks} = mainReducer.actions;
