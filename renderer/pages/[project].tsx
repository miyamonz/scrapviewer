import { useEffect, Suspense, Fragment } from "react";
import Layout from "../components/Layout";

import { useAtom } from "jotai";
import { projectNameAtom, jsonAtom } from "../store";

const isSSR = typeof window === "undefined";
const SsrSuspense = isSSR ? Fragment : Suspense;

import type { GetServerSideProps } from "next";
type Props = {
  name: string;
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  params,
}) => {
  if (typeof params?.project !== "string") {
    throw new Error("param is not string");
  }
  const name = params.project;
  return { props: { name } };
};

const ProjectData = () => {
  const [_json] = useAtom(jsonAtom);
  const filtered = _json?.pages?.filter((_, i: number) => i < 10) ?? [];
  return (
    <>
      {filtered.map((page) => (
        <li key={page.title}>{page.title}</li>
      ))}
    </>
  );
};

const Project = ({ name }: Props) => {
  const [, setName] = useAtom(projectNameAtom);
  useEffect(() => {
    setName(name);
  }, [name]);

  return (
    <Layout title="">
      <h2>{name}</h2>
      <input type="date" />
      <SsrSuspense fallback="loading...">
        <ProjectData />
      </SsrSuspense>
    </Layout>
  );
};

export default Project;
