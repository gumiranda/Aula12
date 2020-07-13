import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';
import {appColors} from '../../utils/appColors';

export const Container = styled(RectButton)`
  height: 40px;
  width: 250px;
  border-radius: 4px;
  justify-content: center;
`;

export const Text = styled.Text`
  color: ${appColors.white};
  font-weight: bold;
  font-size: 16px;
  align-self: center;
`;
