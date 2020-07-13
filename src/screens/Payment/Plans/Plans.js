import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {Title} from './styles';
import Background from '../../../components/Background/Background';
import Carousel from 'react-native-snap-carousel';
import SlideItem from '../../../components/SlideItem/SlideItem';
import appMetrics from '../../../utils/appMetrics';

export default function Plans({navigation}) {
  const profile = useSelector(state => state.user.profile);
  const slideItems = [
    {
      id: 0,
      servicePrice: 30,
      services: [
        {id: 0, text: 'Chat ilimitado'},
        {id: 1, text: '30 like por dia'},
        {id: 2, text: 'Geolocalização ativada'},
        {id: 3, text: 'Suporte 24 horas'},
      ],
    },
    {
      id: 0,
      servicePrice: 60,
      services: [
        {id: 0, text: 'Chat ilimitado'},
        {id: 1, text: '30 like por dia'},
        {id: 2, text: 'Geolocalização ativada'},
        {id: 3, text: 'Suporte 24 horas'},
      ],
    },
    {
      id: 0,
      servicePrice: 90,
      services: [
        {id: 0, text: 'Chat ilimitado'},
        {id: 1, text: '30 like por dia'},
        {id: 2, text: 'Geolocalização ativada'},
        {id: 3, text: 'Suporte 24 horas'},
      ],
    },
  ];
  const onPress = servicePrice => {
    if (navigation.getParam('checkEasy') === true) {
      const card_id = navigation.getParam('card_id');
      const brand = navigation.getParam('brand');
      const cardNumber = navigation.getParam('cardNumber');
      const name = navigation.getParam('name');

      navigation.push('CheckoutEasy', {
        card_id,
        brand,
        cardNumber,
        name,
        value: servicePrice,
      });
    } else {
      navigation.push('PaymentAddress', {value: servicePrice});
    }
  };

  const renderItem = ({item}) => {
    return (
      <SlideItem
        key={item.id}
        onPress={onPress}
        services={item.services}
        servicePrice={item.servicePrice}
      />
    );
  };
  const itemWidth = appMetrics.DEVICE_WIDTH - 85;

  return (
    <Background>
      <Title>Conheça nossos planos</Title>
      <Carousel
        sliderWidth={appMetrics.DEVICE_WIDTH}
        itemWidth={itemWidth}
        data={slideItems}
        renderItem={renderItem}
        currentIndex={2}
      />
    </Background>
  );
}
