export const getLanguage = (code: string) => {
  switch (code) {
    case "en":
      return "English";
    case "mr":
      return "Marathi";
    case "hi":
      return "Hindi";
    default:
      return "Language";
  }
};
