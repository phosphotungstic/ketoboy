/*
  fill_data.sql - adds some default data into tables
*/

insert into ketoboy.user (username, password) values ('testuser', 'testuser');
insert into ketoboy.calorie (user_id, calorie, timestamp) values (1, 10, datetime(now));
insert into ketoboy.calorie (user_id, calorie, timestamp) values (1, 20, datetime(now), '+1 day');
insert into ketoboy.calorie (user_id, calorie, timestamp) values (1, 30, datetime(now), '+2 day');