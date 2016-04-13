function _fetch(url, options) {
  return fetch(url, options)
    .then(response=>{
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      } else {
        console.log('Ett problem uppstod. Status: ' + response.status);
        return;
      }
    })
    .catch(err=>{
      console.log('Ett problem uppstod: ' + err);
    });
}

function get(url) {
  var options = {
    headers: {
      'Accept':       'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin'
  };

  return _fetch(url, options);
}
