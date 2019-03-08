/**
 * Secret Fuhrer game engine
 */

import _ from 'lodash';
import express from 'express';
import session from 'express-session';
import { reset, availableRoles, removeHitler } from './gameState';

const app = express();

// Game is session based
app.set('trust proxy', 1); // trust first proxy
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  })
);

// Join game

app.use('/reset-game', (rea, res) => {
  reset();
  res.end();
});

// Assign role
app.use('/join', (req, res) => {
  // Assign random role
  const role = _.shuffle(availableRoles)[0];

  // Only init if not already a player
  if (!req.session.player) {
    // Init session
    req.session.player = {
      isPresident: false,
      isChancellor: false,
      role
    };

    // Only one hitler
    if (role === 'hitler') removeHitler();
    // Register session to Weakmap
  }

  res.json(req.session.player);
});

// Start game (anyone)

app.use('/start-new-game', (req, res) => {});

// Random president

// President picks cancellor

// Vote

// Turn

// VOTING BLOCK

// If voted in president gets 3 cards off the stack and he picks 2

// Chancellor picks 1 of the remaining

// VOTING BLOCK

// Check if game is won

// Repeat turn

app.listen(3000, '0.0.0.0', () =>
  console.log('App is served at localhost:3000')
);
