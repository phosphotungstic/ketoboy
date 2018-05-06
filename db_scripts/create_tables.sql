/*
  create_tables.sql - creates all tables for ketoboy
*/

create table user(
  user_id INTEGER PRIMARY KEY AUTOINCREMENT,
  username CHAR(20) NOT NULL,
  password CHAR(20) NOT NULL
);

create table calorie(
  calorie_id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  calorie INTEGER NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
)
