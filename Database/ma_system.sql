-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 06, 2025 at 10:15 AM
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
-- Table structure for table `attendance`
--

CREATE TABLE `attendance` (
  `id` int(255) NOT NULL,
  `regNo` varchar(20) NOT NULL,
  `subjectId` varchar(20) NOT NULL,
  `date` date NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `time_slot` varchar(50) NOT NULL,
  `attendance` enum('present','absent') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `attendance`
--

INSERT INTO `attendance` (`id`, `regNo`, `subjectId`, `date`, `timestamp`, `time_slot`, `attendance`) VALUES
(72, '2021/E/178', 'EC5070', '2025-03-03', '2025-03-10 19:19:14', '11:05 AM-12:00 PM', 'present'),
(73, '2021/E/078', 'EC5070', '2025-03-03', '2025-03-10 19:19:14', '11:05 AM-12:00 PM', 'absent'),
(74, '2021/E/178', 'EC5070', '2025-03-01', '2025-03-10 19:19:26', '01:00 PM-01:55 PM', 'present'),
(75, '2021/E/078', 'EC5070', '2025-03-01', '2025-03-10 19:19:26', '01:00 PM-01:55 PM', 'present'),
(76, '2021/E/178', 'EC5070', '2025-02-25', '2025-03-10 19:19:37', '01:00 PM-01:55 PM', 'present'),
(77, '2021/E/078', 'EC5070', '2025-02-25', '2025-03-10 19:19:37', '01:00 PM-01:55 PM', 'present'),
(78, '2021/E/178', 'EC5070', '2025-02-25', '2025-03-10 19:19:45', '03:10 PM-04:00 PM', 'absent'),
(79, '2021/E/078', 'EC5070', '2025-02-25', '2025-03-10 19:19:45', '03:10 PM-04:00 PM', 'absent'),
(81, '2021/E/178', 'EC5070', '2025-02-23', '2025-03-10 19:28:43', '01:00 PM-01:55 PM', 'present'),
(82, '2021/E/078', 'EC5070', '2025-02-23', '2025-03-10 19:28:43', '01:00 PM-01:55 PM', 'absent'),
(83, '2021/E/178', 'EC5070', '2025-02-25', '2025-03-10 19:28:48', '01:00 PM-01:55 PM', 'present'),
(84, '2021/E/078', 'EC5070', '2025-02-25', '2025-03-10 19:28:48', '01:00 PM-01:55 PM', 'absent'),
(85, '2021/E/078', 'EC5070', '2025-03-10', '2025-03-10 19:32:53', '01:00 PM-01:55 PM', 'present'),
(86, '2021/E/178', 'EC5070', '2025-03-10', '2025-03-10 19:32:53', '01:00 PM-01:55 PM', 'absent'),
(87, '2021/E/078', 'EC5070', '2025-03-11', '2025-03-11 06:39:51', '01:00 PM-01:55 PM', 'present'),
(88, '2021/E/178', 'EC5070', '2025-03-11', '2025-03-11 06:39:51', '01:00 PM-01:55 PM', 'present'),
(89, '2021/E/078', 'EC5070', '2025-03-11', '2025-03-11 06:39:54', '01:00 PM-01:55 PM', 'absent'),
(90, '2021/E/178', 'EC5070', '2025-03-11', '2025-03-11 06:39:54', '01:00 PM-01:55 PM', 'present'),
(91, '2021/E/078', 'EC5070', '2025-03-11', '2025-03-11 06:39:55', '01:00 PM-01:55 PM', 'absent'),
(92, '2021/E/178', 'EC5070', '2025-03-11', '2025-03-11 06:39:55', '01:00 PM-01:55 PM', 'present'),
(93, '2021/E/178', 'EC5020', '2025-03-11', '2025-03-11 06:41:39', '01:00 PM-01:55 PM', 'absent'),
(95, '2021/E/001', 'EC6060', '2025-04-01', '2025-04-06 06:34:35', '08:00 AM-08:55 AM', 'present'),
(96, '2021/E/002', 'EC6060', '2025-04-01', '2025-04-06 06:34:35', '08:00 AM-08:55 AM', 'absent'),
(97, '2021/E/003', 'EC6060', '2025-04-01', '2025-04-06 06:34:35', '08:00 AM-08:55 AM', 'present'),
(98, '2021/E/004', 'EC6060', '2025-04-01', '2025-04-06 06:34:35', '08:00 AM-08:55 AM', 'present'),
(99, '2021/E/005', 'EC6060', '2025-04-01', '2025-04-06 06:34:35', '08:00 AM-08:55 AM', 'present'),
(100, '2021/E/006', 'EC6060', '2025-04-01', '2025-04-06 06:34:35', '08:00 AM-08:55 AM', 'present'),
(101, '2021/E/007', 'EC6060', '2025-04-01', '2025-04-06 06:34:35', '08:00 AM-08:55 AM', 'absent'),
(102, '2021/E/008', 'EC6060', '2025-04-01', '2025-04-06 06:34:35', '08:00 AM-08:55 AM', 'present'),
(103, '2021/E/009', 'EC6060', '2025-04-01', '2025-04-06 06:34:35', '08:00 AM-08:55 AM', 'present'),
(104, '2021/E/010', 'EC6060', '2025-04-01', '2025-04-06 06:34:35', '08:00 AM-08:55 AM', 'present'),
(105, '2021/E/011', 'EC6060', '2025-04-01', '2025-04-06 06:34:35', '08:00 AM-08:55 AM', 'present'),
(106, '2021/E/012', 'EC6060', '2025-04-01', '2025-04-06 06:34:35', '08:00 AM-08:55 AM', 'present'),
(107, '2021/E/013', 'EC6060', '2025-04-01', '2025-04-06 06:34:35', '08:00 AM-08:55 AM', 'present'),
(108, '2021/E/014', 'EC6060', '2025-04-01', '2025-04-06 06:34:35', '08:00 AM-08:55 AM', 'present'),
(109, '2021/E/015', 'EC6060', '2025-04-01', '2025-04-06 06:34:35', '08:00 AM-08:55 AM', 'present'),
(110, '2021/E/016', 'EC6060', '2025-04-01', '2025-04-06 06:34:35', '08:00 AM-08:55 AM', 'absent'),
(111, '2021/E/017', 'EC6060', '2025-04-01', '2025-04-06 06:34:35', '08:00 AM-08:55 AM', 'present'),
(112, '2021/E/019', 'EC6060', '2025-04-01', '2025-04-06 06:34:35', '08:00 AM-08:55 AM', 'present'),
(113, '2021/E/020', 'EC6060', '2025-04-01', '2025-04-06 06:34:35', '08:00 AM-08:55 AM', 'present'),
(114, '2021/E/045', 'EC6060', '2025-04-01', '2025-04-06 06:34:35', '08:00 AM-08:55 AM', 'present'),
(115, '2021/E/078', 'EC6060', '2025-04-01', '2025-04-06 06:34:35', '08:00 AM-08:55 AM', 'present'),
(116, '2021/E/108', 'EC6060', '2025-04-01', '2025-04-06 06:34:35', '08:00 AM-08:55 AM', 'present'),
(117, '2021/E/001', 'EC6060', '2025-04-03', '2025-04-06 06:37:13', '01:00 PM-01:55 PM', 'present'),
(118, '2021/E/002', 'EC6060', '2025-04-03', '2025-04-06 06:37:13', '01:00 PM-01:55 PM', 'present'),
(119, '2021/E/003', 'EC6060', '2025-04-03', '2025-04-06 06:37:13', '01:00 PM-01:55 PM', 'present'),
(120, '2021/E/004', 'EC6060', '2025-04-03', '2025-04-06 06:37:13', '01:00 PM-01:55 PM', 'absent'),
(121, '2021/E/005', 'EC6060', '2025-04-03', '2025-04-06 06:37:13', '01:00 PM-01:55 PM', 'present'),
(122, '2021/E/006', 'EC6060', '2025-04-03', '2025-04-06 06:37:13', '01:00 PM-01:55 PM', 'present'),
(123, '2021/E/007', 'EC6060', '2025-04-03', '2025-04-06 06:37:13', '01:00 PM-01:55 PM', 'present'),
(124, '2021/E/008', 'EC6060', '2025-04-03', '2025-04-06 06:37:13', '01:00 PM-01:55 PM', 'absent'),
(125, '2021/E/009', 'EC6060', '2025-04-03', '2025-04-06 06:37:13', '01:00 PM-01:55 PM', 'present'),
(126, '2021/E/010', 'EC6060', '2025-04-03', '2025-04-06 06:37:13', '01:00 PM-01:55 PM', 'present'),
(127, '2021/E/011', 'EC6060', '2025-04-03', '2025-04-06 06:37:13', '01:00 PM-01:55 PM', 'present'),
(128, '2021/E/012', 'EC6060', '2025-04-03', '2025-04-06 06:37:13', '01:00 PM-01:55 PM', 'present'),
(129, '2021/E/013', 'EC6060', '2025-04-03', '2025-04-06 06:37:13', '01:00 PM-01:55 PM', 'present'),
(130, '2021/E/014', 'EC6060', '2025-04-03', '2025-04-06 06:37:13', '01:00 PM-01:55 PM', 'absent'),
(131, '2021/E/015', 'EC6060', '2025-04-03', '2025-04-06 06:37:13', '01:00 PM-01:55 PM', 'present'),
(132, '2021/E/016', 'EC6060', '2025-04-03', '2025-04-06 06:37:13', '01:00 PM-01:55 PM', 'present'),
(133, '2021/E/017', 'EC6060', '2025-04-03', '2025-04-06 06:37:13', '01:00 PM-01:55 PM', 'present'),
(134, '2021/E/019', 'EC6060', '2025-04-03', '2025-04-06 06:37:13', '01:00 PM-01:55 PM', 'present'),
(135, '2021/E/020', 'EC6060', '2025-04-03', '2025-04-06 06:37:13', '01:00 PM-01:55 PM', 'present'),
(136, '2021/E/045', 'EC6060', '2025-04-03', '2025-04-06 06:37:13', '01:00 PM-01:55 PM', 'present'),
(137, '2021/E/078', 'EC6060', '2025-04-03', '2025-04-06 06:37:13', '01:00 PM-01:55 PM', 'present'),
(138, '2021/E/108', 'EC6060', '2025-04-03', '2025-04-06 06:37:13', '01:00 PM-01:55 PM', 'present'),
(139, '2021/E/001', 'EC6070', '2025-04-02', '2025-04-06 06:37:38', '08:55 AM-09:50 AM', 'present'),
(140, '2021/E/002', 'EC6070', '2025-04-02', '2025-04-06 06:37:38', '08:55 AM-09:50 AM', 'absent'),
(141, '2021/E/003', 'EC6070', '2025-04-02', '2025-04-06 06:37:38', '08:55 AM-09:50 AM', 'present'),
(142, '2021/E/005', 'EC6070', '2025-04-02', '2025-04-06 06:37:38', '08:55 AM-09:50 AM', 'present'),
(143, '2021/E/009', 'EC6070', '2025-04-02', '2025-04-06 06:37:38', '08:55 AM-09:50 AM', 'present'),
(144, '2021/E/015', 'EC6070', '2025-04-02', '2025-04-06 06:37:38', '08:55 AM-09:50 AM', 'absent'),
(145, '2021/E/019', 'EC6070', '2025-04-02', '2025-04-06 06:37:38', '08:55 AM-09:50 AM', 'present'),
(146, '2021/E/045', 'EC6070', '2025-04-02', '2025-04-06 06:37:38', '08:55 AM-09:50 AM', 'present'),
(147, '2021/E/078', 'EC6070', '2025-04-02', '2025-04-06 06:37:38', '08:55 AM-09:50 AM', 'present'),
(148, '2021/E/108', 'EC6070', '2025-04-02', '2025-04-06 06:37:38', '08:55 AM-09:50 AM', 'present'),
(149, '2021/E/001', 'EC6070', '2025-04-04', '2025-04-06 08:09:52', '10:10 AM-11:05 AM', 'present'),
(150, '2021/E/002', 'EC6070', '2025-04-04', '2025-04-06 08:09:52', '10:10 AM-11:05 AM', 'absent'),
(151, '2021/E/003', 'EC6070', '2025-04-04', '2025-04-06 08:09:52', '10:10 AM-11:05 AM', 'present'),
(152, '2021/E/005', 'EC6070', '2025-04-04', '2025-04-06 08:09:52', '10:10 AM-11:05 AM', 'absent'),
(153, '2021/E/009', 'EC6070', '2025-04-04', '2025-04-06 08:09:52', '10:10 AM-11:05 AM', 'present'),
(154, '2021/E/015', 'EC6070', '2025-04-04', '2025-04-06 08:09:52', '10:10 AM-11:05 AM', 'present'),
(155, '2021/E/019', 'EC6070', '2025-04-04', '2025-04-06 08:09:52', '10:10 AM-11:05 AM', 'present'),
(156, '2021/E/045', 'EC6070', '2025-04-04', '2025-04-06 08:09:52', '10:10 AM-11:05 AM', 'present'),
(157, '2021/E/078', 'EC6070', '2025-04-04', '2025-04-06 08:09:52', '10:10 AM-11:05 AM', 'absent'),
(158, '2021/E/108', 'EC6070', '2025-04-04', '2025-04-06 08:09:52', '10:10 AM-11:05 AM', 'present'),
(159, '2021/E/001', 'EC6090', '2025-04-01', '2025-04-06 08:12:31', '08:55 AM-09:50 AM', 'present'),
(160, '2021/E/007', 'EC6090', '2025-04-01', '2025-04-06 08:12:31', '08:55 AM-09:50 AM', 'present'),
(161, '2021/E/008', 'EC6090', '2025-04-01', '2025-04-06 08:12:31', '08:55 AM-09:50 AM', 'present'),
(162, '2021/E/009', 'EC6090', '2025-04-01', '2025-04-06 08:12:31', '08:55 AM-09:50 AM', 'present'),
(163, '2021/E/010', 'EC6090', '2025-04-01', '2025-04-06 08:12:31', '08:55 AM-09:50 AM', 'present'),
(164, '2021/E/011', 'EC6090', '2025-04-01', '2025-04-06 08:12:31', '08:55 AM-09:50 AM', 'present'),
(165, '2021/E/012', 'EC6090', '2025-04-01', '2025-04-06 08:12:31', '08:55 AM-09:50 AM', 'absent'),
(166, '2021/E/013', 'EC6090', '2025-04-01', '2025-04-06 08:12:31', '08:55 AM-09:50 AM', 'present'),
(167, '2021/E/014', 'EC6090', '2025-04-01', '2025-04-06 08:12:31', '08:55 AM-09:50 AM', 'present'),
(168, '2021/E/015', 'EC6090', '2025-04-01', '2025-04-06 08:12:31', '08:55 AM-09:50 AM', 'present'),
(169, '2021/E/016', 'EC6090', '2025-04-01', '2025-04-06 08:12:31', '08:55 AM-09:50 AM', 'absent'),
(170, '2021/E/017', 'EC6090', '2025-04-01', '2025-04-06 08:12:31', '08:55 AM-09:50 AM', 'present'),
(171, '2021/E/018', 'EC6090', '2025-04-01', '2025-04-06 08:12:31', '08:55 AM-09:50 AM', 'present'),
(172, '2021/E/019', 'EC6090', '2025-04-01', '2025-04-06 08:12:31', '08:55 AM-09:50 AM', 'present'),
(173, '2021/E/020', 'EC6090', '2025-04-01', '2025-04-06 08:12:31', '08:55 AM-09:50 AM', 'present'),
(174, '2021/E/045', 'EC6090', '2025-04-01', '2025-04-06 08:12:31', '08:55 AM-09:50 AM', 'present'),
(175, '2021/E/078', 'EC6090', '2025-04-01', '2025-04-06 08:12:31', '08:55 AM-09:50 AM', 'present'),
(176, '2021/E/108', 'EC6090', '2025-04-01', '2025-04-06 08:12:31', '08:55 AM-09:50 AM', 'present');

-- --------------------------------------------------------

--
-- Table structure for table `batchdetails`
--

CREATE TABLE `batchdetails` (
  `id` int(10) NOT NULL,
  `batch` varchar(10) NOT NULL,
  `semester` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `batchdetails`
--

INSERT INTO `batchdetails` (`id`, `batch`, `semester`) VALUES
(1, 'E20', '7th semester'),
(2, 'E21', '6th semester'),
(3, 'E22', '5th semester');

-- --------------------------------------------------------

--
-- Table structure for table `cash_requests`
--

CREATE TABLE `cash_requests` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `type` enum('Allowance','Petty Cash') NOT NULL,
  `topic` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `status` enum('Pending','Approved','Declined') DEFAULT 'Pending',
  `funds` decimal(10,2) DEFAULT NULL,
  `responseDescription` text DEFAULT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cash_requests`
--

INSERT INTO `cash_requests` (`id`, `userId`, `type`, `topic`, `description`, `status`, `funds`, `responseDescription`, `timestamp`) VALUES
(1, 17, 'Allowance', 'asd', 'cvbx', 'Pending', NULL, NULL, '2025-03-16 19:55:15'),
(5, 17, 'Allowance', 'dsd', 'fbfx', 'Pending', NULL, NULL, '2025-03-16 20:07:13'),
(17, 17, 'Allowance', 'Exam Duty', 'Analogue and Digital Communication exam duty for two hours', 'Approved', 2000.00, 'Approved', '2025-03-17 18:31:43'),
(18, 17, 'Allowance', 'lmm', 'lknnnl\n\ncx\n\n', 'Pending', NULL, NULL, '2025-03-18 08:36:29'),
(19, 17, 'Allowance', 'viva session', 'lknnnl\n\ncx\n\n', 'Declined', NULL, 'cannot proceed', '2025-03-18 15:20:31'),
(20, 18, 'Allowance', 'viva session 2 day', 'one hour', 'Approved', 20000.00, 'filled ', '2025-03-18 18:39:35'),
(21, 18, 'Petty Cash', 'stationary items buy', 'need 2000 lkr', 'Pending', NULL, NULL, '2025-03-21 18:37:59'),
(22, 18, 'Petty Cash', 'whiteboard pens buy', 'need 3000 lkr', 'Pending', NULL, NULL, '2025-03-21 18:41:04');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(255) NOT NULL,
  `name` text NOT NULL,
  `comment` text NOT NULL,
  `pic` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `name`, `comment`, `pic`) VALUES
(1, 'Silly Richel', 'Fantastic website! It’s user-friendly, visually appealing, and packed with useful information. I’ll definitely be coming back!', 'https://i.ibb.co/XfCD3hCP/image.png'),
(2, 'Emily Carter', 'Great website! The design is clean and modern, and it’s very easy to navigate. I found exactly what I was looking for in just a few clicks. Keep up the good work!', 'https://i.ibb.co/vCKd5zsc/image.png'),
(3, 'John Doe', 'The navigation on this website is flawless! I was able to find what I was looking for without any hassle. Well done!', 'https://i.ibb.co/Mxzp41VF/image.png');

-- --------------------------------------------------------

--
-- Table structure for table `coursefeedbackrate`
--

CREATE TABLE `coursefeedbackrate` (
  `feedback_number_c` int(11) NOT NULL,
  `semester` varchar(200) NOT NULL,
  `studentID` int(100) NOT NULL,
  `course_name` varchar(100) NOT NULL,
  `cq1_rate` int(50) NOT NULL,
  `cq2_rate` int(50) NOT NULL,
  `cq3_rate` int(50) NOT NULL,
  `cq4_rate` int(50) NOT NULL,
  `cq5_rate` int(50) NOT NULL,
  `cq6_rate` int(50) NOT NULL,
  `cq7_rate` int(50) NOT NULL,
  `cq8_rate` int(50) NOT NULL,
  `cq9_rate` int(50) NOT NULL,
  `cq10_rate` int(50) NOT NULL,
  `cq11_rate` int(50) NOT NULL,
  `cq12_rate` int(50) NOT NULL,
  `cq13_rate` int(50) NOT NULL,
  `cq14_rate` int(50) NOT NULL,
  `cq15_rate` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `coursefeedbackrate`
--

INSERT INTO `coursefeedbackrate` (`feedback_number_c`, `semester`, `studentID`, `course_name`, `cq1_rate`, `cq2_rate`, `cq3_rate`, `cq4_rate`, `cq5_rate`, `cq6_rate`, `cq7_rate`, `cq8_rate`, `cq9_rate`, `cq10_rate`, `cq11_rate`, `cq12_rate`, `cq13_rate`, `cq14_rate`, `cq15_rate`) VALUES
(21, '6th Semester', 10, 'Computer Engineering Research Project I ', -1, 0, -1, 1, 1, 1, 2, 1, 1, 2, 2, 1, 1, 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `coursefeedbackrate_avg`
--

CREATE TABLE `coursefeedbackrate_avg` (
  `semester` varchar(200) NOT NULL,
  `course_name` varchar(100) NOT NULL,
  `avg1` double NOT NULL,
  `avg2` double NOT NULL,
  `avg3` double NOT NULL,
  `avg4` double NOT NULL,
  `avg5` double NOT NULL,
  `avg6` double NOT NULL,
  `avg7` double NOT NULL,
  `avg8` double NOT NULL,
  `avg9` double NOT NULL,
  `avg10` double NOT NULL,
  `avg11` double NOT NULL,
  `avg12` double NOT NULL,
  `avg13` double NOT NULL,
  `avg14` double NOT NULL,
  `avg15` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `coursefeedbackrate_avg`
--

INSERT INTO `coursefeedbackrate_avg` (`semester`, `course_name`, `avg1`, `avg2`, `avg3`, `avg4`, `avg5`, `avg6`, `avg7`, `avg8`, `avg9`, `avg10`, `avg11`, `avg12`, `avg13`, `avg14`, `avg15`) VALUES
('6th Semester', 'Computer Engineering Research Project I ', -1, 0, -1, 1, 1, 1, 2, 1, 1, 2, 2, 1, 1, 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `feedbackquestions`
--

CREATE TABLE `feedbackquestions` (
  `QID` int(100) NOT NULL,
  `QType` varchar(100) NOT NULL,
  `QGroup` varchar(100) NOT NULL,
  `Questions` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `feedbackquestions`
--

INSERT INTO `feedbackquestions` (`QID`, `QType`, `QGroup`, `Questions`) VALUES
(1, 'Course', 'General', 'This course helped me to enhance my knowledge.'),
(2, 'Course', 'General', 'The workload of the course was manageable.'),
(3, 'Course', 'General', 'The course was interesting'),
(4, 'Course', 'Materials', 'Adequate Materials (handouts) were provided.'),
(5, 'Course', 'Materials', 'Handouts were easy to understand.'),
(6, 'Course', 'Materials', 'Enough reference books were used.'),
(7, 'Course', 'Tutorials/ Examples', 'Given problems (examples/ tutorials/ exercises) were enough.'),
(8, 'Course', 'Tutorials/ Examples', 'Given problems (examples/ tutorials/ exercises) were challenging.'),
(9, 'Course', 'Lab/ Fieldwork', 'I could relate what I learnt from lectures to lab/ field classes.'),
(10, 'Course', 'Lab/ Fieldwork', 'Labs & Fieldwork helped to improve my skills and practical knowledge.'),
(11, 'Course', 'Lab/ Fieldwork', 'I can conduct experiments/ fieldwork myself through set of instructions in future.'),
(12, 'Course', 'About Myself', 'I prepared thoroughly for each class.'),
(13, 'Course', 'About Myself', 'I attended lectures, lab/fieldwork regularly.'),
(14, 'Course', 'About Myself', 'I did all assigned work (homework/ assignments/ lab & field report) on time.'),
(15, 'Course', 'About Myself', 'I referred recommended textbooks regularly.'),
(16, 'Lecturer', 'Time Management', 'Lectures/ Labs/ Fieldworks started and finished on time.'),
(17, 'Lecturer', 'Time Management', 'The lecturer managed class time effectively.'),
(18, 'Lecturer', 'Time Management', 'The lecturer was readily available for consultation with students.'),
(19, 'Lecturer', 'Delivery Method', 'Use of teaching aids (multimedia, white board).'),
(20, 'Lecturer', 'Delivery Method', 'Lectures were easy to understand.'),
(21, 'Lecturer', 'Delivery Method', 'The lecturer encouraged students to participate in discussions.'),
(22, 'Lecturer', 'Subject Command', 'The lecturer focused on syllabi.'),
(23, 'Lecturer', 'Subject Command', 'The lecturer was self-confident in subject and teaching.'),
(24, 'Lecturer', 'Subject Command', 'The lecturer linked real-world applications and creating interest in the subject.'),
(25, 'Lecturer', 'Subject Command', 'The lecturer updated latest development in the field.'),
(26, 'Lecturer', 'About Myself', 'I asked questions from the lecturer in the class.'),
(27, 'Lecturer', 'About Myself', 'I asked questions from the lecturer in the class.');

-- --------------------------------------------------------

--
-- Table structure for table `files`
--

CREATE TABLE `files` (
  `id` int(11) NOT NULL,
  `lecturer_id` int(11) NOT NULL,
  `file_name` varchar(255) NOT NULL,
  `file_path` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `destination` varchar(255) DEFAULT NULL,
  `destination_type` enum('internal','external') NOT NULL,
  `status` enum('pending','approved','rejected') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `files`
--

INSERT INTO `files` (`id`, `lecturer_id`, `file_name`, `file_path`, `description`, `destination`, `destination_type`, `status`, `created_at`, `updated_at`) VALUES
(5, 17, 'SEA FISH TANK SYSTEM.pdf', 'uploads\\1743746544487.pdf', 'Get permission', 'To Dean', 'external', 'approved', '2025-04-04 06:02:24', '2025-04-04 15:56:13'),
(11, 2, 'user.sql', 'uploads\\1743780687182.sql', 'check it out', 'Dr. (Mrs.) Pratheeba Jeyananthan', 'internal', 'approved', '2025-04-04 15:31:27', '2025-04-04 15:41:37'),
(12, 17, 'ma_system.sql', 'uploads\\1743781769903.sql', 'Check this', 'Department Office', 'internal', 'rejected', '2025-04-04 15:49:29', '2025-04-06 03:37:11'),
(13, 17, 'Research Proposal 2021E078, 2021E108.pdf', 'uploads\\1743910339299.pdf', 'hi this is research proposal.', 'Dr. Anantharajah Kaneswaran', 'internal', 'pending', '2025-04-06 03:32:19', '2025-04-06 03:32:19');

-- --------------------------------------------------------

--
-- Table structure for table `lecturerfeedbackrate`
--

CREATE TABLE `lecturerfeedbackrate` (
  `feedback_number_l` int(50) NOT NULL,
  `semester` varchar(200) NOT NULL,
  `studentID` int(100) NOT NULL,
  `subjectName` varchar(100) NOT NULL,
  `lecturer_name` varchar(100) NOT NULL,
  `lecture_course_name` varchar(200) NOT NULL,
  `lq1_rate` int(50) NOT NULL,
  `lq2_rate` int(50) NOT NULL,
  `lq3_rate` int(50) NOT NULL,
  `lq4_rate` int(50) NOT NULL,
  `lq5_rate` int(50) NOT NULL,
  `lq6_rate` int(50) NOT NULL,
  `lq7_rate` int(50) NOT NULL,
  `lq8_rate` int(50) NOT NULL,
  `lq9_rate` int(50) NOT NULL,
  `lq10_rate` int(50) NOT NULL,
  `lq11_rate` int(50) NOT NULL,
  `lq12_rate` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `lecturerfeedbackrate`
--

INSERT INTO `lecturerfeedbackrate` (`feedback_number_l`, `semester`, `studentID`, `subjectName`, `lecturer_name`, `lecture_course_name`, `lq1_rate`, `lq2_rate`, `lq3_rate`, `lq4_rate`, `lq5_rate`, `lq6_rate`, `lq7_rate`, `lq8_rate`, `lq9_rate`, `lq10_rate`, `lq11_rate`, `lq12_rate`) VALUES
(18, '6th Semester', 10, 'Computer Engineering Research Project I ', 'Dr. (Mrs.) Pratheeba Jeyananthan', 'Dr. (Mrs.) Pratheeba Jeyananthan - Computer Engineering Research Project I ', 0, 1, 1, 2, 1, 2, 1, 2, 1, 1, 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `lecturerfeedbackrate_avg`
--

CREATE TABLE `lecturerfeedbackrate_avg` (
  `semester` varchar(200) NOT NULL,
  `lecturer_name` varchar(100) NOT NULL,
  `avg1` double NOT NULL,
  `avg2` double NOT NULL,
  `avg3` double NOT NULL,
  `avg4` double NOT NULL,
  `avg5` double NOT NULL,
  `avg6` double NOT NULL,
  `avg7` double NOT NULL,
  `avg8` double NOT NULL,
  `avg9` double NOT NULL,
  `avg10` double NOT NULL,
  `avg11` double NOT NULL,
  `avg12` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `lecturerfeedbackrate_avg`
--

INSERT INTO `lecturerfeedbackrate_avg` (`semester`, `lecturer_name`, `avg1`, `avg2`, `avg3`, `avg4`, `avg5`, `avg6`, `avg7`, `avg8`, `avg9`, `avg10`, `avg11`, `avg12`) VALUES
('6th Semester', 'Dr. (Mrs.) Pratheeba Jeyananthan', 0, 1, 1, 2, 1, 2, 1, 2, 1, 1, 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `lecturers`
--

CREATE TABLE `lecturers` (
  `id` int(50) NOT NULL,
  `lecturerId` text NOT NULL,
  `lecturerName` text NOT NULL,
  `department` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `lecturers`
--

INSERT INTO `lecturers` (`id`, `lecturerId`, `lecturerName`, `department`) VALUES
(1, 'Not Set', 'Dr. Anantharajah Kaneswaran', 'Department of Computer Engineering'),
(2, 'Not Set', 'Dr. (Mrs.) Pratheeba Jeyananthan', 'Department of Computer Engineering'),
(3, 'Not Set', 'Dr. (Mrs.) Jananie Jarachanthan', 'Department of Computer Engineering'),
(4, 'Not Set', 'Mr. Y. Pirunthapan', 'Department of Computer Engineering'),
(5, 'Not Set', 'Mr. Nishankar Sathiyamohan', 'Department of Computer Engineering'),
(6, 'Not Set', 'Mrs. Sujanthika Morgan', 'Department of Computer Engineering'),
(7, 'Not Set', 'Mrs. Praveena Mylvaganam', 'Department of Electrical and Electronic Engineering'),
(8, 'Not Set', 'Mr. P. Ravivarman', 'Department of Electrical and Electronic Engineering'),
(9, 'Not Set', 'Prof. K. Ahilan', 'Department of Electrical and Electronic Engineering'),
(10, 'Not Set', 'Mr. Ragupathyraj Valluvan', 'Department of Electrical and Electronic Engineering'),
(11, 'Not Set', 'Dr. T. Mayooran', 'Department of Interdisciplinary');

-- --------------------------------------------------------

--
-- Table structure for table `nonacademicdetails`
--

CREATE TABLE `nonacademicdetails` (
  `id` int(255) NOT NULL,
  `registerNumber` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `attendance` int(20) NOT NULL,
  `dailyCharge` int(20) NOT NULL,
  `month` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `nonacademicdetails`
--

INSERT INTO `nonacademicdetails` (`id`, `registerNumber`, `name`, `attendance`, `dailyCharge`, `month`) VALUES
(0, 'reg03', 'Kobi Suda', 15, 750, 'February'),
(1, 'reg01', 'Sooriyakumar', 18, 500, 'January'),
(2, 'reg02', 'Nanda Raj', 10, 600, 'January'),
(4, 'reg04', 'Premachandran', 20, 700, 'February');

-- --------------------------------------------------------

--
-- Table structure for table `notice`
--

CREATE TABLE `notice` (
  `id` int(255) NOT NULL,
  `title` text NOT NULL,
  `content` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notice`
--

INSERT INTO `notice` (`id`, `title`, `content`) VALUES
(1, 'Upcoming Event Alert', 'Our annual tech conference is right around the corner! Get ready for a day of networking, learning, and exploring the latest advancements in technology. Don’t miss out on sessions, workshops, and keynote speakers!'),
(2, 'Limited-Time Sale', 'Shop now and save big! Our limited-time sale offers exclusive discounts on selected products. Hurry, the clock is ticking. Don’t miss your chance to grab the best deals before they’re gone!'),
(3, 'Maintenance Scheduled', 'Please note that scheduled maintenance will take place this weekend from 10 PM to 2 AM. During this time, our website and services may be temporarily unavailable. We appreciate your patience and understanding'),
(5, 'Holiday Hours Update', 'Our office will be closed for the holidays from December 24th to January 2nd. We wish you a joyful and restful holiday season. If you need assistance, please contact us before the break'),
(6, 'Contest Announcement', 'Join our exciting new contest for a chance to win fantastic prizes! The contest is open to all participants, and the rules are simple. Visit our website for more details and enter today!'),
(7, 'Important Policy Change', 'We’re updating our terms and conditions to improve user experience and security. Please take a moment to review the changes. If you have any questions or concerns, feel free to reach out to us for clarification'),
(8, 'Feedback Request', 'Your feedback matters! We’re conducting a brief survey to gather your thoughts on our services. Your responses will help us improve and better serve you in the future. We appreciate your time and input');

-- --------------------------------------------------------

--
-- Table structure for table `subjects`
--

CREATE TABLE `subjects` (
  `id` int(255) NOT NULL,
  `semester` text NOT NULL,
  `subjectId` text NOT NULL,
  `subjectName` text NOT NULL,
  `lecturer` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subjects`
--

INSERT INTO `subjects` (`id`, `semester`, `subjectId`, `subjectName`, `lecturer`) VALUES
(1, '4th Semester', 'EC4060', 'Computer and Data Networks', 'Dr. Anantharajah Kaneswaran'),
(2, '4th Semester', 'EC4070', 'Data Structures and Algorithms', 'Dr. (Mrs.) Pratheeba Jeyananthan'),
(3, '4th Semester', 'EC4010', 'Digital Design', 'Mrs. Mary Regin Kamalina A'),
(4, '4th Semester', 'MC4010', 'Discrete Mathematics', 'Dr. T. Mayooran'),
(5, '4th Semester', 'EC4050', 'Electronics Circuits and Devices', 'Mr. P. Ravivarman'),
(6, '4th Semester', 'EC4040', 'Signals and Systems', 'Prof. K. Ahilan'),
(7, '5th Semester', 'EC5020', 'Analogue and Communication', 'Mr. Ragupathyraj Valluvan'),
(8, '5th Semester', 'EC5110', 'Computer Architecture and Organization', 'Mr. Y. Pirunthapan'),
(9, '5th Semester', 'EC5030', 'Control System', 'Prof. K. Ahilan'),
(10, '5th Semester', 'EC5070', 'Database Systems', 'Dr. (Mrs.) Jananie Jarachanthan'),
(11, '5th Semester', 'EC5010', 'Digital Signal Processing', 'Mr. P. Ravivarman'),
(12, '5th Semester', 'EC5080', 'Software Construction', 'Dr. (Mrs.) Jananie Jarachanthan'),
(13, '5th Extended Semester', 'MC9010', 'Management in Practice with Case Studies', 'Not Set'),
(14, '5th Extended Semester', 'MC9020', 'Business Law', 'Not Set'),
(15, '5th Extended Semester', 'MC9030', 'Marketing and Financial Management', 'Not Set'),
(16, '5th Extended Semester', 'MC9040', 'Industrial Safety and Resource Management', 'Not Set'),
(17, '5th Extended Semester', 'MC9050', 'Technology and Economic Development', 'Not Set'),
(18, '5th Extended Semester', 'MC9060', 'Rural Economic Development and Technology', 'Not Set'),
(19, '5th Extended Semester', 'MC9070', 'Engineer as an Entrepreneur', 'Not Set'),
(20, '5th Extended Semester', 'MC9080', 'Advanced English Communications', 'Not Set'),
(21, '5th Extended Semester', 'MC9090', 'Advanced Written English', 'Not Set'),
(22, '5th Extended Semester', 'MC9100', 'Society and Engineer', 'Not Set'),
(23, '5th Extended Semester', 'MC9110', 'Appreciating Music', 'Not Set'),
(24, '5th Extended Semester', 'MC9120', 'Cinema and Television', 'Not Set'),
(25, '5th Extended Semester', 'MC9130', 'Graphic Design', 'Not Set'),
(26, '5th Extended Semester', 'MC9140', 'Physical Development and Health Management', 'Not Set'),
(27, '5th Extended Semester', 'MC9150', 'Sustainable Development', 'Not Set'),
(28, '5th Extended Semester', 'MC9160', 'Active Citizenship', 'Not Set'),
(29, '5th Extended Semester', 'MC9170', 'Community Work', 'Not Set'),
(30, '6th Semester', 'EC6070', 'Computer Engineering Research Project I ', 'Dr. (Mrs.) Pratheeba Jeyananthan'),
(31, '6th Semester', 'EC6020', 'Embedded Systems Design', 'Mrs. Mary Regin Kamalina A.'),
(32, '6th Semester', 'EC6110', 'Operating System', 'Dr. (Mrs.) Pratheeba Jeyananthan'),
(33, '6th Semester', 'EC6090', 'Robotics and Automation', 'Mr. P. Ravivarman'),
(34, '6th Semester', 'EC6060', 'Software Engineering', 'Dr. (Mrs.) Jananie Jarachanthan'),
(35, '6th Semester', 'EC9650', 'Bioinfomatics', 'Dr. (Mrs.) Pratheeba Jeyananthan'),
(36, '6th Semester', 'EC9170', 'Deep Learning', 'Mrs. Praveena Mylvaganam'),
(37, '6th Semester', 'EC9550', 'Intelligent System Design', 'Mrs. Sujanthika Morgan'),
(38, '6th Semester', 'EC9600', 'Applied Algorithms', 'Mr. Nishankar Sathiyamohan'),
(39, '6th Semester', 'EC9520', 'Advanced Computer and Data Networks', 'Mr. Y. Pirunthapan'),
(40, '6th Semester', 'EC9630', 'Machine Learning', 'Mr. Y. Pirunthapan'),
(41, '7th Semester', 'EC7070', 'Computer Engineering Research Project II', 'Dr. (Mrs.) Pratheeba Jeyananthan'),
(42, '7th Semester', 'EC7020', 'Computer and Network Security', 'Dr. Anantharajah Kaneswaran'),
(43, '7th Semester', 'ID7010', 'Project Management and Engineering Industry', 'Not Set'),
(44, '7th Semester', 'EC9040', 'Advanced Degital Design and Systhesis', 'Dr. (Mrs.) Pratheeba Jeyananthan'),
(45, '7th Semester', 'EC9080', 'Electronic Product Design and Manufacture', 'Dr. (Mrs.) Pratheeba Jeyananthan'),
(46, '7th Semester', 'EC9570', 'Digital Image Processing', 'Dr. (Mrs.) Jananie Jarachanthan'),
(47, '7th Semester', 'EC9540', 'Human Computer Interaction', 'Dr. (Mrs.) Jananie Jarachanthan'),
(48, '7th Semester', 'EC9560', 'Datamining', 'Dr. (Mrs.) Jananie Jarachanthan'),
(49, '7th Semester', 'EC9580', 'Computer Vision', 'Dr. (Mrs.) Jananie Jarachanthan'),
(50, '7th Semester', 'EC9600', 'Applied Algorithm', 'Dr. (Mrs.) Jananie Jarachanthan'),
(51, '7th Semester', 'EC9640', 'Artificial Intelligence', 'Dr. (Mrs.) Jananie Jarachanthan'),
(52, '8th Semester', 'EC8020', 'Computer Engineering Design Proficiency', 'Dr. Anantharajah Kaneswaran'),
(53, '8th Semester', 'EC8070', 'Computer Engineering Research Project III', 'Dr. (Mrs.) Pratheeba Jeyananthan');

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
(11, 'Yasitha', 'herath', 'Lecturer', '6th Semester', '', 'yasithaherath@gmail.com', 'Yasitha@1234', 'No more details', '', '', '', '', '', '', '', '', '', '', ''),
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
(78, 'Dinesh', 'Wickramasinghe', 'Student', '4th Semester', '2022/E/020', '2022e020@eng.jfn.ac.lk', '$2a$10$hashed50', 'General engineering', '', 'Computer and Data Networks (EC4060)', 'Data Structures and Algorithms (EC4070)', 'Discrete Mathematics (MC4010)', '', '', '', '', '', '', ''),
(79, 'Pramuda', 'Kulathubga', 'Student', '6th Semester', '2021/E/078', '2021e078@eng.jfn.ac.lk', 'Pramuda@123', 'Add about you', 'https://i.ibb.co/zWkKH8mp/pic-edited-Copy.png', 'Computer Engineering Research Project I  (EC6070)', 'Embedded Systems Design (EC6020)', 'Robotics and Automation (EC6090)', 'Software Engineering (EC6060)', 'Machine Learning (EC9630)', '', '', '', '', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attendance`
--
ALTER TABLE `attendance`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `batchdetails`
--
ALTER TABLE `batchdetails`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cash_requests`
--
ALTER TABLE `cash_requests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `coursefeedbackrate`
--
ALTER TABLE `coursefeedbackrate`
  ADD PRIMARY KEY (`feedback_number_c`);

--
-- Indexes for table `coursefeedbackrate_avg`
--
ALTER TABLE `coursefeedbackrate_avg`
  ADD PRIMARY KEY (`course_name`);

--
-- Indexes for table `feedbackquestions`
--
ALTER TABLE `feedbackquestions`
  ADD PRIMARY KEY (`QID`);

--
-- Indexes for table `files`
--
ALTER TABLE `files`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lecturerfeedbackrate`
--
ALTER TABLE `lecturerfeedbackrate`
  ADD PRIMARY KEY (`feedback_number_l`);

--
-- Indexes for table `lecturerfeedbackrate_avg`
--
ALTER TABLE `lecturerfeedbackrate_avg`
  ADD PRIMARY KEY (`lecturer_name`);

--
-- Indexes for table `lecturers`
--
ALTER TABLE `lecturers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `nonacademicdetails`
--
ALTER TABLE `nonacademicdetails`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notice`
--
ALTER TABLE `notice`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subjects`
--
ALTER TABLE `subjects`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attendance`
--
ALTER TABLE `attendance`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=177;

--
-- AUTO_INCREMENT for table `batchdetails`
--
ALTER TABLE `batchdetails`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `cash_requests`
--
ALTER TABLE `cash_requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `coursefeedbackrate`
--
ALTER TABLE `coursefeedbackrate`
  MODIFY `feedback_number_c` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `feedbackquestions`
--
ALTER TABLE `feedbackquestions`
  MODIFY `QID` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `files`
--
ALTER TABLE `files`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `lecturerfeedbackrate`
--
ALTER TABLE `lecturerfeedbackrate`
  MODIFY `feedback_number_l` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `lecturers`
--
ALTER TABLE `lecturers`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `nonacademicdetails`
--
ALTER TABLE `nonacademicdetails`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `notice`
--
ALTER TABLE `notice`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `subjects`
--
ALTER TABLE `subjects`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
