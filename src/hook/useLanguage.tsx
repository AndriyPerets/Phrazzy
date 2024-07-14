import React, {createContext, useContext, useState, ReactNode, useEffect} from 'react';
import {getLanguage, Language} from '../asyncStorageApi/language';

type LanguageContextType = {
  languageToLearn: Language | undefined;
  nativeLanguage: Language | undefined;
  setLanguageToLearn: (language: Language) => void;
  setNativeLanguage: (language: Language) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

const LanguageProvider = ({children}: {children: ReactNode}) => {
  const [languageToLearn, setLanguageToLearn] = useState<Language>();
  const [nativeLanguage, setNativeLanguage] = useState<Language>();

  useEffect(() => {
    getLanguage('learn').then(setLanguageToLearn);
    getLanguage('native').then(setNativeLanguage);
  }, []);

  return (
    <LanguageContext.Provider
      value={{
        languageToLearn,
        nativeLanguage,
        setLanguageToLearn,
        setNativeLanguage,
      }}>
      {children}
    </LanguageContext.Provider>
  );
};

const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export {LanguageProvider, useLanguage};
