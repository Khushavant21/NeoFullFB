import React, { useState } from "react";
import "./UserProfileModal.css";

export default function UserProfileModal({ user, onClose, onUpdate }) {
  const [editableUser, setEditableUser] = useState(user);
  const [previewDoc, setPreviewDoc] = useState(null);

  const handleChange = (field, value) =>
    setEditableUser((prev) => ({ ...prev, [field]: value }));

  const handleSaveChanges = () => {
    if (onUpdate) onUpdate(editableUser);
    onClose();
  };

  // ✅ Fetch full details on mount
  React.useEffect(() => {
    if (user?.email) {
      const token = localStorage.getItem("adminToken");
      fetch(`http://localhost:8080/api/admin/user-details/${user.email}`, {
        headers: { "Authorization": `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => {
          // Merge User and ClientProfile data
          const fullData = { ...data.user, ...data.clientProfile };
          const timestamp = Date.now();

          // Map User/Profile fields to UI expected fields
          const mappedData = {
            ...fullData,
            aadhaar: data.user?.aadhaar || fullData.aadhaar,
            aadhaarFront: fullData.aadhaarPhotoUrl ? `${fullData.aadhaarPhotoUrl}?t=${timestamp}` : null,
            signature: fullData.signatureUrl ? `${fullData.signatureUrl}?t=${timestamp}` : null,
            photo: (fullData.profileImageUrl || fullData.photo) ? `${(fullData.profileImageUrl || fullData.photo)}?t=${timestamp}` : null
          };

          setEditableUser(prev => ({ ...prev, ...mappedData }));
        })
        .catch(err => console.error("Failed to fetch user details", err));
    }
  }, [user]);

  const docsArray = [
    { title: "Aadhaar", imgs: [editableUser.aadhaarFront, editableUser.aadhaarBack] },
    { title: "PAN Card", img: editableUser.panCard },
    { title: "Signature", img: editableUser.signature },
    ...(editableUser.documents || []).map((doc) => ({ title: doc.name, img: doc.url })),
  ];

  if (!user) return null;

  return (
    <div className="upm-modal-overlay" onClick={onClose}>
      <div className="upm-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <header className="upm-modal-header">
          <h2>
            <span className="upm-icon-person"></span>
            {editableUser.name} – Profile
          </h2>
          <button className="upm-close-btn" onClick={onClose}>×</button>
        </header>

        {/* Body */}
        <div className="upm-modal-body">
          {/* Left Column */}
          <div className="upm-profile-column">
            <div
              className="upm-profile-card"
              onClick={() => setPreviewDoc({ title: "Profile Photo", img: editableUser.photo })}
            >
              <div className="upm-photo">
                <img src={editableUser.photo} alt="Profile" />
              </div>
              <h3>{editableUser.name}</h3>
              <p>{editableUser.email}</p>
              <p>{editableUser.phone}</p>
              <div className="upm-status">
                <span>Status: {editableUser.status}</span>
                <span>Frozen: {editableUser.frozen ? "Yes" : "No"}</span>
              </div>
            </div>

            {/* KYC Documents */}
            <div className="upm-documents">
              <h3>KYC Documents</h3>
              <div className="upm-docs-grid">
                {docsArray.map((doc, idx) => (
                  <div
                    key={idx}
                    className="upm-doc-card"
                    onClick={() => (doc.img || doc.imgs) && setPreviewDoc(doc)}
                  >
                    {doc.imgs ? (
                      <div className="upm-docs-multiple">
                        {doc.imgs.map((i, index) => (
                          <img key={index} src={i} alt={doc.title} />
                        ))}
                      </div>
                    ) : doc.img ? (
                      <img src={doc.img} alt={doc.title} />
                    ) : (
                      <div className="upm-doc-placeholder">{doc.title} not uploaded</div>
                    )}
                    <div className="upm-doc-title">{doc.title}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="upm-details-card">
            {[
              { label: "Full Name", field: "name", editable: true },
              { label: "Email Address", field: "email", editable: true },
              { label: "Phone Number", field: "phone", editable: true },
              { label: "Date of Birth", field: "dob", editable: true },
              { label: "Gender", field: "gender", editable: true },
              { label: "Address", field: "address", editable: true },
              { label: "Aadhaar Number", field: "aadhaar", editable: true },
              { label: "PAN Number", field: "pan", editable: true },
              { label: "Account Number", field: "accountNumber", editable: true },
              { label: "Account Type", field: "type", editable: true },
              { label: "Balance", field: "balance", editable: true },
            ].map((item, idx) => (
              <div className="upm-form-group" key={idx}>
                <label>{item.label}</label>
                <input
                  type="text"
                  value={editableUser[item.field] || ""}
                  readOnly={!item.editable}
                  onChange={(e) => item.editable && handleChange(item.field, e.target.value)}
                />
              </div>
            ))}

            <div className="upm-actions">
              <button onClick={handleSaveChanges} className="upm-btn-warning">Save Changes</button>
              <button onClick={onClose} className="upm-btn-secondary">Close</button>
            </div>
          </div>
        </div>

        {/* Preview Modal */}
        {previewDoc && (
          <div className="upm-preview-overlay" onClick={() => setPreviewDoc(null)}>
            <div className="upm-preview-modal" onClick={(e) => e.stopPropagation()}>
              <h4>{previewDoc.title} Preview</h4>

              <div className="upm-preview-content">
                {previewDoc.imgs ? (
                  <div className="upm-preview-images-large">
                    {previewDoc.imgs.filter(img => img).map((i, idx) => ( // Filter nulls
                      <img key={idx} src={i} alt={previewDoc.title} />
                    ))}
                    {previewDoc.imgs.filter(img => img).length === 0 && <p>No images available</p>}
                  </div>
                ) : (
                  <img src={previewDoc.img} alt={previewDoc.title} className="upm-single-preview" />
                )}
              </div>

              <div className="upm-preview-actions">
                <button
                  onClick={() => setPreviewDoc(null)}
                  className="upm-btn-secondary"
                >
                  Close
                </button>

                {previewDoc.img && (
                  <a
                    href={previewDoc.img}
                    download={`${previewDoc.title}.jpg`}
                    className="upm-btn-secondary upm-btn-download"
                  >
                    Download
                  </a>
                )}

                {previewDoc.imgs && previewDoc.imgs.length > 0 && (
                  <a
                    href={previewDoc.imgs[0]}
                    download={`${previewDoc.title}-1.jpg`}
                    className="upm-btn-secondary upm-btn-download"
                  >
                    Download
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
