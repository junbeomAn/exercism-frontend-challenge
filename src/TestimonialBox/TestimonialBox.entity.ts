import { ITestimonialItem } from '../common/entities';

export interface ITestimonialsResponse {
  testimonials: {
    results: ITestimonialItem[];
    pagination: {
      total_pages: number;
      total_count: number;
    };
    track_counts: {
      [key: string]: number;
    };
  };
}
