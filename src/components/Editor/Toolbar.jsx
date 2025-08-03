import { 
  MdTitle,       
  MdTextFields,  
  MdFormatListBulleted, 
  MdCode,        
  MdFormatQuote, 
  MdImage        
} from 'react-icons/md';

const Toolbar = ({ addBlock }) => {
  const blockTypes = [
    { type: 'heading', icon: <MdTitle className="h-5 w-5" />, label: 'Heading' },
    { type: 'paragraph', icon: <MdTextFields className="h-5 w-5" />, label: 'Paragraph' },
    { type: 'list', icon: <MdFormatListBulleted className="h-5 w-5" />, label: 'List' },
    { type: 'code', icon: <MdCode className="h-5 w-5" />, label: 'Code' },
    { type: 'quote', icon: <MdFormatQuote className="h-5 w-5" />, label: 'Quote' },
    { type: 'image', icon: <MdImage className="h-5 w-5" />, label: 'Image' },
  ];

  return (
    <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Add Block</h3>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {blockTypes.map(({type, icon, label}) => (
          <button
            key={type}
            onClick={() => addBlock(type)}
            className="flex flex-col items-center justify-center p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            aria-label={`${label} hinzufügen`}
          >
            <span className="text-gray-600 dark:text-gray-400 mb-1">{icon}</span>
            <span className="text-xs text-gray-700 dark:text-gray-300">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Toolbar;
