import { ITestimonialItem } from 'common/entities';

export interface ITestimonialList {
  testimonials: ITestimonialItem[];
  isLoading: boolean;
}
