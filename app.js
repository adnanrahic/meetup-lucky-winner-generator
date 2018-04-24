require('dotenv').config();
const meetupLuckyWinnerGenerator = require('./meetupLuckyWinnerGenerator');

// Set the options for what meetup and event you want to get the lucky winner
const options = { 
  meetup: 'sarajevo-openweb-meetup', // Add your Meetup here! 
  eventId: 247769521 // Add your event ID here!
};

// Generate the lucky winner with the given options
meetupLuckyWinnerGenerator
  .generateOneLuckyWinner(options)
  .then(luckyWinner => console.log(`Today's lucky winner is: ${luckyWinner.member.name}!`))
  .catch(err => console.error('Invalid options.\n', err.stack));