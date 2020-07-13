import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Text, Alert} from 'react-native';
import {Title, Container, Form, FormInput, SubmitButton} from './styles';
import Background from '../../../components/Background/Background';
import {appColors} from '../../../utils/appColors';
import {completeProfileRequest} from '../../../appStore/appModules/user/actions';

const formSchema = Yup.object().shape({
  cpf: Yup.string()
    .trim()
    .required('Obrigatório')
    .length(14, 'O CPF deve ter 11 dígitos'),
  phone: Yup.string()
    .trim()
    .required('Obrigatório')
    .length(16, 'o Celular deve ter no mínimo 13 dígitos'),
});

export default function CompleteRegister({navigation}) {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);
  const loading = useSelector(state => state.user.loading);
  const cards = useSelector(state => state.creditcard.cards);
  const initialValues = {phone: profile?.phone, cpf: profile?.cpf};
  function TestaCPF(strCPF) {
    let Soma;
    let Resto;
    Soma = 0;
    if (
      strCPF == '00000000000' ||
      strCPF == '11111111111' ||
      strCPF == '22222222222' ||
      strCPF == '33333333333' ||
      strCPF == '44444444444' ||
      strCPF == '55555555555' ||
      strCPF == '66666666666' ||
      strCPF == '77777777777' ||
      strCPF == '99999999999' ||
      strCPF == '88888888888'
    )
      return false;

    for (i = 1; i <= 9; i++)
      Soma += parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if (Resto == 10 || Resto == 11) Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10))) return false;

    Soma = 0;
    for (i = 1; i <= 10; i++)
      Soma += parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if (Resto == 10 || Resto == 11) Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11))) return false;
    return true;
  }
  const onSubmit = (values, isValid) => {
    const {cpf, phone} = values;
    if (cpf && cpf.length > 0 && phone && phone.length > 0) {
      const phoneFormatted = `${phone
        .replace('(', '')
        .replace(')', '')
        .replace('-', '')}`;
      const teste = TestaCPF(
        cpf.replace('.', '').replace('.', '').replace('-', ''),
      );
      if (!teste) {
        Alert.alert('Erro', 'CPF inválido');
      }
      if (isValid && teste) {
        dispatch(completeProfileRequest({cpf, phone: phoneFormatted}));
        if (new Date(profile.payDay).getTime() < new Date().getTime()) {
          if (!loading) {
            if (cards && cards.length > 0) {
              navigation.navigate('CardList');
            } else {
              navigation.navigate('Plans', {checkEasy: false});
            }
          }
        }
      }
    }
  };

  return (
    <Background>
      <Container>
        <Title>Completar cadastro</Title>
        <Formik initialValues={initialValues} validationSchema={formSchema}>
          {({
            values,
            isValid,
            handleChange,
            setFieldTouched,
            touched,
            errors,
          }) => (
            <Form>
              <FormInput
                icon="person-outline"
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="Digite seu CPF"
                name="cpf"
                typeInput="mask"
                typeMask="cpf"
                returnKeyType="next"
                value={values.cpf}
                onBlur={() => setFieldTouched('cpf')}
                onChangeText={handleChange('cpf')}
              />
              {touched.cpf && errors.cpf && (
                <Text
                  style={{
                    fontSize: 12,
                    marginBottom: 10,
                    color: appColors.red,
                  }}>
                  {errors.cpf}
                </Text>
              )}
              <FormInput
                icon="person-outline"
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="Digite seu Celular"
                name="phone"
                typeInput="mask"
                typeMask="phone"
                returnKeyType="next"
                value={values.phone}
                onBlur={() => setFieldTouched('phone')}
                onChangeText={handleChange('phone')}
              />
              {touched.phone && errors.phone && (
                <Text
                  style={{
                    fontSize: 12,
                    marginBottom: 10,
                    color: appColors.red,
                  }}>
                  {errors.phone}
                </Text>
              )}
              <SubmitButton
                loading={loading}
                onPress={() => onSubmit(values, isValid)}>
                {profile.cpf && profile.phone ? 'Editar' : 'Completar cadastro'}
              </SubmitButton>
            </Form>
          )}
        </Formik>
      </Container>
    </Background>
  );
}
