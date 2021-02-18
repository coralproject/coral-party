import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";

import CoralComments from "../../../components/CoralComments";
import Layout from "../../../components/Layout";
import { getAllParties, getPartyParams } from "../../../lib/parties";

interface Props {
  version: string;
  mode: string;
}

export default function PartyPage({ version, mode }: Props) {
  return (
    <Layout
      title={`${version} / ${mode.toUpperCase()} - Coral Party`}
      pagePath={`/parties/${version}/${mode}/`}
    >
      <header className="mb-4 space-y-4 bg-gradient-to-bl from-blue-500 to-indigo-600 text-white p-4 rounded-lg">
        <div className="space-x-4">
          <span>
            Version <b className="uppercase font-mono">{version}</b>
          </span>
          <span>
            Mode <b className="uppercase font-mono">{mode}</b>
          </span>
        </div>
        <div className="space-x-4">
          <Link href="/parties/">
            <a className="border px-3 py-2 border-white rounded-lg hover:bg-blue-600">
              Parties
            </a>
          </Link>
          <a
            className="coral-count border px-3 py-2 border-white rounded-lg hover:bg-blue-600"
            href="#coral"
          >
            Comments
          </a>
        </div>
      </header>
      <CoralComments storyMode={mode.toUpperCase()} />
    </Layout>
  );
}

interface Params extends ParsedUrlQuery {
  version: string;
  mode: string;
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  return {
    props: {
      version: params.version,
      mode: params.mode.replace(/-/g, "_"),
    },
  };
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const parties = getAllParties();

  return {
    paths: parties.map(({ version, mode }) => ({
      params: {
        ...getPartyParams({ version, mode }),
      },
    })),
    fallback: false,
  };
};
