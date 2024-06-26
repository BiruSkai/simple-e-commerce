create table userdata(
  id serial primary key,
  first_name varchar,
  last_name varchar,
  birth_date varchar,
  email varchar,
  password varchar,
  created_on timestamp default now(),
  updated_on date,
  user_role varchar
);

create table address (
  id serial primary key,
  street varchar,
  street_number int,
  post_code int,
  city varchar,
  province varchar,
  state varchar,
  updated_on date,
  userdata_id int references userdata(id),
);

create table orders (
	id serial primary key,
  user_id int references userdata(id),
  created_at timestamp default now(),
  price decimal(10, 2)
);

create table products (
  id serial primary key,
  name varchar not null,
  description text,
  category varchar,
  img_url varchar,
  quantity int,
  price decimal(10,2) not null,
  status varchar(100),
);

create table orders_products (
	order_id int references orders(id),
  product_id int references products(id),
  quantity int default 1,
  price decimal(10,2),
  primary key(order_id, product_id)
);

create table cart_products (
  cart_id int references cart(id),
  product_id int references product(id),
  quantity int,
  primary key (cart_id, product_id)
);

create table carts (
	id serial primary key,
  userdata_id int references userdata(id) unique


create table cart_products (
  cart_id int references cart(id),
  products_id int references products(id),
  primary key(cart_id, products_id)
);