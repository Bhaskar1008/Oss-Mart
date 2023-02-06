import { Categories } from "../model/categories";

export const addCategoryService = (res) => {
  return Categories.create(res);
};

export const findCategoryByName = (categoryName) => {
  let category = null;
  try {
    category = Categories.findOne({ categoryName });
  } catch {
    category = null;
  }
  return category;
};

export const fetchCategories = () => {
  let categories = [];
  try {
    categories = Categories.find({ isActive: true });
  } catch {
    categories = [];
  }
  return categories;
};

export const deleteCategoryById = (id) => {
  let category = null;
  try {
    category = Categories.findOneAndUpdate({ id }, { isActive: false });
  } catch {
    category = null;
  }
  return category;
};
