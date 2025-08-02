import React from 'react';

const QuoteBlock = ({ block, updateBlock }) => {
  const handleChange = (e) => {
    updateBlock(block.id, e.target.value);
  };

  return (
    <textarea
      value={block.content}
      onChange={handleChange}
      placeholder="> Insert quote here"
      className="editor-input min-h-[80px] italic"
      rows={3}
      aria-label="Edit quote"
    />
  );
};

export default QuoteBlock;