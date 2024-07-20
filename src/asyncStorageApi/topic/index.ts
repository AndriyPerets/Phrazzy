import AsyncStorage from '@react-native-async-storage/async-storage';

const TOPIC = 'TOPIC';

export type Topic =
  | 'General'
  | 'Technology'
  | 'Science'
  | 'Business'
  | 'Health'
  | 'Sports'
  | 'Entertainment'
  | 'Education'
  | 'Travel'
  | 'Food';

const TOPIC_LIST: Topic[] = [
  'General',
  'Technology',
  'Science',
  'Business',
  'Health',
  'Sports',
  'Entertainment',
  'Education',
  'Travel',
  'Food',
];

const getTopicKey = async () => {
  const topic = await AsyncStorage.getItem(TOPIC);
  return topic as Topic | undefined;
};

const saveTopic = async (topic: string) => {
  await AsyncStorage.setItem(TOPIC, topic);
};

const getTopic = async () => {
  return await getTopicKey();
};

export {TOPIC_LIST, saveTopic, getTopic};
