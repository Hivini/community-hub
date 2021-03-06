CREATE DATABASE community_hub;
USE community_hub;

CREATE TABLE COMMUNITY(
    id INT AUTO_INCREMENT,
    name VARCHAR(64) NOT NULL,
    lat REAL NOT NULL,
    lon REAL NOT NULL,
    currency VARCHAR(16) NOT NULL,
    city VARCHAR(64) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE HOUSE (
    id INT AUTO_INCREMENT,
    name VARCHAR(64) NOT NULL,
    communityId INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (communityId) REFERENCES COMMUNITY(id) ON DELETE CASCADE
);

CREATE TABLE USER (
    id VARCHAR(40) DEFAULT (uuid()),
    name VARCHAR(64) NOT NULL,
    email VARCHAR(320) NOT NULL UNIQUE,
    password CHAR(64) NOT NULL,
    houseId INT,
    PRIMARY KEY (id),
    FOREIGN KEY (houseId) REFERENCES HOUSE(id)
);

CREATE TABLE REQUEST (
    id INT AUTO_INCREMENT,
    content VARCHAR(256) NOT NULL,
    creationDate DATETIME NOT NULL,
    houseId INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (houseId) REFERENCES HOUSE(id) ON DELETE CASCADE
);

CREATE TABLE COMMUNITY_EVENT (
    id INT AUTO_INCREMENT,
    description VARCHAR(256) NOT NULL,
    eventDate DATETIME NOT NULL,
    communityId INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (communityId) REFERENCES COMMUNITY(id)
);

CREATE TABLE MESSAGE (
    id INT AUTO_INCREMENT,
    description VARCHAR(256) NOT NULL,
    sentTime DATETIME NOT NULL,
    communityId INT NOT NULL,
    userId VARCHAR(40) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (communityId) REFERENCES COMMUNITY(id) ON DELETE CASCADE,
    FOREIGN KEY (userId) REFERENCES USER(id) ON DELETE CASCADE
);
