import React, {useState} from 'react';
import {Alert, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {CardView} from 'react-native-credit-card-input';
import api from '../../../services/api';
import {completeProfileRequest} from '../../../appStore/appModules/user/actions';
import {SubmitButton, Title} from './styles';
import Background from '../../../components/Background/Background';

export default function CheckoutEasy({navigation}) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const profile = useSelector(state => state.user.profile);
  async function handleSubmit() {
    const card_id = navigation.getParam('card_id');
    const value = navigation.getParam('value');
    try {
      if (count === 0) {
        setLoading(true);
        const response = await api.post('transaction', {card_id, value});
        if (response.data) {
          const {cpf, phone} = profile;
          dispatch(completeProfileRequest({cpf, phone}));
          Alert.alert(
            'Pagamento feito com sucesso',
            'Seu acesso à plataforma está liberado',
          );
          setLoading(false);
          setCount(prev => prev + 1);
          navigation.navigate('CardList', {goToHome: true});
        }
      }
    } catch (e) {
      setLoading(false);
      Alert.alert('Erro', 'Pagamento falhou');
    }
  }

  return (
    <Background>
      <Title>Detalhes do pagamento</Title>
      <View style={{alignSelf: 'center'}}>
        <CardView
          scale={0.94}
          brand={
            navigation.getParam('brand') === 'mastercard'
              ? 'master-card'
              : navigation.getParam('brand')
          }
          name={navigation.getParam('name')}
          number={navigation.getParam('cardNumber')}
        />
      </View>
      <Title>Total: R${navigation.getParam('value')}</Title>
      <SubmitButton loading={loading} onPress={() => handleSubmit()}>
        Confirmar pagamento
      </SubmitButton>
    </Background>
  );
}
