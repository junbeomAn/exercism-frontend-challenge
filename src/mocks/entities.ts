export interface IMockTestimonialItem {
  id: number;
  track: {
    slug: string;
    title: string;
    icon_url: string;
  };
  exercise: {
    slug: string;
    title: string;
    icon_url: string;
  };
  mentor: {
    handle: string;
    avatar_url: string;
  };
  content: string;
  created_at: string;
}
