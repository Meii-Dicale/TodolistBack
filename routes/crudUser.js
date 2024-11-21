const express = require('express');
const router = express.Router();
const bdd = require('../config/bdd');
const bcrypt = require('bcrypt');

// Créer un Utilisateur
router.post('/createUser', async (req, res) => {
    console.log(req.body);
    const {nameUser, passwordUser} = req.body;
    
    const securedPassword = await bcrypt.hash(passwordUser, 10)
    const verifyUser = "Select * FROM user WHERE nameUser = ?"
    const createUser = "INSERT INTO user ( nameUser, passwordUser ) VALUES (? , ?)"
    bdd.query(verifyUser, [nameUser], (error, result) => {
        if(error) throw error;
        if(result.length > 0){
            res.send('Nom déjà utilisé')
        } else {
    bdd.query(createUser,[nameUser, securedPassword], (error, result) => {
        if (error) throw error;
        console.log('utilisateur ajouté')
    } );
}
})
});

// Récupérer la liste des Utilisateurs
router.get ('/getAllUsers', (req, res) => {
    const getAllUsers = "SELECT nameUser FROM user"
    bdd.query(getAllUsers, (error, result) => {
        if (error) throw error;
        res.send(result)
    })});

// créer un module de connexion
router.post('/loginUser', async (req, res) => {
    console.log(req.body);
    const {nameUser, passwordUser} = req.body;
    const getUser = "SELECT * FROM user WHERE nameUser =?"
    bdd.query(getUser, [nameUser], async (error, result) => {
        if(error) throw error;
        if(result.length === 0){
            res.send('Utilisateur non trouvé')
        } else {
            const match = await bcrypt.compare(passwordUser, result[0].passwordUser)
            if(match){
                res.send('Connexion réussie')
            } else {
                res.send('Mot de passe incorrect')
            }
        }
    })
});

// Modifier un Utilisateur
router.post('/updateUser/:id', async (req, res) => {
    console.log(req.body);
    const {nameUser, passwordUser} = req.body;
    const idUser = req.params.id;
    const securedPassword = await bcrypt.hash(passwordUser, 10)
    const updateUser = "UPDATE user SET nameUser =?, passwordUser =? WHERE idUser =?"
    bdd.query(updateUser,[nameUser, securedPassword, idUser], (error, result) => {
        if (error) throw error;
        console.log('Utilisateur modifié')
    } );
});

// Supprimer un Utilisateur
router.post('/deleteUser/:id', (req, res) => {
    const idUser = req.params.id;
    const deleteUser = "DELETE FROM user WHERE idUser =?"
    bdd.query(deleteUser, [idUser], (error, result) => {
        if (error) throw error;
        console.log('Utilisateur supprimé')
    } );
});





module.exports = router;
