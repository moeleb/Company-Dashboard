const express = require("express");

const {createClientRequest,getClientRequests,updateRequestStatus } = require("../controllers/clientRequestController");

const router = express.Router();

router.post("/", createClientRequest);
router.get("/", getClientRequests);
router.patch("/:id/status", updateRequestStatus);

module.exports = router;