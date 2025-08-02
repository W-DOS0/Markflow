import React from 'react';

const CodeBlock = ({ block, updateBlock }) => {
  const handleChange = (e) => {
    updateBlock(block.id, e.target.value);
  };

  const handleLanguageChange = (e) => {
    // Extract the code content without the language specifier
    const codeContent = block.content.replace(/^```[\w-]*\n/, '').replace(/\n```$/, '');
    updateBlock(block.id, `\`\`\`${e.target.value}\n${codeContent}\n\`\`\``);
  };

  // Extract the current language
  const languageMatch = block.content.match(/^```([\w-]*)/);
  const currentLanguage = languageMatch ? languageMatch[1] : '';

  const languages = [
    'javascript', 'typescript', 'python', 'java', 'c', 'cpp', 'csharp', 
    'php', 'ruby', 'go', 'rust', 'swift', 'kotlin', 'html', 'css', 
    'scss', 'json', 'xml', 'yaml', 'markdown', 'sql', 'bash', 'sh'
  ];

  return (
    <div className="w-full">
      <textarea
        value={block.content}
        onChange={handleChange}
        placeholder="```javascript\n// Insert code here\nconsole.log('Hello World');\n```"
        className="editor-input min-h-[120px] font-mono text-sm"
        rows={5}
        aria-label="Edit code block"
      />
      <div className="flex mt-2 items-center">
        <span className="text-xs text-gray-600 dark:text-gray-400 mr-2">Language:</span>
        <select
          value={currentLanguage}
          onChange={handleLanguageChange}
          className="text-xs bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-gray-700 dark:text-gray-300"
          aria-label="Select programming language"
        >
          <option value="">Text</option>
          {languages.map(lang => (
            <option key={lang} value={lang}>{lang}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CodeBlock;