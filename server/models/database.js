/* eslint-disable */
/*
create table account(id uuid PRIMARY KEY DEFAULT uuid_generate_v4(), email varchar(75) NOT null UNIQUE, first_name varchar(50), last_name varchar(50), display_name varchar(100) NOT NULL, city varchar(100), state varchar(2), country varchar(2), rating int, trade_notes varchar(500));
create unique index users_unique_lower_email_idx on account (lower(email));
create table card(id uuid PRIMARY KEY DEFAULT uuid_generate_v4(), swd_code varchar(8) UNIQUE, data jsonb);
create table user_card_list(account_id uuid REFERENCES account(id), card_id uuid REFERENCES card(id), want boolean NOT null DEFAULT false, willing_to_trade boolean NOT null DEFAULT false, quantity smallint NOT null DEFAULT 1);
*/
