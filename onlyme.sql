-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: onlyme
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` varchar(20) NOT NULL,
  `message_id` varchar(20) NOT NULL,
  `author` tinyint(1) DEFAULT NULL,
  `message` text,
  `postedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_user_message` (`message_id`),
  CONSTRAINT `fk_user_message` FOREIGN KEY (`message_id`) REFERENCES `messages` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES ('cmd-c810m5x0d4f1l8r8','msg-q8v5b7a0e6s5h1p5',1,'komen baru','2022-10-03 15:32:09'),('cmd-c810m5x0d4f1x3m9','msg-q8v5b7a0e6s5h1p5',1,'komen baru lagi','2022-10-03 15:32:47'),('cmt-a2q3m9c6d3w0g1e4','msg-t2f0i5r8g5u6b0r8',1,'buset dah','2022-10-03 15:08:18'),('cmt-d3n9g9z4r3h7z9g7','msg-y2a3c9h0i2e0m6s1',1,'❤❤❤','2022-10-08 15:17:07'),('cmt-e3s6v8v2h9s0m5e2','msg-f2a5e6j5i6b5r5y0',0,'bang','2022-10-03 16:49:45'),('cmt-e6v8d1g2p2m9q1j4','msg-q8v5b7a0e6s5h1p5',0,'gpp','2022-10-03 15:26:28'),('cmt-j5n0k7v8d6q2v6g0','msg-q8v5b7a0e6s5h1p5',0,'eh buset','2022-10-03 15:41:45'),('cmt-m4b8j1g8s7u2c8j8','msg-y2a3c9h0i2e0m6s1',1,'nothing much','2022-10-08 15:09:48'),('cmt-n7v4w7l7e2t2r6k3','msg-p0c0w0e6t2d3d4m4',1,'gk','2022-10-08 08:25:35'),('cmt-o5k8y9i1s6e4q7p2','msg-y2a3c9h0i2e0m6s1',1,'😘😘😘😘 ','2022-10-08 15:43:27'),('cmt-o9i0c6p2b2g0q3g0','msg-p0c0w0e6t2d3d4m4',1,'kagak kocak','2022-10-03 15:07:44'),('cmt-s8q3t6t3x9k6s8z3','msg-o7o3d4b0p6t8v0c1',1,'owkoakakwoawkka','2022-09-30 16:20:05'),('cmt-t4f3f9i1a3l1q7f2','msg-q8v5b7a0e6s5h1p5',0,'karen anjay','2022-10-04 05:42:30'),('cmt-t5k1o4b4s4t1a7g9','msg-p0c0w0e6t2d3d4m4',0,'anjir','2022-10-03 15:13:23'),('cmt-u0v6t1j8o0o4l7c8','msg-q8v5b7a0e6s5h1p5',1,'apeh','2022-10-03 15:07:59'),('cmt-w9y7k4o1p4s3d7m4','msg-o7o3d4b0p6t8v0c1',1,'afah iyah ?','2022-09-30 16:20:54'),('cmt-y7m5p0b2f2l0p3f1','msg-q8v5b7a0e6s5h1p5',0,'iyah','2022-10-03 15:27:34'),('cmt-y9l2j9o8u3k8x6g3','msg-y2a3c9h0i2e0m6s1',1,'💦 basah','2022-10-08 15:17:18'),('cmt-z5z2c1f3h6j8q8r1','msg-q8v5b7a0e6s5h1p5',1,'okeh','2022-10-03 15:26:46');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `id` varchar(20) NOT NULL,
  `user_id` varchar(13) NOT NULL,
  `sender` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `message` text,
  `postedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_user` (`user_id`),
  CONSTRAINT `fk_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES ('msg-f2a5e6j5i6b5r5y0','sc-z9p6g8d5s3','Anonymous','gg gaming gaes','2022-09-30 15:46:11'),('msg-i9l5y5p8t3z2h7j6','sc-z9p6g8d5s3','macbook','macbook','2022-09-30 15:47:38'),('msg-j9e7h0p0g7s0x5i8','sc-y7y7c8i3m9','Anonymous','halo bang','2022-09-30 16:12:30'),('msg-o6f6n1j1x3r0o0h1','sc-z9p6g8d5s3','pelangi','halo bangggggg','2022-09-30 16:00:31'),('msg-o7o3d4b0p6t8v0c1','sc-z9p6g8d5s3','yahaahhah','bang bang','2022-09-30 16:14:52'),('msg-p0c0w0e6t2d3d4m4','sc-n5s5b6r3j4','anjir','woy karen kaga keluar loe ?','2022-10-03 14:11:19'),('msg-q8v5b7a0e6s5h1p5','sc-n5s5b6r3j4','KarenLover','woy karen','2022-10-03 09:33:30'),('msg-t2f0i5r8g5u6b0r8','sc-n5s5b6r3j4','Anonymous','*Menggeram kepada karen','2022-10-03 13:39:11'),('msg-y2a3c9h0i2e0m6s1','sc-n5s5b6r3j4','karen lover','yow karen whatsup baybeh ????<br/>','2022-10-08 15:04:23'),('msg-z4q4c3u6f3x5q3f0','sc-z9p6g8d5s3','yahahah kocak  bat','woy bang','2022-09-30 16:14:21');
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` varchar(13) NOT NULL,
  `verified` tinyint NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` text NOT NULL,
  `username` varchar(30) NOT NULL,
  `fullname` varchar(30) DEFAULT NULL,
  `bio` text,
  `avatar` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_username` (`username`),
  UNIQUE KEY `unique_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('sc-c3s8x0k2f7',0,'amburadul@gmail.com','YW1idXJhZHVsZ2FtaW5n','amburadul',NULL,'bio baru gaes',NULL),('sc-n5s5b6r3j4',1,NULL,'a2FyZW4=','karenbae','Karen Samsudin Jadab','Kocak gaming nih orang gaes 💦<br/>Jadi gimana ? nih dengerin lagu gw<br/><a href=\"https://soundcloud.com/d4vddd/take-me-to-the-sun\" class=\"text-blue-400 font-semibold hover:underline\" target=\"_blank\">https://soundcloud.com/d4vddd/take-me-to-the-sun</a><br/>',NULL),('sc-n7i9p8p8i8',0,NULL,'YmVqaXI=','mengkocak',NULL,NULL,NULL),('sc-y7y7c8i3m9',0,'johnny@gmail.com','am9obm55','johnny','Johnny de joni',NULL,NULL),('sc-z9p6g8d5s3',0,'gnwncpta@gmail.com','ZGVtbw==','gunawancipta','Gunawan Cipta','\"KOCAK GAMING\nKOCAK\"',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-08 22:55:46
