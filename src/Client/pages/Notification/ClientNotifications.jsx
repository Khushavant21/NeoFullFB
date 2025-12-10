import React, { useEffect, useMemo, useState } from "react";
import {
  Bell,
  X,
  CheckCircle,
  Circle,
  Trash2,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import "./ClientNotification.css";

const STORAGE_KEY = "client_notifications_v1";

// Demo Notifications
const sampleNotifications = [
  {
    id: "n1",
    title: "Salary Credited",
    message: "₹75,000 has been credited to your Savings Account.",
    datetime: "2025-11-20T09:30:00",
    read: false,
    type: "income",
  },
  {
    id: "n2",
    title: "Bill Due Tomorrow",
    message: "Electricity bill of ₹1,200 is due tomorrow.",
    datetime: "2025-11-24T14:05:00",
    read: false,
    type: "reminder",
  },
  {
    id: "n3",
    title: "New Offer: Credit Card",
    message: "Get 5% cashback on groceries for 3 months. Apply now!",
    datetime: "2025-11-18T08:00:00",
    read: true,
    type: "promo",
  },
  {
    id: "n4",
    title: "Auto-debit Processed",
    message: "Home Loan EMI of ₹23,500 processed.",
    datetime: "2025-11-15T07:30:00",
    read: true,
    type: "transaction",
  },
  {
    id: "n5",
    title: "Profile Updated",
    message: "Your address was successfully updated.",
    datetime: "2025-11-10T12:00:00",
    read: false,
    type: "security",
  },
];

// Format Date
function formatDateTime(dtString) {
  const d = new Date(dtString);
  return d.toLocaleString("en-IN", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Unread Dot Component
function DotIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden>
      <circle cx="5" cy="5" r="5" fill="#900603" />
    </svg>
  );
}

export default function ClientNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 6;

  // Load storage
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setNotifications(JSON.parse(raw));
        return;
      } catch {}
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleNotifications));
    setNotifications(sampleNotifications);
  }, []);

  // Save storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
  }, [notifications]);

  // Count unread/read
  const counts = useMemo(() => {
    const total = notifications.length;
    const unread = notifications.filter((n) => !n.read).length;
    return { total, unread, read: total - unread };
  }, [notifications]);

  // Filter logic
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    let list = notifications
      .slice()
      .sort((a, b) => new Date(b.datetime) - new Date(a.datetime));

    if (activeTab === "unread") list = list.filter((n) => !n.read);
    if (activeTab === "read") list = list.filter((n) => n.read);

    if (q) {
      list = list.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.message.toLowerCase().includes(q) ||
          (n.type || "").toLowerCase().includes(q)
      );
    }

    return list;
  }, [notifications, activeTab, query]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // CRUD Actions
  const markAsRead = (id) =>
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );

  const markAsUnread = (id) =>
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: false } : n))
    );

  const deleteNotification = (id) =>
    setNotifications((prev) => prev.filter((n) => n.id !== id));

  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  const clearAll = () => {
    if (window.confirm("Delete all notifications?")) setNotifications([]);
  };

  return (
    <div className="client-notif-page">
      {/* HEADER */}
      <div className="client-notif-header">
        <div className="client-notif-title">
          <Bell size={22} /> <h2>Notifications</h2>
        </div>

        <div className="client-notif-actions">
          {/* Search */}
          <div className="client-notif-search">
            <Search size={16} />
            <input
              placeholder="Search notifications..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
            />

            {query && (
              <button
                className="client-notif-clear-search"
                onClick={() => setQuery("")}
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Buttons */}
          <button className="client-notif-btn" onClick={markAllRead}>
            <CheckCircle size={16} /> Mark all read
          </button>

          <button className="client-notif-btn danger" onClick={clearAll}>
            <Trash2 size={16} /> Clear All
          </button>
        </div>
      </div>

      {/* BODY */}
      <div className="client-notif-body">
        {/* Sidebar */}
        <aside className="client-notif-sidebar">
          <button
            className={`client-notif-tab ${
              activeTab === "all" ? "active" : ""
            }`}
            onClick={() => {
              setActiveTab("all");
              setQuery("");
              setPage(1);
            }}
          >
            All <span className="client-notif-count">{counts.total}</span>
          </button>

          <button
            className={`client-notif-tab ${
              activeTab === "unread" ? "active" : ""
            }`}
            onClick={() => {
              setActiveTab("unread");
              setQuery("");
              setPage(1);
            }}
          >
            Unread{" "}
            <span className="client-notif-count">{counts.unread}</span>
          </button>

          <button
            className={`client-notif-tab ${
              activeTab === "read" ? "active" : ""
            }`}
            onClick={() => {
              setActiveTab("read");
              setQuery("");
              setPage(1);
            }}
          >
            Read <span className="client-notif-count">{counts.read}</span>
          </button>
        </aside>

        {/* List */}
        <section className="client-notif-list-wrap">
          {filtered.length === 0 ? (
            <div className="client-notif-empty">
              <CheckCircle size={40} />
              <p>No notifications found</p>
              <small>You're all caught up!</small>
            </div>
          ) : (
            <>
              <div className="client-notif-list">
                {pageItems.map((n) => (
                  <article
                    key={n.id}
                    className={`client-notif-item ${n.read ? "read" : "unread"}`}
                  >
                    <div className="client-notif-left">
                      <div
                        className={`client-notif-bullet ${
                          n.read ? "read" : "unread"
                        }`}
                      >
                        {n.read ? <Circle size={14} /> : <DotIcon />}
                      </div>

                      <div className="client-notif-content">
                        <div className="client-notif-headline">
                          <strong>{n.title}</strong>
                          <span className="client-notif-datetime">
                            {formatDateTime(n.datetime)}
                          </span>
                        </div>

                        <div className="client-notif-message">
                          {n.message}
                        </div>
                      </div>
                    </div>

                    <div className="client-notif-controls">
                      {!n.read ? (
                        <button
                          className="client-notif-control"
                          onClick={() => markAsRead(n.id)}
                        >
                          <CheckCircle size={16} />
                        </button>
                      ) : (
                        <button
                          className="client-notif-control"
                          onClick={() => markAsUnread(n.id)}
                        >
                          <Circle size={16} />
                        </button>
                      )}

                      <button
                        className="client-notif-control danger"
                        onClick={() => deleteNotification(n.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </article>
                ))}
              </div>

              {/* Pagination */}
              <div className="client-notif-footer">
                <button
                  className="client-notif-page-btn"
                  disabled={page === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  <ChevronLeft size={16} />
                </button>

                <span className="client-notif-page-indicator">
                  Page {page} / {totalPages}
                </span>

                <button
                  className="client-notif-page-btn"
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
}
