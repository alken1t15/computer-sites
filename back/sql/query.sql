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

insert into users (email, phone, password, name) VALUES ('maxim@gmail.com','87471553450','$2a$12$xOOOH9PioLo48TKZCc6IGOSQJ.Qw2YbKIhefjIlldQqLtc0w7OzC2','Максим');

create table category
(
    id   serial primary key not null,
    name varchar(255)       not null
);

INSERT INTO category (name)
VALUES ('Процессор'),
       ('ОЗУ'),
       ('Блок питания'),
       ('Материнская плата');

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
VALUES
    (1, 'Intel Core i9-9900K', 400, '1.png', 'Процессор Intel Core i9-9900K'),
    (2, 'Corsair Vengeance LPX 16GB', 100, '1.png', 'ОЗУ Corsair Vengeance LPX, 16 ГБ'),
    (3, 'EVGA SuperNOVA 750 G5', 150, '1.png', 'Блок питания EVGA SuperNOVA 750 G5'),
    (4, 'ASUS ROG Strix Z390-E Gaming', 250, '1.png', 'Материнская плата ASUS ROG Strix Z390-E Gaming');

create table computer
(
    id    serial primary key,
    name  varchar not null,
    price int     not null,
    img   varchar not null
);

insert into computer (name, price, img) VALUES ('Супер мега макс',1000000,'1.png');

create table computer_product
(
    id          serial primary key,
    computer_id int references computer (id),
    product_id  int references product (id)
);

insert into computer_product (computer_id, product_id) VALUES (1,1),
(1,2),
(1,3),
(1,4);

create table credit_cart
(
    id       serial primary key not null,
    number   varchar            not null,
    date     varchar(5)         not null,
    security varchar            not null,
    name     varchar            not null
);

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

create table order_computer
(
    id               serial primary key,
    history_order_id int references history_order (id),
    computer_id      int references computer (id),
    price            int not null,
    count            int not null
);


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