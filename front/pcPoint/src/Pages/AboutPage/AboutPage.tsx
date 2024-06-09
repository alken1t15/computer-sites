import React, {useState} from 'react';

import './AboutPage.scss'

const aboutImg = require('../../assets/images/about__img.png');
const timaImg = require('../../assets/images/tima.jpg');
const alihImg = require('../../assets/images/alih.jpg');
const zhanatImg = require('../../assets/images/zhanatik.jpg');
const msi = require('../../assets/images/msi.png');
const asus = require('../../assets/images/Asus-Logo-1995-present.png');
const acer = require('../../assets/images/acer.svg').default;
const lenovo = require('../../assets/images/lenovo.png');
const palit = require('../../assets/images/logo_palit.png');
const gigabyte = require('../../assets/images/gigabyte.png');
const hyperX = require('../../assets/images/hyperx-logo-lg.svg').default;
const seasonic = require('../../assets/images/seasonic.svg').default;
const AboutPage: React.FC = () => {



    return (
        <div style={{paddingTop: 50}} className={`about-section`}>

            <div className="container" style={{flexWrap: 'wrap'}}>
                <div className="contact-items-container about-items-container" style={{flexDirection: "column"}}>
                    <p className="about-items-container-r__title" style={{textAlign: "center", marginLeft: 100}}>Наши сотрудники</p>
                    <div className="contact-items-container-r about-items-container-r about-items-container-r-workers">
                        <div className="about-items-container-r-workers-item">
                            <img src={timaImg} alt={'tima'} className={`about-items-container-r-workers-item__img`}/>
                            <p className={`about-items-container-r-workers-item__title`}>Тимур Вячеславович</p>
                            <p className={`about-items-container-r-workers-item__text`}>Специалист игровых сборок/Frontend</p>
                        </div>
                        <div className="about-items-container-r-workers-item">
                            <img src={alihImg} alt={'tima'} className={`about-items-container-r-workers-item__img`}/>
                            <p className={`about-items-container-r-workers-item__title`}>Алихан Нуржанович</p>
                            <p className={`about-items-container-r-workers-item__text`}>Специалист офисных сборок/Мобильное приложение</p>
                        </div>
                        <div className="about-items-container-r-workers-item">
                            <img src={zhanatImg} alt={'tima'} className={`about-items-container-r-workers-item__img`}/>
                            <p className={`about-items-container-r-workers-item__title`}>Жанат Мейрамович</p>
                            <p className={`about-items-container-r-workers-item__text`}>Специалист по продажам сборок/Backend</p>
                        </div>

                    </div>
                </div>
                <div className="contact-items-container about-items-container">
                    <div className="contact-items-container-l about-items-container-l">
                        <img src={aboutImg} alt=""/>
                    </div>
                    <div className="contact-items-container-r about-items-container-r">
                        <p className="about-items-container-r__title">Чем мы занимаемся?</p>
                        <p className="about-items-container-r__text">Наша компания занимается продажей сборок компьютеров, предоставляя клиентам высококачественные и надежные решения для любых задач. Мы предлагаем разнообразные конфигурации, адаптированные под разные потребности: от мощных игровых систем до высокопроизводительных рабочих станций. Наши специалисты тщательно подбирают комплектующие, чтобы обеспечить оптимальную производительность, стабильность и долговечность каждой сборки. Мы работаем с ведущими производителями компонентов, что позволяет нам гарантировать высокое качество и конкурентные цены. Помимо продажи готовых сборок, мы предлагаем индивидуальные решения, учитывая специфические требования каждого клиента. Наши опытные консультанты всегда готовы помочь в выборе идеальной конфигурации, чтобы удовлетворить все потребности и пожелания. Мы стремимся предоставить нашим клиентам лучший сервис и поддержку на каждом этапе, начиная от консультации и заканчивая послепродажным обслуживанием.</p>
                    </div>
                </div>
                <div className="contact-items-container about-items-container" style={{flexDirection: "column"}}>
                    <p className="about-items-container-r__title" style={{textAlign: "center", width: `100%`}}>Партнеры - топовые бренды</p>
                    <div className="partners-container">
                        <img src={msi} alt="msi" style={{height: 100}}/>
                        <img src={asus} alt="asus"/>
                        <img src={acer} alt="acer" style={{height: 40}}/>
                        <img src={lenovo} alt="lenovo" style={{height: 70}}/>
                        <img src={palit} alt="palit" style={{height: 55}}/>
                        <img src={gigabyte} alt="gigabyte" style={{height: 35}}/>
                        <img src={hyperX} alt="hyperX" style={{height: 55}}/>
                        <img src={seasonic} alt="seasonic"/>
                    </div>
                </div>



            </div>
        </div>
    );
};

export default AboutPage;