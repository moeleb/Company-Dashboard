const ClientRequestModel = require("../models/ClientRequest.js");


const createClientRequest = async (req, res) => {
  try {
    const { clientName, clientEmail, requestTitle, requestDetails } = req.body;

    const newRequest = new ClientRequestModel({
      clientName,
      clientEmail,
      requestTitle,
      requestDetails,
    });

    const savedRequest = await newRequest.save();

    res.status(201).json(savedRequest);
  } catch (error) {
    res.status(500).json({ message: "Error creating client request", error });
  }
};

const getClientRequests = async (req, res) => {
  try {
    const requests = await ClientRequestModel.find().sort({ createdAt: -1 });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: "Error fetching client requests", error });
  }
};

const updateRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedRequest = await ClientRequestModel.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: "Client request not found" });
    }

    res.status(200).json(updatedRequest);
  } catch (error) {
    res.status(500).json({ message: "Error updating request status", error });
  }
};

module.exports = {
  createClientRequest,
  getClientRequests,
  updateRequestStatus,
};
