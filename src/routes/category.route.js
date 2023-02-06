import { Router } from "express";
import {
  createCategoryByCustomer,
  deleteCategory,
  fetchListOfCategory,
} from "../controllers/category.controller";
const categoryRouter = Router();

categoryRouter.post("/add", createCategoryByCustomer);
categoryRouter.get("/", fetchListOfCategory);
categoryRouter.delete("/:id", deleteCategory);
export default categoryRouter;
