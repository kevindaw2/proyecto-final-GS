-- MariaDB dump 10.19  Distrib 10.4.24-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: torneos
-- ------------------------------------------------------
-- Server version	10.4.24-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `chats`
--

DROP TABLE IF EXISTS `chats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chats` (
  `id_chat` int(11) NOT NULL AUTO_INCREMENT,
  `contenido` text NOT NULL,
  `fecha_envio` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `id_emisor` int(11) NOT NULL,
  `id_receptor` int(11) NOT NULL,
  PRIMARY KEY (`id_chat`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chats`
--

LOCK TABLES `chats` WRITE;
/*!40000 ALTER TABLE `chats` DISABLE KEYS */;
/*!40000 ALTER TABLE `chats` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipos`
--

DROP TABLE IF EXISTS `equipos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `equipos` (
  `id_equipo` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` int(11) NOT NULL,
  PRIMARY KEY (`id_equipo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipos`
--

LOCK TABLES `equipos` WRITE;
/*!40000 ALTER TABLE `equipos` DISABLE KEYS */;
/*!40000 ALTER TABLE `equipos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jugadores`
--

DROP TABLE IF EXISTS `jugadores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jugadores` (
  `id_jugador` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `alias` varchar(100) NOT NULL,
  `rol` varchar(100) NOT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `id_equipo` int(11) NOT NULL,
  `victorias` int(11) NOT NULL,
  `derrotas` int(11) NOT NULL,
  PRIMARY KEY (`id_jugador`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jugadores`
--

LOCK TABLES `jugadores` WRITE;
/*!40000 ALTER TABLE `jugadores` DISABLE KEYS */;
/*!40000 ALTER TABLE `jugadores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('F9TZjMWIWscAPAZpNFTRg95nPE5ZKZ6b',1654179098,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{\"error\":[\"Missing credentials\"],\"succes\":[\"Bienvenidokevin@lobby.com\",\"Bienvenidokevin2@nwl2.com\",\"Bienvenidokevin2@nwl2.com\",\"Bienvenidokevin2@nwl2.com\",\"Bienvenidokevin2@nwl2.com\"]},\"passport\":{\"user\":10}}'),('bbzIjxDmMWFl9YnfOkAzMj29Bv2wh_AT',1654103807,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{\"succes\":[\"Bienvenidokevin@lobby.com\",\"Bienvenidokevin@lobby.com\",\"Bienvenidokevin@lobby.com\"]},\"passport\":{}}'),('huugYdK0MhVpOZD7smIP61PAI8HlqdxZ',1654159771,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{\"succes\":[\"Bienvenidokevin@lobby.com\",\"Bienvenidokevin@lobby.com\",\"Bienvenidokevin@lobby.com\"]},\"passport\":{}}'),('ouzdgRdGfEi8_fNSKJ2k1XrbJXY-eah0',1654117365,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{\"succes\":[\"Bienvenidokevin@lobby.com\"]},\"passport\":{}}');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `torneos`
--

DROP TABLE IF EXISTS `torneos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `torneos` (
  `id_torneo` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `numero_torneo` int(11) NOT NULL,
  `fecha_crecion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `fecha_comienzo` date NOT NULL,
  `descripcion` varchar(500) NOT NULL,
  `juego` varchar(200) NOT NULL,
  `participantes` int(11) NOT NULL,
  `estado` tinyint(4) NOT NULL,
  `registro` tinyint(4) NOT NULL,
  `id_jugador` int(11) NOT NULL,
  `id_equipo` int(11) NOT NULL,
  `reglas` varchar(500) NOT NULL,
  PRIMARY KEY (`id_torneo`),
  KEY `id_jugador` (`id_jugador`),
  KEY `id_equipo` (`id_equipo`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `torneos`
--

LOCK TABLES `torneos` WRITE;
/*!40000 ALTER TABLE `torneos` DISABLE KEYS */;
INSERT INTO `torneos` VALUES (2,'Clash Royale',1,'2022-06-01 12:35:43','2022-06-03','1 vs 1','Clash Royale',8,2,2,8,0,'Torneo por eliminatorias'),(7,'Torneo X',0,'2022-06-01 13:33:26','2022-06-22','Torneo X para juego X','MK',10,0,0,1,0,'2 vs 2'),(8,'Torneo XIII',1,'2022-06-01 13:33:15','2022-06-15','TORNEO XIII para juego X','MK',20,0,0,1,0,'2 vs 2'),(9,'Torneo X',0,'2022-06-01 13:33:04','2022-06-29','Torneo para jugar a X juego','Fortnite',15,0,0,1,0,'2 vs 2 no competitivo'),(10,'Torneo VII',0,'2022-06-01 13:32:50','2022-06-23','torneo VII para jugar Fornite entre amigos','Fortnite',75,0,0,1,0,'2 vs 2 y Squads'),(11,'Torneo X',0,'2022-06-01 13:32:41','2022-07-07','Juego X para jugar xd ','Fortnite',100,0,0,1,0,'2 vs 2'),(12,'Torneo V',0,'2022-06-01 13:32:30','2022-06-25','Torneo para jugar a LoL','LoL',10,0,0,1,0,'5 vs 5 competitivo'),(13,'Torneo XVI',0,'2022-06-01 13:32:22','2022-07-07','Juego XIII para jugar xd ','Fortnite',50,0,0,1,0,'2 vs 2'),(14,'Torneo XXX',0,'2022-06-01 13:32:12','2022-07-07','Juego XXX para jugar CoD','CoD',30,0,0,1,0,'3 vs 3'),(15,'Torneo VII',0,'2022-06-01 13:32:04','2022-07-07','Juego XXX para jugar CoD','CoD',10,0,0,1,0,'3 vs 3'),(16,'Torneo XIVM',0,'2022-06-01 13:31:55','2022-07-07','Juego XXX para jugar CoD','CoD',18,0,0,1,0,'3 vs 3'),(17,'Clash Royale',0,'2022-06-01 13:31:43','2022-06-16','2 vs 2 amistoso\r\n                            ','Clash Royale',10,0,0,1,0,'Torneo por eliminatorias'),(18,'Clash Royale',0,'2022-06-01 13:31:33','2022-06-21','2 vs 2??\r\n                            ','Clash Royale',20,0,0,1,0,'Torneo por eliminatorias');
/*!40000 ALTER TABLE `torneos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `alias` varchar(100) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `estado` tinyint(4) NOT NULL,
  `foto` text NOT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `fecha_nacimiento` date NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `id_torneo` int(11) NOT NULL,
  PRIMARY KEY (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'','','','guinakevin@gmail.com','$2a$10$6/h1MB6tUKGR29JY3WGcZe.RwlCNKiTl6YoRSGRrvWcNrdzh68mDW',0,'','2022-05-23 18:39:58','0000-00-00','',0),(2,'','','','kevinguina@gmail.es','$2a$10$ecDTj3adGOy8bMb3Xo9WRe9bd.LUYI42x9UnwQm3fxd4VkUO6JVmq',0,'','2022-05-28 09:06:03','0000-00-00','',0),(3,'','','','kevin@lobby.com','$2a$10$7OkpWVq0UwdFj8LQDaIxeeUDJ9H9NaoCUEwKETmbwc6nJtLdVbNBS',0,'','2022-05-28 09:08:38','0000-00-00','',0),(4,'','','','kevinlobby@backto.com','$2a$10$HZeC9Tp6/t/HXJmnJqnLZOFHqh4w3oDpnoaQRtSGd.879JYqezUoa',0,'','2022-05-28 10:08:57','0000-00-00','',0),(5,'','','','kevinlobby@backto2.com','$2a$10$8V6Oy.TbOwEIOEvJoXalGeDA3ev4eGauby7bSoNm8Q0FCKozItYUm',0,'','2022-05-28 10:10:54','0000-00-00','',0),(6,'','','','kevin@nwl.com','$2a$10$8NxDnO6tevtTVUzTaqa3bOzQMdHK2kCsMFQwYmlM7ZIh5nWJnHK46',0,'','2022-06-01 09:22:51','0000-00-00','',0),(7,'','','','kevin2@nwl.com','$2a$10$vZ.wE4.gOwivwGbglMm19O.ccJWu0nwxExaLMbsivjmtqx9nrfwRS',0,'','2022-06-01 09:49:30','0000-00-00','',0),(8,'','','','kevin2@nwl2.com','$2a$10$Kf.VyLeXK6M2JIjgSnBGKevx6qQ5pxZ68RcntfAIYhUXgIQhR30Ke',0,'','2022-06-01 09:57:05','0000-00-00','',0),(9,'','','','kguiandaw2@lamerce.com','[object Promise]',0,'','2022-06-01 13:52:50','0000-00-00','',0),(10,'','','','kevin@btl.com','[object Promise]',0,'','2022-06-01 14:11:37','0000-00-00','',0);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-01 16:17:25
