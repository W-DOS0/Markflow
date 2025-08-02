import React from 'react';

const ImageBlock = ({ block, updateBlock }) => {
  const handleChange = (e) => {
    updateBlock(block.id, e.target.value);
  };

  return (
    <div className="w-full">
      <textarea
        value={block.content}
        onChange={handleChange}
        placeholder="![Alt text](https://example.com/image.jpg)"
        className="editor-input min-h-[80px] font-mono text-sm"
        rows={3}
        aria-label="Edit image"
      />
      <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
        Format: ![Alt text](image URL)
      </div>
    </div>
  );
};

export default ImageBlock;