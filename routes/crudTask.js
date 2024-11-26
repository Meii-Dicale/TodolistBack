// |       1 = A faire  ||  2 = En cours  || 3 = Terminé

const express = require('express');
const router = express.Router();
const bdd = require('../config/bdd');
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config(); 
const SECRET_KEY = process.env.SECRET_KEY ;

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    console.log(token);
    if (!token) return res.status(401).json({ error: 'Token manquant' });

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded; // Stocke les données du token dans req.user
        next();
    } catch (err) {
        res.status(403).json({ error: 'Token invalide' });
        console.error(err);
    }
};
// Créer une tâche 

router.post('/createTask', authenticateToken, (req, res) => {
    const {idUser, libelleTask} = req.body;
    const createTask = "INSERT INTO task (libelleTask,idUser, idState ) VALUES (?, ? , 1)"
    bdd.query(createTask,[ libelleTask, idUser], (error, result) => {
        if (error) throw error;
        console.log('Tâche ajoutée')
        res.status(200).json({ message: 'Tâche ajoutée' });
    } );
});

// supprimer une tâche

router.get('/deleteTask/:id',authenticateToken, (req, res) => {
    const idTask = req.params.id;
    console.log(idTask);
    const deleteTask = "DELETE FROM task WHERE idTask =(?)"
    bdd.query(deleteTask, [idTask], (error, result) => {
        if (error) throw error;
        console.log('Tâche supprimée')
        res.status(200).json({ message: 'Tâche supprimée' });
    } );
});

// Modifier une tâche

router.post('/updateTask/:id', authenticateToken,(req, res) => {
    const {libelleTask } = req.body;
    const idTask = req.params.id;
    const updateTask = "UPDATE task SET libelleTask =? WHERE idTask =?"
    bdd.query(updateTask,[libelleTask, idTask], (error, result) => {
        if (error) throw error;
        console.log('Tâche modifiée')
        res.status(200).json({ message: 'Tâche modifiée' });
    } );
});

// Modifier état de la tâche 

router.post('/updateStateTask/:id',authenticateToken, (req, res) => {
    const {idState } = req.body;
    const idTask = req.params.id;
    const updateStateTask = "UPDATE task SET idState =? WHERE idTask =?"
    bdd.query(updateStateTask,[idState, idTask], (error, result) => {
        if (error) throw error;
        console.log('Etat de la tâche modifié')
        res.status(200).json({ message: 'Etat de la tâche modifié' });
    } );
});

router.post('/allTasks', authenticateToken, (req, res) => {
    const {idUser} = req.body
    const allTasks = "SELECT * FROM task WHERE idUser =(?)"
    bdd.query(allTasks,[idUser], (error, result) => {
        if (error) throw error;
        res.send(result)
        
    } )});




module.exports = router;