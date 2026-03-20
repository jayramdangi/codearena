import { useState } from 'react';
import Editor from '@monaco-editor/react';
import { useEditorConfig } from '../../hooks/useEditorConfig';

const CodeEditor = ({ 
  language, 
  value, 
  onChange, 
  onMount,
  readOnly = false,
  height = '100%'
}) => {
  const [isEditorReady, setIsEditorReady] = useState(false);
  const { getLanguageForMonaco, getEditorOptions } = useEditorConfig();

  const handleEditorDidMount = (editor) => {
    setIsEditorReady(true);
    if (onMount) onMount(editor);
  };

  const options = {
    ...getEditorOptions(),
    readOnly,
    domReadOnly: readOnly,
    contextmenu: !readOnly
  };

  return (
    <div className="flex-1 rounded-xl border border-gray-700 bg-gray-800 overflow-hidden">
      <Editor
        height={height}
        language={getLanguageForMonaco(language)}
        value={value}
        onChange={onChange}
        onMount={handleEditorDidMount}
        theme="vs-dark"
        options={options}
        loading={
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-amber-500"></div>
          </div>
        }
      />
    </div>
  );
};

export default CodeEditor;