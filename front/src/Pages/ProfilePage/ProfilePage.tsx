import React, {useEffect, useState} from 'react';

import './ProfilePage.scss'
import {deleteUser, getPersonalInfo, logOut} from "../../Http/User";
import { ru } from 'date-fns/locale';
import {addCards, getCards} from "../../Http/Card";
import {getCartItems} from "../../Http/Cart";
import {addNewUserAddress, getAddresses} from "../../Http/Address";
import {SIGN_IN_ROUTE} from "../../Utils/Routes";
import {useNavigate} from "react-router-dom";
import {getHistoryOrders} from "../../Http/Order";
import {format} from "date-fns";


interface IAddress{
    id: number;
    active: boolean;
    addr: string;
    apart: string;
    pod: string;
    floor: string;
    number: string;
}

interface ICard{
    id: number;
    active: boolean;
    cardNumber: string;
    expiration: string;
    cvv: string;
}



interface IOrdersItems{
    img: any;
    name: string;
}

interface IOrders{
    number: string;
    date: string;
    address: string;
    total: string;
    items: IOrdersItems[]
}

const ProfilePage: React.FC = () => {
    let navigator = useNavigate()
    let[user, setUser] = useState({
        name: "Tima",
        phone: "+7 777 365 8945",
        mail: "qwerty123@gmail.com"
    });

    let[btnAddActive, setBtnAddActive] = useState(false)
    let[addressActive, setAddressActive] = useState(false)
    let[activeAddress ,setActiveAddress] = useState([
        {
            id: 1,
            active: false,
            addr: '',
            apart: '',
            pod: '',
            floor: '',
            number: '',
        },
    ])
    let[visBlockWithAddress, setVisBlockWithAddress] =useState(false)
    let[addr, serAddr] = useState('')
    let[apart, setApart] = useState('')
    let[pod, setPod] = useState('')
    let[floor, setFloor] = useState('')
    let[number, setNumber] = useState('')
    let[addNewAddress, setAddNewAddress] = useState(false)



    let[btnAddCardActive, setBtnAddCardActive] = useState(false)
    let[cardActive, setCardActive] = useState(false)
    let[activeCard ,setActiveCard] = useState<ICard[]>([

    ])
    let[visBlockWithCard, setVisBlockWithCard] =useState(false)
    let[cardNumber, setCardNumber] = useState('')
    let[expiration, setExpiration] = useState('')
    let[cvv, setCvv] = useState('')
    let[addNewCard, setAddNewCard] = useState(false)



    let[history, setHistory] = useState<IOrders[]>([])


    function handleInputChange(event: any) {
        const inputValue = event.target.value;
        const formattedValue = inputValue.replace(/\D/g, '');
        const formattedNumber = formattedValue
            .replace(/(\d{4})/g, '$1 ')
            .trim()
            .slice(0, 19);
        setCardNumber(formattedNumber);

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
        setCvv(formattedCvv);
    }

    function formatDate (dateString: string) {
        const date = new Date(dateString);
        return format(date, "d MMMM yyyy 'г.' в HH:mm", { locale: ru });
    };

    useEffect(()=>{
        if(addr != '' || apart != '' || pod != '' || floor != '' || number != ''){
            setBtnAddActive(true)
        }
        else{
            setBtnAddActive(false)
        }
    }, [addr, apart, pod, floor, number])

    useEffect(()=>{
        if(cvv.length === 3 && expiration.length === 5 && cardNumber.length === 19){
            setBtnAddCardActive(true)
        }
        else{
            setBtnAddCardActive(false)
        }
    }, [cvv, expiration, cardNumber])

    const formatDateUser = (dateString: string): string => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    }

    useEffect(()=>{






        getPersonalInfo().then((response)=>{
            let newObj = {
                name: response.data.firstName,
                mail: response.data.email,
                db: formatDateUser(response.data.bornDate),
                phone: response.data.phone

            }
            setUser(newObj)
        }).catch((error)=>{

        })

        getHistoryOrders().then((response)=>{
            let newArr = response.data.map((el: any, index: any)=>{



                let newItemsArr: any[] = [];

                el.historyOrders.map((el1: any, index1: any)=>{
                    let url;
                    try {
                        const base64String = el1.product.img.split(',')[1] || el1.product.img;

                        const byteCharacters = atob(base64String);
                        const byteNumbers = new Array(byteCharacters.length);
                        for (let i = 0; i < byteCharacters.length; i++) {
                            byteNumbers[i] = byteCharacters.charCodeAt(i);
                        }
                        const byteArray = new Uint8Array(byteNumbers);
                        const blob = new Blob([byteArray], { type: 'image/png' });

                        url = URL.createObjectURL(blob);

                    } catch (error) {
                    }
                    let newObj = {
                        img: url,
                        name: el1.product.name
                    }
                    newItemsArr.push(newObj)
                })

                let newDate = formatDate(el.dateOrder);

                let newObj = {
                    number: el.orderId,
                    date: newDate,
                    address: el.addressUser.street,
                    total: el.total,
                    items: newItemsArr,

                }
                return newObj;

            })

            setHistory(newArr)



        }).catch((error)=>{

        })

        setAddNewAddress(false)
    }, [])



    return (
        <div className={`container`} style={{flexWrap: "wrap"}}>
            <p className="cart__title" style={{width: '100%'}}>Профиль</p>
            <div className="profile-block">
                <div className="profile-title">Привет, {user.name}</div>
               <div className="profile-person-block">
                   <div className="profile-block-l">
                       <div className="added-info-item added-info-item-profile" style={{marginTop: 0}}>
                           <p className="added-info-item__label">Имя</p>
                           <p className="added-info-item__input">{user.name}</p>
                       </div>
                       <div className="added-info-item added-info-item-profile" >
                           <p className="added-info-item__label">Номер телефона</p>
                           <p className="added-info-item__input">{user.phone ? user.phone : '\u00A0'}</p>
                       </div>
                       <div className="added-info-item added-info-item-profile" >
                           <p className="added-info-item__label">Почта</p>
                           <p className="added-info-item__input">{user.mail ? user.mail : '\u00A0'}</p>
                       </div>

                   </div>
               </div>


            </div>
            <div className="profile-bottom">
                <button className="profile-btn" onClick={(e)=>{
                    logOut()
                }}>
                    {/*<img src={logOutImg} alt=""/><span>Выйти</span>*/}
                </button>

                <button className="profile-btn" style={{marginTop: 10}} onClick={(e)=>{
                    deleteUser().then((response)=>{
                        // navigator(SIGN_IN_ROUTE)
                    }).catch((error)=>{

                    })
                }}>
                    {/*<img src={trashImg} alt=""/><span>Удалить аккаунт</span>*/}
                </button>
            </div>


            <div className="profile-history">
                <p className="cart__title" style={{width: '100%'}}>История заказов</p>
                <div className="history-block">
                    {history.map((el, index)=>(
                        <div className="history-item" key={index}>
                            <div className="history-item-top">
                                <p className="history-item__id">№{el.number}</p>
                                <p className="history-item__date">{el.date}</p>
                                <p className="history-item__address" style={{marginBottom: 20}}>{el.address}</p>
                                {el.items.map((el1, index1)=>(
                                    <div className={`history-item__item`} key={index1}>
                                        <div className="history-item__item-l">
                                            <img src={el1.img} alt=""/>
                                        </div>
                                        <div className="history-item__item-r">
                                            {el1.name}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="history-item-bottom">
                                <span className={`history-item-bottom__text`}>Всего</span>
                                <span className={`history-item-bottom__text`}>{el.total} ₸</span>
                            </div>
                        </div>
                    ))}

                </div>
            </div>

        </div>
    );
};

export default ProfilePage;