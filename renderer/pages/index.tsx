import Link from "next/link";
import Layout from "../components/Layout";

type Props = {
  projects: string[];
};

import { getProjects } from "../utils/dir";

export async function getStaticProps() {
  const projects = await getProjects();
  return { props: { projects } };
}
const onClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
  e.preventDefault();
  console.log("clicked");
  //@ts-ignore
  //window.rpc.test('hoge').then( (a) => console.log('recieved: ' + a) )
};
const IndexPage = ({ projects }: Props) => {
  return (
    <Layout title="Home | Next.js + TypeScript + Electron Example">
      <h1>Hello Next.js 👋</h1>
      <>
        {projects.map((name) => (
          <li key={name}>
            <Link href={`/${name}`}>
              <a>{name}</a>
            </Link>
          </li>
        ))}
      </>
      <a onClick={onClick}>click日本語</a>
    </Layout>
  );
};

export default IndexPage;
