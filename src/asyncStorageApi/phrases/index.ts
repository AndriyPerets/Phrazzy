import AsyncStorage from '@react-native-async-storage/async-storage';

const PHRASES = 'PHRASES';

export type Phrases =
  | 'Hello'
  | 'Goodbye'
  | 'Yes'
  | 'No'
  | 'Thank you'
  | 'Please'
  | 'Sorry'
  | 'Excuse me'
  | 'I love you'
  | 'I hate you'
  | 'I am hungry';

const PHRASES_LIST: Phrases[] = [
  'Hello',
  'Goodbye',
  'Yes',
  'No',
  'Thank you',
  'Please',
  'Sorry',
  'Excuse me',
  'I love you',
  'I hate you',
  'I am hungry',
];

const getPhrasesKey = async () => {
  const phrases = await AsyncStorage.getItem(PHRASES);
  return phrases as Phrases | undefined;
};

const savePhrases = async (phrases: string) => {
  await AsyncStorage.setItem(PHRASES, phrases);
};

const getPhrases = async () => {
  return await getPhrasesKey();
};

export {PHRASES_LIST, savePhrases, getPhrases};
