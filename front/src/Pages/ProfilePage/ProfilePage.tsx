import React, {useEffect, useState} from 'react';

import './ProfilePage.scss'
import {deleteUser, getCategories, getPersonalInfo, logOut} from "../../Http/User";
import { ru } from 'date-fns/locale';
import {useNavigate} from "react-router-dom";
import {getHistoryOrders} from "../../Http/Order";
import {format} from "date-fns";


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
        name: "",
        phone: "",
        mail: ""
    });


    let[history, setHistory] = useState<IOrders[]>([])


    function formatDate (dateString: string) {
        const date = new Date(dateString);
        return format(date, "d MMMM yyyy 'г.' в HH:mm", { locale: ru });
    };



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
                name: response.data.name,
                mail: response.data.email,
                db: formatDateUser(response.data.bornDate),
                phone: response.data.phone

            }
            setUser(newObj)
        }).catch((error)=>{
        })

        // getHistoryOrders().then((response)=>{
        //     let newArr = response.data.map((el: any, index: any)=>{
        //         let newItemsArr: any[] = [];
        //         el.historyOrders.map((el1: any, index1: any)=>{
        //             let url;
        //             try {
        //                 const base64String = el1.product.img.split(',')[1] || el1.product.img;
        //
        //                 const byteCharacters = atob(base64String);
        //                 const byteNumbers = new Array(byteCharacters.length);
        //                 for (let i = 0; i < byteCharacters.length; i++) {
        //                     byteNumbers[i] = byteCharacters.charCodeAt(i);
        //                 }
        //                 const byteArray = new Uint8Array(byteNumbers);
        //                 const blob = new Blob([byteArray], { type: 'image/png' });
        //
        //                 url = URL.createObjectURL(blob);
        //
        //             } catch (error) {
        //             }
        //             let newObj = {
        //                 img: url,
        //                 name: el1.product.name
        //             }
        //             newItemsArr.push(newObj)
        //         })
        //
        //         let newDate = formatDate(el.dateOrder);
        //
        //         let newObj = {
        //             number: el.orderId,
        //             date: newDate,
        //             address: el.addressUser.street,
        //             total: el.total,
        //             items: newItemsArr,
        //
        //         }
        //         return newObj;
        //
        //     })
        //
        //     setHistory(newArr)
        //
        //
        //
        // }).catch((error)=>{
        //
        // })

        getCategories().then((response: any)=>{
            console.log(response.data)
        }).catch((error)=>{})

    }, [])



    return (
        <div className={`container`} style={{flexWrap: "wrap", justifyContent: "space-between"}}>
           <div>
               <p className="cart__title" style={{width: '100%'}}>Профиль</p>
               <div className="profile-block">
                   <div className="profile-person-block">
                       <div className="profile-block-l">
                           <div className="added-info-item added-info-item-profile" style={{marginTop: 0, border: 0}}>
                               <p className="added-info-item__label">Имя</p>
                               <p className="added-info-item__input">{user.name}</p>
                           </div>
                           <div className="added-info-item added-info-item-profile" style={{border: 0}}>
                               <p className="added-info-item__label">Номер телефона</p>
                               <p className="added-info-item__input">{user.phone ? user.phone : '\u00A0'}</p>
                           </div>
                           <div className="added-info-item added-info-item-profile" style={{ border: 0}}>
                               <p className="added-info-item__label">Почта</p>
                               <p className="added-info-item__input">{user.mail ? user.mail : '\u00A0'}</p>
                           </div>

                       </div>
                   </div>


               </div>
               <div className="profile-bottom">
                   <button className="profile-btn" style={{marginTop: 50}} onClick={(e)=>{
                       logOut()
                   }}>
                       <span>Выйти</span>
                   </button>

                   <button className="profile-btn" style={{marginTop: 10}} onClick={(e)=>{
                       deleteUser().then((response)=>{
                           // navigator(SIGN_IN_ROUTE)
                       }).catch((error)=>{

                       })
                   }}>
                       <span>Удалить аккаунт</span>
                   </button>
               </div>
           </div>

            <p className="cart__title" style={{width: '35%'}}>Добавить конфигурацию</p>


        </div>
    );
};

export default ProfilePage;