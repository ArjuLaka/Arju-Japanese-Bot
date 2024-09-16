const { scrapeKanji } = require('./events/scraper');
const { fetchDetail } = require('./events/fetcher');
const { Client, GatewayIntentBits } = require('discord.js');
const schedule = require('node-schedule');
require('dotenv').config();

const token = process.env.TOKEN;

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

client.once('ready', () => {
  const channelId = process.env.CHANNEL_ID;
  
  schedule.scheduleJob('50 18 * * *', () => {
    let sendKanji = getKanji();
    sendKanji.then(kanjiMessage => {
      const channel = client.channels.cache.get(channelId);
      if (channel) {
        channel.send(kanjiMessage).then(() => {
          console.log("pesan berhasil dikirim")
        }).catch(console.error)
      } else {
        console.error("channel not found")
      }
    })
  })
  
  schedule.scheduleJob('0 19 * * *', () => {
    let sendKanji = getKanji();
    sendKanji.then(kanjiMessage => {
      const channel = client.channels.cache.get(channelId);
      if (channel) {
        channel.send("# JKW").then(() => {
          console.log("pesan berhasil dikirim")
        }).catch(console.error)
      } else {
        console.error("channel not found")
      }
    })
  })
})

async function getKanji() {
  try {
    let kanji = await scrapeKanji();
    let detailData = await fetchDetail(kanji);
    let finalData = `
    # ${detailData.kanji}
    
    ## JLPT N${detailData.jlpt}
    
    ### Meanings:
    
    ${detailData.meanings}
    ### Kunyomi Reading:
    
    ${detailData.kun_readings}
    ### Onyomi Reading:
    
    ${detailData.on_readings}
    `; 
    return finalData;
  } catch(err) {
    console.log(err)
  }
}

client.login(token);