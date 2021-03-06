![dependencies](https://img.shields.io/badge/dependencies-0-brightgreen.svg)
![contributors](https://img.shields.io/badge/contributors-1-blue.svg)
![license](https://img.shields.io/github/license/mashape/apistatus.svg)
![license](https://img.shields.io/badge/eslint-default-yellowgreen.svg)

# Meetup Lucky Winner Generator
A simple package with zero dependencies for generating lucky winners if there is a free coupon giveaway at a Meetup event!

## Website
Check out [the website](http://meetup-lucky-winner-generator.surge.sh/) for quick use.

## Usage
- Install `dotenv`
- Add a `.env` file
- Add your `API_KEY` (can get it [here](https://secure.meetup.com/meetup_api/key/)), `MEETUP`, `EVENT_ID`, and `NUMBER_OF_WINNERS` to the `.env` file
- Require the module in your files
- Call the `generateOneLuckyWinner`, `generateThreeLuckyWinners`, or `generateCustomLuckyWinners` methods with the appropriate options to get name(s) returned

_**Note**: All values can be added without the use of a `.env` file, but for security reasons, try to keep your `API_KEY` in the `.env`._

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
  eventId: process.env.EVENT_ID, // Add your event ID here!,
  numberOfWinners: process.env.NUMBER_OF_WINNERS, // Add your winner count here!
  apiKey: process.env.API_KEY // Add your API KEY!
};

// Generate the lucky winner with the given options

// One winner
meetupLuckyWinnerGenerator
  .generateOneLuckyWinner(options)
  .then(luckyWinner => console.log(`Today's lucky winner is ${luckyWinner.member.name}!`))
  .catch(err => console.error('Invalid options: ', err.message));

// Three winners
meetupLuckyWinnerGenerator
  .generateThreeLuckyWinners(options)
  .then(luckyWinners => {
    console.log('Today\'s lucky winners are:');
    luckyWinners.forEach(e => {
      console.log(' - ' + e.member.name);
    });
  })
  .catch(err => console.error('Invalid options: ', err.message));

// Custom number of winners
meetupLuckyWinnerGenerator
  .generateCustomLuckyWinners(options)
  .then(luckyWinners => {
    console.log('Today\'s lucky winners are:');
    luckyWinners.forEach(e => {
      console.log(' - ' + e.member.name);
    });
  })
  .catch(err => console.error('Invalid options: ', err.message));
```