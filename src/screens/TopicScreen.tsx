import React, {useCallback, useEffect, useState} from 'react';
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import TheText from '../components/base/TheText';
import {
  BLACK,
  BRIGHTBLUE,
  CYAN,
  EMERALDGREEN,
  EXTRABLUE,
  GRAY,
  LIGHTBLUE,
  LIGHTCYAN,
  LIGHTGRAY,
  LIGHTGREEN,
  LIGHTMAGENTA,
  LIGHTMAROON,
  LIGHTNAVY,
  LIGHTOLIVE,
  LIGHTORANGE,
  LIGHTPINK,
  LIGHTPURPLE,
  LIGHTTEAL,
  LIGHTYELLOW,
  MAROON,
  ORANGE,
  PINK,
  PURPLE,
  TEAL,
  WHITE,
  YELLOW,
} from '../colors';
import {BlackItalic, Regular} from '../fonts';
import VerticalSpace from '../components/base/VerticalSpace';
import CommonButton from '../components/base/CommonButton';
import BackIcon from '../components/svg/back';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BottomStackParamList} from '../navigation/BottomStack';
import SQLite from 'react-native-sqlite-storage';

interface ButtonParams {
  title: string;
  isFullWidth: boolean;
  backgroundColor: string;
  height?: string;
  width?: string;
}

type TopicScreenNavigationProp = StackScreenProps<
  BottomStackParamList,
  'TopicScreen'
>;

const TopicScreen = ({navigation}: TopicScreenNavigationProp) => {
  // const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [db, setDb] = useState<SQLite.SQLiteDatabase | null>(null);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [buttons, setButtons] = useState<ButtonParams[]>([]);
  const backgroundColors = [
    LIGHTGRAY,
    LIGHTGREEN,
    EMERALDGREEN,
    LIGHTBLUE,
    BRIGHTBLUE,
    LIGHTPURPLE,
    PURPLE,
    LIGHTORANGE,
    ORANGE,
    LIGHTYELLOW,
    YELLOW,
    LIGHTPINK,
    PINK,
    LIGHTCYAN,
    CYAN,
    LIGHTMAGENTA,
    LIGHTNAVY,
    LIGHTTEAL,
    TEAL,
    LIGHTOLIVE,
    LIGHTMAROON,
    MAROON,
  ];
  const [refreshing, setRefreshing] = useState(false);
  const topics = [
    'Complex Object using the example of the verb to want. I want you to do',
    'Verbs: "Desire & Action (e.g., \'I want you to...\')"',
    'FoodAndDrink: "Gastronomy & Beverages"',
    'TravelAndTransport: "Voyage & Mobility"',
    'Shopping: "Retail Therapy"',
    'Directions: "Navigational Commands"',
  ];
  const initialPhrases: Record<string, string[]> = {
    'Complex Object using the example of the verb to want. I want you to do': [
      'Phrase 1',
      'Phrase 2',
    ],
    'Verbs: "Desire & Action (e.g., \'I want you to...\')"': [
      'Phrase 3',
      'Phrase 4',
    ],
    'FoodAndDrink: "Gastronomy & Beverages"': ['Phrase 5', 'Phrase 6'],
    'TravelAndTransport: "Voyage & Mobility"': ['Phrase 7', 'Phrase 8'],
    'Shopping: "Retail Therapy"': ['Phrase 9', 'Phrase 10'],
    'Directions: "Navigational Commands"': ['Phrase 11', 'Phrase 12'],
  };

  // Извлекаем выбранную тему из AsyncStorage при монтировании
  // useEffect(() => {
  //   const getSelectedTopic = async () => {
  //     const savedTopic = await AsyncStorage.getItem('selectedTopic');
  //     if (savedTopic) {
  //       setSelectedTopic(savedTopic);
  //     }
  //   };
  //
  //   getSelectedTopic();
  // }, []);

  // Сохраняем выбранную тему в AsyncStorage каждый раз, когда она меняется
  useEffect(() => {
    if (selectedTopic) {
      AsyncStorage.setItem('selectedTopic', selectedTopic);
    }
  }, [selectedTopic]);

  useEffect(() => {
    // Функция для извлечения выбранной темы и списка фраз из AsyncStorage при монтировании компонента
    const getSavedData = async () => {
      const savedTopic = await AsyncStorage.getItem('selectedTopic');
      if (savedTopic) {
        setSelectedTopic(savedTopic);
      }
      // Здесь можно добавить логику для извлечения и установки списка фраз, если это необходимо
    };

    getSavedData();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Place your refresh logic here. For example, re-fetch data or regenerate button params.
    // After the data is refreshed, setRefreshing should be set to false.
    generateButtonParams(); // This will regenerate your button layouts or fetch new data as needed.
    setRefreshing(false); // You might want to move this inside your data fetching logic or a .finally block if using promises.
  }, []);

  const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      // Временно сохраняем элемент i
      const temp = array[i];
      // Меняем местами элементы i и j
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  useEffect(() => {
    loadButtonParams();
  }, []);

  // useEffect(() => {
  //   console.log("Generated Button Titles:");
  //   buttons.forEach(button => {
  //     console.log(button.title);
  //   });
  // }, [buttons]);

  const loadButtonParams = async () => {
    try {
      const storedButtons = await AsyncStorage.getItem('buttonParams');
      if (storedButtons !== null) {
        // Данные найдены и используются
        setButtons(JSON.parse(storedButtons));
      } else {
        // Данные не найдены, генерируем и сохраняем
        generateButtonParams();
      }
    } catch (error) {
      // Обработка возможной ошибки
      console.log(error);
      generateButtonParams(); // В случае ошибки генерируем параметры кнопок
    }
  };

  const saveButtonParams = async (buttonParams: ButtonParams[]) => {
    try {
      const jsonValue = JSON.stringify(buttonParams);
      await AsyncStorage.setItem('buttonParams', jsonValue);
    } catch (error) {
      // Обработка ошибки сохранения
      console.log(error);
    }
  };

  const getButtonWidth = (
    isFullWidth: boolean,
    addExtraHalfWidthButton: boolean,
  ) => {
    if (isFullWidth) {
      return '100%'; // Полная ширина
    } else if (addExtraHalfWidthButton) {
      return '49%'; // Половина ширины, если за ней следует ещё одна кнопка
    } else {
      return '70%'; // Две трети ширины, если это единственная кнопка с неполной шириной
    }
  };

  const generateButtonParams = () => {
    let tempButtons: ButtonParams[] = [];
    let usedTitles = new Set(); // Используем Set для отслеживания уникальности тем
    let shuffledColors = shuffleArray([...backgroundColors]);
    let colorIndex = 0;
    let consecutiveHalfWidthCount = 0;
    let consecutiveFullWidthCount = 0;

    topics.forEach(topic => {
      if (!usedTitles.has(topic)) {
        // Проверяем, не использовалась ли тема ранее
        let addExtraHalfWidthButton = Math.random() < 0.6;
        let isFullWidth;

        if (consecutiveHalfWidthCount >= 3 || consecutiveFullWidthCount === 2) {
          isFullWidth = true;
          consecutiveHalfWidthCount = 0;
        } else {
          isFullWidth = Math.random() > 0.5;
        }

        if (isFullWidth) {
          consecutiveFullWidthCount++;
        } else {
          consecutiveFullWidthCount = 0;
          consecutiveHalfWidthCount++;
        }

        if (consecutiveFullWidthCount > 2) {
          isFullWidth = false;
          consecutiveFullWidthCount = 0;
        }

        if (consecutiveHalfWidthCount === 2) {
          addExtraHalfWidthButton = false;
        }

        const buttonWidth = getButtonWidth(
          isFullWidth,
          addExtraHalfWidthButton,
        );
        let buttonHeight = isFullWidth
          ? undefined
          : `${Math.random() * (140 - 40) + 40}px`;

        tempButtons.push({
          title: topic,
          isFullWidth: isFullWidth,
          backgroundColor: shuffledColors[colorIndex++ % shuffledColors.length],
          height: buttonHeight,
          width: buttonWidth,
        });

        usedTitles.add(topic);

        if (!isFullWidth) {
          consecutiveHalfWidthCount =
            consecutiveHalfWidthCount > 2 ? 0 : consecutiveHalfWidthCount;
        }
      }
    });

    setButtons(tempButtons);
    saveButtonParams(tempButtons);
  };

  const handleTopic = async (topic: string) => {
    setSelectedTopic(topic);
    await AsyncStorage.setItem('selectedTopic', topic);
  };

  const handleNext = () => {
    navigation.navigate('PhraseScreen', {
      topic: selectedTopic,
      phrases: initialPhrases[selectedTopic],
    });
  };

  const handleBack = () => {
    navigation.navigate('LanguageScreen');
  };

  return (
    <View style={styles.container}>
      <VerticalSpace height={70} />
      <View style={styles.title}>
        <TouchableOpacity onPress={handleBack} style={styles.icon}>
          <BackIcon />
        </TouchableOpacity>
        <TheText
          fontFamily={BlackItalic}
          fontSize={16}
          color={BLACK}
          textTransform={'uppercase'}>
          Select a topic
        </TheText>
        <View style={styles.icon} />
      </View>
      <VerticalSpace height={20} />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.buttonsContainer}>
          {buttons.map((button, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.8}
              style={[
                styles.button,
                {
                  backgroundColor: button.backgroundColor,
                  width: getButtonWidth(
                    button.isFullWidth,
                    buttons[index + 1]?.isFullWidth === false,
                  ),
                  ...(button.height && {height: parseInt(button.height, 10)}),
                },
                selectedTopic === button.title && styles.border,
              ]}
              onPress={() => handleTopic(button.title)}>
              <TheText
                fontFamily={Regular}
                fontSize={16}
                color={BLACK}
                lineHeight={20}>
                {button.title}
              </TheText>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <CommonButton
          title={'Next'}
          onPress={handleNext}
          width={'80%'}
          color={selectedTopic !== '' ? BRIGHTBLUE : LIGHTGRAY}
          textColor={BLACK}
          borderColor={GRAY}
        />
      </View>
      <VerticalSpace height={40} />
    </View>
  );
};

export default TopicScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
    alignItems: 'center',
    // borderWidth: 1,
    // borderColor: 'red',
  },
  title: {
    flexDirection: 'row',
    width: '100%',
    height: 60,
    justifyContent: 'space-between',
    alignItems: 'center',
    // borderWidth: 1,
    // borderColor: 'red',
  },
  icon: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
    // borderColor: 'red',
  },
  subTitle: {
    width: '80%',
    height: 40,
    // justifyContent: 'center',
    // borderWidth: 1,
    // borderColor: 'red',
  },
  topic: {
    width: '80%',
    justifyContent: 'center',
    // borderWidth: 1,
    // borderColor: 'red',
  },
  button: {
    // marginHorizontal: 1,
    marginVertical: 2,
    justifyContent: 'center',
    padding: 10,
    borderRadius: 15,
    // borderWidth: 1,
    // borderColor: 'red',
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 80,
    // borderWidth: 1,
    // borderColor: 'red',
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    // borderWidth: 1,
    // borderColor: 'red',
  },
  border: {
    borderWidth: 2,
    borderColor: EXTRABLUE,
  },
});
