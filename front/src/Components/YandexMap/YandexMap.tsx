import React, { useEffect, useState } from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';

import './YandexMap.scss';

interface MapPin {
    coordinates: number[];
    address: string;
    hours: string;
    phoneNumber: string;
    name: string;
}

const svg1 = require('../../assets/images/address-svgrepo-com.svg').default;
const svg2 = require('../../assets/images/clock-three-svgrepo-com.svg').default;
const svg3 = require('../../assets/images/phone-svgrepo-com.svg').default;

const YandexMap: React.FC = () => {
    const [pins, setPins] = useState<MapPin[]>([]);

    useEffect(() => {

        const pinsData: MapPin[] = [
            {
                coordinates: [51.171916, 71.411662],
                address: 'проспект Женис, 29',
                hours: '9:00 - 18:00',
                name: 'проспект Женис, 29',
                phoneNumber: '+7 (998) 556-44-33',
            },
            {
                coordinates: [51.149812, 71.472371],
                address: 'улица Петрова, 19',
                hours: '9:00 - 18:00',
                name: 'улица Петрова, 19',
                phoneNumber: '+7 (775) 999-75-89',
            }

        ];

        setPins(pinsData);

    }, []);

    return (
        <YMaps>
            <Map
                defaultState={{ center: [51.153362, 71.419449],
                    zoom: 10,
                }}
                width="100%"
                height="60vh"


            >
                {pins.map((pin, index) => (
                    <Placemark
                        modules={["geoObject.addon.balloon"]}
                        key={index}
                        geometry={pin.coordinates}
                        options={{
                            iconColor: '#000000'
                        }}
                        properties={{
                            balloonContentBody: `
                <div class="info-block">
                    
                    <div class="info-block-r">
                          <p class="line"><img src=${svg1} alt="" class="svg svg1" style="width: 25px; height: 25px"><span>${pin.address}</span></p>
                          <p class="line"><img src=${svg2} alt="" class="svg svg2" style="width: 25px; height: 25px"><span>${pin.hours}</span></p>
                          <p class="line"><img src=${svg3} alt="" class="svg svg3" style="width: 25px; height: 25px"><span>${pin.phoneNumber}</span></p>
                    </div>
                </div>
              `,
                        }}

                    />
                ))}
            </Map>
        </YMaps>
    );
};

export default YandexMap;
