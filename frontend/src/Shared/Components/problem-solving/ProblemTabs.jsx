import { LEFT_TABS, RIGHT_TABS } from '../../utils/constants';

const ProblemTabs = ({ 
  activeTab, 
  onTabChange, 
  type = 'left', 
  availableTabs = [],
  showCount = false,
  count = 0
}) => {
  const tabs = type === 'left' ? LEFT_TABS : RIGHT_TABS;
  
  const getTabLabel = (tabKey) => {
    const baseLabel = tabKey.charAt(0).toUpperCase() + tabKey.slice(1);
    if (showCount && count > 0) {
      return `${baseLabel} (${count})`;
    }
    return baseLabel;
  };

  return (
    <div className={`flex ${type === 'left' ? 'bg-gray-800' : 'bg-gray-800'} px-4 border-b border-gray-700 shrink-0`}>
      {availableTabs.map((tabKey) => (
        <button
          key={tabKey}
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            activeTab === tabKey
              ? 'border-amber-500 text-amber-400'
              : 'border-transparent text-gray-400 hover:text-gray-300'
          }`}
          onClick={() => onTabChange(tabKey)}
        >
          {getTabLabel(tabKey)}
        </button>
      ))}
    </div>
  );
};

export default ProblemTabs;