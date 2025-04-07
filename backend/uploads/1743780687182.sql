-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 03, 2025 at 09:04 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ma_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(255) NOT NULL,
  `f_Name` varchar(50) NOT NULL,
  `l_Name` varchar(50) NOT NULL,
  `profession` varchar(20) NOT NULL,
  `semester` varchar(20) NOT NULL,
  `regNo` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `about` varchar(500) NOT NULL,
  `pic` varchar(100) NOT NULL,
  `subject1` varchar(50) NOT NULL,
  `subject2` varchar(50) NOT NULL,
  `subject3` varchar(50) NOT NULL,
  `subject4` varchar(50) NOT NULL,
  `subject5` varchar(50) NOT NULL,
  `subject6` varchar(50) NOT NULL,
  `subject7` varchar(50) NOT NULL,
  `subject8` varchar(50) NOT NULL,
  `subject9` varchar(50) NOT NULL,
  `subject10` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `f_Name`, `l_Name`, `profession`, `semester`, `regNo`, `email`, `password`, `about`, `pic`, `subject1`, `subject2`, `subject3`, `subject4`, `subject5`, `subject6`, `subject7`, `subject8`, `subject9`, `subject10`) VALUES
(2, 'Pasindu', 'Chandrasiri', 'Management Assistant', '6th Semester', '', 'pasinduchandrasiri493@gmail.com', 'Pasindu@123', 'No more details', '', '', '', '', '', '', '', '', '', '', ''),
(10, 'Pramuda Kulathunga', '', 'Student', '6th Semester', '2021/E/078', 'pramudakulathunga@gmail.com', 'Pramuda@1234', 'No more details', 'https://i.ibb.co/zWkKH8mp/pic-edited-Copy.png', 'Computer Engineering Research Project I  (EC6070)', 'Embedded Systems Design (EC6020)', 'Robotics and Automation (EC6090)', 'Software Engineering (EC6060)', 'Machine Learning (EC9630)', '', '', '', '', ''),
(11, 'Yasitha', 'herath', 'Lecturer', '6th Semester', '', 'yasithaherath@gmail.com', 'Yasitha@1234', 'No more details', '', '', '', '', '', '', '', '', '', '', ''),
(14, 'Pramuda Kulathunga', '', 'Student', '5th Semester', '2021/E/078', '2021e078@eng.jfn.ac.lk', 'Pramuda@123', 'No more details', 'https://i.ibb.co/zWkKH8mp/pic-edited-Copy.png', 'Database Systems (EC5070)', 'Control System (EC5030)', 'Computer Architecture and Organization (EC5110)', 'Digital Signal Processing (EC5010)', 'Analogue and Communication (EC5020)', 'Software Construction (EC5080)', '', '', '', ''),
(15, 'Pasindu', 'Chandrasiri', 'Student', '6th Semester', '2021/E/108', '2021e108@eng.jfn.ac.lk', 'Bachu@12345', 'No more details', '', 'Computer Engineering Research Project I  (EC6070)', 'Embedded Systems Design (EC6020)', 'Operating System (EC6110)', 'Robotics and Automation (EC6090)', 'Software Engineering (EC6060)', 'Deep Learning (EC9170)', 'Intelligent System Design (EC9550)', 'Applied Algorithms (EC9600)', 'Machine Learning (EC9630)', ''),
(16, 'Yasitha', 'Herath', 'Student', '6th Semester', '2021/E/045', '2021e045@eng.jfn.ac.lk', '@Yasitha2001@', 'No more details', '', 'Computer Engineering Research Project I  (EC6070)', 'Embedded Systems Design (EC6020)', 'Operating System (EC6110)', 'Robotics and Automation (EC6090)', 'Software Engineering (EC6060)', 'Deep Learning (EC9170)', 'Intelligent System Design (EC9550)', 'Applied Algorithms (EC9600)', 'Machine Learning (EC9630)', ''),
(17, 'Dr. (Mrs.) Pratheeba Jeyananthan', '', 'Lecturer', 'Not Specify', 'Not Specify', 'sandeepakulathunga2@gmail.com', 'Pratheeba@123', 'Add about you', '', '', '', '', '', '', '', '', '', '', ''),
(18, 'Tharindu', 'Silva', 'Student', '7th Semester', '2020/E/001', '2020e001@eng.jfn.ac.lk', '$2a$10$hashed1', 'Final year project on cybersecurity', '', 'Computer Engineering Research Project II (EC7070)', 'Computer and Network Security (EC7020)', 'Project Management and Engineering Industry (ID701', 'Advanced Digital Design and Synthesis (EC9040)', '', '', '', '', '', ''),
(19, 'Nimali', 'Fernando', 'Student', '7th Semester', '2020/E/002', '2020e002@eng.jfn.ac.lk', '$2a$10$hashed2', 'AI enthusiast', '', 'Computer Engineering Research Project II (EC7070)', 'Human Computer Interaction (EC9540)', 'Datamining (EC9560)', 'Computer Vision (EC9580)', '', '', '', '', '', ''),
(20, 'Dinesh', 'Ratnayake', 'Student', '7th Semester', '2020/E/003', '2020e003@eng.jfn.ac.lk', '$2a$10$hashed3', 'Interested in embedded systems', '', 'Electronic Product Design and Manufacture (EC9080)', 'Digital Image Processing (EC9570)', 'Applied Algorithm (EC9600)', '', '', '', '', '', '', ''),
(21, 'Shanika', 'Perera', 'Student', '7th Semester', '2020/E/004', '2020e004@eng.jfn.ac.lk', '$2a$10$hashed4', 'Focus on computer vision', '', 'Artificial Intelligence (EC9640)', 'Computer Vision (EC9580)', 'Computer and Network Security (EC7020)', '', '', '', '', '', '', ''),
(22, 'Malith', 'Weerasinghe', 'Student', '7th Semester', '2020/E/005', '2020e005@eng.jfn.ac.lk', '$2a$10$hashed5', 'Working on fintech project', '', 'Project Management and Engineering Industry (ID701', 'Datamining (EC9560)', 'Advanced Digital Design and Synthesis (EC9040)', '', '', '', '', '', '', ''),
(23, 'Chamari', 'Jayawardena', 'Student', '7th Semester', '2020/E/006', '2020e006@eng.jfn.ac.lk', '$2a$10$hashed6', 'Human-computer interaction focus', '', 'Human Computer Interaction (EC9540)', 'Computer Engineering Research Project II (EC7070)', '', '', '', '', '', '', '', ''),
(24, 'Prasanna', 'Bandara', 'Student', '7th Semester', '2020/E/007', '2020e007@eng.jfn.ac.lk', '$2a$10$hashed7', 'Machine learning researcher', '', 'Artificial Intelligence (EC9640)', 'Datamining (EC9560)', 'Computer and Network Security (EC7020)', '', '', '', '', '', '', ''),
(25, 'Nayomi', 'Gunasekara', 'Student', '7th Semester', '2020/E/008', '2020e008@eng.jfn.ac.lk', '$2a$10$hashed8', 'Digital design specialist', '', 'Advanced Digital Design and Synthesis (EC9040)', 'Electronic Product Design and Manufacture (EC9080)', '', '', '', '', '', '', '', ''),
(26, 'Isuru', 'Rajapaksha', 'Student', '7th Semester', '2020/E/009', '2020e009@eng.jfn.ac.lk', '$2a$10$hashed9', 'Computer vision project', '', 'Computer Vision (EC9580)', 'Digital Image Processing (EC9570)', '', '', '', '', '', '', '', ''),
(27, 'Thilini', 'Wickramasinghe', 'Student', '7th Semester', '2020/E/010', '2020e010@eng.jfn.ac.lk', '$2a$10$hashed10', 'Final year student', '', 'Project Management and Engineering Industry (ID701', 'Computer Engineering Research Project II (EC7070)', '', '', '', '', '', '', '', ''),
(28, 'Kasun', 'Perera', 'Student', '6th Semester', '2021/E/001', '2021e001@eng.jfn.ac.lk', '$2a$10$hashed11', 'Robotics club president', '', 'Computer Engineering Research Project I (EC6070)', 'Embedded Systems Design (EC6020)', 'Operating System (EC6110)', 'Robotics and Automation (EC6090)', 'Software Engineering (EC6060)', '', '', '', '', ''),
(29, 'Sanduni', 'Ratnayake', 'Student', '6th Semester', '2021/E/002', '2021e002@eng.jfn.ac.lk', '$2a$10$hashed12', 'ML researcher', '', 'Computer Engineering Research Project I (EC6070)', 'Machine Learning (EC9630)', 'Intelligent System Design (EC9550)', 'Applied Algorithms (EC9600)', 'Operating System (EC6110)', 'Software Engineering (EC6060)', '', '', '', ''),
(30, 'Dilshan', 'Fernando', 'Student', '6th Semester', '2021/E/003', '2021e003@eng.jfn.ac.lk', '$2a$10$hashed13', 'Network specialist', '', 'Advanced Computer and Data Networks (EC9520)', 'Computer Engineering Research Project I (EC6070)', 'Operating System (EC6110)', 'Embedded Systems Design (EC6020)', 'Software Engineering (EC6060)', '', '', '', '', ''),
(31, 'Amandi', 'Silva', 'Student', '6th Semester', '2021/E/004', '2021e004@eng.jfn.ac.lk', '$2a$10$hashed14', 'Database enthusiast', '', 'Bioinformatics (EC9650)', 'Software Engineering (EC6060)', 'Deep Learning (EC9170)', 'Embedded Systems Design (EC6020)', 'Operating System (EC6110)', '', '', '', '', ''),
(32, 'Ruwan', 'Jayasekara', 'Student', '6th Semester', '2021/E/005', '2021e005@eng.jfn.ac.lk', '$2a$10$hashed15', 'Interested in algorithms', '', 'Applied Algorithms (EC9600)', 'Computer Engineering Research Project I (EC6070)', 'Embedded Systems Design (EC6020)', 'Operating System (EC6110)', 'Software Engineering (EC6060)', '', '', '', '', ''),
(33, 'Nadeesha', 'Gamage', 'Student', '6th Semester', '2021/E/006', '2021e006@eng.jfn.ac.lk', '$2a$10$hashed16', 'AI club member', '', 'Machine Learning (EC9630)', 'Intelligent System Design (EC9550)', 'Deep Learning (EC9170)', 'Embedded Systems Design (EC6020)', 'Operating System (EC6110)', 'Software Engineering (EC6060)', '', '', '', ''),
(34, 'Sampath', 'Liyanage', 'Student', '6th Semester', '2021/E/007', '2021e007@eng.jfn.ac.lk', '$2a$10$hashed17', 'Robotics team', '', 'Robotics and Automation (EC6090)', 'Embedded Systems Design (EC6020)', 'Operating System (EC6110)', 'Software Engineering (EC6060)', '', '', '', '', '', ''),
(35, 'Chathuri', 'Weerasekara', 'Student', '6th Semester', '2021/E/008', '2021e008@eng.jfn.ac.lk', '$2a$10$hashed18', 'Software developer', '', 'Software Engineering (EC6060)', 'Operating System (EC6110)', 'Embedded Systems Design (EC6020)', 'Robotics and Automation (EC6090)', 'Operating System (EC6110)', 'Software Engineering (EC6060)', '', '', '', ''),
(36, 'Prasad', 'Wickrama', 'Student', '6th Semester', '2021/E/009', '2021e009@eng.jfn.ac.lk', '$2a$10$hashed19', 'Network security', '', 'Advanced Computer and Data Networks (EC9520)', 'Computer Engineering Research Project I (EC6070)', 'Embedded Systems Design (EC6020)', 'Robotics and Automation (EC6090)', 'Operating System (EC6110)', 'Software Engineering (EC6060)', '', '', '', ''),
(37, 'Shiromi', 'Peiris', 'Student', '6th Semester', '2021/E/010', '2021e010@eng.jfn.ac.lk', '$2a$10$hashed20', 'Bioinformatics research', '', 'Bioinformatics (EC9650)', 'Machine Learning (EC9630)', 'Embedded Systems Design (EC6020)', 'Robotics and Automation (EC6090)', 'Operating System (EC6110)', 'Software Engineering (EC6060)', '', '', '', ''),
(38, 'Dhanushka', 'Herath', 'Student', '6th Semester', '2021/E/011', '2021e011@eng.jfn.ac.lk', '$2a$10$hashed21', 'Embedded systems', '', 'Embedded Systems Design (EC6020)', 'Robotics and Automation (EC6090)', 'Embedded Systems Design (EC6020)', 'Operating System (EC6110)', 'Software Engineering (EC6060)', '', '', '', '', ''),
(39, 'Nirosha', 'Wijeratne', 'Student', '6th Semester', '2021/E/012', '2021e012@eng.jfn.ac.lk', '$2a$10$hashed22', 'OS developer', '', 'Operating System (EC6110)', 'Software Engineering (EC6060)', 'Embedded Systems Design (EC6020)', 'Robotics and Automation (EC6090)', '', '', '', '', '', ''),
(40, 'Chamara', 'Ekanayake', 'Student', '6th Semester', '2021/E/013', '2021e013@eng.jfn.ac.lk', '$2a$10$hashed23', 'Deep learning focus', '', 'Deep Learning (EC9170)', 'Machine Learning (EC9630)', 'Embedded Systems Design (EC6020)', 'Robotics and Automation (EC6090)', 'Operating System (EC6110)', 'Software Engineering (EC6060)', '', '', '', ''),
(41, 'Hiruni', 'Rajapaksha', 'Student', '6th Semester', '2021/E/014', '2021e014@eng.jfn.ac.lk', '$2a$10$hashed24', 'Intelligent systems', '', 'Intelligent System Design (EC9550)', 'Applied Algorithms (EC9600)', 'Embedded Systems Design (EC6020)', 'Robotics and Automation (EC6090)', 'Operating System (EC6110)', 'Software Engineering (EC6060)', '', '', '', ''),
(42, 'Sachini', 'Nanayakkara', 'Student', '6th Semester', '2021/E/015', '2021e015@eng.jfn.ac.lk', '$2a$10$hashed25', 'Research assistant', '', 'Computer Engineering Research Project I (EC6070)', 'Bioinformatics (EC9650)', 'Embedded Systems Design (EC6020)', 'Robotics and Automation (EC6090)', 'Operating System (EC6110)', 'Software Engineering (EC6060)', '', '', '', ''),
(43, 'Lasitha', 'Abeywickrama', 'Student', '6th Semester', '2021/E/016', '2021e016@eng.jfn.ac.lk', '$2a$10$hashed26', 'Network engineer', '', 'Advanced Computer and Data Networks (EC9520)', 'Embedded Systems Design (EC6020)', 'Robotics and Automation (EC6090)', 'Operating System (EC6110)', 'Software Engineering (EC6060)', '', '', '', '', ''),
(44, 'Manoj', 'Dissanayake', 'Student', '6th Semester', '2021/E/017', '2021e017@eng.jfn.ac.lk', '$2a$10$hashed27', 'Algorithm specialist', '', 'Applied Algorithms (EC9600)', 'Embedded Systems Design (EC6020)', 'Robotics and Automation (EC6090)', 'Operating System (EC6110)', 'Software Engineering (EC6060)', '', '', '', '', ''),
(45, 'Kavindi', 'Ranasinghe', 'Student', '6th Semester', '2021/E/018', '2021e018@eng.jfn.ac.lk', '$2a$10$hashed28', 'ML researcher', '', 'Machine Learning (EC9630)', 'Deep Learning (EC9170)', 'Embedded Systems Design (EC6020)', 'Robotics and Automation (EC6090)', 'Operating System (EC6110)', '', '', '', '', ''),
(46, 'Pramudi', 'Karunaratne', 'Student', '6th Semester', '2021/E/019', '2021e019@eng.jfn.ac.lk', '$2a$10$hashed29', 'Database systems', '', 'Computer Engineering Research Project I (EC6070)', 'Software Engineering (EC6060)', 'Embedded Systems Design (EC6020)', 'Robotics and Automation (EC6090)', 'Operating System (EC6110)', '', '', '', '', ''),
(47, 'Sahan', 'Gunawardena', 'Student', '6th Semester', '2021/E/020', '2021e020@eng.jfn.ac.lk', '$2a$10$hashed30', 'Full-stack developer', '', 'Operating System (EC6110)', 'Software Engineering (EC6060)', 'Embedded Systems Design (EC6020)', 'Robotics and Automation (EC6090)', '', '', '', '', '', ''),
(48, 'Dilini', 'Wijesekara', 'Student', '4th Semester', '2022/E/001', '2022e001@eng.jfn.ac.lk', '$2a$10$hashed31', 'New to engineering', '', 'Computer and Data Networks (EC4060)', 'Data Structures and Algorithms (EC4070)', 'Digital Design (EC4010)', 'Discrete Mathematics (MC4010)', 'Electronics Circuits and Devices (EC4050)', '', '', '', '', ''),
(49, 'Chamara', 'Bandara', 'Student', '4th Semester', '2022/E/002', '2022e002@eng.jfn.ac.lk', '$2a$10$hashed32', 'Programming focus', '', 'Computer and Data Networks (EC4060)', 'Data Structures and Algorithms (EC4070)', 'Signals and Systems (EC4040)', 'Discrete Mathematics (MC4010)', '', '', '', '', '', ''),
(50, 'Nipuni', 'Rajapaksha', 'Student', '4th Semester', '2022/E/003', '2022e003@eng.jfn.ac.lk', '$2a$10$hashed33', 'Electronics interest', '', 'Electronics Circuits and Devices (EC4050)', 'Digital Design (EC4010)', 'Signals and Systems (EC4040)', '', '', '', '', '', '', ''),
(51, 'Supun', 'Jayaweera', 'Student', '4th Semester', '2022/E/004', '2022e004@eng.jfn.ac.lk', '$2a$10$hashed34', 'Math enthusiast', '', 'Discrete Mathematics (MC4010)', 'Data Structures and Algorithms (EC4070)', '', '', '', '', '', '', '', ''),
(52, 'Tharika', 'Peris', 'Student', '4th Semester', '2022/E/005', '2022e005@eng.jfn.ac.lk', '$2a$10$hashed35', 'Network systems', '', 'Computer and Data Networks (EC4060)', 'Signals and Systems (EC4040)', '', '', '', '', '', '', '', ''),
(53, 'Dilshan', 'Gamage', 'Student', '4th Semester', '2022/E/006', '2022e006@eng.jfn.ac.lk', '$2a$10$hashed36', 'Digital design', '', 'Digital Design (EC4010)', 'Electronics Circuits and Devices (EC4050)', '', '', '', '', '', '', '', ''),
(54, 'Anjali', 'Wickramasuriya', 'Student', '4th Semester', '2022/E/007', '2022e007@eng.jfn.ac.lk', '$2a$10$hashed37', 'Algorithm focus', '', 'Data Structures and Algorithms (EC4070)', 'Discrete Mathematics (MC4010)', '', '', '', '', '', '', '', ''),
(55, 'Charith', 'Ranasinghe', 'Student', '4th Semester', '2022/E/008', '2022e008@eng.jfn.ac.lk', '$2a$10$hashed38', 'Signals processing', '', 'Signals and Systems (EC4040)', 'Electronics Circuits and Devices (EC4050)', '', '', '', '', '', '', '', ''),
(56, 'Nadeesha', 'Liyanage', 'Student', '4th Semester', '2022/E/009', '2022e009@eng.jfn.ac.lk', '$2a$10$hashed39', 'General engineering', '', 'Computer and Data Networks (EC4060)', 'Digital Design (EC4010)', '', '', '', '', '', '', '', ''),
(57, 'Pasan', 'Abeysekara', 'Student', '4th Semester', '2022/E/010', '2022e010@eng.jfn.ac.lk', '$2a$10$hashed40', 'New student', '', 'Discrete Mathematics (MC4010)', 'Data Structures and Algorithms (EC4070)', '', '', '', '', '', '', '', ''),
(58, 'Dr. Anantharajah', 'Kaneswaran', 'Lecturer', '', 'LEC001', 'akaneswaran@eng.jfn.ac.lk', '$2a$10$lecturer1', 'Senior lecturer in computer networks', 'dr_kaneswaran.jpg', '', '', '', '', '', '', '', '', '', ''),
(60, 'Dr. (Mrs.) Jananie', 'Jarachanthan', 'Lecturer', '', 'LEC003', 'jananie@eng.jfn.ac.lk', '$2a$10$lecturer3', 'Database systems expert', 'dr_jananie.jpg', '', '', '', '', '', '', '', '', '', ''),
(61, 'Mr. Y.', 'Pirunthapan', 'Lecturer', '', 'LEC004', 'pirunthapan@eng.jfn.ac.lk', '$2a$10$lecturer4', 'Computer architecture specialist', 'mr_pirunthapan.jpg', '', '', '', '', '', '', '', '', '', ''),
(62, 'Mr. Nishankar', 'Sathiyamohan', 'Lecturer', '', 'LEC005', 'nishankar@eng.jfn.ac.lk', '$2a$10$lecturer5', 'Algorithms expert', 'mr_nishankar.jpg', '', '', '', '', '', '', '', '', '', ''),
(63, 'Mrs. Sujanthika', 'Morgan', 'Lecturer', '', 'LEC006', 'sujanthika@eng.jfn.ac.lk', '$2a$10$lecturer6', 'Intelligent systems specialist', 'mrs_sujanthika.jpg', '', '', '', '', '', '', '', '', '', ''),
(64, 'Mrs. Praveena', 'Mylvaganam', 'Lecturer', '', 'LEC007', 'praveena@eng.jfn.ac.lk', '$2a$10$lecturer7', 'Deep learning specialist', 'mrs_praveena.jpg', '', '', '', '', '', '', '', '', '', ''),
(65, 'Mr. P.', 'Ravivarman', 'Lecturer', '', 'LEC008', 'ravivarman@eng.jfn.ac.lk', '$2a$10$lecturer8', 'Electronics circuits expert', 'mr_ravivarman.jpg', '', '', '', '', '', '', '', '', '', ''),
(66, 'Prof. K.', 'Ahilan', 'Lecturer', '', 'LEC009', 'ahilan@eng.jfn.ac.lk', '$2a$10$lecturer9', 'Signals and systems professor', 'prof_ahilan.jpg', '', '', '', '', '', '', '', '', '', ''),
(67, 'Mr. Ragupathyraj', 'Valluvan', 'Lecturer', '', 'LEC010', 'ragupathyraj@eng.jfn.ac.lk', '$2a$10$lecturer10', 'Communication systems lecturer', 'mr_ragupathyraj.jpg', '', '', '', '', '', '', '', '', '', ''),
(68, 'Dr. T.', 'Mayooran', 'Lecturer', '', 'LEC011', 'mayooran@eng.jfn.ac.lk', '$2a$10$lecturer11', 'Discrete mathematics expert', 'dr_mayooran.jpg', '', '', '', '', '', '', '', '', '', ''),
(69, 'Sachini', 'Perera', 'Student', '4th Semester', '2022/E/011', '2022e011@eng.jfn.ac.lk', '$2a$10$hashed41', 'Interested in programming', '', 'Computer and Data Networks (EC4060)', 'Data Structures and Algorithms (EC4070)', 'Digital Design (EC4010)', '', '', '', '', '', '', ''),
(70, 'Dilshan', 'Fernando', 'Student', '4th Semester', '2022/E/012', '2022e012@eng.jfn.ac.lk', '$2a$10$hashed42', 'Math enthusiast', '', 'Discrete Mathematics (MC4010)', 'Signals and Systems (EC4040)', 'Electronics Circuits and Devices (EC4050)', '', '', '', '', '', '', ''),
(71, 'Nirosha', 'Wijesinghe', 'Student', '4th Semester', '2022/E/013', '2022e013@eng.jfn.ac.lk', '$2a$10$hashed43', 'Network systems focus', '', 'Computer and Data Networks (EC4060)', 'Data Structures and Algorithms (EC4070)', '', '', '', '', '', '', '', ''),
(72, 'Chamod', 'Rathnayake', 'Student', '4th Semester', '2022/E/014', '2022e014@eng.jfn.ac.lk', '$2a$10$hashed44', 'Digital electronics', '', 'Digital Design (EC4010)', 'Electronics Circuits and Devices (EC4050)', 'Discrete Mathematics (MC4010)', '', '', '', '', '', '', ''),
(73, 'Thilini', 'Gunasekara', 'Student', '4th Semester', '2022/E/015', '2022e015@eng.jfn.ac.lk', '$2a$10$hashed45', 'New to engineering', '', 'Data Structures and Algorithms (EC4070)', 'Signals and Systems (EC4040)', '', '', '', '', '', '', '', ''),
(74, 'Pasindu', 'Bandara', 'Student', '4th Semester', '2022/E/016', '2022e016@eng.jfn.ac.lk', '$2a$10$hashed46', 'Interested in signals', '', 'Signals and Systems (EC4040)', 'Electronics Circuits and Devices (EC4050)', 'Discrete Mathematics (MC4010)', '', '', '', '', '', '', ''),
(75, 'Hiruni', 'Silva', 'Student', '4th Semester', '2022/E/017', '2022e017@eng.jfn.ac.lk', '$2a$10$hashed47', 'Computer networks focus', '', 'Computer and Data Networks (EC4060)', 'Digital Design (EC4010)', '', '', '', '', '', '', '', ''),
(76, 'Sahan', 'Jayawardena', 'Student', '4th Semester', '2022/E/018', '2022e018@eng.jfn.ac.lk', '$2a$10$hashed48', 'Algorithm enthusiast', '', 'Data Structures and Algorithms (EC4070)', 'Discrete Mathematics (MC4010)', 'Computer and Data Networks (EC4060)', '', '', '', '', '', '', ''),
(77, 'Amandi', 'Peris', 'Student', '4th Semester', '2022/E/019', '2022e019@eng.jfn.ac.lk', '$2a$10$hashed49', 'Electronics interest', '', 'Electronics Circuits and Devices (EC4050)', 'Digital Design (EC4010)', '', '', '', '', '', '', '', ''),
(78, 'Dinesh', 'Wickramasinghe', 'Student', '4th Semester', '2022/E/020', '2022e020@eng.jfn.ac.lk', '$2a$10$hashed50', 'General engineering', '', 'Computer and Data Networks (EC4060)', 'Data Structures and Algorithms (EC4070)', 'Discrete Mathematics (MC4010)', '', '', '', '', '', '', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
