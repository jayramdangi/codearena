import { useState, useEffect } from 'react';
import { LANGUAGES } from '../../utils/constants';

const LanguageSelector = ({ selectedLanguage, onLanguageChange, disabled = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.language-selector')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedLang = LANGUAGES.find(lang => lang.value === selectedLanguage);

  return (
    <div className="relative language-selector">
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        className={`px-3 py-1 bg-gray-700 text-gray-300 rounded-lg font-medium hover:bg-gray-600 transition-colors flex items-center gap-2 text-sm ${
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
      >
        {selectedLang?.label || 'Select Language'}
        <svg 
          className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-full bg-gray-700 border border-gray-600 rounded-lg shadow-lg z-20">
          {LANGUAGES.map((lang, index) => (
            <button
              key={lang.value}
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              className={`w-full px-3 py-1 text-left transition-colors text-sm ${
                selectedLanguage === lang.value
                  ? 'bg-amber-500 text-gray-900'
                  : 'text-gray-300 hover:bg-gray-600'
              } ${index === 0 ? 'rounded-t-lg' : ''} ${index === LANGUAGES.length - 1 ? 'rounded-b-lg' : ''}`}
              onClick={() => {
                onLanguageChange(lang.value);
                setIsOpen(false);
              }}
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;