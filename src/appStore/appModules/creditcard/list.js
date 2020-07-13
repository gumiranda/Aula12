export function getRequest() {
  return {type: '@creditcard/GET_REQUEST'};
}
export function getFailure() {
  return {type: '@creditcard/GET_FAILURE'};
}
export function getSuccess(cards) {
  return {type: '@creditcard/GET_SUCCESS', payload: {cards}};
}
