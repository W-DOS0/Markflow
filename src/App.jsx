import React, { useState } from 'react';
import EditorArea from './components/Editor/EditorArea';
import MarkdownPreview from './components/Preview/MarkdownPreview';
import DarkModeToggle from './components/DarkModeToggle';
import ExportButton from './components/ExportButton';
import FullscreenToggle from './components/FullscreenToggle';
import { DndContext } from '@dnd-kit/core';

import { CSS } from '@dnd-kit/utilities';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';

function App() {
  const [blocks, setBlocks] = useState([
    { id: '1', type: 'heading', content: '# Welcome to MarkFlow', level: 1 },
    { id: '2', type: 'paragraph', content: 'MarkFlow is an elegant Markdown editor with drag-and-drop functionality. Start editing or add new blocks.' },
    { id: '3', type: 'heading', content: '## Features', level: 2 },
    { id: '4', type: 'list', content: '- Drag-and-drop support\n- Live preview\n- Dark mode\n- Export as .md file', ordered: false },
  ]);
  const [isPreviewVisible, setIsPreviewVisible] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const updateBlock = (id, content) => {
    setBlocks(blocks.map(block => 
      block.id === id ? { ...block, content } : block
    ));
  };

  const addBlock = (type, position = 'end') => {
    const newId = Date.now().toString();
    let newBlock;
    
    switch (type) {
      case 'heading':
        newBlock = { id: newId, type: 'heading', content: '## New Heading', level: 2 };
        break;
      case 'paragraph':
        newBlock = { id: newId, type: 'paragraph', content: 'New paragraph' };
        break;
      case 'list':
        newBlock = { id: newId, type: 'list', content: '- List item 1\n- List item 2', ordered: false };
        break;
      case 'code':
        newBlock = { id: newId, type: 'code', content: '// Insert code here\nconsole.log("Hello World");', language: 'javascript' };
        break;
      case 'quote':
        newBlock = { id: newId, type: 'quote', content: '> This is a quote block' };
        break;
      case 'image':
        newBlock = { id: newId, type: 'image', content: '![Alt text](https://via.placeholder.com/600x400?text=Placeholder+image)' };
        break;
      default:
        newBlock = { id: newId, type: 'paragraph', content: 'New block' };
    }
    
    if (position === 'end') {
      setBlocks([...blocks, newBlock]);
    } else {
      const index = blocks.findIndex(block => block.id === position);
      if (index !== -1) {
        const newBlocks = [...blocks];
        newBlocks.splice(index + 1, 0, newBlock);
        setBlocks(newBlocks);
      }
    }
  };

  const removeBlock = (id) => {
    setBlocks(blocks.filter(block => block.id !== id));
  };

  const moveBlock = (fromIndex, toIndex) => {
    const newBlocks = [...blocks];
    const [movedBlock] = newBlocks.splice(fromIndex, 1);
    newBlocks.splice(toIndex, 0, movedBlock);
    setBlocks(newBlocks);
  };

  const togglePreview = () => {
    setIsPreviewVisible(!isPreviewVisible);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className={`min-h-screen flex flex-col ${isFullscreen ? 'fixed inset-0 z-50 bg-white dark:bg-gray-900' : ''}`}>
      <header className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 py-4">
        <div className="container flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* Logo insertion */}
            <img src="/media/MarkFlow.svg" alt="MarkFlow Logo" className="h-8 w-8" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">MarkFlow</h1>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={togglePreview}
              className="btn btn-ghost btn-icon"
              aria-label={isPreviewVisible ? "Hide preview" : "Show preview"}
            >
              {isPreviewVisible ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
            <FullscreenToggle isFullscreen={isFullscreen} toggleFullscreen={toggleFullscreen} />
            <ExportButton blocks={blocks} />
            <DarkModeToggle />
          </div>
        </div>
      </header>

      <main className="flex-1 container py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className={`${isPreviewVisible ? 'lg:w-1/2' : 'w-full'}`}>
            <EditorArea 
              blocks={blocks} 
              updateBlock={updateBlock} 
              addBlock={addBlock}
              removeBlock={removeBlock}
              moveBlock={moveBlock}
            />
          </div>
          
          {isPreviewVisible && (
            <div className="lg:w-1/2">
              <div className="sticky top-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm p-6 h-full">
                  <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Preview</h2>
                  <div className="overflow-y-auto max-h-[calc(100vh-12rem)]">
                    <MarkdownPreview blocks={blocks} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 py-4">
        <div className="container flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-2 md:mb-0">
            <img src="/media/MarkFlow.svg" alt="MarkFlow Logo" className="h-6 w-6" />
            <span className="text-gray-500 dark:text-gray-400 text-sm">MarkFlow</span>
          </div>
          <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
            An elegant Markdown editor with drag-and-drop
          </div>
          <div className="text-gray-500 dark:text-gray-400 text-sm">
            © {new Date().getFullYear()}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;