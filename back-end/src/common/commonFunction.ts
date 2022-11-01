const URL = require("url").URL;

export function validateUrl(value:string):Boolean {
    try {
        new URL(value);
        return true;
      } catch (err) {
        return false;
      }
}