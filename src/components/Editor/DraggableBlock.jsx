import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Bars3Icon, PlusIcon, TrashIcon, ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { 
  ParagraphBlock, 
  HeadingBlock, 
  ListBlock, 
  CodeBlock, 
  QuoteBlock, 
  ImageBlock 
} from '../BlockComponents';

const DraggableBlock = ({ block, updateBlock, removeBlock, addBlock, moveBlockUp, moveBlockDown, index, totalBlocks }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const renderBlock = () => {
    switch (block.type) {
      case 'paragraph':
        return <ParagraphBlock block={block} updateBlock={updateBlock} />;
      case 'heading':
        return <HeadingBlock block={block} updateBlock={updateBlock} />;
      case 'list':
        return <ListBlock block={block} updateBlock={updateBlock} />;
      case 'code':
        return <CodeBlock block={block} updateBlock={updateBlock} />;
      case 'quote':
        return <QuoteBlock block={block} updateBlock={updateBlock} />;
      case 'image':
        return <ImageBlock block={block} updateBlock={updateBlock} />;
      default:
        return <ParagraphBlock block={block} updateBlock={updateBlock} />;
    }
  };

  return (
    <div ref={setNodeRef} style={style} className="mb-3 group">
      <div className="editor-block">
        <div className="flex items-start">
          {/* Left side controls - arrows and drag handle */}
          <div className="flex flex-col items-center mr-3 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
            {/* Move Up Button */}
            <button
              onClick={() => moveBlockUp(block.id)}
              disabled={index === 0}
              className={`p-1 rounded mb-1 ${index === 0 
                ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed' 
                : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-300'}`}
              aria-label="Move block up"
              aria-disabled={index === 0}
            >
              <ChevronUpIcon className="h-4 w-4" />
            </button>
            
            {/* Drag Handle */}
            <div
              {...attributes}
              {...listeners}
              className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-move my-1"
              aria-label="Drag to move block"
            >
              <Bars3Icon className="h-4 w-4 text-gray-500" />
            </div>
            
            {/* Move Down Button */}
            <button
              onClick={() => moveBlockDown(block.id)}
              disabled={index === totalBlocks - 1}
              className={`p-1 rounded mt-1 ${index === totalBlocks - 1 
                ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed' 
                : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-300'}`}
              aria-label="Move block down"
              aria-disabled={index === totalBlocks - 1}
            >
              <ChevronDownIcon className="h-4 w-4" />
            </button>
          </div>
          
          {/* Main content area */}
          <div className="flex-1">
            {renderBlock()}
          </div>
          
          {/* Right side actions */}
          <div className="flex flex-col ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => addBlock('paragraph', block.id)}
              className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 mb-1"
              aria-label="Add block"
            >
              <PlusIcon className="h-4 w-4" />
            </button>
            <button
              onClick={() => removeBlock(block.id)}
              className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 hover:text-red-500 dark:hover:text-red-400"
              aria-label="Remove block"
            >
              <TrashIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DraggableBlock;