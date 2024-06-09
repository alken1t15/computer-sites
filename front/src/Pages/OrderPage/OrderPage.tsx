import React, {useEffect, useState} from 'react';


import './OrderPage.scss';
import Input from "../../Components/UI/Input/Input";
import {Link, useNavigate} from "react-router-dom";
import {FINISHED_PAGE_ROUTE} from "../../Utils/Routes";
import Switch from "../../Components/UI/Switch/Switch";
import {addCards, getCards} from "../../Http/Card";
import {addNewUserAddress, getAddresses} from '../../Http/Address';
import {getCartItems} from "../../Http/Cart";
import {addOrder} from "../../Http/Order";

const OrderPage: React.FC = () => {

    let[cardNum, setCardNum] = useState('')
    let[cardCvv, setCardCvv] = useState('')
    let[cardName, setCardName] = useState('')
    let[expiration, setExpiration] = useState('')
    let[address, setAddress] = useState('')

    let[total, setTotal] = useState(2000)

    function handleInputChange(event: any) {
            const inputValue = event.target.value;
            const formattedValue = inputValue.replace(/\D/g, '');
            const formattedNumber = formattedValue
                .replace(/(\d{4})/g, '$1 ')
                .trim()
                .slice(0, 19);
        setCardNum(formattedNumber);

    }

    function handleInputDateChange (event: React.ChangeEvent<HTMLInputElement>) {
        const inputValue = event.target.value;
        const formattedValue = inputValue.replace(/\D/g, '');
        const formattedDate = formattedValue
            .replace(/(\d{2})(\d{0,2})/, '$1/$2')
            .trim()
            .slice(0, 5);
        setExpiration(formattedDate);
    }

    function handleInputCVVChange (event: React.ChangeEvent<HTMLInputElement>) {
        const inputValue = event.target.value;
        const formattedValue = inputValue.replace(/\D/g, '');
        const maxLength = 3;
        const formattedCvv = formattedValue.slice(0, maxLength);
        setCardCvv(formattedCvv);
    }


    useEffect(()=>{


        // getCartItems().then((response)=>{
        //     setTotal(response.data.total)
        //     let newArr: any[] = [];
        //     response.data.orderDTOs.forEach((el: any, index: any)=>{
        //         newArr.push(el.id)
        //     })
        //     // setIdOrder(newArr)
        // }).catch((error)=>{
        //
        // })


    }, [])


    function setNewAddress(value: string){
        setAddress(value)
    }

    return (
        <div style={{paddingBottom: 50}}>
            <div className="container" style={{flexWrap: "wrap"}}>
                <p className="cart__title">Доставка</p>
                   <div className="info-box">
                       <div className="info-box-l">
                           <div className="info-box-r">
                               <div className="person-info-block-label">Адрес</div>
                               <Input length={35} placeholder="" styles={{ marginTop: 15 }} onChangeF={setNewAddress} type="text" />

                           </div>

                       </div>



                   </div>


                <div className="total-box">
                    <p className="total-box__text"><span>Сумма заказа</span> <span>{total} ₸</span></p>
                    <p className="total-box__text"><span>Доставка</span> <span>бесплатно</span></p>
                    <p className="total-box__text total-box__text-t"><span>Всего</span> <span>{total} ₸</span></p>
                    <button onClick={(e)=>{
                        // addOrder().then((response)=>{
                        //     navigator(FINISHED_PAGE_ROUTE)
                        // }).catch((error)=>{
                        //
                        // })

                    }} className="create-order">

                        Оформить заказ
                    </button>
                </div>

            </div>
        </div>
    );
};

export default OrderPage;