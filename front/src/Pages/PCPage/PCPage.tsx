import React, {useState, useEffect} from 'react';

import './PCPage.scss'
import {Link, useParams} from "react-router-dom";
import {SHOP_PAGE_ROUTE} from "../../Utils/Routes";
import {getShopItem} from "../../Http/Shop";

interface ICurPc{
    id: number;
    img: any;
    name: string;
    price: string;
}

const PCPage: React.FC = () => {
    let [curPc, setCurPc] = useState<ICurPc>()
    let { id } = useParams();
    let [img, setImg] = useState('')
    let [description, setDescription] = useState([])
    useEffect(()=>{
        if(id){
            getShopItem(id).then((response: any)=>{
                let url;
                try {
                    const base64String = response.data.img.split(',')[1] || response.data.img;

                    const byteCharacters = atob(base64String);
                    const byteNumbers = new Array(byteCharacters.length);
                    for (let i = 0; i < byteCharacters.length; i++) {
                        byteNumbers[i] = byteCharacters.charCodeAt(i);
                    }
                    const byteArray = new Uint8Array(byteNumbers);
                    const blob = new Blob([byteArray], { type: 'image/png' });
                    url = URL.createObjectURL(blob);
                    setImg(url)
                    console.log(response.data)
                    let newObj = {
                        id: response.data.id,
                        img: url,
                        name: response.data.name,
                        price: response.data.price,
                    }
                    setCurPc(newObj)
                    let newArr = response.data.products.map((el: any)=>{
                        return el.description
                    })
                    setDescription(newArr)
                } catch (error) {}



            }).catch((error)=>{})
            let newObj = {

            }
        }

    },[])
    console.log(curPc)
    return (
        <div className={'container'}>
            <div className="modal-container" onClick={(e)=>{
                e.stopPropagation();
            }}>
                <p className="modal-top-r__title" style={{width: '100%',textAlign: "left"}}>{curPc?.name}</p>
                <div className="modal-top">

                    <div className="modal-top-l"> <img src={curPc ? curPc.img : ''} alt="" className="modal__img"/></div>
                    <div className="modal-top-r">

                        <p className="modal-top-r__title" style={{textAlign: 'right'}}>{curPc?.price}₸</p>
                        <p className="modal-hero-top__title" style={{marginTop: 50}}>Основная информация:</p>
                    </div>
                </div>
                <div className="modal-hero-top">
                    <p className="modal-hero-top__title">Основная информация</p>
                    {/*<div className="modal-hero-top-left">*/}
                    {/*    <p className="modal-hero-top-left__text">{curItem.name}</p>*/}
                    {/*    <p className="modal-hero-top-left__subtext">{curItem.weight} г</p>*/}
                    {/*</div>*/}
                </div>
                <div className="modal-hero-middle">
                    {/*<p className="modal-hero-middle__price">{curItem.price} ₸</p>*/}
                    {/*<p className="modal-hero-middle__text">{curItem.text}</p>*/}
                    {/*<p className="modal-hero-middle__descr">Состав: {curItem.description}</p>*/}
                </div>
                <div className="modal-bot">
                    <button className={'add-to-cart-btn'} onClick={(e)=>{
                        e.stopPropagation();
                        // addCart(curPc.id, 1)
                    }}>Добавить в корзину</button>
                </div>
            </div>
        </div>
    );
};

export default PCPage;