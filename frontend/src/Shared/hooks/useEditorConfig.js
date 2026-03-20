export const useEditorConfig = () => {
  const getLanguageForMonaco = (lang) => {
    switch (lang) {
      case 'javascript': return 'javascript';
      case 'java': return 'java';
      case 'cpp': return 'cpp';
      default: return 'javascript';
    }
  };

  const getEditorOptions = () => ({
    fontSize: 14,
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    automaticLayout: true,
    tabSize: 2,
    insertSpaces: true,
    wordWrap: 'on',
    lineNumbers: 'on',
    glyphMargin: false,
    folding: true,
    lineDecorationsWidth: 10,
    lineNumbersMinChars: 3,
    renderLineHighlight: 'line',
    selectOnLineNumbers: true,
    roundedSelection: false,
    readOnly: false,
    cursorStyle: 'line',
    mouseWheelZoom: true,
    padding: { top: 12, bottom: 12 },
    scrollbar: {
      vertical: 'visible',
      horizontal: 'visible',
      handleMouseWheel: true
    },
    overviewRulerBorder: false,
    hideCursorInOverviewRuler: true,
  });

  return { getLanguageForMonaco, getEditorOptions };
};