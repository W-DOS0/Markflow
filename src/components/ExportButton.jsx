import React from 'react';
import { saveAs } from 'file-saver';
import { format } from 'prettier/standalone';
import parserMarkdown from 'prettier/parser-markdown';
import { formatMarkdown } from '../utils/exportMarkdown';

const ExportButton = ({ blocks }) => {
  const exportMarkdown = async () => {
    try {
      const markdownContent = formatMarkdown(blocks);
      
      // Format the markdown with Prettier
      const formattedMarkdown = await format(markdownContent, {
        parser: 'markdown',
        plugins: [parserMarkdown],
      });
      
      const blob = new Blob([formattedMarkdown], { type: 'text/markdown;charset=utf-8' });
      saveAs(blob, 'markdown-blog-post.md');
    } catch (error) {
      console.error('Error exporting markdown:', error);
      // Fallback: Export without formatting
      const markdownContent = formatMarkdown(blocks);
      const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8' });
      saveAs(blob, 'markdown-blog-post.md');
    }
  };

  return (
    <button
      onClick={exportMarkdown}
      className="btn btn-primary flex items-center"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
      Export
    </button>
  );
};

export default ExportButton;