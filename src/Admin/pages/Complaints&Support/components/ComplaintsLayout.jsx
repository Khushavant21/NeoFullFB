import React, { useState, useEffect, useMemo, useRef } from "react";
import "./ComplaintsLayout.css";
import {
  Users, FolderOpen, AlertCircle, CheckCircle, Search, ArrowLeft,
  Eye, Send, Paperclip, Mail, MessageSquare, Clock
} from "lucide-react";

/* ===================== DATA GENERATOR ===================== */
const generateTickets = () => {
  const types = ["Complaint", "Feedback", "Suggestion"];
  const categories = ["Account Issues", "Transaction Problems", "Loan Services", "Internet Banking", "Other"];
  const priorities = ["High", "Medium", "Low"];
  const statuses = ["Open", "Closed", "Pending"];

  const data = [];
  for (let i = 1; i <= 15; i++) {
    data.push({
      id: `TKT-${1000 + i}`,
      username: `User ${i}`,
      type: types[Math.floor(Math.random() * types.length)],
      category: categories[Math.floor(Math.random() * categories.length)],
      priority: priorities[Math.floor(Math.random() * priorities.length)],
      subject: `Issue regarding ${categories[Math.floor(Math.random() * categories.length)]}`,
      description: `I am facing an issue with my transaction. Please resolve this immediately as it is urgent.`,
      customerEmail: `user${i}@gmail.com`,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      lastUpdate: new Date().toLocaleDateString(),
      // Mock History for Chat/Email
      chatHistory: [
        { sender: "bot", text: "Hello! How can I help?", time: "10:00 AM" },
        { sender: "user", text: "My transaction failed.", time: "10:05 AM" }
      ],
      emailHistory: [
        { sender: "user", subject: "Urgent Help", body: "Money deducted but not credited.", date: "Yesterday" }
      ]
    });
  }
  return data;
};

/* ===================== NEW TICKET DETAILS (CHAT/EMAIL TABS) ===================== */
const TicketDetails = ({ ticket, goBack, onUpdate }) => {
  const [activeTab, setActiveTab] = useState("chat"); // 'chat' or 'email'
  
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState(ticket.chatHistory);
  
  const [emailSubject, setEmailSubject] = useState(`Re: ${ticket.subject}`);
  const [emailBody, setEmailBody] = useState("");
  const [emails, setEmails] = useState(ticket.emailHistory);

  const scrollRef = useRef(null);

  // Auto Scroll
  useEffect(() => {
    if(scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, emails, activeTab]);

  const handleSendChat = () => {
    if(!chatInput.trim()) return;
    setMessages([...messages, { sender: 'agent', text: chatInput, time: 'Just Now' }]);
    setChatInput("");
  };

  const handleSendEmail = () => {
    if(!emailBody.trim()) return;
    setEmails([...emails, { sender: 'agent', subject: emailSubject, body: emailBody, date: 'Just Now' }]);
    setEmailBody("");
    alert("Email Sent!");
  };

  return (
    <div className="crm-details-view">
      {/* Header */}
      <div className="crm-details-header">
        <button className="crm-back-btn" onClick={goBack}>
          <ArrowLeft size={16} /> Back to Queue
        </button>
        <div className="crm-header-title">
            <h3>Ticket #{ticket.id}</h3>
            <span className={`crm-status-badge ${ticket.status.toLowerCase()}`}>{ticket.status}</span>
        </div>
      </div>

      <div className="crm-split-layout">
        
        {/* --- LEFT SIDEBAR: INFO --- */}
        <aside className="crm-sidebar">
           <div className="crm-section">
             <label>Customer Info</label>
             <div className="crm-val bold">{ticket.username}</div>
             <div className="crm-val link">{ticket.customerEmail}</div>
           </div>

           <div className="crm-section">
             <label>Ticket Details</label>
             <div className="crm-val"><strong>Type:</strong> {ticket.type}</div>
             <div className="crm-val"><strong>Category:</strong> {ticket.category}</div>
             <div className="crm-val" style={{marginTop:'5px'}}>
                <strong>Priority:</strong> 
                <span className={`crm-prio-badge ${ticket.priority.toLowerCase()}`}>{ticket.priority}</span>
             </div>
           </div>

           <div className="crm-section">
             <label>Description</label>
             <div className="crm-desc-box">{ticket.description}</div>
           </div>

           <div className="crm-section">
              <label>Action</label>
              <button className="crm-close-btn" onClick={() => onUpdate({ ...ticket, status: "Closed" })}>
                 <CheckCircle size={14}/> Mark as Closed
              </button>
           </div>
        </aside>

        {/* --- RIGHT MAIN: TABS (Chat & Email) --- */}
        <main className="crm-main-area">
           <div className="crm-tabs-nav">
              <button 
                className={`crm-tab-btn ${activeTab === 'chat' ? 'active' : ''}`}
                onClick={() => setActiveTab('chat')}
              >
                <MessageSquare size={16} /> Live Chat
              </button>
              <button 
                className={`crm-tab-btn ${activeTab === 'email' ? 'active' : ''}`}
                onClick={() => setActiveTab('email')}
              >
                <Mail size={16} /> Email Support
              </button>
           </div>

           <div className="crm-tab-content">
              {/* CHAT UI */}
              {activeTab === 'chat' && (
                <div className="crm-chat-ui">
                   <div className="crm-msg-list" ref={scrollRef}>
                      {messages.map((m, i) => (
                        <div key={i} className={`crm-bubble ${m.sender}`}>
                           <div className="crm-bubble-meta">
                              <span>{m.sender === 'agent' ? 'You' : m.sender === 'bot' ? 'Bot' : ticket.username}</span>
                              <small>{m.time}</small>
                           </div>
                           <div>{m.text}</div>
                        </div>
                      ))}
                   </div>
                   <div className="crm-input-bar">
                      <input 
                        value={chatInput} 
                        onChange={(e)=>setChatInput(e.target.value)} 
                        placeholder="Type a message..."
                        onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
                      />
                      <button onClick={handleSendChat}><Send size={16}/></button>
                   </div>
                </div>
              )}

              {/* EMAIL UI */}
              {activeTab === 'email' && (
                <div className="crm-email-ui">
                   <div className="crm-email-list" ref={scrollRef}>
                      {emails.map((e, i) => (
                        <div key={i} className={`crm-email-card ${e.sender}`}>
                           <div className="crm-email-head">
                              <strong>{e.sender === 'agent' ? 'Support Team' : ticket.username}</strong>
                              <span>{e.date}</span>
                           </div>
                           <div className="crm-email-sub">{e.subject}</div>
                           <div className="crm-email-body">{e.body}</div>
                        </div>
                      ))}
                   </div>
                   <div className="crm-email-compose">
                      <h4>Reply to Customer</h4>
                      <input 
                        value={emailSubject} 
                        onChange={(e)=>setEmailSubject(e.target.value)}
                        placeholder="Subject" 
                      />
                      <textarea 
                        value={emailBody}
                        onChange={(e)=>setEmailBody(e.target.value)}
                        placeholder="Write email body..."
                      ></textarea>
                      <button className="crm-send-email-btn" onClick={handleSendEmail}>
                        Send Email
                      </button>
                   </div>
                </div>
              )}
           </div>
        </main>
      </div>
    </div>
  );
};

/* ===================== OLD FRONT VIEW COMPONENTS ===================== */

const TicketQueue = ({ tickets, onView }) => {
  if (tickets.length === 0) return <div className="no-data">No tickets found.</div>;

  return (
    <div className="tq-table-container">
      <table className="tq-table">
        <thead>
          <tr>
            <th>Ticket ID</th>
            <th>User</th>
            <th>Subject</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Last Update</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id}>
              <td>{ticket.id}</td>
              <td>{ticket.username}</td>
              <td>{ticket.subject}</td>
              <td>
                <span className={`tq-badge ${ticket.priority === "High" ? "danger" : ticket.priority === "Medium" ? "warning" : "success"}`}>
                  {ticket.priority}
                </span>
              </td>
              <td>
                <span className={`tq-badge ${ticket.status === "Closed" ? "success" : "neutral"}`}>
                  {ticket.status}
                </span>
              </td>
              <td>{ticket.lastUpdate}</td>
              <td>
                <button className="tq-btn view-btn" onClick={() => onView(ticket)}>
                  <Eye size={14} /> View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

/* ===================== MAIN COMPONENT (OLD DASHBOARD LAYOUT) ===================== */
const PAGE_SIZE = 10;

export default function AdminComplaints() {
  const [activeTab, setActiveTab] = useState("queue");
  const [search, setSearch] = useState("");
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setTickets(generateTickets());
  }, []);

  /* Summary Cards Logic */
  const summaryData = useMemo(() => ({
      total: tickets.length,
      open: tickets.filter((t) => t.status === "Open").length,
      highPriority: tickets.filter((t) => t.priority === "High").length,
      closed: tickets.filter((t) => t.status === "Closed").length,
    }), [tickets]
  );

  /* Filter Logic */
  const filteredTickets = useMemo(() => {
    let result = tickets;
    if (activeTab === "escalations") result = result.filter((t) => t.priority === "High");
    if (search) {
      const term = search.toLowerCase();
      result = result.filter((t) =>
          t.id.toLowerCase().includes(term) || t.username.toLowerCase().includes(term)
      );
    }
    return result;
  }, [tickets, search, activeTab]);

  const pagedTickets = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredTickets.slice(start, start + PAGE_SIZE);
  }, [filteredTickets, currentPage]);

  const totalPages = Math.ceil(filteredTickets.length / PAGE_SIZE);

  const handleUpdateTicket = (updatedTicket) => {
    setTickets((prev) => prev.map((t) => (t.id === updatedTicket.id ? updatedTicket : t)));
    setSelectedTicket(updatedTicket);
  };

  const summaryCards = [
    { title: "Total Tickets", value: summaryData.total, icon: <Users size={24} /> },
    { title: "Open Tickets", value: summaryData.open, icon: <FolderOpen size={24} /> },
    { title: "High Priority", value: summaryData.highPriority, icon: <AlertCircle size={24} /> },
    { title: "Closed Tickets", value: summaryData.closed, icon: <CheckCircle size={24} /> },
  ];

  return (
    <div className="clx-app">
      <div className="clx-header">
        <div className="clx-heading">
          <h2>Complaints & Support</h2>
          <p>View and resolve customer complaints.</p>
        </div>
        <div className="clx-tabs">
          <button className={`clx-tab-btn ${activeTab === "queue" && !selectedTicket ? "active" : ""}`} onClick={() => { setSelectedTicket(null); setActiveTab("queue"); }}>
            Ticket Queue
          </button>
          <button className={`clx-tab-btn ${activeTab === "escalations" && !selectedTicket ? "active" : ""}`} onClick={() => { setSelectedTicket(null); setActiveTab("escalations"); }}>
            Escalations
          </button>
        </div>
      </div>

      <main className="clx-container">
        {/* Only show Summary Cards if NO ticket is selected */}
        {!selectedTicket && (
          <div className="clx-summary-cards">
            {summaryCards.map((card, idx) => (
              <div key={idx} className="clx-card">
                <div className="clx-card-body">
                  <div>
                    <h6>{card.title}</h6>
                    <h2>{card.value}</h2>
                  </div>
                  <div className="clx-card-icon">{card.icon}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="clx-table-card">
          {!selectedTicket && (
            <div className="clx-card-header">
              <div className="clx-search-wrapper">
                <Search className="clx-search-icon" size={18} />
                <input
                  type="text"
                  placeholder="Search by Ticket ID / Username..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="clx-search-input"
                />
              </div>
            </div>
          )}

          {/* RENDER LOGIC */}
          {selectedTicket ? (
            <TicketDetails
              ticket={selectedTicket}
              goBack={() => setSelectedTicket(null)}
              onUpdate={handleUpdateTicket}
            />
          ) : (
            <TicketQueue tickets={pagedTickets} onView={setSelectedTicket} />
          )}

          {/* Pagination */}
          {!selectedTicket && totalPages > 1 && (
            <div className="cl-pagination">
              <button disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)}>Prev</button>
              <span>{currentPage} / {totalPages}</span>
              <button disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => p + 1)}>Next</button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}