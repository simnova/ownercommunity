import React, { ReactNode, createContext, useEffect, useState, Fragment } from 'react';
import { Button, theme } from 'antd';
import { Dialog, Transition } from '@headlessui/react';
import ModalPopUp from './components/ModalPopUp';
import { useFeatureFlags } from '../components/shared/feature-flag-react-lite';
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
  const { isImpending, isMaintenance, maintainanceMessage, maintainanceMessageImpending } = useMaintenanceMessage();
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
    console.log('Printing extractFromLocal');
    console.log(extractFromLocal);
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
  return (
    <ThemeContext.Provider value={{ currentTokens, setTheme }}>
      {isMaintenance ? (
        <div>
          <div className="h-screen flex justify-center items-center text-center px-8">
            <div
              dangerouslySetInnerHTML={{
                __html: maintainanceMessage as string
              }}
            ></div>
          </div>
        </div>
      ) : (
        <div>
          <div className={isHidden ? 'hidden' : 'text-center'}>
            {isImpending  && (
              <div className="w-screen bg-red-500 text-left px-8 py-4">
                <div
                  dangerouslySetInnerHTML={{
                    __html: maintainanceMessageImpending as string
                  }}
                ></div>
              </div>
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
