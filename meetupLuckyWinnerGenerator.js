const https = require('https');

/**
 * Method to generate one lucky winner from the passed Meetup and eventId
 * @param {Object} options 
 * @param {String} options.meetup
 * @param {Number} options.eventId
 * @param {Number} options.apiKey
 */
module.exports.generateOneLuckyWinner = (options) => {
  return getMeetupEventRSVPs(options)
    .then(attendees => {
      const numberOfAttendees = attendees.length;
      return attendees[Math.ceil(Math.random() * numberOfAttendees)];
    });
};

module.exports.generateThreeLuckyWinners = (options) => {
  return getMeetupEventRSVPs(options)
    .then(attendees => {
      const numberOfAttendees = attendees.length;
      const luckyWinners = [];
      for (let index = 0; index < 3; index++) {
        luckyWinners.push(attendees[Math.ceil(Math.random() * numberOfAttendees)]);
      }
      return luckyWinners;
    });
};


/**
 * HTTP request abstracton to fetch data from the Meetup API.
 * @param {Object} options 
 */
function getMeetupEventRSVPs(options) {
  return new Promise(function (resolve, reject) {

    https.get(`https://api.meetup.com/${options.meetup}/events/${options.eventId}/rsvps?key=${options.apiKey}`, (res) => {
      const { statusCode } = res;
      const contentType = res.headers['content-type'];

      let error;
      if (statusCode !== 200) {
        error = new Error('Request Failed.\n' +
          `Status Code: ${statusCode}`);
      } else if (!/^application\/json/.test(contentType)) {
        error = new Error('Invalid content-type.\n' +
          `Expected application/json but received ${contentType}`);
      }
      if (error) {
        console.error(error.message);
        res.resume();
        return reject(error);
      }

      res.setEncoding('utf8');
      let rawData = '';
      res.on('data', (chunk) => { rawData += chunk; });
      res.on('end', () => {
        try {
          const parsedData = JSON.parse(rawData);
          resolve(parsedData);
        } catch (e) {
          console.error(e.message);
          reject(e);
        }
      });
    }).on('error', (e) => {
      console.error(`Got error: ${e.message}`);
      reject(e);
    });

  });
}