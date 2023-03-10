const mongoose = require('mongoose');

const DB = "mongodb+srv://Abhijeet1710:Abhijeet1710@cluster0.thaufm4.mongodb.net/ContDB?retryWrites=true&w=majority";

// mongoose
// .connect('mongodb://localhost:27017/cont', {})
// .then(() => console.log("Connected to DB successfully"));

mongoose
    .connect(DB)
    .then(() => {
        console.log(`Connected to MongoDB Atlas`);
    })
    .catch((err) => {
        console.log(`MongoDB Atlas Error ${err}`);
    })


const Msg = new mongoose.Schema({
    message: {
        type: String,
    },
    dispatchTime: {
        type: String
    }
})

const ParticularUserChat = new mongoose.Schema({
    from: {
        type: Number,
    },
    to: {
        type: Number
    },

    allMessages: {
        type: [Msg]
    }
})

const userSchema = new mongoose.Schema(
    {
        userId: {
            type: Number,
            unique: true,
            required: [true, 'Required Field']
        },
        name: {
            type: String,
            required: [true, 'Required Field']
        },
        userName: {
            type: String,
            unique: true,
            required: [true, 'Required Field']
        },
        email: {
            type: String,
            unique: true,
            required: [true, 'Required Field']
        },
        password: {
            type: String,
            required: [true, 'Required Field']
        },
        phoneNumber: {
            type: String,
            default: ""
        },
        address: {
            type: String,
            default: ""
        },
        myProjects: {
            type: [Number],
            default: []
        },
        participatedProjects: {
            type: [Number],
            default: []
        },
        profilePicture: {
            type: String,
            default: "https://st2.depositphotos.com/1006318/5909/v/600/depositphotos_59095205-stock-illustration-businessman-profile-icon.jpg"
        },
        connections: {
            type: [Number],
            default: []
        },
        connectionRequests: {
            type: [Number],
            default: []
        },

        chat: {
            type: [ParticularUserChat],
            default: []
        },
        tagLine: {
            type: String,
            default: ""
        },
        liked: {
            type: [Number],
            default: []
        },
        aboutMe: {
            type: String,
            default: ""
        },
        company: {
            type: String,
            default: ""
        },
        location: {
            type: String,
            default: ""
        },
        link: {
            type: String,
            default: ""
        },
        twitter: {
            type: String,
            default: ""
        },
    },
    {
        timestamps: {
            createdAt: true,
            updatedAt: true
        }
    }
);


const userModel = mongoose.model('users', userSchema);

module.exports = {userModel, mongoose};