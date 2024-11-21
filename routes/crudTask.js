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



module.exports = router;