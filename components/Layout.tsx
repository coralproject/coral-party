import { FunctionComponent, useMemo } from "react";
import Link from "next/link";
import Head from "next/head";

interface Props {
  title: string;
  pagePath: string;
  editURL?: string;
  author?: string;
  publishedAt?: string;
  children?: React.ReactNode;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:4000/";

const Layout: FunctionComponent<Props> = ({
  title,
  author,
  publishedAt,
  pagePath,
  editURL,
  children,
}) => {
  const canonical = useMemo(() => {
    const { href } = new URL(pagePath, BASE_URL);
    return href;
  }, [pagePath]);

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="canonical" href={canonical} />
        {author && <meta name="author" content={author} />}
        {publishedAt && <meta name="datepublished" content={publishedAt} />}
      </Head>
      <div className="max-w-3xl mx-auto my-20 space-y-4">
        <div className="font-bold flex justify-between items-end">
          <Link href="/" passHref>
            <a className="text-2xl text-blue-600 hover:underline">
              Coral Party
            </a>
          </Link>
          {editURL && (
            <a
              className="inline-block hover:underline"
              target="_blank"
              rel="noopener noreferrer"
              href={editURL}
            >
              Edit
            </a>
          )}
        </div>
        <div className="space-y-4">{children}</div>
      </div>
    </>
  );
};

export default Layout;
