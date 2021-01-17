import { atom } from "jotai";
import type { PrimitiveAtom } from "jotai";

//import { getProject } from "./pages/api/project";
async function getProject(project: string): Promise<ProjectJson> {
  return fetch(`./api/project?project=${project}`).then((res) => res.json());
}

export interface Page {
  title: string;
  created: number;
  updated: number;
  id: string;
  lines: any[];
}
interface ProjectJson extends JSON {
  pages: Page[];
}
const empty = { pages: [] };
const prefetched: { [key: string]: ProjectJson } = {};

export const projectNameAtom = atom(null!) as PrimitiveAtom<string>;

export const jsonAtom = atom((get) => {
  const name = get(projectNameAtom);
  if (name === null) {
    return empty;
  }
  if (prefetched[name]) {
    return prefetched[name];
  }
  return getProject(name).then((res) => {
    prefetched[name] = res;
    return res;
  });
});

/*
export const hydrateStore = (initialState) => {
  Object.entries(initialState.prefetchedData).forEach(([key, value]) => {
    prefetched[key] = value;
  });
};
*/
