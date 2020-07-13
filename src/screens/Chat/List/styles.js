import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
`;
export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {padding: 30},
})`
  flex: 1;
`;
export const SignLinkText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`;
export const CardUser = styled.View`
  margin-bottom: 15px;
  padding: 30px;
  border-radius: 4px;
  background: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
export const Left = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
export const Info = styled.View`
  margin-left: 15px;
`;
export const Avatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

export const Name = styled.Text`
  font-weight: bold;
  font-size: 14px;
  color: #333;
`;
