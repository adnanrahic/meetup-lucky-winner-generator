# Meetup Lucky Winner Generator
A simple package with zero dependencies for generating lucky winners if there is a free coupon giveaway at a Meetup event!

## Code
Check out the code on [GitHub](https://github.com/adnanrahic/meetup-lucky-winner-generator)!

## Usage
- install `dotenv`
- add a `.env` file
- add your API_KEY (can get it [here](https://secure.meetup.com/meetup_api/key/)), MEETUP name, and EVENT_ID to the `.env` file
- require the module in your files
- call the `generateOneLuckyWinner` or `generateThreeLuckyWinners` method with the appropriate options to get one name returned

## Sample
Install the module.
```bash
$ npm i --save meetup-lucky-winner-generator
```

Add this to the `app.js`.
```js
const meetupLuckyWinnerGenerator = require('meetup-lucky-winner-generator');

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

// Generate three lucky winners immediately
meetupLuckyWinnerGenerator
  .generateThreeLuckyWinners(options)
  .then(luckyWinners => {
    console.log('Today\'s lucky winners are:');
    luckyWinners.forEach(e => {
      console.log(' - ' + e.member.name);
    });
  })
  .catch(err => console.error('Invalid options.\n', err.stack));
```