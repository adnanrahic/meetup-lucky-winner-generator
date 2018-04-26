const meetupLuckyWinnerGenerator = require('./meetupLuckyWinnerGenerator');

// Set the options for what meetup and event you want to get the lucky winner
require('dotenv').config();
const options = { 
  meetup: process.env.MEETUP, // Add your Meetup here! 
  eventId: process.env.EVENT_ID, // Add your event ID here!
  apiKey: process.env.API_KEY // Add your API KEY!
};

// Generate the lucky winner with the given options
meetupLuckyWinnerGenerator
  .generateOneLuckyWinner(options)
  .then(luckyWinner => console.log(`Today's lucky winner is: ${luckyWinner.member.name}!`))
  .catch(err => console.error('Invalid options.\n', err.stack));

meetupLuckyWinnerGenerator
  .generateThreeLuckyWinners(options)
  .then(luckyWinners => {
    console.log('Today\'s lucky winners are:');
    luckyWinners.forEach(e => {
      console.log(' - ' + e.member.name);
    });
  })
  .catch(err => console.error('Invalid options.\n', err.stack));