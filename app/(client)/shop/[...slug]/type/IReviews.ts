type Review = {
  _id: string;
  productId: string;
  rating: number;
  content: string;
  userId: {
    _id: string;
    name: string;
    email: string;
    password: string;
    __v: number;
    role: string;
    id: string;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type ReviewDistribution = {
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
};

export type ReviewsResponse = {
  reviews: Review[];
  totalReview: number;
  distribution: ReviewDistribution;
};
