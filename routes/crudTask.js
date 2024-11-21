// |       1 = A faire  ||  2 = En cours  || 3 = Terminé

const express = require('express');
const router = express.Router();
const bdd = require('../config/bdd');

// Créer une tâche 

router.post('/createTask', (req, res) => {
    const {libelleTask } = req.body;
    const createTask = "INSERT INTO task (libelleTask,idUser, idState ) VALUES (?, 2 , 1)"
    bdd.query(createTask,[libelleTask], (error, result) => {
    //const {libelleTask, idConnectedUser } = req.body;
    //const createTask = "INSERT INTO task (libelleTask,idUser, idState ) VALUES (?, ? , 1)"
    //bdd.query(createTask,[libelleTask, idConnectedUser], (error, result) => {
        if (error) throw error;
        console.log('Tâche ajoutée')
    } );
});

// supprimer une tâche

router.post('/deleteTask/:id', (req, res) => {
    const idTask = req.params.id;
    const deleteTask = "DELETE FROM task WHERE idTask =?"
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

router.get('/tasksInProgress', (req, res) => {
    const tasksInProgress = "SELECT * FROM task WHERE idState = 2"
    bdd.query(tasksInProgress, (error, result) => {
        if (error) throw error;
        res.send(result)
    } );
});

// Afficher les taches terminées

router.get('/tasksFinished', (req, res) => {
    const tasksFinished = "SELECT * FROM task WHERE idState = 3"
    bdd.query(tasksFinished, (error, result) => {
        if (error) throw error;
        res.send(result)
    } );
});

// Afficher les tâches a faire 

router.get('/tasksToDo', (req, res) => {
    const tasksToDo = "SELECT * FROM task WHERE idState = 1"
    bdd.query(tasksToDo, (error, result) => {
        if (error) throw error;
        res.send(result)
    } );
});

// Rechercher une tâche 

router.post('/searchTask', (req, res) => {
    const {libelleTask } = req.body;
    const searchTask = "SELECT * FROM task WHERE libelleTask LIKE?"
    bdd.query(searchTask, ['%' + libelleTask + '%'], (error, result) => {
        if (error) throw error;
        res.send(result)
    } );
});



module.exports = router;