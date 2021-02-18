import { GetStaticProps } from "next";
import Link from "next/link";

import Layout from "../../components/Layout";
import {
  getAllPartyModes,
  getAllPartyVersions,
  getPartySlug,
} from "../../lib/parties";

interface Props {
  versions: string[];
  modes: string[];
}

export default function PartiesPage({ versions, modes }: Props) {
  return (
    <Layout title={`- Coral Party`} pagePath={`/parties/`}>
      <h1 className="text-4xl">Parties</h1>
      {versions.map((version) => (
        <div
          key={version}
          className="mb-4 bg-gradient-to-bl from-blue-500 to-indigo-600 text-white p-4 rounded-lg flex justify-between"
        >
          <h2 className="font-mono">{version}</h2>
          <div className="space-x-4">
            {modes.map((mode) => (
              <Link key={mode} href={getPartySlug({ version, mode })}>
                <a className="border px-3 py-2 border-white rounded-lg hover:bg-blue-600">
                  {mode}
                </a>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const versions = getAllPartyVersions();
  const modes = getAllPartyModes();

  return {
    props: {
      versions,
      modes,
    },
  };
};
