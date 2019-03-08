/**
 * Zomato api
 */

import axios from 'axios';
import qs from 'querystring';

import cuisinesFromSydney from './cached/cuisinesFromSydney.json';

console.log('@@ KEY', process.env.ZOMATO_API_KEY);

axios.defaults.headers.common['user-key'] = process.env.ZOMATO_API_KEY;

// Sydney is 260
export const fetchCities = city =>
  axios.get(`https://developers.zomato.com/api/v2.1/cities?q=${city}`);

export const fetchCuisinesFromSydney = cityId => {
  // return axios.get(`https://developers.zomato.com/api/v2.1/cuisnes?q=${cityId}`);
  // Better format
  const data = cuisinesFromSydney.cuisines.map(cuisine => cuisine.cuisine);
  // Save API calls!!!
  return Promise.resolve({ data });
};

// entity_id=260&count=50&radius=3000
export const fetchRestuarants = params => {
  const overriden = {
    ...params,
    count: 50,
    entity_id: 260, // Always sydney
    radius: 3000
  };

  return axios.get(
    `https://developers.zomato.com/api/v2.1/search?${qs.stringify(overriden)}`
  );
};
