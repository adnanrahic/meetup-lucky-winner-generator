const meetupLuckyWinnerGenerator = require('./meetupLuckyWinnerGenerator');

meetupLuckyWinnerGenerator
  .generateOneLuckyWinner({ meetup: 'sarajevo-openweb-meetup', eventId: 247769521 })
  .then(luckyWinner => console.log(luckyWinner.member.name));