import uniq from 'lodash/uniq';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { useMemo, useState } from 'react';

import FilterButton from '../components/FilterButton';
import Layout from '../components/Layout';
import { getAllPosts, Post } from '../lib/posts';

const CORAL_DOMAIN = process.env.NEXT_PUBLIC_CORAL_DOMAIN || "localhost:8080";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:4000/";
const CORAL_COUNT_SCRIPT = "//" + CORAL_DOMAIN + "/assets/js/count.js";

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
    <Layout title="Coral Party" pagePath="/">
      <script
        className="coral-script"
        src={CORAL_COUNT_SCRIPT}
        defer
      ></script>
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex justify-between space-x-4 text-white rounded">
        <div className="">
          <h2 className="mb-2">Filter</h2>
          <div className="flex space-x-2">
            <FilterButton value="" onClick={setFilter} selected={filter === ""}>
              All
            </FilterButton>
            {modes.map((mode) => (
              <FilterButton
                key={mode}
                value={mode}
                onClick={setFilter}
                selected={filter === mode}
              >
                {mode}
              </FilterButton>
            ))}
          </div>
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
            <span
              className="coral-count"
              data-coral-url={`${BASE_URL}/posts/${post.slug}/`}
            ></span>
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
