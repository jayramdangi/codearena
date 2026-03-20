import LanguageSelector from './LanguageSelector';

const EditorToolbar = ({
  selectedLanguage,
  onLanguageChange,
  onRun,
  onSubmit,
  isExecuting,
  showRun = true,
  showSubmit = true,
  runLabel = 'Run',
  submitLabel = 'Submit'
}) => {
  return (
    <div className="flex justify-between items-center p-3 border-b border-gray-700 bg-gray-800 shrink-0">
      <LanguageSelector
        selectedLanguage={selectedLanguage}
        onLanguageChange={onLanguageChange}
        disabled={isExecuting}
      />
      <div className="flex gap-2">
        {showRun && (
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            className={`px-3 py-1 bg-transparent border border-green-500 text-green-400 rounded-lg hover:bg-gray-700 hover:border-green-400 hover:text-green-300 transition-colors text-sm ${
              isExecuting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={onRun}
            disabled={isExecuting}
          >
            {isExecuting ? 'Running...' : runLabel}
          </button>
        )}
        {showSubmit && (
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            className={`px-3 py-1 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-400 transition-colors text-sm ${
              isExecuting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={onSubmit}
            disabled={isExecuting}
          >
            {isExecuting ? 'Submitting...' : submitLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default EditorToolbar;