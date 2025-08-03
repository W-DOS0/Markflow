import React from 'react';

const ListBlock = ({ block, updateBlock }) => {
  const handleChange = (e) => {
    updateBlock(block.id, e.target.value);
  };

  const toggleListType = () => {
    const lines = block.content.split('\n');
    const newLines = lines.map((line, index) => {
      if (block.ordered) {
        return line.replace(/^\d+\.\s*/, '- ');
      } else {
        return `${index + 1}. ${line.replace(/^[-*+]\s*/, '')}`;
      }
    });
    updateBlock(block.id, newLines.join('\n'), !block.ordered);
  };


  return (
    <div className="w-full">
      <textarea
        value={block.content}
        onChange={handleChange}
        placeholder="- List item 1\n- List item 2"
        className="editor-input min-h-[80px] font-mono text-sm"
        rows={3}
        aria-label="Edit list"
      />
      <div className="flex mt-2">
        <button
          onClick={toggleListType}
          className="px-3 py-1 text-xs rounded bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          aria-label="Toggle list type"
        >
          {block.ordered ? 'To bullet list' : 'To numbered list'}
        </button>
      </div>
    </div>
  );
};

export default ListBlock;