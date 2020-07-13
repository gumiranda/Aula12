import produce from 'immer';

const INITIAL_STATE = {cards: [], haveCard: false};

export default function creditcard(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@creditcard/GET_SUCCESS': {
        draft.cards = action.payload.cards;
        draft.haveCard = true;
        break;
      }
      case '@creditcard/GET_FAILURE': {
        draft.haveCard = false;
        break;
      }
      case '@creditcard/GET_REQUEST': {
        draft.haveCard = false;
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.haveCard = false;
        draft.cards = [];
        break;
      }
      default:
    }
  });
}
