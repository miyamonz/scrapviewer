import { atom } from "jotai";
//import { getProject } from "./pages/api/project";
async function getProject(project: string): Promise<JSON> {
  return fetch(`./api/project?project=${project}`).then((res) => res.json());
}

const prefetched: { [key: string]: JSON } = {};

export const projectNameAtom = atom(null);

export const jsonAtom = atom((get) => {
  const name = get(projectNameAtom);
  if (name === null) {
    return {};
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
