import { useState } from "react";

export default function Sidebar({
  isOpen,
  toggleSidebar,
  edges,
  nodes,
  onDeleteEdge,
  onUpdateEdge,
  onUpdateEdgeArrow,
  backgroundType,
  setBackgroundType,
  customBgUrl,
  setCustomBgUrl,
  projectName,
  setProjectName,
  projects,
  currentProjectId,
  onLoadProject,
  onDeleteProject,
  onCreateNewProject,
  autoSave,
  setAutoSave,
}) {
  const [activeTab, setActiveTab] = useState("connections");
  const [editingEdgeId, setEditingEdgeId] = useState(null);

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        style={{
          position: "fixed",
          right: isOpen ? "320px" : "20px",
          top: "80px",
          zIndex: 1000,
          padding: "12px 16px",
          background: "linear-gradient(135deg, #8b5a2b 0%, #6b4423 100%)",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: "600",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          transition: "right 0.3s ease",
        }}
      >
        {isOpen ? "✕ Close" : "☰ Menu"}
      </button>

      {/* Sidebar */}
      <div
        style={{
          position: "fixed",
          right: isOpen ? "0" : "-320px",
          top: "0",
          width: "320px",
          height: "100vh",
          background: "#1a1a1a",
          borderLeft: "1px solid #333",
          padding: "80px 20px 20px 20px",
          overflowY: "auto",
          transition: "right 0.3s ease",
          zIndex: 999,
          color: "#fff",
        }}
      >
        {/* Tabs */}
        <div
          style={{
            display: "flex",
            gap: "6px",
            marginBottom: "20px",
            borderBottom: "1px solid #333",
            paddingBottom: "10px",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() => setActiveTab("connections")}
            style={{
              flex: 1,
              minWidth: "80px",
              padding: "8px",
              background:
                activeTab === "connections"
                  ? "linear-gradient(135deg, #8b5a2b 0%, #6b4423 100%)"
                  : "transparent",
              color: "white",
              border: activeTab === "connections" ? "none" : "1px solid #444",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: "600",
            }}
          >
            🔗
          </button>
          <button
            onClick={() => setActiveTab("projects")}
            style={{
              flex: 1,
              minWidth: "80px",
              padding: "8px",
              background:
                activeTab === "projects"
                  ? "linear-gradient(135deg, #8b5a2b 0%, #6b4423 100%)"
                  : "transparent",
              color: "white",
              border: activeTab === "projects" ? "none" : "1px solid #444",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: "600",
            }}
          >
            📁
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            style={{
              flex: 1,
              minWidth: "80px",
              padding: "8px",
              background:
                activeTab === "settings"
                  ? "linear-gradient(135deg, #8b5a2b 0%, #6b4423 100%)"
                  : "transparent",
              color: "white",
              border: activeTab === "settings" ? "none" : "1px solid #444",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: "600",
            }}
          >
            ⚙️
          </button>
        </div>

        {/* Connections Tab */}
        {activeTab === "connections" && (
          <>
            <h3
              style={{
                fontSize: "18px",
                marginBottom: "16px",
                color: "#fff",
                fontWeight: "600",
              }}
            >
              Connections ({edges.length})
            </h3>

            {edges.length === 0 ? (
              <p
                style={{
                  color: "#888",
                  fontSize: "14px",
                  textAlign: "center",
                  marginTop: "40px",
                }}
              >
                No connections yet. Connect nodes by dragging from one handle to
                another.
              </p>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                {edges.map((edge) => {
                  const sourceNode = nodes.find((n) => n.id === edge.source);
                  const targetNode = nodes.find((n) => n.id === edge.target);
                  const isEditing = editingEdgeId === edge.id;

                  return (
                    <div
                      key={edge.id}
                      style={{
                        background: "#2a2a2a",
                        padding: "12px",
                        borderRadius: "8px",
                        border: "1px solid #333",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "13px",
                          marginBottom: "8px",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <span
                          style={{
                            color: "#c19a6b",
                            fontWeight: "600",
                          }}
                        >
                          {sourceNode?.data.label || "Unknown"}
                        </span>
                        <span style={{ color: "#888", fontSize: "16px" }}>
                          {(() => {
                            const arrowType = edge.data?.arrowType || "target";
                            switch (arrowType) {
                              case "source":
                                return "←";
                              case "both":
                                return "↔";
                              case "none":
                                return "—";
                              default:
                                return "→";
                            }
                          })()}
                        </span>
                        <span
                          style={{
                            color: "#764ba2",
                            fontWeight: "600",
                          }}
                        >
                          {targetNode?.data.label || "Unknown"}
                        </span>
                      </div>

                      {/* Edge Label */}
                      <div style={{ marginBottom: "8px" }}>
                        <label
                          style={{
                            display: "block",
                            fontSize: "11px",
                            color: "#888",
                            marginBottom: "4px",
                            fontWeight: "500",
                          }}
                        >
                          Connection Label
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            defaultValue={edge.label || ""}
                            placeholder="e.g., works with, leads to..."
                            autoFocus
                            onBlur={(e) => {
                              onUpdateEdge(edge.id, e.target.value);
                              setEditingEdgeId(null);
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                onUpdateEdge(edge.id, e.target.value);
                                setEditingEdgeId(null);
                              }
                              if (e.key === "Escape") {
                                setEditingEdgeId(null);
                              }
                            }}
                            style={{
                              width: "100%",
                              padding: "6px 8px",
                              background: "#1a1a1a",
                              border: "1px solid #c19a6b",
                              borderRadius: "4px",
                              color: "#fff",
                              fontSize: "12px",
                              outline: "none",
                            }}
                          />
                        ) : (
                          <div
                            onClick={() => setEditingEdgeId(edge.id)}
                            style={{
                              padding: "6px 8px",
                              background: "#1a1a1a",
                              border: "1px solid #444",
                              borderRadius: "4px",
                              color: edge.label ? "#fff" : "#666",
                              fontSize: "12px",
                              cursor: "pointer",
                              minHeight: "28px",
                              fontStyle: edge.label ? "normal" : "italic",
                            }}
                          >
                            {edge.label || "Click to add label..."}
                          </div>
                        )}
                      </div>

                      {/* Arrow Direction */}
                      <div style={{ marginBottom: "8px" }}>
                        <label
                          style={{
                            display: "block",
                            fontSize: "11px",
                            color: "#888",
                            marginBottom: "4px",
                            fontWeight: "500",
                          }}
                        >
                          Arrow Direction
                        </label>
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: "4px",
                          }}
                        >
                          {[
                            { type: "target", label: "To Target", icon: "→" },
                            { type: "source", label: "To Source", icon: "←" },
                            { type: "both", label: "Both", icon: "↔" },
                            { type: "none", label: "None", icon: "—" },
                          ].map((option) => {
                            const isActive =
                              (edge.data?.arrowType || "target") ===
                              option.type;
                            return (
                              <button
                                key={option.type}
                                onClick={() =>
                                  onUpdateEdgeArrow(edge.id, option.type)
                                }
                                style={{
                                  padding: "6px 8px",
                                  background: isActive ? "#c19a6b" : "#1a1a1a",
                                  color: isActive ? "#fff" : "#aaa",
                                  border: `1px solid ${isActive ? "#c19a6b" : "#444"}`,
                                  borderRadius: "4px",
                                  cursor: "pointer",
                                  fontSize: "11px",
                                  fontWeight: isActive ? "600" : "normal",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  gap: "4px",
                                }}
                              >
                                <span style={{ fontSize: "14px" }}>
                                  {option.icon}
                                </span>
                                {option.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <button
                        onClick={() => onDeleteEdge(edge.id)}
                        style={{
                          width: "100%",
                          padding: "6px",
                          background: "#dc3545",
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontSize: "12px",
                          fontWeight: "500",
                        }}
                      >
                        Delete Connection
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        {/* Projects Tab */}
        {activeTab === "projects" && (
          <>
            <h3
              style={{
                fontSize: "18px",
                marginBottom: "16px",
                color: "#fff",
                fontWeight: "600",
              }}
            >
              📁 Projects
            </h3>

            {/* Current Project Name */}
            <div style={{ marginBottom: "16px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  color: "#aaa",
                  fontSize: "12px",
                  fontWeight: "500",
                }}
              >
                Current Project Name
              </label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Untitled Project"
                style={{
                  width: "100%",
                  padding: "10px",
                  background: "#2a2a2a",
                  border: "1px solid #444",
                  borderRadius: "6px",
                  color: "#fff",
                  fontSize: "14px",
                  fontWeight: "600",
                  outline: "none",
                }}
              />
            </div>

            {/* Auto-save Toggle */}
            <div
              style={{
                padding: "12px",
                background: "#2a2a2a",
                border: "1px solid #333",
                borderRadius: "8px",
                marginBottom: "16px",
              }}
            >
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                }}
              >
                <span style={{ fontSize: "14px", fontWeight: "500" }}>
                  💾 Auto-save
                </span>
                <input
                  type="checkbox"
                  checked={autoSave}
                  onChange={(e) => setAutoSave(e.target.checked)}
                  style={{
                    width: "40px",
                    height: "20px",
                    cursor: "pointer",
                  }}
                />
              </label>
              <div
                style={{ fontSize: "11px", color: "#888", marginTop: "8px" }}
              >
                {autoSave
                  ? "Changes are saved automatically"
                  : "Manual save only"}
              </div>
            </div>

            {/* Create New Project Button */}
            <button
              onClick={onCreateNewProject}
              style={{
                width: "100%",
                padding: "12px",
                background: "linear-gradient(135deg, #8b5a2b 0%, #6b4423 100%)",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "600",
                marginBottom: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              ➕ Create New Project
            </button>

            {/* Projects List */}
            <h4
              style={{
                fontSize: "14px",
                marginBottom: "12px",
                color: "#aaa",
                fontWeight: "600",
              }}
            >
              Saved Projects ({projects.length})
            </h4>

            {projects.length === 0 ? (
              <p
                style={{
                  color: "#666",
                  fontSize: "13px",
                  textAlign: "center",
                  padding: "20px",
                }}
              >
                No saved projects yet
              </p>
            ) : (
              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                {projects.map((project) => (
                  <div
                    key={project.id}
                    style={{
                      background:
                        project.id === currentProjectId ? "#3a3a3a" : "#2a2a2a",
                      border: `1px solid ${project.id === currentProjectId ? "#c19a6b" : "#333"}`,
                      borderRadius: "6px",
                      padding: "10px",
                      cursor: "pointer",
                    }}
                    onClick={() => onLoadProject(project.id)}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontSize: "14px",
                            fontWeight: "600",
                            color: "#fff",
                          }}
                        >
                          {project.name || "Untitled"}
                        </div>
                        <div
                          style={{
                            fontSize: "11px",
                            color: "#888",
                            marginTop: "2px",
                          }}
                        >
                          {project.nodes?.length || 0} nodes • Updated{" "}
                          {new Date(project.updatedAt).toLocaleDateString()}
                        </div>
                      </div>
                      {project.id !== currentProjectId && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (
                              confirm(`Delete "${project.name || "Untitled"}"?`)
                            ) {
                              onDeleteProject(project.id);
                            }
                          }}
                          style={{
                            padding: "4px 8px",
                            background: "transparent",
                            color: "#ff4444",
                            border: "1px solid #ff4444",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontSize: "11px",
                          }}
                        >
                          🗑️
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <>
            <h3
              style={{
                fontSize: "18px",
                marginBottom: "16px",
                color: "#fff",
                fontWeight: "600",
              }}
            >
              ⚙️ Background Settings
            </h3>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              {/* Cork Board Option */}
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "12px",
                  background:
                    backgroundType === 'corkboard' ? "#2a2a2a" : "#1a1a1a",
                  border: `2px solid ${backgroundType === 'corkboard' ? "#c19a6b" : "#333"}`,
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                <input
                  type="radio"
                  name="background"
                  value="corkboard"
                  checked={backgroundType === 'corkboard'}
                  onChange={(e) => setBackgroundType(e.target.value)}
                  style={{ marginRight: "10px", cursor: "pointer" }}
                />
                <span style={{ fontSize: "14px", fontWeight: "500" }}>
                  Cork Board
                </span>
              </label>

              {/* Dots Option */}
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "12px",
                  background: backgroundType === "dots" ? "#2a2a2a" : "#1a1a1a",
                  border: `2px solid ${backgroundType === "dots" ? "#c19a6b" : "#333"}`,
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                <input
                  type="radio"
                  name="background"
                  value="dots"
                  checked={backgroundType === "dots"}
                  onChange={(e) => setBackgroundType(e.target.value)}
                  style={{ marginRight: "10px", cursor: "pointer" }}
                />
                <span style={{ fontSize: "14px", fontWeight: "500" }}>
                  Dots Pattern
                </span>
              </label>

              {/* Grid Option */}
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "12px",
                  background: backgroundType === "grid" ? "#2a2a2a" : "#1a1a1a",
                  border: `2px solid ${backgroundType === "grid" ? "#c19a6b" : "#333"}`,
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                <input
                  type="radio"
                  name="background"
                  value="grid"
                  checked={backgroundType === "grid"}
                  onChange={(e) => setBackgroundType(e.target.value)}
                  style={{ marginRight: "10px", cursor: "pointer" }}
                />
                <span style={{ fontSize: "14px", fontWeight: "500" }}>
                  Grid Pattern
                </span>
              </label>

              {/* Detective Board Option */}
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "12px",
                  background:
                    backgroundType === "detective" ? "#2a2a2a" : "#1a1a1a",
                  border: `2px solid ${backgroundType === "detective" ? "#c19a6b" : "#333"}`,
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                <input
                  type="radio"
                  name="background"
                  value="detective"
                  checked={backgroundType === "detective"}
                  onChange={(e) => setBackgroundType(e.target.value)}
                  style={{ marginRight: "10px", cursor: "pointer" }}
                />
                <span style={{ fontSize: "14px", fontWeight: "500" }}>
                  Black Board
                </span>
              </label>

              {/* Custom Image Option */}
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "12px",
                  background:
                    backgroundType === "custom" ? "#2a2a2a" : "#1a1a1a",
                  border: `2px solid ${backgroundType === "custom" ? "#c19a6b" : "#333"}`,
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                <input
                  type="radio"
                  name="background"
                  value="custom"
                  checked={backgroundType === "custom"}
                  onChange={(e) => setBackgroundType(e.target.value)}
                  style={{ marginRight: "10px", cursor: "pointer" }}
                />
                <span style={{ fontSize: "14px", fontWeight: "500" }}>
                  Custom Image URL
                </span>
              </label>

              {/* Custom URL Input */}
              {backgroundType === "custom" && (
                <input
                  type="text"
                  placeholder="Enter image URL..."
                  value={customBgUrl}
                  onChange={(e) => setCustomBgUrl(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    background: "#2a2a2a",
                    border: "1px solid #444",
                    borderRadius: "6px",
                    color: "#fff",
                    fontSize: "13px",
                    outline: "none",
                  }}
                />
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
