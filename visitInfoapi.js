const options = {
    method: "GET",
    headers: {
        "Accept": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        "Authorization": `OAuth,
        oauth_consumer_key="0685bd9184jfhq22",
        oauth_token="ad180jjd733klru7",
        oauth_signature_method="HMAC-SHA1",
        oauth_signature="wOJIO9A2W5mFwDgiDvZbTSMK%2FPY%3D",
        oauth_timestamp="137131200",
        oauth_nonce="4572616e48616d6d65724c61686176",
        oauth_version="1.0"`
    }
};

fetch("https://va.v.liveperson.net/api/account/23979466/monitoring/visitors/QzZWMwZmY5MjI4YjQzNjJk/visits/current/state?v=1&filter=agent&sid=zUbA0zY3R-Sx7pars-tTgA", options )
  .then((response) => response.json())
  .then((data) => console.log(data));