import React from 'react';
import {View, StyleSheet} from 'react-native';
import {CardView} from 'react-native-credit-card-input';
import {RectButton} from 'react-native-gesture-handler';
import appMetrics from '../../utils/appMetrics';
import {appColors} from '../../utils/appColors';

const ratio = 228 / 362;
export const CARD_WIDTH = appMetrics.DEVICE_WIDTH * 0.83;
export const CARD_HEIGHT = CARD_WIDTH * ratio;
const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: appColors.transparent,
  },
});

export default ({cardNumber, name, brand, _id, onPress}) => {
  return (
    <RectButton onPress={() => onPress(_id, brand, cardNumber, name)}>
      <View style={styles.card}>
        <CardView
          scale={0.94}
          brand={brand === 'mastercard' ? 'master-card' : brand}
          name={name}
          number={cardNumber}
        />
      </View>
    </RectButton>
  );
};
