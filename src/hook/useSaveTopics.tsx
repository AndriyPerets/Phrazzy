import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import {getTopic, Topic} from '../asyncStorageApi/topic';

type TopicContextType = {
  topicToLearn: Topic | undefined;
  setTopicToLearn: (topic: Topic) => void;
};

const TopicContext = createContext<TopicContextType | undefined>(undefined);

const TopicProvider = ({children}: {children: ReactNode}) => {
  const [topicToLearn, setTopicToLearn] = useState<Topic>();

  useEffect(() => {
    getTopic().then(setTopicToLearn);
  }, []);

  return (
    <TopicContext.Provider
      value={{
        topicToLearn,
        setTopicToLearn,
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
