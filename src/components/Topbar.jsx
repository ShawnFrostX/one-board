export default function Topbar({ nodeLabel, setNodeLabel, addNode, clearAll, nodes, edges, nodeType, setNodeType, exportData, importData, onShowHelp }) {
  const buttonStyle = {
    padding: '8px 14px',
    background: 'rgba(255, 255, 255, 0.15)',
    color: 'white',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '500',
    transition: 'all 0.2s',
    whiteSpace: 'nowrap',
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #a7803c 0%, #8d6a3c 100%)',
      padding: '12px 20px',
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      boxShadow: '0 3px 8px rgba(0, 0, 0, 0.15)',
      zIndex: 10,
      flexWrap: 'nowrap',
      borderBottom: '2px solid #8b6f47',
      minHeight: 'auto',
    }}>
      {/* Logo/Title */}
      <div style={{
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#3d2817',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginRight: '8px',
        borderRight: '1px solid rgba(61, 40, 23, 0.2)',
        paddingRight: '16px',
        minWidth: 'fit-content',
      }}>
        <span>One Board</span>
      </div>

      {/* Node Creation Section */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        minWidth: 'fit-content',
      }}>
        <select
          value={nodeType}
          onChange={(e) => setNodeType(e.target.value)}
          style={{
            padding: '8px 10px',
            border: '1px solid #8b6f47',
            borderRadius: '4px',
            fontSize: '12px',
            outline: 'none',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            color: '#3d2817',
            cursor: 'pointer',
            fontWeight: '500',
          }}
        >
          <option value="default" style={{ color: '#1a1a1a' }}>Default</option>
          <option value="person" style={{ color: '#1a1a1a' }}>Person</option>
          <option value="task" style={{ color: '#1a1a1a' }}>Task</option>
          <option value="note" style={{ color: '#1a1a1a' }}>Note</option>
          <option value="event" style={{ color: '#1a1a1a' }}>Event</option>
        </select>

        <input
          type="text"
          placeholder="Node name..."
          value={nodeLabel}
          onChange={(e) => setNodeLabel(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addNode()}
          style={{
            padding: '8px 12px',
            border: '1px solid #8b6f47',
            borderRadius: '4px',
            fontSize: '12px',
            outline: 'none',
            minWidth: '160px',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            color: '#3d2817',
            transition: 'all 0.2s',
          }}
          onFocus={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.9)'}
          onBlur={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.7)'}
        />

        <button
          onClick={addNode}
          style={{
            ...buttonStyle,
            background: 'rgba(139, 69, 19, 0.2)',
            color: '#3d2817',
            border: '1px solid rgba(139, 69, 19, 0.3)',
            fontWeight: '600',
          }}
          onMouseOver={(e) => e.target.style.background = 'rgba(139, 69, 19, 0.3)'}
          onMouseOut={(e) => e.target.style.background = 'rgba(139, 69, 19, 0.2)'}
        >
          ➕ Add
        </button>
      </div>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Stats */}
      <div style={{
        padding: '6px 12px',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '4px',
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: '12px',
        fontWeight: '500',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        minWidth: 'fit-content',
      }}>
        📊 {nodes.length}N • {edges.length}E
      </div>

      {/* Action Buttons */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}>
        <button
          onClick={exportData}
          title="Export to JSON"
          style={buttonStyle}
          onMouseOver={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.25)'}
          onMouseOut={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.15)'}
        >
          💾 Export
        </button>

        <button
          onClick={importData}
          title="Import from JSON"
          style={buttonStyle}
          onMouseOver={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.25)'}
          onMouseOut={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.15)'}
        >
          📂 Import
        </button>

        <button
          onClick={onShowHelp}
          title="Show help"
          style={buttonStyle}
          onMouseOver={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.25)'}
          onMouseOut={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.15)'}
        >
          ❓ Help
        </button>

        <div style={{
          width: '1px',
          height: '20px',
          background: 'rgba(255, 255, 255, 0.2)',
          margin: '0 4px',
        }} />

        <button
          onClick={clearAll}
          style={{
            ...buttonStyle,
            background: 'rgba(255, 87, 87, 0.2)',
            borderColor: 'rgba(255, 87, 87, 0.3)',
          }}
          onMouseOver={(e) => e.target.style.background = 'rgba(255, 87, 87, 0.3)'}
          onMouseOut={(e) => e.target.style.background = 'rgba(255, 87, 87, 0.2)'}
        >
          🗑️ Clear
        </button>
      </div>
    </div>
  );
}
