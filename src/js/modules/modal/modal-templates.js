import {
  competitionsModalTemplate,
  contactModalTemplate,
  loginModalTemplate,
  callbackModalTemplate,
  defaultModalTemplate,
} from './templates/index.js';

export const modalTemplates = Object.freeze({
  competitions: competitionsModalTemplate,
  contact: contactModalTemplate,
  login: loginModalTemplate,
  callback: callbackModalTemplate,
  default: defaultModalTemplate,
});
