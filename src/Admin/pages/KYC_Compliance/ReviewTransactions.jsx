import React, { useState, useEffect } from "react";
import "./ReviewTransactions.css";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export default function ReviewTransactions() {
  const navigate = useNavigate();

  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("latest");
  const [page, setPage] = useState(1);
  const [selectedCases, setSelectedCases] = useState([]);
  const [viewingCase, setViewingCase] = useState(null);
  const [activeTab, setActiveTab] = useState("Documents");

  const itemsPerPage = 5;

  // ⭐ FETCH BACKEND API
  useEffect(() => {
    fetch("http://localhost:8080/api/auth/admin/kyc/all")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((item) => ({
          caseId: item.customerId, // table column
          name: item.name,
          status: item.status,
          note: "",
          docs: [
            item.aadhaarPhotoUrl
              ? { type: "Aadhaar", url: item.aadhaarPhotoUrl }
              : null,
            item.signatureUrl
              ? { type: "Signature", url: item.signatureUrl }
              : null,
          ].filter(Boolean),
          auditLogs: [],
          notes: [],
        }));

        setCases(formatted);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  // ----------------------- FILTER + SORT -----------------------
  const filteredCases = cases
    .filter(
      (c) =>
        (c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.caseId.toLowerCase().includes(search.toLowerCase())) &&
        (filter === "All" || c.status === filter)
    )
    .sort((a, b) =>
      sort === "latest"
        ? b.caseId.localeCompare(a.caseId)
        : a.caseId.localeCompare(b.caseId)
    );

  const totalPages = Math.ceil(filteredCases.length / itemsPerPage);
  const paginatedCases = filteredCases.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // ----------------------- BULK ACTIONS -----------------------
  const toggleCase = (caseId) =>
    setSelectedCases((prev) =>
      prev.includes(caseId)
        ? prev.filter((id) => id !== caseId)
        : [...prev, caseId]
    );

  const toggleAll = () =>
    setSelectedCases(
      selectedCases.length === paginatedCases.length
        ? []
        : paginatedCases.map((c) => c.caseId)
    );

  const bulkAction = (action) => {
    if (!selectedCases.length) return;
    setCases((prev) =>
      prev.map((c) =>
        selectedCases.includes(c.caseId)
          ? {
              ...c,
              status: action,
              auditLogs: [
                ...c.auditLogs,
                {
                  id: c.auditLogs.length + 1,
                  action,
                  user: "Admin",
                  date: new Date().toLocaleString(),
                  remark: `${action} in Bulk`,
                },
              ],
            }
          : c
      )
    );
    setSelectedCases([]);
  };

  // ----------------------- MODAL HELPERS -----------------------
  const addNote = (caseId, noteText) => {
    if (!noteText.trim()) return;

    setCases((prev) =>
      prev.map((c) =>
        c.caseId === caseId
          ? {
              ...c,
              notes: [...c.notes, noteText],
              auditLogs: [
                ...c.auditLogs,
                {
                  id: c.auditLogs.length + 1,
                  action: "Note Added",
                  user: "Admin",
                  date: new Date().toLocaleString(),
                  remark: noteText,
                },
              ],
            }
          : c
      )
    );
  };

  const escalateCase = (caseId, reason) => {
    if (!reason.trim()) return;

    setCases((prev) =>
      prev.map((c) =>
        c.caseId === caseId
          ? {
              ...c,
              status: "Escalated",
              note: reason,
              auditLogs: [
                ...c.auditLogs,
                {
                  id: c.auditLogs.length + 1,
                  action: "Escalated",
                  user: "Admin",
                  date: new Date().toLocaleString(),
                  remark: reason,
                },
              ],
            }
          : c
      )
    );
  };

  const downloadDoc = (url, type) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = `${type}.jpg`;
    link.click();
  };

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  // ----------------------- JSX RETURN -----------------------
  return (
    <>
      <div className="rt-header-heading">
        <div className="rt-header-content">
          <h2>Neo Bank - KYC History</h2>
          <p>All verified and pending KYC records are listed here</p>
        </div>
        <div className="rt-back-btn-container">
          <button onClick={() => navigate("/Admin/kyc")} className="rt-back-btn">
            <FaArrowLeft className="rt-back-btn-icon" />
            <span className="rt-back-btn-text">Back</span>
          </button>
        </div>
      </div>

      <div className="rt-container">
        <div className="rt-header">KYC History</div>

        {/* ---------------- SEARCH + FILTER ---------------- */}
        <div className="rt-controls">
          <input
            type="text"
            placeholder="Search Case ID or Name"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />

          {/* FILTER */}
          <Select
            options={[
              { value: "All", label: "All Status" },
              { value: "Pending", label: "Pending" },
              { value: "Approved", label: "Approved" },
              { value: "Rejected", label: "Rejected" },
              { value: "Escalated", label: "Escalated" },
            ]}
            value={{ value: filter, label: filter }}
            onChange={(o) => setFilter(o.value)}
          />

          {/* SORT */}
          <Select
            options={[
              { value: "latest", label: "Latest First" },
              { value: "oldest", label: "Oldest First" },
            ]}
            value={{
              value: sort,
              label: sort === "latest" ? "Latest First" : "Oldest First",
            }}
            onChange={(o) => setSort(o.value)}
          />

          {/* BULK ACTION */}
          <div className="rt-bulk-buttons">
            <button
              onClick={() => bulkAction("Approved")}
              className="rt-btn-approve"
            >
              Bulk Approve
            </button>
            <button
              onClick={() => bulkAction("Rejected")}
              className="rt-btn-reject"
            >
              Bulk Reject
            </button>
          </div>
        </div>

        {/* ---------------- TABLE ---------------- */}
        <div className="rt-table-wrapper">
          <table className="rt-table">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={
                      selectedCases.length === paginatedCases.length &&
                      paginatedCases.length > 0
                    }
                    onChange={toggleAll}
                  />
                </th>
                <th>Case ID</th>
                <th>Name</th>
                <th>Status</th>

                {/* ⭐ DATE COLUMN REMOVED → CUSTOMER ID SHOW */}
                <th>Customer ID</th>

                <th>Note</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {paginatedCases.map((c) => (
                <tr key={c.caseId}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedCases.includes(c.caseId)}
                      onChange={() => toggleCase(c.caseId)}
                    />
                  </td>

                  <td>{c.caseId}</td>
                  <td>{c.name}</td>

                  <td className={`rt-status ${c.status.toLowerCase()}`}>
                    {c.status}
                  </td>

                  {/* ⭐ CUSTOMER ID HERE */}
                  <td>{c.caseId}</td>

                  <td>{c.note}</td>

                  <td>
                    <button
                      className="rt-btn-view"
                      onClick={() => {
                        setViewingCase(c);
                        setActiveTab("Documents");
                      }}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ---------------- PAGINATION ---------------- */}
        <div className="rt-pagination">
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>
            Prev
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>

        {/* ---------------- MODAL ---------------- */}
        {viewingCase && (
          <div className="rt-modal">
            <div className="rt-modal-content">
              <header className="rt-modal-header">
                <h3>
                  {viewingCase.caseId} - {viewingCase.name}
                </h3>
                <button
                  className="rt-btn-close"
                  onClick={() => setViewingCase(null)}
                >
                  ×
                </button>
              </header>

              <div className="rt-modal-body">
                <div className="rt-tab-buttons">
                  {["Documents", "Notes", "Audit Trail", "Escalate"].map(
                    (tab) => (
                      <button
                        key={tab}
                        className={activeTab === tab ? "active" : ""}
                        onClick={() => setActiveTab(tab)}
                      >
                        {tab}
                      </button>
                    )
                  )}
                </div>

                <div className="rt-tab-content">
                  {activeTab === "Documents" && (
                    <div className="rt-documents">
                      {viewingCase.docs.length ? (
                        viewingCase.docs.map((doc, idx) => (
                          <div key={idx} className="rt-doc-card">
                            <img src={doc.url} alt={doc.type} />
                            <span>{doc.type}</span>
                            <button onClick={() => downloadDoc(doc.url, doc.type)}>
                              Download
                            </button>
                          </div>
                        ))
                      ) : (
                        <p>No documents uploaded</p>
                      )}
                    </div>
                  )}

                  {activeTab === "Notes" && (
                    <div className="rt-notes">
                      {viewingCase.notes.map((n, i) => (
                        <p key={i}>{n}</p>
                      ))}

                      <input type="text" id="rt-noteInput" />
                      <button
                        onClick={() => {
                          const v = document.getElementById("rt-noteInput").value;
                          addNote(viewingCase.caseId, v);
                          document.getElementById("rt-noteInput").value = "";
                        }}
                      >
                        Add Note
                      </button>
                    </div>
                  )}

                  {activeTab === "Audit Trail" && (
                    <div className="rt-audit">
                      {viewingCase.auditLogs.map((log) => (
                        <p key={log.id}>
                          {log.date} - {log.user} - {log.action} - {log.remark}
                        </p>
                      ))}
                    </div>
                  )}

                  {activeTab === "Escalate" && (
                    <div className="rt-escalate">
                      <input type="text" id="rt-escalateInput" />
                      <button
                        onClick={() => {
                          const v =
                            document.getElementById("rt-escalateInput").value;
                          escalateCase(viewingCase.caseId, v);
                          document.getElementById("rt-escalateInput").value = "";
                        }}
                      >
                        Escalate
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
