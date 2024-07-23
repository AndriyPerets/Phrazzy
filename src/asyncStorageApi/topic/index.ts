import AsyncStorage from '@react-native-async-storage/async-storage';
import {Language} from '../language';

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

export const TOPICS: Record<Language, Record<Topic, string>> = {
  English: {
    General: 'General',
    Technology: 'Technology',
    Science: 'Science',
    Business: 'Business',
    Health: 'Health',
    Sports: 'Sports',
    Entertainment: 'Entertainment',
    Education: 'Education',
    Travel: 'Travel',
    Food: 'Food',
  },
  Spanish: {
    General: 'General',
    Technology: 'Tecnología',
    Science: 'Ciencia',
    Business: 'Negocios',
    Health: 'Salud',
    Sports: 'Deportes',
    Entertainment: 'Entretenimiento',
    Education: 'Educación',
    Travel: 'Viaje',
    Food: 'Comida',
  },
  French: {
    General: 'Général',
    Technology: 'Technologie',
    Science: 'Science',
    Business: 'Affaires',
    Health: 'Santé',
    Sports: 'Sports',
    Entertainment: 'Divertissement',
    Education: 'Éducation',
    Travel: 'Voyage',
    Food: 'Nourriture',
  },
  German: {
    General: 'Allgemein',
    Technology: 'Technologie',
    Science: 'Wissenschaft',
    Business: 'Geschäft',
    Health: 'Gesundheit',
    Sports: 'Sport',
    Entertainment: 'Unterhaltung',
    Education: 'Bildung',
    Travel: 'Reise',
    Food: 'Lebensmittel',
  },
  Italian: {
    General: 'Generale',
    Technology: 'Tecnologia',
    Science: 'Scienza',
    Business: 'Affari',
    Health: 'Salute',
    Sports: 'Sport',
    Entertainment: 'Intrattenimento',
    Education: 'Educazione',
    Travel: 'Viaggio',
    Food: 'Cibo',
  },
  Portuguese: {
    General: 'Geral',
    Technology: 'Tecnologia',
    Science: 'Ciência',
    Business: 'Negócios',
    Health: 'Saúde',
    Sports: 'Esportes',
    Entertainment: 'Entretenimento',
    Education: 'Educação',
    Travel: 'Viagem',
    Food: 'Comida',
  },
  Russian: {
    General: 'Общий',
    Technology: 'Технология',
    Science: 'Наука',
    Business: 'Бизнес',
    Health: 'Здоровье',
    Sports: 'Спорт',
    Entertainment: 'Развлечения',
    Education: 'Образование',
    Travel: 'Путешествие',
    Food: 'Еда',
  },
  Japanese: {
    General: '一般的',
    Technology: '技術',
    Science: '科学',
    Business: 'ビジネス',
    Health: '健康',
    Sports: 'スポーツ',
    Entertainment: 'エンターテインメント',
    Education: '教育',
    Travel: '旅行',
    Food: '食べ物',
  },
};

const getTopicsByLanguage = (language: Language): string[] => {
  return Object.values(TOPICS[language]);
};

const getTopic = async (language: Language) => {
  const topicKey = `${TOPIC}_${language}`;
  return await AsyncStorage.getItem(topicKey);
};

const saveTopic = async (topic: Topic, language: Language) => {
  const topicKey = `${TOPIC}_${language}`;
  await AsyncStorage.setItem(topicKey, topic);
};

export {getTopicsByLanguage, saveTopic, getTopic};
