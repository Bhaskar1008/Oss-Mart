import { Product } from "../model/product";
import { Thumbnail } from "../model/thumbnail";
import {
  addItemByUser,
  updateItemByUser,
  updateThumbnail,
} from "../services/item-configuration.service";
import {
  addProductByUser,
  getProductDetailsService,
  getProductsService,
  updateProductByUser,
} from "../services/product.service";
import {
  addReviewToProduct,
  getAllReviewsByProductId,
} from "../services/review.service";
import { addBulkThumbnailsByItemId, addThumbnailByItem } from "../services/thumbnail.service";
import { BadRequest } from "../utils/error";
import fs from "fs";
import path from "path";
export const addProductByCustomer = async (req, res, next) => {
  try {
    const item = await addItemByUser(req.body);
    await addProductByUser({ itemId: item?.id, ...req.body });
    // await addThumbnailByItem({ itemId: item?.id, ...req.body });/
    console.log(typeof req.body?.thumbnails)
    const itemThumbnail = req.body?.thumbnails.map((e) => {
      return {
        ...e,
        itemId: item?.id,
        createdBy: req.body.createdBy,
      };
    });
    
    console.log(itemThumbnail)
    const addedThumbnail = await addBulkThumbnailsByItemId(itemThumbnail);
    addedThumbnail.map(async (e) => await updateThumbnail(e.itemId, e._id));

    res.status(201).json({ message: "Product is added successfully" });
  } catch (error) {
    next(BadRequest("Failed to add product", error));
  }
};
export const updateProductByCustomer = async (req, res, next) => {
  try {
    await updateItemByUser(req.body.itemId, req.body);
    await updateProductByUser(req.body.productId, req.body);
    res.status(200).json({ message: "Product is update successfully" });
  } catch (error) {
    next(BadRequest("Failed to update product", error));
  }
};

export const getProducts = async (req, res, next) => {
  try {
    const perPage = req.query.perPage ? req.query.perPage : 5;
    const page = req.query.page ? req.query.page : 5;
    const products = await getProductsService(req.query);
    const count = await Product.countDocuments({
      isActive: true,
    });
    res.status(200).json({
      data: products,
      totalPages: Math.round(count / perPage),
      currentPage: page,
      message: "Fetch products success",
    });
  } catch (error) {
    next(BadRequest("Failed fetch products", error));
  }
};

export const getProductDetails = async (req, res, next) => {
  try {
    const product = await getProductDetailsService(req.params.id);
    res.status(200).json({
      data: product,
      message: "Fetch product details success",
    });
  } catch (error) {
    next(BadRequest("Failed to fetch product details", error));
  }
};
export const addReviewForProduct = async (req, res, next) => {
  try {
    await addReviewToProduct(req.body);
    res.status(201).json({ message: "Review added successfully" });
  } catch (error) {
    next(BadRequest("Failed to add product review", error));
  }
};

export const getReviewsByProductId = async (req, res, next) => {
  try {
    const productReviews = await getAllReviewsByProductId(req.params.productId);
    res.status(200).json({
      data: productReviews,
      message: "Fetch products review success",
    });
  } catch (error) {
    next(BadRequest("Failed to fetch product reviews", error));
  }
};

export const addMultiImage = async (req, res, next) => {
  try {
    const files = req?.files.map((e) => {
      return {
        imageLink: `http:localhost:3000/${e.filename}`,
        imageName: e.filename,
      };
    });

    res.status(201).json({
      data: files,
      message: "Image added successfully",
    });
  } catch (error) {
    next(BadRequest("Failed to add image", error));
  }
};

export const addSingleImage = async (req, res, next) => {
  try {
    console.log(req)
    if (req?.file) {
      var img = fs.readFileSync(req.file.path);
      var encode_img = img.toString('base64');
      var final_img = {
          itemId : '639ff974c245926c3c56826e',
          createdBy: '63a29ecbb6ccb68a528ff49a',
          contentType:req.file.mimetype,
          image:new Buffer(encode_img,'base64'),
          imageLink: `http:localhost:3000/${req?.file?.filename}`,
          imageName: req?.file?.filename,
      };
      const itemThumbnailResult = await addThumbnailByItem(final_img);
      res.status(201).json({
        data: itemThumbnailResult,
        message: "Image added successfully",
      });
    }
  } catch (error) {
    console.log(req)
    next(BadRequest("Failed to add image", error));
  }
};
