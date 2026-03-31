export default function ImageViewer({ imageUrl, nodeName, onClose }) {
  if (!imageUrl) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0, 0, 0, 0.9)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 3000,
        cursor: "zoom-out",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          maxWidth: "90vw",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "-50px",
            right: "0",
            background: "rgba(255, 255, 255, 0.1)",
            border: "2px solid rgba(255, 255, 255, 0.3)",
            color: "white",
            fontSize: "24px",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s",
          }}
          onMouseOver={(e) => {
            e.target.style.background = "rgba(255, 255, 255, 0.2)";
            e.target.style.borderColor = "rgba(255, 255, 255, 0.5)";
          }}
          onMouseOut={(e) => {
            e.target.style.background = "rgba(255, 255, 255, 0.1)";
            e.target.style.borderColor = "rgba(255, 255, 255, 0.3)";
          }}
        >
          ✕
        </button>

        {/* Node Name */}
        {nodeName && (
          <div
            style={{
              position: "absolute",
              top: "-50px",
              left: "0",
              background: "rgba(0, 0, 0, 0.8)",
              color: "white",
              padding: "8px 16px",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "600",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            {nodeName}
          </div>
        )}

        {/* Image */}
        <img
          src={imageUrl}
          alt={nodeName || "Enlarged view"}
          style={{
            maxWidth: "90vw",
            maxHeight: "90vh",
            objectFit: "contain",
            borderRadius: "12px",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)",
            border: "2px solid rgba(255, 255, 255, 0.1)",
            cursor: "default",
          }}
          onClick={(e) => e.stopPropagation()}
        />

        {/* Instructions */}
        <div
          style={{
            position: "absolute",
            bottom: "-40px",
            left: "50%",
            transform: "translateX(-50%)",
            color: "rgba(255, 255, 255, 0.7)",
            fontSize: "13px",
            whiteSpace: "nowrap",
            textAlign: "center",
          }}
        >
          Click outside or press{" "}
          <kbd
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              padding: "2px 8px",
              borderRadius: "4px",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            Esc
          </kbd>{" "}
          to close
        </div>
      </div>
    </div>
  );
}
