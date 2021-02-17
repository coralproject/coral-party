import { GetStaticProps } from "next";
import Link from "next/link";
import Layout from "../components/Layout";
import { getAllPosts, Post } from "../lib/posts";

interface Props {
  posts: Post[];
}

const formatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

export default function IndexPage({ posts }: Props) {
  return (
    <Layout title="Coral Party">
      <ul className="space-y-6">
        {posts.map((post) => (
          <li key={post.slug} className="bg-blue-50 p-2 space-y-2 rounded">
            <h2 className="font-bold text-2xl">
              <Link href={`/posts/${post.slug}`}>
                <a className="hover:underline">{post.title}</a>
              </Link>
            </h2>
            <div className="text-xs uppercase space-x-2 text-blue-500">
              <span className="">
                Date <b>{formatter.format(new Date(post.date))}</b>
              </span>
              <span className="">
                Mode <b>{post.mode}</b>
              </span>
            </div>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts = getAllPosts();

  return {
    props: { posts },
  };
};
