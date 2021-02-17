import { GetStaticProps } from "next";
import Link from "next/link";
import { useMemo, useState } from "react";
import Layout from "../components/Layout";
import { getAllPosts, Post } from "../lib/posts";
import uniq from "lodash/uniq";

interface Props {
  posts: Post[];
}

const formatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

export default function IndexPage({ posts }: Props) {
  const [filter, setFilter] = useState("");
  const modes = useMemo(() => uniq(posts.map(({ mode }) => mode)), [posts]);
  const filtered = useMemo(() => {
    if (!filter) {
      return posts;
    }

    return posts.filter(({ mode }) => mode === filter);
  }, [posts, filter]);

  return (
    <Layout title="Coral Party">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex justify-between space-x-4 text-white rounded">
        <div className="space-x-4">
          <span>Filter</span>
          <select
            className="inline-block bg-transparent focus:outline-none"
            onChange={(e) => {
              setFilter(e.target.value);
            }}
          >
            <option value="">All Posts</option>
            {modes.map((mode) => (
              <option key={mode} value={mode}>
                {mode}
              </option>
            ))}
          </select>
        </div>
        <span>
          {filtered.length} of {posts.length} posts
        </span>
      </div>
      <ul className="space-y-6">
        {filtered.map((post) => (
          <li key={post.slug} className="bg-blue-50 p-4  space-y-2 rounded">
            <h2 className="font-bold text-2xl">
              <Link href={`/posts/${post.slug}`}>
                <a className="hover:underline">{post.title}</a>
              </Link>
            </h2>
            <div className="text-xs uppercase space-x-2 text-blue-500">
              <span className="">
                Date: <b>{formatter.format(new Date(post.date))}</b>
              </span>
              <span className="">
                Story Mode: <b>{post.mode}</b>
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
