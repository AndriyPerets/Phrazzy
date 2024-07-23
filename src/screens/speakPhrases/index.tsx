import {StackScreenProps} from '@react-navigation/stack';
import {MainStackParamList} from '../../navigation/MainStack';
import React, {FC, useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {WHITE} from '../../colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Phrases} from '../../asyncStorageApi/phrases';
import CardItem from '../../components/base/CardItem';
import Swiper from 'react-native-deck-swiper';
import {usePhrases} from '../../hook/useSavePhrases';

type SpeakPhrasesNavigationProp = StackScreenProps<
  MainStackParamList,
  'SpeakPhrases'
>;

const SpeakPhrases: FC<SpeakPhrasesNavigationProp> = () => {
  const safeAreaInsets = useSafeAreaInsets();
  const swiperRef = useRef<Swiper<Phrases> | null>(null);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const {phrasesToLearn} = usePhrases();

  const resetTimer = () => {
    if (timer) {
      clearInterval(timer);
    }
    const newTimer = setInterval(() => {
      if (swiperRef.current) {
        swiperRef.current.swipeRight();
      }
    }, 3000);
    setTimer(newTimer);
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, []);

  return (
    <View
      style={[styles.container, {paddingBottom: safeAreaInsets.bottom + 16}]}>
      <Swiper
        ref={swiperRef}
        cards={phrasesToLearn as Phrases[]}
        renderCard={(card: Phrases) => (
          <CardItem
            item={{value: card, label: card.toString()}}
            isSelected={false}
          />
        )}
        backgroundColor={'transparent'}
        stackSize={2}
        infinite
      />
    </View>
  );
};

export default SpeakPhrases;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
    gap: 12,
    paddingHorizontal: 16,
  },
});
