import AsyncStorage from '@react-native-async-storage/async-storage';

const LANGUAGE_TO_LEARN = 'LANGUAGE_TO_LEARN';
const NATIVE_LANGUAGE = 'NATIVE_LANGUAGE';

export type Language =
  | 'English'
  | 'Spanish'
  | 'French'
  | 'German'
  | 'Italian'
  | 'Portuguese'
  | 'Russian'
  | 'Japanese'

const LANGUAGE_LIST: Language[] = [
  'English',
  'Spanish',
  'French',
  'German',
  'Italian',
  'Portuguese',
  'Russian',
  'Japanese',
];

export type LanguageType = 'native' | 'learn';

type SaveLanguageRequest = {
  language: Language;
  type: LanguageType;
};

const getLanguageKey = (type: LanguageType): string => {
  switch (type) {
    case 'learn':
      return LANGUAGE_TO_LEARN;
    case 'native':
      return NATIVE_LANGUAGE;
    default:
      throw new Error('Invalid language type');
  }
};

const saveLanguage = async ({language, type}: SaveLanguageRequest) => {
  const key = getLanguageKey(type);
  await AsyncStorage.setItem(key, language);
};

const getLanguage = async (
  type: LanguageType,
): Promise<Language | undefined> => {
  const key = getLanguageKey(type);
  const language = await AsyncStorage.getItem(key);
  if (language) {
    return language as Language;
  }
};

const removeLanguage = async (type: LanguageType): Promise<void> => {
  const key = getLanguageKey(type);
  await AsyncStorage.removeItem(key);
};

export {saveLanguage, getLanguage, removeLanguage, LANGUAGE_LIST};
