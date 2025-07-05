CREATE DATABASE dahua_db;
USE dahua_db;

-- BẢNG THIẾT BỊ CAMERA
CREATE TABLE devices (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100),
  password VARCHAR(100),
  ip VARCHAR(50),
  port INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- BẢNG PHIÊN KẾT NỐI
CREATE TABLE sessions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  device_id INT,
  start_time DATETIME,
  end_time DATETIME,
  FOREIGN KEY (device_id) REFERENCES devices(id)
);

-- BẢNG ĐẾM NGƯỜI VÀ PHƯƠNG TIỆN
CREATE TABLE session_counts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  session_id INT,
  human_count INT DEFAULT 0,
  vehicle_count INT DEFAULT 0,
  FOREIGN KEY (session_id) REFERENCES sessions(id)
);

-- BẢNG DỮ LIỆU NHIỆT ĐỘ VÀ ĐỘ ẨM
CREATE TABLE sensor_data (
  id INT AUTO_INCREMENT PRIMARY KEY,
  session_id INT,
  temperature FLOAT,
  humidity FLOAT,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (session_id) REFERENCES sessions(id)
);

select * from devices;
select * from sessions;
select * from session_counts;
select * from sensor_data;