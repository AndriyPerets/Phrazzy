import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import TheText from '../components/base/TheText';
import {BLACK, BRIGHTBLUE, GRAY, LIGHTGRAY, WHITE} from '../colors';
import VerticalSpace from '../components/base/VerticalSpace';
import BackIcon from '../components/svg/back';
import {BlackItalic} from '../fonts';
import CommonButton from '../components/base/CommonButton';
import {BottomStackParamList} from '../navigation/BottomStack';
import {StackScreenProps} from '@react-navigation/stack';
import CommonInput from '../components/base/CommonInput';
import useSavePhrases from '../hook/useSavePhrases';

type PhraseScreenNavigationProp = StackScreenProps<
  BottomStackParamList,
  'PhraseScreen'
>;

const PhraseScreen = ({navigation, route}: PhraseScreenNavigationProp) => {
  const [selectedPhrases, setSelectedPhrases] = useState<string[]>([]);
  const [editPhraseIndex, setEditPhraseIndex] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>('');
  const [isAddingNewPhrase, setIsAddingNewPhrase] = useState(false);
  const [phrases, setPhrases] = useState<string[]>(route.params?.phrases || []);
  const [isLoading, setIsLoading] = useState(true);
  const [updateTrigger, setUpdateTrigger] = useState(0);

  const {saveEdit, addPhrase, getPhrasesByTopic, deletePhrase, isDbReady} =
    useSavePhrases();

  // useEffect(() => {
  //   console.log('PhraseScreen: selectedPhrases:', selectedPhrases);
  // }, [selectedPhrases]);

  useEffect(() => {
    async function loadPhrases() {
      if (route.params?.topic && isDbReady) {
        try {
          setIsLoading(true);
          getPhrasesByTopic(route.params.topic, loadedPhrases => {
            setPhrases(loadedPhrases);
            setIsLoading(false);
          });
        } catch (error) {
          console.error('Failed to load phrases:', error);
        }
      }
    }

    loadPhrases();
  }, [route.params.topic, isDbReady, updateTrigger]);

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={BRIGHTBLUE} />
      </View>
    );
  }

  const handlePhrase = (phrase: string) => {
    if (selectedPhrases.includes(phrase)) {
      setSelectedPhrases(
        selectedPhrases.filter((item: string) => item !== phrase),
      );
    } else {
      setSelectedPhrases([...selectedPhrases, phrase]);
    }
  };

  const handleNext = () => {
    if (selectedPhrases.length > 0) {
      navigation.navigate('SpeakScreen', {selectedPhrases});
    }
  };

  const handleBack = () => {
    navigation.navigate('TopicScreen');
  };

  const handleEditPhrase = (index: number) => {
    setEditPhraseIndex(index);
    setEditText(phrases[index]);
  };

  const applyEdit = async (index: number) => {
    if (index === null || phrases[index] === undefined) {
      return;
    }

    const oldPhrase = phrases[index];
    try {
      await saveEdit(route.params.topic, oldPhrase, editText);
      phrases[index] = editText; // Update the phrase locally
      setSelectedPhrases([...selectedPhrases]); // Trigger re-render
      console.log('Edit saved successfully.');
    } catch (error) {
      console.error('Failed to save edit:', error);
    }

    setEditPhraseIndex(null);
    setEditText('');
  };

  // const applyEdit = (index: number) => {
  //   if (index === null || phrases[index] === undefined) {
  //     return;
  //   }
  //
  //   const oldPhrase = phrases[index];
  //
  //   const updatedPhrases = [...phrases];
  //   updatedPhrases[index] = editText;
  //
  //   const updatedSelectedPhrases = [...selectedPhrases];
  //   const selectedIndex = updatedSelectedPhrases.indexOf(oldPhrase);
  //
  //   if (selectedIndex !== -1) {
  //     updatedSelectedPhrases[selectedIndex] = editText;
  //   } else {
  //     updatedSelectedPhrases.push(editText);
  //   }
  //
  //   setSelectedPhrases(updatedSelectedPhrases);
  //   saveEdit(route.params.topic, oldPhrase, editText);
  //
  //   setEditPhraseIndex(null);
  //   setEditText('');
  // };

  // const cancelEdit = () => {
  //   setEditPhraseIndex(null);
  // };

  const handleAddPhraseButton = () => {
    setIsAddingNewPhrase(true);
  };

  const handleAddPhrase = () => {
    if (editText.trim()) {
      const newTopic = route.params.topic;
      addPhrase(newTopic, editText.trim());
      const updatedPhrases = [...phrases, editText.trim()];
      setPhrases(updatedPhrases);
      phrases.push(editText.trim());
      setEditText('');
      setIsAddingNewPhrase(false);
    }
  };

  const handleDeletePhrase = (phrase: string) => {
    const updatedPhrases = phrases.filter(item => item !== phrase);
    setPhrases(updatedPhrases);
    deletePhrase(route.params.topic, phrase);
    setUpdateTrigger(updateTrigger + 1);
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}>
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
            Select phrases
          </TheText>
          <View style={styles.icon} />
        </View>
        <View style={styles.flatlistContainer}>
          <FlatList
            data={phrases}
            keyExtractor={item => item}
            renderItem={({item, index}) => (
              <View style={styles.topic}>
                {editPhraseIndex === index ? (
                  <CommonInput
                    placeholder={
                      editPhraseIndex !== null ? phrases[editPhraseIndex] : ''
                    }
                    value={editPhraseIndex === index ? editText : ''}
                    onChangeText={setEditText}
                    borderColor={GRAY}
                    borderRadius={25}
                    width={'80%'}
                    editable={true}
                    saveEdit={() => applyEdit(index)}
                    onFocus={() => setEditText('')}
                  />
                ) : (
                  <CommonButton
                    title={item}
                    onPress={() => handlePhrase(item)}
                    width={'80%'}
                    color={
                      selectedPhrases.includes(item) ? BRIGHTBLUE : LIGHTGRAY
                    }
                    textColor={BLACK}
                    borderRadius={25}
                    editable={true}
                    editPhrase={() => handleEditPhrase(index)}
                    deletePhrase={() => handleDeletePhrase(item)}
                  />
                )}
                <VerticalSpace height={20} />
              </View>
            )}
            ListFooterComponent={
              isAddingNewPhrase ? (
                <>
                  <CommonInput
                    placeholder="Enter new phrase"
                    value={editText}
                    onChangeText={setEditText}
                    borderColor={GRAY}
                    borderRadius={25}
                    width={'80%'}
                    editable={true}
                    saveEdit={() => handleAddPhrase()}
                    onFocus={() => setEditText('')}
                  />
                </>
              ) : null
            }
            contentContainerStyle={styles.scrollViewContent}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <VerticalSpace height={20} />
        <View style={styles.footer}>
          <CommonButton
            title={'Add your own phrase'}
            onPress={handleAddPhraseButton}
            width={'80%'}
            color={BRIGHTBLUE}
            textColor={BLACK}
            borderColor={GRAY}
          />
          <VerticalSpace height={20} />
          <CommonButton
            title={'Next'}
            onPress={handleNext}
            width={'80%'}
            color={selectedPhrases.length > 0 ? BRIGHTBLUE : LIGHTGRAY}
            textColor={BLACK}
            borderColor={GRAY}
            disabled={selectedPhrases.length === 0}
          />
        </View>
        <VerticalSpace height={40} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default PhraseScreen;

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
  flatlistContainer: {
    flex: 1,
    width: '86%',
    height: '62%',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: GRAY,
  },
  scrollViewContent: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 16,
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
  footer: {
    // flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    // borderWidth: 1,
    // borderColor: 'red',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
