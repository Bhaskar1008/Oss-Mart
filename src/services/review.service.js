import { Review } from "../model/review";

export const addReviewToProduct = async (req) => {
  let review = null;
  try {
    review = await Review.create(req);
  } catch {
    review = null;
  }

  return review;
};

export const getAllReviewsByProductId = async (productId) => {
  let reviews = [];
  try {
    reviews = await Review.find({ productId, isActive: true }).populate(
      "createdBy"
    );
  } catch {
    reviews = [];
  }
  return reviews;
};
