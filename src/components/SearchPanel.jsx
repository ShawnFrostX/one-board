import { useState } from 'react';

export default function SearchPanel({ nodes, onNodeSelect, onClose }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNodes = nodes.filter(node =>
    !node.data.isWaypoint && (
      node.data.label?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      node.data.type?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      node.data.description?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div style={{
      position: 'fixed',
      top: '70px',
      left: '50%',
      transform: 'translateX(-50%)',
      background: '#e8dcc8',
      border: '2px solid #3d3d3d',
      borderRadius: '2px',
      padding: '16px',
      zIndex: 2000,
      minWidth: '400px',
      maxWidth: '500px',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '12px'
      }}>
        <h3 style={{ color: '#1a1a1a', margin: 0, fontSize: '16px', fontWeight: '600' }}>
          🔍 Search Nodes
        </h3>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            color: '#1a1a1a',
            fontSize: '20px',
            cursor: 'pointer',
            padding: '0 4px'
          }}
        >
          ✕
        </button>
      </div>

      <input
        type="text"
        placeholder="Search by name, type, or description..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        autoFocus
        style={{
          width: '100%',
          padding: '10px',
          background: '#f5f5f0',
          border: '1px solid #999',
          borderRadius: '6px',
          color: '#1a1a1a',
          fontSize: '14px',
          outline: 'none',
          marginBottom: '12px'
        }}
      />

      <div style={{
        maxHeight: '300px',
        overflowY: 'auto'
      }}>
        {filteredNodes.length === 0 ? (
          <p style={{ color: '#888', textAlign: 'center', padding: '20px' }}>
            No nodes found
          </p>
        ) : (
          filteredNodes.map((node) => (
            <div
              key={node.id}
              onClick={() => {
                onNodeSelect(node);
                onClose();
              }}
              style={{
                padding: '12px',
                background: '#f0e6d2',
                border: '1px solid #999',
                borderRadius: '6px',
                marginBottom: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = '#deb887';
                e.currentTarget.style.borderColor = '#666';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = '#f0e6d2';
                e.currentTarget.style.borderColor = '#999';
              }}
            >
              <div style={{
                fontSize: '14px',
                fontWeight: '600',
                color: '#1a1a1a',
                marginBottom: '4px'
              }}>
                {node.data.label}
              </div>
              <div style={{
                fontSize: '12px',
                color: '#666',
                textTransform: 'uppercase'
              }}>
                {node.data.type || 'default'}
              </div>
              {node.data.description && (
                <div style={{
                  fontSize: '12px',
                  color: '#555',
                  marginTop: '4px'
                }}>
                  {node.data.description.substring(0, 60)}...
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <div style={{
        marginTop: '12px',
        padding: '8px',
        background: '#2a2a2a',
        borderRadius: '6px',
        fontSize: '12px',
        color: '#888',
        textAlign: 'center'
      }}>
        Press <kbd style={{ background: '#3a3a3a', padding: '2px 6px', borderRadius: '3px' }}>Esc</kbd> to close •
        Found {filteredNodes.length} of {nodes.length} nodes
      </div>
    </div>
  );
}
