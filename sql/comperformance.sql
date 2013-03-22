/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50528
Source Host           : localhost:3306
Source Database       : comperformance

Target Server Type    : MYSQL
Target Server Version : 50528
File Encoding         : 65001

Date: 2013-01-19 10:06:15
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `assessment`
-- ----------------------------
DROP TABLE IF EXISTS `assessment`;
CREATE TABLE `assessment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `term` varchar(16) NOT NULL,
  `excellent` int(11) NOT NULL,
  `good` int(11) NOT NULL,
  `ordinary` int(11) NOT NULL,
  `begindate` date NOT NULL,
  `enddate` date NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `assessment_term_2d24275f2f1163b1_uniq` (`term`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of assessment
-- ----------------------------
INSERT INTO `assessment` VALUES ('44', '2012年秋', '40', '30', '30', '2012-12-25', '2012-12-28');

-- ----------------------------
-- Table structure for `assessmentrecord`
-- ----------------------------
DROP TABLE IF EXISTS `assessmentrecord`;
CREATE TABLE `assessmentrecord` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `assessment_id` int(11) NOT NULL,
  `result` varchar(1) NOT NULL,
  `ostudent_id` int(11) NOT NULL,
  `dstudent_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `assessmentrecord_c168f2dc` (`assessment_id`),
  KEY `assessmentrecord_370b6994` (`ostudent_id`),
  KEY `assessmentrecord_9c969999` (`dstudent_id`),
  CONSTRAINT `assessment_id_refs_id_481497ac315d3be` FOREIGN KEY (`assessment_id`) REFERENCES `assessment` (`id`),
  CONSTRAINT `dstudent_id_refs_id_3e3af109a366ce10` FOREIGN KEY (`dstudent_id`) REFERENCES `student` (`id`),
  CONSTRAINT `ostudent_id_refs_id_3e3af109a366ce10` FOREIGN KEY (`ostudent_id`) REFERENCES `student` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2707 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of assessmentrecord
-- ----------------------------
INSERT INTO `assessmentrecord` VALUES ('2687', '44', '0', '37', '37');
INSERT INTO `assessmentrecord` VALUES ('2688', '44', '1', '37', '38');
INSERT INTO `assessmentrecord` VALUES ('2689', '44', '1', '37', '39');
INSERT INTO `assessmentrecord` VALUES ('2690', '44', '0', '37', '40');
INSERT INTO `assessmentrecord` VALUES ('2691', '44', '0', '38', '37');
INSERT INTO `assessmentrecord` VALUES ('2692', '44', '0', '38', '38');
INSERT INTO `assessmentrecord` VALUES ('2693', '44', '1', '38', '39');
INSERT INTO `assessmentrecord` VALUES ('2694', '44', '1', '38', '40');
INSERT INTO `assessmentrecord` VALUES ('2695', '44', '0', '39', '37');
INSERT INTO `assessmentrecord` VALUES ('2696', '44', '0', '39', '38');
INSERT INTO `assessmentrecord` VALUES ('2697', '44', '1', '39', '39');
INSERT INTO `assessmentrecord` VALUES ('2698', '44', '2', '39', '40');
INSERT INTO `assessmentrecord` VALUES ('2699', '44', '0', '40', '37');
INSERT INTO `assessmentrecord` VALUES ('2700', '44', '0', '40', '38');
INSERT INTO `assessmentrecord` VALUES ('2701', '44', '1', '40', '39');
INSERT INTO `assessmentrecord` VALUES ('2702', '44', '2', '40', '40');
INSERT INTO `assessmentrecord` VALUES ('2703', '44', '0', '41', '41');
INSERT INTO `assessmentrecord` VALUES ('2704', '44', '1', '41', '42');
INSERT INTO `assessmentrecord` VALUES ('2705', '44', '0', '42', '41');
INSERT INTO `assessmentrecord` VALUES ('2706', '44', '1', '42', '42');

-- ----------------------------
-- Table structure for `assessmentrow`
-- ----------------------------
DROP TABLE IF EXISTS `assessmentrow`;
CREATE TABLE `assessmentrow` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `assessment_id` int(11) NOT NULL,
  `excellent` int(11) NOT NULL,
  `good` int(11) NOT NULL,
  `ordinary` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `assessmentrow_c168f2dc` (`assessment_id`),
  KEY `assessmentrow_42ff452e` (`student_id`),
  CONSTRAINT `assessment_id_refs_id_678d39fc296003b8` FOREIGN KEY (`assessment_id`) REFERENCES `assessment` (`id`),
  CONSTRAINT `student_id_refs_id_6c5fd85230c6a2fa` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=129 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of assessmentrow
-- ----------------------------
INSERT INTO `assessmentrow` VALUES ('123', '44', '4', '0', '0', '37');
INSERT INTO `assessmentrow` VALUES ('124', '44', '3', '1', '0', '38');
INSERT INTO `assessmentrow` VALUES ('125', '44', '0', '4', '0', '39');
INSERT INTO `assessmentrow` VALUES ('126', '44', '1', '1', '2', '40');
INSERT INTO `assessmentrow` VALUES ('127', '44', '2', '0', '0', '41');
INSERT INTO `assessmentrow` VALUES ('128', '44', '0', '2', '0', '42');

-- ----------------------------
-- Table structure for `auth_group`
-- ----------------------------
DROP TABLE IF EXISTS `auth_group`;
CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(80) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of auth_group
-- ----------------------------

-- ----------------------------
-- Table structure for `auth_group_permissions`
-- ----------------------------
DROP TABLE IF EXISTS `auth_group_permissions`;
CREATE TABLE `auth_group_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `group_id` (`group_id`,`permission_id`),
  KEY `auth_group_permissions_bda51c3c` (`group_id`),
  KEY `auth_group_permissions_1e014c8f` (`permission_id`),
  CONSTRAINT `group_id_refs_id_3cea63fe` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `permission_id_refs_id_a7792de1` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of auth_group_permissions
-- ----------------------------

-- ----------------------------
-- Table structure for `auth_message`
-- ----------------------------
DROP TABLE IF EXISTS `auth_message`;
CREATE TABLE `auth_message` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `message` longtext NOT NULL,
  PRIMARY KEY (`id`),
  KEY `auth_message_fbfc09f1` (`user_id`),
  CONSTRAINT `user_id_refs_id_9af0b65a` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of auth_message
-- ----------------------------

-- ----------------------------
-- Table structure for `auth_permission`
-- ----------------------------
DROP TABLE IF EXISTS `auth_permission`;
CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `content_type_id` (`content_type_id`,`codename`),
  KEY `auth_permission_e4470c6e` (`content_type_id`),
  CONSTRAINT `content_type_id_refs_id_728de91f` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of auth_permission
-- ----------------------------
INSERT INTO `auth_permission` VALUES ('1', 'Can add permission', '1', 'add_permission');
INSERT INTO `auth_permission` VALUES ('2', 'Can change permission', '1', 'change_permission');
INSERT INTO `auth_permission` VALUES ('3', 'Can delete permission', '1', 'delete_permission');
INSERT INTO `auth_permission` VALUES ('4', 'Can add group', '2', 'add_group');
INSERT INTO `auth_permission` VALUES ('5', 'Can change group', '2', 'change_group');
INSERT INTO `auth_permission` VALUES ('6', 'Can delete group', '2', 'delete_group');
INSERT INTO `auth_permission` VALUES ('7', 'Can add user', '3', 'add_user');
INSERT INTO `auth_permission` VALUES ('8', 'Can change user', '3', 'change_user');
INSERT INTO `auth_permission` VALUES ('9', 'Can delete user', '3', 'delete_user');
INSERT INTO `auth_permission` VALUES ('10', 'Can add message', '4', 'add_message');
INSERT INTO `auth_permission` VALUES ('11', 'Can change message', '4', 'change_message');
INSERT INTO `auth_permission` VALUES ('12', 'Can delete message', '4', 'delete_message');
INSERT INTO `auth_permission` VALUES ('13', 'Can add content type', '5', 'add_contenttype');
INSERT INTO `auth_permission` VALUES ('14', 'Can change content type', '5', 'change_contenttype');
INSERT INTO `auth_permission` VALUES ('15', 'Can delete content type', '5', 'delete_contenttype');
INSERT INTO `auth_permission` VALUES ('16', 'Can add session', '6', 'add_session');
INSERT INTO `auth_permission` VALUES ('17', 'Can change session', '6', 'change_session');
INSERT INTO `auth_permission` VALUES ('18', 'Can delete session', '6', 'delete_session');
INSERT INTO `auth_permission` VALUES ('19', 'Can add site', '7', 'add_site');
INSERT INTO `auth_permission` VALUES ('20', 'Can change site', '7', 'change_site');
INSERT INTO `auth_permission` VALUES ('21', 'Can delete site', '7', 'delete_site');
INSERT INTO `auth_permission` VALUES ('22', 'Can add captcha store', '8', 'add_captchastore');
INSERT INTO `auth_permission` VALUES ('23', 'Can change captcha store', '8', 'change_captchastore');
INSERT INTO `auth_permission` VALUES ('24', 'Can delete captcha store', '8', 'delete_captchastore');
INSERT INTO `auth_permission` VALUES ('25', 'Can add migration history', '9', 'add_migrationhistory');
INSERT INTO `auth_permission` VALUES ('26', 'Can change migration history', '9', 'change_migrationhistory');
INSERT INTO `auth_permission` VALUES ('27', 'Can delete migration history', '9', 'delete_migrationhistory');
INSERT INTO `auth_permission` VALUES ('28', 'Can add class', '10', 'add_class');
INSERT INTO `auth_permission` VALUES ('29', 'Can change class', '10', 'change_class');
INSERT INTO `auth_permission` VALUES ('30', 'Can delete class', '10', 'delete_class');
INSERT INTO `auth_permission` VALUES ('31', 'Can add student', '11', 'add_student');
INSERT INTO `auth_permission` VALUES ('32', 'Can change student', '11', 'change_student');
INSERT INTO `auth_permission` VALUES ('33', 'Can delete student', '11', 'delete_student');
INSERT INTO `auth_permission` VALUES ('34', 'Can add assessment', '12', 'add_assessment');
INSERT INTO `auth_permission` VALUES ('35', 'Can change assessment', '12', 'change_assessment');
INSERT INTO `auth_permission` VALUES ('36', 'Can delete assessment', '12', 'delete_assessment');
INSERT INTO `auth_permission` VALUES ('40', 'Can add grade', '14', 'add_grade');
INSERT INTO `auth_permission` VALUES ('41', 'Can change grade', '14', 'change_grade');
INSERT INTO `auth_permission` VALUES ('42', 'Can delete grade', '14', 'delete_grade');
INSERT INTO `auth_permission` VALUES ('43', 'Can add behavior', '15', 'add_behavior');
INSERT INTO `auth_permission` VALUES ('44', 'Can change behavior', '15', 'change_behavior');
INSERT INTO `auth_permission` VALUES ('45', 'Can delete behavior', '15', 'delete_behavior');
INSERT INTO `auth_permission` VALUES ('46', 'Can add development', '16', 'add_development');
INSERT INTO `auth_permission` VALUES ('47', 'Can change development', '16', 'change_development');
INSERT INTO `auth_permission` VALUES ('48', 'Can delete development', '16', 'delete_development');
INSERT INTO `auth_permission` VALUES ('49', 'Can add comperformance', '17', 'add_comperformance');
INSERT INTO `auth_permission` VALUES ('50', 'Can change comperformance', '17', 'change_comperformance');
INSERT INTO `auth_permission` VALUES ('51', 'Can delete comperformance', '17', 'delete_comperformance');
INSERT INTO `auth_permission` VALUES ('52', 'Can add comperformance development score', '18', 'add_comperformancedevelopmentscore');
INSERT INTO `auth_permission` VALUES ('53', 'Can change comperformance development score', '18', 'change_comperformancedevelopmentscore');
INSERT INTO `auth_permission` VALUES ('54', 'Can delete comperformance development score', '18', 'delete_comperformancedevelopmentscore');
INSERT INTO `auth_permission` VALUES ('55', 'Can add comperformance behavior score', '19', 'add_comperformancebehaviorscore');
INSERT INTO `auth_permission` VALUES ('56', 'Can change comperformance behavior score', '19', 'change_comperformancebehaviorscore');
INSERT INTO `auth_permission` VALUES ('57', 'Can delete comperformance behavior score', '19', 'delete_comperformancebehaviorscore');
INSERT INTO `auth_permission` VALUES ('58', 'Can add comperformance physical score', '20', 'add_comperformancephysicalscore');
INSERT INTO `auth_permission` VALUES ('59', 'Can change comperformance physical score', '20', 'change_comperformancephysicalscore');
INSERT INTO `auth_permission` VALUES ('60', 'Can delete comperformance physical score', '20', 'delete_comperformancephysicalscore');
INSERT INTO `auth_permission` VALUES ('61', 'Can add assessment record', '21', 'add_assessmentrecord');
INSERT INTO `auth_permission` VALUES ('62', 'Can change assessment record', '21', 'change_assessmentrecord');
INSERT INTO `auth_permission` VALUES ('63', 'Can delete assessment record', '21', 'delete_assessmentrecord');
INSERT INTO `auth_permission` VALUES ('64', 'Can add log entry', '22', 'add_logentry');
INSERT INTO `auth_permission` VALUES ('65', 'Can change log entry', '22', 'change_logentry');
INSERT INTO `auth_permission` VALUES ('66', 'Can delete log entry', '22', 'delete_logentry');
INSERT INTO `auth_permission` VALUES ('67', 'Can add assessment row', '23', 'add_assessmentrow');
INSERT INTO `auth_permission` VALUES ('68', 'Can change assessment row', '23', 'change_assessmentrow');
INSERT INTO `auth_permission` VALUES ('69', 'Can delete assessment row', '23', 'delete_assessmentrow');
INSERT INTO `auth_permission` VALUES ('70', 'Can add comperformance score', '24', 'add_comperformancescore');
INSERT INTO `auth_permission` VALUES ('71', 'Can change comperformance score', '24', 'change_comperformancescore');
INSERT INTO `auth_permission` VALUES ('72', 'Can delete comperformance score', '24', 'delete_comperformancescore');

-- ----------------------------
-- Table structure for `auth_user`
-- ----------------------------
DROP TABLE IF EXISTS `auth_user`;
CREATE TABLE `auth_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `email` varchar(75) NOT NULL,
  `password` varchar(128) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `last_login` datetime NOT NULL,
  `date_joined` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of auth_user
-- ----------------------------
INSERT INTO `auth_user` VALUES ('1', 'guomeng', '', '', 'gnemoug@gmail.com', 'sha1$65839$3a98a347d1a6306326aafd1ccc323f773f555120', '1', '1', '1', '2013-01-19 09:41:42', '2012-12-10 05:55:42');
INSERT INTO `auth_user` VALUES ('41', '101110312', '', '', '', 'sha1$f265d$2dba19d5fe4360f0f4d20cf278b97e3daead5d96', '1', '1', '0', '2012-12-25 08:52:34', '2012-12-25 08:34:29');
INSERT INTO `auth_user` VALUES ('42', '101110313', '', '', '', 'sha1$68917$9550a7bddad10e51ac899c132fb903f8d5d99174', '1', '1', '0', '2012-12-25 08:57:33', '2012-12-25 08:36:28');
INSERT INTO `auth_user` VALUES ('43', '101110314', '', '', '', 'sha1$6f8b7$f7fc46006b082cb7e8ba9a3db067e21626d886e7', '1', '1', '0', '2012-12-25 08:43:28', '2012-12-25 08:37:05');
INSERT INTO `auth_user` VALUES ('44', '101110315', '', '', '', 'sha1$202db$6917256dcd23f5d760658f3f8c2a41efc3f3d6ee', '1', '1', '0', '2012-12-25 08:43:54', '2012-12-25 08:37:28');
INSERT INTO `auth_user` VALUES ('45', '101110101', '', '', '', 'sha1$0903e$bed4b52cd97109132412abf25081ee598f4fee5d', '1', '1', '0', '2012-12-25 08:45:14', '2012-12-25 08:37:49');
INSERT INTO `auth_user` VALUES ('46', '101110112', '', '', '', 'sha1$b1b12$75319957624d83828c7ff76ba4784fb7fa8ee46f', '1', '1', '0', '2012-12-25 08:45:33', '2012-12-25 08:38:38');

-- ----------------------------
-- Table structure for `auth_user_groups`
-- ----------------------------
DROP TABLE IF EXISTS `auth_user_groups`;
CREATE TABLE `auth_user_groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`,`group_id`),
  KEY `auth_user_groups_fbfc09f1` (`user_id`),
  KEY `auth_user_groups_bda51c3c` (`group_id`),
  CONSTRAINT `group_id_refs_id_f0ee9890` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `user_id_refs_id_831107f1` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of auth_user_groups
-- ----------------------------

-- ----------------------------
-- Table structure for `auth_user_user_permissions`
-- ----------------------------
DROP TABLE IF EXISTS `auth_user_user_permissions`;
CREATE TABLE `auth_user_user_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`,`permission_id`),
  KEY `auth_user_user_permissions_fbfc09f1` (`user_id`),
  KEY `auth_user_user_permissions_1e014c8f` (`permission_id`),
  CONSTRAINT `permission_id_refs_id_67e79cb` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `user_id_refs_id_f2045483` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of auth_user_user_permissions
-- ----------------------------

-- ----------------------------
-- Table structure for `behavior`
-- ----------------------------
DROP TABLE IF EXISTS `behavior`;
CREATE TABLE `behavior` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `actlevel` varchar(1) NOT NULL,
  `name` varchar(16) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of behavior
-- ----------------------------
INSERT INTO `behavior` VALUES ('14', '0', '运动会');
INSERT INTO `behavior` VALUES ('15', '0', '社团联合会');
INSERT INTO `behavior` VALUES ('16', '1', '卫生');

-- ----------------------------
-- Table structure for `captcha_captchastore`
-- ----------------------------
DROP TABLE IF EXISTS `captcha_captchastore`;
CREATE TABLE `captcha_captchastore` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `challenge` varchar(32) NOT NULL,
  `response` varchar(32) NOT NULL,
  `hashkey` varchar(40) NOT NULL,
  `expiration` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `hashkey` (`hashkey`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of captcha_captchastore
-- ----------------------------
INSERT INTO `captcha_captchastore` VALUES ('4', '5+7=', '12', 'baca31961f955278284c8f67845da1215f782f60', '2013-01-19 09:42:13');
INSERT INTO `captcha_captchastore` VALUES ('5', '3-2=', '1', '0c6e8d844fca7e80a004442ca6835a7e9955d4d6', '2013-01-19 09:43:28');

-- ----------------------------
-- Table structure for `class`
-- ----------------------------
DROP TABLE IF EXISTS `class`;
CREATE TABLE `class` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `classid` varchar(10) NOT NULL,
  `classname` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `class_classid_4a2e781305b0d34e_uniq` (`classid`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of class
-- ----------------------------
INSERT INTO `class` VALUES ('22', '1011103', '软件三班');
INSERT INTO `class` VALUES ('23', '1011101', '软件一班');

-- ----------------------------
-- Table structure for `comperformance`
-- ----------------------------
DROP TABLE IF EXISTS `comperformance`;
CREATE TABLE `comperformance` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `excellent` double NOT NULL,
  `good` double NOT NULL,
  `ordinary` double NOT NULL,
  `physical` double NOT NULL,
  `behavior` double NOT NULL,
  `development` double NOT NULL,
  `moral` double NOT NULL,
  `behaviorup` double NOT NULL,
  `term` varchar(16) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `comperformance_term_98541db216b86d0_uniq` (`term`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of comperformance
-- ----------------------------
INSERT INTO `comperformance` VALUES ('23', '40', '35', '30', '5', '35', '2', '40', '55', '2012年秋');

-- ----------------------------
-- Table structure for `comperformancebehaviorscore`
-- ----------------------------
DROP TABLE IF EXISTS `comperformancebehaviorscore`;
CREATE TABLE `comperformancebehaviorscore` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `student_id` int(11) NOT NULL,
  `comperformance_id` int(11) NOT NULL,
  `behavior_id` int(11) NOT NULL,
  `score` double,
  PRIMARY KEY (`id`),
  KEY `comperformancebehaviorscore_42ff452e` (`student_id`),
  KEY `comperformancebehaviorscore_28fbb1e5` (`comperformance_id`),
  KEY `comperformancebehaviorscore_1675d4f6` (`behavior_id`),
  CONSTRAINT `behavior_id_refs_id_77382c078dcf59a5` FOREIGN KEY (`behavior_id`) REFERENCES `behavior` (`id`),
  CONSTRAINT `comperformance_id_refs_id_9db7e2145d39566` FOREIGN KEY (`comperformance_id`) REFERENCES `comperformance` (`id`),
  CONSTRAINT `student_id_refs_id_550d503b0393d3c5` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of comperformancebehaviorscore
-- ----------------------------
INSERT INTO `comperformancebehaviorscore` VALUES ('1', '37', '23', '16', '5');
INSERT INTO `comperformancebehaviorscore` VALUES ('2', '37', '23', '14', '5');

-- ----------------------------
-- Table structure for `comperformancedevelopmentscore`
-- ----------------------------
DROP TABLE IF EXISTS `comperformancedevelopmentscore`;
CREATE TABLE `comperformancedevelopmentscore` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `student_id` int(11) NOT NULL,
  `comperformance_id` int(11) NOT NULL,
  `development_id` int(11) NOT NULL,
  `score` double,
  PRIMARY KEY (`id`),
  KEY `comperformancedevelopmentscore_42ff452e` (`student_id`),
  KEY `comperformancedevelopmentscore_28fbb1e5` (`comperformance_id`),
  KEY `comperformancedevelopmentscore_fce2cd04` (`development_id`),
  CONSTRAINT `comperformance_id_refs_id_3cde1d1e3bb5ec66` FOREIGN KEY (`comperformance_id`) REFERENCES `comperformance` (`id`),
  CONSTRAINT `development_id_refs_id_5a19d8e2dcf4b593` FOREIGN KEY (`development_id`) REFERENCES `development` (`id`),
  CONSTRAINT `student_id_refs_id_10b9c16c636bae29` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of comperformancedevelopmentscore
-- ----------------------------
INSERT INTO `comperformancedevelopmentscore` VALUES ('1', '37', '23', '16', '2');

-- ----------------------------
-- Table structure for `comperformancephysicalscore`
-- ----------------------------
DROP TABLE IF EXISTS `comperformancephysicalscore`;
CREATE TABLE `comperformancephysicalscore` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `student_id` int(11) NOT NULL,
  `comperformance_id` int(11) NOT NULL,
  `score` double,
  PRIMARY KEY (`id`),
  KEY `comperformancephysicalscore_42ff452e` (`student_id`),
  KEY `comperformancephysicalscore_28fbb1e5` (`comperformance_id`),
  CONSTRAINT `comperformance_id_refs_id_47d583b7ad9a3037` FOREIGN KEY (`comperformance_id`) REFERENCES `comperformance` (`id`),
  CONSTRAINT `student_id_refs_id_2e6f0bea3f56cbd8` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of comperformancephysicalscore
-- ----------------------------
INSERT INTO `comperformancephysicalscore` VALUES ('14', '37', '23', '5');

-- ----------------------------
-- Table structure for `comperformancescore`
-- ----------------------------
DROP TABLE IF EXISTS `comperformancescore`;
CREATE TABLE `comperformancescore` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `student_id` int(11) NOT NULL,
  `comperformance_id` int(11) NOT NULL,
  `score` double,
  `assessmentscore` double,
  PRIMARY KEY (`id`),
  KEY `comperformancescore_42ff452e` (`student_id`),
  KEY `comperformancescore_28fbb1e5` (`comperformance_id`),
  CONSTRAINT `comperformance_id_refs_id_5c562630e95b581c` FOREIGN KEY (`comperformance_id`) REFERENCES `comperformance` (`id`),
  CONSTRAINT `student_id_refs_id_c1fcc1a5d7f512d` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of comperformancescore
-- ----------------------------
INSERT INTO `comperformancescore` VALUES ('49', '37', '23', '88.038', '40');
INSERT INTO `comperformancescore` VALUES ('50', '38', '23', '83.9', '38.75');
INSERT INTO `comperformancescore` VALUES ('51', '39', '23', '78.015', '35');
INSERT INTO `comperformancescore` VALUES ('52', '40', '23', '79.509', '33.75');
INSERT INTO `comperformancescore` VALUES ('53', '41', '23', '73.166', '40');
INSERT INTO `comperformancescore` VALUES ('54', '42', '23', '78.848', '35');

-- ----------------------------
-- Table structure for `development`
-- ----------------------------
DROP TABLE IF EXISTS `development`;
CREATE TABLE `development` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent` varchar(1) NOT NULL DEFAULT '1',
  `name` varchar(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of development
-- ----------------------------
INSERT INTO `development` VALUES ('15', '1', '校电赛');
INSERT INTO `development` VALUES ('16', '0', '学生会');

-- ----------------------------
-- Table structure for `django_admin_log`
-- ----------------------------
DROP TABLE IF EXISTS `django_admin_log`;
CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `action_time` datetime NOT NULL,
  `user_id` int(11) NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_fbfc09f1` (`user_id`),
  KEY `django_admin_log_e4470c6e` (`content_type_id`),
  CONSTRAINT `content_type_id_refs_id_288599e6` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `user_id_refs_id_c8665aa` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=130 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of django_admin_log
-- ----------------------------
INSERT INTO `django_admin_log` VALUES ('1', '2012-12-16 03:13:11', '1', '12', '2', '2012年秋', '1', '');
INSERT INTO `django_admin_log` VALUES ('2', '2012-12-17 10:05:08', '1', '21', '1', '2012年秋郭猛-闫超', '1', '');
INSERT INTO `django_admin_log` VALUES ('3', '2012-12-17 10:15:56', '1', '12', '3', '2011年秋', '1', '');
INSERT INTO `django_admin_log` VALUES ('4', '2012-12-17 10:49:06', '1', '12', '4', '2011年春', '1', '');
INSERT INTO `django_admin_log` VALUES ('5', '2012-12-17 10:49:28', '1', '12', '5', '2012年春', '1', '');
INSERT INTO `django_admin_log` VALUES ('6', '2012-12-18 04:27:04', '1', '21', '1', '2012年秋郭猛-闫超', '3', '');
INSERT INTO `django_admin_log` VALUES ('7', '2012-12-18 05:20:54', '1', '21', '2', '2012年秋苏向坤-王冠群', '3', '');
INSERT INTO `django_admin_log` VALUES ('8', '2012-12-18 15:53:33', '1', '12', '31', '2012年秋', '2', '已修改 begindate 。');
INSERT INTO `django_admin_log` VALUES ('9', '2012-12-18 20:01:51', '1', '21', '1919', '2012年秋郭猛-闫超', '2', '已修改 result 。');
INSERT INTO `django_admin_log` VALUES ('10', '2012-12-18 20:02:06', '1', '21', '1920', '2012年秋郭猛-陈彦克', '2', '已修改 result 。');
INSERT INTO `django_admin_log` VALUES ('11', '2012-12-18 20:02:18', '1', '21', '1921', '2012年秋郭猛-张琦', '2', '已修改 result 。');
INSERT INTO `django_admin_log` VALUES ('12', '2012-12-18 20:02:37', '1', '21', '1924', '2012年秋郭猛-赵婷婷', '2', '已修改 result 。');
INSERT INTO `django_admin_log` VALUES ('13', '2012-12-18 20:02:58', '1', '21', '1923', '2012年秋郭猛-常轶群', '2', '已修改 result 。');
INSERT INTO `django_admin_log` VALUES ('14', '2012-12-18 20:03:15', '1', '21', '1930', '2012年秋郭猛-何鑫', '2', '已修改 result 。');
INSERT INTO `django_admin_log` VALUES ('15', '2012-12-18 20:03:26', '1', '21', '1929', '2012年秋郭猛-朴铁军', '2', '已修改 result 。');
INSERT INTO `django_admin_log` VALUES ('16', '2012-12-18 20:03:40', '1', '21', '1931', '2012年秋郭猛-王功勋', '2', '已修改 result 。');
INSERT INTO `django_admin_log` VALUES ('17', '2012-12-19 14:31:47', '1', '14', '2', '2012年秋  101110112-->82.64', '3', '');
INSERT INTO `django_admin_log` VALUES ('18', '2012-12-19 14:31:47', '1', '14', '1', '2012年秋  101110101-->72.38', '3', '');
INSERT INTO `django_admin_log` VALUES ('19', '2012-12-19 19:54:46', '1', '15', '1', '社团联合会', '1', '');
INSERT INTO `django_admin_log` VALUES ('20', '2012-12-19 19:55:05', '1', '15', '2', '卫生学院', '1', '');
INSERT INTO `django_admin_log` VALUES ('21', '2012-12-19 19:55:45', '1', '15', '3', '征文比赛', '1', '');
INSERT INTO `django_admin_log` VALUES ('22', '2012-12-19 19:55:59', '1', '15', '4', '志愿者', '1', '');
INSERT INTO `django_admin_log` VALUES ('23', '2012-12-19 22:05:59', '1', '15', '5', '123', '3', '');
INSERT INTO `django_admin_log` VALUES ('24', '2012-12-20 08:41:06', '1', '16', '1', '班委', '1', '');
INSERT INTO `django_admin_log` VALUES ('25', '2012-12-20 08:41:15', '1', '16', '2', '学生会', '1', '');
INSERT INTO `django_admin_log` VALUES ('26', '2012-12-20 08:41:47', '1', '16', '3', '省级以上竞赛', '1', '');
INSERT INTO `django_admin_log` VALUES ('27', '2012-12-20 08:42:05', '1', '16', '4', '软件工程师', '1', '');
INSERT INTO `django_admin_log` VALUES ('28', '2012-12-20 13:58:00', '1', '17', '1', '2012年秋', '1', '');
INSERT INTO `django_admin_log` VALUES ('29', '2012-12-20 14:23:35', '1', '24', '9', '综合成绩分数：88.12互评分数：37.78', '1', '');
INSERT INTO `django_admin_log` VALUES ('30', '2012-12-20 14:26:02', '1', '18', '1', '101110312-->个性发展分数:2.0', '1', '');
INSERT INTO `django_admin_log` VALUES ('31', '2012-12-20 14:26:20', '1', '20', '2', '101110312-->体能分数：5.0', '1', '');
INSERT INTO `django_admin_log` VALUES ('32', '2012-12-20 14:26:31', '1', '19', '2', '101110312-->日常行为分数:5.0', '1', '');
INSERT INTO `django_admin_log` VALUES ('33', '2012-12-20 14:26:57', '1', '18', '1', '101110312-->个性发展分数:2.0', '3', '');
INSERT INTO `django_admin_log` VALUES ('34', '2012-12-20 14:27:08', '1', '20', '2', '101110312-->体能分数：5.0', '3', '');
INSERT INTO `django_admin_log` VALUES ('35', '2012-12-20 14:27:28', '1', '19', '2', '101110312-->日常行为分数:5.0', '3', '');
INSERT INTO `django_admin_log` VALUES ('36', '2012-12-20 14:28:00', '1', '24', '9', '101110312-->综合成绩分数：88.12互评分数：37.78', '3', '');
INSERT INTO `django_admin_log` VALUES ('37', '2012-12-20 14:28:13', '1', '17', '1', '2012年秋', '3', '');
INSERT INTO `django_admin_log` VALUES ('38', '2012-12-21 14:03:15', '1', '17', '2', '2012年秋', '1', '');
INSERT INTO `django_admin_log` VALUES ('39', '2012-12-21 15:32:16', '1', '18', '2', '101110312-->个性发展分数:2.0', '1', '');
INSERT INTO `django_admin_log` VALUES ('40', '2012-12-21 15:32:21', '1', '18', '2', '101110312-->个性发展分数:2.0', '3', '');
INSERT INTO `django_admin_log` VALUES ('41', '2012-12-22 06:23:55', '1', '24', '15', '101110112-->综合成绩分数：107.64互评分数：0.0', '3', '');
INSERT INTO `django_admin_log` VALUES ('42', '2012-12-22 06:23:55', '1', '24', '14', '101110101-->综合成绩分数：102.33互评分数：0.0', '3', '');
INSERT INTO `django_admin_log` VALUES ('43', '2012-12-22 06:23:55', '1', '24', '13', '101110315-->综合成绩分数：119.12互评分数：0.0', '3', '');
INSERT INTO `django_admin_log` VALUES ('44', '2012-12-22 06:23:55', '1', '24', '12', '101110314-->综合成绩分数：106.45互评分数：0.0', '3', '');
INSERT INTO `django_admin_log` VALUES ('45', '2012-12-22 06:23:55', '1', '24', '11', '101110313-->综合成绩分数：112.89互评分数：0.0', '3', '');
INSERT INTO `django_admin_log` VALUES ('46', '2012-12-22 06:23:55', '1', '24', '10', '101110312-->综合成绩分数：116.38互评分数：0.0', '3', '');
INSERT INTO `django_admin_log` VALUES ('47', '2012-12-22 16:51:43', '1', '19', '3', '101110101-->日常行为分数:None', '3', '');
INSERT INTO `django_admin_log` VALUES ('48', '2012-12-22 16:52:38', '1', '19', '5', '101110101-->日常行为分数:None', '3', '');
INSERT INTO `django_admin_log` VALUES ('49', '2012-12-22 16:59:22', '1', '19', '7', '101110101-->日常行为分数:None', '3', '');
INSERT INTO `django_admin_log` VALUES ('50', '2012-12-22 17:05:56', '1', '19', '10', '101110101-->日常行为分数:None', '3', '');
INSERT INTO `django_admin_log` VALUES ('51', '2012-12-22 17:05:56', '1', '19', '9', '101110312-->日常行为分数:2.0', '3', '');
INSERT INTO `django_admin_log` VALUES ('52', '2012-12-22 17:05:56', '1', '19', '8', '101110112-->日常行为分数:2.0', '3', '');
INSERT INTO `django_admin_log` VALUES ('53', '2012-12-22 17:05:56', '1', '19', '6', '101110101-->日常行为分数:5.0', '3', '');
INSERT INTO `django_admin_log` VALUES ('54', '2012-12-22 17:05:57', '1', '19', '4', '101110101-->日常行为分数:5.0', '3', '');
INSERT INTO `django_admin_log` VALUES ('55', '2012-12-22 17:16:24', '1', '20', '3', '101110101-->体能分数：None', '3', '');
INSERT INTO `django_admin_log` VALUES ('56', '2012-12-22 20:34:16', '1', '17', '19', '2012年秋', '3', '');
INSERT INTO `django_admin_log` VALUES ('57', '2012-12-22 20:34:28', '1', '10', '11', '1011101', '3', '');
INSERT INTO `django_admin_log` VALUES ('58', '2012-12-22 20:34:28', '1', '10', '1', '1011103', '3', '');
INSERT INTO `django_admin_log` VALUES ('59', '2012-12-22 20:34:51', '1', '15', '6', '学校卫生', '3', '');
INSERT INTO `django_admin_log` VALUES ('60', '2012-12-22 20:34:51', '1', '15', '5', '篮球赛', '3', '');
INSERT INTO `django_admin_log` VALUES ('61', '2012-12-22 20:34:51', '1', '15', '4', '志愿者', '3', '');
INSERT INTO `django_admin_log` VALUES ('62', '2012-12-22 20:34:51', '1', '15', '2', '卫生学院', '3', '');
INSERT INTO `django_admin_log` VALUES ('63', '2012-12-22 20:34:51', '1', '15', '1', '社团联合会', '3', '');
INSERT INTO `django_admin_log` VALUES ('64', '2012-12-22 20:35:02', '1', '16', '6', '导员助理', '3', '');
INSERT INTO `django_admin_log` VALUES ('65', '2012-12-22 20:35:02', '1', '16', '5', '校电赛', '3', '');
INSERT INTO `django_admin_log` VALUES ('66', '2012-12-22 20:35:02', '1', '16', '4', '软件工程师', '3', '');
INSERT INTO `django_admin_log` VALUES ('67', '2012-12-22 20:35:02', '1', '16', '3', '省级以上竞赛', '3', '');
INSERT INTO `django_admin_log` VALUES ('68', '2012-12-22 20:35:02', '1', '16', '2', '学生会', '3', '');
INSERT INTO `django_admin_log` VALUES ('69', '2012-12-22 20:35:14', '1', '12', '39', '2013年春', '3', '');
INSERT INTO `django_admin_log` VALUES ('70', '2012-12-22 20:35:14', '1', '12', '38', '2012年秋', '3', '');
INSERT INTO `django_admin_log` VALUES ('71', '2012-12-22 20:40:15', '1', '3', '14', '101110101', '3', '');
INSERT INTO `django_admin_log` VALUES ('72', '2012-12-22 20:40:15', '1', '3', '15', '101110112', '3', '');
INSERT INTO `django_admin_log` VALUES ('73', '2012-12-22 20:40:15', '1', '3', '3', '101110312', '3', '');
INSERT INTO `django_admin_log` VALUES ('74', '2012-12-22 20:40:15', '1', '3', '4', '101110313', '3', '');
INSERT INTO `django_admin_log` VALUES ('75', '2012-12-22 20:40:15', '1', '3', '5', '101110314', '3', '');
INSERT INTO `django_admin_log` VALUES ('76', '2012-12-22 20:40:15', '1', '3', '6', '101110315', '3', '');
INSERT INTO `django_admin_log` VALUES ('77', '2012-12-22 21:00:33', '1', '17', '20', '2012年秋', '3', '');
INSERT INTO `django_admin_log` VALUES ('78', '2012-12-22 21:00:44', '1', '10', '17', '1011101', '3', '');
INSERT INTO `django_admin_log` VALUES ('79', '2012-12-22 21:00:44', '1', '10', '15', '1011104', '3', '');
INSERT INTO `django_admin_log` VALUES ('80', '2012-12-22 21:00:44', '1', '10', '14', '1011103', '3', '');
INSERT INTO `django_admin_log` VALUES ('81', '2012-12-22 21:00:54', '1', '16', '9', '软件工程师', '3', '');
INSERT INTO `django_admin_log` VALUES ('82', '2012-12-22 21:00:54', '1', '16', '8', '省赛', '3', '');
INSERT INTO `django_admin_log` VALUES ('83', '2012-12-22 21:00:54', '1', '16', '7', '学生会', '3', '');
INSERT INTO `django_admin_log` VALUES ('84', '2012-12-22 21:01:02', '1', '12', '40', '2012年秋', '3', '');
INSERT INTO `django_admin_log` VALUES ('85', '2012-12-22 21:01:28', '1', '15', '9', '运动会', '3', '');
INSERT INTO `django_admin_log` VALUES ('86', '2012-12-22 21:01:28', '1', '15', '8', '编程大赛', '3', '');
INSERT INTO `django_admin_log` VALUES ('87', '2012-12-22 21:01:28', '1', '15', '7', '卫生', '3', '');
INSERT INTO `django_admin_log` VALUES ('88', '2012-12-22 21:07:25', '1', '3', '25', '101110101', '3', '');
INSERT INTO `django_admin_log` VALUES ('89', '2012-12-22 21:07:25', '1', '3', '26', '101110112', '3', '');
INSERT INTO `django_admin_log` VALUES ('90', '2012-12-22 21:07:25', '1', '3', '24', '101110201', '3', '');
INSERT INTO `django_admin_log` VALUES ('91', '2012-12-22 21:07:25', '1', '3', '18', '101110312', '3', '');
INSERT INTO `django_admin_log` VALUES ('92', '2012-12-22 21:07:25', '1', '3', '19', '101110313', '3', '');
INSERT INTO `django_admin_log` VALUES ('93', '2012-12-22 21:07:25', '1', '3', '21', '101110314', '3', '');
INSERT INTO `django_admin_log` VALUES ('94', '2012-12-22 21:07:25', '1', '3', '20', '101110315', '3', '');
INSERT INTO `django_admin_log` VALUES ('95', '2012-12-22 21:07:25', '1', '3', '22', '101110401', '3', '');
INSERT INTO `django_admin_log` VALUES ('96', '2012-12-22 21:07:25', '1', '3', '23', '101110405', '3', '');
INSERT INTO `django_admin_log` VALUES ('97', '2012-12-23 10:00:18', '1', '17', '21', '2012年秋', '3', '');
INSERT INTO `django_admin_log` VALUES ('98', '2012-12-23 10:00:29', '1', '10', '19', '1011103', '3', '');
INSERT INTO `django_admin_log` VALUES ('99', '2012-12-23 10:00:29', '1', '10', '18', '1011101', '3', '');
INSERT INTO `django_admin_log` VALUES ('100', '2012-12-23 10:02:37', '1', '16', '12', '软件工程师', '3', '');
INSERT INTO `django_admin_log` VALUES ('101', '2012-12-23 10:02:37', '1', '16', '11', 'acm', '3', '');
INSERT INTO `django_admin_log` VALUES ('102', '2012-12-23 10:02:37', '1', '16', '10', '学生会', '3', '');
INSERT INTO `django_admin_log` VALUES ('103', '2012-12-23 10:02:55', '1', '15', '11', '篮球赛', '3', '');
INSERT INTO `django_admin_log` VALUES ('104', '2012-12-23 10:02:55', '1', '15', '10', '卫生', '3', '');
INSERT INTO `django_admin_log` VALUES ('105', '2012-12-23 10:03:13', '1', '12', '42', '2012年秋', '3', '');
INSERT INTO `django_admin_log` VALUES ('106', '2012-12-23 10:03:37', '1', '3', '27', '101110101', '3', '');
INSERT INTO `django_admin_log` VALUES ('107', '2012-12-23 10:03:37', '1', '3', '33', '101110103', '3', '');
INSERT INTO `django_admin_log` VALUES ('108', '2012-12-23 10:03:37', '1', '3', '28', '101110112', '3', '');
INSERT INTO `django_admin_log` VALUES ('109', '2012-12-23 10:03:37', '1', '3', '29', '101110312', '3', '');
INSERT INTO `django_admin_log` VALUES ('110', '2012-12-23 10:03:37', '1', '3', '31', '101110313', '3', '');
INSERT INTO `django_admin_log` VALUES ('111', '2012-12-23 10:03:37', '1', '3', '30', '101110314', '3', '');
INSERT INTO `django_admin_log` VALUES ('112', '2012-12-23 10:03:37', '1', '3', '32', '101110315', '3', '');
INSERT INTO `django_admin_log` VALUES ('113', '2012-12-23 11:09:12', '1', '3', '41', 'aabbcc', '1', '');
INSERT INTO `django_admin_log` VALUES ('114', '2012-12-23 11:09:51', '1', '3', '41', 'aabbc', '2', '已修改 username 。');
INSERT INTO `django_admin_log` VALUES ('115', '2012-12-23 11:10:22', '1', '3', '41', 'aabbc', '3', '');
INSERT INTO `django_admin_log` VALUES ('116', '2012-12-25 08:26:36', '1', '3', '34', '101110101', '3', '');
INSERT INTO `django_admin_log` VALUES ('117', '2012-12-25 08:26:37', '1', '3', '35', '101110112', '3', '');
INSERT INTO `django_admin_log` VALUES ('118', '2012-12-25 08:26:37', '1', '3', '40', '101110312', '3', '');
INSERT INTO `django_admin_log` VALUES ('119', '2012-12-25 08:26:37', '1', '3', '36', '101110313', '3', '');
INSERT INTO `django_admin_log` VALUES ('120', '2012-12-25 08:26:37', '1', '3', '37', '101110314', '3', '');
INSERT INTO `django_admin_log` VALUES ('121', '2012-12-25 08:26:37', '1', '3', '38', '101110315', '3', '');
INSERT INTO `django_admin_log` VALUES ('122', '2012-12-25 08:26:52', '1', '16', '14', '省级以上竞赛', '3', '');
INSERT INTO `django_admin_log` VALUES ('123', '2012-12-25 08:26:52', '1', '16', '13', '学生会', '3', '');
INSERT INTO `django_admin_log` VALUES ('124', '2012-12-25 08:27:06', '1', '12', '43', '2012年秋', '3', '');
INSERT INTO `django_admin_log` VALUES ('125', '2012-12-25 08:28:10', '1', '15', '13', '卫生', '3', '');
INSERT INTO `django_admin_log` VALUES ('126', '2012-12-25 08:28:10', '1', '15', '12', '运动会', '3', '');
INSERT INTO `django_admin_log` VALUES ('127', '2012-12-25 08:28:20', '1', '10', '21', '1011103', '3', '');
INSERT INTO `django_admin_log` VALUES ('128', '2012-12-25 08:28:20', '1', '10', '20', '1011101', '3', '');
INSERT INTO `django_admin_log` VALUES ('129', '2012-12-25 08:28:33', '1', '17', '22', '2012年秋', '3', '');

-- ----------------------------
-- Table structure for `django_content_type`
-- ----------------------------
DROP TABLE IF EXISTS `django_content_type`;
CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `app_label` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of django_content_type
-- ----------------------------
INSERT INTO `django_content_type` VALUES ('1', 'permission', 'auth', 'permission');
INSERT INTO `django_content_type` VALUES ('2', 'group', 'auth', 'group');
INSERT INTO `django_content_type` VALUES ('3', 'user', 'auth', 'user');
INSERT INTO `django_content_type` VALUES ('4', 'message', 'auth', 'message');
INSERT INTO `django_content_type` VALUES ('5', 'content type', 'contenttypes', 'contenttype');
INSERT INTO `django_content_type` VALUES ('6', 'session', 'sessions', 'session');
INSERT INTO `django_content_type` VALUES ('7', 'site', 'sites', 'site');
INSERT INTO `django_content_type` VALUES ('8', 'captcha store', 'captcha', 'captchastore');
INSERT INTO `django_content_type` VALUES ('9', 'migration history', 'south', 'migrationhistory');
INSERT INTO `django_content_type` VALUES ('10', 'class', 'engine', 'class');
INSERT INTO `django_content_type` VALUES ('11', 'student', 'engine', 'student');
INSERT INTO `django_content_type` VALUES ('12', 'assessment', 'engine', 'assessment');
INSERT INTO `django_content_type` VALUES ('14', 'grade', 'engine', 'grade');
INSERT INTO `django_content_type` VALUES ('15', 'behavior', 'engine', 'behavior');
INSERT INTO `django_content_type` VALUES ('16', 'development', 'engine', 'development');
INSERT INTO `django_content_type` VALUES ('17', 'comperformance', 'engine', 'comperformance');
INSERT INTO `django_content_type` VALUES ('18', 'comperformance development score', 'engine', 'comperformancedevelopmentscore');
INSERT INTO `django_content_type` VALUES ('19', 'comperformance behavior score', 'engine', 'comperformancebehaviorscore');
INSERT INTO `django_content_type` VALUES ('20', 'comperformance physical score', 'engine', 'comperformancephysicalscore');
INSERT INTO `django_content_type` VALUES ('21', 'assessment record', 'engine', 'assessmentrecord');
INSERT INTO `django_content_type` VALUES ('22', 'log entry', 'admin', 'logentry');
INSERT INTO `django_content_type` VALUES ('23', 'assessment row', 'engine', 'assessmentrow');
INSERT INTO `django_content_type` VALUES ('24', 'comperformance score', 'engine', 'comperformancescore');

-- ----------------------------
-- Table structure for `django_session`
-- ----------------------------
DROP TABLE IF EXISTS `django_session`;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_c25c2c28` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of django_session
-- ----------------------------
INSERT INTO `django_session` VALUES ('008bf666be8a0fd730534848b6580c72', 'YWMxOTAyMTE4MTE3NTYzMWFhYmZlNTNiM2M1YTdhODNkNmFhOWRkMjqAAn1xAShVEl9hdXRoX3Vz\nZXJfYmFja2VuZHECVSlkamFuZ28uY29udHJpYi5hdXRoLmJhY2tlbmRzLk1vZGVsQmFja2VuZHED\nVQ1fYXV0aF91c2VyX2lkcQSKAQF1Lg==\n', '2013-01-06 09:44:18');
INSERT INTO `django_session` VALUES ('0b3aaeb7ef95c35ad9fab2764b710510', 'YWMxOTAyMTE4MTE3NTYzMWFhYmZlNTNiM2M1YTdhODNkNmFhOWRkMjqAAn1xAShVEl9hdXRoX3Vz\nZXJfYmFja2VuZHECVSlkamFuZ28uY29udHJpYi5hdXRoLmJhY2tlbmRzLk1vZGVsQmFja2VuZHED\nVQ1fYXV0aF91c2VyX2lkcQSKAQF1Lg==\n', '2013-01-06 08:52:16');
INSERT INTO `django_session` VALUES ('1f3fadc96f1dd829588a45c500ebbd17', 'YWMxOTAyMTE4MTE3NTYzMWFhYmZlNTNiM2M1YTdhODNkNmFhOWRkMjqAAn1xAShVEl9hdXRoX3Vz\nZXJfYmFja2VuZHECVSlkamFuZ28uY29udHJpYi5hdXRoLmJhY2tlbmRzLk1vZGVsQmFja2VuZHED\nVQ1fYXV0aF91c2VyX2lkcQSKAQF1Lg==\n', '2013-01-04 07:34:21');
INSERT INTO `django_session` VALUES ('25cf8ce32028cfd20d4277c07b7ae354', 'YWMxOTAyMTE4MTE3NTYzMWFhYmZlNTNiM2M1YTdhODNkNmFhOWRkMjqAAn1xAShVEl9hdXRoX3Vz\nZXJfYmFja2VuZHECVSlkamFuZ28uY29udHJpYi5hdXRoLmJhY2tlbmRzLk1vZGVsQmFja2VuZHED\nVQ1fYXV0aF91c2VyX2lkcQSKAQF1Lg==\n', '2012-12-31 23:17:42');
INSERT INTO `django_session` VALUES ('28bb36b7177e872d3dd74a4678f096e5', 'YWMxOTAyMTE4MTE3NTYzMWFhYmZlNTNiM2M1YTdhODNkNmFhOWRkMjqAAn1xAShVEl9hdXRoX3Vz\nZXJfYmFja2VuZHECVSlkamFuZ28uY29udHJpYi5hdXRoLmJhY2tlbmRzLk1vZGVsQmFja2VuZHED\nVQ1fYXV0aF91c2VyX2lkcQSKAQF1Lg==\n', '2013-01-06 00:15:05');
INSERT INTO `django_session` VALUES ('2a9f7aed2c9b91308c9047dfa4b91ffc', 'YWMxOTAyMTE4MTE3NTYzMWFhYmZlNTNiM2M1YTdhODNkNmFhOWRkMjqAAn1xAShVEl9hdXRoX3Vz\nZXJfYmFja2VuZHECVSlkamFuZ28uY29udHJpYi5hdXRoLmJhY2tlbmRzLk1vZGVsQmFja2VuZHED\nVQ1fYXV0aF91c2VyX2lkcQSKAQF1Lg==\n', '2012-12-24 19:11:27');
INSERT INTO `django_session` VALUES ('557af2dbc8055cace195319bf63160a6', 'YWMxOTAyMTE4MTE3NTYzMWFhYmZlNTNiM2M1YTdhODNkNmFhOWRkMjqAAn1xAShVEl9hdXRoX3Vz\nZXJfYmFja2VuZHECVSlkamFuZ28uY29udHJpYi5hdXRoLmJhY2tlbmRzLk1vZGVsQmFja2VuZHED\nVQ1fYXV0aF91c2VyX2lkcQSKAQF1Lg==\n', '2012-12-31 14:32:46');
INSERT INTO `django_session` VALUES ('67452165b7d8efa23e52dcfb1a146993', 'NWRiOTI2OTQ3ODIxYTU3OGZhMGRiNmFlYWM0MmYzNWIxZjI5OWU5MzqAAn1xAShVDV9hdXRoX3Vz\nZXJfaWSKAQFVEl9hdXRoX3VzZXJfYmFja2VuZFUpZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5k\ncy5Nb2RlbEJhY2tlbmRxAnUu\n', '2012-12-24 21:11:51');
INSERT INTO `django_session` VALUES ('8e36e3f3b459f0aa25ab60af96614cae', 'ZGM2MzFjZDFiZGM2MWFkMjBmZGY1NjAyNmE2ZGZiZGZhNDIyMmYzODqAAn1xAS4=\n', '2013-01-06 11:16:01');
INSERT INTO `django_session` VALUES ('9eb769b87dfdae0baf26fd75fb41c15a', 'YWMxOTAyMTE4MTE3NTYzMWFhYmZlNTNiM2M1YTdhODNkNmFhOWRkMjqAAn1xAShVEl9hdXRoX3Vz\nZXJfYmFja2VuZHECVSlkamFuZ28uY29udHJpYi5hdXRoLmJhY2tlbmRzLk1vZGVsQmFja2VuZHED\nVQ1fYXV0aF91c2VyX2lkcQSKAQF1Lg==\n', '2012-12-24 21:41:04');
INSERT INTO `django_session` VALUES ('aadd8f0719cb1d2006dfa8e7ca9adafb', 'YWMxOTAyMTE4MTE3NTYzMWFhYmZlNTNiM2M1YTdhODNkNmFhOWRkMjqAAn1xAShVEl9hdXRoX3Vz\nZXJfYmFja2VuZHECVSlkamFuZ28uY29udHJpYi5hdXRoLmJhY2tlbmRzLk1vZGVsQmFja2VuZHED\nVQ1fYXV0aF91c2VyX2lkcQSKAQF1Lg==\n', '2013-01-18 14:37:27');
INSERT INTO `django_session` VALUES ('b30a94cfd066a3efe05eb674c017b9c6', 'YWMxOTAyMTE4MTE3NTYzMWFhYmZlNTNiM2M1YTdhODNkNmFhOWRkMjqAAn1xAShVEl9hdXRoX3Vz\nZXJfYmFja2VuZHECVSlkamFuZ28uY29udHJpYi5hdXRoLmJhY2tlbmRzLk1vZGVsQmFja2VuZHED\nVQ1fYXV0aF91c2VyX2lkcQSKAQF1Lg==\n', '2012-12-25 00:10:48');
INSERT INTO `django_session` VALUES ('b40950becdf9a0e127a7d71e70f6bf73', 'YWMxOTAyMTE4MTE3NTYzMWFhYmZlNTNiM2M1YTdhODNkNmFhOWRkMjqAAn1xAShVEl9hdXRoX3Vz\nZXJfYmFja2VuZHECVSlkamFuZ28uY29udHJpYi5hdXRoLmJhY2tlbmRzLk1vZGVsQmFja2VuZHED\nVQ1fYXV0aF91c2VyX2lkcQSKAQF1Lg==\n', '2012-12-24 18:33:22');
INSERT INTO `django_session` VALUES ('bd85cffc3d8bc15bc18ff804668bfe1c', 'YWMxOTAyMTE4MTE3NTYzMWFhYmZlNTNiM2M1YTdhODNkNmFhOWRkMjqAAn1xAShVEl9hdXRoX3Vz\nZXJfYmFja2VuZHECVSlkamFuZ28uY29udHJpYi5hdXRoLmJhY2tlbmRzLk1vZGVsQmFja2VuZHED\nVQ1fYXV0aF91c2VyX2lkcQSKAQF1Lg==\n', '2012-12-24 11:17:48');
INSERT INTO `django_session` VALUES ('bec32181a58f03b7899172ff4dd66171', 'YWMxOTAyMTE4MTE3NTYzMWFhYmZlNTNiM2M1YTdhODNkNmFhOWRkMjqAAn1xAShVEl9hdXRoX3Vz\nZXJfYmFja2VuZHECVSlkamFuZ28uY29udHJpYi5hdXRoLmJhY2tlbmRzLk1vZGVsQmFja2VuZHED\nVQ1fYXV0aF91c2VyX2lkcQSKAQF1Lg==\n', '2013-01-23 10:25:34');
INSERT INTO `django_session` VALUES ('ccab94e9743df95805ac6eeed4c852e6', 'NWRiOTI2OTQ3ODIxYTU3OGZhMGRiNmFlYWM0MmYzNWIxZjI5OWU5MzqAAn1xAShVDV9hdXRoX3Vz\nZXJfaWSKAQFVEl9hdXRoX3VzZXJfYmFja2VuZFUpZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5k\ncy5Nb2RlbEJhY2tlbmRxAnUu\n', '2013-01-01 23:40:08');
INSERT INTO `django_session` VALUES ('d3d9151f853cb053a11c54cda18a4963', 'YWMxOTAyMTE4MTE3NTYzMWFhYmZlNTNiM2M1YTdhODNkNmFhOWRkMjqAAn1xAShVEl9hdXRoX3Vz\nZXJfYmFja2VuZHECVSlkamFuZ28uY29udHJpYi5hdXRoLmJhY2tlbmRzLk1vZGVsQmFja2VuZHED\nVQ1fYXV0aF91c2VyX2lkcQSKAQF1Lg==\n', '2013-02-02 09:41:42');
INSERT INTO `django_session` VALUES ('d78f26e38024658ca796d1952b36d0a7', 'ZGM2MzFjZDFiZGM2MWFkMjBmZGY1NjAyNmE2ZGZiZGZhNDIyMmYzODqAAn1xAS4=\n', '2012-12-26 06:54:15');
INSERT INTO `django_session` VALUES ('f0f54559c4f4af1a15a6ca4ecbd16c0c', 'YWMxOTAyMTE4MTE3NTYzMWFhYmZlNTNiM2M1YTdhODNkNmFhOWRkMjqAAn1xAShVEl9hdXRoX3Vz\nZXJfYmFja2VuZHECVSlkamFuZ28uY29udHJpYi5hdXRoLmJhY2tlbmRzLk1vZGVsQmFja2VuZHED\nVQ1fYXV0aF91c2VyX2lkcQSKAQF1Lg==\n', '2013-01-06 09:16:57');
INSERT INTO `django_session` VALUES ('f7e93ce64a321579329ec016581ea4c7', 'ZGM2MzFjZDFiZGM2MWFkMjBmZGY1NjAyNmE2ZGZiZGZhNDIyMmYzODqAAn1xAS4=\n', '2013-01-06 08:34:33');

-- ----------------------------
-- Table structure for `django_site`
-- ----------------------------
DROP TABLE IF EXISTS `django_site`;
CREATE TABLE `django_site` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `domain` varchar(100) NOT NULL,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of django_site
-- ----------------------------
INSERT INTO `django_site` VALUES ('1', 'example.com', 'example.com');

-- ----------------------------
-- Table structure for `grade`
-- ----------------------------
DROP TABLE IF EXISTS `grade`;
CREATE TABLE `grade` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `term` varchar(16) NOT NULL,
  `student_id` int(11) NOT NULL,
  `score` double NOT NULL,
  PRIMARY KEY (`id`),
  KEY `grade_42ff452e` (`student_id`),
  CONSTRAINT `student_id_refs_id_696aeb74468fbd7` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=111 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of grade
-- ----------------------------
INSERT INTO `grade` VALUES ('87', '2012年秋', '41', '72.38');
INSERT INTO `grade` VALUES ('88', '2012年秋', '42', '82.64');
INSERT INTO `grade` VALUES ('89', '2012年秋', '37', '84.34');
INSERT INTO `grade` VALUES ('90', '2012年秋', '38', '88.25');
INSERT INTO `grade` VALUES ('91', '2012年秋', '39', '81.45');
INSERT INTO `grade` VALUES ('92', '2012年秋', '40', '84.12');
INSERT INTO `grade` VALUES ('93', '2012年春', '41', '82.38');
INSERT INTO `grade` VALUES ('94', '2012年春', '42', '72.64');
INSERT INTO `grade` VALUES ('95', '2012年春', '37', '74.34');
INSERT INTO `grade` VALUES ('96', '2012年春', '38', '68.25');
INSERT INTO `grade` VALUES ('97', '2012年春', '39', '71.45');
INSERT INTO `grade` VALUES ('98', '2012年春', '40', '64.12');
INSERT INTO `grade` VALUES ('99', '2011年春', '41', '67.33');
INSERT INTO `grade` VALUES ('100', '2011年春', '42', '72.64');
INSERT INTO `grade` VALUES ('101', '2011年春', '37', '81.38');
INSERT INTO `grade` VALUES ('102', '2011年春', '38', '77.89');
INSERT INTO `grade` VALUES ('103', '2011年春', '39', '71.45');
INSERT INTO `grade` VALUES ('104', '2011年春', '40', '84.12');
INSERT INTO `grade` VALUES ('105', '2011年秋', '41', '88.12');
INSERT INTO `grade` VALUES ('106', '2011年秋', '42', '67.35');
INSERT INTO `grade` VALUES ('107', '2011年秋', '37', '65.58');
INSERT INTO `grade` VALUES ('108', '2011年秋', '38', '76.89');
INSERT INTO `grade` VALUES ('109', '2011年秋', '39', '66.82');
INSERT INTO `grade` VALUES ('110', '2011年秋', '40', '74.12');

-- ----------------------------
-- Table structure for `south_migrationhistory`
-- ----------------------------
DROP TABLE IF EXISTS `south_migrationhistory`;
CREATE TABLE `south_migrationhistory` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app_name` varchar(255) NOT NULL,
  `migration` varchar(255) NOT NULL,
  `applied` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of south_migrationhistory
-- ----------------------------
INSERT INTO `south_migrationhistory` VALUES ('12', 'engine', '0001_initial', '2012-12-20 06:09:38');
INSERT INTO `south_migrationhistory` VALUES ('13', 'captcha', '0001_initial', '2012-12-20 06:10:09');
INSERT INTO `south_migrationhistory` VALUES ('14', 'engine', '0002_auto__del_field_comperformancescore_assessmentscore', '2012-12-20 06:11:29');
INSERT INTO `south_migrationhistory` VALUES ('15', 'engine', '0003_auto__add_field_comperformancescore_assessmentscore', '2012-12-20 06:11:48');
INSERT INTO `south_migrationhistory` VALUES ('16', 'engine', '0004_auto__chg_field_comperformancescore_score__chg_field_comperformancesco', '2012-12-20 06:14:29');
INSERT INTO `south_migrationhistory` VALUES ('17', 'engine', '0005_auto__chg_field_comperformancedevelopmentscore_score__chg_field_comper', '2012-12-22 08:50:45');

-- ----------------------------
-- Table structure for `student`
-- ----------------------------
DROP TABLE IF EXISTS `student`;
CREATE TABLE `student` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `realname` varchar(16) NOT NULL,
  `theclass_id` int(11) NOT NULL,
  `sex` varchar(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`),
  KEY `student_c48b39e9` (`theclass_id`),
  CONSTRAINT `theclass_id_refs_id_660c1d0a704564aa` FOREIGN KEY (`theclass_id`) REFERENCES `class` (`id`),
  CONSTRAINT `user_id_refs_id_32dd460521947d82` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of student
-- ----------------------------
INSERT INTO `student` VALUES ('37', '41', '郭猛', '22', '0');
INSERT INTO `student` VALUES ('38', '42', '闫超', '22', '0');
INSERT INTO `student` VALUES ('39', '43', '陈彦克', '22', '0');
INSERT INTO `student` VALUES ('40', '44', '张琦', '22', '0');
INSERT INTO `student` VALUES ('41', '45', '朱明珠', '23', '1');
INSERT INTO `student` VALUES ('42', '46', '王凯', '23', '0');
