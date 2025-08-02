import React, { useState } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import DraggableBlock from './DraggableBlock';
import Toolbar from './Toolbar';

const EditorArea = ({ blocks, updateBlock, addBlock, removeBlock, moveBlock }) => {
  const [activeId, setActiveId] = useState(null);
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = blocks.findIndex(block => block.id === active.id);
      const newIndex = blocks.findIndex(block => block.id === over.id);
      
      moveBlock(oldIndex, newIndex);
    }
    
    setActiveId(null);
  };

  const moveBlockUp = (id) => {
    const index = blocks.findIndex(block => block.id === id);
    if (index > 0) {
      moveBlock(index, index - 1);
    }
  };

  const moveBlockDown = (id) => {
    const index = blocks.findIndex(block => block.id === id);
    if (index < blocks.length - 1) {
      moveBlock(index, index + 1);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Editor</h2>
      
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={blocks.map(block => block.id)} strategy={verticalListSortingStrategy}>
          {blocks.map((block, index) => (
            <DraggableBlock
              key={block.id}
              block={block}
              updateBlock={updateBlock}
              removeBlock={removeBlock}
              addBlock={addBlock}
              moveBlockUp={moveBlockUp}
              moveBlockDown={moveBlockDown}
              index={index}
              totalBlocks={blocks.length}
            />
          ))}
        </SortableContext>
      </DndContext>
      
      <Toolbar addBlock={addBlock} />
    </div>
  );
};

export default EditorArea;