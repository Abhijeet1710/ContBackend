const { userModel } = require('../model/userModel');

exports.getAllUsers = async (req, res) => {
    const allUsers = await userModel.find({});
    res.status(200).json({ status: "success", message: { data: allUsers } });
}

exports.getUser = async (req, res) => {
    try {

        const result = await userModel.find({userId: req.params.userId});

        res
        .status(200)
        .json({ status: "success", message: "MSG", data: result });
        
    }catch(err) {
        res
        .status(4001)
        .json({ status: "failure", message: err, data: {} });
        
    }
}

exports.getUserViaUserName = async (req, res) => {
    try {

        const result = await userModel.find({userId: req.params.userName});

        res
        .status(200)
        .json({ status: "success", message: "Found", data: result });
        
    }catch(err) {
        res
        .status(401)
        .json({ status: "failure", message: err, data: [] });
        
    }
}

exports.getUsersPresentInArray = async (req, res) => {
    try {
        const result = await userModel.find({userId: {$in: req.body.userIds}});

        res
        .status(200)
        .json({ status: "success", message: "MSG", data: result });
        
    }catch(err) {
        res
        .status(401)
        .json({ status: "failure", message: err, data: {} });
        
    }
}

exports.registerUser = async (req, res) => {

    try {
        console.log("RU");

        const totalUsers = await userModel.find({});
        const userId = totalUsers.length + 1;

        const newUser = { ...req.body, userId };

        const userWithSameEmail = await userModel.find({ email: newUser.email, userName: newUser.userName })

        if (userWithSameEmail.length != 0) {
            res.status(400).json({ status: "failure", message: "User with this email or User Name already exists", data: {} })
        } else {
            const newlyAddedUser = await userModel.create(newUser);
            res.status(200).json({ status: "success", message: "Register Successfuly", data: { data: newlyAddedUser } });
        }

    } catch (err) {
        res.status(401).json({ status: "failure", message: err });
    }
}

exports.loginUser = async (req, res) => {
    try{
        const userData = req.body;  //email, password

        const user = await userModel.find({email: userData.email, password: userData.password});
        if(user.length != 0) {
            res.status(200)
            .json({ status: "success", message: "Login Successful", data: user[0] });
        }else {
            res.status(400)
            .json({ status: "failure", message: "Wrong email or password", data: {} });
        }
    }catch(err) {
        res.status(401).json({ status: "failure", message: err });
    }
}

exports.updateData = async (req, res) => {
    try {
        const dataToUpdate = req.body;

        const filter = { userId : dataToUpdate.userId };
        const options = { upsert: false };

        const updateUser = {
            $set: {
                ...dataToUpdate
            }
        }

        const result = await userModel.updateOne(filter, updateUser, options)
        const updatedUser = await userModel.findOne(filter);
        
        if(result.modifiedCount == 0) {
            res
            .status(400)
            .json({ status: "failure", message: "User with given userId not found", data: {} });
            
        }else {
            res
            .status(200)
            .json({ status: "success", message: "updated Successfully", data: updatedUser });
            
        }
        
        
    }catch(err) {
        res
        .status(401)
        .json({ status: "failure", message: "Some Error", data: err });
        
    }
}

exports.acceptConnectionRequest = async (userId, friendId) => {
    console.log("In addToMyProjects");
    const filter = {userId: userId};
    const updation = {$addToSet: {connections: friendId}};

    const updated = await userModel.updateOne(filter, updation);

    return updated;
}

exports.addConnectionRequest = async (userId, futureFriendId) => {
    console.log("In addToMyProjects");
    const filter = {userId: userId};
    const updation = {$addToSet: {connectionRequests: futureFriendId}};

    const updated = await userModel.updateOne(filter, updation);

    return updated;
}

exports.addLiked = async (userId, friendWhoLiked) => {
    console.log("In addToMyProjects");
    const filter = {userId: userId};
    const updation = {$addToSet: {liked: friendWhoLiked}};

    const updated = await userModel.updateOne(filter, updation);

    return updated;
}


// ___________COMMON(CALLED FROM projectController)______________________

exports.addProjectInMyProjects = async (uid, projectId) => {
    console.log("In addToMyProjects");
    const filter = {userId: uid};
    const updation = {$addToSet: {myProjects: projectId}};

    const updated = await userModel.updateOne(filter, updation);

    return updated;
}

exports.addProjectInParticipatedProjects = async (uid, projectId) => {
    console.log("In addToMyProjects");
    const filter = {userId: uid};
    const updation = {$addToSet: {participatedProjects: projectId}};

    const updated = await userModel.updateOne(filter, updation);

    return updated;
}

exports.test = async (req, res) => {
    try {
        console.log("In test");
        const result = await this.addLiked(req.params.u, req.params.p);
        res
        .status(200)
        .json({ status: "success", message: "Successful", data: result });
         
    }catch(err) {
        res
        .status(401)
        .json({ status: "failure", message: "Some Error", data: err });
        
    }
}



// exports.getUser = async (req, res) => {
//     try {


//         res
//         .status(200)
//         .json({ status: "success", message: "MSG", data: result });
        
//     }catch(err) {
//         res
//         .status(4001)
//         .json({ status: "failure", message: err, data: {} });
        
//     }
// }