import React, {useEffect, useState} from 'react';

import './Header.scss';
import {
    ABOUT_PAGE_ROUTE,
    CART_PAGE_ROUTE,
    CONTACTS_PAGE_ROUTE,
    PROFILE_PAGE_ROUTE,
    SHOP_PAGE_ROUTE, SIGN_IN_ROUTE, SIGN_UP_ROUTE
} from "../../Utils/Routes";

// import {ReactComponent as favImg} from "../../assets/images/fav.svg";
import {Link, Outlet, useNavigate} from "react-router-dom";
import item from "../Item/Item";
import {getShopItems} from "../../Http/Shop";
import {getInfo} from "../../Http/User";

const logoImg = require('../../assets/images/Logo.svg').default;
const userImg = require('../../assets/images/profile-round-1346-svgrepo-com.svg').default;

const Header: React.FC = () => {
    let[items, setItems] = useState([
        {
            name: 'Магазин',
            active: true,
            link: SHOP_PAGE_ROUTE,
        },
        {
            name: 'Контакты',
            active: false,
            link: CONTACTS_PAGE_ROUTE,
        },
        {
            name: `О нас`,
            active: false,
            link: ABOUT_PAGE_ROUTE,
        },
        {
            name: 'Корзина',
            active: false,
            link: CART_PAGE_ROUTE,
        },


    ]);
    let[cartCount, setCartCount] = useState(0)
    let navigator = useNavigate();
    let [isAuthorized, setIsAuthorized] = useState(false)
    function getHeaderItems(){
        let tok = localStorage.getItem('token');
        if(tok){
            setIsAuthorized(true)
        }
        else{
            setIsAuthorized(false)
        }
        // getInfo().then(response=>{
        //     setCartCount(response.data.count)
        // })
        //     .catch((error)=>{
        //         navigator(SIGN_IN_ROUTE)
        //     })
    }

    useEffect(()=>{
        let newArr = items.map((el, index)=>{
            el.active = el.link === window.location.href.split('3000')[1];
            return el
        })

        setItems(newArr)
        getHeaderItems()



        let interval = setInterval(()=>{
            let newArr = items.map((el, index)=>{
                el.active = el.link === window.location.href.split('3000')[1];
                return el
            })
            setItems(newArr)
            getHeaderItems()
        }, 1000)

        return () => {
            clearInterval(interval);
        };


    }, [])
    return (
       <div>
           <header>
               <div className="container container-header">
                   <div className="logo">
                       <img src={logoImg} alt="Bites logo" className="logo__img"/>
                       <p className="logo__text"><span>PC</span>point</p>
                   </div>
                   <div className="header-right">
                       <nav className="navbar">
                           {items.map((el, index)=>(
                               <button key={index} style={{display: 'inline-block', background: "transparent", border: 'none'}} onClick={(e)=>{
                                   let newArr = items.map((el, index)=>{
                                       el.active = el.link === window.location.href.split('3000')[1];
                                       return el
                                   })

                                   setItems(newArr)
                               }}>
                                   <Link to={el.link} className={`navbar-item`} key={index}>
                                       {index === 3 && cartCount > 0 ?
                                           <div className={`cart-count ${el.active ? 'cart-count-a' : ''}`}>
                                               {cartCount}
                                           </div>
                                           : ''}
                                       <p className={`navbar-item__text ${el.active ? 'navbar-item__text-active' : ''}`}>{el.name}</p>
                                   </Link>
                               </button>
                           ))}
                       </nav>


                   </div>
                   <div className="header-active-btns">
                       {isAuthorized ? <Link className={`goToProfile`} to={PROFILE_PAGE_ROUTE}><img src={userImg} style={{width: 25, height: 25, marginRight: 10}}/>Профиль</Link>
                           :
                           <>
                           <Link className={`goToProfile`} to={SIGN_IN_ROUTE}>Вход</Link>
                           <Link className={`goToProfile`} to={SIGN_UP_ROUTE}>Регистрация</Link>
                       </>}
                   </div>
               </div>
           </header>
       </div>
    );
};

export default Header;