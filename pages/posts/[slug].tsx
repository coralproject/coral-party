import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/dist/client/router";
import { ParsedUrlQuery } from "querystring";
import { v4 as uuid } from "uuid";

import CoralComments from "../../components/CoralComments";
import Footer from "../../components/Footer";
import Layout from "../../components/Layout";
import markdownToHtml from "../../lib/markdown";
import { getAllPosts, getPostBySlug, Post } from "../../lib/posts";
import { createSSOToken, getSSOConfig, SSOUser } from "../../lib/sso";

interface User {
  id: string;
  name: string;
  token: string;
}

interface Props {
  post: Post;
  users: User[];
}

const formatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

const ssoConfig = getSSOConfig();

const getSSOUserToken = (id: string | undefined | null): string | undefined => {
  if (!id || !ssoConfig) {
    return null;
  }

  const { secret, users } = ssoConfig;

  const user = users.find((u) => u.id === id);
  if (!user) {
    return null;
  }

  const now = Math.floor(Date.now() / 1000);
  const in30Days = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60;

  const options = {
    jti: uuid(),
    iat: now,
    exp: in30Days,
    user,
  };

  return createSSOToken(secret, options).token;
};

export default function PostPage({ post, users }: Props) {
  const router = useRouter();
  const url = new URL(router.asPath, "https://coralproject.net");
  const userID = url.searchParams.get("userID");

  const user = userID && users ? users.find((t) => t.id === userID) : undefined;

  return (
    <Layout
      title={`${post.title} - Coral Party`}
      publishedAt={post.date}
      author={post.author}
      section={post.section}
      pagePath={`/posts/${post.slug}/`}
      editURL={`https://github.com/coralproject/coral-party/edit/main/content/${post.slug}.md`}
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
      {users && users.length > 0 && (
        <>
          <a href={`/posts/${post.slug}?userID=LOCAL`}>[ Local Auth ]</a>
          {users.map((u) => {
            return (
              <a key={u.id} href={`/posts/${post.slug}?userID=${u.id}`}>
                [ {u.name} ]
              </a>
            );
          })}
        </>
      )}
      <CoralComments storyMode={post.mode} token={user?.token} />
      <Footer />
    </Layout>
  );
}

interface Params extends ParsedUrlQuery {
  slug: string;
}

export const getStaticProps: GetStaticProps<Props, Params> = async (query) => {
  const { params } = query;

  const post = getPostBySlug(params.slug);
  const content = await markdownToHtml(post.content);

  const ssoConfig = getSSOConfig();

  const users =
    ssoConfig && ssoConfig.users
      ? ssoConfig.users.map((u) => {
          return {
            id: u.id,
            name: u.username,
            token: getSSOUserToken(u.id),
          };
        })
      : [];

  return {
    props: {
      users,
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
