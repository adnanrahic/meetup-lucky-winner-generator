const meetupLuckyWinnerGenerator = require('./meetupLuckyWinnerGenerator');

// Set the options for what meetup and event you want to get the lucky winner
const options = { 
  meetup: 'sarajevo-openweb-meetup', 
  eventId: 247769521 
};

// Generate the lucky winner with the given options
meetupLuckyWinnerGenerator
  .generateOneLuckyWinner(options)
  .then(luckyWinner => console.log(`Today's lucky winner is: ${luckyWinner.member.name}!`));