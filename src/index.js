/**
 * Secret Fuhrer game engine
 */

import axios from 'axios';
import _ from 'lodash';
import express from 'express';
import { fetchCuisinesFromSydney, fetchRestuarants } from './apis';
import bodyParser from 'body-parser';

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

app.post('/cuisines', async (req, res) => {
  const { data } = await fetchCuisinesFromSydney();

  const actions = data.map(cuisine => ({
    name: cuisine.cuisine_name,
    text: cuisine.cuisine_name,
    value: cuisine.cuisine_id,
    type: 'button'
  }));

  res.json({
    text: `Found ${actions.length} cuisines near you`,
    attachments: [
      {
        text: 'Pick your favourite cuisines',
        color: '#3AA3E3',
        attachment_type: 'default',
        callback_id: 'choose_food',
        actions
      }
    ]
  });
});

app.post('/search', async (req, res) => {
  console.log('@@ HEY', req.body);
  const body = JSON.parse(req.body.text);

  //   const responseUrl = body.response_url;
  const cuisines = _.get(body, 'actions').map(action => action.value);
  const { data } = await fetchRestuarants({ cuisines });

  console.log('@@ HEY', data);

  const attachments = data.restaurants.map(({ restaurant }) => ({
    text: restaurant.name
  }));

  const result = {
    text: 'Restuarants matching:',
    attachments
  };
  // Post back to slack
  axios.post(
    'https://hooks.slack.com/services/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',
    result
  );

  res.json(result);
});

app.post('/restuarants', async (req, res) => {
  console.log('@@ HEY', req.body);
  const body = JSON.parse(req.body.payload);

  //   const responseUrl = body.response_url;
  const cuisines = _.get(body, 'actions').map(action => action.value);
  const { data } = await fetchRestuarants({ cuisines });

  console.log('@@ HEY', data);

  const attachments = data.restaurants.map(({ restaurant }) => ({
    text: restaurant.name
  }));

  const result = {
    text: 'Restuarants matching:',
    attachments
  };
  // Post back to slack
  axios.post(
    'https://hooks.slack.com/services/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',
    result
  );

  res.json(result);
});

app.listen(8080, '0.0.0.0', () => {
  console.log('@@ APP SERVED on 8080');
});
