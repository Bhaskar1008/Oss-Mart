import e from "express";
import { Categories } from "../model/categories";
import { ItemConfiguration } from "../model/item-configuration";
import { Product } from "../model/product";
import { getThumbnailByItem } from "./thumbnail.service";

export const addProductByUser = async (req) => {
  let product = null;
  try {
    product = await Product.create(req);
  } catch {
    product = null;
  }

  return product;
};

export const updateProductByUser = async (id, req) => {
  let product = null;
  try {
    product = await Product.findByIdAndUpdate({ id }, req);
  } catch {
    product = null;
  }

  return product;
};

export const getProductsService = async (req) => {
  let products = [];
  const arr = Object.keys(req);
  const perPage = req.perPage ? req.perPage : 5;
  const page = req.page ? req.page : 1;
  try {
    let obj = {};
    arr.forEach((element) => {
      obj[element] = req[element];
    });
    const categoryTable = await Categories.find(obj).distinct("_id");
    const item = await ItemConfiguration.find(obj).distinct("_id");
    const itemSearch = item.length ? { itemId: { $in: item } } : {};
    const categoriesSearch = categoryTable.length
      ? { categoryId: { $in: categoryTable } }
      : {};
    let search = req
      ? {
          $and: [
            {
              ...categoriesSearch,
              ...itemSearch,
              isActive: true,
              ...obj,
            },
          ],
        }
      : {
          isActive: true,
        };
    products = await Product.find(search)
      .populate({
        path: "itemId",
        populate: { path: "thumbnail" },
      })
      .populate("categoryId")
      .sort({ createdAt: -1 })
      .limit(perPage * 1)
      .skip((page - 1) * perPage);
  } catch {
    products = [];
  }

  return products;
};

export const getProductDetailsService = async (id) => {
  let product = null;
  try {
    product = Product.findById(id).populate("itemId").populate("categoryId");
  } catch {
    product = null;
  }
  return product;
};
