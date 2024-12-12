import fs from "fs";

export function GetNote() {
  const fsPath = "./src/database/note.json";
  const fsRead = fs.readFileSync(fsPath);
  const fsData = JSON.parse(fsRead);

  return fsData;
}

export function GetConfig(groupId) {
  const fsPath = "./src/database/config.json";
  const fsRead = fs.readFileSync(fsPath);
  const fsData = JSON.parse(fsRead);

  return fsData.filter((i) => i.groupId === groupId)[0];
}

export function Fnumber(number) {
  number = Math.ceil(number);
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/** -------------------------
 * FUNCTION REGISTER GROUP
-------------------------- */
export function UpdateGroup(groupConf) {
  const fsPath = "./src/database/config.json";
  const fsRead = fs.readFileSync(fsPath);
  const fsData = JSON.parse(fsRead);
  const fsWrite = fsData.filter((i) => i.groupId !== groupConf.groupId);

  fsWrite.push(groupConf);
  fs.writeFileSync(fsPath, JSON.stringify(fsWrite, null, 2), "utf8");
}

/** -------------------------
 * FUNCTION UPDATE BALANCE
-------------------------- */
export function UpdateBalance(groupConf, phone, balance) {
  const fsPath = "./src/database/config.json";
  const fsRead = fs.readFileSync(fsPath);
  const fsData = JSON.parse(fsRead);
  const fsWrite = fsData.filter((i) => i.groupId !== groupConf.groupId);

  const groupBalance = groupConf?.groupBalance;
  const userBalance = groupBalance.filter((i) => i.phone === phone);

  if (!userBalance.length) {
    groupBalance.push({
      phone: phone,
      balance: 0,
    });
  }

  const userBalance2 = groupBalance.filter((i) => i.phone === phone)[0];
  balance = Number(balance) + Number(userBalance2.balance);

  groupConf.groupBalance = groupBalance.map((i) => ({
    phone: i.phone,
    balance: i.phone === phone ? Math.ceil(balance) : i.balance,
  }));

  fsWrite.push(groupConf);
  fs.writeFileSync(fsPath, JSON.stringify(fsWrite, null, 2), "utf8");
}
