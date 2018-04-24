const axios = require('axios');
require('dotenv').config(); 
const apiKey = process.env.API_KEY; // add your api key to the .env

/**
 * Method to generate one lucky winner from the passed Meetup and eventId
 * @param {Object} options 
 * @param {String} options.meetup
 * @param {Number} options.eventId
 */
module.exports.generateOneLuckyWinner = (options) => {
  return axios.get(`https://api.meetup.com/${options.meetup}/events/${options.eventId}/rsvps?key=${apiKey}`)
    .then(response => {
      const attendees = response.data;
      const numberOfAttendees = attendees.length;

      return attendees[Math.ceil(Math.random() * numberOfAttendees)];
    });
};