CREATE DATABASE IF NOT EXISTS railway_system;
USE railway_system;

CREATE TABLE passenger (
  p_id INT PRIMARY KEY AUTO_INCREMENT,
  p_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  age INT,
  dob DATE,
  address TEXT,
  phone_no VARCHAR(20)
);

CREATE TABLE train (
  train_no INT PRIMARY KEY,
  train_name VARCHAR(100) NOT NULL,
  dept_time TIME,
  arr_time TIME
);

CREATE TABLE schedule (
  schedule_id INT PRIMARY KEY AUTO_INCREMENT,
  train_no INT,
  start_time TIME,
  end_time TIME,
  destination VARCHAR(100),
  FOREIGN KEY (train_no) REFERENCES train(train_no)
);

CREATE TABLE train_status (
  train_no INT,
  date DATE,
  avail_seat INT,
  wait_seat INT,
  booked_seat INT,
  PRIMARY KEY (train_no, date),
  FOREIGN KEY (train_no) REFERENCES train(train_no)
);

CREATE TABLE class (
  class_type VARCHAR(20) PRIMARY KEY,
  fare DECIMAL(10,2)
);

CREATE TABLE ticket (
  pnr_no INT PRIMARY KEY AUTO_INCREMENT,
  p_id INT,
  train_no INT,
  schedule_id INT,
  source VARCHAR(100),
  destination VARCHAR(100),
  date_time DATETIME,
  class_type VARCHAR(20),
  FOREIGN KEY (p_id) REFERENCES passenger(p_id),
  FOREIGN KEY (train_no) REFERENCES train(train_no),
  FOREIGN KEY (schedule_id) REFERENCES schedule(schedule_id),
  FOREIGN KEY (class_type) REFERENCES class(class_type)
);

CREATE TABLE route (
  route_id INT PRIMARY KEY AUTO_INCREMENT,
  train_no INT,
  stop_no INT,
  stop_name VARCHAR(100),
  FOREIGN KEY (train_no) REFERENCES train(train_no)
);

CREATE TABLE station (
  station_id INT PRIMARY KEY AUTO_INCREMENT,
  station_name VARCHAR(100),
  place VARCHAR(100)
);