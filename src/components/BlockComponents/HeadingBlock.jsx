import React from 'react';

const HeadingBlock = ({ block, updateBlock }) => {
  const handleChange = (e) => {
    updateBlock(block.id, e.target.value);
  };

  const handleLevelChange = (level) => {
    // Extract the text content without the markdown heading
    const textContent = block.content.replace(/^#+\s*/, '');
    updateBlock(block.id, `${'#'.repeat(level)} ${textContent}`);
  };

  // Extract the current heading level
  const levelMatch = block.content.match(/^(#+)/);
  const currentLevel = levelMatch ? levelMatch[1].length : 1;

  return (
    <div className="w-full">
      <input
        type="text"
        value={block.content}
        onChange={handleChange}
        placeholder="Enter heading..."
        className="editor-input font-bold"
        aria-label="Edit heading"
      />
      <div className="flex mt-2 space-x-1">
        {[1, 2, 3, 4, 5, 6].map((level) => (
          <button
            key={level}
            onClick={() => handleLevelChange(level)}
            className={`px-2 py-1 text-xs rounded ${
              currentLevel === level
                ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            }`}
            aria-label={`Heading level ${level}`}
          >
            H{level}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HeadingBlock;