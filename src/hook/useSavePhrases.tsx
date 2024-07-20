import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import {getPhrases, Phrases} from '../asyncStorageApi/phrases';

type PhrasesContextType = {
  phrasesToLearn: Phrases | undefined;
  setPhrasesToLearn: (phrases: Phrases) => void;
};

const PhrasesContext = createContext<PhrasesContextType | undefined>(undefined);

const PhrasesProvider = ({children}: {children: ReactNode}) => {
  const [phrasesToLearn, setPhrasesToLearn] = useState<Phrases>();

  useEffect(() => {
    getPhrases().then(setPhrasesToLearn);
  }, []);

  return (
    <PhrasesContext.Provider
      value={{
        phrasesToLearn,
        setPhrasesToLearn,
      }}>
      {children}
    </PhrasesContext.Provider>
  );
};

const usePhrases = (): PhrasesContextType => {
  const context = useContext(PhrasesContext);
  if (!context) {
    throw new Error('usePhrases must be used within a PhrasesProvider');
  }
  return context as PhrasesContextType;
};

export {PhrasesProvider, usePhrases};
