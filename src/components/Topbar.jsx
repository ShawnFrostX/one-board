export default function Topbar({ nodeLabel, setNodeLabel, addNode, clearAll, nodes, edges, nodeType, setNodeType, exportData, importData }) {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '16px 24px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      zIndex: 10,
      flexWrap: 'wrap'
    }}>
      {/* Logo/Title */}
      <div style={{
        fontSize: '18px',
        fontWeight: 'bold',
        color: 'white',
        marginRight: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <span style={{ fontSize: '24px' }}>📋</span>
        <span>One Board</span>
      </div>

      {/* Node Type Selector */}
      <select
        value={nodeType}
        onChange={(e) => setNodeType(e.target.value)}
        style={{
          padding: '10px 16px',
          border: 'none',
          borderRadius: '8px',
          fontSize: '14px',
          outline: 'none',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          color: '#333',
          cursor: 'pointer',
          fontWeight: '500'
        }}
      >
        <option value="default">Default</option>
        <option value="person">Person</option>
        <option value="task">Task</option>
        <option value="note">Note</option>
        <option value="event">Event</option>
      </select>

      {/* Input for node label */}
      <input
        type="text"
        placeholder="Node name..."
        value={nodeLabel}
        onChange={(e) => setNodeLabel(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && addNode()}
        style={{
          padding: '10px 16px',
          border: 'none',
          borderRadius: '8px',
          fontSize: '14px',
          outline: 'none',
          minWidth: '200px',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          color: '#333',
          transition: 'all 0.2s'
        }}
      />

      {/* Add Node Button */}
      <button
        onClick={addNode}
        style={{
          padding: '10px 24px',
          background: 'white',
          color: '#667eea',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '600',
          transition: 'all 0.2s',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
        }}
        onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
        onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
      >
        ➕ Add Node
      </button>

      {/* Stats */}
      <div style={{
        padding: '8px 16px',
        background: 'rgba(255, 255, 255, 0.2)',
        borderRadius: '8px',
        color: 'white',
        fontSize: '13px',
        fontWeight: '500',
        marginLeft: 'auto'
      }}>
        Nodes: {nodes.length} | Edges: {edges.length}
      </div>

      {/* Export Button */}
      <button
        onClick={exportData}
        title="Export to JSON file"
        style={{
          padding: '10px 16px',
          background: 'rgba(255, 255, 255, 0.2)',
          color: 'white',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '500',
          transition: 'all 0.2s'
        }}
        onMouseOver={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.3)'}
        onMouseOut={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
      >
        💾 Export
      </button>

      {/* Import Button */}
      <button
        onClick={importData}
        title="Import from JSON file"
        style={{
          padding: '10px 16px',
          background: 'rgba(255, 255, 255, 0.2)',
          color: 'white',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '500',
          transition: 'all 0.2s'
        }}
        onMouseOver={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.3)'}
        onMouseOut={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
      >
        📂 Import
      </button>

      {/* Clear Button */}
      <button
        onClick={clearAll}
        style={{
          padding: '10px 16px',
          background: 'rgba(255, 255, 255, 0.2)',
          color: 'white',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '500',
          transition: 'all 0.2s'
        }}
        onMouseOver={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.3)'}
        onMouseOut={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
      >
        🗑️ Clear
      </button>
    </div>
  );
}
