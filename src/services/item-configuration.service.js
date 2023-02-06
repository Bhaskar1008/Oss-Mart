import { ItemConfiguration } from "../model/item-configuration";

export const addItemByUser = async (req) => {
  let itemConfiguration = null;
  try {
    itemConfiguration = await ItemConfiguration.create(req);
  } catch {
    itemConfiguration = null;
  }

  return itemConfiguration;
};

export const updateItemByUser = async (id, req) => {
  let itemConfiguration = null;
  try {
    itemConfiguration = await ItemConfiguration.findOneAndUpdate(
      { id: id },
      req
    );
  } catch {
    itemConfiguration = null;
  }

  return itemConfiguration;
};

export const updateThumbnail = async (id, thumbnailId) => {
  let itemConfiguration = null;
  try {
    itemConfiguration = await ItemConfiguration.findOneAndUpdate(
      id,
      { $push: { thumbnail: thumbnailId } },
      { new: true, useFindAndModify: false }
    );
  } catch {
    itemConfiguration = null;
  }

  return itemConfiguration;
};
