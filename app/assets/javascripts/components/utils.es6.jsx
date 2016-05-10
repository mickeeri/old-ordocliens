
function makePutRequest(url, payload, subToPublish) {
  $.ajax({
    url,
    dataType: 'json',
    type: 'PUT',
    data: payload,
    success: () => {
      PubSub.publish(subToPublish);
    },

    error: (xhr) => {
      console.error(xhr.responseText, xhr.status, xhr.statusText);
    },
  });
}

function makePostRequest(url, payload, action) {
  $.post(url, payload, res => {
    if (action === 'redirect') {
      window.location = res.link;
    } else {
      PubSub.publish(action);
    }
  })
  .fail(xhr => {
    console.error(xhr.responseText, xhr.status, xhr.statusText);
  });
}

function makeGetRequest(url) {
  return $.ajax({
    url,
    dataType: 'json',
    cache: false,
  });
}

function makeDeleteRequest(url) {
  return $.ajax({
    url,
    method: 'DELETE',
  });
}
