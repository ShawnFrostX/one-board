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
  const { screenToFlowPosition } = reactFlow;

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
    if (backgroundType === 'custom' && customBgUrl) {
      return (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${customBgUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'repeat',
          opacity: 0.5,
          pointerEvents: 'none',
          zIndex: 0
        }} />
      );
    }

    // For dots and grid patterns
    if (backgroundType === 'dots' || backgroundType === 'grid') {
      const variant = backgroundType === 'grid' ? 'lines' : 'dots';
      return <Background color="#8b5a2b" gap={16} variant={variant} />;
    }

    return null; // No background for 'none' or unrecognized types
  };

  const processedEdges = edges.map(edge => {
    const arrowType = edge.data?.arrowType || 'target';
    const isSelected = edge.selected;

    const pinMarker = isSelected ? 'url(#pin-marker-selected)' : 'url(#pin-marker)';

    const edgeStyle = {
      stroke: isSelected ? '#f97316' : '#dc2626',
      strokeWidth: isSelected ? 3.5 : 2.5,
      strokeLinecap: 'round'
    };

    switch (arrowType) {
      case 'source':
        edgeStyle.markerStart = pinMarker;
        break;
      case 'target':
        edgeStyle.markerEnd = pinMarker;
        break;
      case 'both':
        edgeStyle.markerStart = pinMarker;
        edgeStyle.markerEnd = pinMarker;
        break;
      case 'none':
        break;
    }

    const {markerStart, markerEnd, style, ...restEdge} = edge;

    return {
      ...restEdge,
      style: edgeStyle
    };
  });

  const defaultEdgeOptions = {
    animated: false,
    style: { stroke: '#dc2626', strokeWidth: 2.5, strokeLinecap: 'round' },
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
      edges={processedEdges}
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
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <marker
            id="pin-marker"
            viewBox ="0 0 20 20"
            markerWidth="15"
            markerHeight="15"
            refX="8"
            refY="10"
            orient="auto"
          >
            <circle cx="10" cy="10" r="5" fill="#dc2626" stroke="#8b0000" strokeWidth="1.5" />
            <circle cx="10" cy="10" r="2" fill="#b91c1c" />
          </marker>
          <marker
            id="pin-marker-selected"
            viewBox ="0 0 20 20"
            markerWidth="17"
            markerHeight="17"
            refX="8"
            refY="10"
            orient="auto"
          >
            <circle cx="10" cy="10" r="5" fill="#f97316" stroke="#ea580c" strokeWidth="2" />
            <circle cx="10" cy="10" r="2.5" fill="#fb923c" />
          </marker>
        </defs>
      </svg>

      {renderBackground()}
      <Controls />
    </ReactFlow>
  );
}

export default function FlowCanvas(props) {
  const { backgroundType } = props;
  const isCorkBoard = backgroundType === 'corkboard' || (!backgroundType);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <style>{`
        .react-flow__edges {
          z-index:1000 !important;
        }
        .react-flow__edge path {
          pointer-events: stroke;
        }
        ${isCorkBoard ? `
        .react-flow__pane {
          background-color: #c19a6b !important;
          background-image: 
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(139,90,43,0.03) 2px,
              rgba(139,90,43,0.03) 4px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 2px,
              rgba(139,90,43,0.03) 2px,
              rgba(139,90,43,0.03) 4px
            ),
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 3px,
              rgba(160,110,60,0.02) 3px,
              rgba(160,110,60,0.02) 6px
            ),
            repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 3px,
              rgba(160,110,60,0.02) 3px,
              rgba(160,110,60,0.02) 6px
            );
        }
        ` : ''}
      `}</style>
      <FlowCanvasInner {...props} />
    </div>
  );
}
