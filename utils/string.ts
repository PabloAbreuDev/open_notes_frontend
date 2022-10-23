export const listToError = (errorList: any[]) => {
  let texto = "";

  errorList.forEach((item, i) => {
    for (let key in item) {
      texto += `• ${item[key]} <br/>`;
    }
  });

  return texto;
};

export const protectEmail = (mail: string) => {
  var [name, domain] = mail.split("@");
  var blockedName = `${name[0]}${"*".repeat(name.length - 2)}${
    name[name.length - 1]
  }`;
  return `${blockedName}@${domain}`;
};
