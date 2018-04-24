require('./luckyWinnerGenerator')()
  .then(luckyWinner => 
    console.log(luckyWinner.member.name)
  );