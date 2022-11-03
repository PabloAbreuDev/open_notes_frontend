import { number } from "yup";

export const listToError = (errorList: any[]) => {
  let texto = "";

  errorList.forEach((item, i) => {
    for (let key in item) {
      texto += `• ${item[key]} <br/>`;
    }
  });

  return texto;
};

export const protectEmail = (mail: string | undefined) => {
  if (!mail) {
    return "***********";
  }
  var [name, domain] = mail.split("@");
  var blockedName = `${name[0]}${"*".repeat(name.length - 2)}${
    name[name.length - 1]
  }`;
  return `${blockedName}@${domain}`;
};

export function abbreviation(text: string, chars: number): string {
  return text.length <= chars ? text : text.substring(0, chars) + "...";
}
