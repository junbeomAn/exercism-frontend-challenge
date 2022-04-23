import { RestRequest, ResponseComposition, RestContext } from 'msw';

import { testimonials, tracks } from './data';
import { IMockTestimonialItem } from './entities';

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
  const params = req.url.searchParams;

  const track = params.get('track');
  const exercise = params.get('exercise');
  const order = params.get('order');
  const page = parseInt(params.get('page') || '1');

  const filtered = testimonials.testimonials.results
    .filter(isTrack(track))
    .filter(isExercise(exercise))
    .sort(orderItems(order))
    .slice(10 * (page - 1), 10 * page);

  return res(
    ctx.json({
      testimonials: { ...testimonials.testimonials, results: filtered },
    })
  );
};

const isTrack = (trackName: string | null) => (item: IMockTestimonialItem) => {
  if (!trackName) return true;
  return trackName === item.track.slug;
};

const isExercise =
  (exerciseName: string | null) => (item: IMockTestimonialItem) => {
    if (!exerciseName) return true;
    return item.exercise.title
      .toLowerCase()
      .includes(exerciseName.toLowerCase());
  };

const orderItems =
  (orderBy: string | null) =>
  (a: IMockTestimonialItem, b: IMockTestimonialItem) => {
    if (orderBy === 'newest_first') {
      if (a.created_at < b.created_at) {
        return 1;
      } else if (a.created_at > b.created_at) {
        return -1;
      } else {
        return 0;
      }
    } else if (orderBy === 'oldest_first') {
      if (a.created_at > b.created_at) {
        return 1;
      } else if (a.created_at < b.created_at) {
        return -1;
      } else {
        return 0;
      }
    } else {
      throw Error('Undefined order method is provided');
    }
  };
