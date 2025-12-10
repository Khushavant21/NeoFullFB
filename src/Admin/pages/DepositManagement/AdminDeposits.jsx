import React, { useState } from "react";
import styles from "./AdminDeposits.module.css";

// Approval Modal
const ApprovalModal = ({ row, onClose, onConfirm }) => {
  const [rate, setRate] = useState(row?.rate?.replace("%", "") || "");
  const [tenure, setTenure] = useState(row?.tenure || "");

  const handleConfirm = () => {
    onConfirm({ rate: rate ? `${rate}%` : undefined, tenure });
  };

  return (
    <div className={styles.depositModalOverlay}>
      <div className={styles.depositModalContainer}>
        <h3>Approve Request</h3>
        <p>Customer: {row?.name || "N/A"}</p>
        <input
          type="text"
          placeholder="Interest Rate (%)"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
        />
        <input
          type="text"
          placeholder="Tenure"
          value={tenure}
          onChange={(e) => setTenure(e.target.value)}
        />
        <div className={styles.depositModalButtonGroup}>
          <button onClick={onClose}>Cancel</button>
          <button
            className={styles.depositApproveButton}
            onClick={handleConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

// Rejection Modal
const RejectionModal = ({ row, onClose, onConfirm }) => {
  const [reason, setReason] = useState("");

  return (
    <div className={styles.depositModalOverlay}>
      <div className={styles.depositModalContainer}>
        <h3>Reject Request</h3>
        <p>Customer: {row?.name || "N/A"}</p>
        <textarea
          placeholder="Enter rejection reason..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <div className={styles.depositModalButtonGroup}>
          <button onClick={onClose}>Cancel</button>
          <button
            className={styles.depositRejectButton}
            onClick={() => onConfirm({ reason })}
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

// Format Selection Modal
const FormatModal = ({ row, onClose, onDownload }) => {
  return (
    <div className={styles.depositModalOverlay}>
      <div className={styles.depositModalContainer}>
        <h3>Generate Instrument</h3>
        <p>Customer: {row?.user || "N/A"}</p>
        <p>Amount: ₹{row?.amount || 0}</p>
        <p>Select download format:</p>
        <div className={styles.depositFormatButtonGroup}>
          <button
            className={styles.depositFormatButton}
            onClick={() => onDownload(row, "csv")}
          >
            📄 CSV
          </button>
          <button
            className={styles.depositFormatButton}
            onClick={() => onDownload(row, "pdf")}
          >
            📕 PDF
          </button>
          <button
            className={styles.depositFormatButton}
            onClick={() => onDownload(row, "excel")}
          >
            📗 Excel
          </button>
        </div>
        <div className={styles.depositModalButtonGroup}>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

// Main Component
const AdminDeposits = () => {
  const [activeTab, setActiveTab] = useState("applications");
  const [notification, setNotification] = useState("");
  const [modalData, setModalData] = useState(null);
  const [formatModalData, setFormatModalData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");

  // Reset search and filter when switching tabs
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchQuery("");
    setStatusFilter("All Statuses");
  };

  const [applications, setApplications] = useState([
    {
      id: 1,
      user: "Alice",
      type: "FD",
      amount: 50000,
      status: "Pending",
      startDate: "2025-01-01",
      dueDate: "2025-12-31",
      interest: "-",
    },
    {
      id: 2,
      user: "Bob",
      type: "RD",
      amount: 10000,
      status: "Pending",
      startDate: "2025-02-01",
      dueDate: "2026-02-01",
      interest: "-",
    },
    {
      id: 3,
      user: "Carol",
      type: "FD",
      amount: 75000,
      status: "Approved",
      startDate: "2025-01-15",
      dueDate: "2026-01-15",
      interest: "4500",
    },
    {
      id: 4,
      user: "David",
      type: "RD",
      amount: 20000,
      status: "Rejected",
      startDate: "2025-03-01",
      dueDate: "2026-03-01",
      interest: "-",
    },
  ]);

  const [maturities, setMaturities] = useState([
    {
      id: 3,
      user: "Charlie",
      type: "FD",
      amount: 70000,
      status: "Pending",
      maturityDate: "2025-10-01",
    },
    {
      id: 4,
      user: "Daisy",
      type: "RD",
      amount: 15000,
      status: "Pending",
      maturityDate: "2025-10-05",
    },
    {
      id: 5,
      user: "Edward",
      type: "FD",
      amount: 90000,
      status: "Renewed",
      maturityDate: "2025-11-01",
    },
    {
      id: 6,
      user: "Fiona",
      type: "RD",
      amount: 25000,
      status: "Closed",
      maturityDate: "2025-09-15",
    },
  ]);

  const [withdrawals, setWithdrawals] = useState([
    { id: 5, user: "Eve", type: "FD", amount: 20000, penalty: 500, status: "Pending" },
    { id: 6, user: "Frank", type: "RD", amount: 8000, penalty: 200, status: "Pending" },
    { id: 7, user: "Grace", type: "FD", amount: 35000, penalty: 1000, status: "Approved" },
    { id: 8, user: "Henry", type: "RD", amount: 12000, penalty: 300, status: "Rejected" },
  ]);

  const showMessage = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 3000);
  };

  const calculateInterest = (amount, startDate, dueDate) => {
    const start = new Date(startDate);
    const end = new Date(dueDate);
    const years = (end - start) / (1000 * 60 * 60 * 24 * 365);
    return ((amount * 6 * years) / 100).toFixed(2);
  };

  const openModal = (row, setRows, action) => {
    const interest = calculateInterest(row.amount, row.startDate, row.dueDate);
    setModalData({ row, setRows, action, interest });
  };

  const handleModalSave = () => {
    const { row, setRows, action, interest } = modalData;
    setRows((prev) =>
      prev.map((r) =>
        r.id === row.id ? { ...r, status: action, interest } : r
      )
    );
    showMessage(`✅ Request ${action}`);
    setModalData(null);
  };

  const handleMaturityAction = (id, action) => {
    setMaturities((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: action } : r))
    );
    showMessage(`✅ Deposit ${action.toLowerCase()}`);
  };

  const handleWithdrawalAction = (id, action) => {
    setWithdrawals((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: action } : r))
    );
    showMessage(`✅ Withdrawal ${action.toLowerCase()}`);
  };

  const handleGenerateInstrument = (row) => {
    setFormatModalData(row);
  };

  const downloadInstrument = (row, format) => {
    const instrumentData = {
      depositId: row.id,
      customerName: row.user,
      depositType: row.type,
      amount: row.amount,
      startDate: row.startDate || new Date().toISOString().split("T")[0],
      dueDate: row.dueDate || row.maturityDate || "N/A",
      interest: row.interest || "N/A",
      status: row.status,
      generatedDate: new Date().toISOString().split("T")[0],
    };

    if (format === "csv") {
      downloadCSV(instrumentData);
    } else if (format === "pdf") {
      downloadPDF(instrumentData);
    } else if (format === "excel") {
      downloadExcel(instrumentData);
    }

    showMessage(`📥 ${format.toUpperCase()} downloaded for ${row.user}`);
    setFormatModalData(null);
  };

  const downloadCSV = (data) => {
    const csvContent = [
      ["Field", "Value"],
      ["Deposit ID", data.depositId],
      ["Customer Name", data.customerName],
      ["Deposit Type", data.depositType],
      ["Amount", `₹${data.amount}`],
      ["Start Date", data.startDate],
      ["Due Date", data.dueDate],
      ["Interest", data.interest],
      ["Status", data.status],
      ["Generated Date", data.generatedDate],
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Deposit_Instrument_${data.depositId}_${Date.now()}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const downloadPDF = (data) => {
    const pdfContent = `
DEPOSIT INSTRUMENT
==================

Deposit ID: ${data.depositId}
Customer Name: ${data.customerName}
Deposit Type: ${data.depositType}
Amount: ₹${data.amount}
Start Date: ${data.startDate}
Due Date: ${data.dueDate}
Interest: ${data.interest}
Status: ${data.status}
Generated Date: ${data.generatedDate}

==================
Bank Management System
    `;

    const blob = new Blob([pdfContent], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Deposit_Instrument_${data.depositId}_${Date.now()}.pdf`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const downloadExcel = (data) => {
    const excelContent = `
Deposit ID\t${data.depositId}
Customer Name\t${data.customerName}
Deposit Type\t${data.depositType}
Amount\t₹${data.amount}
Start Date\t${data.startDate}
Due Date\t${data.dueDate}
Interest\t${data.interest}
Status\t${data.status}
Generated Date\t${data.generatedDate}
    `.trim();

    const blob = new Blob([excelContent], {
      type: "application/vnd.ms-excel",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Deposit_Instrument_${data.depositId}_${Date.now()}.xls`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const filterRows = (rows) => {
    return rows.filter(
      (row) =>
        row.user.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (statusFilter === "All Statuses" || row.status === statusFilter)
    );
  };

  const renderApplicationsTable = () => {
    const filteredApplications = filterRows(applications);

    return (
      <div className={styles.depositContentCard}>
        <h2>Deposit Applications</h2>
        {notification && (
          <div className={styles.depositNotificationBox}>{notification}</div>
        )}
        <div className={styles.depositFilterContainer}>
          <input
            type="text"
            placeholder="Search customer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option>All Statuses</option>
            <option>Pending</option>
            <option>Approved</option>
            <option>Rejected</option>
          </select>
        </div>
        <div className={styles.depositTableContainer}>
          <table className={styles.depositDataTable}>
            <thead>
              <tr>
                <th>User</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Start Date</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Interest</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.length > 0 ? (
                filteredApplications.map((row) => (
                  <tr key={row.id}>
                    <td>{row.user}</td>
                    <td>{row.type}</td>
                    <td>₹{row.amount}</td>
                    <td>{row.startDate}</td>
                    <td>{row.dueDate}</td>
                    <td>
                      <span
                        className={`${styles.depositStatusBadge} ${styles[`depositStatus${row.status}`]}`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td>{row.interest}</td>
                    <td className={styles.depositActionButtons}>
                      <button
                        className={styles.depositApproveButton}
                        onClick={() =>
                          openModal(row, setApplications, "Approved")
                        }
                      >
                        Approve
                      </button>
                      <button
                        className={styles.depositRejectButton}
                        onClick={() =>
                          openModal(row, setApplications, "Rejected")
                        }
                      >
                        Reject
                      </button>
                      {row.status === "Approved" && (
                        <button
                          className={styles.depositGenerateButton}
                          onClick={() => handleGenerateInstrument(row)}
                        >
                          Generate
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" style={{ textAlign: "center", padding: "20px" }}>
                    No results found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderMaturitiesTable = () => {
    const filteredMaturities = filterRows(maturities);

    return (
      <div className={styles.depositContentCard}>
        <h2>Maturities</h2>
        {notification && (
          <div className={styles.depositNotificationBox}>{notification}</div>
        )}
        <div className={styles.depositFilterContainer}>
          <input
            type="text"
            placeholder="Search customer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option>All Statuses</option>
            <option>Pending</option>
            <option>Renewed</option>
            <option>Closed</option>
          </select>
        </div>
        <div className={styles.depositTableContainer}>
          <table className={styles.depositDataTable}>
            <thead>
              <tr>
                <th>User</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Maturity Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMaturities.length > 0 ? (
                filteredMaturities.map((row) => (
                  <tr key={row.id}>
                    <td>{row.user}</td>
                    <td>{row.type}</td>
                    <td>₹{row.amount}</td>
                    <td>{row.maturityDate}</td>
                    <td>
                      <span
                        className={`${styles.depositStatusBadge} ${styles[`depositStatus${row.status}`]}`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className={styles.depositActionButtons}>
                      <button
                        className={styles.depositRenewButton}
                        onClick={() => handleMaturityAction(row.id, "Renewed")}
                      >
                        Renew
                      </button>
                      <button
                        className={styles.depositCloseButton}
                        onClick={() => handleMaturityAction(row.id, "Closed")}
                      >
                        Close
                      </button>
                      {(row.status === "Renewed" || row.status === "Closed") && (
                        <button
                          className={styles.depositGenerateButton}
                          onClick={() => handleGenerateInstrument(row)}
                        >
                          Generate
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>
                    No results found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderWithdrawalsTable = () => {
    const filteredWithdrawals = filterRows(withdrawals);

    return (
      <div className={styles.depositContentCard}>
        <h2>Early Withdrawal Requests</h2>
        {notification && (
          <div className={styles.depositNotificationBox}>{notification}</div>
        )}
        <div className={styles.depositFilterContainer}>
          <input
            type="text"
            placeholder="Search customer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option>All Statuses</option>
            <option>Pending</option>
            <option>Approved</option>
            <option>Rejected</option>
          </select>
        </div>
        <div className={styles.depositTableContainer}>
          <table className={styles.depositDataTable}>
            <thead>
              <tr>
                <th>User</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Penalty</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredWithdrawals.length > 0 ? (
                filteredWithdrawals.map((row) => (
                  <tr key={row.id}>
                    <td>{row.user}</td>
                    <td>{row.type}</td>
                    <td>₹{row.amount}</td>
                    <td>₹{row.penalty}</td>
                    <td>
                      <span
                        className={`${styles.depositStatusBadge} ${styles[`depositStatus${row.status}`]}`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className={styles.depositActionButtons}>
                      <button
                        className={styles.depositApproveButton}
                        onClick={() =>
                          handleWithdrawalAction(row.id, "Approved")
                        }
                      >
                        Approve
                      </button>
                      <button
                        className={styles.depositRejectButton}
                        onClick={() =>
                          handleWithdrawalAction(row.id, "Rejected")
                        }
                      >
                        Reject
                      </button>
                      {row.status === "Approved" && (
                        <button
                          className={styles.depositGenerateButton}
                          onClick={() => handleGenerateInstrument(row)}
                        >
                          Generate
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>
                    No results found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className={styles.depositHeaderBar}>
        <h1>Deposits Management</h1>
      </div>
      <div className={styles.depositMainWrapper}>
        <div className={styles.depositTabsWrapper}>
          <button
            className={
              activeTab === "applications" ? styles.depositTabActive : ""
            }
            onClick={() => handleTabChange("applications")}
          >
            Applications
          </button>
          <button
            className={
              activeTab === "maturities" ? styles.depositTabActive : ""
            }
            onClick={() => handleTabChange("maturities")}
          >
            Maturities
          </button>
          <button
            className={
              activeTab === "withdrawals" ? styles.depositTabActive : ""
            }
            onClick={() => handleTabChange("withdrawals")}
          >
            Withdrawals
          </button>
        </div>

        {activeTab === "applications" && renderApplicationsTable()}
        {activeTab === "maturities" && renderMaturitiesTable()}
        {activeTab === "withdrawals" && renderWithdrawalsTable()}

        {modalData && (
          <div className={styles.depositModalOverlay}>
            <div className={styles.depositModalContainer}>
              <h3>Adjust Interest for {modalData.row.user}</h3>
              <input
                type="number"
                value={modalData.interest}
                onChange={(e) =>
                  setModalData({ ...modalData, interest: e.target.value })
                }
              />
              <div className={styles.depositModalButtonGroup}>
                <button onClick={() => setModalData(null)}>Cancel</button>
                <button
                  className={styles.depositApproveButton}
                  onClick={handleModalSave}
                >
                  Save & {modalData.action}
                </button>
              </div>
            </div>
          </div>
        )}

        {formatModalData && (
          <FormatModal
            row={formatModalData}
            onClose={() => setFormatModalData(null)}
            onDownload={downloadInstrument}
          />
        )}
      </div>
    </>
  );
};

export default AdminDeposits;