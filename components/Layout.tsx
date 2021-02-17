import { FunctionComponent, useMemo } from "react";
import Link from "next/link";
import Head from "next/head";

interface Props {
  title: string;
  pagePath: string;
  author?: string;
  publishedAt?: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:4000/";

const Layout: FunctionComponent<Props> = ({
  title,
  author,
  publishedAt,
  pagePath,
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
        <Link href="/" passHref>
          <a className="text-2xl font-bold text-blue-600 hover:underline">
            Coral Party
          </a>
        </Link>
        <div className="space-y-4">{children}</div>
      </div>
    </>
  );
};

export default Layout;
