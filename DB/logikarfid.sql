-- phpMyAdmin SQL Dump
-- version 5.1.1deb3+bionic1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Waktu pembuatan: 10 Jan 2022 pada 10.35
-- Versi server: 5.7.36-0ubuntu0.18.04.1
-- Versi PHP: 7.2.24-0ubuntu0.18.04.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `logikarfid`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `account`
--

DROP TABLE IF EXISTS `account`;
CREATE TABLE `account` (
  `id_account` varchar(10) NOT NULL,
  `name` varchar(20) NOT NULL,
  `description` text NOT NULL,
  `email` varchar(30) NOT NULL,
  `address` text NOT NULL,
  `telpon` varchar(20) NOT NULL,
  `status` varchar(20) NOT NULL,
  `register_date` text NOT NULL,
  `expired_date` text NOT NULL,
  `clean_data` varchar(2) NOT NULL,
  `modul_name` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `account`
--



INSERT INTO `account` (`id_account`, `name`, `description`, `email`, `address`, `telpon`, `status`, `register_date`, `expired_date`, `clean_data`, `modul_name`) VALUES
('0001', 'PT AGILITY', '', 'agiliti@email.co', 'Bekasi', '11111111', 'aktif', '1', '1', '1', 'WIM2'),
('0002', 'PT MAA', 'testing', 'maa@email.com', 'Bekasi', '11111', 'aktif', '1', '1', '1', 'WIM2'),
('0003', 'PT Logika Pratama', '', 'logika@email.com', 'Bekasi', '33333333', 'aktif', '1', '1', '1', 'WIM2'),
('0004', 'PT Data Kosong', 'Tes data kosong', 'kosong@mail.com', '', '', 'aktif', '', '', '', 'WIM2'),
('0005', 'PT Sembarang', 'Sembarang', 'sembarang@mail.com', 'sembarang', '01111111', 'aktif', '1', '1', '1', 'AT'),
('0006', 'PT AMAN SEJAHTERA', 'Sembarang', 'adminas@gmail.com', 'Jakarta', '082199228831', 'aktif', '1', '1', '1', 'WIM2'),
('0009', 'PT', 'add Description', '@logikapratama', 'add addres', '09-212-213', 'add status', '3', '3', '30', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `employee`
--

DROP TABLE IF EXISTS `employee`;
CREATE TABLE `employee` (
  `Emp_id` varchar(10) NOT NULL,
  `Emp_code` varchar(10) NOT NULL,
  `Name` text NOT NULL,
  `Birthdate` text NOT NULL,
  `Gender` text NOT NULL,
  `Age` text NOT NULL,
  `tag_number` varchar(25) NOT NULL,
  `id_Account` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `employee`
--

INSERT INTO `employee` (`Emp_id`, `Emp_code`, `Name`, `Birthdate`, `Gender`, `Age`, `tag_number`, `id_Account`) VALUES
('456', '787', 'jkkjkjhkhj', '988098', 'lppl', '87', '09809809808', '1234');

-- --------------------------------------------------------

--
-- Struktur dari tabel `history`
--

DROP TABLE IF EXISTS `history`;
CREATE TABLE `history` (
  `Id` int(10) NOT NULL DEFAULT '0',
  `Device_ID` varchar(10) CHARACTER SET utf8mb4 DEFAULT NULL,
  `id_Account` varchar(10) CHARACTER SET utf8mb4 DEFAULT NULL,
  `id_location` varchar(20) CHARACTER SET utf8mb4 DEFAULT NULL,
  `item_id` varchar(20) CHARACTER SET utf8mb4 DEFAULT NULL,
  `tag_number` varchar(100) CHARACTER SET utf8mb4 NOT NULL,
  `Item_code` varchar(20) CHARACTER SET utf8mb4 DEFAULT NULL,
  `Uom` text CHARACTER SET utf8mb4,
  `Quantity` int(10) DEFAULT NULL,
  `time_receive` text CHARACTER SET utf8mb4,
  `time_monitoring` text CHARACTER SET utf8mb4,
  `time_cashier` text CHARACTER SET utf8mb4,
  `time_delivery` text CHARACTER SET utf8mb4,
  `status` varchar(50) CHARACTER SET utf8mb4 DEFAULT NULL,
  `Status_GR` varchar(10) DEFAULT NULL,
  `Status_GI` varchar(10) DEFAULT NULL,
  `Name` text CHARACTER SET utf8mb4,
  `SKU` varchar(50) CHARACTER SET utf8mb4 DEFAULT NULL,
  `Item_category` text CHARACTER SET utf8mb4,
  `Ref_Number` varchar(25) DEFAULT NULL,
  `last_update` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `history`
--

INSERT INTO `history` (`Id`, `Device_ID`, `id_Account`, `id_location`, `item_id`, `tag_number`, `Item_code`, `Uom`, `Quantity`, `time_receive`, `time_monitoring`, `time_cashier`, `time_delivery`, `status`, `Status_GR`, `Status_GI`, `Name`, `SKU`, `Item_category`, `Ref_Number`, `last_update`) VALUES
(0, NULL, '0001', NULL, 'byfkv90zgfx', 'byfkv90zgfw', 'sku1', NULL, 1, '2021-10-27 13:23:57', NULL, NULL, NULL, 'Receive', 'yes', 'no', NULL, 'SKU1', NULL, '222', '2021-11-16 07:01:02'),
(0, NULL, '0001', NULL, 'byfkv91l0bc', '22323', '110', 'pcs', 1, NULL, NULL, NULL, NULL, NULL, 'yes', 'no', 'hapus', 'hapus', 'hapus', '23', '2021-11-16 07:01:02'),


-- --------------------------------------------------------

--
-- Struktur dari tabel `items`
--

DROP TABLE IF EXISTS `items`;
CREATE TABLE `items` (
  `item_id` varchar(18) NOT NULL,
  `Item_code` varchar(20) DEFAULT NULL,
  `Item_category` text,
  `Item_Type` text,
  `SKU` varchar(50) DEFAULT NULL,
  `Name` text,
  `Description` text,
  `Uom` text,
  `Quantity` int(10) DEFAULT NULL,
  `tag_number` varchar(100) NOT NULL,
  `id_Account` varchar(20) NOT NULL,
  `id_location` varchar(50) DEFAULT NULL,
  `Ref_Number` varchar(20) DEFAULT NULL,
  `Print_Tag` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `items`
--

INSERT INTO `items` (`item_id`, `Item_code`, `Item_category`, `Item_Type`, `SKU`, `Name`, `Description`, `Uom`, `Quantity`, `tag_number`, `id_Account`, `id_location`, `Ref_Number`, `Print_Tag`) VALUES
('00vmc68en', '00001', 'Fashion', '00001', 'SKU0001', 'SEPATU', 'sepatu olahraga', '082', 1, 'ITMGV0003DO0011L', '0001', NULL, '00001', 'yes'),
('00vqsk0n1', '', '', '', 'duadua', '', '', '', 1, '22222', '0001', NULL, '2222', 'yes'),

-- Trigger `items`
--
DROP TRIGGER IF EXISTS `delete_data_item`;
DELIMITER $$
CREATE TRIGGER `delete_data_item` AFTER DELETE ON `items` FOR EACH ROW BEGIN
DELETE FROM 
history 
WHERE 
item_id = Old.item_id 
AND status is null;
END
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `delete_stockTake`;
DELIMITER $$
CREATE TRIGGER `delete_stockTake` AFTER DELETE ON `items` FOR EACH ROW BEGIN
DELETE FROM 
Stock_Take 
WHERE 
tag_number = Old.tag_number;
END
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `inset_new_items`;
DELIMITER $$
CREATE TRIGGER `inset_new_items` AFTER INSERT ON `items` FOR EACH ROW BEGIN
INSERT INTO 
history 
(
    item_id,
    tag_number,
    id_Account,
    Item_code,
    Uom,
    Quantity,
    Status_GR,
    Status_GI,
    Name,
    SKU,
    Item_category,
    Ref_Number)
VALUES
(   NEW.item_id,
 	NEW.tag_number,
 	NEW.id_Account,
 	NEW.Item_code,
 	NEW.Uom,
 	NEW.Quantity,
 	'no',
    'no',
 	NEW.Name,
 	NEW.SKU,
 	NEW.Item_category,
 	NEW.Ref_Number
);
END
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `update data`;
DELIMITER $$
CREATE TRIGGER `update data` BEFORE UPDATE ON `items` FOR EACH ROW BEGIN
UPDATE history 
SET 
Item_code=NEW.Item_code ,
Uom=NEW.Uom ,
Quantity=NEW.Quantity ,
Name=NEW.Name ,
SKU=NEW.SKU,
Item_category=NEW.Item_category,
Ref_Number=NEW.Ref_Number 
WHERE item_id=NEW.item_id;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Struktur dari tabel `locations`
--

DROP TABLE IF EXISTS `locations`;
CREATE TABLE `locations` (
  `id_location` varchar(50) NOT NULL,
  `name` varchar(30) NOT NULL,
  `description` varchar(30) NOT NULL,
  `id_account` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `locations`
--

INSERT INTO `locations` (`id_location`, `name`, `description`, `id_account`) VALUES
('agi-bks', 'Gudang Bekasi', '', '0001'),
('agi-Jkt', 'Gudang Jakarta', 'Gudang Jakarta', '0001'),
('ajs-jkt', 'Jakarta', 'gudang bahan', '0006'),
('jkt-48', 'Jakarta Timur', 'Edit Description', '0001'),
('lgk-bekasi', 'Gudang Bekasi 2', 'gudang bekasi 2', '0003'),
('maa-bks', 'gudang Bekasi 2', '', '0002');


-- --------------------------------------------------------

--
-- Struktur dari tabel `modul`
--

DROP TABLE IF EXISTS `modul`;
CREATE TABLE `modul` (
  `Id_modul` varchar(10) NOT NULL,
  `Name` text NOT NULL,
  `Description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `modul_entri`
--

DROP TABLE IF EXISTS `modul_entri`;
CREATE TABLE `modul_entri` (
  `Id_modul_entri` varchar(10) NOT NULL,
  `Name` text NOT NULL,
  `Description` text NOT NULL,
  `Id_modul` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `packing`
--

DROP TABLE IF EXISTS `packing`;
CREATE TABLE `packing` (
  `Id` int(6) NOT NULL,
  `No_Order` varchar(10) NOT NULL,
  `No_Packing` text NOT NULL,
  `DO_Date` text NOT NULL,
  `No_Box` text NOT NULL,
  `TotalBox` text NOT NULL,
  `Qty_Items` text NOT NULL,
  `print_Status` int(10) NOT NULL,
  `id_Account` text NOT NULL,
  `id_location` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `packing`
--

INSERT INTO `packing` (`Id`, `No_Order`, `No_Packing`, `DO_Date`, `No_Box`, `TotalBox`, `Qty_Items`, `print_Status`, `id_Account`, `id_location`) VALUES
(52, '141', 'kv961599', '2021-10-27 13:58:12', '1', '1', '1', 1, '0002', NULL),
(53, '101', 'kv96nf8y', '2021-10-27 14:15:30', '1', '1', '1', 1, '0002', NULL),
(54, '131', 'kv96vug5', '2021-10-27 14:22:13', '1', '1', '1', 1, '0002', NULL),
(55, '2', 'kvac6z5d', '2021-10-28 09:38:05', '1', '1', '1', 1, '0002', NULL),
(56, '9', 'kvadajj4', '2021-10-28 10:08:52', '1', '1', '1', 1, '0002', NULL),


-- --------------------------------------------------------

--
-- Struktur dari tabel `readers`
--

DROP TABLE IF EXISTS `readers`;
CREATE TABLE `readers` (
  `id` int(11) NOT NULL ,
  `name` varchar(30) NOT NULL,
  `description` text NOT NULL,
  `reader_id` varchar(10) NOT NULL,
  `id_account` varchar(20) NOT NULL,
  `id_location` varchar(20) NOT NULL,
  `Inventory_trx_type` varchar(100) NOT NULL,
  PRIMARY KEY (reader_id)
) ENGINE=InnoDB

--
-- Dumping data untuk tabel `readers`
--

INSERT INTO `readers` (`id`, `name`, `description`, `reader_id`, `id_account`, `id_location`, `Inventory_trx_type`) VALUES
(2, 'Gate Received Deliver', 'Gate Received Deliver', 'agi-rc', '0001', 'agi-bks', 'Inv_Received_Delivery')



INSERT INTO `readers` (`id`, `name`, `description`, `reader_id`, `id_account`, `id_location`, `Inventory_trx_type`) VALUES
(58, 'Inout ', 'Akun untuk inout', '0008id', '0006', 'ajs-jkt', 'Inv_Received_Delivery'),
(47, 'Reader 3', 'in1', '000cj7', '0003', 'lgk-bekasi', 'Inv_Received'),
(31, 'Inbound with Register', 'Inbound with Register', '000dpi', '0003', 'lgk-bekasi', 'Inv_Received_Register'),
(32, 'Quality Control', 'Quality Control', '000fm5', '0003', 'lgk-bekasi', 'Inv_Cashier'),
(33, 'Outbound Gate', 'Outbound Gate', '000heb', '0003', 'lgk-bekasi', 'Inv_Delivery_Cashier'),
(34, 'Inbound 1', 'Inbound 1', '000i4t', '0003', 'lgk-bekasi', 'Inv_Received'),
(35, 'Inbound - Outbound', 'Inbound - Outbund', '000kht', '0003', 'lgk-bekasi', 'Inv_Received_Delivery'),
(36, 'Outbound', 'Outbound', '000njn', '0003', 'lgk-bekasi', 'Inv_Delivery'),
(56, 'Asset Tracking', '', '000nqk', '0002', 'maa-bks', 'Inv_TrackDetail'),
(37, 'Monitoring', 'Monitoring', '000o4t', '0003', 'lgk-bekasi', 'Inv_Monitoring'),
(50, 'READER10', 'untuk baca item masuk', '000osz', '0003', 'agi-bks', 'Inv_Received'),
(51, 'READER10abcdwe1922291', 'untuk baca item masuk', '000p7s', '0003', 'agi-bks', 'Inv_Received'),
(30, 'Trx Detail', 'Trx Detail', '000pux', '0001', 'agi-bks', 'Inv_TrackDetail'),
(38, 'Asset Tracking', 'Asset Tracking', '000qwi', '0003', 'lgk-bekasi', 'Inv_TrackDetail'),
(52, 'READER10abcdwe1922291', 'untuk baca item masuk', '000qyk', '0003', 'lgk-bekasi', 'Inv_Received'),
(29, 'gate delivery', 'gate delivery', 'agi-id', '0001', 'agi-bks', 'Inv_Delivery'),
(28, 'monitoring', 'monitoring', 'agi-im', '0001', 'agi-bks', 'Inv_Monitoring'),
(16, 'Inbound Gate', 'Inbound Gate', 'agi-in', '0001', 'agi-bks', 'Inv_Received_Register'),
(26, 'Gate Receive', 'Gate Receive', 'agi-ir', '0001', 'agi-bks', 'Inv_Received'),
(18, 'Outbound Gate', 'Outbound Gate', 'agi-ot', '0001', 'agi-bks', 'Inv_Delivery_Cashier'),
(17, 'QC Gate', 'QC Gate', 'agi-qc', '0001', 'agi-bks', 'Inv_Cashier'),
(27, 'Gate Received Deliver', 'Gate Received Deliver', 'agi-rc', '0001', 'agi-bks', 'Inv_Received_Delivery'),
(25, 'Gate Delivery', '', 'maa-id', '0002', 'maa-bks', 'Inv_Delivery'),
(23, 'Monitoring', 'monitoring', 'maa-im', '0002', 'maa-bks', 'Inv_Monitoring'),
(19, 'Inbound Gate', '--', 'maa-in', '0002', 'maa-bks', 'Inv_Received_Register'),
(22, 'Gate Inbound 2', 'reter', 'maa-ir', '0002', 'maa-bks', 'Inv_Received'),
(21, 'Outbound Gate', '--', 'maa-ot', '0002', 'maa-bks', 'Inv_Delivery_Cashier'),
(20, 'QC Gate', '', 'maa-qc', '0002', 'maa-bks', 'Inv_Cashier'),
(24, 'gate rc maa', '---', 'maa-rc', '0002', 'maa-bks', 'Inv_Received_Delivery');

-- --------------------------------------------------------

--
-- Struktur dari tabel `Stock_Take`
--

DROP TABLE IF EXISTS `Stock_Take`;
CREATE TABLE `Stock_Take` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Date_scan` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `Line` varchar(10) DEFAULT NULL,
  `Rak` varchar(10) DEFAULT NULL,
  `BIN` varchar(10) DEFAULT NULL,
  `Status_ST` varchar(10) CHARACTER SET swe7 DEFAULT NULL,
  `Tag_number` varchar(60) DEFAULT NULL,
  `id_Account` varchar(10) DEFAULT NULL,
  `id_location` varchar(50) DEFAULT NULL,
  `Device_ID` varchar(10) DEFAULT NULL,
  PRIMARY KEY (id) 
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `Stock_Take`
--

INSERT INTO `Stock_Take` (`Id`, `Date_scan`, `Line`, `Rak`, `BIN`, `Status_ST`, `Tag_number`, `id_Account`, `id_location`, `Device_ID`) VALUES
(1, '2021-11-16 09:21:03', '2', '1', 'A1', 'yes', 'ITMGV0006DO001J', '0003', 'lgk-bekasi', '000njn'),
(2, '2021-11-16 09:22:32', NULL, NULL, NULL, 'yes', 'ITMGV0009DO001J', '0003', 'lgk-bekasi', '000njn'),
(3, '2021-11-16 09:23:28', NULL, NULL, NULL, 'yes', 'ITMGV0003DO001G', '0003', 'lgk-bekasi', '000njn'),
(4, '2021-11-16 09:25:58', '2', '1', 'A1', 'yes', 'hsskvak84x9', '0003', 'lgk-bekasi', '000njn'),


-- --------------------------------------------------------

--
-- Stand-in struktur untuk tampilan `tarck_detail_v`
-- (Lihat di bawah untuk tampilan aktual)
--
DROP VIEW IF EXISTS `tarck_detail_v`;
CREATE TABLE `tarck_detail_v` (
`id_Account` varchar(20)
,`tag_number` varchar(100)
,`item_id` varchar(18)
,`Name` text
,`SKU` varchar(50)
,`reader_name` varchar(30)
,`id_location` varchar(20)
,`timestamp` timestamp(6)
);

-- --------------------------------------------------------

--
-- Struktur dari tabel `track_detail`
--

DROP TABLE IF EXISTS `track_detail`;
CREATE TABLE `track_detail` (
  `id` int(12) NOT NULL,
  `Device_ID` varchar(6) NOT NULL,
  `id_Account` varchar(10) NOT NULL,
  `id_location` varchar(50) NOT NULL,
  `tag_number` varchar(50) NOT NULL,
  `timestamp` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `Item_id` varchar(18) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktur dari tabel `Transaction_Cashier`
--

DROP TABLE IF EXISTS `Transaction_Cashier`;
CREATE TABLE `Transaction_Cashier` (
  `Id` int(10) NOT NULL,
  `Device_ID` varchar(10) NOT NULL,
  `id_Account` varchar(10) NOT NULL,
  `id_location` varchar(20) DEFAULT NULL,
  `item_id` varchar(20) NOT NULL,
  `UoM` varchar(20) DEFAULT NULL,
  `Quantity` text,
  `Line_number` text,
  `Rack_number` text,
  `Bin_number` text,
  `Time_Enter` text,
  `Time_Scan_Cashier` text,
  `status` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `Transaction_Cashier`
--

INSERT INTO `Transaction_Cashier` (`Id`, `Device_ID`, `id_Account`, `id_location`, `item_id`, `UoM`, `Quantity`, `Line_number`, `Rack_number`, `Bin_number`, `Time_Enter`, `Time_Scan_Cashier`, `status`) VALUES
(376, '000fm5', '0003', NULL, 'hsskvak84xa', NULL, NULL, NULL, NULL, NULL, '2021-11-05 20:21:11', '2021-11-05 20:21:11', 'confirmed'),
(483, 'agi-qc', '0001', NULL, 'kdkvwau567', NULL, NULL, NULL, NULL, NULL, '2021-11-12 18:38:57', '2021-11-12 18:38:57', 'confirmed'),
(502, 'agi-qc', '0001', NULL, '00vug0j9x', NULL, NULL, NULL, NULL, NULL, '2021-11-15 22:32:30', '2021-11-15 22:32:30', 'confirmed'),
(583, 'agi-qc', '0001', NULL, '00vs8zed4', NULL, NULL, NULL, NULL, NULL, '2021-11-25 17:17:16', '2021-11-25 17:17:16', 'confirmed'),
(588, 'agi-qc', '0001', NULL, '00vug0j9s', NULL, NULL, NULL, NULL, NULL, '2021-11-25 18:57:51', '2021-11-25 18:57:51', 'confirmed'),
(589, 'agi-qc', '0001', NULL, '00w0i9r4s', NULL, NULL, NULL, NULL, NULL, '2021-11-25 19:11:09', '2021-11-25 19:11:09', 'confirmed'),
(590, 'agi-qc', '0001', NULL, '00vqsk0n1', NULL, NULL, NULL, NULL, NULL, '2021-11-25 19:11:40', '2021-11-25 19:11:40', 'confirmed'),
(595, 'agi-qc', '0001', NULL, '00vug0j9v', NULL, NULL, NULL, NULL, NULL, '2021-11-26 00:08:25', '2021-11-26 00:08:25', 'confirmed'),
(596, 'agi-qc', '0001', NULL, '00w0aspsa', NULL, NULL, NULL, NULL, NULL, '2021-11-26 00:08:25', '2021-11-26 00:08:25', 'confirmed'),
(601, 'agi-qc', '0001', NULL, '00w0i9r4u', NULL, NULL, NULL, NULL, NULL, '2021-11-26 10:54:30', '2021-11-26 10:54:30', 'confirmed'),
(602, 'agi-qc', '0001', NULL, '00w0i9r4x', NULL, NULL, NULL, NULL, NULL, '2021-11-26 10:56:45', '2021-11-26 10:56:45', 'confirmed'),
(622, 'agi-qc', '0001', NULL, 'c34kx8m1d0d', NULL, NULL, NULL, NULL, NULL, '2021-12-16 16:32:58', '2021-12-16 16:32:58', 'unconfirm'),
(623, 'agi-qc', '0001', NULL, 'c34kx8m54u1', NULL, NULL, NULL, NULL, NULL, '2021-12-16 16:32:58', '2021-12-16 16:32:58', 'unconfirm'),
(624, 'agi-qc', '0001', NULL, 'c34kx8m751z', NULL, NULL, NULL, NULL, NULL, '2021-12-16 16:32:58', '2021-12-16 16:32:58', 'unconfirm'),
(625, 'agi-qc', '0001', NULL, 'c34kx8m40qd', NULL, NULL, NULL, NULL, NULL, '2021-12-16 16:32:58', '2021-12-16 16:32:58', 'unconfirm'),
(626, 'agi-qc', '0001', NULL, 'c34kx8m91en', NULL, NULL, NULL, NULL, NULL, '2021-12-16 16:32:58', '2021-12-16 16:32:58', 'unconfirm'),
(627, 'agi-qc', '0001', NULL, 'c34kx8leyvg', NULL, NULL, NULL, NULL, NULL, '2021-12-16 16:32:58', '2021-12-16 16:32:58', 'unconfirm'),
(638, 'maa-QC', '0002', NULL, '4cpkvklidzp', NULL, NULL, NULL, NULL, NULL, '2021-12-22 14:19:43', '2021-12-22 14:19:43', 'confirmed'),
(639, 'maa-qc', '0002', NULL, '4cpkvklieb8', NULL, NULL, NULL, NULL, NULL, '2021-12-23 16:19:07', '2021-12-23 16:19:07', 'unconfirm'),
(640, 'maa-qc', '0002', NULL, '4cpkvklieb9', NULL, NULL, NULL, NULL, NULL, '2021-12-23 16:19:07', '2021-12-23 16:19:07', 'confirmed'),
(641, 'maa-qc', '0002', NULL, '4cpkvklieba', NULL, NULL, NULL, NULL, NULL, '2021-12-23 16:19:07', '2021-12-23 16:19:07', 'confirmed'),
(642, 'MAA-QC', '0002', NULL, '431kxjsronz', NULL, NULL, NULL, NULL, NULL, '2021-12-24 11:07:02', '2021-12-24 11:07:02', 'unconfirm'),
(643, 'MAA-QC', '0002', NULL, '431kxjsroo0', NULL, NULL, NULL, NULL, NULL, '2021-12-24 11:07:02', '2021-12-24 11:07:02', 'unconfirm'),
(644, 'MAA-QC', '0002', NULL, '431kxjsroo1', NULL, NULL, NULL, NULL, NULL, '2021-12-24 11:07:02', '2021-12-24 11:07:02', 'unconfirm'),
(645, 'MAA-QC', '0002', NULL, '431kxjsroo2', NULL, NULL, NULL, NULL, NULL, '2021-12-24 11:07:02', '2021-12-24 11:07:02', 'unconfirm'),
(646, 'MAA-QC', '0002', NULL, '431kxjsroo3', NULL, NULL, NULL, NULL, NULL, '2021-12-24 11:07:02', '2021-12-24 11:07:02', 'unconfirm');

--
-- Trigger `Transaction_Cashier`
--
DROP TRIGGER IF EXISTS `update history Cashier`;
DELIMITER $$
CREATE TRIGGER `update history Cashier` AFTER INSERT ON `Transaction_Cashier` FOR EACH ROW BEGIN
UPDATE history 
SET 
time_cashier = NOW(), 
status = 'Cashier',
Device_ID =New.Device_ID,
last_update =  NOW()
WHERE item_id = NEW.item_id;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Struktur dari tabel `Transaction_Delivery`
--

DROP TABLE IF EXISTS `Transaction_Delivery`;
CREATE TABLE `Transaction_Delivery` (
  `Id` int(10) NOT NULL,
  `Device_ID` varchar(10) NOT NULL,
  `id_Account` varchar(10) NOT NULL,
  `id_location` varchar(20) NOT NULL,
  `item_id` varchar(20) NOT NULL,
  `UoM` varchar(20) DEFAULT NULL,
  `Quantity` text,
  `Line_number` text,
  `Rack_number` text,
  `Bin_number` text,
  `Time_Enter` datetime(6) DEFAULT NULL,
  `Time_Out` datetime DEFAULT NULL,
  `status` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `Transaction_Delivery`
--

INSERT INTO `Transaction_Delivery` (`Id`, `Device_ID`, `id_Account`, `id_location`, `item_id`, `UoM`, `Quantity`, `Line_number`, `Rack_number`, `Bin_number`, `Time_Enter`, `Time_Out`, `status`) VALUES
(106, 'agi-id', '0001', 'agi-bks', 'haxkvi64vvm', NULL, NULL, NULL, NULL, NULL, '2021-11-03 19:57:37.000000', NULL, NULL),
(303, 'agi-id', '0003', 'agi-bks', '00vhom5if', NULL, NULL, NULL, NULL, NULL, '2021-11-05 14:29:19.000000', NULL, NULL),
(332, '000heb', '0003', 'lgk-bekasi', 'hsskvak84xa', NULL, NULL, NULL, NULL, NULL, '2021-11-05 20:23:34.000000', NULL, NULL),
(946, 'agi-id', '0001', 'agi-bks', '00vqr2yon', NULL, NULL, NULL, NULL, NULL, '2021-11-22 14:21:44.000000', NULL, NULL),
(950, 'agi-id', '0001', 'agi-bks', '00w5t6up7', NULL, NULL, NULL, NULL, NULL, '2021-11-22 14:21:50.000000', NULL, NULL),
(2380, '000kht', '0003', 'lgk-bekasi', 'catkx9zg8d0', NULL, NULL, NULL, NULL, NULL, '2021-12-17 14:00:27.000000', NULL, NULL),
(2383, '000kht', '0003', 'lgk-bekasi', 'catkx9zj66z', NULL, NULL, NULL, NULL, NULL, '2021-12-17 14:00:52.000000', NULL, NULL),
(2457, 'agi-rc', '0001', 'agi-bks', 'gtgkxfrffzu', NULL, NULL, NULL, NULL, NULL, '2021-12-21 14:16:37.000000', NULL, NULL),
(2505, 'maa-id', '0002', 'maa-bks', '4cpkvklieba', NULL, NULL, NULL, NULL, NULL, '2021-12-23 16:23:10.000000', NULL, NULL),
(2536, 'maa-rc', '0002', 'maa-bks', '431kxjsromx', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:20:33.000000', NULL, NULL),
(2537, 'maa-rc', '0002', 'maa-bks', '431kxjsromy', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:20:33.000000', NULL, NULL),
(2538, 'maa-rc', '0002', 'maa-bks', '431kxjsromz', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:20:33.000000', NULL, NULL),
(2539, 'maa-rc', '0002', 'maa-bks', '431kxjsron0', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:20:33.000000', NULL, NULL),
(2540, 'maa-rc', '0002', 'maa-bks', '431kxjsron1', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:20:33.000000', NULL, NULL),
(2541, 'maa-rc', '0002', 'maa-bks', '431kxjsron2', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:20:33.000000', NULL, NULL),
(2542, 'maa-rc', '0002', 'maa-bks', '431kxjsron3', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:20:33.000000', NULL, NULL),
(2543, 'maa-rc', '0002', 'maa-bks', '431kxjsron4', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:20:33.000000', NULL, NULL),
(2544, 'maa-rc', '0002', 'maa-bks', '431kxjsron5', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:20:33.000000', NULL, NULL),
(2545, 'maa-rc', '0002', 'maa-bks', '431kxjsron6', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:20:33.000000', NULL, NULL),
(2546, 'maa-rc', '0002', 'maa-bks', '431kxjsron7', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:25:33.000000', NULL, NULL),
(2547, 'maa-rc', '0002', 'maa-bks', '431kxjsron8', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:25:33.000000', NULL, NULL),
(2548, 'maa-rc', '0002', 'maa-bks', '431kxjsron9', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:25:33.000000', NULL, NULL),
(2549, 'maa-rc', '0002', 'maa-bks', '431kxjsrona', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:25:33.000000', NULL, NULL),
(2550, 'maa-rc', '0002', 'maa-bks', '431kxjsronb', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:25:33.000000', NULL, NULL),
(2551, 'maa-rc', '0002', 'maa-bks', '431kxjsrone', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:25:33.000000', NULL, NULL),
(2552, 'maa-rc', '0002', 'maa-bks', '431kxjsronf', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:25:33.000000', NULL, NULL),
(2553, 'maa-rc', '0002', 'maa-bks', '431kxjsrong', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:25:33.000000', NULL, NULL),
(2554, 'maa-rc', '0002', 'maa-bks', '431kxjsronh', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:25:33.000000', NULL, NULL),
(2555, 'maa-rc', '0002', 'maa-bks', '431kxjsroni', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:25:33.000000', NULL, NULL);

--
-- Trigger `Transaction_Delivery`
--
DROP TRIGGER IF EXISTS `update history delivery`;
DELIMITER $$
CREATE TRIGGER `update history delivery` AFTER INSERT ON `Transaction_Delivery` FOR EACH ROW BEGIN
UPDATE history 
SET time_delivery=NOW(),
status='Delivery',
Device_ID =New.Device_ID,
last_update = NOW()
WHERE item_id=NEW.item_id;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Struktur dari tabel `Transaction_Monitoring`
--

DROP TABLE IF EXISTS `Transaction_Monitoring`;
CREATE TABLE `Transaction_Monitoring` (
  `Id` int(10) NOT NULL,
  `Device_ID` varchar(10) NOT NULL,
  `id_Account` varchar(10) NOT NULL,
  `id_location` varchar(20) DEFAULT NULL,
  `item_id` varchar(20) NOT NULL,
  `UoM` varchar(20) DEFAULT NULL,
  `Quantity` text,
  `Line_number` text,
  `Rack_number` text,
  `Bin_number` text,
  `Time_Monitoring` datetime(6) DEFAULT NULL,
  `Time_Out` datetime DEFAULT NULL,
  `status` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `Transaction_Monitoring`
--

INSERT INTO `Transaction_Monitoring` (`Id`, `Device_ID`, `id_Account`, `id_location`, `item_id`, `UoM`, `Quantity`, `Line_number`, `Rack_number`, `Bin_number`, `Time_Monitoring`, `Time_Out`, `status`) VALUES
(153, 'maa-ir', '0002', NULL, 'hsskvabaw39', NULL, NULL, '51', '4', '2', '2021-10-28 09:32:18.000000', NULL, NULL),
(182, 'agi-ir', '0001', NULL, 'haxkvi64vvm', NULL, NULL, '01', '02', '02', '2021-11-03 14:52:10.000000', NULL, NULL),
(547, 'agi-in', '0001', NULL, 'byjkvl3439v', NULL, NULL, '01', '02', '01', '2021-11-04 22:34:06.000000', NULL, NULL),
(548, 'agi-in', '0001', NULL, '00vl3dr2h', NULL, NULL, '01', '02', '01', '2021-11-05 19:23:08.000000', NULL, NULL),
(549, 'agi-in', '0001', NULL, '00vl3dr2i', NULL, NULL, '01', '02', '01', '2021-11-05 19:23:08.000000', NULL, NULL),
(552, '000dpi', '0003', NULL, 'hsskvak84xa', NULL, NULL, '2', '1', 'A1', '2021-11-05 20:13:35.000000', NULL, NULL),
(568, 'agi-in', '0001', NULL, '00vmj5cxr', NULL, NULL, 'Auto', 'Auto', 'Auto', '2021-11-08 13:58:48.000000', NULL, NULL),
(829, 'agi-in', '0001', NULL, '00vqsk0n1', NULL, NULL, '222', '222', '222', '2021-11-09 21:26:08.000000', NULL, NULL),
(830, 'agi-in', '0001', NULL, '00vqr2yon', NULL, NULL, 'Auto', 'Auto', 'Auto', '2021-11-09 21:26:08.000000', NULL, NULL),
(831, 'agi-in', '0001', NULL, '00vs6t4hs', NULL, NULL, 'Auto', 'Auto', 'Auto', '2021-11-09 21:36:14.000000', NULL, NULL),
(833, 'agi-in', '0001', NULL, '00vs6t4hu', NULL, NULL, 'Auto', 'Auto', 'Auto', '2021-11-09 21:37:53.000000', NULL, NULL),
(840, 'agi-in', '0003', NULL, '12', NULL, NULL, NULL, NULL, NULL, '2021-11-10 15:54:12.000000', NULL, NULL),
(842, 'zaifu8', '0002', NULL, '00vs8ze11', NULL, NULL, 'Auto', 'Auto', 'Auto', '2021-11-11 10:58:52.000000', NULL, NULL),
(843, 'zaifu8', '0002', NULL, '00vs8ze22', NULL, NULL, 'Auto', 'Auto', 'Auto', '2021-11-11 10:58:53.000000', NULL, NULL),
(849, 'agi-in', '0001', NULL, '00vs8zed4', NULL, NULL, '1', '1', '1', '2021-11-11 11:04:54.000000', NULL, NULL),
(876, 'agi-ir', '0001', NULL, 'kdkvwau567', NULL, NULL, '1', '2', '1', '2021-11-12 18:33:18.000000', NULL, NULL),
(877, '000i4t', '0003', NULL, 'hsskvak5838', NULL, NULL, '2', '1', 'A1', '2021-11-12 21:04:43.000000', NULL, NULL),
(928, 'agi-in', '0001', NULL, '00vs8zed8', NULL, NULL, 'Auto', 'Auto', 'Auto', '2021-11-15 21:06:21.000000', NULL, NULL),
(929, 'agi-in', '0001', NULL, '00vug0j9s', NULL, NULL, '55', '55', '55', '2021-11-15 21:57:13.000000', NULL, NULL),
(931, 'agi-in', '0001', NULL, '00vug0j9x', NULL, NULL, '5555', '5555', '5555', '2021-11-15 22:30:16.000000', NULL, NULL),
(932, '000kht', '0003', NULL, 'hsskvak583b', NULL, NULL, NULL, NULL, NULL, '2021-11-16 13:41:15.000000', NULL, NULL),
(978, 'agi-in', '0001', NULL, '00w0aspsa', NULL, NULL, 'Auto', 'Auto', 'Auto', '2021-11-18 15:28:00.000000', NULL, NULL),
(979, 'agi-in', '0001', NULL, '00vug0j9v', NULL, NULL, '65', '2', '32', '2021-11-18 16:25:05.000000', NULL, NULL),
(999, 'agi-in', '0001', NULL, '00w0i9r4s', NULL, NULL, 'Auto', 'Auto', 'Auto', '2021-11-19 14:28:01.000000', NULL, NULL),
(1003, 'agi-in', '0001', NULL, '00w0i9r4u', NULL, NULL, 'Auto', 'Auto', 'Auto', '2021-11-19 15:59:49.000000', NULL, NULL),
(1004, 'agi-in', '0001', NULL, '00w0aspsb', NULL, NULL, 'Auto', 'Auto', 'Auto', '2021-11-19 20:02:41.000000', NULL, NULL),
(1005, 'agi-in', '0001', NULL, '00w0i9r4x', NULL, NULL, '9', '9', '9', '2021-11-22 10:42:03.000000', NULL, NULL),
(1025, 'agi-in', '0001', NULL, '00w5t6up7', NULL, NULL, '11', '11', '11', '2021-11-22 14:19:04.000000', NULL, NULL),
(1037, 'agi-in', '0001', NULL, '00w9co85v', NULL, NULL, '12', '12', '12', '2021-11-23 17:26:26.000000', NULL, NULL),
(1043, 'agi-ir', '0001', NULL, '00w5tx7fj', NULL, NULL, 'Auto', 'Auto', 'Auto', '2021-11-26 14:52:17.000000', NULL, NULL),
(1063, 'agi-in', '0001', NULL, '00wq30oj0', NULL, NULL, 'Auto', 'Auto', 'Auto', '2021-12-03 14:49:11.000000', NULL, NULL),
(1064, 'agi-in', '0001', NULL, '00wq30oj1', NULL, NULL, 'Auto', 'Auto', 'Auto', '2021-12-03 14:49:11.000000', NULL, NULL),
(1065, 'agi-in', '0001', NULL, '00wq30oj3', NULL, NULL, 'Auto', 'Auto', 'Auto', '2021-12-03 14:49:11.000000', NULL, NULL),
(1066, 'agi-in', '0001', NULL, '00wq30oj5', NULL, NULL, 'Auto', 'Auto', 'Auto', '2021-12-03 14:49:11.000000', NULL, NULL),
(1067, 'agi-in', '0001', NULL, '00wq30oj8', NULL, NULL, 'Auto', 'Auto', 'Auto', '2021-12-03 14:49:11.000000', NULL, NULL),
(1068, 'agi-in', '0001', NULL, '00wq30ojb', NULL, NULL, 'Auto', 'Auto', 'Auto', '2021-12-03 14:49:11.000000', NULL, NULL),
(1069, 'agi-in', '0001', NULL, '00wq30ojd', NULL, NULL, 'Auto', 'Auto', 'Auto', '2021-12-03 14:49:11.000000', NULL, NULL),
(1070, 'agi-in', '0001', NULL, '00wq30ojf', NULL, NULL, 'Auto', 'Auto', 'Auto', '2021-12-03 14:49:11.000000', NULL, NULL),
(1071, 'agi-in', '0001', NULL, '00wq30ojh', NULL, NULL, 'Auto', 'Auto', 'Auto', '2021-12-03 14:49:11.000000', NULL, NULL),
(1072, 'agi-in', '0001', NULL, '00wq30ojj', NULL, NULL, 'Auto', 'Auto', 'Auto', '2021-12-03 14:49:11.000000', NULL, NULL),
(1073, 'agi-in', '0001', NULL, '00wq30ojl', NULL, NULL, 'Auto', 'Auto', 'Auto', '2021-12-03 14:49:11.000000', NULL, NULL),
(1074, 'agi-in', '0001', NULL, '00wq30ojn', NULL, NULL, 'Auto', 'Auto', 'Auto', '2021-12-03 14:49:11.000000', NULL, NULL),
(1075, 'agi-in', '0001', NULL, '00wq30ojp', NULL, NULL, 'Auto', 'Auto', 'Auto', '2021-12-03 14:49:11.000000', NULL, NULL),
(1076, 'agi-in', '0001', NULL, '00wq30ojq', NULL, NULL, 'Auto', 'Auto', 'Auto', '2021-12-03 14:49:11.000000', NULL, NULL),
(1077, 'agi-in', '0001', NULL, '00wq30ojs', NULL, NULL, 'Auto', 'Auto', 'Auto', '2021-12-03 14:49:11.000000', NULL, NULL),
(1078, 'agi-in', '0001', NULL, '00wq38gxt', NULL, NULL, 'Auto', 'Auto', 'Auto', '2021-12-03 14:58:48.000000', NULL, NULL),
(1079, 'agi-in', '0001', NULL, '00wq38gxv', NULL, NULL, 'Auto', 'Auto', 'Auto', '2021-12-03 14:58:48.000000', NULL, NULL),
(1080, 'agi-in', '0001', NULL, '00wq3jc0d', NULL, NULL, 'Auto', 'Auto', 'Auto', '2021-12-03 15:00:50.000000', NULL, NULL),
(1081, 'agi-in', '0001', NULL, '00wq3o6uy', NULL, NULL, '22', '22', '22', '2021-12-03 15:04:22.000000', NULL, NULL),
(1082, 'agi-in', '0001', NULL, '00wq3o6uu', NULL, NULL, '22', '22', '22', '2021-12-03 15:04:22.000000', NULL, NULL),
(1083, 'agi-in', '0001', NULL, '00wq3ovkh', NULL, NULL, 'Auto', 'Auto', 'Auto', '2021-12-03 15:04:22.000000', NULL, NULL),
(1084, 'agi-in', '0001', NULL, '00wq4m17l', NULL, NULL, 'Auto', 'Auto', 'Auto', '2021-12-03 15:31:00.000000', NULL, NULL),
(1085, 'agi-in', '0001', NULL, '00wq4m17m', NULL, NULL, 'Auto', 'Auto', 'Auto', '2021-12-03 15:31:00.000000', NULL, NULL),
(1086, 'agi-in', '0001', NULL, '00wq5ztpp', NULL, NULL, 'Auto', 'Auto', 'Auto', '2021-12-03 16:09:01.000000', NULL, NULL),
(1087, 'agi-in', '0001', NULL, '00wq5ztpq', NULL, NULL, 'Auto', 'Auto', 'Auto', '2021-12-03 16:09:01.000000', NULL, NULL),
(1091, '000kht', '0003', NULL, 'hsskvak583c', NULL, NULL, NULL, NULL, NULL, '2021-12-08 11:32:31.000000', NULL, NULL),
(1093, '000kht', '0003', NULL, 'hsskvak583e', NULL, NULL, NULL, NULL, NULL, '2021-12-08 11:32:31.000000', NULL, NULL),
(1094, '000kht', '0003', NULL, 'hsskvak583f', NULL, NULL, NULL, NULL, NULL, '2021-12-08 11:32:31.000000', NULL, NULL),
(1095, '000kht', '0003', NULL, 'hsskvak583g', NULL, NULL, NULL, NULL, NULL, '2021-12-08 11:32:31.000000', NULL, NULL),
(1096, '000kht', '0003', NULL, 'hsskvak583h', NULL, NULL, NULL, NULL, NULL, '2021-12-08 11:32:31.000000', NULL, NULL),
(1097, '000kht', '0003', NULL, 'hsskvak583i', NULL, NULL, NULL, NULL, NULL, '2021-12-08 11:32:31.000000', NULL, NULL),
(1099, 'agi-ir', '0001', NULL, '00wq6stku', NULL, NULL, 'Auto', 'Auto', 'Auto', '2021-12-08 16:35:37.000000', NULL, NULL),
(1110, 'agi-in', '0001', NULL, '00vmc68en', NULL, NULL, 'Auto', 'Auto', 'Auto', '2021-12-09 15:26:32.000000', NULL, NULL),
(1112, '000kht', '0003', NULL, 'hsskvak584g', NULL, NULL, NULL, NULL, NULL, '2021-12-15 11:39:10.000000', NULL, NULL),
(1113, '000kht', '0003', NULL, 'fcjkx5m5bo0', NULL, NULL, NULL, NULL, NULL, '2021-12-15 11:39:10.000000', NULL, NULL),
(1115, '000kht', '0003', NULL, 'elokx5kec3b', NULL, NULL, NULL, NULL, NULL, '2021-12-15 11:39:10.000000', NULL, NULL),
(1124, 'agi-ir', '0001', NULL, 'k1nkx7em2i9', NULL, NULL, 'Auto', 'Auto', 'Auto', '2021-12-15 17:42:09.000000', NULL, NULL),
(1125, 'agi-ir', '0001', NULL, 'c34kx8m91en', NULL, NULL, '4', '10', '25', '2021-12-16 14:59:38.000000', NULL, NULL),
(1126, 'agi-ir', '0001', NULL, 'c34kx8m751z', NULL, NULL, '4', '10', '25', '2021-12-16 14:59:38.000000', NULL, NULL),
(1127, 'agi-ir', '0001', NULL, 'c34kx8m54u1', NULL, NULL, '4', '10', '25', '2021-12-16 14:59:38.000000', NULL, NULL),
(1128, 'agi-ir', '0001', NULL, 'c34kx8m40qd', NULL, NULL, '4', '10', '25', '2021-12-16 14:59:38.000000', NULL, NULL),
(1129, 'agi-ir', '0001', NULL, 'c34kx8m1d0d', NULL, NULL, '4', '10', '25', '2021-12-16 14:59:38.000000', NULL, NULL),
(1130, 'agi-ir', '0001', NULL, 'c34kx8m07v4', NULL, NULL, '4', '10', '25', '2021-12-16 14:59:38.000000', NULL, NULL),
(1131, 'agi-ir', '0001', NULL, 'c34kx8lxw6b', NULL, NULL, '4', '10', '25', '2021-12-16 14:59:38.000000', NULL, NULL),
(1132, 'agi-ir', '0001', NULL, 'c34kx8lxw6a', NULL, NULL, '4', '10', '25', '2021-12-16 14:59:38.000000', NULL, NULL),
(1133, 'agi-ir', '0001', NULL, 'c34kx8lxw6c', NULL, NULL, '4', '10', '25', '2021-12-16 14:59:38.000000', NULL, NULL),
(1134, 'agi-ir', '0001', NULL, 'c34kx8leyvg', NULL, NULL, '4', '10', '25', '2021-12-16 14:59:38.000000', NULL, NULL),
(1147, 'agi-rc', '0001', NULL, 'catkx9qiafn', NULL, NULL, '1', '2', '3', '2021-12-17 11:14:47.000000', NULL, NULL),
(1148, 'agi-rc', '0001', NULL, 'catkx9utxq4', NULL, NULL, '1', '2', '3', '2021-12-17 11:14:47.000000', NULL, NULL),
(1149, 'agi-rc', '0001', NULL, 'catkx9uupyo', NULL, NULL, '1', '2', '3', '2021-12-17 11:14:47.000000', NULL, NULL),
(1150, 'agi-rc', '0001', NULL, 'catkx9uzxvz', NULL, NULL, '1', '2', '3', '2021-12-17 11:14:47.000000', NULL, NULL),
(1151, 'agi-rc', '0001', NULL, 'catkx9ueud4', NULL, NULL, '1', '2', '3', '2021-12-17 11:14:47.000000', NULL, NULL),
(1152, 'agi-rc', '0001', NULL, 'catkx9ueud5', NULL, NULL, '1', '2', '3', '2021-12-17 11:14:47.000000', NULL, NULL),
(1153, 'agi-rc', '0001', NULL, 'catkx9v0nnp', NULL, NULL, '1', '2', '3', '2021-12-17 11:14:47.000000', NULL, NULL),
(1154, 'agi-rc', '0001', NULL, 'catkx9v133u', NULL, NULL, '1', '2', '3', '2021-12-17 11:14:47.000000', NULL, NULL),
(1155, 'agi-rc', '0001', NULL, 'catkx9v2el9', NULL, NULL, '1', '2', '3', '2021-12-17 11:15:34.000000', NULL, NULL),
(1156, '000kht', '0003', NULL, 'catkx9zt53o', NULL, NULL, NULL, NULL, NULL, '2021-12-17 13:54:44.000000', NULL, NULL),
(1157, '000kht', '0003', NULL, 'catkx9zg8d0', NULL, NULL, NULL, NULL, NULL, '2021-12-17 13:54:44.000000', NULL, NULL),
(1158, '000kht', '0003', NULL, 'catkx9zfkyf', NULL, NULL, NULL, NULL, NULL, '2021-12-17 13:54:44.000000', NULL, NULL),
(1159, '000kht', '0003', NULL, 'catkx9zkcmq', NULL, NULL, NULL, NULL, NULL, '2021-12-17 13:54:44.000000', NULL, NULL),
(1160, '000kht', '0003', NULL, 'catkx9zj66z', NULL, NULL, NULL, NULL, NULL, '2021-12-17 13:54:44.000000', NULL, NULL),
(1161, '000kht', '0003', NULL, 'catkx9ziao3', NULL, NULL, NULL, NULL, NULL, '2021-12-17 13:54:44.000000', NULL, NULL),
(1162, '000kht', '0003', NULL, 'catkx9zh7wr', NULL, NULL, NULL, NULL, NULL, '2021-12-17 13:54:44.000000', NULL, NULL),
(1163, '000kht', '0003', NULL, 'catkx9zhoir', NULL, NULL, NULL, NULL, NULL, '2021-12-17 13:54:44.000000', NULL, NULL),
(1184, 'maa-in', '0002', NULL, '00xegdsbg', NULL, NULL, '8', '12', '9', '2021-12-20 16:06:21.000000', NULL, NULL),
(1186, 'maa-in', '0002', NULL, '00xegdsbm', NULL, NULL, '8', '12', '9', '2021-12-20 16:06:21.000000', NULL, NULL),
(1187, 'maa-in', '0002', NULL, '00xegmwhg', NULL, NULL, 'Auto', 'Auto', 'Auto', '2021-12-20 16:18:14.000000', NULL, NULL),
(1188, 'maa-in', '0002', NULL, '00xegmwhj', NULL, NULL, 'Auto', 'Auto', 'Auto', '2021-12-20 16:18:14.000000', NULL, NULL),
(1189, 'maa-in', '0002', NULL, '00xegdsbi', NULL, NULL, 'Auto', 'Auto', 'Auto', '2021-12-20 16:18:14.000000', NULL, NULL),
(1190, 'maa-in', '0002', NULL, '00xegmwhr', NULL, NULL, 'Auto', 'Auto', 'Auto', '2021-12-20 16:18:14.000000', NULL, NULL),
(1191, 'agi-ir', '0001', NULL, 'ofgkvugjpqc', NULL, NULL, '1', '2', '3', '2021-12-20 16:23:30.000000', NULL, NULL),
(1192, 'agi-ir', '0001', NULL, 'ofgkvugk76u', NULL, NULL, '1', '2', '3', '2021-12-20 16:23:30.000000', NULL, NULL),
(1193, 'agi-ir', '0001', NULL, '9yckw1ikw2r', NULL, NULL, '1', '2', '3', '2021-12-20 16:23:30.000000', NULL, NULL),
(1194, 'agi-ir', '0001', NULL, '00wq6stks', NULL, NULL, '1', '2', '3', '2021-12-20 16:23:30.000000', NULL, NULL),
(1205, 'maa-in', '0002', NULL, 'djskxehdod8', NULL, NULL, 'Auto', 'Auto', 'Auto', '2021-12-20 16:37:05.000000', NULL, NULL),
(1227, 'maa-rc', '0002', NULL, '4cpkvklidy1', NULL, NULL, '6', '8', '2', '2021-12-21 13:54:38.000000', NULL, NULL),
(1228, 'maa-rc', '0002', NULL, '4cpkvklidy2', NULL, NULL, '6', '8', '2', '2021-12-21 13:54:38.000000', NULL, NULL),
(1229, 'maa-rc', '0002', NULL, '4cpkvklidy3', NULL, NULL, '6', '8', '2', '2021-12-21 13:54:38.000000', NULL, NULL),
(1230, 'maa-rc', '0002', NULL, '4cpkvklidy4', NULL, NULL, '6', '8', '2', '2021-12-21 13:54:38.000000', NULL, NULL),
(1231, 'maa-rc', '0002', NULL, '4cpkvklidy5', NULL, NULL, '6', '8', '2', '2021-12-21 13:54:38.000000', NULL, NULL),
(1232, 'maa-rc', '0002', NULL, '4cpkvklidy6', NULL, NULL, '6', '8', '2', '2021-12-21 13:54:38.000000', NULL, NULL),
(1233, 'maa-rc', '0002', NULL, '4cpkvklidy7', NULL, NULL, '6', '8', '2', '2021-12-21 13:54:38.000000', NULL, NULL),
(1234, 'maa-rc', '0002', NULL, '4cpkvklidy8', NULL, NULL, '6', '8', '2', '2021-12-21 13:54:38.000000', NULL, NULL),
(1235, 'maa-rc', '0002', NULL, '4cpkvklidy9', NULL, NULL, '6', '8', '2', '2021-12-21 13:54:38.000000', NULL, NULL),
(1236, 'maa-rc', '0002', NULL, '4cpkvklidya', NULL, NULL, '6', '8', '2', '2021-12-21 13:54:38.000000', NULL, NULL),
(1237, 'maa-rc', '0002', NULL, '4cpkvklidyb', NULL, NULL, '6', '8', '2', '2021-12-21 13:54:38.000000', NULL, NULL),
(1238, 'maa-rc', '0002', NULL, '4cpkvklidyc', NULL, NULL, '6', '8', '2', '2021-12-21 13:54:38.000000', NULL, NULL),
(1239, 'maa-rc', '0002', NULL, '4cpkvklidyd', NULL, NULL, '6', '8', '2', '2021-12-21 13:54:38.000000', NULL, NULL),
(1240, 'maa-rc', '0002', NULL, '4cpkvklidye', NULL, NULL, '6', '8', '2', '2021-12-21 13:54:38.000000', NULL, NULL),
(1241, 'maa-rc', '0002', NULL, '4cpkvklidyf', NULL, NULL, '6', '8', '2', '2021-12-21 13:54:38.000000', NULL, NULL),
(1242, 'maa-rc', '0002', NULL, '4cpkvklidyg', NULL, NULL, '6', '8', '2', '2021-12-21 13:54:38.000000', NULL, NULL),
(1243, 'maa-rc', '0002', NULL, '4cpkvklidyh', NULL, NULL, '6', '8', '2', '2021-12-21 13:54:38.000000', NULL, NULL),
(1244, 'maa-rc', '0002', NULL, '4cpkvklidyi', NULL, NULL, '6', '8', '2', '2021-12-21 13:54:38.000000', NULL, NULL),
(1245, 'maa-rc', '0002', NULL, '4cpkvklidyj', NULL, NULL, '6', '8', '2', '2021-12-21 13:54:38.000000', NULL, NULL),
(1246, 'maa-rc', '0002', NULL, '4cpkvklidyk', NULL, NULL, '6', '8', '2', '2021-12-21 13:54:38.000000', NULL, NULL),
(1249, 'agi-rc', '0001', NULL, 'gtgkxfrg7gq', NULL, NULL, '2', '2', '2', '2021-12-21 14:14:08.000000', NULL, NULL),
(1253, 'agi-rc', '0001', NULL, 'gtgkxfrffzu', NULL, NULL, '2', '2', '2', '2021-12-21 14:14:08.000000', NULL, NULL),
(1278, 'maa-ir', '0002', NULL, '4cpkvklidzp', NULL, NULL, '1', '2', '3', '2021-12-22 14:17:03.000000', NULL, NULL),
(1279, 'maa-rc', '0002', NULL, '4cpkvklidyl', NULL, NULL, '6', '8', '2', '2021-12-23 14:58:58.000000', NULL, NULL),
(1280, 'maa-rc', '0002', NULL, '4cpkvklidym', NULL, NULL, '6', '8', '2', '2021-12-23 14:58:59.000000', NULL, NULL),
(1287, 'maa-rc', '0002', NULL, '4cpkvklidyt', NULL, NULL, '6', '8', '2', '2021-12-23 14:58:59.000000', NULL, NULL),
(1288, 'maa-rc', '0002', NULL, '4cpkvklidyu', NULL, NULL, '6', '8', '2', '2021-12-23 14:58:59.000000', NULL, NULL),
(1295, 'maa-rc', '0002', NULL, '1awkxiq39fa', NULL, NULL, '6', '8', '2', '2021-12-23 15:56:52.000000', NULL, NULL),
(1296, 'maa-rc', '0002', NULL, '1awkxiq39fb', NULL, NULL, NULL, NULL, NULL, '2021-12-23 15:56:52.000000', NULL, NULL),
(1297, 'maa-rc', '0002', NULL, '1awkxiq39f9', NULL, NULL, NULL, NULL, NULL, '2021-12-23 15:56:52.000000', NULL, NULL),
(1298, 'maa-ir', '0002', NULL, '4cpkvkliebc', NULL, NULL, NULL, NULL, NULL, '2021-12-23 16:11:17.000000', NULL, NULL),
(1299, 'maa-ir', '0002', NULL, '4cpkvkliebd', NULL, NULL, NULL, NULL, NULL, '2021-12-23 16:11:17.000000', NULL, NULL),
(1300, 'maa-ir', '0002', NULL, '4cpkvkliebe', NULL, NULL, '5', '7', '2', '2021-12-23 16:11:17.000000', NULL, NULL),
(1301, 'maa-ir', '0002', NULL, '4cpkvkliebf', NULL, NULL, '5', '7', '2', '2021-12-23 16:11:17.000000', NULL, NULL),
(1302, 'maa-ir', '0002', NULL, '4cpkvkliebb', NULL, NULL, '5', '7', '2', '2021-12-23 16:11:17.000000', NULL, NULL),
(1303, 'maa-ir', '0002', NULL, '4cpkvklieba', NULL, NULL, '5', '7', '2', '2021-12-23 16:11:17.000000', NULL, NULL),
(1304, 'maa-ir', '0002', NULL, '4cpkvklieb9', NULL, NULL, '5', '7', '2', '2021-12-23 16:11:18.000000', NULL, NULL),
(1305, 'maa-ir', '0002', NULL, '4cpkvklieb8', NULL, NULL, '5', '7', '2', '2021-12-23 16:11:18.000000', NULL, NULL),
(1311, 'maa-rc', '0002', NULL, '431kxjsrokj', NULL, NULL, '8', '9', '12', '2021-12-24 10:23:54.000000', NULL, NULL),
(1312, 'maa-rc', '0002', NULL, '431kxjsroki', NULL, NULL, '8', '9', '12', '2021-12-24 10:23:54.000000', NULL, NULL),
(1313, 'maa-rc', '0002', NULL, '431kxjsrokh', NULL, NULL, '8', '9', '12', '2021-12-24 10:23:54.000000', NULL, NULL),
(1314, 'maa-rc', '0002', NULL, '431kxjsrokg', NULL, NULL, '8', '9', '12', '2021-12-24 10:23:54.000000', NULL, NULL),
(1315, 'maa-rc', '0002', NULL, '431kxjsroko', NULL, NULL, '8', '9', '12', '2021-12-24 10:23:54.000000', NULL, NULL),
(1321, 'maa-ir', '0002', NULL, '431kxjsronz', NULL, NULL, NULL, NULL, NULL, '2021-12-24 11:02:20.000000', NULL, NULL),
(1322, 'maa-ir', '0002', NULL, '431kxjsroo0', NULL, NULL, '43', '23', '12', '2021-12-24 11:02:20.000000', NULL, NULL),
(1323, 'maa-ir', '0002', NULL, '431kxjsroo1', NULL, NULL, '43', '23', '12', '2021-12-24 11:02:20.000000', NULL, NULL),
(1324, 'maa-ir', '0002', NULL, '431kxjsroo2', NULL, NULL, '43', '23', '12', '2021-12-24 11:02:20.000000', NULL, NULL),
(1325, 'maa-ir', '0002', NULL, '431kxjsroo3', NULL, NULL, '43', '23', '12', '2021-12-24 11:02:20.000000', NULL, NULL),
(1326, 'maa-ir', '0002', NULL, '431kxjsronw', NULL, NULL, NULL, NULL, NULL, '2021-12-24 13:11:40.000000', NULL, NULL),
(1327, 'maa-ir', '0002', NULL, '431kxjsronx', NULL, NULL, NULL, NULL, NULL, '2021-12-24 13:11:40.000000', NULL, NULL),
(1328, 'maa-ir', '0002', NULL, '431kxjsrony', NULL, NULL, NULL, NULL, NULL, '2021-12-24 13:11:40.000000', NULL, NULL),
(1329, 'maa-ir', '0002', NULL, '431kxjsroo4', NULL, NULL, NULL, NULL, NULL, '2021-12-24 13:11:40.000000', NULL, NULL),
(1335, 'maa-rc', '0002', NULL, '1awkxiq39f7', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:50.000000', NULL, NULL),
(1336, 'maa-rc', '0002', NULL, '1awkxiq39f8', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:50.000000', NULL, NULL),
(1337, 'maa-rc', '0002', NULL, '431kxjsrokp', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:50.000000', NULL, NULL),
(1338, 'maa-rc', '0002', NULL, '431kxjsrokq', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:50.000000', NULL, NULL),
(1339, 'maa-rc', '0002', NULL, '431kxjsrokr', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:50.000000', NULL, NULL),
(1340, 'maa-rc', '0002', NULL, '431kxjsroks', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:50.000000', NULL, NULL),
(1341, 'maa-rc', '0002', NULL, '431kxjsrokt', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:50.000000', NULL, NULL),
(1342, 'maa-rc', '0002', NULL, '431kxjsroku', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:50.000000', NULL, NULL),
(1343, 'maa-rc', '0002', NULL, '431kxjsrokv', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:50.000000', NULL, NULL),
(1344, 'maa-rc', '0002', NULL, '431kxjsrokw', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:50.000000', NULL, NULL),
(1345, 'maa-rc', '0002', NULL, '431kxjsrokx', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:50.000000', NULL, NULL),
(1346, 'maa-rc', '0002', NULL, '431kxjsroky', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:50.000000', NULL, NULL),
(1347, 'maa-rc', '0002', NULL, '431kxjsrokz', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:50.000000', NULL, NULL),
(1348, 'maa-rc', '0002', NULL, '431kxjsrol0', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:50.000000', NULL, NULL),
(1349, 'maa-rc', '0002', NULL, '431kxjsrol1', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:50.000000', NULL, NULL),
(1350, 'maa-rc', '0002', NULL, '431kxjsrol2', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:50.000000', NULL, NULL),
(1351, 'maa-rc', '0002', NULL, '431kxjsrol3', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:50.000000', NULL, NULL),
(1352, 'maa-rc', '0002', NULL, '431kxjsrol4', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:50.000000', NULL, NULL),
(1353, 'maa-rc', '0002', NULL, '431kxjsrol5', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:50.000000', NULL, NULL),
(1354, 'maa-rc', '0002', NULL, '431kxjsrol6', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:50.000000', NULL, NULL),
(1355, 'maa-rc', '0002', NULL, '431kxjsrolc', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:50.000000', NULL, NULL),
(1356, 'maa-rc', '0002', NULL, '431kxjsrold', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:50.000000', NULL, NULL),
(1357, 'maa-rc', '0002', NULL, '431kxjsrole', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:50.000000', NULL, NULL),
(1358, 'maa-rc', '0002', NULL, '431kxjsrolf', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:50.000000', NULL, NULL),
(1359, 'maa-rc', '0002', NULL, '431kxjsrolg', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:50.000000', NULL, NULL),
(1360, 'maa-rc', '0002', NULL, '431kxjsrolh', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:50.000000', NULL, NULL),
(1361, 'maa-rc', '0002', NULL, '431kxjsroli', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:50.000000', NULL, NULL),
(1362, 'maa-rc', '0002', NULL, '431kxjsrolj', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:50.000000', NULL, NULL),
(1363, 'maa-rc', '0002', NULL, '431kxjsrolk', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:50.000000', NULL, NULL),
(1364, 'maa-rc', '0002', NULL, '431kxjsroll', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:50.000000', NULL, NULL),
(1365, 'maa-rc', '0002', NULL, '431kxjsrolm', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:50.000000', NULL, NULL),
(1366, 'maa-rc', '0002', NULL, '431kxjsroln', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:50.000000', NULL, NULL),
(1367, 'maa-rc', '0002', NULL, '431kxjsrolo', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:50.000000', NULL, NULL),
(1368, 'maa-rc', '0002', NULL, '431kxjsrolp', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:50.000000', NULL, NULL),
(1369, 'maa-rc', '0002', NULL, '431kxjsrolq', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:50.000000', NULL, NULL),
(1370, 'maa-rc', '0002', NULL, '431kxjsrolr', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:50.000000', NULL, NULL),
(1371, 'maa-rc', '0002', NULL, '431kxjsrols', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:50.000000', NULL, NULL),
(1372, 'maa-rc', '0002', NULL, '431kxjsrolt', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:50.000000', NULL, NULL),
(1373, 'maa-rc', '0002', NULL, '431kxjsrolu', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:50.000000', NULL, NULL),
(1374, 'maa-rc', '0002', NULL, '431kxjsrolv', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:50.000000', NULL, NULL),
(1375, 'maa-rc', '0002', NULL, '431kxjsrolw', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:50.000000', NULL, NULL),
(1376, 'maa-rc', '0002', NULL, '431kxjsrolx', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:50.000000', NULL, NULL),
(1377, 'maa-rc', '0002', NULL, '431kxjsroly', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:50.000000', NULL, NULL),
(1378, 'maa-rc', '0002', NULL, '431kxjsrolz', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:50.000000', NULL, NULL),
(1379, 'maa-rc', '0002', NULL, '431kxjsrom0', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:50.000000', NULL, NULL),
(1380, 'maa-rc', '0002', NULL, '431kxjsrom1', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:50.000000', NULL, NULL),
(1381, 'maa-rc', '0002', NULL, '431kxjsrom2', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:50.000000', NULL, NULL),
(1382, 'maa-rc', '0002', NULL, '431kxjsrom3', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:50.000000', NULL, NULL),
(1383, 'maa-rc', '0002', NULL, '431kxjsrom4', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:50.000000', NULL, NULL),
(1384, 'maa-rc', '0002', NULL, '431kxjsrom5', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:50.000000', NULL, NULL),
(1385, 'maa-rc', '0002', NULL, '431kxjsrom6', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:50.000000', NULL, NULL),
(1386, 'maa-rc', '0002', NULL, '431kxjsrom7', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:50.000000', NULL, NULL),
(1387, 'maa-rc', '0002', NULL, '431kxjsrom8', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:50.000000', NULL, NULL),
(1388, 'maa-rc', '0002', NULL, '431kxjsrom9', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:50.000000', NULL, NULL),
(1389, 'maa-rc', '0002', NULL, '431kxjsroma', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:50.000000', NULL, NULL),
(1390, 'maa-rc', '0002', NULL, '431kxjsromb', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:50.000000', NULL, NULL),
(1391, 'maa-rc', '0002', NULL, '431kxjsromc', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:50.000000', NULL, NULL),
(1392, 'maa-rc', '0002', NULL, '431kxjsromd', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:50.000000', NULL, NULL),
(1393, 'maa-rc', '0002', NULL, '431kxjsrome', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:50.000000', NULL, NULL),
(1394, 'maa-rc', '0002', NULL, '431kxjsromf', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:50.000000', NULL, NULL),
(1395, 'maa-rc', '0002', NULL, '431kxjsromg', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:50.000000', NULL, NULL),
(1396, 'maa-rc', '0002', NULL, '431kxjsromh', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:50.000000', NULL, NULL),
(1397, 'maa-rc', '0002', NULL, '431kxjsromi', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:50.000000', NULL, NULL),
(1398, 'maa-rc', '0002', NULL, '431kxjsromj', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:50.000000', NULL, NULL),
(1399, 'maa-rc', '0002', NULL, '431kxjsromk', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:50.000000', NULL, NULL),
(1400, 'maa-rc', '0002', NULL, '431kxjsroml', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:50.000000', NULL, NULL),
(1401, 'maa-rc', '0002', NULL, '431kxjsromm', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:50.000000', NULL, NULL),
(1412, 'maa-rc', '0002', NULL, '431kxjsromx', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:51.000000', NULL, NULL),
(1413, 'maa-rc', '0002', NULL, '431kxjsromy', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:51.000000', NULL, NULL),
(1414, 'maa-rc', '0002', NULL, '431kxjsromz', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:51.000000', NULL, NULL),
(1415, 'maa-rc', '0002', NULL, '431kxjsron0', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:51.000000', NULL, NULL),
(1416, 'maa-rc', '0002', NULL, '431kxjsron1', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:51.000000', NULL, NULL),
(1417, 'maa-rc', '0002', NULL, '431kxjsron2', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:51.000000', NULL, NULL),
(1418, 'maa-rc', '0002', NULL, '431kxjsron3', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:51.000000', NULL, NULL),
(1419, 'maa-rc', '0002', NULL, '431kxjsron4', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:51.000000', NULL, NULL),
(1420, 'maa-rc', '0002', NULL, '431kxjsron5', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:51.000000', NULL, NULL),
(1421, 'maa-rc', '0002', NULL, '431kxjsron6', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:51.000000', NULL, NULL),
(1422, 'maa-rc', '0002', NULL, '431kxjsron7', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:51.000000', NULL, NULL),
(1423, 'maa-rc', '0002', NULL, '431kxjsron8', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:51.000000', NULL, NULL),
(1424, 'maa-rc', '0002', NULL, '431kxjsron9', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:51.000000', NULL, NULL),
(1425, 'maa-rc', '0002', NULL, '431kxjsrona', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:51.000000', NULL, NULL),
(1426, 'maa-rc', '0002', NULL, '431kxjsronb', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:51.000000', NULL, NULL),
(1427, 'maa-rc', '0002', NULL, '431kxjsrone', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:51.000000', NULL, NULL),
(1428, 'maa-rc', '0002', NULL, '431kxjsronf', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:51.000000', NULL, NULL),
(1429, 'maa-rc', '0002', NULL, '431kxjsrong', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:51.000000', NULL, NULL),
(1430, 'maa-rc', '0002', NULL, '431kxjsronh', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:51.000000', NULL, NULL),
(1431, 'maa-rc', '0002', NULL, '431kxjsroni', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:51.000000', NULL, NULL),
(1432, 'maa-rc', '0002', NULL, '431kxjsronj', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:51.000000', NULL, NULL),
(1433, 'maa-rc', '0002', NULL, '431kxjsronk', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:51.000000', NULL, NULL),
(1434, 'maa-rc', '0002', NULL, '431kxjsronl', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:51.000000', NULL, NULL),
(1435, 'maa-rc', '0002', NULL, '431kxjsronm', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:51.000000', NULL, NULL),
(1436, 'maa-rc', '0002', NULL, '431kxjsronn', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:51.000000', NULL, NULL),
(1437, 'maa-rc', '0002', NULL, '431kxjsrono', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:51.000000', NULL, NULL),
(1438, 'maa-rc', '0002', NULL, '431kxjsronp', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:51.000000', NULL, NULL),
(1439, 'maa-rc', '0002', NULL, '431kxjsronq', NULL, NULL, NULL, NULL, NULL, '2021-12-24 14:16:51.000000', NULL, NULL),
(1440, '000i4t', '0003', NULL, '8h4ky1b7hol', NULL, NULL, '11', '11', '11', '2022-01-05 16:09:31.000000', NULL, NULL),
(1441, '000i4t', '0003', NULL, '8h4ky1b7hom', NULL, NULL, '11', '11', '11', '2022-01-05 16:09:31.000000', NULL, NULL),
(1442, '000i4t', '0003', NULL, '8h4ky1b7hon', NULL, NULL, '11', '11', '11', '2022-01-05 16:09:31.000000', NULL, NULL),
(1443, '000i4t', '0003', NULL, '8h4ky1b7hoo', NULL, NULL, '11', '11', '11', '2022-01-05 16:09:31.000000', NULL, NULL),
(1444, '000i4t', '0003', NULL, '8h4ky1b7hop', NULL, NULL, '11', '11', '11', '2022-01-05 16:09:31.000000', NULL, NULL),
(1445, '000i4t', '0003', NULL, '8h4ky1b7hoq', NULL, NULL, '11', '11', '11', '2022-01-05 16:09:31.000000', NULL, NULL),
(1446, '000i4t', '0003', NULL, '8h4ky1b7hor', NULL, NULL, '11', '11', '11', '2022-01-05 16:09:31.000000', NULL, NULL);

--
-- Trigger `Transaction_Monitoring`
--
DROP TRIGGER IF EXISTS `update history monitoring`;
DELIMITER $$
CREATE TRIGGER `update history monitoring` BEFORE INSERT ON `Transaction_Monitoring` FOR EACH ROW BEGIN
UPDATE history 
SET time_monitoring=NOW(),
status='Monitoring',
Device_ID =New.Device_ID,
last_update = NOW()
WHERE item_id=NEW.item_id;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Struktur dari tabel `Transaction_Order`
--

DROP TABLE IF EXISTS `Transaction_Order`;
CREATE TABLE `Transaction_Order` (
  `id` int(50) NOT NULL,
  `No_Order` text,
  `Order_Date` text,
  `Customer` text,
  `Address` text,
  `DN` varchar(50) DEFAULT NULL,
  `SKU` varchar(50) DEFAULT NULL,
  `Qty` int(50) DEFAULT NULL,
  `Status_QC` varchar(50) DEFAULT NULL,
  `Status_GI` varchar(50) DEFAULT NULL,
  `id_Account` varchar(50) DEFAULT NULL,
  `id_location` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `Transaction_Order`
--

INSERT INTO `Transaction_Order` (`id`, `No_Order`, `Order_Date`, `Customer`, `Address`, `DN`, `SKU`, `Qty`, `Status_QC`, `Status_GI`, `id_Account`, `id_location`) VALUES
(6366, '131', '26102021', 'PT Berkah Logistik', 'Papua', '23', 'SKU45', 1, 'yes', 'yes', '0002', NULL),
(6367, '141', '27102021', 'PT ABC', 'Bandung', '43', 'SKU89', 1, 'yes', 'yes', '0002', NULL),
(6368, '101', '27102021', 'PT DEF', 'Papua', '11', 'SKU123', 1, 'yes', 'yes', '0002', NULL),
(6370, '501', '27102021', 'PT GKL', 'Sulawesi', '12', 'SKU95', 1000, 'no', 'no', '0002', NULL),
(6371, '1', '27102021', 'PT DEF', 'Kalimantan Timur', '36', 'SKU111', 100, 'yes', 'yes', '0002', NULL),
(6372, '2', '27102021', 'PT GKL', 'Sulawesi', '12', 'SKU33', 100, 'yes', 'yes', '0002', NULL),
(6373, '9', '28102021', 'PT STL', 'Banten', '909', 'SKU09', 1, 'yes', 'yes', '0002', NULL),
(6374, '8754', '28102021', 'PT STL', 'Banten', '8754', 'SKU01', 3, 'no', 'no', '0002', NULL),
(6375, '4598', '28102021', 'PT A', 'Jakarta', '4598', 'SKU02', 21, 'yes', 'yes', '0002', NULL),
(6376, '9586', '28102021', 'PT B', 'Bali', '9586', 'SKU03', 1, 'no', 'no', '0002', NULL),
(6377, '45687', '28102021', 'PT C', 'Sulawesi', '45687', 'SKU04', 45, 'no', 'no', '0002', NULL),
(6378, '239', '28102021', 'PT D', 'Aceh', '239', 'SKU05', 6, 'no', 'no', '0002', NULL),
(6379, '4629', '28102021', 'PT E', 'Bandung', '4629', 'SKU06', 8, 'no', 'no', '0002', NULL),
(6380, '270', '28102021', 'PT F', 'Semarang', '270', 'SKU07', 5, 'no', 'no', '0002', NULL),
(6381, '1387', '28102021', 'PT G', 'Surabaya', '1387', 'SKU08', 2, 'no', 'no', '0002', NULL),
(6382, '1399', '28102021', 'PT H', 'Papua', '1399', 'SKU09', 4, 'no', 'no', '0002', NULL),
(6383, '16', '28102021', 'PT BNN', 'Surabaya', '16', 'SKU9908', 100, 'no', 'no', '0002', NULL),
(6384, '777', '28102021', 'PT BNN', 'Surabaya', '777', 'SKU890', 100, 'yes', 'yes', '0002', NULL),
(6385, '777', '28102021', 'PT BNN', 'Surabaya', '777', 'SKU890', 1, 'yes', 'yes', '0002', NULL),
(6386, '13', '2102021', 'PT ARINE', 'Kalimantan Barat', '13', 'SKU0013', 50, 'no', 'no', '0002', NULL),
(6390, '350', '3112021', 'Nurul Aini', 'Depok Jawa Barat', '350', 'SKU45', 1, 'yes', 'yes', '0002', NULL),
(6391, '444', '3112021', 'Nurul Aini', 'Depok Jawa Barat', '444', 'SKU456', 1, 'no', 'no', '0002', NULL),
(6392, '65396', '3112021', 'Nurul Aini', 'Depok Jawa Barat', '65396', 'SKU99', 1, 'yes', 'yes', '0002', NULL),
(6393, '96', '11/6/21', 'PT A', 'IPONDOH KOTA TANGERANG BANTEN', '96', 'SKU65396', 1, 'yes', 'yes', '0002', NULL),
(6394, '97', '11/7/21', 'PT B', 'KEBAYORAN BARU KOTA JAKARTA SELATAN DKI JAKARTA', '97', 'SKU65397', 1, 'no', 'no', '0002', NULL),
(6395, '65', '11/7/21', 'PT C', 'ULAU-PULAU ARU KAB. KEPULAUAN ARU MALUKU', '65', 'SKU65397', 1, 'no', 'no', '0002', NULL),
(6396, '11', '11/7/21', 'PT D', 'DENPASAR SELATAN KOTA DENPASAR BALIBOJONEGORO KAB. BOJONEGORO JAWA TIMUR', '11', 'SKU65411', 1, 'yes', 'yes', '0002', NULL),
(6397, '46', '11/7/21', 'PT E', 'BOJONEGORO KAB. BOJONEGORO JAWA TIMUR', '46', 'SKU65446', 1, 'no', 'no', '0002', NULL),
(6398, '47', '11/7/21', 'PT F', 'MEDAN SELAYANG KOTA MEDAN SUMATERA UTARA', '47', 'SKU65447', 1, 'no', 'no', '0002', NULL),
(6399, '48', '11/7/21', 'PT G', 'CAKUNG KOTA JAKARTA TIMUR DKI JAKARTA', '48', 'SKU65448', 1, 'no', 'no', '0002', NULL),
(6400, '54', '11/7/21', 'PT H', 'ETIA BUDI KOTA JAKARTA SELATAN DKI JAKARTA', '54', 'SKU65454', 1, 'no', 'no', '0002', NULL),
(6401, '36', '11/7/21', 'PT I', 'CIKOLE KOTA SUKABUMI JAWA BARAT', '36', 'SKU65436', 1, 'no', 'no', '0002', NULL),
(6402, '91', '11/7/21', 'PT J', 'KELAPA GADING KOTA JAKARTA UTARA DKI JAKARTA', '91', 'SKU65491', 1, 'no', 'no', '0002', NULL),
(6403, '97', '11/7/21', 'PT K', 'PANCATENGAH KAB. TASIKMALAYA JAWA BARAT', '97', 'SKU65497', 1, 'no', 'no', '0002', NULL),
(6404, '50', '11/6/21', 'PT L', 'BANJARSARI KOTA SURAKARTA (SOLO) JAWA TENGAH', '50', 'SKU65500', 1, 'no', 'no', '0002', NULL),
(6405, '19', '11/6/21', 'PT M', 'PENJARINGAN KOTA JAKARTA UTARA DKI JAKARTA', '19', 'SKU65519', 1, 'no', 'no', '0002', NULL),
(6406, '850', '11/6/21', 'PT STL', 'IPONDOH KOTA TANGERANG BANTEN', '850', '012', 1, 'no', 'no', '0002', NULL),
(6407, '852', '11/7/21', 'PT STL', 'KEBAYORAN BARU KOTA JAKARTA SELATAN DKI JAKARTA', '852', '025', 1, 'no', 'no', '0002', NULL),
(6408, '852', '11/7/21', 'PT STL', 'ULAU-PULAU ARU KAB. KEPULAUAN ARU MALUKU', '852', '026', 1, 'no', 'no', '0002', NULL),
(6409, '852', '11/7/21', 'PT STL', 'DENPASAR SELATAN KOTA DENPASAR BALIBOJONEGORO KAB. BOJONEGORO JAWA TIMUR', '852', '027', 1, 'no', 'no', '0002', NULL),
(6410, '852', '11/7/21', 'PT STL', 'BOJONEGORO KAB. BOJONEGORO JAWA TIMUR', '852', '028', 1, 'no', 'no', '0002', NULL),
(6411, '852', '11/7/21', 'PT STL', 'MEDAN SELAYANG KOTA MEDAN SUMATERA UTARA', '852', '029', 1, 'no', 'no', '0002', NULL),
(6412, '852', '11/7/21', 'PT STL', 'CAKUNG KOTA JAKARTA TIMUR DKI JAKARTA', '852', '030', 1, 'no', 'no', '0002', NULL),
(6413, '852', '11/7/21', 'PT STL', 'ETIA BUDI KOTA JAKARTA SELATAN DKI JAKARTA', '852', '031', 1, 'no', 'no', '0002', NULL),
(6414, '852', '11/7/21', 'PT STL', 'CIKOLE KOTA SUKABUMI JAWA BARAT', '852', '032', 1, 'no', 'no', '0002', NULL),
(6415, '852', '11/7/21', 'PT STL', 'KELAPA GADING KOTA JAKARTA UTARA DKI JAKARTA', '852', '033', 1, 'no', 'no', '0002', NULL),
(6416, '852', '11/7/21', 'PT STL', 'PANCATENGAH KAB. TASIKMALAYA JAWA BARAT', '852', '034', 1, 'no', 'no', '0002', NULL),
(6417, '847', '11/6/21', 'PT STL', 'BANJARSARI KOTA SURAKARTA (SOLO) JAWA TENGAH', '847', '103', 1, 'no', 'no', '0002', NULL),
(6418, '847', '11/6/21', 'PT STL', 'PENJARINGAN KOTA JAKARTA UTARA DKI JAKARTA', '847', '104', 1, 'no', 'no', '0002', NULL),
(6419, '852', '11/6/21', 'PT STL', 'IPONDOH KOTA TANGERANG BANTEN', '852', '170', 1, 'no', 'no', '0002', NULL),
(6420, '852', '11/6/21', 'PT STL', 'KEBAYORAN BARU KOTA JAKARTA SELATAN DKI JAKARTA', '852', '171', 1, 'no', 'no', '0002', NULL),
(6421, '852', '11/6/21', 'PT STL', 'ULAU-PULAU ARU KAB. KEPULAUAN ARU MALUKU', '852', '172', 1, 'no', 'no', '0002', NULL),
(6422, '852', '11/6/21', 'PT STL', 'DENPASAR SELATAN KOTA DENPASAR BALIBOJONEGORO KAB. BOJONEGORO JAWA TIMUR', '852', '173', 1, 'no', 'no', '0002', NULL),
(6423, '852', '11/6/21', 'PT STL', 'BOJONEGORO KAB. BOJONEGORO JAWA TIMUR', '852', '174', 1, 'no', 'no', '0002', NULL),
(6424, '852', '11/6/21', 'PT STL', 'MEDAN SELAYANG KOTA MEDAN SUMATERA UTARA', '852', '175', 1, 'no', 'no', '0002', NULL),
(6425, '852', '11/6/21', 'PT STL', 'CAKUNG KOTA JAKARTA TIMUR DKI JAKARTA', '852', '176', 1, 'no', 'no', '0002', NULL),
(6426, '852', '11/6/21', 'PT STL', 'ETIA BUDI KOTA JAKARTA SELATAN DKI JAKARTA', '852', '177', 1, 'no', 'no', '0002', NULL),
(6427, '852', '11/6/21', 'PT STL', 'CIKOLE KOTA SUKABUMI JAWA BARAT', '852', '178', 1, 'no', 'no', '0002', NULL),
(6428, '852', '11/6/21', 'PT STL', 'KELAPA GADING KOTA JAKARTA UTARA DKI JAKARTA', '852', '179', 1, 'no', 'no', '0002', NULL),
(6429, '849', '11/6/21', 'PT STL', 'PANCATENGAH KAB. TASIKMALAYA JAWA BARAT', '849', '215', 1, 'no', 'no', '0002', NULL),
(6430, '858', '11/6/21', 'PT STL', 'BANJARSARI KOTA SURAKARTA (SOLO) JAWA TENGAH', '858', '218', 1, 'no', 'no', '0002', NULL),
(6431, '858', '11/6/21', 'PT STL', 'PENJARINGAN KOTA JAKARTA UTARA DKI JAKARTA', '858', '219', 1, 'no', 'no', '0002', NULL),
(6432, '858', '11/6/21', 'PT STL', 'IPONDOH KOTA TANGERANG BANTEN', '858', '220', 1, 'no', 'no', '0002', NULL),
(6433, '858', '11/6/21', 'PT STL', 'KEBAYORAN BARU KOTA JAKARTA SELATAN DKI JAKARTA', '858', '221', 1, 'no', 'no', '0002', NULL),
(6434, '858', '11/6/21', 'PT STL', 'ULAU-PULAU ARU KAB. KEPULAUAN ARU MALUKU', '858', '222', 1, 'no', 'no', '0002', NULL),
(6435, '858', '11/6/21', 'PT STL', 'DENPASAR SELATAN KOTA DENPASAR BALIBOJONEGORO KAB. BOJONEGORO JAWA TIMUR', '858', '223', 1, 'no', 'no', '0002', NULL),
(6436, '858', '11/6/21', 'PT STL', 'BOJONEGORO KAB. BOJONEGORO JAWA TIMUR', '858', '224', 1, 'no', 'no', '0002', NULL),
(6437, '858', '11/6/21', 'PT STL', 'MEDAN SELAYANG KOTA MEDAN SUMATERA UTARA', '858', '225', 1, 'no', 'no', '0002', NULL),
(6438, '858', '11/6/21', 'PT STL', 'CAKUNG KOTA JAKARTA TIMUR DKI JAKARTA', '858', '226', 1, 'no', 'no', '0002', NULL),
(6439, '858', '11/6/21', 'PT STL', 'ETIA BUDI KOTA JAKARTA SELATAN DKI JAKARTA', '858', '227', 1, 'no', 'no', '0002', NULL),
(6440, '847', '11/6/21', 'PT STL', 'CIKOLE KOTA SUKABUMI JAWA BARAT', '847', '228', 1, 'no', 'no', '0002', NULL),
(6441, '847', '11/6/21', 'PT STL', 'KELAPA GADING KOTA JAKARTA UTARA DKI JAKARTA', '847', '229', 1, 'no', 'no', '0002', NULL),
(6442, '847', '11/6/21', 'PT STL', 'PANCATENGAH KAB. TASIKMALAYA JAWA BARAT', '847', '230', 1, 'no', 'no', '0002', NULL),
(6443, '847', '11/6/21', 'PT STL', 'BANJARSARI KOTA SURAKARTA (SOLO) JAWA TENGAH', '847', '232', 1, 'no', 'no', '0002', NULL),
(6444, '847', '11/6/21', 'PT STL', 'PENJARINGAN KOTA JAKARTA UTARA DKI JAKARTA', '847', '233', 1, 'no', 'no', '0002', NULL),
(6445, '847', '11/6/21', 'PT STL', 'IPONDOH KOTA TANGERANG BANTEN', '847', '234', 1, 'no', 'no', '0002', NULL),
(6446, '847', '11/6/21', 'PT STL', 'KEBAYORAN BARU KOTA JAKARTA SELATAN DKI JAKARTA', '847', '235', 1, 'no', 'no', '0002', NULL),
(6447, '847', '11/6/21', 'PT STL', 'ULAU-PULAU ARU KAB. KEPULAUAN ARU MALUKU', '847', '236', 1, 'no', 'no', '0002', NULL),
(6448, '847', '11/6/21', 'PT STL', 'DENPASAR SELATAN KOTA DENPASAR BALIBOJONEGORO KAB. BOJONEGORO JAWA TIMUR', '847', '237', 1, 'no', 'no', '0002', NULL),
(6449, '847', '11/6/21', 'PT STL', 'BOJONEGORO KAB. BOJONEGORO JAWA TIMUR', '847', '238', 1, 'no', 'no', '0002', NULL),
(6450, '847', '11/6/21', 'PT STL', 'MEDAN SELAYANG KOTA MEDAN SUMATERA UTARA', '847', '239', 1, 'no', 'no', '0002', NULL),
(6451, '847', '11/6/21', 'PT STL', 'CAKUNG KOTA JAKARTA TIMUR DKI JAKARTA', '847', '240', 1, 'no', 'no', '0002', NULL),
(6452, '847', '11/6/21', 'PT STL', 'ETIA BUDI KOTA JAKARTA SELATAN DKI JAKARTA', '847', '241', 1, 'no', 'no', '0002', NULL),
(6453, '847', '11/6/21', 'PT STL', 'CIKOLE KOTA SUKABUMI JAWA BARAT', '847', '242', 1, 'no', 'no', '0002', NULL),
(6454, '847', '11/6/21', 'PT STL', 'KELAPA GADING KOTA JAKARTA UTARA DKI JAKARTA', '847', '243', 1, 'no', 'no', '0002', NULL),
(6455, '847', '11/6/21', 'PT STL', 'PANCATENGAH KAB. TASIKMALAYA JAWA BARAT', '847', '244', 1, 'no', 'no', '0002', NULL),
(6456, '847', '11/6/21', 'PT STL', 'BANJARSARI KOTA SURAKARTA (SOLO) JAWA TENGAH', '847', '245', 1, 'no', 'no', '0002', NULL),
(6457, '847', '11/6/21', 'PT STL', 'PENJARINGAN KOTA JAKARTA UTARA DKI JAKARTA', '847', '246', 1, 'no', 'no', '0002', NULL),
(6458, '847', '11/6/21', 'PT STL', 'IPONDOH KOTA TANGERANG BANTEN', '847', '247', 1, 'no', 'no', '0002', NULL),
(6459, '847', '11/6/21', 'PT STL', 'KEBAYORAN BARU KOTA JAKARTA SELATAN DKI JAKARTA', '847', '248', 1, 'no', 'no', '0002', NULL),
(6460, '847', '11/6/21', 'PT STL', 'ULAU-PULAU ARU KAB. KEPULAUAN ARU MALUKU', '847', '249', 1, 'no', 'no', '0002', NULL),
(6461, '847', '11/6/21', 'PT STL', 'DENPASAR SELATAN KOTA DENPASAR BALIBOJONEGORO KAB. BOJONEGORO JAWA TIMUR', '847', '250', 1, 'no', 'no', '0002', NULL),
(6462, '847', '11/6/21', 'PT STL', 'BOJONEGORO KAB. BOJONEGORO JAWA TIMUR', '847', '251', 1, 'no', 'no', '0002', NULL),
(6463, '847', '11/6/21', 'PT STL', 'MEDAN SELAYANG KOTA MEDAN SUMATERA UTARA', '847', '252', 1, 'no', 'no', '0002', NULL),
(6464, '847', '11/6/21', 'PT STL', 'CAKUNG KOTA JAKARTA TIMUR DKI JAKARTA', '847', '253', 1, 'no', 'no', '0002', NULL),
(6465, '847', '11/6/21', 'PT STL', 'ETIA BUDI KOTA JAKARTA SELATAN DKI JAKARTA', '847', '254', 1, 'no', 'no', '0002', NULL),
(6466, '847', '11/6/21', 'PT STL', 'CIKOLE KOTA SUKABUMI JAWA BARAT', '847', '255', 1, 'no', 'no', '0002', NULL),
(6467, '847', '11/6/21', 'PT STL', 'KELAPA GADING KOTA JAKARTA UTARA DKI JAKARTA', '847', '256', 1, 'no', 'no', '0002', NULL),
(6468, '847', '11/6/21', 'PT STL', 'PANCATENGAH KAB. TASIKMALAYA JAWA BARAT', '847', '257', 1, 'no', 'no', '0002', NULL),
(6469, '847', '11/6/21', 'PT STL', 'BANJARSARI KOTA SURAKARTA (SOLO) JAWA TENGAH', '847', '258', 1, 'no', 'no', '0002', NULL),
(6470, '628', '11/6/21', 'PT STL', 'PENJARINGAN KOTA JAKARTA UTARA DKI JAKARTA', '628', '259', 1, 'no', 'no', '0002', NULL),
(6471, '859', '11/6/21', 'PT STL', 'IPONDOH KOTA TANGERANG BANTEN', '859', '259', 1, 'no', 'no', '0002', NULL),
(6472, '628', '11/6/21', 'PT STL', 'KEBAYORAN BARU KOTA JAKARTA SELATAN DKI JAKARTA', '628', '260', 1, 'no', 'no', '0002', NULL),
(6473, '846', '11/6/21', 'PT STL', 'ULAU-PULAU ARU KAB. KEPULAUAN ARU MALUKU', '846', '260', 1, 'no', 'no', '0002', NULL),
(6474, '847', '11/6/21', 'PT STL', 'DENPASAR SELATAN KOTA DENPASAR BALIBOJONEGORO KAB. BOJONEGORO JAWA TIMUR', '847', '260', 1, 'no', 'no', '0002', NULL),
(6475, '628', '11/6/21', 'PT STL', 'BOJONEGORO KAB. BOJONEGORO JAWA TIMUR', '628', '261', 1, 'no', 'no', '0002', NULL),
(6476, '846', '11/6/21', 'PT STL', 'MEDAN SELAYANG KOTA MEDAN SUMATERA UTARA', '846', '261', 1, 'no', 'no', '0002', NULL),
(6477, '847', '11/6/21', 'PT STL', 'CAKUNG KOTA JAKARTA TIMUR DKI JAKARTA', '847', '261', 1, 'no', 'no', '0002', NULL),
(6478, '847', '11/6/21', 'PT STL', 'ETIA BUDI KOTA JAKARTA SELATAN DKI JAKARTA', '847', '262', 1, 'no', 'no', '0002', NULL),
(6479, '846', '11/6/21', 'PT STL', 'CIKOLE KOTA SUKABUMI JAWA BARAT', '846', '263', 1, 'no', 'no', '0002', NULL),
(6480, '846', '11/6/21', 'PT STL', 'KELAPA GADING KOTA JAKARTA UTARA DKI JAKARTA', '846', '264', 1, 'no', 'no', '0002', NULL),
(6481, '847', '11/6/21', 'PT STL', 'PANCATENGAH KAB. TASIKMALAYA JAWA BARAT', '847', '264', 1, 'no', 'no', '0002', NULL),
(6482, '847', '11/6/21', 'PT STL', 'BANJARSARI KOTA SURAKARTA (SOLO) JAWA TENGAH', '847', '265', 1, 'no', 'no', '0002', NULL),
(6483, '846', '11/6/21', 'PT STL', 'PENJARINGAN KOTA JAKARTA UTARA DKI JAKARTA', '846', '266', 1, 'no', 'no', '0002', NULL),
(6484, '847', '11/6/21', 'PT STL', 'IPONDOH KOTA TANGERANG BANTEN', '847', '266', 1, 'no', 'no', '0002', NULL),
(6485, '846', '11/6/21', 'PT STL', 'KEBAYORAN BARU KOTA JAKARTA SELATAN DKI JAKARTA', '846', '267', 1, 'no', 'no', '0002', NULL),
(6486, '847', '11/6/21', 'PT STL', 'ULAU-PULAU ARU KAB. KEPULAUAN ARU MALUKU', '847', '267', 1, 'no', 'no', '0002', NULL),
(6487, '846', '11/6/21', 'PT STL', 'DENPASAR SELATAN KOTA DENPASAR BALIBOJONEGORO KAB. BOJONEGORO JAWA TIMUR', '846', '268', 1, 'no', 'no', '0002', NULL),
(6488, '847', '11/6/21', 'PT STL', 'BOJONEGORO KAB. BOJONEGORO JAWA TIMUR', '847', '268', 1, 'no', 'no', '0002', NULL),
(6489, '846', '11/6/21', 'PT STL', 'MEDAN SELAYANG KOTA MEDAN SUMATERA UTARA', '846', '269', 1, 'no', 'no', '0002', NULL),
(6490, '847', '11/6/21', 'PT STL', 'CAKUNG KOTA JAKARTA TIMUR DKI JAKARTA', '847', '269', 1, 'no', 'no', '0002', NULL),
(6491, '846', '11/6/21', 'PT STL', 'ETIA BUDI KOTA JAKARTA SELATAN DKI JAKARTA', '846', '270', 1, 'no', 'no', '0002', NULL),
(6492, '846', '11/6/21', 'PT STL', 'CIKOLE KOTA SUKABUMI JAWA BARAT', '846', '271', 1, 'no', 'no', '0002', NULL),
(6493, '846', '11/6/21', 'PT STL', 'KELAPA GADING KOTA JAKARTA UTARA DKI JAKARTA', '846', '272', 1, 'no', 'no', '0002', NULL),
(6494, '846', '11/6/21', 'PT STL', 'PANCATENGAH KAB. TASIKMALAYA JAWA BARAT', '846', '273', 1, 'no', 'no', '0002', NULL),
(6495, '847', '11/6/21', 'PT STL', 'BANJARSARI KOTA SURAKARTA (SOLO) JAWA TENGAH', '847', '273', 1, 'no', 'no', '0002', NULL),
(6496, '846', '11/6/21', 'PT STL', 'PENJARINGAN KOTA JAKARTA UTARA DKI JAKARTA', '846', '274', 1, 'no', 'no', '0002', NULL),
(6497, '847', '11/6/21', 'PT STL', 'IPONDOH KOTA TANGERANG BANTEN', '847', '274', 1, 'no', 'no', '0002', NULL),
(6498, '846', '11/6/21', 'PT STL', 'KEBAYORAN BARU KOTA JAKARTA SELATAN DKI JAKARTA', '846', '275', 1, 'no', 'no', '0002', NULL),
(6499, '847', '11/6/21', 'PT STL', 'ULAU-PULAU ARU KAB. KEPULAUAN ARU MALUKU', '847', '275', 1, 'no', 'no', '0002', NULL),
(6500, '846', '11/6/21', 'PT STL', 'DENPASAR SELATAN KOTA DENPASAR BALIBOJONEGORO KAB. BOJONEGORO JAWA TIMUR', '846', '276', 1, 'no', 'no', '0002', NULL),
(6501, '847', '11/6/21', 'PT STL', 'BOJONEGORO KAB. BOJONEGORO JAWA TIMUR', '847', '276', 1, 'no', 'no', '0002', NULL),
(6502, '861', '11/6/21', 'PT STL', 'MEDAN SELAYANG KOTA MEDAN SUMATERA UTARA', '861', '276', 1, 'no', 'no', '0002', NULL),
(6503, '846', '11/6/21', 'PT STL', 'CAKUNG KOTA JAKARTA TIMUR DKI JAKARTA', '846', '277', 1, 'no', 'no', '0002', NULL),
(6504, '847', '11/6/21', 'PT STL', 'ETIA BUDI KOTA JAKARTA SELATAN DKI JAKARTA', '847', '277', 1, 'no', 'no', '0002', NULL),
(6505, '846', '11/6/21', 'PT STL', 'CIKOLE KOTA SUKABUMI JAWA BARAT', '846', '278', 1, 'no', 'no', '0002', NULL),
(6506, '846', '11/6/21', 'PT STL', 'KELAPA GADING KOTA JAKARTA UTARA DKI JAKARTA', '846', '279', 1, 'no', 'no', '0002', NULL),
(6507, '861', '11/6/21', 'PT STL', 'PANCATENGAH KAB. TASIKMALAYA JAWA BARAT', '861', '279', 1, 'no', 'no', '0002', NULL),
(6508, '846', '11/6/21', 'PT STL', 'BANJARSARI KOTA SURAKARTA (SOLO) JAWA TENGAH', '846', '280', 1, 'no', 'no', '0002', NULL),
(6509, '861', '11/6/21', 'PT STL', 'PENJARINGAN KOTA JAKARTA UTARA DKI JAKARTA', '861', '280', 1, 'no', 'no', '0002', NULL),
(6510, '846', '11/6/21', 'PT STL', 'IPONDOH KOTA TANGERANG BANTEN', '846', '281', 1, 'no', 'no', '0002', NULL),
(6511, '846', '11/6/21', 'PT STL', 'KEBAYORAN BARU KOTA JAKARTA SELATAN DKI JAKARTA', '846', '282', 1, 'no', 'no', '0002', NULL),
(6512, '846', '11/6/21', 'PT STL', 'ULAU-PULAU ARU KAB. KEPULAUAN ARU MALUKU', '846', '283', 1, 'no', 'no', '0002', NULL),
(6513, '846', '11/6/21', 'PT STL', 'DENPASAR SELATAN KOTA DENPASAR BALIBOJONEGORO KAB. BOJONEGORO JAWA TIMUR', '846', '284', 1, 'no', 'no', '0002', NULL),
(6514, '846', '11/6/21', 'PT STL', 'BOJONEGORO KAB. BOJONEGORO JAWA TIMUR', '846', '285', 1, 'no', 'no', '0002', NULL),
(6515, '846', '11/6/21', 'PT STL', 'MEDAN SELAYANG KOTA MEDAN SUMATERA UTARA', '846', '286', 1, 'no', 'no', '0002', NULL),
(6516, '846', '11/6/21', 'PT STL', 'CAKUNG KOTA JAKARTA TIMUR DKI JAKARTA', '846', '287', 1, 'no', 'no', '0002', NULL),
(6517, '846', '11/6/21', 'PT STL', 'ETIA BUDI KOTA JAKARTA SELATAN DKI JAKARTA', '846', '288', 1, 'no', 'no', '0002', NULL),
(6518, '846', '11/6/21', 'PT STL', 'CIKOLE KOTA SUKABUMI JAWA BARAT', '846', '289', 1, 'no', 'no', '0002', NULL),
(6519, '846', '11/6/21', 'PT STL', 'KELAPA GADING KOTA JAKARTA UTARA DKI JAKARTA', '846', '290', 1, 'no', 'no', '0002', NULL),
(6520, '846', '11/6/21', 'PT STL', 'PANCATENGAH KAB. TASIKMALAYA JAWA BARAT', '846', '291', 1, 'no', 'no', '0002', NULL),
(6521, '847', '11/6/21', 'PT STL', 'BANJARSARI KOTA SURAKARTA (SOLO) JAWA TENGAH', '847', '291', 1, 'no', 'no', '0002', NULL),
(6522, '846', '11/6/21', 'PT STL', 'PENJARINGAN KOTA JAKARTA UTARA DKI JAKARTA', '846', '292', 1, 'no', 'no', '0002', NULL),
(6523, '846', '11/6/21', 'PT STL', 'IPONDOH KOTA TANGERANG BANTEN', '846', '293', 1, 'no', 'no', '0002', NULL),
(6524, '846', '11/6/21', 'PT STL', 'KEBAYORAN BARU KOTA JAKARTA SELATAN DKI JAKARTA', '846', '294', 1, 'no', 'no', '0002', NULL),
(6525, '846', '11/6/21', 'PT STL', 'ULAU-PULAU ARU KAB. KEPULAUAN ARU MALUKU', '846', '295', 1, 'no', 'no', '0002', NULL),
(6526, '846', '11/6/21', 'PT STL', 'DENPASAR SELATAN KOTA DENPASAR BALIBOJONEGORO KAB. BOJONEGORO JAWA TIMUR', '846', '296', 1, 'no', 'no', '0002', NULL),
(6527, '846', '11/6/21', 'PT STL', 'BOJONEGORO KAB. BOJONEGORO JAWA TIMUR', '846', '297', 1, 'no', 'no', '0002', NULL),
(6528, '846', '11/6/21', 'PT STL', 'MEDAN SELAYANG KOTA MEDAN SUMATERA UTARA', '846', '298', 1, 'no', 'no', '0002', NULL),
(6529, '846', '11/6/21', 'PT STL', 'CAKUNG KOTA JAKARTA TIMUR DKI JAKARTA', '846', '299', 1, 'no', 'no', '0002', NULL),
(6530, '846', '11/6/21', 'PT STL', 'ETIA BUDI KOTA JAKARTA SELATAN DKI JAKARTA', '846', '300', 1, 'no', 'no', '0002', NULL),
(6531, '846', '11/6/21', 'PT STL', 'CIKOLE KOTA SUKABUMI JAWA BARAT', '846', '301', 1, 'no', 'no', '0002', NULL),
(6532, '846', '11/6/21', 'PT STL', 'KELAPA GADING KOTA JAKARTA UTARA DKI JAKARTA', '846', '302', 1, 'no', 'no', '0002', NULL),
(6533, '846', '11/6/21', 'PT STL', 'PANCATENGAH KAB. TASIKMALAYA JAWA BARAT', '846', '303', 1, 'no', 'no', '0002', NULL),
(6534, '846', '11/6/21', 'PT STL', 'BANJARSARI KOTA SURAKARTA (SOLO) JAWA TENGAH', '846', '304', 1, 'no', 'no', '0002', NULL),
(6535, '846', '11/6/21', 'PT STL', 'PENJARINGAN KOTA JAKARTA UTARA DKI JAKARTA', '846', '305', 1, 'no', 'no', '0002', NULL),
(6536, '846', '11/6/21', 'PT STL', 'IPONDOH KOTA TANGERANG BANTEN', '846', '306', 1, 'no', 'no', '0002', NULL),
(6537, '846', '11/6/21', 'PT STL', 'KEBAYORAN BARU KOTA JAKARTA SELATAN DKI JAKARTA', '846', '307', 1, 'no', 'no', '0002', NULL),
(6538, '846', '11/6/21', 'PT STL', 'ULAU-PULAU ARU KAB. KEPULAUAN ARU MALUKU', '846', '308', 1, 'no', 'no', '0002', NULL),
(6539, '846', '11/6/21', 'PT STL', 'DENPASAR SELATAN KOTA DENPASAR BALIBOJONEGORO KAB. BOJONEGORO JAWA TIMUR', '846', '309', 1, 'no', 'no', '0002', NULL),
(6540, '846', '11/6/21', 'PT STL', 'BOJONEGORO KAB. BOJONEGORO JAWA TIMUR', '846', '310', 1, 'no', 'no', '0002', NULL),
(6541, '846', '11/6/21', 'PT STL', 'MEDAN SELAYANG KOTA MEDAN SUMATERA UTARA', '846', '311', 1, 'no', 'no', '0002', NULL),
(6542, '846', '11/6/21', 'PT STL', 'CAKUNG KOTA JAKARTA TIMUR DKI JAKARTA', '846', '312', 1, 'no', 'no', '0002', NULL),
(6543, '846', '11/6/21', 'PT STL', 'ETIA BUDI KOTA JAKARTA SELATAN DKI JAKARTA', '846', '313', 1, 'no', 'no', '0002', NULL),
(6544, '846', '11/6/21', 'PT STL', 'CIKOLE KOTA SUKABUMI JAWA BARAT', '846', '314', 1, 'no', 'no', '0002', NULL),
(6545, '846', '11/6/21', 'PT STL', 'KELAPA GADING KOTA JAKARTA UTARA DKI JAKARTA', '846', '315', 1, 'no', 'no', '0002', NULL),
(6546, '846', '11/6/21', 'PT STL', 'PANCATENGAH KAB. TASIKMALAYA JAWA BARAT', '846', '316', 1, 'no', 'no', '0002', NULL),
(6547, '846', '11/6/21', 'PT STL', 'BANJARSARI KOTA SURAKARTA (SOLO) JAWA TENGAH', '846', '317', 1, 'no', 'no', '0002', NULL),
(6548, '846', '11/6/21', 'PT STL', 'PENJARINGAN KOTA JAKARTA UTARA DKI JAKARTA', '846', '318', 1, 'no', 'no', '0002', NULL),
(6549, '846', '11/6/21', 'PT STL', 'IPONDOH KOTA TANGERANG BANTEN', '846', '319', 1, 'no', 'no', '0002', NULL),
(6550, '846', '11/6/21', 'PT STL', 'KEBAYORAN BARU KOTA JAKARTA SELATAN DKI JAKARTA', '846', '320', 1, 'no', 'no', '0002', NULL),
(6551, '846', '11/6/21', 'PT STL', 'ULAU-PULAU ARU KAB. KEPULAUAN ARU MALUKU', '846', '321', 1, 'no', 'no', '0002', NULL),
(6552, '846', '11/6/21', 'PT STL', 'DENPASAR SELATAN KOTA DENPASAR BALIBOJONEGORO KAB. BOJONEGORO JAWA TIMUR', '846', '322', 1, 'no', 'no', '0002', NULL),
(6553, '846', '11/6/21', 'PT STL', 'BOJONEGORO KAB. BOJONEGORO JAWA TIMUR', '846', '323', 1, 'no', 'no', '0002', NULL),
(6554, '846', '11/6/21', 'PT STL', 'MEDAN SELAYANG KOTA MEDAN SUMATERA UTARA', '846', '324', 1, 'no', 'no', '0002', NULL),
(6555, '849', '11/6/21', 'PT STL', 'CAKUNG KOTA JAKARTA TIMUR DKI JAKARTA', '849', '324', 1, 'no', 'no', '0002', NULL),
(6556, '849', '11/6/21', 'PT STL', 'ETIA BUDI KOTA JAKARTA SELATAN DKI JAKARTA', '849', '325', 1, 'no', 'no', '0002', NULL),
(6557, '846', '11/6/21', 'PT STL', 'CIKOLE KOTA SUKABUMI JAWA BARAT', '846', '326', 1, 'no', 'no', '0002', NULL),
(6558, '849', '11/6/21', 'PT STL', 'KELAPA GADING KOTA JAKARTA UTARA DKI JAKARTA', '849', '326', 1, 'no', 'no', '0002', NULL),
(6559, '846', '11/6/21', 'PT STL', 'PANCATENGAH KAB. TASIKMALAYA JAWA BARAT', '846', '327', 1, 'no', 'no', '0002', NULL),
(6560, '849', '11/6/21', 'PT STL', 'BANJARSARI KOTA SURAKARTA (SOLO) JAWA TENGAH', '849', '327', 1, 'no', 'no', '0002', NULL),
(6561, '849', '11/6/21', 'PT STL', 'PENJARINGAN KOTA JAKARTA UTARA DKI JAKARTA', '849', '328', 1, 'no', 'no', '0002', NULL),
(6562, '846', '11/6/21', 'PT STL', 'IPONDOH KOTA TANGERANG BANTEN', '846', '329', 1, 'no', 'no', '0002', NULL),
(6563, '849', '11/6/21', 'PT STL', 'KEBAYORAN BARU KOTA JAKARTA SELATAN DKI JAKARTA', '849', '329', 1, 'no', 'no', '0002', NULL),
(6564, '846', '11/6/21', 'PT STL', 'ULAU-PULAU ARU KAB. KEPULAUAN ARU MALUKU', '846', '330', 1, 'no', 'no', '0002', NULL),
(6565, '849', '11/6/21', 'PT STL', 'DENPASAR SELATAN KOTA DENPASAR BALIBOJONEGORO KAB. BOJONEGORO JAWA TIMUR', '849', '330', 1, 'no', 'no', '0002', NULL),
(6566, '846', '11/6/21', 'PT STL', 'BOJONEGORO KAB. BOJONEGORO JAWA TIMUR', '846', '331', 1, 'no', 'no', '0002', NULL),
(6567, '849', '11/6/21', 'PT STL', 'MEDAN SELAYANG KOTA MEDAN SUMATERA UTARA', '849', '331', 1, 'no', 'no', '0002', NULL),
(6568, '846', '11/6/21', 'PT STL', 'CAKUNG KOTA JAKARTA TIMUR DKI JAKARTA', '846', '332', 1, 'no', 'no', '0002', NULL),
(6569, '849', '11/6/21', 'PT STL', 'ETIA BUDI KOTA JAKARTA SELATAN DKI JAKARTA', '849', '332', 1, 'no', 'no', '0002', NULL),
(6570, '849', '11/6/21', 'PT STL', 'CIKOLE KOTA SUKABUMI JAWA BARAT', '849', '333', 1, 'no', 'no', '0002', NULL),
(6571, '846', '11/6/21', 'PT STL', 'KELAPA GADING KOTA JAKARTA UTARA DKI JAKARTA', '846', '334', 1, 'no', 'no', '0002', NULL),
(6572, '849', '11/6/21', 'PT STL', 'PANCATENGAH KAB. TASIKMALAYA JAWA BARAT', '849', '334', 1, 'no', 'no', '0002', NULL),
(6573, '846', '11/6/21', 'PT STL', 'BANJARSARI KOTA SURAKARTA (SOLO) JAWA TENGAH', '846', '335', 1, 'no', 'no', '0002', NULL),
(6574, '849', '11/6/21', 'PT STL', 'PENJARINGAN KOTA JAKARTA UTARA DKI JAKARTA', '849', '335', 1, 'no', 'no', '0002', NULL),
(6575, '849', '11/6/21', 'PT STL', 'IPONDOH KOTA TANGERANG BANTEN', '849', '336', 1, 'no', 'no', '0002', NULL),
(6576, '846', '11/6/21', 'PT STL', 'KEBAYORAN BARU KOTA JAKARTA SELATAN DKI JAKARTA', '846', '337', 1, 'no', 'no', '0002', NULL),
(6577, '849', '11/6/21', 'PT STL', 'ULAU-PULAU ARU KAB. KEPULAUAN ARU MALUKU', '849', '337', 1, 'no', 'no', '0002', NULL),
(6578, '846', '11/6/21', 'PT STL', 'DENPASAR SELATAN KOTA DENPASAR BALIBOJONEGORO KAB. BOJONEGORO JAWA TIMUR', '846', '338', 1, 'no', 'no', '0002', NULL),
(6579, '849', '11/6/21', 'PT STL', 'BOJONEGORO KAB. BOJONEGORO JAWA TIMUR', '849', '338', 1, 'no', 'no', '0002', NULL),
(6580, '846', '11/6/21', 'PT STL', 'MEDAN SELAYANG KOTA MEDAN SUMATERA UTARA', '846', '339', 1, 'no', 'no', '0002', NULL),
(6581, '849', '11/6/21', 'PT STL', 'CAKUNG KOTA JAKARTA TIMUR DKI JAKARTA', '849', '339', 1, 'no', 'no', '0002', NULL),
(6582, '849', '11/6/21', 'PT STL', 'ETIA BUDI KOTA JAKARTA SELATAN DKI JAKARTA', '849', '340', 1, 'no', 'no', '0002', NULL),
(6583, '849', '11/6/21', 'PT STL', 'CIKOLE KOTA SUKABUMI JAWA BARAT', '849', '341', 1, 'no', 'no', '0002', NULL),
(6584, '849', '11/6/21', 'PT STL', 'KELAPA GADING KOTA JAKARTA UTARA DKI JAKARTA', '849', '342', 1, 'no', 'no', '0002', NULL),
(6585, '846', '11/6/21', 'PT STL', 'PANCATENGAH KAB. TASIKMALAYA JAWA BARAT', '846', '343', 1, 'no', 'no', '0002', NULL),
(6586, '849', '11/6/21', 'PT STL', 'BANJARSARI KOTA SURAKARTA (SOLO) JAWA TENGAH', '849', '343', 1, 'no', 'no', '0002', NULL),
(6587, '849', '11/6/21', 'PT STL', 'PENJARINGAN KOTA JAKARTA UTARA DKI JAKARTA', '849', '344', 1, 'no', 'no', '0002', NULL),
(6588, '846', '11/6/21', 'PT STL', 'IPONDOH KOTA TANGERANG BANTEN', '846', '348', 1, 'no', 'no', '0002', NULL),
(6589, '807', '11/6/21', 'PT STL', 'KEBAYORAN BARU KOTA JAKARTA SELATAN DKI JAKARTA', '807', '351', 1, 'no', 'no', '0002', NULL),
(6590, '846', '11/6/21', 'PT STL', 'ULAU-PULAU ARU KAB. KEPULAUAN ARU MALUKU', '846', '351', 1, 'no', 'no', '0002', NULL),
(6591, '807', '11/6/21', 'PT STL', 'DENPASAR SELATAN KOTA DENPASAR BALIBOJONEGORO KAB. BOJONEGORO JAWA TIMUR', '807', '352', 1, 'no', 'no', '0002', NULL),
(6592, '846', '11/6/21', 'PT STL', 'BOJONEGORO KAB. BOJONEGORO JAWA TIMUR', '846', '352', 1, 'no', 'no', '0002', NULL),
(6593, '807', '11/6/21', 'PT STL', 'MEDAN SELAYANG KOTA MEDAN SUMATERA UTARA', '807', '353', 1, 'no', 'no', '0002', NULL),
(6594, '846', '11/6/21', 'PT STL', 'CAKUNG KOTA JAKARTA TIMUR DKI JAKARTA', '846', '353', 1, 'no', 'no', '0002', NULL),
(6595, '807', '11/6/21', 'PT STL', 'ETIA BUDI KOTA JAKARTA SELATAN DKI JAKARTA', '807', '354', 1, 'no', 'no', '0002', NULL),
(6596, '807', '11/6/21', 'PT STL', 'CIKOLE KOTA SUKABUMI JAWA BARAT', '807', '355', 1, 'no', 'no', '0002', NULL),
(6597, '807', '11/6/21', 'PT STL', 'KELAPA GADING KOTA JAKARTA UTARA DKI JAKARTA', '807', '356', 1, 'no', 'no', '0002', NULL),
(6598, '807', '11/6/21', 'PT STL', 'PANCATENGAH KAB. TASIKMALAYA JAWA BARAT', '807', '357', 1, 'no', 'no', '0002', NULL),
(6599, '807', '11/6/21', 'PT STL', 'BANJARSARI KOTA SURAKARTA (SOLO) JAWA TENGAH', '807', '365', 1, 'no', 'no', '0002', NULL),
(6600, '807', '11/6/21', 'PT STL', 'PENJARINGAN KOTA JAKARTA UTARA DKI JAKARTA', '807', '366', 1, 'no', 'no', '0002', NULL),
(6601, '807', '11/6/21', 'PT STL', 'IPONDOH KOTA TANGERANG BANTEN', '807', '367', 1, 'no', 'no', '0002', NULL),
(6602, '807', '11/6/21', 'PT STL', 'KEBAYORAN BARU KOTA JAKARTA SELATAN DKI JAKARTA', '807', '368', 1, 'no', 'no', '0002', NULL),
(6603, '807', '11/6/21', 'PT STL', 'ULAU-PULAU ARU KAB. KEPULAUAN ARU MALUKU', '807', '369', 1, 'no', 'no', '0002', NULL),
(6604, '807', '11/6/21', 'PT STL', 'DENPASAR SELATAN KOTA DENPASAR BALIBOJONEGORO KAB. BOJONEGORO JAWA TIMUR', '807', '371', 1, 'no', 'no', '0002', NULL),
(6605, '807', '11/6/21', 'PT STL', 'BOJONEGORO KAB. BOJONEGORO JAWA TIMUR', '807', '372', 1, 'no', 'no', '0002', NULL),
(6606, '807', '11/6/21', 'PT STL', 'MEDAN SELAYANG KOTA MEDAN SUMATERA UTARA', '807', '373', 1, 'no', 'no', '0002', NULL),
(6607, '807', '11/6/21', 'PT STL', 'CAKUNG KOTA JAKARTA TIMUR DKI JAKARTA', '807', '374', 1, 'no', 'no', '0002', NULL),
(6608, '807', '11/6/21', 'PT STL', 'ETIA BUDI KOTA JAKARTA SELATAN DKI JAKARTA', '807', '375', 1, 'no', 'no', '0002', NULL),
(6609, '807', '11/6/21', 'PT STL', 'CIKOLE KOTA SUKABUMI JAWA BARAT', '807', '376', 1, 'no', 'no', '0002', NULL),
(6610, '807', '11/6/21', 'PT STL', 'KELAPA GADING KOTA JAKARTA UTARA DKI JAKARTA', '807', '377', 1, 'no', 'no', '0002', NULL),
(6611, '807', '11/6/21', 'PT STL', 'PANCATENGAH KAB. TASIKMALAYA JAWA BARAT', '807', '388', 1, 'no', 'no', '0002', NULL),
(6612, '855', '11/6/21', 'PT STL', 'BANJARSARI KOTA SURAKARTA (SOLO) JAWA TENGAH', '855', '388', 1, 'yes', 'yes', '0002', NULL),
(6613, '807', '11/6/21', 'PT STL', 'PENJARINGAN KOTA JAKARTA UTARA DKI JAKARTA', '807', '389', 1, 'no', 'no', '0002', NULL),
(6614, '855', '11/6/21', 'PT STL', 'IPONDOH KOTA TANGERANG BANTEN', '855', '389', 1, 'yes', 'yes', '0002', NULL),
(6615, '807', '11/6/21', 'PT STL', 'KEBAYORAN BARU KOTA JAKARTA SELATAN DKI JAKARTA', '807', '390', 1, 'no', 'no', '0002', NULL),
(6616, '855', '11/6/21', 'PT STL', 'ULAU-PULAU ARU KAB. KEPULAUAN ARU MALUKU', '855', '390', 1, 'yes', 'yes', '0002', NULL),
(6617, '807', '11/6/21', 'PT STL', 'DENPASAR SELATAN KOTA DENPASAR BALIBOJONEGORO KAB. BOJONEGORO JAWA TIMUR', '807', '391', 1, 'no', 'no', '0002', NULL),
(6618, '855', '11/6/21', 'PT STL', 'BOJONEGORO KAB. BOJONEGORO JAWA TIMUR', '855', '391', 1, 'yes', 'yes', '0002', NULL),
(6619, '807', '11/6/21', 'PT STL', 'MEDAN SELAYANG KOTA MEDAN SUMATERA UTARA', '807', '392', 1, 'no', 'no', '0002', NULL),
(6620, '855', '11/6/21', 'PT STL', 'CAKUNG KOTA JAKARTA TIMUR DKI JAKARTA', '855', '392', 1, 'yes', 'yes', '0002', NULL),
(6621, '807', '11/6/21', 'PT STL', 'ETIA BUDI KOTA JAKARTA SELATAN DKI JAKARTA', '807', '393', 1, 'no', 'no', '0002', NULL),
(6622, '855', '11/6/21', 'PT STL', 'CIKOLE KOTA SUKABUMI JAWA BARAT', '855', '393', 1, 'yes', 'yes', '0002', NULL),
(6623, '807', '11/6/21', 'PT STL', 'KELAPA GADING KOTA JAKARTA UTARA DKI JAKARTA', '807', '427', 1, 'no', 'no', '0002', NULL),
(6624, '807', '11/6/21', 'PT STL', 'PANCATENGAH KAB. TASIKMALAYA JAWA BARAT', '807', '429', 1, 'no', 'no', '0002', NULL),
(6625, '807', '11/6/21', 'PT STL', 'BANJARSARI KOTA SURAKARTA (SOLO) JAWA TENGAH', '807', '430', 1, 'no', 'no', '0002', NULL),
(6626, '807', '11/6/21', 'PT STL', 'PENJARINGAN KOTA JAKARTA UTARA DKI JAKARTA', '807', '431', 1, 'no', 'no', '0002', NULL),
(6627, '807', '11/6/21', 'PT STL', 'IPONDOH KOTA TANGERANG BANTEN', '807', '432', 1, 'no', 'no', '0002', NULL),
(6628, '807', '11/6/21', 'PT STL', 'KEBAYORAN BARU KOTA JAKARTA SELATAN DKI JAKARTA', '807', '433', 1, 'no', 'no', '0002', NULL),
(6629, '807', '11/6/21', 'PT STL', 'ULAU-PULAU ARU KAB. KEPULAUAN ARU MALUKU', '807', '434', 1, 'no', 'no', '0002', NULL),
(6630, '807', '11/6/21', 'PT STL', 'DENPASAR SELATAN KOTA DENPASAR BALIBOJONEGORO KAB. BOJONEGORO JAWA TIMUR', '807', '435', 1, 'no', 'no', '0002', NULL),
(6631, '807', '11/6/21', 'PT STL', 'BOJONEGORO KAB. BOJONEGORO JAWA TIMUR', '807', '436', 1, 'no', 'no', '0002', NULL),
(6632, '807', '11/6/21', 'PT STL', 'MEDAN SELAYANG KOTA MEDAN SUMATERA UTARA', '807', '437', 1, 'no', 'no', '0002', NULL),
(6633, '807', '11/6/21', 'PT STL', 'CAKUNG KOTA JAKARTA TIMUR DKI JAKARTA', '807', '441', 1, 'no', 'no', '0002', NULL),
(6634, '807', '11/6/21', 'PT STL', 'ETIA BUDI KOTA JAKARTA SELATAN DKI JAKARTA', '807', '442', 1, 'no', 'no', '0002', NULL),
(6635, '807', '11/6/21', 'PT STL', 'CIKOLE KOTA SUKABUMI JAWA BARAT', '807', '443', 1, 'no', 'no', '0002', NULL),
(6636, '807', '11/6/21', 'PT STL', 'KELAPA GADING KOTA JAKARTA UTARA DKI JAKARTA', '807', '444', 1, 'no', 'no', '0002', NULL),
(6637, '807', '11/6/21', 'PT STL', 'PANCATENGAH KAB. TASIKMALAYA JAWA BARAT', '807', '445', 1, 'no', 'no', '0002', NULL),
(6638, '807', '11/6/21', 'PT STL', 'BANJARSARI KOTA SURAKARTA (SOLO) JAWA TENGAH', '807', '446', 1, 'no', 'no', '0002', NULL),
(6639, '807', '11/6/21', 'PT STL', 'PENJARINGAN KOTA JAKARTA UTARA DKI JAKARTA', '807', '447', 1, 'no', 'no', '0002', NULL),
(6640, '807', '11/6/21', 'PT STL', 'IPONDOH KOTA TANGERANG BANTEN', '807', '448', 1, 'no', 'no', '0002', NULL),
(6641, '807', '11/6/21', 'PT STL', 'KEBAYORAN BARU KOTA JAKARTA SELATAN DKI JAKARTA', '807', '449', 1, 'no', 'no', '0002', NULL),
(6642, '845', '11/6/21', 'PT STL', 'ULAU-PULAU ARU KAB. KEPULAUAN ARU MALUKU', '845', '450', 1, 'no', 'no', '0002', NULL),
(6643, '845', '11/6/21', 'PT STL', 'DENPASAR SELATAN KOTA DENPASAR BALIBOJONEGORO KAB. BOJONEGORO JAWA TIMUR', '845', '451', 1, 'no', 'no', '0002', NULL),
(6644, '845', '11/6/21', 'PT STL', 'BOJONEGORO KAB. BOJONEGORO JAWA TIMUR', '845', '452', 1, 'no', 'no', '0002', NULL),
(6645, '845', '11/6/21', 'PT STL', 'MEDAN SELAYANG KOTA MEDAN SUMATERA UTARA', '845', '453', 1, 'no', 'no', '0002', NULL),
(6646, '845', '11/6/21', 'PT STL', 'CAKUNG KOTA JAKARTA TIMUR DKI JAKARTA', '845', '454', 1, 'no', 'no', '0002', NULL),
(6647, '845', '11/6/21', 'PT STL', 'ETIA BUDI KOTA JAKARTA SELATAN DKI JAKARTA', '845', '455', 1, 'no', 'no', '0002', NULL),
(6648, '845', '11/6/21', 'PT STL', 'CIKOLE KOTA SUKABUMI JAWA BARAT', '845', '456', 1, 'no', 'no', '0002', NULL),
(6649, '845', '11/6/21', 'PT STL', 'KELAPA GADING KOTA JAKARTA UTARA DKI JAKARTA', '845', '457', 1, 'no', 'no', '0002', NULL),
(6650, '845', '11/6/21', 'PT STL', 'PANCATENGAH KAB. TASIKMALAYA JAWA BARAT', '845', '458', 1, 'no', 'no', '0002', NULL),
(6651, '845', '11/6/21', 'PT STL', 'BANJARSARI KOTA SURAKARTA (SOLO) JAWA TENGAH', '845', '459', 1, 'no', 'no', '0002', NULL),
(6652, '845', '11/6/21', 'PT STL', 'PENJARINGAN KOTA JAKARTA UTARA DKI JAKARTA', '845', '460', 1, 'no', 'no', '0002', NULL),
(6653, '845', '11/6/21', 'PT STL', 'IPONDOH KOTA TANGERANG BANTEN', '845', '461', 1, 'no', 'no', '0002', NULL),
(6654, '845', '11/6/21', 'PT STL', 'KEBAYORAN BARU KOTA JAKARTA SELATAN DKI JAKARTA', '845', '462', 1, 'no', 'no', '0002', NULL),
(6655, '845', '11/6/21', 'PT STL', 'ULAU-PULAU ARU KAB. KEPULAUAN ARU MALUKU', '845', '463', 1, 'no', 'no', '0002', NULL),
(6656, '845', '11/6/21', 'PT STL', 'DENPASAR SELATAN KOTA DENPASAR BALIBOJONEGORO KAB. BOJONEGORO JAWA TIMUR', '845', '465', 1, 'no', 'no', '0002', NULL),
(6657, '845', '11/6/21', 'PT STL', 'BOJONEGORO KAB. BOJONEGORO JAWA TIMUR', '845', '467', 1, 'no', 'no', '0002', NULL),
(6658, '845', '11/6/21', 'PT STL', 'MEDAN SELAYANG KOTA MEDAN SUMATERA UTARA', '845', '578', 1, 'no', 'no', '0002', NULL),
(6659, '845', '11/6/21', 'PT STL', 'CAKUNG KOTA JAKARTA TIMUR DKI JAKARTA', '845', '579', 1, 'no', 'no', '0002', NULL),
(6660, '845', '11/6/21', 'PT STL', 'ETIA BUDI KOTA JAKARTA SELATAN DKI JAKARTA', '845', '580', 1, 'no', 'no', '0002', NULL),
(6661, '845', '11/6/21', 'PT STL', 'CIKOLE KOTA SUKABUMI JAWA BARAT', '845', '581', 1, 'no', 'no', '0002', NULL),
(6662, '845', '11/6/21', 'PT STL', 'KELAPA GADING KOTA JAKARTA UTARA DKI JAKARTA', '845', '582', 1, 'no', 'no', '0002', NULL),
(6663, '845', '11/6/21', 'PT STL', 'PANCATENGAH KAB. TASIKMALAYA JAWA BARAT', '845', '583', 1, 'no', 'no', '0002', NULL),
(6664, '845', '11/6/21', 'PT STL', 'BANJARSARI KOTA SURAKARTA (SOLO) JAWA TENGAH', '845', '584', 1, 'no', 'no', '0002', NULL),
(6665, '845', '11/6/21', 'PT STL', 'PENJARINGAN KOTA JAKARTA UTARA DKI JAKARTA', '845', '585', 1, 'no', 'no', '0002', NULL),
(6666, '845', '11/6/21', 'PT STL', 'IPONDOH KOTA TANGERANG BANTEN', '845', '586', 1, 'no', 'no', '0002', NULL),
(6667, '845', '11/6/21', 'PT STL', 'KEBAYORAN BARU KOTA JAKARTA SELATAN DKI JAKARTA', '845', '587', 1, 'no', 'no', '0002', NULL),
(6668, '845', '11/6/21', 'PT STL', 'ULAU-PULAU ARU KAB. KEPULAUAN ARU MALUKU', '845', '588', 1, 'no', 'no', '0002', NULL),
(6669, '845', '11/6/21', 'PT STL', 'DENPASAR SELATAN KOTA DENPASAR BALIBOJONEGORO KAB. BOJONEGORO JAWA TIMUR', '845', '589', 1, 'no', 'no', '0002', NULL),
(6670, '845', '11/6/21', 'PT STL', 'BOJONEGORO KAB. BOJONEGORO JAWA TIMUR', '845', '590', 1, 'no', 'no', '0002', NULL),
(6671, '845', '11/6/21', 'PT STL', 'MEDAN SELAYANG KOTA MEDAN SUMATERA UTARA', '845', '591', 1, 'no', 'no', '0002', NULL),
(6672, '845', '11/6/21', 'PT STL', 'CAKUNG KOTA JAKARTA TIMUR DKI JAKARTA', '845', '592', 1, 'no', 'no', '0002', NULL),
(6673, '845', '11/6/21', 'PT STL', 'ETIA BUDI KOTA JAKARTA SELATAN DKI JAKARTA', '845', '594', 1, 'no', 'no', '0002', NULL),
(6674, '845', '11/6/21', 'PT STL', 'CIKOLE KOTA SUKABUMI JAWA BARAT', '845', '595', 1, 'no', 'no', '0002', NULL),
(6675, '845', '11/6/21', 'PT STL', 'KELAPA GADING KOTA JAKARTA UTARA DKI JAKARTA', '845', '596', 1, 'no', 'no', '0002', NULL),
(6676, '845', '11/6/21', 'PT STL', 'PANCATENGAH KAB. TASIKMALAYA JAWA BARAT', '845', '597', 1, 'no', 'no', '0002', NULL),
(6677, '845', '11/6/21', 'PT STL', 'BANJARSARI KOTA SURAKARTA (SOLO) JAWA TENGAH', '845', '598', 1, 'no', 'no', '0002', NULL),
(6678, '845', '11/6/21', 'PT STL', 'PENJARINGAN KOTA JAKARTA UTARA DKI JAKARTA', '845', '599', 1, 'no', 'no', '0002', NULL),
(6679, '845', '11/6/21', 'PT STL', 'IPONDOH KOTA TANGERANG BANTEN', '845', '600', 1, 'no', 'no', '0002', NULL),
(6680, '845', '11/6/21', 'PT STL', 'KEBAYORAN BARU KOTA JAKARTA SELATAN DKI JAKARTA', '845', '601', 1, 'no', 'no', '0002', NULL),
(6681, '845', '11/6/21', 'PT STL', 'ULAU-PULAU ARU KAB. KEPULAUAN ARU MALUKU', '845', '602', 1, 'no', 'no', '0002', NULL),
(6682, '845', '11/6/21', 'PT STL', 'DENPASAR SELATAN KOTA DENPASAR BALIBOJONEGORO KAB. BOJONEGORO JAWA TIMUR', '845', '603', 1, 'no', 'no', '0002', NULL),
(6683, '845', '11/6/21', 'PT STL', 'BOJONEGORO KAB. BOJONEGORO JAWA TIMUR', '845', '604', 1, 'no', 'no', '0002', NULL),
(6684, '845', '11/6/21', 'PT STL', 'MEDAN SELAYANG KOTA MEDAN SUMATERA UTARA', '845', '605', 1, 'no', 'no', '0002', NULL),
(6685, '845', '11/6/21', 'PT STL', 'CAKUNG KOTA JAKARTA TIMUR DKI JAKARTA', '845', '606', 1, 'no', 'no', '0002', NULL),
(6686, '845', '11/6/21', 'PT STL', 'ETIA BUDI KOTA JAKARTA SELATAN DKI JAKARTA', '845', '607', 1, 'no', 'no', '0002', NULL),
(6687, '845', '11/6/21', 'PT STL', 'CIKOLE KOTA SUKABUMI JAWA BARAT', '845', '608', 1, 'no', 'no', '0002', NULL),
(6688, '845', '11/6/21', 'PT STL', 'KELAPA GADING KOTA JAKARTA UTARA DKI JAKARTA', '845', '609', 1, 'no', 'no', '0002', NULL),
(6689, '845', '11/6/21', 'PT STL', 'PANCATENGAH KAB. TASIKMALAYA JAWA BARAT', '845', '610', 1, 'no', 'no', '0002', NULL),
(6690, '845', '11/6/21', 'PT STL', 'BANJARSARI KOTA SURAKARTA (SOLO) JAWA TENGAH', '845', '611', 1, 'no', 'no', '0002', NULL),
(6691, '845', '11/6/21', 'PT STL', 'PENJARINGAN KOTA JAKARTA UTARA DKI JAKARTA', '845', '612', 1, 'no', 'no', '0002', NULL),
(6692, '845', '11/6/21', 'PT STL', 'IPONDOH KOTA TANGERANG BANTEN', '845', '613', 1, 'no', 'no', '0002', NULL),
(6693, '856', '11/6/21', 'PT STL', 'KEBAYORAN BARU KOTA JAKARTA SELATAN DKI JAKARTA', '856', '613', 1, 'no', 'no', '0002', NULL),
(6694, '845', '11/6/21', 'PT STL', 'ULAU-PULAU ARU KAB. KEPULAUAN ARU MALUKU', '845', '614', 1, 'no', 'no', '0002', NULL),
(6695, '856', '11/6/21', 'PT STL', 'DENPASAR SELATAN KOTA DENPASAR BALIBOJONEGORO KAB. BOJONEGORO JAWA TIMUR', '856', '614', 1, 'no', 'no', '0002', NULL),
(6696, '845', '11/6/21', 'PT STL', 'BOJONEGORO KAB. BOJONEGORO JAWA TIMUR', '845', '615', 1, 'no', 'no', '0002', NULL),
(6697, '856', '11/6/21', 'PT STL', 'MEDAN SELAYANG KOTA MEDAN SUMATERA UTARA', '856', '615', 1, 'no', 'no', '0002', NULL),
(6698, '845', '11/6/21', 'PT STL', 'CAKUNG KOTA JAKARTA TIMUR DKI JAKARTA', '845', '616', 1, 'no', 'no', '0002', NULL),
(6699, '856', '11/6/21', 'PT STL', 'ETIA BUDI KOTA JAKARTA SELATAN DKI JAKARTA', '856', '616', 1, 'no', 'no', '0002', NULL),
(6700, '856', '11/6/21', 'PT STL', 'CIKOLE KOTA SUKABUMI JAWA BARAT', '856', '617', 1, 'no', 'no', '0002', NULL),
(6701, '856', '11/6/21', 'PT STL', 'KELAPA GADING KOTA JAKARTA UTARA DKI JAKARTA', '856', '618', 1, 'no', 'no', '0002', NULL),
(6702, '845', '11/6/21', 'PT STL', 'PANCATENGAH KAB. TASIKMALAYA JAWA BARAT', '845', '619', 1, 'no', 'no', '0002', NULL),
(6703, '856', '11/6/21', 'PT STL', 'BANJARSARI KOTA SURAKARTA (SOLO) JAWA TENGAH', '856', '619', 1, 'no', 'no', '0002', NULL),
(6704, '845', '11/6/21', 'PT STL', 'PENJARINGAN KOTA JAKARTA UTARA DKI JAKARTA', '845', '620', 1, 'no', 'no', '0002', NULL),
(6705, '856', '11/6/21', 'PT STL', 'IPONDOH KOTA TANGERANG BANTEN', '856', '620', 1, 'no', 'no', '0002', NULL),
(6706, '845', '11/6/21', 'PT STL', 'KEBAYORAN BARU KOTA JAKARTA SELATAN DKI JAKARTA', '845', '621', 1, 'no', 'no', '0002', NULL),
(6707, '856', '11/6/21', 'PT STL', 'ULAU-PULAU ARU KAB. KEPULAUAN ARU MALUKU', '856', '621', 1, 'no', 'no', '0002', NULL),
(6708, '856', '11/6/21', 'PT STL', 'DENPASAR SELATAN KOTA DENPASAR BALIBOJONEGORO KAB. BOJONEGORO JAWA TIMUR', '856', '622', 1, 'no', 'no', '0002', NULL),
(6709, '845', '11/6/21', 'PT STL', 'BOJONEGORO KAB. BOJONEGORO JAWA TIMUR', '845', '623', 1, 'no', 'no', '0002', NULL),
(6710, '856', '11/6/21', 'PT STL', 'MEDAN SELAYANG KOTA MEDAN SUMATERA UTARA', '856', '623', 1, 'no', 'no', '0002', NULL),
(6711, '856', '11/6/21', 'PT STL', 'CAKUNG KOTA JAKARTA TIMUR DKI JAKARTA', '856', '624', 1, 'no', 'no', '0002', NULL),
(6712, '856', '11/6/21', 'PT STL', 'ETIA BUDI KOTA JAKARTA SELATAN DKI JAKARTA', '856', '625', 1, 'no', 'no', '0002', NULL),
(6713, '856', '11/6/21', 'PT STL', 'CIKOLE KOTA SUKABUMI JAWA BARAT', '856', '626', 1, 'no', 'no', '0002', NULL),
(6714, '856', '11/6/21', 'PT STL', 'KELAPA GADING KOTA JAKARTA UTARA DKI JAKARTA', '856', '627', 1, 'no', 'no', '0002', NULL),
(6715, '856', '11/6/21', 'PT STL', 'PANCATENGAH KAB. TASIKMALAYA JAWA BARAT', '856', '628', 1, 'no', 'no', '0002', NULL),
(6716, '856', '11/6/21', 'PT STL', 'BANJARSARI KOTA SURAKARTA (SOLO) JAWA TENGAH', '856', '629', 1, 'no', 'no', '0002', NULL),
(6717, '856', '11/6/21', 'PT STL', 'PENJARINGAN KOTA JAKARTA UTARA DKI JAKARTA', '856', '630', 1, 'no', 'no', '0002', NULL),
(6718, '856', '11/6/21', 'PT STL', 'IPONDOH KOTA TANGERANG BANTEN', '856', '631', 1, 'no', 'no', '0002', NULL),
(6719, '856', '11/6/21', 'PT STL', 'KEBAYORAN BARU KOTA JAKARTA SELATAN DKI JAKARTA', '856', '817', 1, 'no', 'no', '0002', NULL),
(6720, '856', '11/6/21', 'PT STL', 'ULAU-PULAU ARU KAB. KEPULAUAN ARU MALUKU', '856', '818', 1, 'no', 'no', '0002', NULL),
(6721, '858', '11/6/21', 'PT STL', 'DENPASAR SELATAN KOTA DENPASAR BALIBOJONEGORO KAB. BOJONEGORO JAWA TIMUR', '858', '818', 1, 'no', 'no', '0002', NULL),
(6722, '856', '11/6/21', 'PT STL', 'BOJONEGORO KAB. BOJONEGORO JAWA TIMUR', '856', '819', 1, 'no', 'no', '0002', NULL),
(6723, '856', '11/6/21', 'PT STL', 'MEDAN SELAYANG KOTA MEDAN SUMATERA UTARA', '856', '820', 1, 'no', 'no', '0002', NULL),
(6724, '856', '11/6/21', 'PT STL', 'CAKUNG KOTA JAKARTA TIMUR DKI JAKARTA', '856', '821', 1, 'no', 'no', '0002', NULL),
(6725, '856', '11/6/21', 'PT STL', 'ETIA BUDI KOTA JAKARTA SELATAN DKI JAKARTA', '856', '822', 1, 'no', 'no', '0002', NULL),
(6726, '861', '11/6/21', 'PT STL', 'CIKOLE KOTA SUKABUMI JAWA BARAT', '861', '822', 1, 'no', 'no', '0002', NULL),
(6727, '856', '11/6/21', 'PT STL', 'KELAPA GADING KOTA JAKARTA UTARA DKI JAKARTA', '856', '823', 1, 'no', 'no', '0002', NULL),
(6728, '856', '11/6/21', 'PT STL', 'PANCATENGAH KAB. TASIKMALAYA JAWA BARAT', '856', '824', 1, 'no', 'no', '0002', NULL),
(6729, '861', '11/6/21', 'PT STL', 'BANJARSARI KOTA SURAKARTA (SOLO) JAWA TENGAH', '861', '831', 1, 'no', 'no', '0002', NULL),
(6730, '849', '11/6/21', 'PT STL', 'PENJARINGAN KOTA JAKARTA UTARA DKI JAKARTA', '849', '885', 1, 'no', 'no', '0002', NULL),
(6731, 'SO01DO001Z', '1-Jan-21', 'PT Sampoerna', 'Surabyara', 'DO001Z', 'SKUXYZ09', 1, 'yes', 'yes', '0003', NULL),
(6732, 'SO02DO001Z', '1-Jan-21', 'PT Sampoerna', 'Surabyara', 'DO001Z', 'SKUXYZ09', 1, 'yes', 'yes', '0003', NULL),
(6733, '007', '28102021', 'ABC', 'Surabaya', '007', 'SKU777', 9, 'yes', 'yes', '0002', NULL),
(6734, '007', '28102021', 'ABC', 'Surabaya', '007', 'SKU777', 9, 'yes', 'yes', '0002', NULL),
(6735, '007', '28102021', 'ABC', 'Surabaya', '007', 'SKU777', 9, 'yes', 'yes', '0002', NULL),
(6736, '007', '28102021', 'ABC', 'Surabaya', '007', 'SKU777', 9, 'yes', 'yes', '0002', NULL),
(6737, '007', '28102021', 'ABC', 'Surabaya', '007', 'SKU777', 9, 'yes', 'yes', '0002', NULL),
(6738, '007', '28102021', 'ABC', 'Surabaya', '007', 'SKU777', 9, 'yes', 'yes', '0002', NULL),
(6739, '007', '28102021', 'ABC', 'Surabaya', '007', 'SKU777', 9, 'yes', 'yes', '0002', NULL),
(6740, '007', '28102021', 'ABC', 'Surabaya', '007', 'SKU777', 9, 'yes', 'yes', '0002', NULL),
(6741, '007', '28102021', 'ABC', 'Surabaya', '007', 'SKU777', 9, 'yes', 'yes', '0002', NULL),
(6742, '007', '28102021', 'ABC', 'Surabaya', '007', 'SKU777', 9, 'yes', 'yes', '0002', NULL),
(6743, '012', '09/11/2021', 'DEF', 'Bandung', '012', '169', 1, 'yes', 'yes', '0002', NULL),
(6744, '0091', '09;11;2021', 'GHI', 'Kalimantan Timur', '888', 'SKU0091', 23, 'yes', 'yes', '0002', NULL),
(6745, '012', '09/11/2021', 'DEF', 'Bandung', '13', '356', 1, 'no', 'no', '0002', NULL),
(6746, '012', '11/10/21', 'QQQ', 'Bandung', '11', 'SKU0091', 18, 'no', 'no', '0002', NULL),
(6747, '333', '11/10/21', 'AAA', 'Bandung', '333', '333', 1, 'yes', 'yes', '0002', NULL),
(6748, '15', '11/10/21', 'BBB', 'Bandung', '15', 'SKU90', 1, 'yes', 'yes', '0002', NULL),
(6751, '15', '11/10/21', 'BBB', 'Bandung', '15', 'SKU90', 1, 'no', 'no', '0002', NULL),
(6754, '15', '11/10/21', 'BBB', 'Bandung', '15', 'SKU90', 1, 'no', 'no', '0002', NULL),
(6762, '1', '11/15/21', 'A', 'JAKARTA', '843', '361', 1, 'yes', 'yes', '0002', NULL),
(6763, '2', '11/15/21', 'B', 'BANDUNG', '842', '829', 1, 'yes', 'yes', '0002', NULL),
(6764, '3', '11/15/21', 'C', 'SEMARANG', '842', '834', 1, 'yes', 'yes', '0002', NULL),
(6765, '4', '11/15/21', 'D', 'YOGYAKARTA', '842', '844', 1, 'yes', 'yes', '0002', NULL),
(6766, '5', '11/15/21', 'E', 'SEURABAYA', '842', '857', 1, 'yes', 'yes', '0002', NULL),
(6767, '6', '11/15/21', 'F', 'MALANG', '842', '858', 1, 'yes', 'yes', '0002', NULL),
(6768, '7', '11/15/21', 'G', 'BALI', '842', '859', 1, 'yes', 'yes', '0002', NULL),
(6769, '8', '11/15/21', 'H', 'LOMBOK', '842', '862', 1, 'yes', 'yes', '0002', NULL),
(6770, '9i', '11/15/21', 'PT Buana', 'JAKARTA', '9i', 'SKU7O910', 10, 'yes', 'yes', '0002', NULL),
(6773, '842', '11/19/21', 'DFG', 'Aceh', '842', '824', 1, 'yes', 'yes', '0002', NULL),
(6774, '1', '11/19/21', 'DFG', 'Aceh', '1', '806', 1, 'yes', 'yes', '0002', NULL),
(6775, '1', '11/19/21', 'DFG', 'Aceh', '1', '806', 1, 'yes', 'yes', '0002', NULL),
(6782, '1', '11/19/21', 'DFG', 'Aceh', '834', '288', 1, 'yes', 'yes', '0002', NULL),
(6783, '2', '11/19/21', 'DFG', 'Jakarta', '834', '298', 1, 'no', 'no', '0002', NULL),
(6784, '3', '11/19/21', 'DFG', 'Bali', '834', '302', 1, 'no', 'no', '0002', NULL),
(6785, '4', '11/19/21', 'DFG', 'Bandung', '834', '317', 1, 'yes', 'no', '0002', NULL),
(6786, '5', '11/19/21', 'DFG', 'Semarang', '834', '322', 1, 'no', 'no', '0002', NULL),
(6787, '6', '11/19/21', 'DFG', 'Surabaya', '834', '329', 1, 'no', 'no', '0002', NULL),
(6788, '7', '11/19/21', 'DFG', 'NTT', '834', '330', 1, 'no', 'no', '0002', NULL),
(6789, '8', '11/19/21', 'DFG', 'NTB', '842', '801', 1, 'no', 'no', '0002', NULL),
(6790, '9', '11/19/21', 'DFG', 'Kalimantan', '842', '808', 1, 'no', 'no', '0002', NULL),
(6791, '10', '11/19/21', 'DFG', 'Sulawesi', '842', '811', 1, 'yes', 'yes', '0002', NULL),
(6799, '1', '11/19/21', 'as', 'Aceh', '834', '286', 1, 'yes', 'yes', '0002', NULL),
(6800, '2', '11/19/21', 'sd', 'Jakarta', '834', '313', 1, 'no', 'no', '0002', NULL),
(6801, '3', '11/19/21', 'fd', 'Bali', '834', '314', 1, 'no', 'no', '0002', NULL),
(6802, '274', '11/22/21', 'A', 'JAKARTA', '834', '274', 1, 'yes', 'yes', '0002', NULL),
(6803, '278', '11/22/21', 'B', 'BANDUNG', '834', '278', 1, 'no', 'no', '0002', NULL),
(6804, '283', '11/22/21', 'C', 'SEMARANG', '834', '283', 1, 'no', 'no', '0002', NULL),
(6805, '284', '11/22/21', 'D', 'SURABAYA', '834', '284', 1, 'no', 'no', '0002', NULL),
(6806, '289', '11/22/21', 'E', 'YOGYAKARTA', '834', '289', 1, 'no', 'no', '0002', NULL),
(6807, '305', '11/22/21', 'F', 'BALI', '834', '305', 1, 'no', 'no', '0002', NULL),
(6808, '315', '11/22/21', 'G', 'NTT', '834', '315', 1, 'no', 'no', '0002', NULL),
(6809, '319', '11/22/21', 'H', 'NTB', '834', '319', 1, 'no', 'no', '0002', NULL),
(6810, '323', '11/22/21', 'I', 'ACEH', '834', '323', 1, 'no', 'no', '0002', NULL),
(6811, '823', '11/22/21', 'J', 'KALIMANTAN', '842', '823', 1, 'no', 'no', '0002', NULL),
(6812, '01', '11/22/21', 'H', 'JAKARTA', '834', '264', 1, 'yes', 'yes', '0002', NULL),
(6813, '02', '11/22/21', 'I', 'JAKARTA', '834', '268', 1, 'yes', 'yes', '0002', NULL),
(6814, '03', '11/22/21', 'J', 'JAKARTA', '834', '273', 1, 'yes', 'yes', '0002', NULL),
(6815, '04', '11/22/21', 'K', 'JAKARTA', '834', '281', 1, 'yes', 'yes', '0002', NULL),
(6816, '05', '11/22/21', 'L', 'JAKARTA', '834', '293', 1, 'yes', 'yes', '0002', NULL),
(6817, '06', '11/22/21', 'M', 'JAKARTA', '834', '297', 1, 'yes', 'yes', '0002', NULL),
(6818, '07', '11/22/21', 'N', 'JAKARTA', '834', '301', 1, 'yes', 'yes', '0002', NULL),
(6819, '08', '11/22/21', 'O', 'JAKARTA', '834', '331', 1, 'yes', 'yes', '0002', NULL),
(6820, '09', '11/22/21', 'P', 'JAKARTA', '834', '339', 1, 'yes', 'yes', '0002', NULL),
(6821, '279', '11/22/21', 'H', 'JAKARTA', '834', '279', 1, 'no', 'no', '0002', NULL),
(6822, '294', '11/22/21', 'I', 'JAKARTA', '834', '294', 1, 'no', 'no', '0002', NULL),
(6823, '308', '11/22/21', 'J', 'JAKARTA', '834', '308', 1, 'no', 'no', '0002', NULL),
(6824, '311', '11/22/21', 'K', 'JAKARTA', '834', '311', 1, 'no', 'no', '0002', NULL),
(6825, '316', '11/22/21', 'L', 'JAKARTA', '834', '316', 1, 'no', 'no', '0002', NULL),
(6826, '324', '11/22/21', 'M', 'JAKARTA', '834', '324', 1, 'no', 'no', '0002', NULL);
INSERT INTO `Transaction_Order` (`id`, `No_Order`, `Order_Date`, `Customer`, `Address`, `DN`, `SKU`, `Qty`, `Status_QC`, `Status_GI`, `id_Account`, `id_location`) VALUES
(6827, '327', '11/22/21', 'N', 'JAKARTA', '834', '327', 1, 'no', 'no', '0002', NULL),
(6828, '345', '11/22/21', 'O', 'JAKARTA', '834', '345', 1, 'no', 'no', '0002', NULL),
(6829, '346', '11/22/21', 'P', 'JAKARTA', '834', '346', 1, 'no', 'no', '0002', NULL),
(6830, '347', '11/22/21', 'Q', 'BALI', '834', '347', 1, 'no', 'no', '0002', NULL),
(6831, '4', '11/19/2021', 'AFG', 'Bandung', '4', '819', 1, 'yes', 'no', '0002', NULL),
(6832, '5', '11/19/2021', 'AAA', 'Semarang', '5', '821', 1, 'no', 'no', '0002', NULL),
(6833, '4', '11/19/2021', 'AFG', 'Bandung', '4', '819', 1, 'yes', 'no', '0002', NULL),
(6834, '5', '11/19/2021', 'AAA', 'Semarang', '5', '821', 1, 'no', 'no', '0002', NULL),
(6836, '9', '11/24/21', 'agility', 'jaksel', '7', 'lima', 1, 'yes', 'no', '0001', NULL),
(6838, '11', '11/25/21', 'agility', 'jaksel', '7', 'sembilan', 1, 'yes', 'no', '0001', NULL),
(6839, '12', '11/26/21', 'agility', 'jaksel', '7', 'delapandelapan', 1, 'yes', 'no', '0001', NULL),
(6840, '13', '11/27/21', 'agility', 'jaksel', '7', 'limalima', 1, 'yes', 'no', '0001', NULL),
(6852, '312', '11/26/21', 'ASD', 'Bandung', '01', 'SKU1', 5, 'yes', 'yes', '0002', NULL),
(6857, '01', '12/1/21', 'AS', 'Bali', '02', 'SKU2', 4, 'yes', 'yes', '0002', NULL),
(6912, '1', '2021-12-06 07:00:00.000', 'agility', 'bekasi', '123', 'kain-01', 1, 'yes', 'yes', '0003', NULL),
(6913, 'TestOrder', '2021-01-01 07:00:00.000', 'PT Sampoerna', 'Surabyara', 'DO00000', 'SKUYYZ03', 5, 'no', 'no', '0003', NULL),
(6914, '1', '2021-12-16 07:00:00.000', 'agility', 'bekasi', '1', 'TK-01', 6, 'no', 'no', '0001', NULL),
(6915, '1', '2021-12-16 07:00:00.000', 'agility', 'bekasi', '2', 'TK-01', 2, 'no', 'no', '0001', NULL),
(6916, '2', '2021-12-16 07:00:00.000', 'agility', 'bekasi', '3', 'TK-01', 2, 'no', 'no', '0001', NULL),
(6917, '01', '2021-12-16 07:00:00.000', 'AS', 'Bali', '834', '267', 1, 'yes', 'yes', '0002', NULL),
(6918, '02', '2021-12-16 07:00:00.000', 'B', 'Jakarta', '834', '269', 1, 'yes', 'yes', '0002', NULL),
(6919, '03', '2021-12-16 07:00:00.000', 'C', 'Bandung', '834', '271', 1, 'yes', 'yes', '0002', NULL),
(6920, '04', '2021-12-16 07:00:00.000', 'D', 'Semarang', '834', '272', 1, 'yes', 'yes', '0002', NULL),
(6921, '05', '2021-12-16 07:00:00.000', 'E', 'Pontianak', '834', '275', 1, 'yes', 'yes', '0002', NULL),
(6922, '06', '2021-12-16 07:00:00.000', 'F', 'adjv', '834', '276', 1, 'yes', 'yes', '0002', NULL),
(6923, '07', '2021-12-16 07:00:00.000', 'G', 'sjfs', '834', '277', 1, 'yes', 'yes', '0002', NULL),
(6924, '08', '2021-12-16 07:00:00.000', 'H', 'doeo', '834', '295', 1, 'yes', 'yes', '0002', NULL),
(6925, '09', '2021-12-16 07:00:00.000', 'I', 'jsd', '834', '296', 1, 'yes', 'yes', '0002', NULL),
(6926, '10', '2021-12-16 07:00:00.000', 'J', 'kjnsk', '834', '299', 1, 'yes', 'yes', '0002', NULL),
(6927, '01', '2021-12-22 07:00:00.000', 'AS', 'Bali', '834', '090', 1, 'no', 'no', '0002', NULL),
(6928, '02', '2021-12-22 07:00:00.000', 'B', 'Jakarta', '834', '102', 1, 'no', 'no', '0002', NULL),
(6929, '03', '2021-12-22 07:00:00.000', 'C', 'Bandung', '834', '280', 1, 'no', 'no', '0002', NULL),
(6930, '04', '2021-12-22 07:00:00.000', 'D', 'Semarang', '834', '285', 1, 'no', 'no', '0002', NULL),
(6931, '05', '2021-12-22 07:00:00.000', 'E', 'Pontianak', '834', '287', 1, 'no', 'no', '0002', NULL),
(6932, '06', '2021-12-22 07:00:00.000', 'F', 'adjv', '834', '290', 1, 'no', 'no', '0002', NULL),
(6933, '07', '2021-12-22 07:00:00.000', 'G', 'sjfs', '834', '303', 1, 'no', 'no', '0002', NULL),
(6934, '08', '2021-12-22 07:00:00.000', 'H', 'doeo', '834', '304', 1, 'no', 'no', '0002', NULL),
(6935, '09', '2021-12-22 07:00:00.000', 'I', 'jsd', '834', '306', 1, 'no', 'no', '0002', NULL),
(6936, '10', '2021-12-22 07:00:00.000', 'J', 'kjnsk', '834', '307', 1, 'no', 'no', '0002', NULL),
(6937, '01', '2021-12-22 07:00:00.000', 'K', NULL, '834', '309', 1, 'no', 'no', '0002', NULL),
(6938, '02', '2021-12-22 07:00:00.000', 'L', NULL, '834', '310', 1, 'no', 'no', '0002', NULL),
(6939, '03', '2021-12-22 07:00:00.000', 'M', NULL, '834', '321', 1, 'no', 'no', '0002', NULL),
(6940, '04', '2021-12-22 07:00:00.000', 'N', NULL, '834', '326', 1, 'no', 'no', '0002', NULL),
(6941, '05', '2021-12-22 07:00:00.000', 'O\\', NULL, '834', '328', 1, 'no', 'no', '0002', NULL),
(6942, '06', '2021-12-22 07:00:00.000', 'P', NULL, '834', '334', 1, 'no', 'no', '0002', NULL),
(6943, '07', '2021-12-22 07:00:00.000', 'Q', NULL, '834', '336', 1, 'no', 'no', '0002', NULL),
(6944, '08', '2021-12-22 07:00:00.000', 'R', NULL, '834', '337', 1, 'no', 'no', '0002', NULL),
(6945, '09', '2021-12-22 07:00:00.000', 'S', NULL, '834', '340', 1, 'no', 'no', '0002', NULL),
(6946, '10', '2021-12-22 07:00:00.000', 'T', NULL, '834', '341', 1, 'no', 'no', '0002', NULL),
(6947, '11', '2021-12-22 07:00:00.000', 'U', NULL, '834', '342', 1, 'no', 'no', '0002', NULL),
(6948, '12', '2021-12-22 07:00:00.000', 'V', NULL, '834', '348', 1, 'no', 'no', '0002', NULL),
(6949, '13', '2021-12-22 07:00:00.000', 'W', NULL, '834', '350', 1, 'no', 'no', '0002', NULL),
(6950, '14', '2021-12-22 07:00:00.000', 'X', NULL, '834', '351', 1, 'no', 'no', '0002', NULL),
(6951, '15', '2021-12-22 07:00:00.000', 'Y', NULL, '834', '352', 1, 'no', 'no', '0002', NULL),
(6952, '16', '2021-12-22 07:00:00.000', 'Z', NULL, '834', '353', 1, 'no', 'no', '0002', NULL),
(6953, '17', '2021-12-22 07:00:00.000', 'AA', NULL, '834', '354', 1, 'no', 'no', '0002', NULL),
(6954, '18', '2021-12-22 07:00:00.000', 'BB', NULL, '834', '355', 1, 'no', 'no', '0002', NULL),
(6955, '19', '2021-12-22 07:00:00.000', 'CC', NULL, '834', '357', 1, 'no', 'no', '0002', NULL),
(6956, '20', '2021-12-22 07:00:00.000', 'DD', NULL, '834', '359', 1, 'no', 'no', '0002', NULL),
(6957, '21', '2021-12-22 07:00:00.000', 'EE', NULL, '834', '360', 1, 'no', 'no', '0002', NULL),
(6958, '22', '2021-12-22 07:00:00.000', 'FF', NULL, '834', '361', 1, 'no', 'no', '0002', NULL),
(6959, '23', '2021-12-22 07:00:00.000', 'GG', NULL, '834', '663', 1, 'no', 'no', '0002', NULL),
(6960, '24', '2021-12-22 07:00:00.000', 'HH', NULL, '834', '669', 1, 'no', 'no', '0002', NULL),
(6961, '25', '2021-12-22 07:00:00.000', 'II', NULL, '834', '674', 1, 'no', 'no', '0002', NULL),
(6962, '26', '2021-12-22 07:00:00.000', 'JJ', NULL, '834', '683', 1, 'no', 'no', '0002', NULL),
(6963, '27', '2021-12-22 07:00:00.000', 'KK', NULL, '834', '684', 1, 'no', 'no', '0002', NULL),
(6964, '28', '2021-12-22 07:00:00.000', 'LL', NULL, '834', '700', 1, 'no', 'no', '0002', NULL),
(6965, '29', '2021-12-22 07:00:00.000', 'MM', NULL, '834', '704', 1, 'no', 'no', '0002', NULL),
(6966, '30', '2021-12-22 07:00:00.000', 'NN', NULL, '834', '712', 1, 'no', 'no', '0002', NULL),
(6967, '1', '2021-12-22 07:00:00.000', 'AAA', 'JAKARTA', '834', '682', 1, 'yes', 'no', '0002', NULL),
(6968, '1', '2021-12-22 07:00:00.000', 'AAA', 'JAKARTA', '814', '286', 1, 'yes', 'no', '0002', NULL),
(6969, '2', '2021-12-23 07:00:00.000', 'BBB', 'SURABAYA', '814', '287', 1, 'no', 'no', '0002', NULL),
(6970, '3', '2021-12-23 07:00:00.000', 'CCC', 'KALIMANTAN', '814', '284', 1, 'no', 'no', '0002', NULL),
(6971, '4', '2021-12-23 07:00:00.000', 'DDD', 'PAPUA', '814', '285', 1, 'yes', 'no', '0002', NULL),
(6972, '22', '2021-12-22 07:00:00.000', 'AAA', 'JAKARTA', '506-22', 'BKM-720-223', 1, 'no', 'no', '0002', NULL),
(6973, '23', '2021-12-23 07:00:00.000', 'BBB', 'SURABAYA', '506-23', 'BKM-720-223', 1, 'no', 'no', '0002', NULL),
(6974, '24', '2021-12-23 07:00:00.000', 'CCC', 'KALIMANTAN', '506-24', 'BKM-720-223', 1, 'no', 'no', '0002', NULL),
(6975, '25', '2021-12-23 07:00:00.000', 'DDD', 'PAPUA', '506-25', 'BKM-720-223', 1, 'no', 'no', '0002', NULL),
(6976, '26', '2021-12-24 07:00:00.000', 'EEE', 'JAKARTA', '506-26', 'BKM-720-223', 1, 'no', 'no', '0002', NULL),
(6977, '27', '2021-12-24 07:00:00.000', 'FFF', 'JAKARTA', '506-27', 'BKM-720-223', 1, 'no', 'no', '0002', NULL),
(6978, '28', '2021-12-24 07:00:00.000', 'GGG', 'JAKARTA', '506-28', 'BKM-720-223', 1, 'no', 'no', '0002', NULL),
(6979, '29', '2021-12-24 07:00:00.000', 'HHH', 'JAKARTA', '506-29', 'BKM-720-223', 1, 'no', 'no', '0002', NULL),
(6980, '30', '2021-12-24 07:00:00.000', 'III', 'JAKARTA', '506-30', 'BKM-720-223', 1, 'no', 'no', '0002', NULL),
(6981, '31', '2021-12-24 07:00:00.000', 'JJJ', 'JAKARTA', '506-31', 'BKM-720-223', 1, 'no', 'no', '0002', NULL),
(6982, '47', '2021-12-25 07:00:00.000', 'AAA', 'PAPUA', '506-47', 'BKM-720-223', 1, 'no', 'no', '0002', NULL),
(6983, '48', '2021-12-25 07:00:00.000', 'BBB', 'PAPUA', '506-48', 'BKM-720-223', 1, 'no', 'no', '0002', NULL),
(6984, '49', '2021-12-25 07:00:00.000', 'CCC', 'PAPUA', '506-49', 'BKM-720-223', 1, 'no', 'no', '0002', NULL),
(6985, '50', '2021-12-25 07:00:00.000', 'DDD', 'PAPUA', '506-50', 'BKM-720-223', 1, 'no', 'no', '0002', NULL),
(6986, '51', '2021-12-25 07:00:00.000', 'EEE', 'PAPUA', '506-51', 'BKM-720-223', 1, 'no', 'no', '0002', NULL),
(6987, '52', '2021-12-25 07:00:00.000', 'FFF', 'PAPUA', '506-52', 'BKM-720-223', 1, 'no', 'no', '0002', NULL),
(6988, '53', '2021-12-25 07:00:00.000', 'GGG', 'PAPUA', '506-53', 'BKM-720-223', 1, 'no', 'no', '0002', NULL),
(6989, '54', '2021-12-25 07:00:00.000', 'HHH', 'PAPUA', '506-54', 'BKM-720-223', 1, 'no', 'no', '0002', NULL),
(6990, '55', '2021-12-25 07:00:00.000', 'III', 'PAPUA', '506-55', 'BKM-720-223', 1, 'no', 'no', '0002', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `Transaction_Packing`
--

DROP TABLE IF EXISTS `Transaction_Packing`;
CREATE TABLE `Transaction_Packing` (
  `Id` int(6) NOT NULL,
  `No_Order` varchar(10) NOT NULL,
  `No_Packing` text NOT NULL,
  `DO_Date` text NOT NULL,
  `No_Box` text NOT NULL,
  `TotalBox` text NOT NULL,
  `Qty_Items` text NOT NULL,
  `print_Status` int(10) NOT NULL,
  `id_Account` text NOT NULL,
  `id_location` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktur dari tabel `Transaction_Receive`
--

DROP TABLE IF EXISTS `Transaction_Receive`;
CREATE TABLE `Transaction_Receive` (
  `id` int(10) NOT NULL,
  `Device_ID` varchar(10) NOT NULL,
  `id_Account` varchar(10) NOT NULL,
  `id_location` varchar(20) NOT NULL,
  `item_id` varchar(20) NOT NULL,
  `UoM` varchar(20) DEFAULT NULL,
  `Quantity` text,
  `Line_number` text,
  `Rack_number` text,
  `Bin_number` text,
  `Time_Enter` datetime(6) NOT NULL,
  `status` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `Transaction_Receive`
--

INSERT INTO `Transaction_Receive` (`id`, `Device_ID`, `id_Account`, `id_location`, `item_id`, `UoM`, `Quantity`, `Line_number`, `Rack_number`, `Bin_number`, `Time_Enter`, `status`) VALUES
(2093, '000i4t', '0003', 'lgk-bekasi', 'hsskvak5837', NULL, NULL, NULL, NULL, NULL, '2021-11-12 09:01:17.000000', NULL),
(2591, 'agi-in', '0001', 'agi-bks', '00vmc68en', NULL, NULL, NULL, NULL, NULL, '2021-12-09 15:32:52.000000', NULL),
(2595, 'agi-in', '0001', 'agi-bks', '00vqsk0n1', NULL, NULL, NULL, NULL, NULL, '2021-12-09 15:41:56.000000', NULL),
(3540, '000osz', '0003', 'agi-bks', 'hsskvak5838', NULL, NULL, NULL, NULL, NULL, '2021-12-15 17:31:59.000000', NULL),
(3892, '000kht', '0003', 'lgk-bekasi', '6lpkxdadwsx', NULL, NULL, NULL, NULL, NULL, '2021-12-19 20:31:29.000000', NULL),
(3893, '000kht', '0003', 'lgk-bekasi', '6lpkxdb3zva', NULL, NULL, NULL, NULL, NULL, '2021-12-19 20:51:19.000000', NULL),
(4281, 'maa-ir', '0002', 'maa-bks', '4cpkvklieb6', NULL, NULL, NULL, NULL, NULL, '2021-12-23 16:10:48.000000', NULL),
(4282, 'maa-ir', '0002', 'maa-bks', '4cpkvklieb7', NULL, NULL, NULL, NULL, NULL, '2021-12-23 16:10:48.000000', NULL),
(4436, 'agi-in', '0001', 'agi-bks', '00xpn1zbk', NULL, NULL, NULL, NULL, NULL, '2021-12-28 11:57:57.000000', NULL),
(4437, 'agi-in', '0001', 'agi-bks', '00xpn1zbl', NULL, NULL, NULL, NULL, NULL, '2021-12-28 11:57:57.000000', NULL),
(4441, 'agi-in', '0001', 'agi-bks', '00xppkjqw', NULL, NULL, NULL, NULL, NULL, '2021-12-28 13:08:22.000000', NULL),
(4443, 'agi-in', '0001', 'agi-bks', '00xppkwee', NULL, NULL, NULL, NULL, NULL, '2021-12-28 13:08:38.000000', NULL),
(4445, 'agi-in', '0001', 'agi-bks', '00xppofdj', NULL, NULL, NULL, NULL, NULL, '2021-12-28 13:11:23.000000', NULL),
(4446, 'agi-in', '0001', 'agi-bks', '00xppx8si', NULL, NULL, NULL, NULL, NULL, '2021-12-28 13:18:14.000000', NULL),
(4457, '0008id', '0006', 'ajs-jkt', '7ovkxslxyy5', NULL, NULL, NULL, NULL, NULL, '2021-12-30 14:32:53.000000', NULL),
(4458, '0008id', '0006', 'ajs-jkt', '7ovkxsllhuj', NULL, NULL, NULL, NULL, NULL, '2021-12-30 14:32:53.000000', NULL),
(4459, '0008id', '0006', 'ajs-jkt', '7ovkxslw5jv', NULL, NULL, NULL, NULL, NULL, '2021-12-30 14:32:53.000000', NULL),
(4460, '0008id', '0006', 'ajs-jkt', '7ovkxsluxpp', NULL, NULL, NULL, NULL, NULL, '2021-12-30 14:32:53.000000', NULL),
(4461, '0008id', '0006', 'ajs-jkt', '7ovkxsllhui', NULL, NULL, NULL, NULL, NULL, '2021-12-30 14:32:53.000000', NULL),
(4462, '0008id', '0006', 'ajs-jkt', '7ovkxslt61v', NULL, NULL, NULL, NULL, NULL, '2021-12-30 14:32:53.000000', NULL),
(4463, '0008id', '0006', 'ajs-jkt', '7ovkxsm0epz', NULL, NULL, NULL, NULL, NULL, '2021-12-30 14:32:53.000000', NULL),
(4464, '0008id', '0006', 'ajs-jkt', '7ovkxsllhue', NULL, NULL, NULL, NULL, NULL, '2021-12-30 14:32:53.000000', NULL),
(4483, '0008id', '0006', 'ajs-jkt', '7ovkxslwttg', NULL, NULL, NULL, NULL, NULL, '2021-12-30 14:32:55.000000', NULL),
(4484, '0008id', '0006', 'ajs-jkt', '7ovkxsllhuh', NULL, NULL, NULL, NULL, NULL, '2021-12-30 14:32:55.000000', NULL),
(4485, '0008id', '0006', 'ajs-jkt', '7ovkxslspms', NULL, NULL, NULL, NULL, NULL, '2021-12-30 14:32:55.000000', NULL),
(4557, '0008id', '0006', 'ajs-jkt', '7ovkxsltyrc', NULL, NULL, NULL, NULL, NULL, '2021-12-30 14:33:27.000000', NULL),
(4772, '0008id', '0006', 'ajs-jkt', '7ovkxslzk1j', NULL, NULL, NULL, NULL, NULL, '2021-12-30 14:33:33.000000', NULL),
(5459, '0008id', '0006', 'ajs-jkt', '7ovkxsnmpur', NULL, NULL, NULL, NULL, NULL, '2021-12-30 14:37:27.000000', NULL),
(5493, '000dpi', '0003', 'lgk-bekasi', '00y1d9rsp', NULL, NULL, NULL, NULL, NULL, '2022-01-05 16:57:18.000000', NULL),
(5494, '000dpi', '0003', 'lgk-bekasi', '00y1d9rsq', NULL, NULL, NULL, NULL, NULL, '2022-01-05 16:57:18.000000', NULL),
(5495, '000dpi', '0003', 'lgk-bekasi', '00y1d9rsr', NULL, NULL, NULL, NULL, NULL, '2022-01-05 16:57:18.000000', NULL),
(5496, '000dpi', '0003', 'lgk-bekasi', '00y1d9rst', NULL, NULL, NULL, NULL, NULL, '2022-01-05 16:57:18.000000', NULL),
(5497, '000dpi', '0003', 'lgk-bekasi', '00y1d9rsu', NULL, NULL, NULL, NULL, NULL, '2022-01-05 16:57:18.000000', NULL),
(5498, '000dpi', '0003', 'lgk-bekasi', '00y1d9rsw', NULL, NULL, NULL, NULL, NULL, '2022-01-05 16:57:18.000000', NULL),
(5499, '000dpi', '0003', 'lgk-bekasi', '00y1d9rsy', NULL, NULL, NULL, NULL, NULL, '2022-01-05 16:57:18.000000', NULL);

--
-- Trigger `Transaction_Receive`
--
DROP TRIGGER IF EXISTS `update history`;
DELIMITER $$
CREATE TRIGGER `update history` BEFORE INSERT ON `Transaction_Receive` FOR EACH ROW BEGIN
UPDATE history 
SET 
time_receive=NOW(),
status='Receive',
Status_GR='no' ,
Device_ID =New.Device_ID,
last_update =  NOW()
WHERE item_id=NEW.item_id;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Struktur dari tabel `Transaction_type`
--

DROP TABLE IF EXISTS `Transaction_type`;
CREATE TABLE `Transaction_type` (
  `id` int(11) NOT NULL,
  `trx_type` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `Transaction_type`
--

INSERT INTO `Transaction_type` (`id`, `trx_type`) VALUES
(1, 'Inv_Received'),
(2, 'Inv_Delivery'),
(3, 'Inv_Delivery_Cashier'),
(4, 'Inv_Monitoring'),
(5, 'Inv_Received_Delivery'),
(6, 'Inv_Received_Register'),
(7, 'Inv_Cashier'),
(8, 'Inv_TrackDetail'),
(9, 'Attendance_Coming'),
(10, 'Attendance_Out'),
(11, 'Attendance_Coming_Out');

-- --------------------------------------------------------

--
-- Stand-in struktur untuk tampilan `trx_cashier`
-- (Lihat di bawah untuk tampilan aktual)
--
DROP VIEW IF EXISTS `trx_cashier`;
CREATE TABLE `trx_cashier` (
`Id` int(10)
,`Device_ID` varchar(10)
,`id_Account` varchar(10)
,`id_location` varchar(20)
,`item_id` varchar(20)
,`UoM` varchar(20)
,`Quantity` text
,`Line_number` text
,`Rack_number` text
,`Bin_number` text
,`Time_Enter` text
,`Time_Scan_Cashier` text
,`status` text
,`Name` text
,`SKU` varchar(50)
,`Item_category` text
);

-- --------------------------------------------------------

--
-- Stand-in struktur untuk tampilan `trx_Cashier_v`
-- (Lihat di bawah untuk tampilan aktual)
--
DROP VIEW IF EXISTS `trx_Cashier_v`;
CREATE TABLE `trx_Cashier_v` (
`tag_number` varchar(100)
,`Item_code` varchar(20)
,`Id` int(10)
,`id_Account` varchar(10)
,`item_id` varchar(20)
,`Device_ID` varchar(10)
,`id_location` varchar(20)
,`Time_Enter` text
,`Time_Scan_Cashier` text
,`Name` text
,`SKU` varchar(50)
,`Item_category` text
,`Uom` text
,`Quantity` int(10)
,`status` text
);

-- --------------------------------------------------------

--
-- Stand-in struktur untuk tampilan `trx_delivery`
-- (Lihat di bawah untuk tampilan aktual)
--
DROP VIEW IF EXISTS `trx_delivery`;
CREATE TABLE `trx_delivery` (
`Id` int(10)
,`Device_ID` varchar(10)
,`id_Account` varchar(10)
,`id_location` varchar(20)
,`item_id` varchar(20)
,`UoM` varchar(20)
,`Quantity` text
,`Line_number` text
,`Rack_number` text
,`Bin_number` text
,`Time_Enter` datetime(6)
,`Time_Out` datetime
,`status` text
,`Name` text
,`SKU` varchar(50)
,`Item_category` text
);

-- --------------------------------------------------------

--
-- Stand-in struktur untuk tampilan `trx_Delivery_v`
-- (Lihat di bawah untuk tampilan aktual)
--
DROP VIEW IF EXISTS `trx_Delivery_v`;
CREATE TABLE `trx_Delivery_v` (
`tag_number` varchar(100)
,`Item_code` varchar(20)
,`Id` int(10)
,`id_Account` varchar(10)
,`item_id` varchar(20)
,`Device_ID` varchar(10)
,`id_location` varchar(20)
,`Time_Enter` datetime(6)
,`Time_Out` datetime
,`Name` text
,`Uom` text
,`SKU` varchar(50)
,`Item_category` text
,`status` text
);

-- --------------------------------------------------------

--
-- Stand-in struktur untuk tampilan `trx_history`
-- (Lihat di bawah untuk tampilan aktual)
--
DROP VIEW IF EXISTS `trx_history`;
CREATE TABLE `trx_history` (
);

-- --------------------------------------------------------

--
-- Stand-in struktur untuk tampilan `trx_monitoring`
-- (Lihat di bawah untuk tampilan aktual)
--
DROP VIEW IF EXISTS `trx_monitoring`;
CREATE TABLE `trx_monitoring` (
`tag_number` varchar(100)
,`Item_code` varchar(20)
,`Id` int(10)
,`id_Account` varchar(10)
,`item_id` varchar(20)
,`id_location` varchar(20)
,`Uom` text
,`Quantity` int(10)
,`Line_number` text
,`Rack_number` text
,`Bin_number` text
,`Time_Monitoring` datetime(6)
,`Name` text
,`Description` text
,`SKU` varchar(50)
,`Item_category` text
);

-- --------------------------------------------------------

--
-- Stand-in struktur untuk tampilan `trx_monitoring_join`
-- (Lihat di bawah untuk tampilan aktual)
--
DROP VIEW IF EXISTS `trx_monitoring_join`;
CREATE TABLE `trx_monitoring_join` (
`Id` int(10)
,`Device_ID` varchar(10)
,`id_Account` varchar(10)
,`id_location` varchar(20)
,`item_id` varchar(20)
,`UoM` varchar(20)
,`Quantity` text
,`Line_number` text
,`Rack_number` text
,`Bin_number` text
,`Time_Monitoring` datetime(6)
,`Time_Out` datetime
,`status` text
,`Name` text
,`SKU` varchar(50)
,`Item_category` text
);

-- --------------------------------------------------------

--
-- Stand-in struktur untuk tampilan `trx_receive_join`
-- (Lihat di bawah untuk tampilan aktual)
--
DROP VIEW IF EXISTS `trx_receive_join`;
CREATE TABLE `trx_receive_join` (
`Device_ID` varchar(10)
,`item_id` varchar(20)
,`Item_code` varchar(20)
,`SKU` varchar(50)
,`Name` text
,`Uom` text
,`Quantity` int(10)
,`id_Account` varchar(20)
,`tag_number` varchar(100)
,`Time_Enter` datetime(6)
,`status` text
);

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id_user` varchar(20) NOT NULL,
  `name` varchar(30) NOT NULL,
  `description` varchar(100) NOT NULL,
  `telpon` varchar(20) NOT NULL,
  `email` varchar(30) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `id_account` varchar(20) NOT NULL,
  `role` varchar(10) NOT NULL,
  `Device_ID` varchar(7) NOT NULL,
  `api_key` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id_user`, `name`, `description`, `telpon`, `email`, `username`, `password`, `id_account`, `role`, `Device_ID`, `api_key`) VALUES
('00051', 'demo', 'admin demo', '+12232321212', 'admin@demo.com', 'demo', 'demo', '0005', '1', '', NULL),



INSERT INTO `users` (`id_user`, `name`, `description`, `telpon`, `email`, `username`, `password`, `id_account`, `role`, `Device_ID`, `api_key`) VALUES
('002', 'tri', 'qc user tri', '4', 'qc@agility.com', 'qc', 'qc', '0001', '3', 'agi-qc', NULL),
('003', 'tr', 'ww', '121212', 'outbound@agility.com', 'outbound', 'outbound', '0001', '3', 'agi-ot', NULL),
('8oki', 'yoga', 'dfjvndfj', '02353485', 'monitoring@maa.com', 'monitoring', 'monitoring', '0002', '3', 'maa-im', 'pjy3bvtd1ox4x3xbazqdcf4567aylb'),
('9oki', 'Yoga', 'hbjbk', '876558', 'inbound3@maa.com', 'inbound-rc', 'inbound', '0002', '3', 'maa-rc', 'pjy3bvtd1ox4x3xbazqdcf4567aylb'),
('admin', 'Admin Sembarang', 'admin Sembarang', '1122211', 'admin@sembarang.com', 'admin', 'admin', '0005', '2', '', NULL),
('admin1', 'M. Yogi Fernanda', 'manajer', '00021222', 'yogs@gmail.com', 'yogs', 'yogs', '0006', '2', '101klx', NULL),
('adminagility', 'admin', 'admin', '123122333', 'admin@agility.com', 'adminagility', 'admin', '0001', '2', '', '26oenqi68f83nkdnxjveml6im27x08'),
('adminkosong', 'admin data kosong', 'cek data kosong', '', 'admin@kosong.com', 'adminkosong', 'admin', '0004', '2', '', NULL),
('adminlogika', 'admin', '', '333', 'admin@logika.com', 'adminlogika', 'admin', '0003', '2', '', NULL),
('adminmaa', 'tri', 'dasdas', '1231', 'admin@maa.com', 'adminmaa', 'admin', '0002', '2', '', 'pjy3bvtd1ox4x3xbazqdcf4567aylb'),
('agi01', 'tri', '-', '11111', 'agi.inbound@agility.com', 'inbound', 'inbound', '0001', '3', 'agi-in', NULL),
('agility-id', 'tri', '13123', '12312', 'outbound2@agility.com', 'outbound-agi-id', 'outbound', '0001', '3', 'agi-id', NULL),
('agility-ir', 'tri', 'dd', '12321', 'inbound2@agility.com', 'inbound-ag2', 'inbound', '0001', '3', 'agi-ir', NULL),
('Inbound 2 Logika', 'Inbound 2 Logika', 'Inbound 2 Logika', '1', 'inbound2lgk@logika.com', 'inbound2lgk', 'inbound2lgk', '0003', '3', '000i4t', NULL),
('Inbound Outbound', 'Inbound Outbound', 'Inbound Outbound', '1', 'inoutlgk@logika.com', 'inoutlgk', 'inoutlgk', '0003', '3', '000kht', NULL),
('Inboundlogika', 'Inbound Logika', 'Inbound Logika', '821788567', 'inboundlgk@logika.com', 'inboundlgk', 'inboundlgk', '0003', '3', '000dpi', NULL),
('inmaa', 'yoga', 'aaa', '111111', 'inbound@maa.com', 'inboundmaa', 'inbound', '0002', '3', 'maa-in', 'pjy3bvtd1ox4x3xbazqdcf4567aylb'),
('inout12', 'inout', 'Akun untuk inout', '082141869221', 'inout@agility.com', 'agi-rc', 'inout', '0001', '2', 'agi-rc', NULL),
('inoutajs', 'inout', 'Akun untuk inout', '082141869221', 'inout@ajs.com', 'inout', 'inout', '0006', '3', '0008id', NULL),
('maa-id', 'yoga', 'wdwd', '12323', 'outbound2@maa.com', 'outbound-id', 'outbound', '0002', '3', 'maa-id', 'pjy3bvtd1ox4x3xbazqdcf4567aylb'),
('maa-ir', 'yoga', '123123', '123213', 'inbound2@maa.com', 'inbound-ir', 'inbound', '0002', '3', 'maa-ir', 'pjy3bvtd1ox4x3xbazqdcf4567aylb'),
('monitoringagility', 'monitoring', '', '081111111', 'monitoring@agility.com', 'monitoring.agility', 'monitoring', '0001', '3', 'agi-im', NULL),
('Monitoringlgk', 'Monitoring lgk 2', 'Monitoring lgk', '1', 'Monitoringlgk@logika.com', 'Monitoringlgk', 'Monitoringlgk', '0003', '3', '000o4t', NULL),
('Outbound Logika', 'Outbound Logika', 'Outbound Logika', '1', 'outboundlgk@logika.com', 'outboundlgk', 'outboundlgk', '0003', '3', '000heb', NULL),
('outbound2lgk', 'outbound 2 lgk', 'outbound 2 lgk', '1', 'outbound2lgk@logika.com', 'outbound2lgk', 'outbound2lgk', '0003', '3', '000njn', NULL),
('outmaa', 'yoga', 'wqwdqw', '123123', 'outbound@maa.com', 'outboundmaa', 'outbound', '0002', '3', 'maa-ot', 'pjy3bvtd1ox4x3xbazqdcf4567aylb'),
('QC Logika', 'QC Logika', 'QC Logika', '22', 'qclogika@logika.com', 'qclogika', 'qclogika', '0003', '3', '000fm5', NULL),
('qcmaa', 'yoga', 'ljlkj', '987987', 'qc@maa.com', 'qcmaa', 'qc', '0002', '3', 'maa-qc', 'pjy3bvtd1ox4x3xbazqdcf4567aylb'),
('superuser', 'super user logika', 'Superuser', '123344411', 'superuser@logika.com', 'superuser', 'superuser', '0003', '1', '', NULL);

-- --------------------------------------------------------

--
-- Struktur untuk view `tarck_detail_v`
--
DROP VIEW IF EXISTS `tarck_detail_v`;

DROP VIEW IF EXISTS `tarck_detail_v`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `tarck_detail_v`  AS SELECT `items`.`id_Account` AS `id_Account`, `items`.`tag_number` AS `tag_number`, `items`.`item_id` AS `item_id`, `items`.`Name` AS `Name`, `items`.`SKU` AS `SKU`, `readers`.`name` AS `reader_name`, `readers`.`id_location` AS `id_location`, `track_detail`.`timestamp` AS `timestamp` FROM ((`items` join `track_detail` on((`items`.`item_id` = convert(`track_detail`.`Item_id` using utf8mb4)))) join `readers` on((convert(`track_detail`.`Device_ID` using utf8mb4) = `readers`.`reader_id`))) ;

-- --------------------------------------------------------

--
-- Struktur untuk view `trx_cashier`
--
DROP TABLE IF EXISTS `trx_cashier`;

DROP VIEW IF EXISTS `trx_cashier`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `trx_cashier`  AS SELECT `Transaction_Cashier`.`Id` AS `Id`, `Transaction_Cashier`.`Device_ID` AS `Device_ID`, `Transaction_Cashier`.`id_Account` AS `id_Account`, `Transaction_Cashier`.`id_location` AS `id_location`, `Transaction_Cashier`.`item_id` AS `item_id`, `Transaction_Cashier`.`UoM` AS `UoM`, `Transaction_Cashier`.`Quantity` AS `Quantity`, `Transaction_Cashier`.`Line_number` AS `Line_number`, `Transaction_Cashier`.`Rack_number` AS `Rack_number`, `Transaction_Cashier`.`Bin_number` AS `Bin_number`, `Transaction_Cashier`.`Time_Enter` AS `Time_Enter`, `Transaction_Cashier`.`Time_Scan_Cashier` AS `Time_Scan_Cashier`, `Transaction_Cashier`.`status` AS `status`, `items`.`Name` AS `Name`, `items`.`SKU` AS `SKU`, `items`.`Item_category` AS `Item_category` FROM (`Transaction_Cashier` join `items` on((`items`.`item_id` = `Transaction_Cashier`.`item_id`))) ;

-- --------------------------------------------------------

--
-- Struktur untuk view `trx_Cashier_v`
--
DROP TABLE IF EXISTS `trx_Cashier_v`;

DROP VIEW IF EXISTS `trx_Cashier_v`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `trx_Cashier_v`  AS SELECT `items`.`tag_number` AS `tag_number`, `items`.`Item_code` AS `Item_code`, `Transaction_Cashier`.`Id` AS `Id`, `Transaction_Cashier`.`id_Account` AS `id_Account`, `Transaction_Cashier`.`item_id` AS `item_id`, `Transaction_Cashier`.`Device_ID` AS `Device_ID`, `readers`.`id_location` AS `id_location`, `Transaction_Cashier`.`Time_Enter` AS `Time_Enter`, `Transaction_Cashier`.`Time_Scan_Cashier` AS `Time_Scan_Cashier`, `items`.`Name` AS `Name`, `items`.`SKU` AS `SKU`, `items`.`Item_category` AS `Item_category`, `items`.`Uom` AS `Uom`, `items`.`Quantity` AS `Quantity`, `Transaction_Cashier`.`status` AS `status` FROM ((`Transaction_Cashier` join `readers` on((`Transaction_Cashier`.`Device_ID` = `readers`.`reader_id`))) join `items` on((`Transaction_Cashier`.`item_id` = `items`.`item_id`))) ;

-- --------------------------------------------------------

--
-- Struktur untuk view `trx_delivery`
--
DROP TABLE IF EXISTS `trx_delivery`;

DROP VIEW IF EXISTS `trx_delivery`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `trx_delivery`  AS SELECT `Transaction_Delivery`.`Id` AS `Id`, `Transaction_Delivery`.`Device_ID` AS `Device_ID`, `Transaction_Delivery`.`id_Account` AS `id_Account`, `Transaction_Delivery`.`id_location` AS `id_location`, `Transaction_Delivery`.`item_id` AS `item_id`, `Transaction_Delivery`.`UoM` AS `UoM`, `Transaction_Delivery`.`Quantity` AS `Quantity`, `Transaction_Delivery`.`Line_number` AS `Line_number`, `Transaction_Delivery`.`Rack_number` AS `Rack_number`, `Transaction_Delivery`.`Bin_number` AS `Bin_number`, `Transaction_Delivery`.`Time_Enter` AS `Time_Enter`, `Transaction_Delivery`.`Time_Out` AS `Time_Out`, `Transaction_Delivery`.`status` AS `status`, `items`.`Name` AS `Name`, `items`.`SKU` AS `SKU`, `items`.`Item_category` AS `Item_category` FROM (`Transaction_Delivery` join `items` on((`items`.`item_id` = `Transaction_Delivery`.`item_id`))) ;

-- --------------------------------------------------------

--
-- Struktur untuk view `trx_Delivery_v`
--
DROP TABLE IF EXISTS `trx_Delivery_v`;

DROP VIEW IF EXISTS `trx_Delivery_v`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `trx_Delivery_v`  AS SELECT `items`.`tag_number` AS `tag_number`, `items`.`Item_code` AS `Item_code`, `Transaction_Delivery`.`Id` AS `Id`, `Transaction_Delivery`.`id_Account` AS `id_Account`, `Transaction_Delivery`.`item_id` AS `item_id`, `Transaction_Delivery`.`Device_ID` AS `Device_ID`, `readers`.`id_location` AS `id_location`, `Transaction_Delivery`.`Time_Enter` AS `Time_Enter`, `Transaction_Delivery`.`Time_Out` AS `Time_Out`, `items`.`Name` AS `Name`, `items`.`Uom` AS `Uom`, `items`.`SKU` AS `SKU`, `items`.`Item_category` AS `Item_category`, `Transaction_Delivery`.`status` AS `status` FROM ((`Transaction_Delivery` join `readers` on((`Transaction_Delivery`.`Device_ID` = `readers`.`reader_id`))) join `items` on((`Transaction_Delivery`.`item_id` = `items`.`item_id`))) ;

-- --------------------------------------------------------

--
-- Struktur untuk view `trx_history`
--


--
-- Struktur untuk view `trx_monitoring`
--
DROP TABLE IF EXISTS `trx_monitoring`;

DROP VIEW IF EXISTS `trx_monitoring`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `trx_monitoring`  AS SELECT `items`.`tag_number` AS `tag_number`, `items`.`Item_code` AS `Item_code`, `Transaction_Monitoring`.`Id` AS `Id`, `Transaction_Monitoring`.`id_Account` AS `id_Account`, `Transaction_Monitoring`.`item_id` AS `item_id`, `readers`.`id_location` AS `id_location`, `items`.`Uom` AS `Uom`, `items`.`Quantity` AS `Quantity`, `Transaction_Monitoring`.`Line_number` AS `Line_number`, `Transaction_Monitoring`.`Rack_number` AS `Rack_number`, `Transaction_Monitoring`.`Bin_number` AS `Bin_number`, `Transaction_Monitoring`.`Time_Monitoring` AS `Time_Monitoring`, `items`.`Name` AS `Name`, `items`.`Description` AS `Description`, `items`.`SKU` AS `SKU`, `items`.`Item_category` AS `Item_category` FROM ((`Transaction_Monitoring` join `readers` on((`Transaction_Monitoring`.`Device_ID` = `readers`.`reader_id`))) join `items` on((`Transaction_Monitoring`.`item_id` = `items`.`item_id`))) ;

-- --------------------------------------------------------

--
-- Struktur untuk view `trx_monitoring_join`
--
DROP TABLE IF EXISTS `trx_monitoring_join`;

DROP VIEW IF EXISTS `trx_monitoring_join`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `trx_monitoring_join`  AS SELECT `Transaction_Monitoring`.`Id` AS `Id`, `Transaction_Monitoring`.`Device_ID` AS `Device_ID`, `Transaction_Monitoring`.`id_Account` AS `id_Account`, `Transaction_Monitoring`.`id_location` AS `id_location`, `Transaction_Monitoring`.`item_id` AS `item_id`, `Transaction_Monitoring`.`UoM` AS `UoM`, `Transaction_Monitoring`.`Quantity` AS `Quantity`, `Transaction_Monitoring`.`Line_number` AS `Line_number`, `Transaction_Monitoring`.`Rack_number` AS `Rack_number`, `Transaction_Monitoring`.`Bin_number` AS `Bin_number`, `Transaction_Monitoring`.`Time_Monitoring` AS `Time_Monitoring`, `Transaction_Monitoring`.`Time_Out` AS `Time_Out`, `Transaction_Monitoring`.`status` AS `status`, `items`.`Name` AS `Name`, `items`.`SKU` AS `SKU`, `items`.`Item_category` AS `Item_category` FROM (`Transaction_Monitoring` join `items` on((`items`.`item_id` = `Transaction_Monitoring`.`item_id`))) ;

-- --------------------------------------------------------

--
-- Struktur untuk view `trx_receive_join`
--
DROP TABLE IF EXISTS `trx_receive_join`;

DROP VIEW IF EXISTS `trx_receive_join`;
CREATE ALGORITHM=UNDEFINED DEFINER=`zain`@`localhost` SQL SECURITY DEFINER VIEW `trx_receive_join`  AS SELECT `Transaction_Receive`.`Device_ID` AS `Device_ID`, `Transaction_Receive`.`item_id` AS `item_id`, `items`.`Item_code` AS `Item_code`, `items`.`SKU` AS `SKU`, `items`.`Name` AS `Name`, `items`.`Uom` AS `Uom`, `items`.`Quantity` AS `Quantity`, `items`.`id_Account` AS `id_Account`, `items`.`tag_number` AS `tag_number`, `Transaction_Receive`.`Time_Enter` AS `Time_Enter`, `Transaction_Receive`.`status` AS `status` FROM (`Transaction_Receive` join `items`) WHERE (`Transaction_Receive`.`item_id` = `items`.`item_id`) ;

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`id_account`);

--
-- Indeks untuk tabel `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`Emp_id`),
  ADD UNIQUE KEY `tag_number` (`tag_number`);

--
-- Indeks untuk tabel `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`item_id`),
  ADD UNIQUE KEY `tag_number` (`tag_number`),
  ADD UNIQUE KEY `tag_number_3` (`tag_number`),
  ADD KEY `Item_code` (`Item_code`),
  ADD KEY `tag_number_2` (`tag_number`),
  ADD KEY `tag_number_4` (`tag_number`);

--
-- Indeks untuk tabel `locations`
--
ALTER TABLE `locations`
  ADD PRIMARY KEY (`id_location`),
  ADD KEY `id_account` (`id_account`);

--
-- Indeks untuk tabel `modul`
--
ALTER TABLE `modul`
  ADD PRIMARY KEY (`Id_modul`);

--
-- Indeks untuk tabel `modul_entri`
--
ALTER TABLE `modul_entri`
  ADD PRIMARY KEY (`Id_modul_entri`);

--
-- Indeks untuk tabel `packing`
--
ALTER TABLE `packing`
  ADD PRIMARY KEY (`Id`);

--
-- Indeks untuk tabel `readers`
--
ALTER TABLE `readers`
  ADD PRIMARY KEY (`reader_id`),
  ADD KEY `id_account` (`id_account`),
  ADD KEY `id_location` (`id_location`),
  ADD KEY `id` (`id`);

--
-- Indeks untuk tabel `Stock_Take`
--
ALTER TABLE `Stock_Take`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Tag_number` (`Tag_number`);

--
-- Indeks untuk tabel `track_detail`
--
ALTER TABLE `track_detail`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `Transaction_Cashier`
--
ALTER TABLE `Transaction_Cashier`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `item_id` (`item_id`);

--
-- Indeks untuk tabel `Transaction_Delivery`
--
ALTER TABLE `Transaction_Delivery`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `item_id` (`item_id`);

--
-- Indeks untuk tabel `Transaction_Monitoring`
--
ALTER TABLE `Transaction_Monitoring`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `item_id` (`item_id`);

--
-- Indeks untuk tabel `Transaction_Order`
--
ALTER TABLE `Transaction_Order`
  ADD UNIQUE KEY `id` (`id`);

--
-- Indeks untuk tabel `Transaction_Packing`
--
ALTER TABLE `Transaction_Packing`
  ADD PRIMARY KEY (`Id`);

--
-- Indeks untuk tabel `Transaction_Receive`
--
ALTER TABLE `Transaction_Receive`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `item_id` (`item_id`);

--
-- Indeks untuk tabel `Transaction_type`
--
ALTER TABLE `Transaction_type`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `id_account` (`id_account`) USING BTREE;

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `packing`
--
ALTER TABLE `packing`
  MODIFY `Id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=129;

--
-- AUTO_INCREMENT untuk tabel `readers`
--
ALTER TABLE `readers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT untuk tabel `Stock_Take`
--
ALTER TABLE `Stock_Take`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1620;

--
-- AUTO_INCREMENT untuk tabel `track_detail`
--
ALTER TABLE `track_detail`
  MODIFY `id` int(12) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `Transaction_Cashier`
--
ALTER TABLE `Transaction_Cashier`
  MODIFY `Id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=652;

--
-- AUTO_INCREMENT untuk tabel `Transaction_Delivery`
--
ALTER TABLE `Transaction_Delivery`
  MODIFY `Id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2562;

--
-- AUTO_INCREMENT untuk tabel `Transaction_Monitoring`
--
ALTER TABLE `Transaction_Monitoring`
  MODIFY `Id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1447;

--
-- AUTO_INCREMENT untuk tabel `Transaction_Order`
--
ALTER TABLE `Transaction_Order`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6991;

--
-- AUTO_INCREMENT untuk tabel `Transaction_Packing`
--
ALTER TABLE `Transaction_Packing`
  MODIFY `Id` int(6) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `Transaction_Receive`
--
ALTER TABLE `Transaction_Receive`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5500;

--
-- AUTO_INCREMENT untuk tabel `Transaction_type`
--
ALTER TABLE `Transaction_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `locations`
--
ALTER TABLE `locations`
  ADD CONSTRAINT `locations_ibfk_1` FOREIGN KEY (`id_account`) REFERENCES `account` (`id_account`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `readers`
--
ALTER TABLE `readers`
  ADD CONSTRAINT `readers_ibfk_1` FOREIGN KEY (`id_account`) REFERENCES `account` (`id_account`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `readers_ibfk_2` FOREIGN KEY (`id_location`) REFERENCES `locations` (`id_location`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `Transaction_Receive`
--
ALTER TABLE `Transaction_Receive`
  ADD CONSTRAINT `Transaction_Receive_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `items` (`item_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`id_account`) REFERENCES `account` (`id_account`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
