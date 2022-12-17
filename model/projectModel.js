const { mongoose } = require('./userModel');

const projectSchema = new mongoose.Schema({
    projectId: {
        type: Number,
        unique: true,
        required: [true, 'Required Field']
    },
    projectName: {
        type: String
    },
    projectDescription: {
        type: String,
        required: [true, 'Required Field']
    },
    projectAdmin: {
        type: Number,
        required: [true, 'Required Field']
    },
    requests: {
        type: [Number],
        default: []
    },
    teamMatesRequire: {
        type: Number,
        required: [true, 'Required Field']
    },
    techStackRequire: {
        type: [String],
        required: [true, 'Required Field']
    },
    projectContributors: {
        type: [Number],
        default: []
    },
    projectStatus: {
        type: Boolean,
        default: false
    },
    projectDomain: {
        type: [String],
    },
    projectPic: {
        type: String,
        default: ""
    },
    liked: {
        type: [Number],
        default: []
    }
},
{
    timestamps: {
        createdAt: true,
        updatedAt: true
    }
}
)

const projectModel = mongoose.model('projects', projectSchema);

module.exports = { projectModel };