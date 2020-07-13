import React, {useState} from 'react';
import CryptoJS from 'react-native-crypto-js';
import {CreditCardInput} from 'react-native-credit-card-input';
import {Alert} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import api from '../../../services/api';
import {completeProfileRequest} from '../../../appStore/appModules/user/actions';
import {getRequest} from '../../../appStore/appModules/creditcard/list';
import {Container, SubmitButton, Title} from './styles';
import Background from '../../../components/Background/Background';
import generateCardHash from 'react-native-pagarme-card-hash';

export default function PaymentCart({navigation}) {
  const dispatch = useDispatch();
  const [isValid, setIsValid] = useState(false);
  const [cart, setCart] = useState({});
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const profile = useSelector(state => state.user.profile);
  async function handleSubmit() {
    if (isValid) {
      let expiration = `${parseInt(cart.expiry.replace('/', ''))}`;
      if (expiration < 1000) {
        expiration = `0${expiration}`;
      }
      console.tron.log(expiration);
      const numbercart = cart.number.toString().replace(/\s+/g, '');
      const objToEncrypt = JSON.stringify({
        card_number: numbercart,
        card_expiration_date: expiration,
        card_holder_name: cart.name,
        card_cvv: cart.cvc,
      });
      const cardHash = await generateCardHash(
        {
          number: numbercart,
          holderName: cart.name,
          expirationDate: expiration,
          cvv: cart.cvc,
        },
        'chavePAGARME',
      );
      // const card_hash = CryptoJS.AES.encrypt(
      //   objToEncrypt,
      //   'hdfudhuidfhudhudah9d8s8f9d8a98as9d8s9d89as',
      // ).toString();
      const state = navigation.getParam('state');
      const complemento = navigation.getParam('complemento');
      const street = navigation.getParam('street');
      const street_number = navigation.getParam('street_number');
      const city = navigation.getParam('city');
      const zipcode = navigation.getParam('zipcode').replace('-', '');
      const neighborhood = navigation.getParam('neighborhood');
      const value = navigation.getParam('value');
      const {cpf, phone, email} = profile;
      const obj = {
        city,
        name: cart.name,
        state,
        complemento,
        zipcode,
        cardHash,
        neighborhood,
        street,
        email,
        cpf,
        phone,
        street_number,
        value,
      };
      try {
        if (count === 0) {
          setLoading(true);
          const response = await api.post('transaction', obj);
          if (response.data) {
            dispatch(getRequest());
            dispatch(completeProfileRequest({cpf, phone}));

            Alert.alert(
              'Pagamento feito com sucesso',
              'Seu acesso à plataforma do faustão ta liberado',
            );
            setCount(prev => prev + 1);
            setLoading(false);
            navigation.navigate('CardList', {goToHome: true});
          }
        }
      } catch (e) {
        setLoading(false);
        Alert.alert('Erro', 'Pagamento falhou');
      }
    }
  }
  async function getForm(form) {
    if (form.valid) {
      setIsValid(true);
      setCart(form.values);
    }
  }

  return (
    <Background>
      <Title>Detalhes do pagamento</Title>
      <CreditCardInput
        labels={{
          number: 'Número do cartão',
          name: 'Nome do titular',
          expiry: 'Validade',
          cvc: 'CVV',
        }}
        placeholders={{
          number: 'Número do cartão',
          name: 'Nome do titular',
          expiry: 'Validade',
          cvc: 'CVV',
        }}
        inputStyle={{color: 'white'}}
        labelStyle={{color: 'white'}}
        requiresName
        onChange={form => {
          getForm(form);
        }}
      />
      <Container>
        <Title>Total: R${navigation.getParam('value')}</Title>
        <SubmitButton loading={loading} onPress={() => handleSubmit()}>
          Confirmar pagamento
        </SubmitButton>
      </Container>
    </Background>
  );
}
