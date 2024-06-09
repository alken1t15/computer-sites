import React from 'react';
import './Footer.scss';

const Footer: React.FC = () => {
    return (
        <footer className={`footer`}>
            <div className={`container`}>
                <div className={`contactInfo`}>
                    <h3>Контактная информация</h3>
                    <p>Телефон: +7 (123) 456-78-90</p>
                    <p>Email: pcpoint@gmail.com</p>
                    <p>ИИН: 0405054499</p>
                </div>
                <div className={`socialMedia`}>
                    <h3>Мы в соцсетях</h3>
                    <ul>
                        <li><a href="#">Facebook</a></li>
                        <li><a href="#">Telegram</a></li>
                        <li><a href="#">Instagram</a></li>
                    </ul>
                </div>

            </div>
            <div className={`copyright`}>
                <p>&copy; 2024 PCPoint. Все права защищены.</p>
            </div>
        </footer>
    );
};

export default Footer;
