import { ReactFlow, Background, Controls, useReactFlow } from '@xyflow/react';
import CustomNode from './CustomNode';

const nodeTypes = {
  custom: CustomNode,
};

// Detective board background image (realistic cork board texture)
const detectiveBoardUrl = 'https://img.freepik.com/premium-photo/abstract-chalk-rubbed-out-blackboard-chalkboard-texture-clean-school-board-background-copy-space-add-text-message-backdrop-education-concepts_43429-4491.jpg?semt=ais_hybrid&w=740&q=80';

function FlowCanvasInner({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  backgroundType,
  customBgUrl,
  onPaneDoubleClick,
  onNodeContextMenu,
  onEdgeContextMenu,
  onEdgeDoubleClick,
  reactFlowInstance
}) {
  const reactFlow = useReactFlow();
  const { screenToFlowPosition, setCenter } = reactFlow;

  // Expose ReactFlow instance to parent
  if (reactFlowInstance) {
    reactFlowInstance.current = reactFlow;
  }

  const handlePaneClick = (event) => {
    if (event.detail === 2) {
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      onPaneDoubleClick(position);
    }
  };

  const handleEdgeDoubleClick = (event, edge) => {
    event.stopPropagation();
    if (onEdgeDoubleClick) {
      onEdgeDoubleClick(edge);
    }
  };

  const renderBackground = () => {
    if (backgroundType === 'detective' || (backgroundType === 'custom' && customBgUrl)) {
      const imageUrl = backgroundType === 'detective' ? detectiveBoardUrl : customBgUrl;
      return (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'repeat',
          opacity: 0.25,
          pointerEvents: 'none',
          zIndex: 0
        }} />
      );
    }

    // For dots and grid patterns
    const variant = backgroundType === 'grid' ? 'lines' : 'dots';
    return <Background color="#aaa" gap={16} variant={variant} />;
  };

  const defaultEdgeOptions = {
    animated: false,
    style: { stroke: '#667eea', strokeWidth: 2 },
    labelStyle: {
      fill: '#fff',
      fontWeight: 600,
      fontSize: 12,
      background: '#1a1a1a',
      padding: '4px 8px',
      borderRadius: '4px'
    },
    labelBgStyle: {
      fill: '#1a1a1a',
      fillOpacity: 0.9,
      rx: 4,
      ry: 4
    },
    labelBgPadding: [8, 4],
    labelBgBorderRadius: 4,
  };

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      defaultEdgeOptions={defaultEdgeOptions}
      onPaneClick={handlePaneClick}
      onEdgeDoubleClick={handleEdgeDoubleClick}
      onNodeContextMenu={onNodeContextMenu}
      onEdgeContextMenu={onEdgeContextMenu}
      zoomOnDoubleClick={false}
      fitView
      deleteKeyCode="Delete"
      multiSelectionKeyCode="Shift"
    >
      {renderBackground()}
      <Controls />
    </ReactFlow>
  );
}

export default function FlowCanvas(props) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <FlowCanvasInner {...props} />
    </div>
  );
}
