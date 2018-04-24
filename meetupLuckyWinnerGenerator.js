const axios = require('axios');

/**
 * Method to generate one lucky winner from the passed Meetup and eventId
 * @param {Object} options 
 * @param {String} options.meetup
 * @param {Number} options.eventId
 */
module.exports.generateOneLuckyWinner = (options) => {
  return axios.get(`https://api.meetup.com/${options.meetup}/events/${options.eventId}/rsvps?key=${process.env.API_KEY}`)
    .then(response => {
      const attendees = response.data;
      const numberOfAttendees = attendees.length;

      return attendees[Math.ceil(Math.random() * numberOfAttendees)];
    });
};