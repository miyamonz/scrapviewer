import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "isomorphic-unfetch";
import { getProjectJson } from "../../utils/project";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const project = req.query.project as string;
  const json = await getProjectJson(project);
  res.status(200).json(json);
}
export default handler;

async function getProject(project: string): Promise<JSON> {
  return fetch(`./api/project?project=${project}`).then((res) => res.json());
}
