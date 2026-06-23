import { type SchemaTypeDefinition } from "sanity";
import { product } from "./product";
import { galleryImage } from "./galleryImage";
import { order } from "./order";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, galleryImage, order],
};
