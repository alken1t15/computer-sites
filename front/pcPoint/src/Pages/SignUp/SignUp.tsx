import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './SignUp.scss';
import Input from "../../Components/UI/Input/Input";
import Button from "../../Components/UI/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { SIGN_IN_ROUTE } from "../../Utils/Routes";
import { signUp } from "../../Http/User";


const SignUp: React.FC = () => {

    let [active, setIsActive] = useState(false);
    let [email, setEmail] = useState('');
    let [number, setNumber] = useState('');
    let [password, setPassword] = useState('');
    let [repeatPassword, setRepeatPassword] = useState('');
    let [name, setName] = useState('');
    let [errorPass, setErrorPass] = useState<undefined | boolean>(undefined);
    let navigator = useNavigate();

    function setEmailOrNum(value: string) {
        setEmail(value);
    }

    function setPas(value: string) {
        setPassword(value);
    }

    function setRepeatPas(value: string) {
        setRepeatPassword(value);
    }

    function setUserName(value: string) {
        setName(value);
    }

    useEffect(() => {
        if (password === repeatPassword) {
            setErrorPass(false);
        } else {
            setErrorPass(true);
        }
    }, [password, repeatPassword]);

    useEffect(() => {
        if (email.includes('@') && password.length >= 8 && password === repeatPassword && name.length > 2) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [password, email, number ,repeatPassword, name]);

    const setNewPhone = (value: string) => {
        setNumber(value)
    }

    return (
        <div className="signIn-container">
            <p className="signIn-title">Создать профиль</p>
            <Input length={35} placeholder="Почта" styles={{ marginTop: 15 }} onChangeF={setEmailOrNum} type="text" />
            <Input length={35} placeholder="Номер телефона" styles={{ marginTop: 15 }} onChangeF={setNewPhone} type="text" />
            <Input length={35} placeholder="Введите свое имя" styles={{ marginTop: 15 }} onChangeF={setUserName} type="text" />
            <Input length={35} placeholder="Пароль" styles={{ marginTop: 15 }} onChangeF={setPas} type="password" />
            <Input length={35} error={errorPass} placeholder="Повторите пароль" styles={{ marginTop: 15 }} onChangeF={setRepeatPas} type="password" />



            <button className={`standard-btn ${active ? 'signUp-btn-active' : ''}`} onClick={(e) => {

                if (active) {
                        signUp(email, number, name, password).then((response) => {
                            navigator(SIGN_IN_ROUTE);
                        }).catch((error) => {
                        });
                }
            }}>Зарегистрироваться</button>
            <Link to={SIGN_IN_ROUTE} className="signIn-top-text-create " style={{ display: "block", textAlign: "right", marginTop: 15 }}>Войти в существующий аккаунт</Link>
        </div>
    );
};

export default SignUp;
