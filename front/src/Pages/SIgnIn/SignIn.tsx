import React, {useEffect, useState} from 'react';
import './SignIn.scss'
import Input from "../../Components/UI/Input/Input";
import Switch from "../../Components/UI/Switch/Switch";
import Button from "../../Components/UI/Button/Button";
import {Link, useNavigate} from "react-router-dom";
import {MAIN_PAGES_ROUTE, SHOP_PAGE_ROUTE, SIGN_UP_ROUTE} from "../../Utils/Routes";
import {login, logOut} from "../../Http/User";

const SignIn: React.FC = () => {

    let[active, setIsActive] = useState(false);
    let[emailOrNumber, setEmailOrNumber] = useState('');
    let[password, setPassword] = useState('');
    let navigator = useNavigate();

    function setEmailOrNum(value: string){
        setEmailOrNumber(value)
    }

    function setPass(value: string){
        setPassword(value)
    }



    useEffect(()=>{
        if(password != ' ' && emailOrNumber !== ' ' && emailOrNumber.length >= 2 && password.length >= 2 ){
            setIsActive(true)
        }
    }, [password, emailOrNumber])



    return (
        <div className={`signIn-container`}>
            <p className="signIn-title">Войти в профиль</p>


            <Input length={35} placeholder={'Почта'} styles={{marginTop: 15}} onChangeF={setEmailOrNum} type={'text'}/>
            <Input length={35} placeholder={'Пароль'} styles={{marginTop: 15}} onChangeF={setPass} type={'password'}/>

            <button className={`standard-btn ${active ? 'standard-btn-active' : ''}`} style={{marginTop: 30}} onClick={(e)=>{
                login(emailOrNumber, password).then((response)=>{
                        localStorage.setItem('token', response.data['jwt-token']);
                    navigator(SHOP_PAGE_ROUTE)

                })
                    .catch((error)=>{

                    })
            }} >Войти</button>
            <p className="signIn-top-text">
                <span className="signIn-top-text-new">Нет аккаунта? </span>
                <Link to={SIGN_UP_ROUTE} className="signIn-top-text-create">Создать аккаунт</Link>
            </p>

        </div>
    );
};

export default SignIn;