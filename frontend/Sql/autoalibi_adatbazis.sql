-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Ápr 09. 19:55
-- Kiszolgáló verziója: 10.4.24-MariaDB
-- PHP verzió: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `autoalibi_adatbazis`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `items`
--

CREATE TABLE `items` (
  `id` int(11) NOT NULL,
  `nev` varchar(100) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `kep` varchar(255) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `adatok` varchar(255) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `JarmuTipus` varchar(100) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `AlkatreszTipus` varchar(100) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `Ar` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `items`
--

INSERT INTO `items` (`id`, `nev`, `kep`, `adatok`, `JarmuTipus`, `AlkatreszTipus`, `Ar`) VALUES
(1, 'Biztosítékok', '/Belso-felszereles/CarFuse.webp', 'Áramerősség: 5A, 7,5A, 10A, 15A, 20A, 25A, 30A', 'Audi', 'belsofelszereles', 2540),
(2, 'Gumiszőnyeg', '/Belso-felszereles/CarMat.webp', 'Gumi szőnyeg', 'Audi', 'belsofelszereles', 9870),
(3, 'Benzines kanna', '/Belso-felszereles/GasTank.webp', 'Műanyag 5l', '', 'belsofelszereles', 6770),
(4, 'Hordozható akkumulátor', '/Belso-felszereles/HandBattery.webp', 'Szünetmentes', '', 'belsofelszereles', 34670),
(5, 'Csomagtér tálca', '/Belso-felszereles/TrunkTray.webp', 'Gumi tálca', 'Audi', 'belsofelszereles', 13500),
(6, 'Féknyereg', '/Fekberendezes/BrakeCalider1.webp', 'Dugattyú Átmérő: 38mm; Anyag: Alumínium', 'Audi', 'fek', 9800),
(7, 'Féknyereg', '/Fekberendezes/BrakeCalider2.webp', 'Dugattyú Átmérő: 35mm; Anyag: Alumínium', 'Audi', 'fek', 10500),
(8, 'Fékbetét', '/Fekberendezes/BrakePad1.webp', 'Szélesség: 118mm; Magasság: 70mm; Vastagság: 19mm', 'Audi', 'fek', 7700),
(9, 'Fékbetét', '/Fekberendezes/BrakePad2.webp', 'Szélesség: 120mm; Magasság: 80mm; Vastagság: 20mm', 'Audi', 'fek', 8000),
(10, 'Féktárcsa', '/Fekberendezes/BrakeDisc1.webp', 'Átmérő: 300mm; Vastagság: 22mm; Csavarszám: 5; Agymagasság: 47mm; Agy átmérő: 68mm', 'Audi', 'fek', 15770),
(11, 'Féktárcsa', '/Fekberendezes/BrakeDisc2.webp', 'Átmérő: 320mm; Vastagság: 25mm; Csavarszám: 5; Agymagasság: 52mm; Agy átmérő: 70mm', 'Audi', 'fek', 19880),
(12, 'Autó lökhárító', '/Karosszeria/CarBumper.webp', 'Felület: Alapozott', 'Audi', 'karosszeria', 37500),
(13, 'Autó sárvédő', '/Karosszeria/CarFender.webp', 'Felület: Alapozott', 'Audi', 'karosszeria', 24400),
(14, 'Autó szélvédő', '/Karosszeria/CarGlass.webp', 'Felület: Edzett üveg', 'Audi', 'karosszeria', 47790),
(15, 'Autó motorháztető', '/Karosszeria/CarHood.webp', 'Felület: Alapozott', 'Audi', 'karosszeria', 45000),
(16, 'Autó motorburkolat', '/Karosszeria/EngineShield.webp', 'Anyag: Műanyag', 'Audi', 'karosszeria', 23560),
(17, 'Kuplung szerkezet', '/Kuplung/ClutchAssembly.webp', 'Átmérő: 228mm', 'Audi', 'kuplung', 87000),
(18, 'Kuplung tárcsa', '/Kuplung/Clutch1.webp', 'Agyprofil: 21,8x24,2-23N', 'Audi', 'kuplung', 23000),
(19, 'Kuplung tárcsa', '/Kuplung/Clutch2.webp', 'Agyprofil: 21,8x24,2-23N', 'Audi', 'kuplung', 24550),
(20, 'Lendkerék', '/Kuplung/FlyWheel.webp', 'Átmérő: 228mm', 'Audi', 'kuplung', 125450),
(21, 'Kinyomó csapágy', '/Kuplung/ThrustBearing.webp', 'Anyag: Krómötvözetű acél', 'Audi', 'kuplung', 11300),
(22, 'Levegőszűrő', '/Levegoszuro/AirFilter1.webp', 'Forma: Panel négyszög; Hossz: 255mm; Szélesség: 215mm; Magasság: 57mm', 'Audi', 'szurok', 6500),
(23, 'Levegőszűrő', '/Levegoszuro/AirFilter2.webp', 'Forma: Henger; Hossz: 150mm; Szélesség: 190mm; Magasság: 50mm', 'Audi', 'szurok', 8700),
(24, 'Levegőszűrő', '/Levegoszuro/AirFilter3.webp', 'Forma: Henger; Hossz: 160mm; Szélesség: 240mm; Magasság: 70mm', 'Audi', 'szurok', 14400),
(25, 'Levegőszűrő', '/Levegoszuro/AirFilter4.webp', 'Forma: Panel négyszög; Hossz: 245mm; Szélesség: 205mm; Magasság: 55mm', 'Audi', 'szurok', 12000),
(26, 'Kék fagyálló', '/Olajok-es-folyadekok/AntifreezeMotul.webp', 'Márka: Motul; Kiszerelés: Flakon(3-5l)', '', 'olajokesfolyadekok', 10990),
(27, 'Rózsaszín fagyálló', '/Olajok-es-folyadekok/AntifreezePrestone.webp', 'Márka: Prestone; Kiszerelés: Flakon(3-5l)', '', 'olajokesfolyadekok', 10990),
(28, 'Fékolaj', '/Olajok-es-folyadekok/BreakOil.webp', 'Márka: Penrite; Kiszerelés: Flakon(1l)', '', 'olajokesfolyadekok', 6780),
(29, 'Motorolaj', '/Olajok-es-folyadekok/CastrolOil.webp', 'Márka: Castrol; Kiszerelés: Kanna(5-10l)', '', 'olajokesfolyadekok', 19990),
(30, 'Motorolaj', '/Olajok-es-folyadekok/MotulOil.webp', 'Márka: Motul; Kiszerelés: Kanna(5-10l)', '', 'olajokesfolyadekok', 17890),
(31, 'Motorolaj', '/Olajok-es-folyadekok/ShellOil.webp', 'Márka: Shell; Kiszerelés: Kanna(5-10l)', '', 'olajokesfolyadekok', 27800),
(32, 'Kormányszervó olaj', '/Olajok-es-folyadekok/SteeringServoOil.webp', 'Kiszerelés: Flakon(1l); Márka: Power Steering', '', 'olajokesfolyadekok', 9990),
(33, 'Ablakmosó folyadék', '/Olajok-es-folyadekok/WindshieldWasher.webp', 'Kiszerelés: Flakon(3-5l); Márka: Windshield Washer', '', 'olajokesfolyadekok', 8700),
(34, 'Hengerfej tömítés', '/Tomitesek/Gasket1.webp', 'Átmérő: 80mm; Vastagság: 2mm; Fajta: Fémlemez tömítés', 'Audi', 'tomitesek', 11990),
(35, 'Olajszivattyú tömítés', '/Tomitesek/Gasket2.webp', 'Szélesség: 55mm; Hossz: 105mm; Vastagság: 2mm', 'Audi', 'tomitesek', 5600),
(36, 'EGR szelep tömítés', '/Tomitesek/Gasket3.webp', 'Szélesség: 40mm; Hossz: 95mm; Vastagság: 1mm', 'Audi', 'tomitesek', 8990),
(37, 'Jobb első lámpa', '/Vilagitas/CarLight1.webp', 'Működési mód: Elektromos; Beépítési oldal: Jobb', 'Audi', 'vilagitas', 34500),
(38, 'Bal első lámpa', '/Vilagitas/CarLight2.webp', 'Működési mód: Elektromos; Beépítési oldal: Bal', 'Audi', 'vilagitas', 34500),
(39, 'Izzó', '/Vilagitas/CarLight3.webp', 'Izzó típus: H7; Működtetési mód: Halagón; Szín: Fehér', 'Audi', 'vilagitas', 4400),
(40, 'Hátsó bal lámpa', '/Vilagitas/CarLight4.webp', 'Működési mód: Elektromos; Beépítési oldal: Bal', 'Audi', 'vilagitas', 25500),
(41, 'Hátsó jobb lámpa', '/Vilagitas/CarLight5.webp', 'Működési mód: Elektromos; Beépítési oldal: Jobb', 'Audi', 'vilagitas', 25500);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `szamnev` varchar(255) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `szamtel` varchar(11) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `szamiranyitoszam` int(4) NOT NULL,
  `szamvaros` varchar(255) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `szamcim` varchar(255) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `szallnev` varchar(255) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `szalltel` varchar(11) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `szalliranyitoszam` int(4) NOT NULL,
  `szallvaros` varchar(255) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `szallcim` varchar(255) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `fizetestipus` varchar(10) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `rendeles` varchar(10000) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `userid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `orders`
--

INSERT INTO `orders` (`id`, `szamnev`, `szamtel`, `szamiranyitoszam`, `szamvaros`, `szamcim`, `szallnev`, `szalltel`, `szalliranyitoszam`, `szallvaros`, `szallcim`, `fizetestipus`, `rendeles`, `userid`) VALUES
(1, 'Martin Rátkai', '06301434427', 6445, 'Borota', 'Dózsa György utca 7.', 'Martin Rátkai', '06301434427', 6445, 'Borota', 'Dózsa György utca 7.', 'creditcard', '{\"7\":{\"count\":1},\"9\":{\"count\":1},\"26\":{\"count\":2},\"35\":{\"count\":3}}', 15),
(2, 'Martin Rátkai', '06301434427', 6445, 'Borota', 'Dózsa György utca 7.', 'Martin Rátkai', '06301434427', 6445, 'Borota', 'Dózsa György utca 7.', 'cash', '{\"7\":{\"count\":1},\"9\":{\"count\":1},\"22\":{\"count\":4},\"23\":{\"count\":6},\"26\":{\"count\":2},\"35\":{\"count\":3}}', 15),
(3, 'Martin Rátkai', '06301434427', 6445, 'Borota', 'Dózsa György utca 7.', 'Martin Rátkai', '06301434427', 6445, 'Borota', 'Dózsa György utca 7.', 'cash', '{\"7\":{\"count\":1},\"9\":{\"count\":1},\"22\":{\"count\":4},\"23\":{\"count\":6},\"26\":{\"count\":2},\"35\":{\"count\":3}}', 15);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `verifyEmail` varchar(100) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `passToken` varchar(100) COLLATE utf8mb4_hungarian_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `verifyEmail`, `passToken`) VALUES
(15, 'teszt', 'ratkaimartin2021@gmail.com', '$2b$10$UQzMKX97W8KkvcJQYFaQaOfQDwdZalgt.KtIJqu9q5CLgypOWqsom', 'kiqyvw4kCVXSGPI9K8GnYcYrHVw8YqUK2onrON4oVGAHDWzbtqhzYcMQICQwc9ah7UqwgvF1yCzXekpDFmeQVSeVJzWPplfySz2Y', 'rhdHzLMsPGbrmNqXIAiyQb024dCOFWuXthvIufhTmChKOcPzpy9mrj37XR0QcFjUbh2rO5KO3ODbF1Zq9ecJhAUrhSv7fR4OcCN5');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userid` (`userid`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `items`
--
ALTER TABLE `items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT a táblához `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
