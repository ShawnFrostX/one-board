import { useState } from "react";

export default function EditNodeModal({ node, onClose, onUpdate, onDelete }) {
  const [imageUrl, setImageUrl] = useState(node?.data.imageUrl || "");
  const [imagePreview, setImagePreview] = useState(node?.data.imageUrl || "");

  if (!node) return null;

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (limit to 1MB to avoid localStorage issues)
      if (file.size > 1024 * 1024) {
        alert("Image size should be less than 1MB");
        return;
      }

      // Check file type
      if (!file.type.startsWith("image/")) {
        alert("Please upload an image file");
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Image = event.target.result;
        setImageUrl(base64Image);
        setImagePreview(base64Image);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClearImage = () => {
    setImageUrl("");
    setImagePreview("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updates = {
      label: formData.get("label"),
      description: formData.get("description"),
      imageUrl: imageUrl, // Use state value instead of form value
      notes: formData.get("notes"),
      customColor: formData.get("customColor"),
    };
    onUpdate(node.id, updates);
    onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0, 0, 0, 0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2000,
      }}
    >
      <div
        style={{
          background: "#1a1a1a",
          padding: "24px",
          borderRadius: "12px",
          width: "90%",
          maxWidth: "500px",
          maxHeight: "90vh",
          overflowY: "auto",
          border: "1px solid #333",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h2
            style={{
              fontSize: "20px",
              margin: 0,
              color: "#fff",
            }}
          >
            Edit Node
          </h2>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "#fff",
              fontSize: "24px",
              cursor: "pointer",
              padding: "0",
              width: "30px",
              height: "30px",
            }}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "16px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                color: "#fff",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              Label
            </label>
            <input
              type="text"
              name="label"
              defaultValue={node.data.label}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #444",
                fontSize: "14px",
                background: "#2a2a2a",
                color: "#fff",
                outline: "none",
              }}
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                color: "#fff",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              Image (80x80px recommended)
            </label>

            {/* Image Preview */}
            {imagePreview && (
              <div
                style={{
                  marginBottom: "12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    border: "2px solid #444",
                  }}
                  onError={() => setImagePreview("")}
                />
                <button
                  type="button"
                  onClick={handleClearImage}
                  style={{
                    padding: "6px 12px",
                    background: "#dc3545",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "12px",
                    fontWeight: "500",
                  }}
                >
                  Remove Image
                </button>
              </div>
            )}

            {/* File Upload */}
            <div style={{ marginBottom: "8px" }}>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                style={{ display: "none" }}
                id="imageUpload"
              />
              <label
                htmlFor="imageUpload"
                style={{
                  display: "inline-block",
                  padding: "10px 16px",
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "white",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "13px",
                  fontWeight: "600",
                  marginRight: "8px",
                }}
              >
                📁 Upload Local Image
              </label>
              <span style={{ fontSize: "12px", color: "#888" }}>Max 1MB</span>
            </div>

            {/* URL Input */}
            <div
              style={{ fontSize: "12px", color: "#888", marginBottom: "8px" }}
            >
              Or enter image URL:
            </div>
            <input
              type="text"
              name="imageUrl"
              value={imageUrl}
              onChange={(e) => {
                setImageUrl(e.target.value);
                setImagePreview(e.target.value);
              }}
              placeholder="https://example.com/image.jpg"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #444",
                fontSize: "14px",
                background: "#2a2a2a",
                color: "#fff",
                outline: "none",
              }}
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                color: "#fff",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              Description
            </label>
            <textarea
              name="description"
              defaultValue={node.data.description || ""}
              rows={3}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #444",
                fontSize: "14px",
                background: "#2a2a2a",
                color: "#fff",
                outline: "none",
                resize: "vertical",
              }}
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                color: "#fff",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              📝 Private Notes (visible on hover)
            </label>
            <textarea
              name="notes"
              defaultValue={node.data.notes || ""}
              placeholder="Add private notes, reminders, or additional context..."
              rows={3}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #444",
                fontSize: "14px",
                background: "#2a2a2a",
                color: "#fff",
                outline: "none",
                resize: "vertical",
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                color: "#fff",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              🎨 Custom Color (optional)
            </label>
            <input
              type="color"
              name="customColor"
              defaultValue={node.data.customColor || "#667eea"}
              style={{
                width: "100%",
                height: "40px",
                padding: "4px",
                borderRadius: "8px",
                border: "1px solid #444",
                background: "#2a2a2a",
                cursor: "pointer",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              gap: "12px",
            }}
          >
            <button
              type="submit"
              style={{
                flex: 1,
                padding: "12px",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => {
                if (confirm("Delete this node?")) {
                  onDelete(node.id);
                  onClose();
                }
              }}
              style={{
                padding: "12px 20px",
                background: "#dc3545",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
