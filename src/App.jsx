import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { applyNodeChanges, applyEdgeChanges, addEdge, ReactFlowProvider } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import Topbar from './components/Topbar';
import FlowCanvas from './components/FlowCanvas';
import Sidebar from './components/Sidebar';
import EditNodeModal from './components/EditNodeModal';
import EditEdgeModal from './components/EditEdgeModal';
import ContextMenu from './components/ContextMenu';
import EdgeContextMenu from './components/EdgeContextMenu';
import SearchPanel from './components/SearchPanel';
import ImageViewer from './components/ImageViewer';
import HelpModal from './components/HelpModal';

const PROJECTS_KEY = 'one-board-projects';
const SETTINGS_KEY = 'one-board-settings';
const CURRENT_PROJECT_KEY = 'one-board-current-project';

const initialNodes = [
  { id: 'n1', type: 'custom', position: { x: 0, y: 0 }, data: { label: 'Node 1', type: 'default' } },
  { id: 'n2', type: 'custom', position: { x: 0, y: 100 }, data: { label: 'Node 2', type: 'person' } },
];
const initialEdges = [{
  id: 'n1-n2',
  source: 'n1',
  target: 'n2',
  label: '',
  data: { arrowType: 'target' }
}];

// Load projects from localStorage
const loadProjects = () => {
  try {
    const saved = localStorage.getItem(PROJECTS_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('Error loading projects:', error);
  }
  return [{
    id: 'default',
    name: 'My First Board',
    nodes: initialNodes,
    edges: initialEdges,
    createdAt: Date.now(),
    updatedAt: Date.now()
  }];
};

// Load settings from localStorage
const loadSettings = () => {
  try {
    const saved = localStorage.getItem(SETTINGS_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('Error loading settings:', error);
  }
  return { backgroundType: 'corkboard', customBgUrl: '', autoSave: true };
};

// Load current project ID
const loadCurrentProjectId = () => {
  return localStorage.getItem(CURRENT_PROJECT_KEY) || 'default';
};

export default function App() {
  const [projects, setProjects] = useState(loadProjects);
  const [currentProjectId, setCurrentProjectId] = useState(loadCurrentProjectId);
  const [backgroundType, setBackgroundType] = useState(() => loadSettings().backgroundType);
  const [customBgUrl, setCustomBgUrl] = useState(() => loadSettings().customBgUrl);
  const [autoSave, setAutoSave] = useState(() => loadSettings().autoSave);

  const currentProject = projects.find(p => p.id === currentProjectId) || projects[0];

  const [nodes, setNodes] = useState(currentProject.nodes);
  const [edges, setEdges] = useState(currentProject.edges);
  const [projectName, setProjectName] = useState(currentProject.name);
  const [nodeLabel, setNodeLabel] = useState('');
  const [nodeType, setNodeType] = useState('default');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [editingNode, setEditingNode] = useState(null);
  const [editingEdge, setEditingEdge] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);
  const [edgeContextMenu, setEdgeContextMenu] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [selectedNodes, setSelectedNodes] = useState([]);
  const [selectedEdges, setSelectedEdges] = useState([]);
  const [viewingImage, setViewingImage] = useState(null);

  // ReactFlow instance ref for accessing methods
  const reactFlowInstance = useRef(null);

  // History for undo/redo
  const [history, setHistory] = useState([{ nodes: currentProject.nodes, edges: currentProject.edges }]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // Save projects to localStorage
  useEffect(() => {
    if (autoSave) {
      try {
        localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
      } catch (error) {
        console.error('Error saving projects:', error);
      }
    }
  }, [projects, autoSave]);

  // Save settings
  useEffect(() => {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify({ backgroundType, customBgUrl, autoSave }));
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  }, [backgroundType, customBgUrl, autoSave]);

  // Save current project ID
  useEffect(() => {
    localStorage.setItem(CURRENT_PROJECT_KEY, currentProjectId);
  }, [currentProjectId]);

  // Update current project when nodes/edges/name change
  useEffect(() => {
    setProjects(prev => prev.map(p =>
      p.id === currentProjectId
        ? { ...p, nodes, edges, name: projectName, updatedAt: Date.now() }
        : p
    ));
  }, [nodes, edges, projectName, currentProjectId]);

  // Add to history
  const addToHistory = useCallback((newNodes, newEdges) => {
    setHistory(prev => {
      const newHistory = prev.slice(0, historyIndex + 1);
      newHistory.push({ nodes: newNodes, edges: newEdges });
      return newHistory.slice(-50); // Keep last 50 states
    });
    setHistoryIndex(prev => Math.min(prev + 1, 49));
  }, [historyIndex]);

  // Undo
  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setNodes(history[newIndex].nodes);
      setEdges(history[newIndex].edges);
    }
  }, [historyIndex, history]);

  // Redo
  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setNodes(history[newIndex].nodes);
      setEdges(history[newIndex].edges);
    }
  }, [historyIndex, history]);

  const onNodesChange = useCallback(
    (changes) => {
      const newNodes = applyNodeChanges(changes, nodes);
      setNodes(newNodes);

      // Check if this is a selection change
      const selectionChange = changes.some(c => c.type === 'select');
      if (selectionChange) {
        setSelectedNodes(newNodes.filter(n => n.selected).map(n => n.id));
      }
    },
    [nodes],
  );

  const onEdgesChange = useCallback(
    (changes) => {
      const newEdges = applyEdgeChanges(changes, edges);
      setEdges(newEdges);

      const selectionChange = changes.some(c => c.type === 'select');
      if (selectionChange) {
        setSelectedEdges(newEdges.filter(e => e.selected).map(e => e.id));
      }
    },
    [edges],
  );

  const onConnect = useCallback(
    (params) => {
      const newEdges = addEdge({
        ...params,
        label: '',
        data: { arrowType: 'target' } // default: arrow at target
      }, edges);
      setEdges(newEdges);
      addToHistory(nodes, newEdges);
    },
    [edges, nodes, addToHistory],
  );

  const handleEditNode = useCallback((nodeId) => {
    const node = nodes.find(n => n.id === nodeId);
    if (node) {
      setEditingNode(node);
    }
  }, [nodes]);

  const updateNode = useCallback((nodeId, updates) => {
    const newNodes = nodes.map((node) =>
      node.id === nodeId
        ? { ...node, data: { ...node.data, ...updates } }
        : node
    );
    setNodes(newNodes);
    addToHistory(newNodes, edges);
  }, [nodes, edges, addToHistory]);

  const deleteNode = useCallback((nodeId) => {
    const newNodes = nodes.filter((node) => node.id !== nodeId);
    const newEdges = edges.filter((edge) => edge.source !== nodeId && edge.target !== nodeId);
    setNodes(newNodes);
    setEdges(newEdges);
    setSelectedNodes([]);
    setSelectedEdges([]);
    addToHistory(newNodes, newEdges);
  }, [nodes, edges, addToHistory]);

  const deleteEdge = useCallback((edgeId) => {
    const edgeToDelete = edges.find(e => e.id === edgeId);
    if (!edgeToDelete) return;

    let newEdges = [...edges];
    let newNodes = [...nodes];

    // Check if this edge connects to a waypoint
    const sourceIsWaypoint = nodes.find(n => n.id === edgeToDelete.source)?.data.isWaypoint;
    const targetIsWaypoint = nodes.find(n => n.id === edgeToDelete.target)?.data.isWaypoint;

    // If target is a waypoint, also delete the waypoint and its outgoing edge
    if (targetIsWaypoint) {
      const waypointId = edgeToDelete.target;
      // Find the edge that starts from this waypoint
      const outgoingEdge = newEdges.find(e => e.source === waypointId);
      // Delete both edges and the waypoint
      if (outgoingEdge) {
        newEdges = newEdges.filter(e => e.id !== edgeId && e.id !== outgoingEdge.id);
      } else {
        newEdges = newEdges.filter(e => e.id !== edgeId);
      }
      newNodes = newNodes.filter(n => n.id !== waypointId);
    }
    // If source is a waypoint, also delete the waypoint and its incoming edge
    else if (sourceIsWaypoint) {
      const waypointId = edgeToDelete.source;
      // Find the edge that ends at this waypoint
      const incomingEdge = newEdges.find(e => e.target === waypointId);
      // Delete both edges and the waypoint
      if (incomingEdge) {
        newEdges = newEdges.filter(e => e.id !== edgeId && e.id !== incomingEdge.id);
      } else {
        newEdges = newEdges.filter(e => e.id !== edgeId);
      }
      newNodes = newNodes.filter(n => n.id !== waypointId);
    }
    // Normal edge deletion
    else {
      newEdges = newEdges.filter(e => e.id !== edgeId);
    }

    setNodes(newNodes);
    setEdges(newEdges);
    setSelectedEdges([]);
    addToHistory(newNodes, newEdges);
  }, [edges, nodes, addToHistory]);

  const createWaypoint = useCallback((edgeId) => {
    const edge = edges.find(e => e.id === edgeId);
    if (!edge) return;

    const sourceNode = nodes.find(n => n.id === edge.source);
    const targetNode = nodes.find(n => n.id === edge.target);
    
    if (sourceNode && targetNode) {
      // Calculate midpoint between node centers
      const sourceCenterX = sourceNode.position.x + 100;
      const sourceCenterY = sourceNode.position.y + 40;
      const targetCenterX = targetNode.position.x + 100;
      const targetCenterY = targetNode.position.y + 40;
      
      const midX = (sourceCenterX + targetCenterX) / 2 - 8;
      const midY = (sourceCenterY + targetCenterY) / 2 - 8;
      
      // Create waypoint node
      const waypointId = `waypoint-${Date.now()}`;
      const waypointNode = {
        id: waypointId,
        type: 'custom',
        position: { x: midX, y: midY },
        data: { 
          label: '•', 
          type: 'default',
          isWaypoint: true
        }
      };
      
      // Determine opposite handles for smart routing
      const getOppositeSide = (handle) => {
        if (handle?.includes('right')) return 'left';
        if (handle?.includes('left')) return 'right';
        if (handle?.includes('top')) return 'bottom';
        if (handle?.includes('bottom')) return 'top';
        return 'left'; // default
      };

      // Extract the side from the handle (e.g., "right-source" -> "right")
      const getHandleType = (handle) => {
        if (handle?.includes('target')) return '-target';
        return '-source';
      };

      const sourceHandleOpp = getOppositeSide(edge.sourceHandle);
      const targetHandleOpp = getOppositeSide(edge.targetHandle);

      const newNodes = [...nodes, waypointNode];
      setNodes(newNodes);
      
      // Split the edge
      const newEdges = edges.map(e => {
        if (e.id === edgeId) {
          return { 
            ...e, 
            target: waypointId,
            sourceHandle: e.sourceHandle, // Keep original source handle
            targetHandle: `${sourceHandleOpp}-target`, // Connect to opposite side on waypoint
            data: { ...e.data, arrowType: 'source' }
          };
        }
        return e;
      });
      
      // Add second edge from waypoint to target
      const waypointToTargetEdge = {
        id: `${waypointId}-${edge.target}`,
        source: waypointId,
        target: edge.target,
        sourceHandle: `${targetHandleOpp}-source`, // Connect from opposite side on waypoint
        targetHandle: edge.targetHandle, // Keep original target handle
        label: '',
        data: { arrowType: edge.data?.arrowType || 'target' }
      };
      
      newEdges.push(waypointToTargetEdge);
      setEdges(newEdges);
      addToHistory(newNodes, newEdges);
      
      // Open edit modal for the waypoint
      setEditingNode(waypointNode);
      setEdgeContextMenu(null);
    }
  }, [nodes, edges, addToHistory]);

  const updateEdge = useCallback((edgeId, label) => {
    const newEdges = edges.map((edge) =>
      edge.id === edgeId ? { ...edge, label } : edge
    );
    setEdges(newEdges);
    addToHistory(nodes, newEdges);
  }, [edges, nodes, addToHistory]);

  const updateEdgeArrow = useCallback((edgeId, arrowType) => {
    const newEdges = edges.map((edge) => {
      if (edge.id === edgeId) {
        return {
          ...edge,
          data: { ...edge.data, arrowType }
        };
      }
      return edge;
    });
    setEdges(newEdges);
    addToHistory(nodes, newEdges);
  }, [edges, nodes, addToHistory]);

  const addNode = useCallback((position) => {
    const label = nodeLabel.trim() || `${nodeType} ${nodes.length + 1}`;
    const newNode = {
      id: `n${Date.now()}`,
      type: 'custom',
      position: position || { x: Math.random() * 400, y: Math.random() * 400 },
      data: { label, type: nodeType }
    };
    const newNodes = [...nodes, newNode];
    setNodes(newNodes);
    setNodeLabel('');
    addToHistory(newNodes, edges);
  }, [nodes.length, nodeLabel, nodeType, nodes, edges, addToHistory]);

  const duplicateNode = useCallback((nodeId) => {
    const node = nodes.find(n => n.id === nodeId);
    if (node) {
      const newNode = {
        ...node,
        id: `n${Date.now()}`,
        position: { x: node.position.x + 50, y: node.position.y + 50 },
        data: { ...node.data, label: `${node.data.label} (copy)` }
      };
      const newNodes = [...nodes, newNode];
      setNodes(newNodes);
      addToHistory(newNodes, edges);
    }
  }, [nodes, edges, addToHistory]);

  const changeNodeType = useCallback((nodeId, newType) => {
    const newNodes = nodes.map((node) => {
      if (node.id === nodeId) {
        return {
          ...node,
          data: {
            ...node.data,
            type: newType,
            customColor: undefined // Clear custom color to show type's default color
          }
        };
      }
      return node;
    });
    setNodes(newNodes);
    addToHistory(newNodes, edges);
  }, [nodes, edges, addToHistory]);

  const clearAll = useCallback(() => {
    if (confirm('Clear all nodes and edges?')) {
      setNodes([]);
      setEdges([]);
      addToHistory([], []);
    }
  }, [addToHistory]);

  const exportData = useCallback(() => {
    const data = { nodes, edges, name: projectName };
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${projectName || 'board'}-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }, [nodes, edges, projectName]);

  const importData = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const data = JSON.parse(event.target.result);
            if (data.nodes && data.edges) {
              setNodes(data.nodes);
              setEdges(data.edges);
              if (data.name) setProjectName(data.name);
              addToHistory(data.nodes, data.edges);
              alert('Data imported successfully!');
            } else {
              alert('Invalid file format');
            }
          } catch (error) {
            alert('Error parsing file: ' + error.message);
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  }, [addToHistory]);

  const loadProject = useCallback((projectId) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      setCurrentProjectId(projectId);
      setNodes(project.nodes);
      setEdges(project.edges);
      setProjectName(project.name);
      setHistory([{ nodes: project.nodes, edges: project.edges }]);
      setHistoryIndex(0);
    }
  }, [projects]);

  const deleteProject = useCallback((projectId) => {
    setProjects(prev => prev.filter(p => p.id !== projectId));
    if (currentProjectId === projectId && projects.length > 1) {
      const nextProject = projects.find(p => p.id !== projectId);
      if (nextProject) loadProject(nextProject.id);
    }
  }, [projects, currentProjectId, loadProject]);

  const createNewProject = useCallback(() => {
    const newProject = {
      id: `project-${Date.now()}`,
      name: 'Untitled Project',
      nodes: [],
      edges: [],
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    setProjects(prev => [...prev, newProject]);
    loadProject(newProject.id);
  }, [loadProject]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Check if user is typing in an input/textarea
      const isTyping = e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA';

      // Undo: Cmd/Ctrl + Z (allow when typing)
      if ((e.metaKey || e.ctrlKey) && e.key === 'z' && !e.shiftKey && !isTyping) {
        e.preventDefault();
        undo();
      }
      // Redo: Cmd/Ctrl + Shift + Z or Cmd/Ctrl + Y (allow when typing)
      if ((((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'z') || ((e.metaKey || e.ctrlKey) && e.key === 'y')) && !isTyping) {
        e.preventDefault();
        redo();
      }
      // Delete: Delete or Backspace (ONLY when NOT typing)
      if ((e.key === 'Delete' || e.key === 'Backspace') && !editingNode && !editingEdge && !showSearch && !isTyping) {
        e.preventDefault();
        if (selectedNodes.length > 0) {
          selectedNodes.forEach(nodeId => deleteNode(nodeId));
        }
        if (selectedEdges.length > 0) {
          selectedEdges.forEach(edgeId => deleteEdge(edgeId));
        }
      }
      // Duplicate: Cmd/Ctrl + D (prevent when typing)
      if ((e.metaKey || e.ctrlKey) && e.key === 'd' && selectedNodes.length > 0 && !isTyping) {
        e.preventDefault();
        selectedNodes.forEach(nodeId => duplicateNode(nodeId));
      }
      // Search: Cmd/Ctrl + F (works everywhere)
      if ((e.metaKey || e.ctrlKey) && e.key === 'f') {
        e.preventDefault();
        setShowSearch(true);
      }
      // Close modals: Escape (works everywhere)
      if (e.key === 'Escape') {
        setShowSearch(false);
        setContextMenu(null);
        setEdgeContextMenu(null);
        setEditingEdge(null);
        setViewingImage(null);
        if (!editingNode) {
          setSelectedNodes([]);
          setSelectedEdges([]);
          setNodes(prev => prev.map(n => ({ ...n, selected: false })));
          setEdges(prev => prev.map(e => ({ ...e, selected: false })));
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo, selectedNodes, selectedEdges, deleteNode, deleteEdge, duplicateNode, editingNode, editingEdge, showSearch]);

  // Double-click to add node
  const handlePaneDoubleClick = useCallback((position) => {
    addNode(position);
  }, [addNode]);

  // Right-click context menu
  const handleNodeContextMenu = useCallback((event, node) => {
    event.preventDefault();
    setContextMenu({
      x: event.clientX,
      y: event.clientY,
      nodeId: node.id,
      node: node
    });
  }, []);

  const handleEdgeContextMenu = useCallback((event, edge) => {
    event.preventDefault();
    setEdgeContextMenu({
      x: event.clientX,
      y: event.clientY,
      edgeId: edge.id,
      edge: edge
    });
  }, []);

  const handleNodeSelect = useCallback((node) => {
    setNodes(prev => prev.map(n => ({
      ...n,
      selected: n.id === node.id
    })));

    // Center on the selected node with smooth animation
    if (reactFlowInstance.current) {
      const { setCenter } = reactFlowInstance.current;
      const x = node.position.x + 100; // Offset by node width/2 (approximate)
      const y = node.position.y + 50;  // Offset by node height/2 (approximate)
      setCenter(x, y, { zoom: 1.5, duration: 800 });
    }
  }, []);

  const handleEdgeDoubleClick = useCallback((edge) => {
    // Double-click to edit edge label
    setEditingEdge(edge);
  }, []);

  const handleImageClick = useCallback((nodeId) => {
    const node = nodes.find(n => n.id === nodeId);
    if (node && node.data.imageUrl) {
      setViewingImage({
        imageUrl: node.data.imageUrl,
        nodeName: node.data.label
      });
    }
  }, [nodes]);

  // Add onEdit and onImageClick callbacks to all nodes
  const nodesWithEdit = useMemo(() => {
    return nodes.map(node => ({
      ...node,
      data: {
        ...node.data,
        onEdit: handleEditNode,
        onImageClick: handleImageClick
      }
    }));
  }, [nodes, handleEditNode, handleImageClick]);

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <Topbar
        nodeLabel={nodeLabel}
        setNodeLabel={setNodeLabel}
        addNode={() => addNode()}
        clearAll={clearAll}
        nodes={nodes}
        edges={edges}
        nodeType={nodeType}
        setNodeType={setNodeType}
        exportData={exportData}
        importData={importData}
        onShowHelp={() => setShowHelp(true)}
      />

      <div style={{ flex: 1, width: '100%', height: '100%' }}>
        <ReactFlowProvider>
          <FlowCanvas
            nodes={nodesWithEdit}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            backgroundType={backgroundType}
            customBgUrl={customBgUrl}
            onPaneDoubleClick={handlePaneDoubleClick}
            onNodeContextMenu={handleNodeContextMenu}
            onEdgeContextMenu={handleEdgeContextMenu}
            onEdgeDoubleClick={handleEdgeDoubleClick}
            reactFlowInstance={reactFlowInstance}
          />
        </ReactFlowProvider>
      </div>

      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        edges={edges}
        nodes={nodes}
        onDeleteEdge={deleteEdge}
        onUpdateEdge={updateEdge}
        onUpdateEdgeArrow={updateEdgeArrow}
        backgroundType={backgroundType}
        setBackgroundType={setBackgroundType}
        customBgUrl={customBgUrl}
        setCustomBgUrl={setCustomBgUrl}
        projectName={projectName}
        setProjectName={setProjectName}
        projects={projects}
        currentProjectId={currentProjectId}
        onLoadProject={loadProject}
        onDeleteProject={deleteProject}
        onCreateNewProject={createNewProject}
        autoSave={autoSave}
        setAutoSave={setAutoSave}
      />

      {editingNode && (
        <EditNodeModal
          node={editingNode}
          onClose={() => setEditingNode(null)}
          onUpdate={updateNode}
          onDelete={deleteNode}
        />
      )}

      {editingEdge && (
        <EditEdgeModal
          edge={editingEdge}
          sourceNode={nodes.find(n => n.id === editingEdge.source)}
          targetNode={nodes.find(n => n.id === editingEdge.target)}
          onClose={() => setEditingEdge(null)}
          onUpdate={updateEdge}
        />
      )}

      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu(null)}
          currentType={contextMenu.node?.data.type || 'default'}
          onEdit={() => {
            handleEditNode(contextMenu.nodeId);
            setContextMenu(null);
          }}
          onDuplicate={() => {
            duplicateNode(contextMenu.nodeId);
            setContextMenu(null);
          }}
          onDelete={() => {
            deleteNode(contextMenu.nodeId);
            setContextMenu(null);
          }}
          onChangeColor={() => {
            handleEditNode(contextMenu.nodeId);
            setContextMenu(null);
          }}
          onChangeType={(newType) => {
            changeNodeType(contextMenu.nodeId, newType);
          }}
        />
      )}

      {edgeContextMenu && (
        <EdgeContextMenu
          x={edgeContextMenu.x}
          y={edgeContextMenu.y}
          onClose={() => setEdgeContextMenu(null)}
          currentArrowType={edgeContextMenu.edge?.data?.arrowType || 'target'}
          onEdit={() => {
            const edge = edges.find(e => e.id === edgeContextMenu.edgeId);
            if (edge) {
              setEditingEdge(edge);
            }
            setEdgeContextMenu(null);
          }}
          onChangeArrow={(arrowType) => {
            updateEdgeArrow(edgeContextMenu.edgeId, arrowType);
          }}
          onCreateWaypoint={() => {
            createWaypoint(edgeContextMenu.edgeId);
          }}
          onDelete={() => {
            deleteEdge(edgeContextMenu.edgeId);
            setEdgeContextMenu(null);
          }}
        />
      )}

      {showSearch && (
        <SearchPanel
          nodes={nodes}
          onNodeSelect={handleNodeSelect}
          onClose={() => setShowSearch(false)}
        />
      )}

      {viewingImage && (
        <ImageViewer
          imageUrl={viewingImage.imageUrl}
          nodeName={viewingImage.nodeName}
          onClose={() => setViewingImage(null)}
        />
      )}

      {showHelp && (
        <HelpModal
          onClose={() => setShowHelp(false)}
        />
      )}

      {/* Keyboard Shortcuts Help */}
      <div style={{
        position: 'fixed',
        bottom: '10px',
        left: '10px',
        background: 'rgba(26, 26, 26, 0.9)',
        padding: '8px 12px',
        borderRadius: '6px',
        fontSize: '11px',
        color: '#888',
        zIndex: 100
      }}>
        <kbd>Ctrl/Cmd+Z</kbd> Undo • <kbd>Ctrl/Cmd+Y</kbd> Redo • <kbd>Ctrl/Cmd+F</kbd> Search • <kbd>Ctrl/Cmd+D</kbd> Duplicate • <kbd>Del</kbd> Delete
      </div>
    </div>
  );
}
