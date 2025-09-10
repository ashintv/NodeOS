# Workflow Components Migration

This directory contains the new modular workflow components that have been migrated from the original React Flow implementation to use `@xyflow/react`.

## Components

### WorkflowBuilder

The main workflow builder component that provides a complete workflow editing experience.

**Features:**

- Enhanced UI with modular design
- Import/Export functionality
- Save workflow capability
- Status tracking and workflow execution
- Improved toolbar with better UX

**Usage:**

```tsx
import { WorkflowBuilder } from "@/components/workflow";

<WorkflowBuilder title="My Workflow" description="Custom workflow description" className="h-full" />;
```

### WorkflowCanvas

The core canvas component that handles the React Flow functionality.

**Features:**

- @xyflow/react integration
- Customizable node types
- Enhanced controls and minimap
- Improved background and styling
- Callback support for parent components

**Usage:**

```tsx
import { WorkflowCanvas } from "@/components/workflow";

<WorkflowCanvas onNodesChange={handleNodesChange} onEdgesChange={handleEdgesChange} onAddNode={handleAddNode} />;
```

### WorkflowNode

A modern, feature-rich node component with enhanced styling and functionality.

**Features:**

- Dynamic icons based on node type
- Status indicators (idle, running, success, error)
- Improved typography and spacing
- Hover effects and animations
- Better handle positioning
- Type-based color coding

**Node Data Interface:**

```tsx
interface WorkflowNodeData {
	label: string;
	type: "trigger" | "action" | "condition";
	description?: string;
	status?: "idle" | "running" | "success" | "error";
	icon?: string;
}
```

## Migration Benefits

1. **Modular Architecture**: Components are now separated and can be used independently
2. **Enhanced UX**: Better visual design, animations, and interactions
3. **Type Safety**: Improved TypeScript support with proper interfaces
4. **Modern React Flow**: Uses the latest `@xyflow/react` package with all its improvements
5. **Export/Import**: Built-in workflow save/load functionality
6. **Status Tracking**: Real-time workflow execution status
7. **Customization**: Easy to extend and customize for specific needs

## File Structure

```
src/components/workflow/
├── index.ts                 # Barrel exports
├── workflow-builder.tsx     # Main builder component
├── workflow-canvas.tsx      # Core canvas component
└── workflow-node.tsx        # Enhanced node component
```

## Dashboard Integration

The dashboard has been updated to include a toggle between the classic workflow view and the new enhanced workflow builder:

- Toggle button in the top-right corner when viewing workflows
- Seamless switching between old and new implementations
- Preserved existing functionality while adding new features

## Key Changes from Legacy Components

1. **Import Changes**:
   - From: `import ReactFlow from "reactflow"`
   - To: `import { ReactFlow } from "@xyflow/react"`

2. **CSS Classes**:
   - From: `react-flow__node`
   - To: `xy-flow__node`

3. **Enhanced Features**:
   - Better node styling with cards and badges
   - Status indicators and animations
   - Import/export functionality
   - Improved type definitions
   - Better responsive design

## Future Enhancements

- [ ] Node library/palette for drag-and-drop
- [ ] Advanced node configuration panels
- [ ] Workflow templates
- [ ] Collaborative editing
- [ ] Version history
- [ ] Advanced validation and testing
- [ ] Performance optimizations for large workflows
