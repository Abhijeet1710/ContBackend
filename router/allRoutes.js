const express = require('express');
const userController = require('../controllers/userController');
const projectController = require('../controllers/projectController');
const routing = express.Router();



routing.get('/users', userController.getAllUsers);

routing.post('/users/usersPresentInArray', userController.getUsersPresentInArray);

routing.get('/user/:userId', userController.getUser);

routing.get('/user/viaUserName/:userName', userController.getUserViaUserName);

routing.post('/user/register', userController.registerUser);

routing.post('/user/login', userController.loginUser);

routing.post('/user/update', userController.updateData);


// _______________________________________________________________________


routing.get('/projects', projectController.getAllProjects);

routing.get('/project/:projectId', projectController.getProject);

routing.post('/project/addNewProject', projectController.addProject);

routing.post('/project/updateProject', projectController.updateProject);    //*

routing.post('/project/addRequest', projectController.addRequest);

routing.post('/project/acceptRequest', projectController.acceptRequest);    //*

routing.post('/project/likeProject', projectController.likeProject);    //*

routing.post('/project/unlikeProject', projectController.unlikeProject);    //*


// _______________________________________________________________________


routing.get('/user/test/:u/:p', userController.test);

routing.get('**', async (req, res) => {

    res.status(200).json({"message": "Default Route"});
});

module.exports = routing;