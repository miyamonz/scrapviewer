import { app } from "electron";
import fs from "fs";

export function getAppPath(): Promise<string> {
  if (typeof window !== "undefined") {
    //@ts-ignore
    return window.rpc.getAppPath();
  }
  return Promise.resolve(app.getAppPath());
}
export async function getProjects() {
  const appPath = await getAppPath();
  const dataDir = appPath + "/data";
  const list = await fs.promises.readdir(dataDir);
  const projects = list
    .filter((name) => name.endsWith(".json"))
    .map((name) => name.replace(".json", ""));
  return projects;
}
