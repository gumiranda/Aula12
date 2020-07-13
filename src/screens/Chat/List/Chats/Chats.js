/* eslint-disable no-restricted-syntax */
import React, {useEffect, useState} from 'react';
import {Alert, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import Background from '../../../../components/Background/Background';
import {Container, Left, Avatar, Info, Name, CardUser, List} from '../styles';
import api from '../../../../services/api';

export default function Chats({navigation}) {
  const [chats, setChats] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const profile = useSelector(state => state.user.profile);

  useEffect(() => {
    async function loadChats() {
      try {
        const response = await api.get(`chat/page/${page}`);
        setCount(response.data.chatsCount);
        const cont = response.data.chatsCount / 10;
        if (response) {
          if (response.data.chats) {
            if (response.data.chats.length > 0) {
              if (page > 1) {
                if (10 * page > chats.length && page < cont) {
                  const chatsMerged = [...chats, ...response.data.chats];
                  const mapa = new Map();
                  for (const x of chatsMerged) {
                    mapa.set(x._id, x);
                  }
                  const final = [...mapa.values()];
                  setChats(final);
                }
              } else if (chats.length === 0) {
                setChats(response.data.chats);
              }
            }
          }
        }
      } catch (e) {
        Alert.alert('', 'Erro ao carregar os chats');
      } finally {
        setLoading(false);
      }
    }
    loadChats();
  }, [page]);
  async function verificaPage(nextPage) {
    const limit = count / 10;
    if (10 * page >= chats.length && page < limit) {
      setPage(nextPage);
    }
  }
  async function refresh() {
    setPage(1);
    setChats([]);
  }
  async function chamaNoChat(item) {
    navigation.push('Details', {
      chatId: item._id,
      destinatario:
        item.userDest._id === profile._id ? item.userRemet : item.userDest,
    });
    refresh();
  }
  return (
    <Background>
      <Container>
        <List
          data={chats}
          onEndReached={() => verificaPage(page + 1)}
          onEndReachedThreshold={0.1}
          refreshing={refreshing}
          onRefresh={() => refresh()}
          keyExtractor={item => String(item._id)}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => chamaNoChat(item)}>
              <CardUser>
                <Left>
                  <Avatar
                    source={{
                      uri: item.photo_url,
                    }}
                  />
                  <Info>
                    <Name>{item.nome}</Name>
                  </Info>
                </Left>
              </CardUser>
            </TouchableOpacity>
          )}
        />
      </Container>
    </Background>
  );
}
