import { Router } from "express";
import {
  addProductByCustomer,
  getProducts,
  getProductDetails,
  getReviewsByProductId,
  addReviewForProduct,
  updateProductByCustomer,
  addMultiImage,
  addSingleImage,
} from "../controllers/product.controller";
import { upload } from "../utils/uploadFiles";

const productRouter = Router();

productRouter.post("/add", addProductByCustomer);
productRouter.post("/update", updateProductByCustomer);
productRouter.get("/all", getProducts);
productRouter.get("/:id", getProductDetails);
productRouter.post("/add/review", addReviewForProduct);
productRouter.get("/review/:productId", getReviewsByProductId);
productRouter.post("/add/multi/image", upload.array("files"), addMultiImage);
productRouter.post("/add/single/image", upload.single("file"), addSingleImage);

export default productRouter;
