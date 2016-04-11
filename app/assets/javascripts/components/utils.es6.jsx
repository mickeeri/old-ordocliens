function _fetch(url, options) {
  return fetch(url, options)
    .then(response=>{
      if (response.status !== 200) {
        console.log('Ett problem uppstod. Status: ' + response.status);
        return;
      }
      return response.json();
    })
    .catch(err=>{
      console.log('Ett problem uppstod: ' + err);    
    });
}

function get(url, options={}) {

  const defaultOptions = {
    headers: {
      'Accept':       'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin'
  };
  // TODO: Object.assign does not work in IE.
  return _fetch(url, Object.assign({}, defaultOptions, options));
}
