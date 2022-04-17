import { RestRequest, ResponseComposition, RestContext } from 'msw';

import { testimonials, tracks } from './data';

export const trackResolver = (
  req: RestRequest,
  res: ResponseComposition,
  ctx: RestContext
) => {
  return res(ctx.json(tracks));
};

export const testimonialResolver = (
  req: RestRequest,
  res: ResponseComposition,
  ctx: RestContext
) => {
  // const params = req.url.searchParams;

  // const exercise = params.get('exercise');
  // const page = params.get('page');
  // const track = params.get('track');
  // const order = params.get('order');

  return res(ctx.json(testimonials));
};
