import React, {CSSProperties, FC, useEffect, useState} from 'react';

import './Input.scss';

interface InputProps {
    placeholder: string;
    onChangeF: (value: string) => void;
    type: string;
    styles?: CSSProperties;
    email?: boolean;
    phone?: boolean;
    password?: boolean;
    length?: number;
    error?: boolean | undefined;
}

const Input: React.FC<InputProps> = ({ placeholder,onChangeF, type , error, length,styles, email, phone, password}) => {
    let [value, setValue] = useState('');
    let [hiddenValue, setHiddenValue] = useState('');
    let [isActive, setIsActive] = useState(false);
    let[dataErr, setDataErr] = useState(error)

    useEffect(()=>{
        setDataErr(error)
    }, [error])

    const isEmailOrPhoneFilled = (): boolean => {
        if (email && !value.includes('@')) {
            return false;
        }
        if (phone && value.length < 10) {
            return false;
        }
        return true;
    };

    const isPasswordSecure = (): boolean => {
        if (value.length < 8) {
            return false;
        }
        if (!/\d/.test(value)) {
            return false;
        }
        if (!/[A-Z]/.test(value)) {
            return false;
        }
        if (!/[a-z]/.test(value)) {
            return false;
        }
        if (!/[!@#$%^&*]/.test(value)) {
            return false;
        }
        return true;
    };

    function inputChange(e: React.ChangeEvent<HTMLInputElement>){

        if(type === 'date'){
            setValue(e.target.value.replace(/\//g, '.'))
            onChangeF(e.target.value)
        }
        else {

            setValue(e.target.value)
            onChangeF(e.target.value)
        }

    }


    function setActive(){
        setIsActive(!isActive)
    }

    return (
        <div className={`input-container`} style={styles}>
            <label className={`placeholder-text ${error ? 'error-text' : ''}`}>{error ? 'Пароли не совпадают' : placeholder}</label>

              <div>
                  <input
                      className={`input`}
                      type={type}
                      value={value}
                      onChange={(e) => inputChange(e)}
                      maxLength={length}
                  />
              </div>


        </div>
    );
};

export default Input;
