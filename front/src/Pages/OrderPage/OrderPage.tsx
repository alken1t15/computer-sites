import React, {useEffect, useState} from 'react';


import './OrderPage.scss';
import Input from "../../Components/UI/Input/Input";
import {Link, useNavigate} from "react-router-dom";
import {FINISHED_PAGE_ROUTE} from "../../Utils/Routes";import {getCartItems} from "../../Http/Cart";
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


        getCartItems().then((response)=>{
            setTotal(response.data.totalPrice)

        }).catch((error)=>{

        })


    }, [])


    function setNewAddress(value: string){
        setAddress(value)
    }

    let navigator = useNavigate()

    return (
        <div style={{paddingBottom: 50}}>
            <div className="container" style={{display: "block"}}>
               <div style={{display: "flex"}}>
                   <div> <p className="cart__title">Доставка</p>
                       <div className="info-box">
                           <div className="info-box-l">
                               <div className="info-box-r">
                                   <div className="person-info-block-label">Адрес</div>
                                   <Input length={35} placeholder="" styles={{ marginTop: 15 }} onChangeF={setNewAddress} type="text" />

                               </div>

                           </div>



                       </div></div>
                   <div className={`added-info-box added-info-box-card`} style={{marginLeft: 25}}>
                        <p className="cart__title" style={{marginLeft: 15}}>Оплата</p>
                       <div className="card-box">
                           <div className="added-info-item added-info-item-card" style={{marginTop: 0}}>
                               <p className="added-info-item-card__text">Номер карты</p>
                               <input value={cardNum !== '' ? cardNum : ''} onChange={(e)=>{
                                   handleInputChange(e);
                               }} type="text" placeholder={'0000 0000 0000 0000'} className="added-info-item__input  added-info-item__input-card"/>
                           </div>
                           <div className="card-bottom">
                               <div className="added-info-item added-info-item-card">
                                   <p className="added-info-item-card__text">Срок действия</p>
                                   <input value={expiration !== '' ? expiration : ''} onChange={(e)=>{
                                       handleInputDateChange(e)
                                   }} type="text" maxLength={5} placeholder={'ММ/ГГ'} className="added-info-item__input added-info-item__input-card added-info-item__input-card-m"/>
                               </div>
                               <div className="added-info-item added-info-item-card">
                                   <p className="added-info-item-card__text">Код безопасности</p>
                                   <input value={cardCvv !== '' ? cardCvv : ''} onChange={(e)=>{
                                       handleInputCVVChange(e)
                                   }} type="text" maxLength={3} placeholder={'000'} className="added-info-item__input  added-info-item__input-card added-info-item__input-card-m"/>
                               </div>

                           </div>
                           <div className="added-info-item added-info-item-card" style={{marginTop: 0}}>
                               <p className="added-info-item-card__text" style={{marginTop: 15}}>Имя владельца</p>
                               <input value={cardName !== '' ? cardName : ''} onChange={(e)=>{
                                   setCardName(e.target.value);
                               }} type="text" placeholder={'Timur'} className="added-info-item__input  added-info-item__input-card"/>
                           </div>
                       </div>
                   </div>
               </div>
                <br/>
                <div className="total-box">
                    <p className="total-box__text"><span>Сумма заказа</span> <span>{total} ₸</span></p>
                    <p className="total-box__text"><span>Доставка</span> <span>бесплатно</span></p>
                    <p className="total-box__text total-box__text-t"><span>Всего</span> <span>{total} ₸</span></p>
                    <button onClick={(e)=>{
                        addOrder(cardNum, expiration, cardCvv, cardName, address).then((response)=>{
                            navigator(FINISHED_PAGE_ROUTE)
                        }).catch((error)=>{

                        })

                    }} className="create-order">

                        Оформить заказ
                    </button>
                </div>

            </div>
        </div>
    );
};

export default OrderPage;