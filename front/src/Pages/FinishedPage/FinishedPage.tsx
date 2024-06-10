import React from 'react';

import './FinishedPage.scss'
import {Link} from "react-router-dom";
import {SHOP_PAGE_ROUTE} from "../../Utils/Routes";

const FinishedPage: React.FC = () => {
    return (
        <div className={'container finished-container'}>
            <p className="finished-container__title">Благодарим за заказ!</p>
            <p className="finished-container__text">Наш курьер свяжется с вами</p>
            <a href={SHOP_PAGE_ROUTE} className="finished-container__btn">Перейти в магазин</a>
        </div>
    );
};

export default FinishedPage;