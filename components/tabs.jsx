import { classNames } from '@/util/css';
import { useEffect, useState } from 'react';

export function Tabs({ tabs, onSelect, children }) {
  const [_tabs, setTabs] = useState(tabs.map((tab, i) => ({ ...tab, current: i === 0 })));
  const [selectedTab, setSelectedTab] = useState(0);
  const selectTab = (index) => {
    setSelectedTab(index);
    setTabs(_tabs.map((tab, i) => ({ ...tab, current: i === index })));
    if (typeof onSelect === 'function') onSelect(index);
  };

  useEffect(() => {
    if (typeof onSelect === 'function') onSelect(0);
  }, []);

  return (
    <>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <div className="w-full px-4">
          <select
            id="tabs"
            name="tabs"
            className="block w-full border-gray-300 rounded-md focus:border-brand-primary-100 focus:ring-brand-primary-200"
            value={_tabs[selectedTab].name}
            onChange={(e) => {
              const index = _tabs.findIndex((tab) => tab.name === e.target.value);
              if (index !== -1) {
                selectTab(index);
              }
            }}
          >
            {_tabs.map((tab, i) => (
              <option onClick={() => selectTab(i)} className="max-w-full" key={tab.name}>
                {tab.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="flex flex-col ml-6 -mb-px" aria-label="Tabs">
            {_tabs.map((tab, i) => (
              <button
                key={tab.name}
                type="button"
                className={classNames(
                  tab.current
                    ? 'border-brand-primary-100 text-brand-primary-100'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                  'group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm',
                )}
                aria-current={tab.current ? 'page' : undefined}
                onClick={() => selectTab(i)}
              >
                <tab.icon
                  className={classNames(
                    tab.current ? 'text-primary-100' : 'text-gray-400 group-hover:text-gray-500',
                    '-ml-0.5 mr-2 h-5 w-5',
                  )}
                  aria-hidden="true"
                />
                <span>{tab.name}</span> {tab.name === "Currículo Preenchido" && (
                  <span className='ml-1 text-xs'>{"(opcional)"}</span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>
      {children &&
        Array.isArray(children) &&
        children.map((child, i) => (
          <div
            key={i}
            className={classNames(
              'flex-1 space-y-6 py-6 sm:space-y-0 sm:divide-y sm:divide-gray-200 sm:py-0',
              selectedTab != i ? 'hidden' : '',
            )}
          >
            {child}
          </div>
        ))}
    </>
  );
}
