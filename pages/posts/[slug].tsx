import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import CoralComments from "../../components/CoralComments";

import Layout from "../../components/Layout";
import markdownToHtml from "../../lib/markdown";
import { getAllPosts, getPostBySlug, Post } from "../../lib/posts";

interface Props {
  post: Post;
}

const formatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

export default function PostPage({ post }: Props) {
  return (
    <Layout
      title={`${post.title} - Coral Party`}
      publishedAt={post.date}
      author={post.author}
    >
      <header className="mb-10 space-y-4">
        {post.title && <h1 className="text-4xl">{post.title}</h1>}
        <div className="flex justify-between space-x-4">
          <div className="space-x-4">
            <span className="font-bold">
              {formatter.format(new Date(post.date))}
            </span>
            {post.author && (
              <span>
                By <b>{post.author}</b>
              </span>
            )}
          </div>
          <a className="coral-count font-bold hover:underline" href="#coral">
            Comments
          </a>
        </div>
      </header>
      <dl className="bg-gradient-to-r from-blue-100 to-purple-100 p-4">
        <dt className="font-bold">Story Mode</dt>
        <dd className="font-mono">{post.mode}</dd>
      </dl>
      <div
        className="prose space-y-4"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      <CoralComments storyMode={post.mode} rootURL="localhost:8080" />
    </Layout>
  );
}

interface Params extends ParsedUrlQuery {
  slug: string;
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const post = getPostBySlug(params.slug);
  const content = await markdownToHtml(post.content);

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const posts = getAllPosts();

  return {
    paths: posts.map((post) => ({
      params: {
        slug: post.slug,
      },
    })),
    fallback: false,
  };
};
