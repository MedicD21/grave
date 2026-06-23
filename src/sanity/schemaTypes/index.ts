import { type SchemaTypeDefinition } from "sanity";
import { galleryImage } from "./galleryImage";
import { order } from "./order";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [galleryImage, order],
};
