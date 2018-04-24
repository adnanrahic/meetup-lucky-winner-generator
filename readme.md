# Meetup Lucky Winner Generator
A simple package for generating lucky winners if there is a free coupon giveaway at a Meetup event!

## Usage
- install `dotenv`
- add a `.env` file
- add your API_KEY (can get it here), MEETUP name, and EVENT_ID to the `.env` file
- require the module in your files
- call the `generateOneLuckyWinner` method with the appropriate options to get one name returned

## Sample
```js
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
```