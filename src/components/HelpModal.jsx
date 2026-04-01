export default function HelpModal({ onClose }) {
  const sectionStyle = {
    marginBottom: '20px',
  };

  const titleStyle = {
    fontSize: '16px',
    fontWeight: '700',
    color: '#8b4513',
    marginBottom: '12px',
    borderBottom: '2px solid #8b4513',
    paddingBottom: '8px',
  };

  const itemStyle = {
    marginBottom: '10px',
    fontSize: '13px',
    color: '#2a2a2a',
    lineHeight: '1.5',
  };

  const keyStyle = {
    background: '#d4c4a8',
    padding: '2px 6px',
    borderRadius: '3px',
    fontFamily: 'monospace',
    fontWeight: '600',
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          zIndex: 2999,
        }}
      />

      {/* Modal */}
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: '#e8dcc8',
          padding: '32px',
          borderRadius: '2px',
          width: '90%',
          maxWidth: '700px',
          maxHeight: '90vh',
          overflowY: 'auto',
          border: '3px solid #8b4513',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
          zIndex: 3000,
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
          borderBottom: '3px solid #8b4513',
          paddingBottom: '16px',
        }}>
          <h1 style={{
            fontSize: '28px',
            fontWeight: '700',
            color: '#8b4513',
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}>
            <span>📋</span> One Board Help
          </h1>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '28px',
              cursor: 'pointer',
              padding: '0',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ✕
          </button>
        </div>

        {/* Features Section */}
        <div style={sectionStyle}>
          <h2 style={titleStyle}>🎯 Features</h2>
          <div style={itemStyle}>
            <strong>Node Management:</strong> Create, edit, and organize different types of nodes (Default, Person, Task, Note, Event)
          </div>
          <div style={itemStyle}>
            <strong>Edge Connections:</strong> Connect nodes with customizable arrows, labels, and directions
          </div>
          <div style={itemStyle}>
            <strong>Waypoints:</strong> Create connection points on edges for more complex relationship mapping
          </div>
          <div style={itemStyle}>
            <strong>Node Images:</strong> Add images to nodes (URLs or local uploads, max 1MB)
          </div>
          <div style={itemStyle}>
            <strong>Notes & Labels:</strong> Add private notes and descriptions to nodes and edges
          </div>
          <div style={itemStyle}>
            <strong>Search:</strong> Find nodes quickly by name, type, or description
          </div>
          <div style={itemStyle}>
            <strong>Import/Export:</strong> Save your boards as JSON files and import them later
          </div>
          <div style={itemStyle}>
            <strong>Undo/Redo:</strong> Full history support for all changes
          </div>
        </div>

        {/* Node Types Section */}
        <div style={sectionStyle}>
          <h2 style={titleStyle}>📌 Node Types</h2>
          <div style={itemStyle}>
            <strong>Default:</strong> General purpose node (cream with gray border)
          </div>
          <div style={itemStyle}>
            <strong>Person:</strong> For individuals involved in your investigation (tan)
          </div>
          <div style={itemStyle}>
            <strong>Task:</strong> For action items and to-dos (light cream with brown)
          </div>
          <div style={itemStyle}>
            <strong>Note:</strong> For quick notes and reminders (pale yellow)
          </div>
          <div style={itemStyle}>
            <strong>Event:</strong> For important events and milestones (burlap with red)
          </div>
        </div>

        {/* Keyboard Shortcuts */}
        <div style={sectionStyle}>
          <h2 style={titleStyle}>⌨️ Keyboard Shortcuts</h2>
          <div style={itemStyle}>
            <span style={keyStyle}>Ctrl/Cmd + Z</span> - Undo last action
          </div>
          <div style={itemStyle}>
            <span style={keyStyle}>Ctrl/Cmd + Shift + Z</span> or <span style={keyStyle}>Ctrl/Cmd + Y</span> - Redo
          </div>
          <div style={itemStyle}>
            <span style={keyStyle}>Ctrl/Cmd + F</span> - Open search panel
          </div>
          <div style={itemStyle}>
            <span style={keyStyle}>Ctrl/Cmd + D</span> - Duplicate selected node
          </div>
          <div style={itemStyle}>
            <span style={keyStyle}>Delete</span> or <span style={keyStyle}>Backspace</span> - Delete selected node/edge
          </div>
          <div style={itemStyle}>
            <span style={keyStyle}>Shift + Drag</span> - Select multiple nodes at once (box select)
          </div>
          <div style={itemStyle}>
            <span style={keyStyle}>Double-click Node</span> - Edit node label and properties
          </div>
          <div style={itemStyle}>
            <span style={keyStyle}>Double-click Edge</span> - Edit edge label
          </div>
          <div style={itemStyle}>
            <span style={keyStyle}>Right-click Edge</span> - Open edge context menu
          </div>
          <div style={itemStyle}>
            <span style={keyStyle}>Escape</span> - Close dialogs and clear selection
          </div>
        </div>

        {/* UI Guide */}
        <div style={sectionStyle}>
          <h2 style={titleStyle}>🎨 Using the Interface</h2>
          <div style={itemStyle}>
            <strong>Creating Nodes:</strong> Enter a name in the topbar and select a type, then click "Add Node" or press Enter
          </div>
          <div style={itemStyle}>
            <strong>Connecting Nodes:</strong> Click and drag from one node to another to create an edge
          </div>
          <div style={itemStyle}>
            <strong>Editing Nodes:</strong> Double-click a node to edit its label, description, image, and notes
          </div>
          <div style={itemStyle}>
            <strong>Creating Waypoints:</strong> Right-click an edge and select "Create Waypoint" to add a connection point
          </div>
          <div style={itemStyle}>
            <strong>Changing Arrow Style:</strong> Right-click an edge to change arrow direction (to target, to source, bidirectional, or none)
          </div>
          <div style={itemStyle}>
            <strong>Searching Nodes:</strong> Press Ctrl/Cmd+F to search nodes by name, type, or description
          </div>
          <div style={itemStyle}>
            <strong>Node Colors:</strong> Each node type has a default color, but you can customize via the edit dialog
          </div>
          <div style={itemStyle}>
            <strong>Zoom & Pan:</strong> Use mouse wheel to zoom, drag to pan around the board
          </div>
        </div>

        {/* Tips Section */}
        <div style={sectionStyle}>
          <h2 style={titleStyle}>💡 Tips & Tricks</h2>
          <div style={itemStyle}>
            ✓ Use waypoints to create complex multi-point connections on a single edge
          </div>
          <div style={itemStyle}>
            ✓ Add images to nodes to make them more recognizable at a glance
          </div>
          <div style={itemStyle}>
            ✓ Use private notes for sensitive information or investigation details
          </div>
          <div style={itemStyle}>
            ✓ Export your board regularly to backup your work
          </div>
          <div style={itemStyle}>
            ✓ Different node types help organize your investigation visually
          </div>
          <div style={itemStyle}>
            ✓ Red string connections (edges) connect your investigation elements
          </div>
        </div>

        {/* Close Button */}
        <div style={{
          marginTop: '24px',
          display: 'flex',
          justifyContent: 'center',
        }}>
          <button
            onClick={onClose}
            style={{
              padding: '12px 32px',
              background: '#8b4513',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              transition: 'all 0.2s',
            }}
            onMouseOver={(e) => e.target.style.background = '#6b3410'}
            onMouseOut={(e) => e.target.style.background = '#8b4513'}
          >
            Got it! 👍
          </button>
        </div>
      </div>
    </>
  );
}
