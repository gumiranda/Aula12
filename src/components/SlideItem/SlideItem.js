import React from 'react';
import {Text, View, TouchableHighlight} from 'react-native';
import styles from './styles';

const SlideItem = ({services, servicePrice, onPress}) => {
  return (
    <TouchableHighlight onPress={() => onPress(servicePrice)}>
      <View style={styles.slide}>
        <View style={styles.priceContainer}>
          <Text style={styles.text}>R${servicePrice}</Text>
          <Text style={styles.textPerMonth}>Por Mês</Text>
        </View>
        <View style={styles.servicesContainer}>
          {services.map(item => (
            <Text key={item.id} style={styles.headerText}>
              {item.text}
            </Text>
          ))}
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default SlideItem;
