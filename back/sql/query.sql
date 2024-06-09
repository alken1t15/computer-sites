-- create database computer_sites;


create table users
(
    id       serial primary key not null,
    email    varchar(255) unique,
    phone    varchar(255) unique,
    password varchar(255)       not null,
    name     varchar(255),
    jwt      text
);

insert into users (email, phone, password, name)
VALUES ('maxim@gmail.com', '87471553450', '$2a$12$xOOOH9PioLo48TKZCc6IGOSQJ.Qw2YbKIhefjIlldQqLtc0w7OzC2', 'Максим');

create table category
(
    id   serial primary key not null,
    name varchar(255)       not null
);

INSERT INTO category (name)
VALUES ('Процессор'),
       ('ОЗУ'),
       ('Блок питания'),
       ('Материнская плата'),
       ('Графическая карта'),
       ('Накопитель'),
       ('Корпус'),
       ('Охлаждение');

create table product
(
    id          serial primary key,
    category_id int references category (id),
    name        varchar not null,
    price       int     not null,
    img         varchar not null,
    description varchar
);

INSERT INTO product (category_id, name, price, img, description)
VALUES (1, 'Intel Core i9-9900K', 180000, '1.png', 'Процессор Intel Core i9-9900K'),
       (1, 'AMD Ryzen 9 3900X', 160000, '1.png', 'Процессор AMD Ryzen 9 3900X'),
       (2, 'Corsair Vengeance LPX 16GB', 45000, '1.png', 'ОЗУ Corsair Vengeance LPX, 16 ГБ'),
       (2, 'G.SKILL Trident Z RGB 32GB', 85000, '1.png', 'ОЗУ G.SKILL Trident Z RGB, 32 ГБ'),
       (3, 'EVGA SuperNOVA 750 G5', 67500, '1.png', 'Блок питания EVGA SuperNOVA 750 G5'),
       (3, 'Corsair RM850x', 90000, '2.png', 'Блок питания Corsair RM850x'),
       (4, 'ASUS ROG Strix Z390-E Gaming', 112500, '1.png', 'Материнская плата ASUS ROG Strix Z390-E Gaming'),
       (4, 'MSI MPG Z490 Gaming Edge WiFi', 120000, '1.png', 'Материнская плата MSI MPG Z490 Gaming Edge WiFi'),
       (5, 'NVIDIA GeForce RTX 3080', 300000, '1.png', 'Графическая карта NVIDIA GeForce RTX 3080'),
       (5, 'AMD Radeon RX 6800 XT', 280000, '1.png', 'Графическая карта AMD Radeon RX 6800 XT'),
       (6, 'Samsung 970 EVO 1TB', 100000, '1.png', 'Накопитель Samsung 970 EVO, 1 ТБ'),
       (6, 'Western Digital Black SN750 1TB', 95000, '1.png', 'Накопитель Western Digital Black SN750, 1 ТБ'),
       (8, 'Cooler Master Hyper 212', 20000, '1.png', 'Охлаждение Cooler Master Hyper 212'),
       (8, 'Noctua NH-D15', 35000, '1.png', 'Охлаждение Noctua NH-D15'),
       (7, 'Dexp', 25000, '1.png', 'Корпус от Dexp'),
       (7, 'HyperPc', 37000, '1.png', 'Корпус от HyperPc');

create table computer
(
    id    serial primary key,
    name  varchar not null,
    price int     not null,
    img   varchar,
    weight float not null
);

insert into computer (name, price, img, weight)
VALUES ('Супер мега макс', 1000000, '1.png', 1500),
       ('Игровая станция', 850000, '1.png', 3500),
       ('Рабочая станция', 750000, '1.png', 1700),
       ('Бюджетный вариант', 300000, '1.png', 1900),
       ('Ультра компакт', 450000, '1.png', 1200);

create table computer_product
(
    id          serial primary key,
    computer_id int references computer (id),
    product_id  int references product (id)
);

insert into computer_product (computer_id, product_id)
VALUES
       (1, 1),
       (1, 3),
       (1, 5),
       (1, 7),
       (1, 9),
       (1, 11),
       (1, 13),
       (2, 1),
       (2, 5),
       (3, 1),
       (3, 4),
       (4, 1),
       (4, 2),
       (5, 2),
       (5, 7);
create table credit_cart
(
    id       serial primary key not null,
    number   varchar            not null,
    date     varchar(5)         not null,
    security varchar            not null,
    name     varchar            not null
);
insert into credit_cart (number, date, security, name)
VALUES ('876577678678', '08/24', '123', 'Maxim Test');

create table history_order
(
    id             serial primary key,
    users_id       int references users (id),
    credit_cart_id int references credit_cart (id),
    total_price    int       not null,
    name           varchar   not null,
    date           timestamp not null,
    address        varchar   not null
);

insert into history_order (users_id, credit_cart_id, total_price, name, date, address)
VALUES (1, 1, 500000, '94234324', current_timestamp, 'Республика 44');

create table order_computer
(
    id               serial primary key,
    history_order_id int references history_order (id),
    computer_id      int references computer (id),
    price            int not null,
    count            int not null
);
insert into order_computer (history_order_id, computer_id, price, count)
VALUES (1, 1, 500000, 1);


create table cart
(
    id          serial primary key not null,
    user_id     int references users (id),
    total_price int                not null
);

create table cart_computer
(
    id          serial primary key not null,
    cart_id     int references cart (id),
    computer_id int references computer (id),
    price       int                not null,
    count       int                not null
);