import heb from "./heb";
import en from "./en";

const localeFiles = {
  heb: heb,
  en: en,
};

const lang = (locale, key) => {
  if (key == null) 
    return localeFiles[locale];
  else
    return localeFiles[locale][key];
};


export default lang;