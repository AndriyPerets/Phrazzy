import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import {getTopic, Topic, getTopicsByLanguage, TOPICS} from '../asyncStorageApi/topic';
import {useLanguage} from './useLanguage';

type TopicContextType = {
  topicToLearn: Topic | undefined;
  setTopicToLearn: (topic: Topic | undefined) => void;
  availableTopics: string[];
};

const TopicContext = createContext<TopicContextType | undefined>(undefined);

const TopicProvider = ({children}: {children: ReactNode}) => {
  const [topicToLearn, setTopicToLearn] = useState<Topic>();
  const [availableTopics, setAvailableTopics] = useState<string[]>([]);
  const {languageToLearn} = useLanguage();

  useEffect(() => {
    if (languageToLearn) {
      const topics = getTopicsByLanguage(languageToLearn);
      setAvailableTopics(topics);
      getTopic(languageToLearn).then(topic => {
          setTopicToLearn(topic as Topic);
      });
    }
  }, [languageToLearn]);

  return (
    <TopicContext.Provider
      value={{
        topicToLearn,
        setTopicToLearn,
        availableTopics,
      }}>
      {children}
    </TopicContext.Provider>
  );
};

const useTopic = (): TopicContextType => {
  const context = useContext(TopicContext);
  if (!context) {
    throw new Error('useTopic must be used within a TopicProvider');
  }
  return context as TopicContextType;
};

export {TopicProvider, useTopic};
