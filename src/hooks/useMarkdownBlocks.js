import { useState } from 'react';

export const useMarkdownBlocks = (initialBlocks = []) => {
  const [blocks, setBlocks] = useState(initialBlocks);

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
        newBlock = { id: newId, type: 'heading', content: '## Neue Überschrift', level: 2 };
        break;
      case 'paragraph':
        newBlock = { id: newId, type: 'paragraph', content: 'Neuer Absatz' };
        break;
      case 'list':
        newBlock = { id: newId, type: 'list', content: '- Listenelement 1\n- Listenelement 2', ordered: false };
        break;
      case 'code':
        newBlock = { id: newId, type: 'code', content: '// Code hier einfügen\nconsole.log("Hello World");', language: 'javascript' };
        break;
      case 'quote':
        newBlock = { id: newId, type: 'quote', content: '> Dies ist ein Zitatblock' };
        break;
      case 'image':
        newBlock = { id: newId, type: 'image', content: '![Alt-Text](https://via.placeholder.com/600x400?text=Platzhalterbild)' };
        break;
      default:
        newBlock = { id: newId, type: 'paragraph', content: 'Neuer Block' };
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

  return {
    blocks,
    updateBlock,
    addBlock,
    removeBlock,
    moveBlock,
    setBlocks
  };
};