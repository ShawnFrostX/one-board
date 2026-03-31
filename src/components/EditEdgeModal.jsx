import { useState, useEffect, useRef } from "react";

export default function EditEdgeModal({
  edge,
  sourceNode,
  targetNode,
  onClose,
  onUpdate,
}) {
  const [label, setLabel] = useState(edge.label || "");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(edge.id, label);
    onClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <div
      onClick={onClose}
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
        zIndex: 10000,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#1a1a1a",
          borderRadius: "12px",
          padding: "24px",
          maxWidth: "500px",
          width: "90%",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
          border: "1px solid #333",
        }}
      >
        <h2
          style={{
            fontSize: "20px",
            fontWeight: "600",
            marginBottom: "20px",
            color: "#fff",
          }}
        >
          Edit Connection Label
        </h2>

        <div
          style={{
            fontSize: "14px",
            marginBottom: "16px",
            padding: "12px",
            background: "#2a2a2a",
            borderRadius: "8px",
            border: "1px solid #333",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span style={{ color: "#667eea", fontWeight: "600" }}>
            {sourceNode?.data.label || "Unknown"}
          </span>
          <span style={{ color: "#888" }}>→</span>
          <span style={{ color: "#764ba2", fontWeight: "600" }}>
            {targetNode?.data.label || "Unknown"}
          </span>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontSize: "13px",
                color: "#aaa",
                fontWeight: "500",
              }}
            >
              Connection Label
            </label>
            <input
              ref={inputRef}
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g., works with, leads to, depends on..."
              style={{
                width: "100%",
                padding: "12px",
                background: "#2a2a2a",
                border: "1px solid #444",
                borderRadius: "8px",
                color: "#fff",
                fontSize: "14px",
                outline: "none",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "flex-end",
            }}
          >
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: "10px 20px",
                background: "transparent",
                color: "#888",
                border: "1px solid #444",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                padding: "10px 20px",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              Save Label
            </button>
          </div>
        </form>

        <div
          style={{
            marginTop: "16px",
            fontSize: "11px",
            color: "#666",
            textAlign: "center",
          }}
        >
          Press Enter to save • Press Escape to cancel
        </div>
      </div>
    </div>
  );
}
