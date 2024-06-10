import React, {useEffect, useState} from 'react';
import './MainPage.scss';
import Item from "../../Components/Item/Item";
import {getShopItems} from "../../Http/Shop";
import {addToCart} from "../../Http/Cart";
const search = require('../../assets/images/icons8-search.svg').default;

interface IItem{
    id: number;
    name: string;
    price: string;
    img: any
}

const MainPage: React.FC = () => {
    let[searchActive, setSearchActive] = useState(false);
    let[searchText, setSearchText] = useState('');
    let[items, setItems] = useState<IItem[]>([]);



    useEffect(()=>{
        getShopItems(searchText).then(response=>{
            let newArr = response.data.map((el: any)=>{
                let newObj = {
                    id: el.id,
                    name: el.name,
                    price: el.price,
                    img: el.img
                }
                return newObj;
            })
            setItems(newArr)
        })
            .catch((error)=>{
            })
    },[searchText])

    useEffect(()=>{
        getShopItems('').then(response=>{
            let newArr = response.data.map((el: any)=>{
                let newObj = {
                    id: el.id,
                    name: el.name,
                    price: el.price,
                    img: el.img
                }
                return newObj;
            })
            setItems(newArr)
        })
            .catch((error)=>{
            })


    }, [])


    return (
       <div>
           <div className="main-page-hero">
               <div className="main-page-hero-container">
                   <p className="main-page-hero__title">Выбери наш готовый компьютер либо опубликуйте свою сборку</p>
               </div>

           </div>
           <div className={`container`} style={{marginTop: 50, display: "block", marginBottom: 50}}>

               <div className="main-page-top">
                   <div className={` search-block ${searchActive ? 'search-block-a' : ''}`}
                        onClick={()=>{setSearchActive(true)}}>
                       <img src={search} className={`search-block__img`} alt="search img"/>
                       <input type={"text"} onChange={(e)=>{
                           setSearchText(e.target.value)
                       }} className={`${searchActive ? 'search-block__input-active' : 'search-block__input'}`}/>
                   </div>

               </div>
               <div className="main-page-body">
                   {items && items.length > 0 ? items.map((el, index)=>(
                       <div style={{cursor: "pointer", marginTop: 25}} onClick={(e)=>{

                       }} key={index}>
                           <Item
                               name={el.name}
                               price={el.price}
                               img={el.img}
                               id={el.id}/>
                       </div>
                   )) : ''}


               </div>
           </div>
       </div>
    );
};

export default MainPage;