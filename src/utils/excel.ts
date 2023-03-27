import dayjs from "dayjs";
import * as XLSX from "xlsx";

export class ExcelFileDownload {
  // USERS
  generatsUserCsv(fileName: string, jsonData: any, fileType: string): void {
    const collectKeys: string[] = [
      "Name",
      "Gender",
      "Email",
      "Address",
      "Phone Number",
      "Acc Balance",
      "Currency",
      "Games Played",
      "Creation Date",
    ];

    //   {
    //        "createdAt": "2023-03-24T20:12:13.190Z",
    //     "name": "Miss Terrance Huels IV",
    //     "avatar": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1150.jpg",
    //     "email": "Bessie74@hotmail.com",
    //     "address": "Hilpertbury",
    //     "uniqueId": "abc6fd1f2ffd0dba9d335bc3",
    //     "phoneNumber": "861-563-6875",
    //     "accountBalance": "69.62",
    //     "currency": "£",
    //     "gamesPlayed": "4",
    //     "gender": "Cis woman",
    //   }
    const data = jsonData?.map((i: any) => {
      const format = dayjs(i.createdAt).format("YYYY-MM-DD");
      let payload = new Map();
      payload.set("Name", i.name);
      payload.set("Gender", i.gender);
      payload.set("Email", i.email);
      payload.set("Address", i.address);
      payload.set("Phone Number", i.phoneNumber);
      payload.set("Acc Balance", i.accountBalance);
      payload.set("Currency", i.currency);
      payload.set("Games Played", i.gamesPlayed);
      payload.set("Creation Date", format);
      const csvObject = Object.fromEntries(payload);
      return {
        ...csvObject,
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet);
    XLSX.utils.sheet_add_aoa(worksheet, [collectKeys], {
      origin: "A1",
    });
    XLSX.writeFile(workbook, fileName);
  }
}
