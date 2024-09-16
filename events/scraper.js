const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeKanji() {
  try {
    const {data} = await axios.get("https://nihongodera.com/daily_kanji", {
      method: 'GET',
    })
    const $ = cheerio.load(data);
    const getKanji = $("section.daily__today").find(".daily-kanji-tile__link");
    const kanjiLink = $(getKanji.get(0)).attr("href")
    const result = kanjiLink.slice(-1);
    return result;
  } catch(err) {
    console.log(err)
  }
}

exports.scrapeKanji = scrapeKanji