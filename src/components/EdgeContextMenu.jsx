export default function EdgeContextMenu({
  x,
  y,
  onClose,
  onEdit,
  onDelete,
  onChangeArrow,
  currentArrowType = "target",
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

  const arrowOptions = [
    { type: "target", label: "Arrow to Target", icon: "→" },
    { type: "source", label: "Arrow to Source", icon: "←" },
    { type: "both", label: "Bidirectional", icon: "↔" },
    { type: "none", label: "No Arrows", icon: "—" },
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
          minWidth: "200px",
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
            ✏️ Edit Label
          </button>
        )}

        {/* Arrow Direction Options */}
        {onChangeArrow && (
          <>
            <div
              style={{
                padding: "8px 12px",
                fontSize: "12px",
                color: "#888",
                fontWeight: "600",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Arrow Direction
            </div>
            {arrowOptions.map((option) => (
              <button
                key={option.type}
                onClick={() => {
                  onChangeArrow(option.type);
                  onClose();
                }}
                style={{
                  ...buttonStyle,
                  paddingLeft: "20px",
                  color: currentArrowType === option.type ? "#667eea" : "#fff",
                  fontWeight:
                    currentArrowType === option.type ? "600" : "normal",
                }}
                onMouseOver={(e) => (e.target.style.background = "#3a3a3a")}
                onMouseOut={(e) => (e.target.style.background = "transparent")}
              >
                <span style={{ fontSize: "16px", minWidth: "20px" }}>
                  {option.icon}
                </span>
                {option.label}
                {currentArrowType === option.type && (
                  <span style={{ marginLeft: "auto", fontSize: "12px" }}>
                    ✓
                  </span>
                )}
              </button>
            ))}
          </>
        )}

        <div style={{ height: "1px", background: "#444", margin: "4px 0" }} />

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
            🗑️ Delete Connection
          </button>
        )}
      </div>
    </>
  );
}
