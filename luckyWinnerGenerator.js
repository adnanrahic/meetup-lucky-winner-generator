const axios = require('axios');
require('dotenv').config(); 
const apiKey = process.env.API_KEY; // add your api key to the .env
module.exports = (meetup, eventId) => {
  return axios.get(`https://api.meetup.com/${meetup}/events/${eventId}/rsvps?key=${apiKey}`)
    .then(response => {
      const attendees = response.data;
      const numberOfAttendees = attendees.length;

      return attendees[Math.ceil(Math.random() * numberOfAttendees)];
    });
};