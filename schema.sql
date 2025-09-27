CREATE DATABASE IF NOT EXISTS university;
USE university;

-- universities
CREATE TABLE IF NOT EXISTS universities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  location VARCHAR(100) NOT NULL
);

-- degree_types
CREATE TABLE IF NOT EXISTS degree_types (
  id INT AUTO_INCREMENT PRIMARY KEY,
  degree_name VARCHAR(50) NOT NULL
);

-- languages
CREATE TABLE IF NOT EXISTS languages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  language_name VARCHAR(50) NOT NULL
);

-- programs
CREATE TABLE IF NOT EXISTS programs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  university_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  degree_type_id INT NOT NULL,
  language_id INT NOT NULL,
  FOREIGN KEY (university_id) REFERENCES universities(id),
  FOREIGN KEY (degree_type_id) REFERENCES degree_types(id),
  FOREIGN KEY (language_id) REFERENCES languages(id)
);

-- tuition
CREATE TABLE IF NOT EXISTS tuition (
  id INT AUTO_INCREMENT PRIMARY KEY,
  program_id INT NOT NULL,
  tuition_per_semester INT NOT NULL,
  semesters INT NOT NULL,
  free_threshold INT NOT NULL,
  scholarship_threshold INT NOT NULL,
  FOREIGN KEY (program_id) REFERENCES programs(id)
);

-- users
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'student',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- subjects (
CREATE TABLE IF NOT EXISTS subjects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE
);

-- scores (зв'язок user <-> subject)
CREATE TABLE IF NOT EXISTS scores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  subject_id INT NOT NULL,
  score INT NOT NULL CHECK (score BETWEEN 0 AND 100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE
);

-- demo data
INSERT IGNORE INTO degree_types (id, degree_name) VALUES
(1, 'Bachelor'), (2, 'Master'), (3, 'Postgraduate');

INSERT IGNORE INTO languages (id, language_name) VALUES
(1, 'English'), (2, 'German'), (3, 'French'), (4, 'Spanish'), (5, 'Chinese');

INSERT IGNORE INTO universities (id, name, location) VALUES
(1, 'Munich University of Technology', 'Munich'),
(2, 'Heidelberg University', 'Heidelberg'),
(3, 'Berlin University', 'Berlin'),
(4, 'Stuttgart University', 'Stuttgart'),
(5, 'Freiburg University', 'Freiburg');

INSERT IGNORE INTO programs (id, university_id, name, degree_type_id, language_id) VALUES
(1,1,'Computer Science',1,1),
(2,2,'Medicine',2,2),
(3,3,'Philology',1,3),
(4,4,'Architecture',2,1),
(5,5,'Biology',3,2);

INSERT IGNORE INTO tuition (id, program_id, tuition_per_semester, semesters, free_threshold, scholarship_threshold) VALUES
(1,1,1000,6,270,285),
(2,2,1500,10,290,299),
(3,3,800,6,250,265),
(4,4,1200,8,260,275),
(5,5,1100,6,265,280);

INSERT IGNORE INTO subjects (id, name) VALUES
(1, 'Math'),
(2, 'Informatics'),
(3, 'English'),
(4, 'Physics'),
(5, 'Chemistry');

-- +deafult user
INSERT IGNORE INTO users (email, password_hash, full_name, role)
VALUES (
  'test@example.com',
  '$2b$10$9zUuhN.7Mhzv8dBzFv6druHbO1uKnnx8k3ymu6SG8j6NMeM7BqCZa', 
  'Test User',
  'student'
);














-- CREATE DATABASE IF NOT EXISTS university;
-- USE university;

-- -- universities
-- CREATE TABLE IF NOT EXISTS universities (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   name VARCHAR(100) NOT NULL,
--   location VARCHAR(100) NOT NULL
-- );

-- -- degree_types
-- CREATE TABLE IF NOT EXISTS degree_types (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   degree_name VARCHAR(50) NOT NULL
-- );

-- -- languages
-- CREATE TABLE IF NOT EXISTS languages (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   language_name VARCHAR(50) NOT NULL
-- );

-- -- programs
-- CREATE TABLE IF NOT EXISTS programs (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   university_id INT NOT NULL,
--   name VARCHAR(100) NOT NULL,
--   degree_type_id INT NOT NULL,
--   language_id INT NOT NULL,
--   FOREIGN KEY (university_id) REFERENCES universities(id),
--   FOREIGN KEY (degree_type_id) REFERENCES degree_types(id),
--   FOREIGN KEY (language_id) REFERENCES languages(id)
-- );

-- -- tuition
-- CREATE TABLE IF NOT EXISTS tuition (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   program_id INT NOT NULL,
--   tuition_per_semester INT NOT NULL,
--   semesters INT NOT NULL,
--   free_threshold INT NOT NULL,
--   scholarship_threshold INT NOT NULL,
--   FOREIGN KEY (program_id) REFERENCES programs(id)
-- );

-- -- users
-- CREATE TABLE IF NOT EXISTS users (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   email VARCHAR(255) NOT NULL UNIQUE,
--   password_hash VARCHAR(255) NOT NULL,
--   full_name VARCHAR(255),
--   role VARCHAR(50) DEFAULT 'student',
--   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- -- subjects
-- CREATE TABLE IF NOT EXISTS subjects (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   name VARCHAR(100) NOT NULL UNIQUE
-- );

-- -- scores
-- CREATE TABLE IF NOT EXISTS scores (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   user_id INT NOT NULL,
--   subject_id INT NOT NULL,
--   score INT NOT NULL CHECK (score BETWEEN 0 AND 100),
--   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--   FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
--   FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE
-- );
