import React, { useState, useEffect } from "react";
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import "./AccountsDashboard.css";

const sampleAccounts = [
  {
    id: 1,
    customerName: "John Doe",
    accountNumber: "ACC001234567",
    accountType: "Savings",
    balance: 25000.5,
    walletBalance: 1200.0,
    status: "Active",
    lastTransaction: "2024-01-15",
    kycStatus: "Verified",
  },
  {
    id: 2,
    customerName: "Jane Smith",
    accountNumber: "ACC001234568",
    accountType: "Current",
    balance: 45000.75,
    walletBalance: 800.0,
    status: "Active",
    lastTransaction: "2024-01-14",
    kycStatus: "Pending",
  },
  {
    id: 3,
    customerName: "Mike Johnson",
    accountNumber: "ACC001234569",
    accountType: "Savings",
    balance: 15000.25,
    walletBalance: 500.0,
    status: "Frozen",
    lastTransaction: "2024-01-10",
    kycStatus: "Verified",
  },
  {
    id: 4,
    customerName: "Sarah Wilson",
    accountNumber: "ACC001234570",
    accountType: "Business",
    balance: 75000.0,
    walletBalance: 2000.0,
    status: "Active",
    lastTransaction: "2024-01-16",
    kycStatus: "Verified",
  },
  {
    id: 5,
    customerName: "Robert Brown",
    accountNumber: "ACC001234571",
    accountType: "Current",
    balance: 500.0,
    walletBalance: 50.0,
    status: "Pending",
    lastTransaction: "2024-01-12",
    kycStatus: "Pending",
  },
];

// Options for React Select
const statusOptions = [
  { value: "All", label: "All Status" },
  { value: "Active", label: "Active" },
  { value: "Frozen", label: "Frozen" },
  { value: "Pending", label: "Pending" },
  { value: "Closed", label: "Closed" }
];

const typeOptions = [
  { value: "All", label: "All Types" },
  { value: "Savings", label: "Savings" },
  { value: "Current", label: "Current" },
  { value: "Business", label: "Business" }
];

const balanceOptions = [
  { value: "All", label: "All Ranges" },
  { value: "0-1000", label: "$0 - $1,000" },
  { value: "1000-10000", label: "$1,000 - $10,000" },
  { value: "10000-50000", label: "$10,000 - $50,000" },
  { value: "50000+", label: "$50,000+" }
];

const kycOptions = [
  { value: "Verified", label: "Verified" },
  { value: "Pending", label: "Pending" },
  { value: "Rejected", label: "Rejected" }
];

const accountTypeOptions = [
  { value: "Savings", label: "Savings" },
  { value: "Current", label: "Current" },
  { value: "Business", label: "Business" }
];

const statusEditOptions = [
  { value: "Active", label: "Active" },
  { value: "Pending", label: "Pending" },
  { value: "Frozen", label: "Frozen" },
  { value: "Closed", label: "Closed" }
];

const AccountsDashboard = () => {
  const [accounts, setAccounts] = useState(sampleAccounts);
  const [filteredAccounts, setFilteredAccounts] = useState(sampleAccounts);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState({ value: "All", label: "All Status" });
  const [typeFilter, setTypeFilter] = useState({ value: "All", label: "All Types" });
  const [balanceRangeFilter, setBalanceRangeFilter] = useState({ value: "All", label: "All Ranges" });
  const [dateFromFilter, setDateFromFilter] = useState(null);
  const [dateToFilter, setDateToFilter] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [editingAccount, setEditingAccount] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);

  const totalAccounts = accounts.length;
  const activeAccounts = accounts.filter((acc) => acc.status === "Active").length;
  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);
  const totalWalletBalance = accounts.reduce((sum, acc) => sum + acc.walletBalance, 0);

  useEffect(() => {
    let filtered = accounts;

    if (searchTerm) {
      filtered = filtered.filter(
        (account) =>
          account.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          account.accountNumber.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter.value !== "All") {
      filtered = filtered.filter((account) => account.status === statusFilter.value);
    }

    if (typeFilter.value !== "All") {
      filtered = filtered.filter((account) => account.accountType === typeFilter.value);
    }

    if (balanceRangeFilter.value !== "All") {
      filtered = filtered.filter((account) => {
        switch (balanceRangeFilter.value) {
          case "0-1000":
            return account.balance >= 0 && account.balance <= 1000;
          case "1000-10000":
            return account.balance > 1000 && account.balance <= 10000;
          case "10000-50000":
            return account.balance > 10000 && account.balance <= 50000;
          case "50000+":
            return account.balance > 50000;
          default:
            return true;
        }
      });
    }

    if (dateFromFilter || dateToFilter) {
      filtered = filtered.filter((account) => {
        const transactionDate = new Date(account.lastTransaction);
        const fromDate = dateFromFilter ? new Date(dateFromFilter) : new Date("1900-01-01");
        const toDate = dateToFilter ? new Date(dateToFilter) : new Date("2099-12-31");
        return transactionDate >= fromDate && transactionDate <= toDate;
      });
    }

    setFilteredAccounts(filtered);
    setCurrentPage(1);
  }, [accounts, searchTerm, statusFilter, typeFilter, balanceRangeFilter, dateFromFilter, dateToFilter]);

  // Pagination logic
  const totalPages = Math.ceil(filteredAccounts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAccounts = filteredAccounts.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  const StatusBadge = ({ status }) => {
    return <span className={`adx-status-badge adx-status-${status.toLowerCase()}`}>{status}</span>;
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter({ value: "All", label: "All Status" });
    setTypeFilter({ value: "All", label: "All Types" });
    setBalanceRangeFilter({ value: "All", label: "All Ranges" });
    setDateFromFilter(null);
    setDateToFilter(null);
  };

  const handleEdit = (account) => {
    setEditingAccount(account);
    setEditFormData({
      customerName: account.customerName,
      accountType: { value: account.accountType, label: account.accountType },
      balance: account.balance,
      walletBalance: account.walletBalance,
      status: { value: account.status, label: account.status },
      kycStatus: { value: account.kycStatus, label: account.kycStatus },
    });
  };

  const handleEditFormChange = (field, value) => {
    setEditFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveEdit = () => {
    setAccounts((prevAccounts) =>
      prevAccounts.map((acc) =>
        acc.id === editingAccount.id
          ? {
              ...acc,
              customerName: editFormData.customerName,
              accountType: editFormData.accountType.value,
              balance: parseFloat(editFormData.balance) || 0,
              walletBalance: parseFloat(editFormData.walletBalance) || 0,
              status: editFormData.status.value,
              kycStatus: editFormData.kycStatus.value,
            }
          : acc
      )
    );
    setEditingAccount(null);
    setEditFormData({});
  };

  const handleCancelEdit = () => {
    setEditingAccount(null);
    setEditFormData({});
  };

  // Custom styles for React Select
  const customSelectStyles = {
    control: (base, state) => ({
      ...base,
      border: '2px solid #e9ecef',
      borderRadius: '8px',
      boxShadow: 'none',
      '&:hover': {
        borderColor: '#900603'
      },
      fontSize: '14px',
      minHeight: '48px',
      backgroundColor: '#ffffff',
      transition: 'all 0.3s ease'
    }),
    menu: (base) => ({
      ...base,
      fontSize: '14px',
      zIndex: 10050,
      borderRadius: '8px',
      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
      border: '1px solid #e9ecef'
    }),
    option: (base, state) => ({
      ...base,
      fontSize: '14px',
      padding: '12px 16px',
      backgroundColor: state.isSelected ? '#900603' : state.isFocused ? '#f8f9fa' : 'white',
      color: state.isSelected ? 'white' : '#333',
      '&:hover': {
        backgroundColor: state.isSelected ? '#900603' : '#e9ecef'
      },
      transition: 'all 0.2s ease'
    }),
    indicatorSeparator: () => ({
      display: 'none'
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: '#6c757d',
      '&:hover': {
        color: '#900603'
      }
    })
  };

  return (
    <>
      {/* Header */}
      <div className="adx-dashboard-header">
        <h2 className="adx-header-title">Accounts & Wallets</h2>
        <p className="adx-header-subtitle">Manage customer accounts, wallets, and financial operations</p>
      </div>

      <div className="adx-dashboard-container">
        {/* Summary Cards */}
        <div className="adx-summary-grid">
          <div className="adx-summary-card">
            <p className="adx-card-label">Total Accounts</p>
            <h4 className="adx-card-value adx-value-primary">{totalAccounts}</h4>
            <small className="adx-card-description">{activeAccounts} active</small>
          </div>
          <div className="adx-summary-card">
            <p className="adx-card-label">Total Balance</p>
            <h4 className="adx-card-value adx-value-success">${totalBalance.toLocaleString()}</h4>
            <small className="adx-card-description">Account balances</small>
          </div>
          <div className="adx-summary-card">
            <p className="adx-card-label">Wallet Balance</p>
            <h4 className="adx-card-value adx-value-info">${totalWalletBalance.toLocaleString()}</h4>
            <small className="adx-card-description">Digital wallet funds</small>
          </div>
          <div className="adx-summary-card">
            <p className="adx-card-label">Pending Actions</p>
            <h4 className="adx-card-value adx-value-warning">5</h4>
            <small className="adx-card-description">Requires attention</small>
          </div>
        </div>

        {/* Search + Filters */}
        <div className="adx-filters-wrapper">
          <div className="adx-filters-main">
            <div className="adx-search-container">
              <input
                type="text"
                className="adx-search-input"
                placeholder="Search accounts, customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="adx-actions-container">
              <button 
                className="adx-btn adx-btn-outline"
                onClick={() => setShowFilters(!showFilters)}
              >
                🔍 Filters
              </button>
              <button className="adx-btn adx-btn-primary">⬇ Export</button>
            </div>
          </div>

          {showFilters && (
            <div className="adx-filters-panel">
              <div className="adx-filters-grid">
                <div className="adx-filter-group">
                  <label className="adx-filter-label">Status</label>
                  <div className="adx-react-select-container">
                    <Select
                      value={statusFilter}
                      onChange={setStatusFilter}
                      options={statusOptions}
                      styles={customSelectStyles}
                      isSearchable={false}
                      classNamePrefix="adx-react-select"
                    />
                  </div>
                </div>
                <div className="adx-filter-group">
                  <label className="adx-filter-label">Account Type</label>
                  <div className="adx-react-select-container">
                    <Select
                      value={typeFilter}
                      onChange={setTypeFilter}
                      options={typeOptions}
                      styles={customSelectStyles}
                      isSearchable={false}
                      classNamePrefix="adx-react-select"
                    />
                  </div>
                </div>
                <div className="adx-filter-group">
                  <label className="adx-filter-label">Balance Range</label>
                  <div className="adx-react-select-container">
                    <Select
                      value={balanceRangeFilter}
                      onChange={setBalanceRangeFilter}
                      options={balanceOptions}
                      styles={customSelectStyles}
                      isSearchable={false}
                      classNamePrefix="adx-react-select"
                    />
                  </div>
                </div>
                <div className="adx-filter-group">
                  <label className="adx-filter-label">Date From</label>
                  <DatePicker
                    selected={dateFromFilter}
                    onChange={setDateFromFilter}
                    selectsStart
                    startDate={dateFromFilter}
                    endDate={dateToFilter}
                    placeholderText="Select start date"
                    dateFormat="yyyy-MM-dd"
                    className="adx-date-input"
                    wrapperClassName="adx-datepicker-wrapper"
                    popperClassName="adx-datepicker-popper"
                    isClearable
                    showYearDropdown
                    scrollableYearDropdown
                  />
                </div>
                <div className="adx-filter-group">
                  <label className="adx-filter-label">Date To</label>
                  <DatePicker
                    selected={dateToFilter}
                    onChange={setDateToFilter}
                    selectsEnd
                    startDate={dateFromFilter}
                    endDate={dateToFilter}
                    minDate={dateFromFilter}
                    placeholderText="Select end date"
                    dateFormat="yyyy-MM-dd"
                    className="adx-date-input"
                    wrapperClassName="adx-datepicker-wrapper"
                    popperClassName="adx-datepicker-popper"
                    isClearable
                    showYearDropdown
                    scrollableYearDropdown
                  />
                </div>
              </div>
              <button className="adx-btn adx-btn-secondary" onClick={clearFilters}>
                Clear All Filters
              </button>
            </div>
          )}
        </div>

        {/* Accounts Table */}
        <div className="adx-table-section">
          <div className="adx-table-header">
            <h5 className="adx-table-title">All Accounts</h5>
          </div>
          <div className="adx-table-scroll-container">
            <table className="adx-data-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Type</th>
                  <th>Account Balance</th>
                  <th>Wallet Balance</th>
                  <th>Status</th>
                  <th>Last Transaction</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentAccounts.length > 0 ? (
                  currentAccounts.map((acc, index) => (
                    <tr
                      key={acc.id}
                      className={index % 2 === 0 ? "adx-table-row-even" : "adx-table-row-odd"}
                      onClick={() => setSelectedAccount(acc)}
                    >
                      <td>
                        <div>
                          <strong>{acc.customerName}</strong>
                          <br />
                          <small>{acc.accountNumber}</small>
                        </div>
                      </td>
                      <td>
                        <span className="adx-type-badge">{acc.accountType}</span>
                      </td>
                      <td>${acc.balance.toLocaleString()}</td>
                      <td>${acc.walletBalance.toLocaleString()}</td>
                      <td>
                        <StatusBadge status={acc.status} />
                      </td>
                      <td>{acc.lastTransaction}</td>
                      <td>
                        <div className="adx-table-actions">
                          <button
                            className="adx-action-btn adx-action-view"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedAccount(acc);
                            }}
                          >
                            👁 View
                          </button>
                          <button
                            className="adx-action-btn adx-action-edit"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEdit(acc);
                            }}
                          >
                            ✏ Edit
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'center', padding: '20px' }}>
                      No accounts found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination Section */}
          {filteredAccounts.length > 0 && (
            <div className="adx-pagination-container">
              <div className="adx-pagination-info">
                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredAccounts.length)} of {filteredAccounts.length} accounts
              </div>
              <div className="adx-pagination-controls">
                <button 
                  className="adx-pagination-btn adx-pagination-prev"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                >
                  ← Previous
                </button>
                
                <div className="adx-pagination-numbers">
                  {getPageNumbers().map((page) => (
                    <button
                      key={page}
                      className={`adx-pagination-number ${currentPage === page ? 'adx-pagination-active' : ''}`}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                
                <button 
                  className="adx-pagination-btn adx-pagination-next"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  Next →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Account Detail Modal */}
        {selectedAccount && !editingAccount && (
          <div className="adx-modal-overlay">
            <div className="adx-modal-container">
              <div className="adx-modal-header">
                <h5 className="adx-modal-title">Account Details</h5>
                <button className="adx-modal-close" onClick={() => setSelectedAccount(null)}>×</button>
              </div>
              <div className="adx-modal-body">
                <div className="adx-modal-grid">
                  <div>
                    <h6 className="adx-section-title">Customer Information</h6>
                    <div className="adx-info-group">
                      <span className="adx-info-label">Name:</span>
                      <p className="adx-info-value">{selectedAccount.customerName}</p>
                    </div>
                    <div className="adx-info-group">
                      <span className="adx-info-label">Account Number:</span>
                      <p className="adx-info-value">{selectedAccount.accountNumber}</p>
                    </div>
                    <div className="adx-info-group">
                      <span className="adx-info-label">Account Type:</span>
                      <p className="adx-info-value">{selectedAccount.accountType}</p>
                    </div>
                    <div className="adx-info-group">
                      <span className="adx-info-label">KYC Status:</span>
                      <p className="adx-info-value">{selectedAccount.kycStatus}</p>
                    </div>
                  </div>
                  <div>
                    <h6 className="adx-section-title">Balance Information</h6>
                    <div className="adx-info-group">
                      <span className="adx-info-label">Account Balance:</span>
                      <p className="adx-info-value">${selectedAccount.balance.toLocaleString()}</p>
                    </div>
                    <div className="adx-info-group">
                      <span className="adx-info-label">Wallet Balance:</span>
                      <p className="adx-info-value">${selectedAccount.walletBalance.toLocaleString()}</p>
                    </div>
                    <div className="adx-info-group">
                      <span className="adx-info-label">Status:</span>
                      <p className="adx-info-value"><StatusBadge status={selectedAccount.status} /></p>
                    </div>
                    <div className="adx-info-group">
                      <span className="adx-info-label">Last Transaction:</span>
                      <p className="adx-info-value">{selectedAccount.lastTransaction}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="adx-modal-footer">
                <button className="adx-btn adx-btn-primary">Generate Statement</button>
                <button className="adx-btn adx-btn-success">Manual Adjustment</button>
                <button className="adx-btn adx-btn-warning">Update Limits</button>
                <button className="adx-btn adx-btn-danger">Freeze Account</button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Account Modal */}
        {editingAccount && (
          <div className="adx-modal-overlay">
            <div className="adx-modal-container">
              <div className="adx-modal-header adx-edit-header">
                <h5 className="adx-modal-title">Edit Account</h5>
                <button className="adx-modal-close" onClick={handleCancelEdit}>×</button>
              </div>
              <div className="adx-modal-body">
                <div className="adx-modal-grid">
                  <div>
                    <h6 className="adx-section-title">Customer Information</h6>
                    <div className="adx-form-group">
                      <label className="adx-form-label">Name:</label>
                      <input
                        type="text"
                        className="adx-form-input"
                        value={editFormData.customerName || ""}
                        onChange={(e) => handleEditFormChange("customerName", e.target.value)}
                      />
                    </div>
                    <div className="adx-form-group">
                      <label className="adx-form-label">Account Number:</label>
                      <input
                        type="text"
                        className="adx-form-input adx-form-input-disabled"
                        value={editingAccount.accountNumber}
                        disabled
                      />
                    </div>
                    <div className="adx-form-group">
                      <label className="adx-form-label">Account Type:</label>
                      <div className="adx-react-select-container">
                        <Select
                          value={editFormData.accountType}
                          onChange={(value) => handleEditFormChange("accountType", value)}
                          options={accountTypeOptions}
                          styles={customSelectStyles}
                          isSearchable={false}
                          classNamePrefix="adx-react-select"
                        />
                      </div>
                    </div>
                    <div className="adx-form-group">
                      <label className="adx-form-label">KYC Status:</label>
                      <div className="adx-react-select-container">
                        <Select
                          value={editFormData.kycStatus}
                          onChange={(value) => handleEditFormChange("kycStatus", value)}
                          options={kycOptions}
                          styles={customSelectStyles}
                          isSearchable={false}
                          classNamePrefix="adx-react-select"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <h6 className="adx-section-title">Balance Information</h6>
                    <div className="adx-form-group">
                      <label className="adx-form-label">Account Balance:</label>
                      <input
                        type="number"
                        step="0.01"
                        className="adx-form-input"
                        value={editFormData.balance || ""}
                        onChange={(e) => handleEditFormChange("balance", e.target.value)}
                      />
                    </div>
                    <div className="adx-form-group">
                      <label className="adx-form-label">Wallet Balance:</label>
                      <input
                        type="number"
                        step="0.01"
                        className="adx-form-input"
                        value={editFormData.walletBalance || ""}
                        onChange={(e) => handleEditFormChange("walletBalance", e.target.value)}
                      />
                    </div>
                    <div className="adx-form-group">
                      <label className="adx-form-label">Status:</label>
                      <div className="adx-react-select-container">
                        <Select
                          value={editFormData.status}
                          onChange={(value) => handleEditFormChange("status", value)}
                          options={statusEditOptions}
                          styles={customSelectStyles}
                          isSearchable={false}
                          classNamePrefix="adx-react-select"
                        />
                      </div>
                    </div>
                    <div className="adx-form-group">
                      <label className="adx-form-label">Last Transaction:</label>
                      <input
                        type="text"
                        className="adx-form-input adx-form-input-disabled"
                        value={editingAccount.lastTransaction}
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="adx-modal-footer">
                <button className="adx-btn adx-btn-secondary" onClick={handleCancelEdit}>
                  Cancel
                </button>
                <button className="adx-btn adx-btn-primary" onClick={handleSaveEdit}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AccountsDashboard;