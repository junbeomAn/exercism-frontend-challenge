import { rest } from 'msw';

import { baseUrl } from '../constants';
import { testimonialResolver, trackResolver } from './resolvers';

const handlers = [
  rest.get(`${baseUrl}/tracks`, trackResolver),
  rest.get(`${baseUrl}/hiring/testimonials`, testimonialResolver),
];

export default handlers;
