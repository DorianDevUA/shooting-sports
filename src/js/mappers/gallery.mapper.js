// import { mediaDTO } from "./media.mapper.js";

// function galleryItemDTO(item) {
//   return {
//     id: item.id,
//     media: mediaDTO(item.media),
//     alt: item.alt,
//     title: item.title,
//     caption: item.caption,
//     sort_order: item.sort_order,
//   };
// }

// function galleryDTO(gallery) {
//   if (!gallery) {
//     return null;
//   }

//   return {
//     id: gallery.id,
//     slug: gallery.slug,
//     code: gallery.code,

//     title: gallery.title,
//     excerpt: gallery.excerpt,
//     description: gallery.description,
//     date: gallery.date,

//     media: galleryMediaDTO(gallery.media),
//     items: gallery.items?.map(galleryItemDTO) ?? [],
//   };
// }

// function entityGalleryRelationDTO(relation) {
//   return galleryDTO(relation.gallery);
// }

// export { galleryDTO, galleryItemDTO, entityGalleryRelationDTO };
