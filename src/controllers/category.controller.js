import {
  addCategoryService,
  deleteCategoryById,
  fetchCategories,
  findCategoryByName,
} from "../services/category.service";
import { BadRequest } from "../utils/error";

export const createCategoryByCustomer = async (req, res, next) => {
  try {
    const { customerId, categoryName, categoryDescription } = req.body;
    const category = await findCategoryByName(categoryName);
    if (!category) {
      const addedCategory = await addCategoryService({
        categoryName,
        categoryDescription,
        createdBy: customerId,
      });
      res.status(201).json({
        data: addedCategory,
        message: "Created category  successfully",
      });
    } else {
      next(BadRequest("Category name is already exits!"));
    }
  } catch (error) {
    next(BadRequest("Failed to add category", error));
  }
};

export const fetchListOfCategory = async (req, res, next) => {
  try {
    const categories = await fetchCategories();
    res
      .status(200)
      .json({ data: categories, message: "fetched the list of categories" });
  } catch (error) {
    next(BadRequest("Failed to fetch list of category", error));
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const categories = await deleteCategoryById(req.params.id);
    res.status(200).json({ data: categories, message: "Deleted successfully" });
  } catch (error) {
    next(BadRequest("Failed to delete the category", error));
  }
};
