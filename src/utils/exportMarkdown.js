export const formatMarkdown = (blocks) => {
  return blocks.map(block => block.content).join('\n\n');
};