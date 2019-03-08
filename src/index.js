/**
 * Secret Fuhrer game engine
 */

import axios from 'axios';
import _ from 'lodash';
import express from 'express';
import { fetchCuisinesFromSydney, fetchRestuarants, fetchImage } from './apis';
import bodyParser from 'body-parser';

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

app.post('/cuisines', async (req, res) => {
  const { text } = req.body;
  const [{ data }, { data: imageData }] = await Promise.all([
    fetchRestuarants({ cuisines: text }),
    fetchImage(`${text}%20food`)
  ]);

  const hits = _.get(imageData, 'hits');
  const imageUrl = _.get(_.shuffle(hits), '[0].previewURL');

  const attachments = data.restaurants.map(({ restaurant }) => ({
    title: `We suggest the ${text} restuarant`,
    text: `
*${restaurant.name}*
Location: ${restaurant.location.address}
${restaurant.url}
    `,
    image_url: imageUrl,
    mrkdwn: ['text', 'pretext', 'title']
  }));

  const result = {
    response_type: 'in_channel',
    text: 'Restuarants matching:',
    attachments: [_.shuffle(attachments)[0]]
  };

  res.json(result);
});

app.listen(8080, '0.0.0.0', () => {
  console.log('@@ APP SERVED on 8080');
});
