import dayjs from "dayjs";
import * as XLSX from "xlsx";

export class ExcelFileDownload {
  // USERS
  generatsUserCsv(fileName: string, jsonData: any): void {
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

  // GENERATE GAMES
  generatsGamesCsv(fileName: string, jsonData: any): void {
    const collectKeys: string[] = [
      "Name",
      "Game Category",
      "Scores",
      "Ratings",
      "Reviews",
      "Duarion",
      "Creation Date",
    ];
    const data = jsonData?.map((i: any) => {
      const format = dayjs(i.createdAt).format("YYYY-MM-DD");
      let payload = new Map();
      payload.set("Name", i.name);
      payload.set("Game Category", i.gameCategory);
      payload.set("Scores", i.scores);
      payload.set("Ratings", i.ratings);
      payload.set("Reviews", i.reviews);
      payload.set("Duartion", i.duration);
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
