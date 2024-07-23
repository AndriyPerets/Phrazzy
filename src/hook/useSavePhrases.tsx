import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import {getPhrases, getPhrasesByTopic} from '../asyncStorageApi/phrases';
import {useLanguage} from './useLanguage';
import {useTopic} from './useSaveTopics';

type PhrasesContextType = {
  phrasesToLearn: string[] | null;
  setPhrasesToLearn: (phrases: string[] | null) => void;
  availablePhrases: string[];
};

const PhrasesContext = createContext<PhrasesContextType | undefined>(undefined);

const PhrasesProvider = ({children}: {children: ReactNode}) => {
  const [phrasesToLearn, setPhrasesToLearn] = useState<string[] | null>(null);
  const [availablePhrases, setAvailablePhrases] = useState<string[]>([]);
  const {languageToLearn} = useLanguage();
  const {topicToLearn} = useTopic();

  useEffect(() => {
    if (languageToLearn && topicToLearn) {
      const phrases = getPhrasesByTopic(languageToLearn, topicToLearn);
      setAvailablePhrases(phrases);
      getPhrases(topicToLearn, languageToLearn).then(phrases => {
        setPhrasesToLearn(phrases);
      });
    }
  }, [languageToLearn, topicToLearn]);

  return (
    <PhrasesContext.Provider
      value={{
        phrasesToLearn,
        setPhrasesToLearn,
        availablePhrases,
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
