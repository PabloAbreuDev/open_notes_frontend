export const listToError = (errorList: any[]) => {
  let texto = "";

  errorList.forEach((item, i) => {
    for (let key in item) {
      texto += `• ${item[key]} <br/>`;
    }
  });

  return texto;
};
