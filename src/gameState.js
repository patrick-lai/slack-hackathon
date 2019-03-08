/**
 * Holds most of the game state
 */

export let availableRoles = ['fascist', 'liberal', 'hitler'];

export const removeHitler = () => {
  availableRoles = availableRoles.filter(role => role !== 'hitler');
};

export const cards = [];
export const discardPile = [];

export const liberal = [];
export const fascist = [];

export const players = new WeakMap();
