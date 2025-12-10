import React, { useState } from "react";
import "./Card.css";

export default function CardServices() {
  const [activeTab, setActiveTab] = useState("requests");
  const [notification, setNotification] = useState(null);

  // Pagination states
  const [requestsPage, setRequestsPage] = useState(1);
  const [managementPage, setManagementPage] = useState(1);
  const [fraudPage, setFraudPage] = useState(1);
  const itemsPerPage = 5;

  // Card Requests Data
  const [cardRequests, setCardRequests] = useState([
    { id: 1, accountNumber: "Khushavant", panNumber: "AHGPY1234T", requestType: "new", status: "pending", action: "" },
    { id: 2, accountNumber: "Amit", panNumber: "AHFWQ1234R", requestType: "virtual", status: "pending", action: "" },
    { id: 3, accountNumber: "Priya", panNumber: "BHWPX5678S", requestType: "new", status: "pending", action: "" },
    { id: 4, accountNumber: "Ravi", panNumber: "CHGPZ1234U", requestType: "virtual", status: "pending", action: "" },
    { id: 5, accountNumber: "Neha", panNumber: "DHFQR5678V", requestType: "new", status: "approved", action: "approved" },
    { id: 6, accountNumber: "Vikram", panNumber: "EHGPS1234W", requestType: "virtual", status: "pending", action: "" },
    { id: 7, accountNumber: "Sneha", panNumber: "FHFPT5678X", requestType: "new", status: "pending", action: "" },
  ]);

  // Card Management Data
  const [cardManagement, setCardManagement] = useState([
    { id: 1, cardNumber: "ACC001234567", action: "", actionTaken: "", remarks: "Added by admin" },
    { id: 2, cardNumber: "ACC001234568", action: "", actionTaken: "", remarks: "Added by admin" },
    { id: 3, cardNumber: "ACC001234569", action: "", actionTaken: "", remarks: "Added by admin" },
    { id: 4, cardNumber: "ACC001234570", action: "", actionTaken: "", remarks: "Added by admin" },
    { id: 5, cardNumber: "ACC001234571", action: "", actionTaken: "", remarks: "Added by admin" },
    { id: 6, cardNumber: "ACC001234572", action: "", actionTaken: "", remarks: "Added by admin" },
  ]);

  // Fraud Data
  const [fraudData, setFraudData] = useState([
    { transactionId: "TXN001", cardNumber: "ACC001234567", amount: "50000", user: "Khushavant", reason: "Unusual location", action: "" },
    { transactionId: "TXN002", cardNumber: "ACC001234568", amount: "25000", user: "Amit", reason: "High amount transaction", action: "" },
    { transactionId: "TXN003", cardNumber: "ACC001234569", amount: "75000", user: "Priya", reason: "Multiple rapid transactions", action: "" },
    { transactionId: "TXN004", cardNumber: "ACC001234570", amount: "30000", user: "Ravi", reason: "International transaction", action: "" },
    { transactionId: "TXN005", cardNumber: "ACC001234571", amount: "60000", user: "Neha", reason: "Late night transaction", action: "" },
    { transactionId: "TXN006", cardNumber: "ACC001234572", amount: "40000", user: "Vikram", reason: "Duplicate charge", action: "" },
  ]);

  const [newFraud, setNewFraud] = useState({
    transactionId: "",
    cardNumber: "",
    amount: "",
    user: "",
    reason: "",
  });

  // Show notification
  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Pagination Helper
  const getPaginatedData = (data, page) => {
    const start = (page - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  };

  const getTotalPages = (data) => Math.ceil(data.length / itemsPerPage);

  const renderPagination = (currentPage, totalPages, onPageChange) => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage > 3) pages.push(1);
      if (currentPage > 4) pages.push("...");

      for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
        if (!pages.includes(i)) pages.push(i);
      }

      if (currentPage < totalPages - 3) pages.push("...");
      if (currentPage < totalPages - 2) pages.push(totalPages);
    }

    return (
      <div className="card-services-pagination">
        <button
          className="card-services-pagination-btn"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        {pages.map((page, idx) =>
          page === "..." ? (
            <span key={`dots-${idx}`} className="card-services-pagination-dots">
              ...
            </span>
          ) : (
            <button
              key={page}
              className={`card-services-pagination-btn ${currentPage === page ? "active" : ""}`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          )
        )}

        <button
          className="card-services-pagination-btn"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    );
  };

  // Handle Card Request Action
  const handleRequestAction = (index, approved) => {
    const actualIndex = (requestsPage - 1) * itemsPerPage + index;
    const req = cardRequests[actualIndex];
    const cardType = req.requestType === "new" ? "New Card" : "Virtual Card";
    const actionType = approved ? "approved" : "rejected";
    const message = approved
      ? `${cardType} request approved for ${req.accountNumber} ✅`
      : `Card request rejected for ${req.accountNumber} ❌`;

    const updated = [...cardRequests];
    updated[actualIndex].status = actionType;
    updated[actualIndex].action = actionType;
    setCardRequests(updated);
    showNotification(message, approved ? "success" : "error");
  };

  // Handle Request Status Change
  const handleRequestStatusChange = (index, newStatus) => {
    const actualIndex = (requestsPage - 1) * itemsPerPage + index;
    const req = cardRequests[actualIndex];
    
    const updated = [...cardRequests];
    updated[actualIndex].status = newStatus;
    updated[actualIndex].action = newStatus;
    setCardRequests(updated);

    const statusMsg = newStatus.charAt(0).toUpperCase() + newStatus.slice(1);
    showNotification(`Status changed to ${statusMsg} ✅`, "success");
  };

  // Handle Card Management Action
  const handleManagementAction = (index) => {
    const actualIndex = (managementPage - 1) * itemsPerPage + index;
    const card = cardManagement[actualIndex];
    const selectElem = document.getElementById(`action-${actualIndex}`);
    const action = selectElem?.value;

    if (!action) {
      showNotification("Please select an action ❌", "error");
      return;
    }

    const actionMessages = {
      block: "Card Blocked",
      change: "Transaction Limit Changed",
      replace: "Card Replacement Initiated",
      setlimit: "New Card Limit Set",
    };

    const updated = [...cardManagement];
    updated[actualIndex].action = action;
    updated[actualIndex].actionTaken = actionMessages[action];
    setCardManagement(updated);

    showNotification(`${actionMessages[action]} for ${card.cardNumber} ✅`, "success");
  };

  // Handle Fraud Action
  const handleFraudAction = (index, actionType) => {
    const actualIndex = (fraudPage - 1) * itemsPerPage + index;
    const updatedData = [...fraudData];
    updatedData[actualIndex].action = actionType;
    setFraudData(updatedData);

    const msg =
      actionType === "Safe"
        ? `${updatedData[actualIndex].user} is marked as SAFE ✅`
        : `${updatedData[actualIndex].user} is NOT safe ❌`;

    showNotification(msg, actionType === "Safe" ? "success" : "error");
  };

  // Add New Fraud Entry
  const handleFraudSubmit = () => {
    if (
      !newFraud.transactionId ||
      !newFraud.cardNumber ||
      !newFraud.amount ||
      !newFraud.user ||
      !newFraud.reason
    ) {
      showNotification("Please fill all fields ❌", "error");
      return;
    }

    setFraudData([...fraudData, { ...newFraud, action: "" }]);
    setNewFraud({
      transactionId: "",
      cardNumber: "",
      amount: "",
      user: "",
      reason: "",
    });
    showNotification("Fraud record added successfully ✅", "success");
  };

  const paginatedRequests = getPaginatedData(cardRequests, requestsPage);
  const paginatedManagement = getPaginatedData(cardManagement, managementPage);
  const paginatedFraud = getPaginatedData(fraudData, fraudPage);

  return (
    <div className="card-services-container">
      <div className="card-services-header-wrapper">
        <h2 className="card-services-title">Card Services</h2>
      </div>

      <div className="card-services-content-wrapper">
        {/* Tabs */}
        <div className="card-services-tabs">
          <button
            className={`card-services-tab-btn ${activeTab === "requests" ? "active" : ""}`}
            onClick={() => setActiveTab("requests")}
          >
            Card Requests
          </button>
          <button
            className={`card-services-tab-btn ${activeTab === "management" ? "active" : ""}`}
            onClick={() => setActiveTab("management")}
          >
            Card Management
          </button>
          <button
            className={`card-services-tab-btn ${activeTab === "fraud" ? "active" : ""}`}
            onClick={() => setActiveTab("fraud")}
          >
            Fraud Flags
          </button>
        </div>

        {/* Notification */}
        {notification && (
          <div className={`card-services-notification card-services-notification-${notification.type}`}>
            {notification.message}
          </div>
        )}

        {/* Requests Section */}
        {activeTab === "requests" && (
          <div className="card-services-section-wrapper">
            <div className="card-services-section-header">
              <h3> Card Requests</h3>
            </div>
            <div className="card-services-table-wrapper">
              <table className="card-services-data-table">
                <thead>
                  <tr>
                    <th>Account Number</th>
                    <th>PAN Number</th>
                    <th>Request Type</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedRequests.map((req, index) => (
                    <tr key={index}>
                      <td data-label="Account Number">{req.accountNumber}</td>
                      <td data-label="PAN Number">{req.panNumber}</td>
                      <td data-label="Request Type">
                        <span className="card-services-type-badge">
                          {req.requestType === "new" ? "New Card" : "Virtual Card"}
                        </span>
                      </td>
                      <td data-label="Status">
                        <span className={`card-services-status-badge card-services-status-${req.status}`}>
                          {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                        </span>
                      </td>
                      <td data-label="Actions" className="card-services-action-cell">
                        {req.status === "pending" ? (
                          <>
                            <button
                              className="card-services-btn card-services-btn-approve"
                              onClick={() => handleRequestAction(index, true)}
                            >
                              Approve
                            </button>
                            <button
                              className="card-services-btn card-services-btn-reject"
                              onClick={() => handleRequestAction(index, false)}
                            >
                              Reject
                            </button>
                          </>
                        ) : (
                          <select
                            className="card-services-status-select"
                            value={req.status}
                            onChange={(e) => handleRequestStatusChange(index, e.target.value)}
                          >
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                            <option value="pending">Pending</option>
                            <option value="hold">Hold</option>
                          </select>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {renderPagination(requestsPage, getTotalPages(cardRequests), setRequestsPage)}
          </div>
        )}

        {/* Management Section */}
        {activeTab === "management" && (
          <div className="card-services-section-wrapper">
            <div className="card-services-section-header">
              <h3> Card Management</h3>
            </div>
            <div className="card-services-table-wrapper">
              <table className="card-services-data-table">
                <thead>
                  <tr>
                    <th>Card Number</th>
                    <th>Action</th>
                    <th>Action Taken</th>
                    <th>Remarks</th>
                    <th>Submit</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedManagement.map((card, index) => (
                    <tr key={index}>
                      <td data-label="Card Number">{card.cardNumber}</td>
                      <td data-label="Action">
                        <select
                          id={`action-${(managementPage - 1) * itemsPerPage + index}`}
                          defaultValue={card.action}
                          className="card-services-action-select"
                        >
                          <option value="">Choose Option</option>
                          <option value="block">Block/Unblock Card</option>
                          <option value="change">Change Transaction Limit</option>
                          <option value="replace">Replace Card</option>
                          <option value="setlimit">Set New Card Limit</option>
                        </select>
                      </td>
                      <td data-label="Action Taken">
                        <span className={`card-services-action-taken ${card.actionTaken ? "active" : ""}`}>
                          {card.actionTaken || "—"}
                        </span>
                      </td>
                      <td data-label="Remarks">{card.remarks}</td>
                      <td data-label="Submit">
                        <button
                          className="card-services-btn card-services-btn-submit"
                          onClick={() => handleManagementAction(index)}
                        >
                          Submit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {renderPagination(managementPage, getTotalPages(cardManagement), setManagementPage)}
          </div>
        )}

        {/* Fraud Section */}
        {activeTab === "fraud" && (
          <div className="card-services-section-wrapper">
            <div className="card-services-section-header">
              <h3> Fraud Flags</h3>
            </div>
            <div className="card-services-table-wrapper">
              <table className="card-services-fraud-table">
                <thead>
                  <tr>
                    <th>Transaction ID</th>
                    <th>Card Number</th>
                    <th>Amount</th>
                    <th>User</th>
                    <th>Reason</th>
                    <th>Action</th>
                    <th>Action Performed</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedFraud.map((row, index) => (
                    <tr key={index}>
                      <td data-label="Transaction ID">{row.transactionId}</td>
                      <td data-label="Card Number">{row.cardNumber}</td>
                      <td data-label="Amount">₹{row.amount}</td>
                      <td data-label="User">{row.user}</td>
                      <td data-label="Reason">{row.reason}</td>
                      <td data-label="Action" className="card-services-action-cell">
                        <button
                          className="card-services-btn card-services-btn-safe"
                          onClick={() => handleFraudAction(index, "Safe")}
                        >
                          Mark Safe
                        </button>
                        <button
                          className="card-services-btn card-services-btn-escalate"
                          onClick={() => handleFraudAction(index, "Escalated")}
                        >
                          Escalate
                        </button>
                      </td>
                      <td
                        data-label="Action Performed"
                        className={`card-services-action-result ${
                          row.action === "Safe" ? "safe" : row.action === "Escalated" ? "escalate" : ""
                        }`}
                      >
                        {row.action || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {renderPagination(fraudPage, getTotalPages(fraudData), setFraudPage)}

            {/* Add New Fraud Entry */}
            <div className="card-services-fraud-form-section">
              <h4 className="card-services-fraud-form-title">Add Suspicious Transaction</h4>
              <div className="card-services-fraud-form">
                <input
                  type="text"
                  placeholder="Transaction ID"
                  value={newFraud.transactionId}
                  onChange={(e) =>
                    setNewFraud({ ...newFraud, transactionId: e.target.value })
                  }
                  className="card-services-form-input"
                />
                <input
                  type="text"
                  placeholder="Card Number"
                  value={newFraud.cardNumber}
                  onChange={(e) =>
                    setNewFraud({ ...newFraud, cardNumber: e.target.value })
                  }
                  className="card-services-form-input"
                />
                <input
                  type="number"
                  placeholder="Amount"
                  value={newFraud.amount}
                  onChange={(e) =>
                    setNewFraud({ ...newFraud, amount: e.target.value })
                  }
                  className="card-services-form-input"
                />
                <input
                  type="text"
                  placeholder="User"
                  value={newFraud.user}
                  onChange={(e) =>
                    setNewFraud({ ...newFraud, user: e.target.value })
                  }
                  className="card-services-form-input"
                />
                <input
                  type="text"
                  placeholder="Reason"
                  value={newFraud.reason}
                  onChange={(e) =>
                    setNewFraud({ ...newFraud, reason: e.target.value })
                  }
                  className="card-services-form-input"
                />
                <button className="card-services-btn card-services-btn-add-record" onClick={handleFraudSubmit}>
                  Add Record
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}