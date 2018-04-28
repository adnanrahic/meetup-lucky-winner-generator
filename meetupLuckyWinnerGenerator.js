const https = require('https');

/**
 * Method to generate one lucky winner from the passed Meetup and eventId
 * @param {Object} options 
 * @param {String} options.meetup
 * @param {Number} options.eventId
 * @param {Number} options.apiKey
 */
module.exports.generateOneLuckyWinner = (options) =>
  getMeetupEventRSVPs(options)
    .then(filterOutHosts)
    .then(filterOutOneLuckyWinner)
    .catch(handleError);

module.exports.generateThreeLuckyWinners = (options) =>
  getMeetupEventRSVPs(options)
    .then(filterOutHosts)
    .then(filterOutThreeLuckyWinners)
    .catch(handleError);

module.exports.generateCustomLuckyWinners = (options) =>
  getMeetupEventRSVPs(options)
    .then(filterOutHosts)
    .then(attendees => filterOutCustomLuckyWinners(attendees, options.numberOfWinners))
    .catch(handleError);


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

/**
 * Helpers
 */
function filterOutHosts(attendees) {
  return attendees.filter(a => !a.member.event_context.host);
}
function filterOutOneLuckyWinner(attendees) {
  return attendees[Math.ceil(Math.random() * attendees.length)];
}
function filterOutThreeLuckyWinners(attendees) {
  const threeLuckyWinners = [];
  for (let i = 0; i < 3; i++)
    threeLuckyWinners.push(attendees.splice(Math.ceil(Math.random() * attendees.length), 1).pop());
  return threeLuckyWinners;
}
function filterOutCustomLuckyWinners(attendees, numberOfWinners) {
  if (numberOfWinners > attendees) return Promise.reject(new Error('The number of winners needs to be smaller than the attendees present.'));
  const customLuckyWinners = [];
  for (let i = 0; i < numberOfWinners; i++)
    customLuckyWinners.push(attendees.splice(Math.ceil(Math.random() * attendees.length), 1).pop());
  return customLuckyWinners;
}
function handleError(err) {
  console.error(err.stack);
  return Promise.reject(e.message);
}