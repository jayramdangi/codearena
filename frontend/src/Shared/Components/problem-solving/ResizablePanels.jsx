import { useState, useEffect } from 'react';

const ResizablePanels = ({ 
  leftPanel,
  rightPanel,
  initialLeftWidth = 48,
  minLeftWidth = 30,
  maxLeftWidth = 70
}) => {
  const [leftPanelWidth, setLeftPanelWidth] = useState(initialLeftWidth);
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing) return;
      const container = document.getElementById('resizable-container');
      if (!container) return;
      
      const containerRect = container.getBoundingClientRect();
      const newLeftWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;
      const boundedWidth = Math.max(minLeftWidth, Math.min(maxLeftWidth, newLeftWidth));
      setLeftPanelWidth(boundedWidth);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isResizing, minLeftWidth, maxLeftWidth]);

  return (
    <div id="resizable-container" className="h-[90vh] flex bg-gray-950 text-gray-100 p-8">
      {/* Left Panel */}
      <div className="flex flex-col h-full" style={{ width: `${leftPanelWidth}%` }}>
        {leftPanel}
      </div>

      {/* Resize handler */}
      <div 
        className="w-6 flex items-center justify-center cursor-col-resize mx-2"
        onMouseDown={(e) => { e.preventDefault(); setIsResizing(true); }}
      >
        <div className="w-1 h-8 bg-gray-500 rounded-full flex items-center justify-center">
          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex flex-col h-full" style={{ width: `${100 - leftPanelWidth}%` }}>
        {rightPanel}
      </div>
    </div>
  );
};

export default ResizablePanels;