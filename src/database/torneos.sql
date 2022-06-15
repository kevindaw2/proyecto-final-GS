-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-06-2022 a las 12:08:31
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `torneos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `chats`
--

CREATE TABLE `chats` (
  `id_chat` int(11) NOT NULL,
  `contenido` text NOT NULL,
  `fecha_envio` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `id_emisor` int(11) NOT NULL,
  `id_receptor` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `equipos`
--

CREATE TABLE `equipos` (
  `id_equipo` int(11) NOT NULL,
  `nombre` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `jugadores`
--

CREATE TABLE `jugadores` (
  `id_jugador` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `alias` varchar(100) NOT NULL,
  `rol` varchar(100) NOT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `id_equipo` int(11) NOT NULL,
  `victorias` int(11) NOT NULL,
  `derrotas` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('Cb1WDN7yLDyJd_sHlgqbnI3Bm-Qv_PDC', 1655373532, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":30}}'),
('Isi49ZjJ3HAs_om35aa-Euh80yKdFsFu', 1655373917, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":29},\"flash\":{\"error\":[\"Usuario no encontrado\"],\"succes\":[\"Bienvenidotest@test.com\"]}}'),
('fAOxUHTr3glDJj283ST9YMMML97BWSfa', 1655374094, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{\"succes\":[\"Bienvenidokevin@lobby.com\",\"Bienvenidokevin@lobby.com\",\"Bienvenidoalejandro@torres.com\",\"Bienvenidoroberto@lopez.com\",\"Bienvenidofernando@torres.com\",\"Bienvenidofernando@torres.com\",\"Bienvenidolaura@campos.com\",\"Bienvenidosonia@lobo.com\",\"Bienvenidoalejandro@torres.com\",\"Bienvenidoroberto@lopez.com\"],\"error\":[\"Usuario no encontrado\",\"Missing credentials\",\"Contraseña incorrecta\"]},\"passport\":{}}'),
('oU0MWYlMTOQhdEfzOl8bIrLFZtxK6Aer', 1655373807, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":31}}');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `torneos`
--

CREATE TABLE `torneos` (
  `id_torneo` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `numero_torneo` int(11) NOT NULL,
  `fecha_crecion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `fecha_comienzo` date NOT NULL,
  `descripcion` varchar(5000) NOT NULL,
  `juego` varchar(200) NOT NULL,
  `participantes` int(11) NOT NULL,
  `estado` tinyint(4) NOT NULL,
  `registro` tinyint(4) NOT NULL,
  `id_jugador` int(11) NOT NULL,
  `id_equipo` int(11) NOT NULL,
  `reglas` varchar(5000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `torneos`
--

INSERT INTO `torneos` (`id_torneo`, `nombre`, `numero_torneo`, `fecha_crecion`, `fecha_comienzo`, `descripcion`, `juego`, `participantes`, `estado`, `registro`, `id_jugador`, `id_equipo`, `reglas`) VALUES
(19, 'Torneo de prueba', 0, '2022-06-01 14:21:04', '2022-06-01', 'Nullam vulputate diam quis nibh dignissim suscipit. Phasellus sit amet pellentesque augue. Sed orci velit, sagittis a vehicula sed, lobortis id nibh. Sed fermentum augue et imperdiet pellentesque. Curabitur feugiat blandit ex, id scelerisque magna lobortis tincidunt. Donec nec risus lacus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras bibendum lacinia posuere. Proin nec rutrum justo, imperdiet venenatis mi. Ut nibh magna, elementum non velit nec, bibendum accumsan lectus. Pr', 'Rainbow Six Siedge', 64, 0, 0, 1, 0, ' Quisque semper luctus nisl vitae ullamcorper. Proin vel commodo lacus. Morbi efficitur neque quis leo imperdiet dictum. In id convallis sapien. Nulla ut metus magna. Curabitur rhoncus, mauris eget pulvinar volutpat, nunc felis sagittis ex, sit amet convallis massa lacus quis velit. In laoreet ex id massa dignissim, sed sollicitudin turpis volutpat. Mauris vel nunc tincidunt, elementum augue eu, mattis sapien. Praesent tincidunt nulla quis justo semper pharetra. Sed euismod ultrices leo, at volu'),
(25, 'Coliseo de Campeones', 0, '2022-06-15 09:14:11', '2022-06-19', '¡Este es un torneo para los mas valientes! Todos los jugadores de Mortal Kombat que busquen competición de verdad son mas que bienvenidos aquí. El torneo comienza este próximo domingo, ¡así que no esperes para apuntarte!', 'Mortal Kombat', 64, 0, 0, 1, 0, 'El torneo será de única eliminación. Los jugadores tendrán que unirse a una partida in-game configurada con los parámetros por defecto, y el primero que gane (en rondas de al mejor de cinco) podrá reportar el resultado en esta página web. Este torneo será jugado de manera online, si un jugador presenta una conexion inestable, los jugadores tienen derecho a reportar el problema a los organizadores para que estos den una decisión final, que puede llegar a resultar la descalificación del causante.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
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
  `id_torneo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `alias`, `nombre`, `apellido`, `correo`, `password`, `estado`, `foto`, `fecha_creacion`, `fecha_nacimiento`, `telefono`, `id_torneo`) VALUES
(21, 'Rea', 'Adria', 'Marquez', 'amarquez.daw2n@lamerce.com', '$2a$10$IBWVs.NOnb/NrhxgBH.t7.yDgVNZPlEzOfAA/505aLoe51ENpuULO', 0, '', '2022-06-14 21:51:07', '0000-00-00', '111222333', 0),
(22, 'Alejandro', 'Alejandro', 'Torres', 'alejandro@torres.com', '$2a$10$RbN1rRgvYS74GWdc/KY2XuB2CK8eJhUtK2ENz6JcEqG4fKQL.PpHS', 0, '', '2022-06-15 08:35:19', '0000-00-00', '111222333', 0),
(23, 'Roberto', 'Roberto', 'López', 'roberto@lopez.com', '$2a$10$qHZ3pd/NGm7evi.5UVrJduf2biM.vAncsWWVpX4QtqzWnEm74VMzC', 0, '', '2022-06-15 08:37:58', '0000-00-00', '111222333', 0),
(24, 'Fernando', 'Fernando', 'Trigo', 'fernando@torres.com', '$2a$10$wtrSKYk0V6gtZ9SYSV6G3enHzHcPYW8Xba1LUVb2Kpk6jcM3/lSlK', 0, '', '2022-06-15 09:08:03', '0000-00-00', '111222333', 0),
(25, 'Laura', 'Laura', 'Campos', 'laura@campos.com', '$2a$10$dwcTfzFaNkslWO3cEjBRpOXyySIUmMzD//2ButoZEhczENa/4z9JK', 0, '', '2022-06-15 09:09:28', '0000-00-00', '123123123', 0),
(26, 'Sónia', 'Sónia', 'Lobo', 'sonia@lobo.com', '$2a$10$1cjwViY7MdbWf1.COzgY/uDudGQ1crL7igOgVsW7f4UfjWYtwUk66', 0, '', '2022-06-15 09:15:47', '0000-00-00', '123123123', 0),
(27, 'Frikinin', 'Enric', 'Teten', 'frik@in.in', '$2a$10$H6bLMwkg/Vek90FRRXZCu.Ez.Eagl0QYO3m4oYf2OmUEGyCn8pO02', 0, '', '2022-06-15 09:33:22', '0000-00-00', '111222333', 0),
(28, 'Admin', 'Admin', 'Admin', 'admin@ad.min', '$2a$10$7R9QqzmOE2zoT9Vy/xZVd.GnycJyJNQTtdndoNRMF.mm833EKflM6', 0, '', '2022-06-15 09:51:29', '0000-00-00', '123123123', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios_torneo`
--

CREATE TABLE `usuarios_torneo` (
  `id_torneo` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios_torneo`
--

INSERT INTO `usuarios_torneo` (`id_torneo`, `id_usuario`) VALUES
(19, 21),
(21, 22),
(19, 22),
(9, 23),
(19, 23),
(19, 24),
(25, 25),
(19, 25),
(25, 26),
(19, 26),
(25, 22),
(25, 23),
(25, 24),
(25, 27),
(26, 29),
(26, 28),
(26, 24),
(26, 30),
(26, 25),
(26, 26),
(27, 29),
(26, 22),
(26, 23),
(26, 31);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `chats`
--
ALTER TABLE `chats`
  ADD PRIMARY KEY (`id_chat`);

--
-- Indices de la tabla `equipos`
--
ALTER TABLE `equipos`
  ADD PRIMARY KEY (`id_equipo`);

--
-- Indices de la tabla `jugadores`
--
ALTER TABLE `jugadores`
  ADD PRIMARY KEY (`id_jugador`);

--
-- Indices de la tabla `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indices de la tabla `torneos`
--
ALTER TABLE `torneos`
  ADD PRIMARY KEY (`id_torneo`),
  ADD KEY `id_jugador` (`id_jugador`),
  ADD KEY `id_equipo` (`id_equipo`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`);

--
-- Indices de la tabla `usuarios_torneo`
--
ALTER TABLE `usuarios_torneo`
  ADD KEY `id_torneo` (`id_torneo`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `chats`
--
ALTER TABLE `chats`
  MODIFY `id_chat` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `equipos`
--
ALTER TABLE `equipos`
  MODIFY `id_equipo` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `jugadores`
--
ALTER TABLE `jugadores`
  MODIFY `id_jugador` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `torneos`
--
ALTER TABLE `torneos`
  MODIFY `id_torneo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `usuarios_torneo`
--
ALTER TABLE `usuarios_torneo`
  ADD CONSTRAINT `usuarios_torneo_ibfk_1` FOREIGN KEY (`id_torneo`) REFERENCES `torneos` (`id_torneo`),
  ADD CONSTRAINT `usuarios_torneo_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
