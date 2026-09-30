const mongoose = require('mongoose');

const clientRequestSchema = new mongoose.Schema({
    clientName: {
        type: String,
        required: true,
    },
    clientEmail: {
        type: String,
        required: true,
    },
    requestTitle: {
        type: String,
        required: true,
    },
    requestDetails: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["New", "In Progress", "Done"],
        default: 'New',
    },
}, { timestamps: true });

const ClientRequest = mongoose.model('ClientRequest', clientRequestSchema);

module.exports = ClientRequest;
