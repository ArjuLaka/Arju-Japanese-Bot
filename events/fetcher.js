const axios = require('axios');

async function fetchDetail(kanji) {
  const baseUrl = "https://kanjiapi.dev/v1/kanji/" + kanji;
  const { data } = await axios.get(baseUrl, {
    method: 'GET',
  });
  return data;
  console.log(data);
}

exports.fetchDetail = fetchDetail