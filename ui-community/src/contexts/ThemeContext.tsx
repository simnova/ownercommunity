import { Button, theme } from 'antd';
import { ReactNode, createContext, useEffect, useState } from 'react';
import ModalPopUp from './components/ModalPopUp';
import MaintenanceMessage from '../components/shared/maintenance-message/maintenance-message';
import ImpendingMessage from '../components/shared/maintenance-message/impending-message';
import { useMaintenanceMessage } from '../components/shared/maintenance-message';

interface ThemeContextType {
  currentTokens: {
    token: typeof theme.defaultSeed;
    hardCodedTokens: any;
    type: string;
  };
  setTheme: (tokens: any, types: string) => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  currentTokens: {
    token: theme.defaultSeed,
    hardCodedTokens: {
      textColor: '#000000',
      backgroundColor: '#ffffff'
    },
    type: 'light'
  },
  setTheme: () => {}
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const {
    isImpending,
    isMaintenance,
    impendingMessage,
    maintenanceMessage,
    impendingStartTimestamp,
    maintenanceStartTimestamp,
    maintenanceEndTimestamp
  } = useMaintenanceMessage();
  const [currentTokens, setCurrentTokens] = useState({
    token: theme.defaultSeed,
    hardCodedTokens: {
      textColor: '#000000',
      backgroundColor: '#ffffff'
    },
    type: 'light'
  });
  const [isHidden, setIsHidden] = useState(false);

  const toggleHidden = () => setIsHidden((prevHidden) => !prevHidden);

  // setTheme functions that take tokens as argument
  const setTheme = (tokens: any, type: string) => {
    let valueToSet: any;
    if (type === 'light') {
      valueToSet = {
        token: tokens,
        hardCodedTokens: {
          textColor: '#000000',
          backgroundColor: '#ffffff'
        },
        type: 'light'
      };
    } else if (type === 'dark') {
      valueToSet = {
        token: tokens,
        hardCodedTokens: {
          textColor: '#ffffff',
          backgroundColor: '#000000'
        },
        type: 'dark'
      };
    } else if (type === 'custom') {
      console.log('I am in custom thing');
      valueToSet = {
        token: {
          ...currentTokens.token
        },
        hardCodedTokens: {
          textColor: tokens?.colorTextBase,
          backgroundColor: tokens?.colorBgBase
        },
        type: 'custom'
      };
    }
    setCurrentTokens(valueToSet);

    localStorage.setItem('themeProp', JSON.stringify(valueToSet));
  };

  useEffect(() => {
    const extractFromLocal = JSON.parse(localStorage.getItem('themeProp')!);
    if (extractFromLocal && extractFromLocal.type === 'dark') {
      setTheme(
        {
          colorTextBase: '#ffffff',
          colorBgBase: '#000000'
        },
        'dark'
      );
      return;
    } else if (extractFromLocal && extractFromLocal.type === 'light') {
      setTheme(
        {
          colorTextBase: '#000000',
          colorBgBase: '#ffffff'
        },
        'light'
      );
      return;
    } else if (extractFromLocal && extractFromLocal.type === 'custom') {
      console.log('I am inside useeffect');
      console.log(extractFromLocal);
      setTheme(
        {
          colorTextBase: extractFromLocal.hardCodedTokens.textColor,
          colorBgBase: extractFromLocal.hardCodedTokens.backgroundColor
        },
        'custom'
      );
      return;
    } else {
      const valueToSet = {
        type: 'light',
        tokens: theme.defaultSeed,
        hardCodedTokens: {
          textColor: '#000000',
          backgroundColor: '#ffffff'
        }
      };
      localStorage.setItem('themeProp', JSON.stringify(valueToSet));
      setTheme(theme.defaultSeed, 'light');
      return;
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey && event.shiftKey && event.key === 'k') {
        toggleHidden();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  console.log('isImpending', isImpending);
  console.log('isMaintenance', isMaintenance);
  return (
    <ThemeContext.Provider value={{ currentTokens, setTheme }}>
      {isMaintenance ? (
        <MaintenanceMessage
          maintenanceStartTimestamp={maintenanceStartTimestamp}
          maintenanceEndTimestamp={maintenanceEndTimestamp}
          maintenanceMessage={maintenanceMessage ?? ''}
        />
      ) : (
        <div>
          <div className={isHidden ? 'hidden' : 'text-center'}>
            {isImpending && (
              <ImpendingMessage
                impendingMessage={impendingMessage ?? ''}
                impendingStartTimestamp={impendingStartTimestamp}
                maintenanceEndTimestamp={maintenanceEndTimestamp}
              />
            )}
            <div className="py-2 flex gap-4 justify-center">
              <Button
                type="primary"
                onClick={() => {
                  if (currentTokens.type === 'custom' || currentTokens.type === 'light') {
                    setTheme(theme.darkAlgorithm(theme.defaultSeed), 'dark');
                  } else if (currentTokens.type === 'dark') {
                    setTheme(theme.defaultSeed, 'light');
                  }
                }}
              >
                Toggle Dark/Light
              </Button>

              <ModalPopUp />
            </div>
            <p>
              Hit <strong>Cmd+Shift+K</strong> to hide
            </p>
          </div>
          {children}
        </div>
      )}
    </ThemeContext.Provider>
  );
};
