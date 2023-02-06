import { Thumbnail } from "../model/thumbnail";

export const addThumbnailByItem = async (req) => {
  let thumbnail = null;
  try {
    thumbnail = Thumbnail.create(req)
  } catch {
    thumbnail = null;
  }

  return thumbnail;
};

export const addBulkThumbnailsByItemId = async (req) => {
  let thumbnail = null;
  try {
    thumbnail = await Thumbnail.insertMany(req);
  } catch (error) {
    thumbnail = null;
  }

  return thumbnail;
};

export const getThumbnailByItem = (id) => {
  let thumbnail = [];
  try {
    thumbnail = Thumbnail.find({ itemId: id });
  } catch {
    thumbnail = [];
  }
  return thumbnail;
};
