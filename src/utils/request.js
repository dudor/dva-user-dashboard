import fetch from 'dva/fetch';

let totalCount = 5;

function parseJSON(response) {
  if (response.headers.get('x-total-count')) {
    totalCount = response.headers.get('x-total-count');
  }
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => { console.log(data); return { data, headers: { totalCount } } })
    .catch(err => ({ err }));
}
