import React, { useEffect, useState } from 'react';
import './Item.scss';
import {Link} from "react-router-dom";
import {PC_PAGE_ROUTE} from "../../Utils/Routes";

export interface IItem {
    name: string;
    price: string;
    img: string;
    id: number;
}

const Item: React.FC<IItem> = (props) => {
    const [name, setName] = useState(props.name);
    const [price, setPrice] = useState(props.price);
    const [id, setId] = useState(props.id);
    const [img, setImg] = useState<string>(props.img);

    useEffect(() => {
        setName(props.name);
        setPrice(props.price);
        setId(props.id);

        try {
            const base64String = props.img.split(',')[1] || props.img;

            const byteCharacters = atob(base64String);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: 'image/png' });

            const url = URL.createObjectURL(blob);
            setImg(url);

            return () => URL.revokeObjectURL(url);
        } catch (error) {
        }
    }, [props]);

    return (
        <Link to={PC_PAGE_ROUTE.replace(':id', String(id))} className="item">
            <img src={img} alt="" className="item__img" />
           <div style={{ display: "flex", flexDirection: "column", }}>
               <p className="item__text">{name}</p>
               <p className="item__price"><span>Цена: </span>{price} ₸</p>
           </div>
        </Link>
    );
};

export default Item;
