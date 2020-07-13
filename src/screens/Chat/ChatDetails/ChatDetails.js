/* eslint-disable no-restricted-syntax */
import React, {useEffect, useState, useMemo} from 'react';
import {View, Alert} from 'react-native';
import {withNavigationFocus} from 'react-navigation';
import socketio from 'socket.io-client';
import {GiftedChat} from 'react-native-gifted-chat';
import {useSelector} from 'react-redux';
import Background from '../../../components/Background/Background';
import api from '../../../services/api';
import {Title} from './styles';

function ChatDetails({navigation}) {
  const [recvMessages, setRecvMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [newCount, setNewCount] = useState(0);
  const [destinatario, setDestinatario] = useState(
    navigation.getParam('destinatario'),
  );

  const profile = useSelector(state => state.user.profile);
  const socket = useMemo(() => {
    return socketio('https://devdoido.herokuapp.com', {
      query: {user_id: profile._id},
    });
  }, [profile]);

  useEffect(
    () => {
      async function getMessages() {
        try {
          if (navigation.getParam('chatId')) {
            const msgs = await api.get(
              `chat/${navigation.getParam('chatId')}/page/${page}`,
            );
            if (msgs.data && msgs.data.messages) {
              setCount(msgs.data.countMessages);
              if (page > 1) {
                const msgsMerged = [
                  ...recvMessages,
                  ...msgs.data.messages.reverse(),
                ];
                const mapa = new Map();
                for (const x of msgsMerged) {
                  mapa.set(x._id, x);
                }
                const final = [...mapa.values()];
                setRecvMessages(final);
                GiftedChat.append([], final);
              } else if (recvMessages.length === 0) {
                setRecvMessages(prevState =>
                  GiftedChat.append(prevState, msgs.data.messages.reverse()),
                );
              }
            }
          } else {
            navigation.goBack();
          }
        } catch (e) {
          Alert.alert('', 'Erro no carregamento das mensagens');
        }
      }
      getMessages();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [page],
  );

  useEffect(() => {
    socket.on('response', data => {
      setRecvMessages(prevState => GiftedChat.append(prevState, data));
      setCount(prevState => prevState + 1);
      setNewCount(prevState => prevState + 1);
    });
  }, [socket]);
  async function onSend(messages) {
    try {
      await api.put(`chat/send/${navigation.getParam('chatId')}`, {
        text: messages[0].text,
      });
      setCount(prevState => prevState + 1);
      setNewCount(prevState => prevState + 1);
      setRecvMessages(prevState => GiftedChat.append(prevState, messages));
    } catch (e) {
      Alert.alert('', 'Erro no envio da mensagem');
    }
  }
  async function loadMoreMessage() {
    const limit = count / 20;

    if (20 * page >= recvMessages.length - newCount && page < limit) {
      setPage(prevState => {
        setPage(prevState + 1);
      });
    }
  }
  return (
    <Background>
      <View style={{flex: 1}}>
        <Title>{destinatario.nome}</Title>
        <GiftedChat
          renderUsernameOnMessage
          messages={recvMessages}
          listViewProps={{
            scrollEventThrottle: 400,
            onScroll: ({nativeEvent}) => {
              const {
                layoutMeasurement,
                contentOffset,
                contentSize,
              } = nativeEvent;
              const paddingToTop = 80;
              const tamanhoDaTela =
                contentSize.height - layoutMeasurement.height - paddingToTop;
              const ondeEuTo = contentOffset.y;
              if (tamanhoDaTela <= ondeEuTo) {
                loadMoreMessage();
              }
            },
          }}
          onSend={messages => onSend(messages)}
          user={{_id: profile._id}}
        />
      </View>
    </Background>
  );
}
// ChatDetails.navigationOptions = {
//   title: 'aaaaa',
// };
export default withNavigationFocus(ChatDetails);
