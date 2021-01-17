import { useState, useEffect, Suspense, Fragment } from "react";
import Layout from "../components/Layout";

import { useAtom } from "jotai";
import { projectNameAtom, jsonAtom } from "../store";
import type { Page } from "../store";

const isSSR = typeof window === "undefined";
const SsrSuspense = isSSR ? Fragment : Suspense;

import { ParsedUrlQuery } from "querystring";
type Props = {
  name: string;
};
interface Params extends ParsedUrlQuery {
  project: string;
}

/*
import type { GetStaticProps } from "next";
export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  if (typeof params?.project !== "string") {
    throw new Error("param is not string");
  }
  const name = params.project;
  return { props: { name } };
};
  */

import type { GetServerSideProps } from "next";
export const getServerSideProps: GetServerSideProps<Props, Params> = async ({
  params,
}) => {
  if (typeof params?.project !== "string") {
    throw new Error("param is not string");
  }
  const name = params.project;
  return { props: { name } };
};

type PageCondition = (page: Page) => boolean;

const ProjectData = ({ filter }: { filter: PageCondition }) => {
  const [_json] = useAtom(jsonAtom);
  const filtered = _json.pages.filter(filter);
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

  const [date, setDate] = useState([2021, 1, 1]);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value.split("-").map((s: string) => parseInt(s, 10)));
  };

  const utime =
    new Date(
      date.map((n) => n.toString().padStart(2, "0")).join("-")
    ).getTime() / 1000;
  const filter = (page: Page) =>
    utime <= page.updated && page.updated < utime + 3600 * 24;

  return (
    <Layout title="">
      <h2>{name}</h2>
      <input
        type="date"
        onChange={onChange}
        value={date.map((n) => n.toString().padStart(2, "0")).join("-")}
      />
      <Suspense fallback="loading...">
        <ProjectData filter={filter} />
      </Suspense>
    </Layout>
  );
};

export default Project;
