Afin de lancer le projet creez le fichier .env :

HOST
PASSWORD
DATABASE
SECRET_KEY

Dans le fichier bdd.js remplacez par voter utilisateur:

user: "Meii"

Afin de créer votre base de donnée :

CREATE DATABASE todolist;
USE todolist;

-- Création de la table 'user'
CREATE TABLE user (
    idUser INT PRIMARY KEY AUTO_INCREMENT,
    nameUser VARCHAR(50),
    passwordUser VARCHAR(255)
);

-- Création de la table 'state'
CREATE TABLE state (
    idState INT PRIMARY KEY AUTO_INCREMENT,
    libelleState VARCHAR(50)
);

-- Création de la table 'task' avec les foreign keys et ON DELETE CASCADE
CREATE TABLE task (
    idTask INT PRIMARY KEY AUTO_INCREMENT,
    libelleTask TEXT,
    idUser INT,
    idState INT,
    CONSTRAINT fk_user FOREIGN KEY (idUser) REFERENCES user (idUser) ON DELETE CASCADE,
    CONSTRAINT fk_state FOREIGN KEY (idState) REFERENCES state (idState) ON DELETE CASCADE
);
