export default function ContextMenu({
  x,
  y,
  onClose,
  onEdit,
  onDuplicate,
  onDelete,
  onChangeColor,
  onChangeType,
  currentType = "default",
  editLabel = "Edit Node",
  deleteLabel = "Delete",
}) {
  const buttonStyle = {
    width: "100%",
    padding: "10px 12px",
    background: "transparent",
    color: "#fff",
    border: "none",
    textAlign: "left",
    cursor: "pointer",
    fontSize: "14px",
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  };

  const nodeTypes = [
    { type: "default", label: "Default", icon: "⚪" },
    { type: "person", label: "Person", icon: "👤" },
    { type: "task", label: "Task", icon: "✓" },
    { type: "note", label: "Note", icon: "📝" },
    { type: "event", label: "Event", icon: "📅" },
  ];

  return (
    <>
      {/* Backdrop to close menu */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1999,
        }}
      />

      {/* Context Menu */}
      <div
        style={{
          position: "fixed",
          top: `${y}px`,
          left: `${x}px`,
          background: "#2a2a2a",
          border: "1px solid #444",
          borderRadius: "8px",
          padding: "8px",
          zIndex: 2000,
          minWidth: "180px",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
        }}
      >
        {onEdit && (
          <button
            onClick={onEdit}
            style={buttonStyle}
            onMouseOver={(e) => (e.target.style.background = "#3a3a3a")}
            onMouseOut={(e) => (e.target.style.background = "transparent")}
          >
            ✏️ {editLabel}
          </button>
        )}

        {onDuplicate && (
          <button
            onClick={onDuplicate}
            style={buttonStyle}
            onMouseOver={(e) => (e.target.style.background = "#3a3a3a")}
            onMouseOut={(e) => (e.target.style.background = "transparent")}
          >
            📋 Duplicate
          </button>
        )}

        {onChangeColor && (
          <button
            onClick={onChangeColor}
            style={buttonStyle}
            onMouseOver={(e) => (e.target.style.background = "#3a3a3a")}
            onMouseOut={(e) => (e.target.style.background = "transparent")}
          >
            🎨 Change Color
          </button>
        )}

        {/* Node Type Options */}
        {onChangeType && (
          <>
            <div
              style={{
                padding: "8px 12px",
                fontSize: "12px",
                color: "#888",
                fontWeight: "600",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                marginTop: "4px",
              }}
            >
              Change Type
            </div>
            {nodeTypes.map((nodeType) => (
              <button
                key={nodeType.type}
                onClick={() => {
                  onChangeType(nodeType.type);
                  onClose();
                }}
                style={{
                  ...buttonStyle,
                  paddingLeft: "20px",
                  color: currentType === nodeType.type ? "#667eea" : "#fff",
                  fontWeight: currentType === nodeType.type ? "600" : "normal",
                }}
                onMouseOver={(e) => (e.target.style.background = "#3a3a3a")}
                onMouseOut={(e) => (e.target.style.background = "transparent")}
              >
                <span style={{ fontSize: "16px", minWidth: "20px" }}>
                  {nodeType.icon}
                </span>
                {nodeType.label}
                {currentType === nodeType.type && (
                  <span style={{ marginLeft: "auto", fontSize: "12px" }}>
                    ✓
                  </span>
                )}
              </button>
            ))}
          </>
        )}

        {onDelete &&
          (onEdit || onDuplicate || onChangeColor || onChangeType) && (
            <div
              style={{ height: "1px", background: "#444", margin: "4px 0" }}
            />
          )}

        {onDelete && (
          <button
            onClick={onDelete}
            style={{
              ...buttonStyle,
              color: "#ff4444",
            }}
            onMouseOver={(e) => (e.target.style.background = "#3a3a3a")}
            onMouseOut={(e) => (e.target.style.background = "transparent")}
          >
            🗑️ {deleteLabel}
          </button>
        )}
      </div>
    </>
  );
}
