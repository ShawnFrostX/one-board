import { Handle, Position } from "@xyflow/react";
import { useState } from "react";

const nodeStyles = {
  default: {
    background: "#e8dcc8",
    border: "2px solid #3d3d3d",
    color: "#1a1a1a",
  },
  person: {
    background: "#d4c4a8",
    border: "2px solid #4a4a4a",
    color: "#1a1a1a",
  },
  task: {
    background: "#f0e6d2",
    border: "2px solid #8b4513",
    color: "#2d1810",
  },
  note: {
    background: "#fffacd",
    border: "2px solid #6b6b6b",
    color: "#2a2a2a",
  },
  event: {
    background: "#deb887",
    border: "2px solid #8b3a3a",
    color: "#3d2817",
  },
};

export default function CustomNode({ data, id, selected }) {
  const [showNotes, setShowNotes] = useState(false);
  const nodeType = data.type || "default";
  const hasCustomColor = data.customColor;
  const isWaypoint = data.isWaypoint;

  // Render waypoint as a small badge with label
  if (isWaypoint) {
    return (
      <div
        onDoubleClick={() => data.onEdit && data.onEdit(id)}
        style={{
          padding: "6px 12px",
          borderRadius: "12px",
          background: "#d4c4a8",
          border: selected ? "2px solid #8b3a3a" : "2px solid #666",
          cursor: "pointer",
          boxShadow: selected ? "0 0 0 2px rgba(139, 58, 58, 0.3)" : "0 2px 4px rgba(0, 0, 0, 0.2)",
          transition: "all 0.2s",
          position: "relative",
          fontSize: "11px",
          fontWeight: "600",
          color: "#2a2a2a",
          whiteSpace: "nowrap",
          minWidth: "30px",
          textAlign: "center",
        }}
      >
        {data.label}
        <Handle
          type="target"
          position={Position.Top}
          id="top-target"
          style={{ width: "8px", height: "8px", background: "#dc2626", opacity: selected ? 1 : 0 }}
        />
        <Handle
          type="source"
          position={Position.Top}
          id="top-source"
          style={{ width: "8px", height: "8px", background: "#dc2626", opacity: selected ? 1 : 0 }}
        />
        <Handle
          type="target"
          position={Position.Right}
          id="right-target"
          style={{ width: "8px", height: "8px", background: "#dc2626", opacity: selected ? 1 : 0 }}
        />
        <Handle
          type="source"
          position={Position.Right}
          id="right-source"
          style={{ width: "8px", height: "8px", background: "#dc2626", opacity: selected ? 1 : 0 }}
        />
        <Handle
          type="target"
          position={Position.Bottom}
          id="bottom-target"
          style={{ width: "8px", height: "8px", background: "#dc2626", opacity: selected ? 1 : 0 }}
        />
        <Handle
          type="source"
          position={Position.Bottom}
          id="bottom-source"
          style={{ width: "8px", height: "8px", background: "#dc2626", opacity: selected ? 1 : 0 }}
        />
        <Handle
          type="target"
          position={Position.Left}
          id="left-target"
          style={{ width: "8px", height: "8px", background: "#dc2626", opacity: selected ? 1 : 0 }}
        />
        <Handle
          type="source"
          position={Position.Left}
          id="left-source"
          style={{ width: "8px", height: "8px", background: "#dc2626", opacity: selected ? 1 : 0 }}
        />
      </div>
    );
  }

  // Normal node rendering

  // Use custom color if available, otherwise use type style
  const baseStyle = nodeStyles[nodeType] || nodeStyles.default;
  const style = hasCustomColor
    ? {
        background: data.customColor,
        border: `2px solid ${data.customColor}`,
        color: "#fff",
      }
    : baseStyle;

  const handleStyle = {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    border: "2px solid #8b0000",
    background: "#dc2626",
    opacity: selected ? 1 : 0,
    transition: "opacity 0.2s",
  };

  return (
    <div
      onDoubleClick={() => data.onEdit && data.onEdit(id)}
      onMouseEnter={() => setShowNotes(true)}
      onMouseLeave={() => setShowNotes(false)}
      style={{
        padding: "12px",
        borderRadius: "2px",
        minWidth: "140px",
        maxWidth: "200px",
        boxShadow: selected
          ? "0 0 0 2px #8b4513, 0 8px 16px rgba(139, 69, 19, 0.2)"
          : "0 4px 12px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
        cursor: "pointer",
        transition: "transform 0.2s, box-shadow 0.2s",
        position: "relative",
        border: "1px solid rgba(100, 100, 100, 0.4)",
        background: "#e8dcc8",
        ...style,
      }}
    >
      {/* Handles on all 4 sides - both source and target */}
      <Handle
        type="target"
        position={Position.Top}
        id="top-target"
        style={handleStyle}
      />
      <Handle
        type="source"
        position={Position.Top}
        id="top-source"
        style={handleStyle}
      />

      <Handle
        type="target"
        position={Position.Right}
        id="right-target"
        style={handleStyle}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right-source"
        style={handleStyle}
      />

      <Handle
        type="target"
        position={Position.Bottom}
        id="bottom-target"
        style={handleStyle}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom-source"
        style={handleStyle}
      />

      <Handle
        type="target"
        position={Position.Left}
        id="left-target"
        style={handleStyle}
      />
      <Handle
        type="source"
        position={Position.Left}
        id="left-source"
        style={handleStyle}
      />

      {/* Image */}
      {data.imageUrl && (
        <div
          style={{
            marginBottom: "8px",
            display: "flex",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <img
            src={data.imageUrl}
            alt={data.label}
            onClick={(e) => {
              e.stopPropagation();
              if (data.onImageClick) {
                data.onImageClick(id);
              }
            }}
            style={{
              width: "80px",
              height: "80px",
              objectFit: "cover",
              borderRadius: "8px",
              border: "2px solid rgba(255, 255, 255, 0.3)",
              cursor: "zoom-in",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseOver={(e) => {
              e.target.style.transform = "scale(1.05)";
              e.target.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.3)";
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "none";
            }}
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
          {/* Zoom indicator */}
          <div
            style={{
              position: "absolute",
              top: "4px",
              right: "4px",
              background: "rgba(0, 0, 0, 0.6)",
              color: "white",
              borderRadius: "50%",
              width: "20px",
              height: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
              pointerEvents: "none",
            }}
          >
            🔍
          </div>
        </div>
      )}

      {/* Type Badge */}
      <div
        style={{
          fontSize: "10px",
          opacity: 0.8,
          textTransform: "uppercase",
          letterSpacing: "0.5px",
          marginBottom: "4px",
          fontWeight: "600",
        }}
      >
        {nodeType}
      </div>

      {/* Label */}
      <div
        style={{
          fontSize: "14px",
          fontWeight: "bold",
          marginBottom: data.description ? "6px" : "0",
        }}
      >
        {data.label}
      </div>

      {/* Description */}
      {data.description && (
        <div
          style={{
            fontSize: "11px",
            opacity: 0.9,
            lineHeight: "1.4",
            marginTop: "6px",
          }}
        >
          {data.description.length > 60
            ? data.description.substring(0, 60) + "..."
            : data.description}
        </div>
      )}

      {/* Notes Indicator */}
      {data.notes && (
        <div
          style={{
            position: "absolute",
            top: "8px",
            right: "8px",
            fontSize: "14px",
            opacity: 0.7,
          }}
        >
          📝
        </div>
      )}

      {/* Notes Tooltip */}
      {data.notes && showNotes && (
        <div
          style={{
            position: "absolute",
            bottom: "100%",
            left: "50%",
            transform: "translateX(-50%)",
            marginBottom: "8px",
            padding: "8px 12px",
            background: "#d4c4a8",
            border: "1px solid #666",
            borderRadius: "2px",
            color: "#1a1a1a",
            fontSize: "12px",
            maxWidth: "250px",
            whiteSpace: "pre-wrap",
            zIndex: 1000,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
            pointerEvents: "none",
          }}
        >
          <div
            style={{ fontWeight: "600", marginBottom: "4px", color: "#8b4513" }}
          >
            📝 Notes:
          </div>
          {data.notes}
          <div
            style={{
              position: "absolute",
              bottom: "-6px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "12px",
              height: "12px",
              background: "#d4c4a8",
              border: "1px solid #666",
              borderTop: "none",
              borderLeft: "none",
              transform: "translateX(-50%) rotate(45deg)",
            }}
          />
        </div>
      )}
    </div>
  );
}
