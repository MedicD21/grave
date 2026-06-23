import { type SchemaTypeDefinition } from "sanity";
import { galleryImage } from "./galleryImage";
import { order } from "./order";
import { testimonial } from "./testimonial";
import { siteSettings } from "./siteSettings";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [galleryImage, order, testimonial, siteSettings],
};
