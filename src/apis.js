/**
 * Zomato api
 */

import axios from 'axios';
import qs from 'querystring';

console.log('@@ KEY', process.env.ZOMATO_API_KEY);

axios.defaults.headers.common['user-key'] = process.env.ZOMATO_API_KEY;

// Sydney is 260
export const fetchCities = city =>
  axios.get(`https://developers.zomato.com/api/v2.1/cities?q=${city}`);

// entity_id=260&count=50&radius=3000
export const fetchRestuarants = params => {
  const overriden = {
    ...params,
    count: 50,
    entity_type: 'city',
    entity_id: 260, // Always sydney
    radius: 3000
  };

  return axios.get(
    `https://developers.zomato.com/api/v2.1/search?${qs.stringify(overriden)}`
  );
};

export const fetchImage = (q = 'restaurant') =>
  axios.get(
    `https://pixabay.com/api/?key=${
      process.env.PIXEL_API_KEY
    }&q=${q}&image_type=photo&pretty=true`
  );
