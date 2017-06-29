$(() => {

  let BASE_URL = '';
  function getBaseURL() {
    if (window.location.hostname == "localhost") {
      BASE_URL = `http://localhost:3000`;
    } else {
      BASE_URL = `https://rocky-shelf-87257.herokuapp.com`
    }
  }

  getBaseURL();

  const PROPERTY_ENDPOINT = BASE_URL + `/api/v1/property`
  const hrefLocation = window.location.href;
  const parsedQueryString = parseQueryString(hrefLocation);
  // createPropertyEndpoint(parsedQueryString);


  $('#update-button').click((event) => {
    event.preventDefault();
    let propertyUpdates = createUpdateObject();
    createPutRequest(PROPERTY_ENDPOINT, propertyUpdates)

  });

  $('#delete-button').click((event) => {
    event.preventDefault();
    createDeleteRequest(`${PROPERTY_ENDPOINT}/${parsedQueryString}`)
  });

  //gathers form input
  function createUpdateObject() {
    return {
      id: parseInt(parsedQueryString),
      address: $('#address').val(),
      rent_price: parseInt($('#rent').val()),
      bedrooms: $('#bedrooms').val(),
      bathrooms: $('#bathrooms').val(),
      square_footage: $('#square-footage').val(),
      image: $('#image').val(),
      location: {
        city: $('#city').val(),
        state: $('#state').val(),
        zip_code: $('#zip').val()
      }
    }
  }


  function createPutRequest(url, propertyUpdates) {
   const propRequest = new Request (url, {
      method: "put",
      mode: 'cors',
      headers: {
        "Accept": "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(propertyUpdates)

    });
    processRequest(propRequest);
  };

  function createDeleteRequest(url) {
   const propRequest = new Request (url, {
      method: "delete"

    });
    processRequest(propRequest);
  };


  function processRequest(request) {
    console.log('going!');
    fetch(request)
      .then(res => {
        res.json()
          .then(json => {
            return json;
          })
      })
      .catch(throwError)
  }

  function confirmation(res) {
    console.log('Completed!');
    return res.json();
  }
})
