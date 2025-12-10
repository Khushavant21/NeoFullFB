// import React, { useState, useEffect, useMemo, useCallback } from "react";
// import Select from 'react-select';
// import UserProfileModal from "./UserProfileModal";
// import "./UserManagement.css";

// const API_URL = "http://localhost:8080/api/admin/pending-pan";
// const PNB_PRIMARY_COLOR = "#900603";

// const formatCurrency = (amount) =>
//   new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(amount);

// const useWindowWidth = () => {
//   const [width, setWidth] = useState(window.innerWidth);
//   useEffect(() => {
//     const handleResize = () => setWidth(window.innerWidth);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);
//   return width;
// };

// export default function UserManagement() {
//   const windowWidth = useWindowWidth();
//   const isMobile = windowWidth < 768;

//   const [users, setUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("All");
//   const [sortConfig, setSortConfig] = useState({ key: "fullName", direction: "asc" });
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedIds, setSelectedIds] = useState(new Set());
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const pageSize = 10;

//   const statusOptions = [
//     { value: "All", label: "All Status" },
//     { value: "Active", label: "Active" },
//     { value: "Pending KYC", label: "Pending KYC" },
//     { value: "Suspended", label: "Suspended" }
//   ];

//   const customStyles = {
//     control: (base, state) => ({
//       ...base,
//       border: '1px solid #ccc',
//       borderRadius: '6px',
//       minHeight: '38px',
//       boxShadow: state.isFocused ? '0 0 0 1px #900603' : 'none',
//       borderColor: state.isFocused ? '#900603' : '#ccc',
//       '&:hover': { borderColor: '#900603' }
//     }),
//     option: (base, state) => ({
//       ...base,
//       backgroundColor: state.isSelected ? '#900603' : state.isFocused ? '#fdf2f2' : 'white',
//       color: state.isSelected ? 'white' : '#333',
//       '&:active': { backgroundColor: '#900603' }
//     }),
//     singleValue: (base) => ({
//       ...base,
//       color: '#333',
//       fontWeight: '500'
//     })
//   };

//   // ✅ Fetch users from API
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         setLoading(true);
//         setError("");
//       const token = localStorage.getItem("adminToken");

//         console.log(token,"sonali");

//         const response = await fetch(API_URL, {
//           headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${token}`,
//           },
//         });
//         if (!response.ok) throw new Error(`HTTP error! ${response.status}`);
//         const data = await response.json();

//         // ✅ Transform data into display-ready format
//         const formatted = data.map((u, i) => ({
//           id: u.id || i + 1,
//           name: u.fullName || "Unknown User",
//           email: u.email || "N/A",
//           phone: u.mobile || "N/A",
//           account: u.customerId ? `XXXX${u.customerId.slice(-4)}` : "N/A",
//           type: "Savings",
//           balance: formatCurrency(Math.floor(Math.random() * 100000 + 5000)), // mock balance
//           status: u.panRejectedByAdmin
//             ? "Suspended"
//             : u.panVerified
//             ? "Active"
//             : "Pending KYC",
//           frozen: false,
//           lastLogin: u.createdAt,
//           photo: `https://i.pravatar.cc/150?u=${u.email}`,
//           aadhaar: u.aadhaar || "N/A",
//           pan: u.pan || "N/A",
//         }));

//         setUsers(formatted);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to fetch users. Please check your API or token.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUsers();
//   }, []);

//   // ✅ Filtering + sorting logic
//   const filteredUsers = useMemo(() => {
//     let sortableUsers = [...users].filter((u) => {
//       const searchText = search.toLowerCase();
//       const matchesSearch =
//         u.name.toLowerCase().includes(searchText) ||
//         u.email.toLowerCase().includes(searchText) ||
//         u.phone.includes(searchText) ||
//         u.account.includes(searchText);
//       const matchesStatus = statusFilter === "All" || u.status === statusFilter;
//       return matchesSearch && matchesStatus;
//     });

//     if (sortConfig.key) {
//       sortableUsers.sort((a, b) => {
//         let valA = a[sortConfig.key];
//         let valB = b[sortConfig.key];
//         if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
//         if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
//         return 0;
//       });
//     }
//     return sortableUsers;
//   }, [users, search, statusFilter, sortConfig]);

//   const pagedUsers = useMemo(() => {
//     const startIndex = (currentPage - 1) * pageSize;
//     return filteredUsers.slice(startIndex, startIndex + pageSize);
//   }, [filteredUsers, currentPage, pageSize]);

//   const totalPages = Math.ceil(filteredUsers.length / pageSize);

//   const handleSort = useCallback((key) => {
//     setSortConfig((prev) => ({
//       key,
//       direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
//     }));
//   }, []);

//   const toggleFreeze = useCallback((userId) => {
//     setUsers((prev) =>
//       prev.map((u) => (u.id === userId ? { ...u, frozen: !u.frozen } : u))
//     );
//   }, []);

//   const toggleStatus = useCallback((userId, currentStatus) => {
//     const newStatus = currentStatus === "Active" ? "Suspended" : "Active";
//     setUsers((prev) =>
//       prev.map((u) => (u.id === userId ? { ...u, status: newStatus } : u))
//     );
//   }, []);

//   const toggleSelect = (id) => {
//     setSelectedIds((prev) => {
//       const newSet = new Set(prev);
//       if (newSet.has(id)) newSet.delete(id);
//       else newSet.add(id);
//       return newSet;
//     });
//   };

//   const toggleSelectAll = () => {
//     if (pagedUsers.length > 0 && pagedUsers.every((u) => selectedIds.has(u.id))) {
//       setSelectedIds((prev) => {
//         const newSet = new Set(prev);
//         pagedUsers.forEach((u) => newSet.delete(u.id));
//         return newSet;
//       });
//     } else {
//       setSelectedIds((prev) => {
//         const newSet = new Set(prev);
//         pagedUsers.forEach((u) => newSet.add(u.id));
//         return newSet;
//       });
//     }
//   };

//   const bulkFreeze = () => {
//     setUsers((prev) => prev.map((u) => (selectedIds.has(u.id) ? { ...u, frozen: true } : u)));
//     alert(`Frozen ${selectedIds.size} users!`);
//   };

//   const bulkExport = () => {
//     const exportData = users.filter((u) => selectedIds.has(u.id));
//     console.log("Exported:", exportData);
//     alert(`Exported ${exportData.length} users (check console)`);
//   };

//   const summaryData = useMemo(
//     () => ({
//       total: users.length,
//       active: users.filter((u) => u.status === "Active").length,
//       frozen: users.filter((u) => u.frozen).length,
//       pending: users.filter((u) => u.status === "Pending KYC").length,
//     }),
//     [users]
//   );

//   const sortIcon = (key) => {
//     if (sortConfig.key !== key) return <i className="bi bi-arrow-down-up text-muted ms-1"></i>;
//     return sortConfig.direction === "asc" ? (
//       <i className="bi bi-sort-up ms-1"></i>
//     ) : (
//       <i className="bi bi-sort-down ms-1"></i>
//     );
//   };

//   if (loading) return <div className="text-center mt-5">Loading users...</div>;
//   if (error) return <div className="text-center text-danger mt-5">{error}</div>;

//   return (
//     <>
//       <div className="um-dashboard-header">
//         <h2 className="um-dashboard-title">User Management Dashboard</h2>
//         <p className="um-dashboard-description">
//           Manage users, roles, and permissions from here.
//         </p>
//       </div>

//       <div className="um-user-management-container">
//         {/* Summary Cards */}
//         <section className="um-summary-cards">
//           {[
//             { title: "Total Users", value: summaryData.total, icon: "bi-people-fill" },
//             { title: "Active Users", value: summaryData.active, icon: "bi-person-check-fill" },
//             { title: "Frozen Accounts", value: summaryData.frozen, icon: "bi-snow" },
//             { title: "Pending KYC", value: summaryData.pending, icon: "bi-card-checklist" },
//           ].map((card, idx) => (
//             <div className="um-summary-card" key={idx} style={{ borderLeftColor: PNB_PRIMARY_COLOR }}>
//               <div className="um-card-content">
//                 <div>
//                   <h6>{card.title}</h6>
//                   <h2>{card.value}</h2>
//                 </div>
//                 <div className="um-card-icon" style={{ backgroundColor: PNB_PRIMARY_COLOR }}>
//                   <i className={`bi ${card.icon}`}></i>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </section>

//         {/* Controls */}
//         <section className="um-user-controls">
//           <input
//             type="text"
//             placeholder="Search by name, email, phone, account..."
//             value={search}
//             onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
//           />
//           <Select
//             options={statusOptions}
//             value={statusOptions.find(option => option.value === statusFilter)}
//             onChange={(selectedOption) => {
//               setStatusFilter(selectedOption.value);
//               setCurrentPage(1);
//             }}
//             styles={customStyles}
//             className="um-react-select-container"
//             classNamePrefix="um-react-select"
//           />
//           <div className="um-action-buttons">
//             <button onClick={bulkFreeze} disabled={!selectedIds.size}><i className="bi bi-snow"></i> Freeze</button>
//             <button onClick={bulkExport} disabled={!selectedIds.size}><i className="bi bi-download"></i> Export</button>
//           </div>
//         </section>

//         {/* Table */}
//         <div className="um-user-table-wrapper">
//           {!isMobile ? (
//             <table className="um-user-table um-desktop-table">
//               <thead>
//                 <tr>
//                   <th><input type="checkbox" onChange={toggleSelectAll}
//                     checked={pagedUsers.length > 0 && pagedUsers.every(u => selectedIds.has(u.id))} /></th>
//                   <th onClick={() => handleSort("name")}>User {sortIcon("name")}</th>
//                   <th>Email & Phone</th>
//                   <th>Account & Type</th>
//                   <th onClick={() => handleSort("status")}>Status {sortIcon("status")}</th>
//                   <th onClick={() => handleSort("lastLogin")}>Last Login {sortIcon("lastLogin")}</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {pagedUsers.map((user) => (
//                   <tr key={user.id} className={user.frozen ? "um-frozen-row" : ""}>
//                     <td><input type="checkbox" checked={selectedIds.has(user.id)} onChange={() => toggleSelect(user.id)} /></td>
//                     <td className="um-user-info">
//                       <img src={user.photo} alt={user.name} />
//                       <span>{user.name}</span>
//                     </td>
//                     <td>
//                       <div>{user.email}</div>
//                       <div className="um-text-muted">{user.phone}</div>
//                     </td>
//                     <td>
//                       <div>{user.account}</div>
//                       <div className="um-text-muted">{user.type}</div>
//                     </td>
//                     <td>
//                       <span className={`um-status-badge ${user.status.replace(" ", "-").toLowerCase()}`}>{user.status}</span>
//                       {user.frozen && <span className="um-status-badge um-frozen">Frozen</span>}
//                     </td>
//                     <td>{new Date(user.lastLogin).toLocaleDateString("en-GB")}</td>
//                     <td className="um-action-buttons">
//                       <button onClick={() => setSelectedUser(user)}><i className="bi bi-eye-fill"></i></button>
//                       <button className={user.frozen ? "um-unfreeze" : "um-freeze"} onClick={() => toggleFreeze(user.id)}>
//                         {user.frozen ? "Unfreeze" : "Freeze"}
//                       </button>
//                       <button className={user.status === "Active" ? "um-deactivate" : "um-activate"} onClick={() => toggleStatus(user.id, user.status)}>
//                         {user.status === "Active" ? "Deactivate" : "Activate"}
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           ) : (
//             <div className="um-mobile-cards">
//               {pagedUsers.map((user) => (
//                 <div key={user.id} className="um-mobile-card">
//                   <div className="um-card-header">
//                     <input type="checkbox" checked={selectedIds.has(user.id)} onChange={() => toggleSelect(user.id)} />
//                     <img src={user.photo} alt={user.name} />
//                     <span>{user.name}</span>
//                   </div>
//                   <div><strong>Email:</strong> {user.email}</div>
//                   <div><strong>Phone:</strong> {user.phone}</div>
//                   <div><strong>Account:</strong> {user.account}</div>
//                   <div><strong>Type:</strong> {user.type}</div>
//                   <div>
//                     <span className={`um-status-badge ${user.status.replace(" ", "-").toLowerCase()}`}>{user.status}</span>
//                     {user.frozen && <span className="um-status-badge um-frozen">Frozen</span>}
//                   </div>
//                   <div><strong>Last Login:</strong> {new Date(user.lastLogin).toLocaleDateString("en-GB")}</div>
//                   <div className="um-action-buttons">
//                     <button onClick={() => setSelectedUser(user)}><i className="bi bi-eye-fill"></i></button>
//                     <button className={user.frozen ? "um-unfreeze" : "um-freeze"} onClick={() => toggleFreeze(user.id)}>
//                       {user.frozen ? "Unfreeze" : "Freeze"}
//                     </button>
//                     <button className={user.status === "Active" ? "um-deactivate" : "um-activate"} onClick={() => toggleStatus(user.id, user.status)}>
//                       {user.status === "Active" ? "Deactivate" : "Activate"}
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Pagination */}
//         {totalPages > 1 && (
//           <div className="um-cl-pagination">
//             <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>Prev</button>
//             {Array.from({ length: totalPages }, (_, i) => i + 1)
//               .filter(page => page === 1 || page === totalPages || (page >= currentPage - 2 && page <= currentPage + 2))
//               .map((page, idx, arr) => {
//                 const prevPage = arr[idx - 1];
//                 if (prevPage && page - prevPage > 1) {
//                   return (
//                     <React.Fragment key={page}>
//                       <span className="um-ellipsis">...</span>
//                       <button className={currentPage === page ? "um-active" : ""} onClick={() => setCurrentPage(page)}>{page}</button>
//                     </React.Fragment>
//                   );
//                 }
//                 return (
//                   <button key={page} className={currentPage === page ? "um-active" : ""} onClick={() => setCurrentPage(page)}>{page}</button>
//                 );
//               })}
//             <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}>Next</button>
//           </div>
//         )}

//         {/* Modal */}
//         {selectedUser && (
//           <UserProfileModal
//             user={selectedUser}
//             onClose={() => setSelectedUser(null)}
//             onUpdate={(updatedUser) => {
//               setUsers((prev) => prev.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
//             }}
//           />
//         )}
//       </div>
//     </>
//   );
// }





import React, { useState, useEffect, useMemo, useCallback } from "react";
import Select from 'react-select';
import UserProfileModal from "./UserProfileModal";
import "./UserManagement.css";

const API_URL = "http://localhost:8080/api/admin/pending-pan";
const PNB_PRIMARY_COLOR = "#900603";

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(amount);

const useWindowWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return width;
};

export default function UserManagement() {
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 768;

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortConfig, setSortConfig] = useState({ key: "fullName", direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const pageSize = 10;

  const statusOptions = [
    { value: "All", label: "All Status" },
    { value: "Active", label: "Active" },
    { value: "Pending KYC", label: "Pending KYC" },
    { value: "Suspended", label: "Suspended" }
  ];

  const customStyles = {
    control: (base, state) => ({
      ...base,
      border: '1px solid #ccc',
      borderRadius: '6px',
      minHeight: '38px',
      boxShadow: state.isFocused ? '0 0 0 1px #900603' : 'none',
      borderColor: state.isFocused ? '#900603' : '#ccc',
      '&:hover': { borderColor: '#900603' }
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected ? '#900603' : state.isFocused ? '#fdf2f2' : 'white',
      color: state.isSelected ? 'white' : '#333',
      '&:active': { backgroundColor: '#900603' }
    }),
    singleValue: (base) => ({
      ...base,
      color: '#333',
      fontWeight: '500'
    })
  };

  // ✅ Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError("");
        const token = localStorage.getItem("adminToken");

        console.log(token, "sonali");

        const response = await fetch(API_URL, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error(`HTTP error! ${response.status}`);
        const data = await response.json();

        // ✅ Transform data into display-ready format
        const formatted = data.map((u, i) => ({
          id: u.id || i + 1,
          name: u.fullName || "Unknown User",
          email: u.email || "N/A",
          phone: u.mobile || "N/A",
          account: u.customerId ? `XXXX${u.customerId.slice(-4)}` : "N/A",
          type: "Savings",
          balance: formatCurrency(Math.floor(Math.random() * 100000 + 5000)), // mock balance
          status: u.panRejectedByAdmin
            ? "Suspended"
            : u.panVerified
              ? "Active"
              : "Pending KYC",
          frozen: false,
          lastLogin: u.createdAt,
          photo: `https://i.pravatar.cc/150?u=${u.email}`,
          aadhaar: u.aadhaar || "N/A",
          pan: u.pan || "N/A",
        }));

        setUsers(formatted);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch users. Please check your API or token.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);


  const handleApprove = async (email) => {
    try {
      const token = localStorage.getItem("adminToken");
      console.log(token,"reav")
      if (!token) {
        alert("Unauthorized: Please login again.");
        return;
      }

      const response = await fetch(`http://localhost:8080/api/admin/approve/${email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert(`✅ PAN approved for ${email}`);
        // ✅ Update status locally
        setUsers((prev) =>
          prev.map((u) => (u.email === email ? { ...u, status: "Active" } : u))
        );
      } else {
        const err = await response.text();
        console.error("Approval failed:", err);
        alert("❌ Failed to approve PAN");
      }
    } catch (error) {
      console.error("Approve API error:", error);
      alert("⚠️ Something went wrong while approving PAN");
    }
  };

  // ✅ Reject PAN
  const handleReject = async (email) => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        alert("Unauthorized: Please login again.");
        return;
      }

      const response = await fetch(`http://localhost:8080/api/admin/reject/${email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert(`🚫 PAN rejected for ${email}`);
        // ✅ Update status locally
        setUsers((prev) =>
          prev.map((u) => (u.email === email ? { ...u, status: "Suspended" } : u))
        );
      } else {
        const err = await response.text();
        console.error("Rejection failed:", err);
        alert("❌ Failed to reject PAN");
      }
    } catch (error) {
      console.error("Reject API error:", error);
      alert("⚠️ Something went wrong while rejecting PAN");
    }
  };
  // ✅ Filtering + sorting logic
  const filteredUsers = useMemo(() => {
    let sortableUsers = [...users].filter((u) => {
      const searchText = search.toLowerCase();
      const matchesSearch =
        u.name.toLowerCase().includes(searchText) ||
        u.email.toLowerCase().includes(searchText) ||
        u.phone.includes(searchText) ||
        u.account.includes(searchText);
      const matchesStatus = statusFilter === "All" || u.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    if (sortConfig.key) {
      sortableUsers.sort((a, b) => {
        let valA = a[sortConfig.key];
        let valB = b[sortConfig.key];
        if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
        if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return sortableUsers;
  }, [users, search, statusFilter, sortConfig]);

  const pagedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredUsers.slice(startIndex, startIndex + pageSize);
  }, [filteredUsers, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredUsers.length / pageSize);

  const handleSort = useCallback((key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  }, []);

  const toggleFreeze = useCallback((userId) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, frozen: !u.frozen } : u))
    );
  }, []);

  const toggleStatus = useCallback((userId, currentStatus) => {
    const newStatus = currentStatus === "Active" ? "Suspended" : "Active";
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, status: newStatus } : u))
    );
  }, []);

  const toggleSelect = (id) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  const toggleSelectAll = () => {
    if (pagedUsers.length > 0 && pagedUsers.every((u) => selectedIds.has(u.id))) {
      setSelectedIds((prev) => {
        const newSet = new Set(prev);
        pagedUsers.forEach((u) => newSet.delete(u.id));
        return newSet;
      });
    } else {
      setSelectedIds((prev) => {
        const newSet = new Set(prev);
        pagedUsers.forEach((u) => newSet.add(u.id));
        return newSet;
      });
    }
  };

  const bulkFreeze = () => {
    setUsers((prev) => prev.map((u) => (selectedIds.has(u.id) ? { ...u, frozen: true } : u)));
    alert(`Frozen ${selectedIds.size} users!`);
  };

  const bulkExport = () => {
    const exportData = users.filter((u) => selectedIds.has(u.id));
    console.log("Exported:", exportData);
    alert(`Exported ${exportData.length} users (check console)`);
  };

  const summaryData = useMemo(
    () => ({
      total: users.length,
      active: users.filter((u) => u.status === "Active").length,
      frozen: users.filter((u) => u.frozen).length,
      pending: users.filter((u) => u.status === "Pending KYC").length,
    }),
    [users]
  );

  const sortIcon = (key) => {
    if (sortConfig.key !== key) return <i className="bi bi-arrow-down-up text-muted ms-1"></i>;
    return sortConfig.direction === "asc" ? (
      <i className="bi bi-sort-up ms-1"></i>
    ) : (
      <i className="bi bi-sort-down ms-1"></i>
    );
  };

  if (loading) return <div className="text-center mt-5">Loading users...</div>;
  if (error) return <div className="text-center text-danger mt-5">{error}</div>;

  return (
    <>
      <div className="um-dashboard-header">
        <h2 className="um-dashboard-title">User Management Dashboard</h2>
        <p className="um-dashboard-description">
          Manage users, roles, and permissions from here.
        </p>
      </div>

      <div className="um-user-management-container">
        {/* Summary Cards */}
        <section className="um-summary-cards">
          {[
            { title: "Total Users", value: summaryData.total, icon: "bi-people-fill" },
            { title: "Active Users", value: summaryData.active, icon: "bi-person-check-fill" },
            { title: "Frozen Accounts", value: summaryData.frozen, icon: "bi-snow" },
            { title: "Pending KYC", value: summaryData.pending, icon: "bi-card-checklist" },
          ].map((card, idx) => (
            <div className="um-summary-card" key={idx} style={{ borderLeftColor: PNB_PRIMARY_COLOR }}>
              <div className="um-card-content">
                <div>
                  <h6>{card.title}</h6>
                  <h2>{card.value}</h2>
                </div>
                <div className="um-card-icon" style={{ backgroundColor: PNB_PRIMARY_COLOR }}>
                  <i className={`bi ${card.icon}`}></i>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Controls */}
        <section className="um-user-controls">
          <input
            type="text"
            placeholder="Search by name, email, phone, account..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
          />
          <Select
            options={statusOptions}
            value={statusOptions.find(option => option.value === statusFilter)}
            onChange={(selectedOption) => {
              setStatusFilter(selectedOption.value);
              setCurrentPage(1);
            }}
            styles={customStyles}
            className="um-react-select-container"
            classNamePrefix="um-react-select"
          />
          <div className="um-action-buttons">
            <button onClick={bulkFreeze} disabled={!selectedIds.size}><i className="bi bi-snow"></i> Freeze</button>
            <button onClick={bulkExport} disabled={!selectedIds.size}><i className="bi bi-download"></i> Export</button>
          </div>
        </section>

        {/* Table */}
        <div className="um-user-table-wrapper">
          {!isMobile ? (
            <table className="um-user-table um-desktop-table">
              <thead>
                <tr>
                  <th><input type="checkbox" onChange={toggleSelectAll}
                    checked={pagedUsers.length > 0 && pagedUsers.every(u => selectedIds.has(u.id))} /></th>
                  <th onClick={() => handleSort("name")}>User {sortIcon("name")}</th>
                  <th>Email & Phone</th>
                  <th>Account & Type</th>
                  <th onClick={() => handleSort("status")}>Status {sortIcon("status")}</th>
                  <th onClick={() => handleSort("lastLogin")}>Last Login {sortIcon("lastLogin")}</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pagedUsers.map((user) => (
                  <tr key={user.id} className={user.frozen ? "um-frozen-row" : ""}>
                    <td><input type="checkbox" checked={selectedIds.has(user.id)} onChange={() => toggleSelect(user.id)} /></td>
                    <td className="um-user-info">
                      <img src={user.photo} alt={user.name} />
                      <span>{user.name}</span>
                    </td>
                    <td>
                      <div>{user.email}</div>
                      <div className="um-text-muted">{user.phone}</div>
                    </td>
                    <td>
                      <div>{user.account}</div>
                      <div className="um-text-muted">{user.type}</div>
                    </td>
                    <td>
                      <span className={`um-status-badge ${user.status.replace(" ", "-").toLowerCase()}`}>{user.status}</span>
                      {user.frozen && <span className="um-status-badge um-frozen">Frozen</span>}
                    </td>
                    <td>{new Date(user.lastLogin).toLocaleDateString("en-GB")}</td>
                    <td className="um-action-buttons">
                      <button onClick={() => setSelectedUser(user)}><i className="bi bi-eye-fill"></i></button>
                      <button className="um-approve" onClick={() => handleApprove(user.email)}>Approve</button>
                      <button className="um-reject" onClick={() => handleReject(user.email)}>Reject</button>

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="um-mobile-cards">
              {pagedUsers.map((user) => (
                <div key={user.id} className="um-mobile-card">
                  <div className="um-card-header">
                    <input type="checkbox" checked={selectedIds.has(user.id)} onChange={() => toggleSelect(user.id)} />
                    <img src={user.photo} alt={user.name} />
                    <span>{user.name}</span>
                  </div>
                  <div><strong>Email:</strong> {user.email}</div>
                  <div><strong>Phone:</strong> {user.phone}</div>
                  <div><strong>Account:</strong> {user.account}</div>
                  <div><strong>Type:</strong> {user.type}</div>
                  <div>
                    <span className={`um-status-badge ${user.status.replace(" ", "-").toLowerCase()}`}>{user.status}</span>
                    {user.frozen && <span className="um-status-badge um-frozen">Frozen</span>}
                  </div>
                  <div><strong>Last Login:</strong> {new Date(user.lastLogin).toLocaleDateString("en-GB")}</div>
                  <div className="um-action-buttons">
                    <button onClick={() => setSelectedUser(user)}><i className="bi bi-eye-fill"></i></button>
                    <button className="um-approve" onClick={() => handleApprove(user.email)} disabled={loading}>
                      Approve
                    </button>
                    <button className="um-reject" onClick={() => handleReject(user.email)}>Reject</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="um-cl-pagination">
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>Prev</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(page => page === 1 || page === totalPages || (page >= currentPage - 2 && page <= currentPage + 2))
              .map((page, idx, arr) => {
                const prevPage = arr[idx - 1];
                if (prevPage && page - prevPage > 1) {
                  return (
                    <React.Fragment key={page}>
                      <span className="um-ellipsis">...</span>
                      <button className={currentPage === page ? "um-active" : ""} onClick={() => setCurrentPage(page)}>{page}</button>
                    </React.Fragment>
                  );
                }
                return (
                  <button key={page} className={currentPage === page ? "um-active" : ""} onClick={() => setCurrentPage(page)}>{page}</button>
                );
              })}
            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}>Next</button>
          </div>
        )}

        {/* Modal */}
        {selectedUser && (
          <UserProfileModal
            user={selectedUser}
            onClose={() => setSelectedUser(null)}
            onUpdate={(updatedUser) => {
              setUsers((prev) => prev.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
            }}
          />
        )}
      </div>
    </>
  );
}
