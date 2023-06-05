import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector} from "react-redux";
import { Link, Navigate, useLocation, useNavigate} from "react-router-dom";
import { loginUser, registerUser } from "../../redux/reducers/mainReducer";

const Form = ()=>{
    const {register, handleSubmit, reset, formState: {errors}} = useForm({mode: "onBlur"});
    const {user} = useSelector((state)=>state.mainReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation().pathname;

    const onSubmit = (data)=>{
        if(location === '/register'){
            dispatch(registerUser({...data, categories: []}));
        }else{
            dispatch(loginUser({...data, categories: []}));
        }

        reset();
        navigate('/');
    }

    if(user.email.length){
        return <Navigate to="/" />
    }

    return(
        <form noValidate className="form" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="form__title">{location === '/register' ? 'Регистрация' : 'Вход'}</h2>
            {location === '/register' && <label className="form__field">
                <input maxLength='12' {...register('login', {
                    required: {
                        message: 'Поле обязательно к заполнению',
                        value: true
                    },
                    maxLength: {
                        message: 'Максимальная длина 12 символов',
                        value: 12
                    },
                    minLength: {
                        message: 'Минимальная длина 3 символа',
                        value: 3
                    }
                })} className="form__field-inp" placeholder="Введите логин" type="text" />
                <p className="form__field-err">{errors.login && `*${errors.login.message}`}</p>
            </label>}
            <label className="form__field">
                <input {...register('email', {
                    required: {
                        message: 'Поле обязательно к заполнению',
                        value: true
                    },
                    pattern: {
                        message: 'Введите email корректно',
                        value: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-])+\.([A-Za-z]{2,4})$/
                    }
                })} className="form__field-inp" placeholder="Введите email" type="email" />
                <p className="form__field-err">{errors.email && `*${errors.email.message}`}</p>
            </label>
            <label className="form__field">
                <input {...register('password', {
                    required: {
                        message: 'Поле обязательно к заполнению',
                        value: true
                    },
                    pattern: {
                        message: 'Пароль должен быть не менее 5 символов',
                        value: /^([A-Za-z0-9_\-\.]){5,}$/
                    }
                })} className="form__field-inp" placeholder="Введите пароль" type="password" />
                <p className="form__field-err">{errors.password && `*${errors.password.message}`}</p>
            </label>
            <button className="form__btn" type="submit">{location === '/register' ? 'Зарегистрироваться' : 'Войти'}</button>
            <p className="form__text">
                {
                   location === '/register' ?  <>У меня уже есть аккаунт, чтобы <Link className="form__link" to='/login'>войти</Link></> :
                   <>Еще нет аккаунта?<Link className="form__link" to='/register'> Зарегистрироваться</Link></>
                }
            </p>
        </form>
    )
}

export default Form;