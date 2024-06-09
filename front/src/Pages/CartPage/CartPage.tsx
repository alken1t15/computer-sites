import React, {useEffect, useState} from 'react';


import './CartPage.scss';
import CartItem from "../../Components/CartItem/CartItem";
import item from "../../Components/Item/Item";
import {Link, useNavigate} from "react-router-dom";
import {MAIN_PAGES_ROUTE, ORDER_PAGE_ROUTE, SHOP_PAGE_ROUTE, SIGN_IN_ROUTE} from "../../Utils/Routes";
import {getCartItems, updateCartItemCount} from "../../Http/Cart";

interface IItems{
    id: number;
    count: number;
    nameProduct: string;
    img: string;
    price: number;
}

const CartPage: React.FC = () => {

    let[items, setItems] = useState<IItems[]>([])
    let[total, setTotal] = useState(0)
    let navigator = useNavigate()
    function updateCount(count: number, id: number, status: string){
        if(count > 0){
            let newArr = items.map((el, index)=>{
                if(id === el.id){
                    el.count = count;
                    if(status === '+'){
                        updateCartItemCount(id, '+').then((response)=>{
                             getCartItems().then((response)=> {
            let newArr = response.data.cartComputers.map((el: any, index: any)=>{
                let url;
                try {
                    const base64String = el.computer.img.split(',')[1] || el.computer.img;

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
                    id: el.computer.id,
                    count: el.count,
                    nameProduct: el.computer.nameProduct,
                    img: url,
                    price: el.computer.price,
                }
                return newObj;
            })
            setItems(newArr)
        }).catch((error)=>{
            console.log(error)
        })
        updateTotal();
                        }).catch((error)=>{

                        })
                    }
                    else if(status === '-'){
                        updateCartItemCount(id, '-').then((response)=>{
                             getCartItems().then((response)=> {
            let newArr = response.data.cartComputers.map((el: any, index: any)=>{
                let url;
                try {
                    const base64String = el.computer.img.split(',')[1] || el.computer.img;

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
                    id: el.computer.id,
                    count: el.count,
                    nameProduct: el.computer.nameProduct,
                    img: url,
                    price: el.computer.price,
                }
                return newObj;
            })
            setItems(newArr)
        }).catch((error)=>{
            console.log(error)
        })
        updateTotal();
                        }).catch((error)=>{

                        })
                    }

                }

                return el;
            })
            setItems(newArr)
        }
       else{
            updateCartItemCount(id, '-').then((response)=>{
                getCartItems().then((response)=> {
                    let newArr = response.data.cartComputers.map((el: any, index: any)=>{
                        let url;
                        try {
                            const base64String = el.computer.img.split(',')[1] || el.computer.img;

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
                            id: el.computer.id,
                            count: el.count,
                            nameProduct: el.computer.nameProduct,
                            img: url,
                            price: el.computer.price,
                        }
                        return newObj;
                    })
                    setItems(newArr)
                }).catch((error)=>{
                    console.log(error)
                })
                updateTotal();
            }).catch((error)=>{

            })
            let newArr = items.filter((el, index)=>el.id !== id)
            setItems(newArr)

        }
    }

    function updateTotal(){
        let allTotal = 0;

        items.map((el, index)=>{
            console.log(el)
            allTotal += el.price * el.count

        })
        setTotal(allTotal)
    }

    useEffect(()=>{
        getCartItems().then((response)=> {
            let newArr = response.data.cartComputers.map((el: any, index: any)=>{
                let url;
                try {
                    const base64String = el.computer.img.split(',')[1] || el.computer.img;

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
                    id: el.computer.id,
                    count: el.count,
                    nameProduct: el.computer.nameProduct,
                    img: url,
                    price: el.computer.price,
                }
                return newObj;
            })
            setItems(newArr)
        }).catch((error)=>{
            console.log(error)
        })
        updateTotal();
        let token = localStorage.getItem('token');
        if(!token){
            navigator(SIGN_IN_ROUTE)
        }
    }, [])

    useEffect(()=>{
        updateTotal()
    }, [items])

    return (
        <div>
           <div className="container" style={{flexWrap: "wrap"}}>
               <p className="cart__title" style={{marginLeft: 10}}>Корзина</p>
               {items.length > 0 ?  <div>
                       <div className="cart-items-box">
                           {items.map((el, index)=>(
                               <CartItem onChange={updateCount} id={el.id} count={el.count} name={el.nameProduct} img={el.img} price={el.price} key={index}/>
                           ))}

                       </div>
                       <Link to={ORDER_PAGE_ROUTE} className="button-total standard-btn-active" style={{width: 300}}>Оформить заказ на {total} ₸</Link>
                   </div>
                   :
               <div className={`empty-container`}>

                   <p className="empty-container__title">Корзина пустая, необходимо добавить товар</p>
                   <Link to={SHOP_PAGE_ROUTE} className={`empty-container__btn`}>Перейти на страницу с товарами</Link>
               </div>
               }

           </div>

        </div>
    );
};

export default CartPage;