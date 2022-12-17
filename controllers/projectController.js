const {projectModel} = require('../model/projectModel');
const userController = require('../controllers/userController');

exports.getAllProjects = async (req, res) => {
    try {
        console.log("In GetAllProjects");
        const allProjects = await projectModel.find({});
        res.status(200).json({ status: "success", message: "Data fetached", data: allProjects });
    }catch(err) {
        res.status(401).json({ status: "failure", message: "Some Error : "+err,  data: []  });
    }
}

exports.getProject = async (req, res) => {
    try {

        const result = await projectModel.find({projectId: req.params.projectId});

        res
        .status(200)
        .json({ status: "success", message: "MSG", data: result });
        
    }catch(err) {
        res
        .status(4001)
        .json({ status: "failure", message: err, data: {} });
        
    }
}

exports.addProject = async (req, res) => {
    console.log("In Add Project");
    
    try {

        const totalProjects = await projectModel.find({});
        const projectId = totalProjects.length + 1;

        const newProject = { ...req.body, projectId, projectContributors: [req.body.projectAdmin] };


        
        const newlyAddedProject = await projectModel.create(newProject);
        await userController.addProjectInMyProjects(newProject.projectAdmin, projectId);

        res.status(200).json({ status: "success", message: "Project Added Successfuly", data: newlyAddedProject });

    } catch (err) {
        res.status(401).json({ status: "failure", message: err });
    }
}

exports.addRequest = async (req, res) => {
    try {

        const filter = {projectId: req.body.projectId};
        const updation = {$addToSet: {requests: req.body.userId}};

        const result = await projectModel.updateOne(filter, updation);

        res
        .status(200)
        .json({ status: "success", message: "MSG", data: result });
        
    }catch(err) {
        res
        .status(4001)
        .json({ status: "failure", message: err, data: {} });
        
    }
}

exports.updateProject = async (req, res) => {
    try {
        const dataToUpdate = req.body;

        const filter = { projectId : dataToUpdate.projectId };
        const options = { upsert: false };

        const updateUser = {
            $set: {
                ...dataToUpdate
            }
        }

        const result = await projectModel.updateOne(filter, updateUser, options)
        
        if(result.modifiedCount == 0) {
            res
            .status(400)
            .json({ status: "failure", message: "Project with given userId not found", data: {} });
            
        }else {
            res
            .status(200)
            .json({ status: "success", message: "Updates Successful", data: result });
            
        }
        
        
    }catch(err) {
        res
        .status(401)
        .json({ status: "failure", message: "Some Error", data: err });
        
    }
}

exports.acceptRequest = async (req, res) => {
    try {        
        const cond = {projectId: req.body.projectId};
        const updationPull = {$pull: {requests: req.body.userId}};
        await projectModel.updateOne(cond, updationPull);

        const updationAdd = {$addToSet: {projectContributors: req.body.userId}};
        const updated = await projectModel.updateOne(cond, updationAdd);

        await userController.addProjectInParticipatedProjects(req.body.userId, req.body.projectId);

        res
            .status(200)
            .json({ status: "success", message: "Request Accepted by project admin", data: updated });
    } catch(err) {
        res
        .status(401)
        .json({ status: "failure", message: "Some Error", data: err });
    }
}
