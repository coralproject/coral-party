import { FunctionComponent } from "react";
import Link from "next/link";
import Head from "next/head";

interface Props {
  title: string;
  author?: string;
  publishedAt?: string;
}

const Layout: FunctionComponent<Props> = ({
  title,
  author,
  publishedAt,
  children,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
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
