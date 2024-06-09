import React, {useState, useEffect} from 'react';

import './PCPage.scss'
import {Link, useNavigate, useParams} from "react-router-dom";
import {SHOP_PAGE_ROUTE, SIGN_IN_ROUTE} from "../../Utils/Routes";
import {getShopItem} from "../../Http/Shop";
import {addToCart} from "../../Http/Cart";

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
    let navigator = useNavigate();
    return (
        <div className={'container'}>
            <div className="modal-container" onClick={(e)=>{
                e.stopPropagation();
            }}>
                <p className="modal-top-r__title" style={{width: '100%',textAlign: "left"}}>{curPc?.name}</p>
                <div className="modal-top">

                    <div className="modal-top-l"> <img src={curPc ? curPc.img : ''} alt="" className="modal__img"/></div>
                    <div className="modal-top-r">

                        <p className="modal-top-r__title" style={{textAlign: 'right'}}>Цена: {curPc?.price}₸</p>
                        <p className="modal-hero-top__title" style={{marginTop: 50}}>Дополнительная информация:</p>
                        <p className="modal-hero-top__t1" style={{marginTop: 15, textAlign: 'right'}}>Срок гарантии: 12 мес</p>
                        <p className="modal-hero-top__t1" style={{marginTop: 15, textAlign: 'right'}}>Доступно во всех филиалах</p>
                        <div className="modal-bot">
                            <button className={'add-to-cart-btn'} onClick={(e)=>{
                                e.stopPropagation();
                                if(curPc?.id) {
                                    addToCart(curPc?.id).then((response)=>{

                                    }).catch((error)=>{
                                        navigator(SIGN_IN_ROUTE)
                                    })
                                }

                            }}>Добавить в корзину</button>
                        </div>
                    </div>
                </div>
                <div className="modal-hero-middle">
                    <p className="modal-hero-top__title">Основная информация:</p>
                    {description.map((el: any, index: any)=>(
                        <p className="modal-hero-middle__text" style={{marginTop: 15}} key={index}>{el}</p>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default PCPage;