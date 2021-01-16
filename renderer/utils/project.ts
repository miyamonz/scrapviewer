import fs from "fs";
import { getAppPath } from "./dir";

export const getProjectJson = async (project: string) => {
  console.log("getProjectJson");
  const appPath = await getAppPath();
  const jsonPath = `${appPath}/data/${project}.json`;
  const jsonStr = fs.readFileSync(jsonPath).toString();
  const json: JSON = JSON.parse(jsonStr);
  return json;
};
