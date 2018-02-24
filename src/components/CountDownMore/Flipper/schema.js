import { PropTypes as types } from 'prop-types';

export default {
  types: {
    now: types.number.isRequired,
    min: types.number,
    max: types.number,
  },

  defaults: {
    reverse: false,
    now: 0,
    min: 0,
    max: 9,
  },
};
