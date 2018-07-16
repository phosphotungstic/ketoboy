/*
  create_tables.sql - creates all tables for ketoboy
*/

create table if not exists user(
  user_id INTEGER PRIMARY KEY AUTOINCREMENT,
  username CHAR(20) NOT NULL,
  password CHAR(20) NOT NULL
);

create table if not exists calorie(
  calorie_id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  calorie INTEGER NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

create table if not exists max_calorie(
  max_calorie_id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  max_calorie INTEGER NOT NULL DEFAULT 2000
);