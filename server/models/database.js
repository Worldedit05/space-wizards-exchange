create table account(id uuid PRIMARY KEY DEFAULT uuid_generate_v4(), data jsonb);
create table card(id uuid PRIMARY KEY DEFAULT uuid_generate_v4(), data jsonb);
create table user_card_list(user_id uuid REFERENCES account(id), card_id uuid REFERENCES card(id), want boolean NOT null DEFAULT false, willing_to_trade boolean NOT null DEFAULT false);
