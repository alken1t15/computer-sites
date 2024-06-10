import React, {useState} from 'react';

import './ContactsPage.scss'
import YandexMap from "../../Components/YandexMap/YandexMap";


const ContactsPage: React.FC = () => {

    return (
        <div className={`contact-session`} style={{paddingTop: 50, paddingBottom: 50}}>
            <div className="container" style={{flexWrap: 'wrap'}}>
                <p className="contactsTitle">Контакты</p>
               <YandexMap/>
                <div className="contact-items-container">
                    <div className="contact-items-container-l">
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactsPage;