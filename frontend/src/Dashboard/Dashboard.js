import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API_ENDPOINTS from "../config/api";
import "./Dashboard.css";

const Dashboard = () => {
  const { userEmail, token, logout } = useAuth();
  const navigate = useNavigate();
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [requestTitle, setRequestTitle] = useState("");
  const [requestDetails, setRequestDetails] = useState("");
  const [clientRequests, setClientRequests] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch(API_ENDPOINTS.CLIENT_REQUESTS)
      .then((response) => response.json())
      .then((data) => setClientRequests(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(API_ENDPOINTS.CLIENT_REQUESTS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          clientName,
          clientEmail,
          requestTitle,
          requestDetails
        })
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Could not create request");
        return;
      }

      setClientRequests((currentRequests) => [data, ...currentRequests]);
      setClientName("");
      setClientEmail("");
      setRequestTitle("");
      setRequestDetails("");
      setShowForm(false);
    } catch (error) {
      alert("Could not connect to the server");
    }
  };

  const handleStatusChange = async (requestId, status) => {
    try {
      const response = await fetch(
        `${API_ENDPOINTS.CLIENT_REQUESTS}/${requestId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ status })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Could not update status");
        return;
      }

      setClientRequests((currentRequests) =>
        currentRequests.map((request) =>
          request._id === requestId ? data : request
        )
      );
    } catch (error) {
      alert("Could not connect to the server");
    }
  };

  const handleLogout = async () => {
    try {
      await fetch(API_ENDPOINTS.LOGOUT, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      logout();
      navigate("/");
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Hello, {userEmail || "Guest"}</h1>
        <button type="button" onClick={handleLogout}>Logout</button>
      </div>

      {showForm ? (
        <form className="request-form" onSubmit={handleSubmit}>
          <h2>Create Request</h2>

          <input
            type="text"
            placeholder="Client name"
            value={clientName}
            onChange={(event) => setClientName(event.target.value)}
          />

          <input
            type="email"
            placeholder="Client email"
            value={clientEmail}
            onChange={(event) => setClientEmail(event.target.value)}
          />

          <input
            type="text"
            placeholder="Request title"
            value={requestTitle}
            onChange={(event) => setRequestTitle(event.target.value)}
          />

          <textarea
            placeholder="Request details"
            value={requestDetails}
            onChange={(event) => setRequestDetails(event.target.value)}
          />

          <button type="submit">Submit Request</button>
          <button type="button" onClick={() => setShowForm(false)}>
            Cancel
          </button>
        </form>
      ) : (
        <>
          <div className="requests-heading">
            <h2>Client Requests</h2>
            <button type="button" onClick={() => setShowForm(true)}>
              New Request
            </button>
          </div>

          <table className="requests-table">
            <thead>
              <tr>
                <th>Request</th>
                <th>Client</th>
                <th>Email</th>
                <th>Status</th>
                <th>Created</th>
              </tr>
            </thead>

            <tbody>
              {clientRequests.length === 0 ? (
                <tr>
                  <td colSpan="5">No client requests</td>
                </tr>
              ) : (
                clientRequests.map((request) => (
                  <tr key={request._id}>
                    <td>
                      <button
                        className="request-title"
                        type="button"
                        onClick={() =>
                          navigate(`/requests/${request._id}`, {
                            state: { request }
                          })
                        }
                      >
                        {request.requestTitle}
                      </button>
                    </td>
                    <td>{request.clientName}</td>
                    <td>{request.clientEmail}</td>
                    <td>
                      <select
                        value={request.status}
                        onChange={(event) =>
                          handleStatusChange(request._id, event.target.value)
                        }
                      >
                        <option value="New">New</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                      </select>
                    </td>
                    <td>{new Date(request.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

        </>
      )}
    </div>
  );
};

export default Dashboard;
