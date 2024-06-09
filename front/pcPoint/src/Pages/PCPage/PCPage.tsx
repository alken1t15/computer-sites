import React, {useState} from 'react';

import './PCPage.scss'
import {Link} from "react-router-dom";
import {SHOP_PAGE_ROUTE} from "../../Utils/Routes";

const PCPage: React.FC = () => {
    let [curPc, setCurPc] = useState({})

    // useState(()=>{
    //     let newObj = {
    //
    //     }
    // },[])
    return (
        <div className={'container'}>
            {/*<img src={img} alt="" className="item__img" />*/}
            {/*<div style={{height: '100%', maxHeight: '100%', display: "flex", flexDirection: "column", }}>*/}
            {/*    <p className="item__text">{}</p>*/}
            {/*    <p className="item__price"><span>Цена: </span>{price} ₸</p>*/}
            {/*</div>*/}
        </div>
    );
};

export default PCPage;