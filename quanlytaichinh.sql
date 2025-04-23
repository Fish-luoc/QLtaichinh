-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: quanlytaichinh
-- ------------------------------------------------------
-- Server version	9.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `baocaongay`
--

DROP TABLE IF EXISTS `baocaongay`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `baocaongay` (
  `MaBaoCaoNgay` int NOT NULL AUTO_INCREMENT,
  `MaNguoiDung` int NOT NULL,
  `Ngay` date NOT NULL,
  `TongThu` decimal(10,2) NOT NULL,
  `TongChi` decimal(10,2) NOT NULL,
  `NgayTao` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`MaBaoCaoNgay`),
  KEY `MaNguoiDung` (`MaNguoiDung`),
  CONSTRAINT `baocaongay_ibfk_1` FOREIGN KEY (`MaNguoiDung`) REFERENCES `nguoidung` (`MaNguoiDung`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `baocaongay`
--

LOCK TABLES `baocaongay` WRITE;
/*!40000 ALTER TABLE `baocaongay` DISABLE KEYS */;
INSERT INTO `baocaongay` VALUES (1,2,'2025-04-14',4500000.00,0.00,'2025-04-20 12:53:19'),(2,2,'2025-04-15',0.00,200000.00,'2025-04-20 12:53:19'),(3,2,'2025-04-16',0.00,50000.00,'2025-04-20 12:53:19'),(4,2,'2025-04-17',0.00,150000.00,'2025-04-20 12:53:19'),(5,2,'2025-04-18',0.00,250000.00,'2025-04-20 12:53:19'),(6,2,'2025-04-19',0.00,100000.00,'2025-04-20 12:53:19'),(7,2,'2025-04-20',0.00,300000.00,'2025-04-20 12:53:19'),(8,3,'2025-04-14',5000000.00,0.00,'2025-04-20 12:53:19'),(9,3,'2025-04-15',0.00,150000.00,'2025-04-20 12:53:19'),(10,3,'2025-04-16',0.00,250000.00,'2025-04-20 12:53:19'),(11,3,'2025-04-17',0.00,80000.00,'2025-04-20 12:53:19'),(12,3,'2025-04-18',0.00,50000.00,'2025-04-20 12:53:19'),(13,3,'2025-04-19',0.00,300000.00,'2025-04-20 12:53:19'),(14,3,'2025-04-20',0.00,200000.00,'2025-04-20 12:53:19');
/*!40000 ALTER TABLE `baocaongay` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `baocaothang`
--

DROP TABLE IF EXISTS `baocaothang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `baocaothang` (
  `MaBaoCaoThang` int NOT NULL AUTO_INCREMENT,
  `MaNguoiDung` int NOT NULL,
  `Thang` int NOT NULL,
  `Nam` int NOT NULL,
  `TongThu` decimal(10,2) NOT NULL,
  `TongChi` decimal(10,2) NOT NULL,
  `NgayTao` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`MaBaoCaoThang`),
  KEY `MaNguoiDung` (`MaNguoiDung`),
  CONSTRAINT `baocaothang_ibfk_1` FOREIGN KEY (`MaNguoiDung`) REFERENCES `nguoidung` (`MaNguoiDung`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `baocaothang`
--

LOCK TABLES `baocaothang` WRITE;
/*!40000 ALTER TABLE `baocaothang` DISABLE KEYS */;
INSERT INTO `baocaothang` VALUES (1,2,4,2025,4500000.00,1050000.00,'2025-04-20 12:53:24'),(2,3,4,2025,5000000.00,1030000.00,'2025-04-20 12:53:24');
/*!40000 ALTER TABLE `baocaothang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `giaodich`
--

DROP TABLE IF EXISTS `giaodich`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `giaodich` (
  `MaGiaoDich` int NOT NULL AUTO_INCREMENT,
  `MaNguoiDung` int NOT NULL,
  `SoTien` decimal(10,2) NOT NULL,
  `DanhMuc` varchar(50) NOT NULL,
  `Loai` enum('Thu','Chi') NOT NULL,
  `GhiChu` text,
  `NgayGiaoDich` date NOT NULL,
  `NgayTao` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`MaGiaoDich`),
  KEY `MaNguoiDung` (`MaNguoiDung`),
  CONSTRAINT `giaodich_ibfk_1` FOREIGN KEY (`MaNguoiDung`) REFERENCES `nguoidung` (`MaNguoiDung`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `giaodich`
--

LOCK TABLES `giaodich` WRITE;
/*!40000 ALTER TABLE `giaodich` DISABLE KEYS */;
INSERT INTO `giaodich` VALUES (8,2,4500000.00,'Lương','Thu','Nhận lương tháng 4','2025-04-14','2025-04-20 12:34:45'),(9,2,200000.00,'Mua sắm','Chi','Mua mỹ phẩm','2025-04-15','2025-04-20 12:34:45'),(10,2,50000.00,'Cà phê','Chi','Cafe với bạn','2025-04-16','2025-04-20 12:34:45'),(11,2,150000.00,'Giải trí','Chi','Mua sách','2025-04-17','2025-04-20 12:34:45'),(12,2,250000.00,'Ăn uống','Chi','Ăn nhà hàng','2025-04-18','2025-04-20 12:34:45'),(13,2,100000.00,'Giao thông','Chi','Đi lại','2025-04-19','2025-04-20 12:34:45'),(14,2,300000.00,'Thể thao','Chi','Đăng ký phòng gym','2025-04-19','2025-04-20 12:34:45'),(15,3,5000000.00,'Lương','Thu','Nhận lương tháng 4','2025-04-14','2025-04-20 12:48:49'),(16,3,150000.00,'Ăn uống','Chi','Ăn trưa tại quán','2025-04-15','2025-04-20 12:48:49'),(17,3,250000.00,'Mua sắm','Chi','Mua quần áo','2025-04-16','2025-04-20 12:48:49'),(18,3,80000.00,'Giải trí','Chi','Xem phim','2025-04-17','2025-04-20 12:48:49'),(19,3,50000.00,'Cà phê','Chi','Hẹn bạn bè','2025-04-18','2025-04-20 12:48:49'),(20,3,300000.00,'Giao thông','Chi','Đổ xăng xe','2025-04-19','2025-04-20 12:48:49'),(21,3,200000.00,'Ăn uống','Chi','Đi ăn tối với gia đình','2025-04-20','2025-04-20 12:48:49'),(22,6,10000000.00,'Lương','Thu','Tiền lương tháng 4','2025-04-23','2025-04-23 09:45:47'),(23,6,100000.00,'ăn uống','Chi','Mua thức ăn cả ngày\n\n\n','2025-04-23','2025-04-23 09:46:44');
/*!40000 ALTER TABLE `giaodich` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `lichsugiaodich`
--

DROP TABLE IF EXISTS `lichsugiaodich`;
/*!50001 DROP VIEW IF EXISTS `lichsugiaodich`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `lichsugiaodich` AS SELECT 
 1 AS `MaGiaoDich`,
 1 AS `TenNguoiDung`,
 1 AS `SoTien`,
 1 AS `DanhMuc`,
 1 AS `Loai`,
 1 AS `GhiChu`,
 1 AS `NgayGiaoDich`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `lichsugiaodichtoanbo`
--

DROP TABLE IF EXISTS `lichsugiaodichtoanbo`;
/*!50001 DROP VIEW IF EXISTS `lichsugiaodichtoanbo`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `lichsugiaodichtoanbo` AS SELECT 
 1 AS `MaGiaoDich`,
 1 AS `TenNguoiDung`,
 1 AS `SoTien`,
 1 AS `DanhMuc`,
 1 AS `Loai`,
 1 AS `GhiChu`,
 1 AS `NgayGiaoDich`,
 1 AS `NgayTao`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `nguoidung`
--

DROP TABLE IF EXISTS `nguoidung`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nguoidung` (
  `MaNguoiDung` int NOT NULL AUTO_INCREMENT,
  `TenNguoiDung` varchar(50) NOT NULL,
  `MatKhau` varchar(255) NOT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `NgayTao` datetime DEFAULT CURRENT_TIMESTAMP,
  `Role` enum('user','admin') DEFAULT 'user',
  PRIMARY KEY (`MaNguoiDung`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nguoidung`
--

LOCK TABLES `nguoidung` WRITE;
/*!40000 ALTER TABLE `nguoidung` DISABLE KEYS */;
INSERT INTO `nguoidung` VALUES (1,'Admin','1234','admin@gmail.com','2025-04-20 12:28:36','admin'),(2,'hoang','1234','hoang@gmail.com','2025-04-20 12:34:27','user'),(3,'Lan','1234','lan@gmail.com','2025-04-20 12:34:27','user'),(4,'ha12','1234','ha@gmail.com','2025-04-20 14:15:46','user'),(5,'ha1234','12345','123ha@gmail.com','2025-04-22 10:21:12','user'),(6,'user2','$2a$10$fftzangaQk3W/2OBIMtJzOc5pmCXwUX2EL.3BsBRFGrOJVvschzXi','1234@gmail.com','2025-04-23 09:43:51','user');
/*!40000 ALTER TABLE `nguoidung` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `tonghopthuchi`
--

DROP TABLE IF EXISTS `tonghopthuchi`;
/*!50001 DROP VIEW IF EXISTS `tonghopthuchi`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `tonghopthuchi` AS SELECT 
 1 AS `MaNguoiDung`,
 1 AS `TenNguoiDung`,
 1 AS `TongThu`,
 1 AS `TongChi`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `lichsugiaodich`
--

/*!50001 DROP VIEW IF EXISTS `lichsugiaodich`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `lichsugiaodich` AS select `giaodich`.`MaGiaoDich` AS `MaGiaoDich`,`nguoidung`.`TenNguoiDung` AS `TenNguoiDung`,`giaodich`.`SoTien` AS `SoTien`,`giaodich`.`DanhMuc` AS `DanhMuc`,`giaodich`.`Loai` AS `Loai`,`giaodich`.`GhiChu` AS `GhiChu`,`giaodich`.`NgayGiaoDich` AS `NgayGiaoDich` from (`giaodich` join `nguoidung` on((`giaodich`.`MaNguoiDung` = `nguoidung`.`MaNguoiDung`))) order by `giaodich`.`NgayGiaoDich` desc */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `lichsugiaodichtoanbo`
--

/*!50001 DROP VIEW IF EXISTS `lichsugiaodichtoanbo`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `lichsugiaodichtoanbo` AS select `giaodich`.`MaGiaoDich` AS `MaGiaoDich`,`nguoidung`.`TenNguoiDung` AS `TenNguoiDung`,`giaodich`.`SoTien` AS `SoTien`,`giaodich`.`DanhMuc` AS `DanhMuc`,`giaodich`.`Loai` AS `Loai`,`giaodich`.`GhiChu` AS `GhiChu`,`giaodich`.`NgayGiaoDich` AS `NgayGiaoDich`,`giaodich`.`NgayTao` AS `NgayTao` from (`giaodich` join `nguoidung` on((`giaodich`.`MaNguoiDung` = `nguoidung`.`MaNguoiDung`))) order by `giaodich`.`NgayGiaoDich` desc */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `tonghopthuchi`
--

/*!50001 DROP VIEW IF EXISTS `tonghopthuchi`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `tonghopthuchi` AS select `nguoidung`.`MaNguoiDung` AS `MaNguoiDung`,`nguoidung`.`TenNguoiDung` AS `TenNguoiDung`,sum((case when (`giaodich`.`Loai` = 'Thu') then `giaodich`.`SoTien` else 0 end)) AS `TongThu`,sum((case when (`giaodich`.`Loai` = 'Chi') then `giaodich`.`SoTien` else 0 end)) AS `TongChi` from (`nguoidung` left join `giaodich` on((`nguoidung`.`MaNguoiDung` = `giaodich`.`MaNguoiDung`))) group by `nguoidung`.`MaNguoiDung`,`nguoidung`.`TenNguoiDung` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-23 12:01:22
