// |       1 = A faire  ||  2 = En cours  || 3 = Terminé

const express = require('express');
const router = express.Router();
const bdd = require('../config/bdd');

// Créer une tâche 

router.post('/createTask', (req, res) => {
    const {idUser, libelleTask} = req.body;
    const createTask = "INSERT INTO task (libelleTask,idUser, idState ) VALUES (?, ? , 1)"
    bdd.query(createTask,[ libelleTask, idUser], (error, result) => {
        if (error) throw error;
        console.log('Tâche ajoutée')
    } );
});

// supprimer une tâche

router.get('/deleteTask/:id', (req, res) => {
    const idTask = req.params.id;
    console.log(idTask);
    const deleteTask = "DELETE FROM task WHERE idTask =(?)"
    bdd.query(deleteTask, [idTask], (error, result) => {
        if (error) throw error;
        console.log('Tâche supprimée')
    } );
});

// Modifier une tâche

router.post('/updateTask/:id', (req, res) => {
    const {libelleTask } = req.body;
    const idTask = req.params.id;
    const updateTask = "UPDATE task SET libelleTask =? WHERE idTask =?"
    bdd.query(updateTask,[libelleTask, idTask], (error, result) => {
        if (error) throw error;
        console.log('Tâche modifiée')
    } );
});

// Modifier état de la tâche 

router.post('/updateStateTask/:id', (req, res) => {
    const {idState } = req.body;
    const idTask = req.params.id;
    const updateStateTask = "UPDATE task SET idState =? WHERE idTask =?"
    bdd.query(updateStateTask,[idState, idTask], (error, result) => {
        if (error) throw error;
        console.log('Etat de la tâche modifié')
    } );
});

// Afficher les taches en cours 

router.post('/tasksInProgress', (req, res) => {
    const {idUser} = req.body
    const tasksInProgress = "SELECT * FROM task WHERE idState = 2 AND idUser =(?)"
    bdd.query(tasksInProgress, [idUser], (error, result) => {
        if (error) throw error;
        res.send(result)
    } );
});

// Afficher les taches terminées

router.post('/tasksFinished', (req, res) => {
    const {idUser} = req.body
    const tasksFinished = "SELECT * FROM task WHERE idState = 3 AND idUser =(?)"
    bdd.query(tasksFinished,[idUser], (error, result) => {
        if (error) throw error;
        res.send(result)
    } );
});

// Afficher les tâches a faire 

router.post('/tasksToDo', (req, res) => {
    const {idUser} = req.body
    const tasksToDo = "SELECT * FROM task WHERE idState = 1 AND idUser =(?)"
    bdd.query(tasksToDo,[idUser], (error, result) => {
        if (error) throw error;
        res.send(result)
    } );
});




module.exports = router;