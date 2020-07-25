create schema demo;

create table demo.users
(
    id        serial not null
        constraint users_pk
            primary key,
    firstname varchar(256),
    lastname  varchar(256),
    dob       date,
    address   text
);
