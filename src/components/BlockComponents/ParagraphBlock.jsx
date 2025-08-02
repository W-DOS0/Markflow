import React from 'react';

const ParagraphBlock = ({ block, updateBlock }) => {
  const handleChange = (e) => {
    updateBlock(block.id, e.target.value);
  };

  return (
    <textarea
      value={block.content}
      onChange={handleChange}
      placeholder="Enter text..."
      className="editor-input min-h-[60px]"
      rows={2}
      aria-label="Edit paragraph"
    />
  );
};

export default ParagraphBlock;