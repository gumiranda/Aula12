import React from 'react';
import {Animated, FlatList} from 'react-native';
import CreditCard from '../CreditCard/CreditCard';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const CreditCardList = ({cards, onPress}) => {
  const y = new Animated.Value(0);
  const onScroll = Animated.event([{nativeEvent: {contentOffset: {y}}}], {
    useNativeDriver: true,
  });
  return (
    <AnimatedFlatList
      scrollEventThrottle={16}
      bounces={false}
      data={cards}
      renderItem={({index, item: {cardNumber, brand, name, _id}}) => (
        <CreditCard {...{index, y, cardNumber, brand, name, _id, onPress}} />
      )}
      keyExtractor={item => item.index}
      {...{onScroll}}
    />
  );
};

export default CreditCardList;
