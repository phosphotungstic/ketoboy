/*
  create_tables.sql - creates all tables for ketoboy
*/

create database ketoboy;

create table ketoboy.user(
  user_id INT PRIMARY KEY,
  username CHAR(20) NOT NULL,
  password CHAR(20) NOT NULL
);

create table ketoboy.calorie(
  calorie_id INT PRIMARY KEY,
  user_id INT NOT NULL,
  calorie INT NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
)