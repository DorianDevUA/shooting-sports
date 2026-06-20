import urlHelpers from './url.js';
import seoHelpers from './seo.js';

export const handlebarsHelpers = {
  ...urlHelpers,
  ...seoHelpers,
};
