import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';
import 'highlight.js/styles/github-dark.css';

const MarkdownPreview = ({ blocks }) => {
  // Convert blocks to markdown
  const markdown = blocks.map(block => block.content).join('\n\n');

  useEffect(() => {
    // Setze das richtige Theme basierend auf dem Dark Mode
    const isDarkMode = document.documentElement.classList.contains('dark');
    const lightTheme = document.querySelector('link[href*="github.css"]');
    const darkTheme = document.querySelector('link[href*="github-dark.css"]');
    
    if (lightTheme && darkTheme) {
      if (isDarkMode) {
        lightTheme.disabled = true;
        darkTheme.disabled = false;
      } else {
        lightTheme.disabled = false;
        darkTheme.disabled = true;
      }
    }
  }, []);

  return (
    <div className="preview-content">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <pre className={className}>
                <code className={className} {...props}>
                  {children}
                </code>
              </pre>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownPreview;