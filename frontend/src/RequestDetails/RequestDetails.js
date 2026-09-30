import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./RequestDetails.css";

const RequestDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const request = location.state?.request;

  if (!request) {
    return (
      <div className="request-page">
        <p>Request not found.</p>
        <button type="button" onClick={() => navigate("/dashboard")}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="request-page">
      <button type="button" onClick={() => navigate("/dashboard")}>
        Back to Dashboard
      </button>

      <h1>{request.requestTitle}</h1>

      <p><strong>Client:</strong> {request.clientName}</p>
      <p><strong>Email:</strong> {request.clientEmail}</p>
      <p><strong>Status:</strong> {request.status}</p>
      <p><strong>Created:</strong> {new Date(request.createdAt).toLocaleString()}</p>
      <p><strong>Updated:</strong> {new Date(request.updatedAt).toLocaleString()}</p>

      <h2>Request Details</h2>
      <p>{request.requestDetails}</p>
    </div>
  );
};

export default RequestDetails;
