import { Thumbnail } from "../model/thumbnail";

export const addThumbnailByItem = async (req) => {
  let thumbnail = null;
  try {
    Thumbnail.create(req,function(err,result){
        if(err){
            console.log(err);
            thumbnail = err;
        }else{
            console.log(result.img.Buffer);
            console.log("Saved To database");
            thumbnail = result;
            // res.contentType(final_img.contentType);
            // res.send(final_img.image);
        }
    })
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
