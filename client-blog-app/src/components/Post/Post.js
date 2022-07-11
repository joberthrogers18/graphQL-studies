import React from "react";
import "./Post.css";
import { gql, useMutation } from "@apollo/client";

const PUBLISH_POST = gql`
  mutation PostPublished($postId: ID!) {
    postPublished(postId: $postId) {
      userErrors {
        message
      }
      post {
        title
      }
    }
  }
`;

const UNPUBLISH_POST = gql`
  mutation PostUnPublished($postId: ID!) {
    postUnpublished(postId: $postId) {
      userErrors {
        message
      }
      post {
        title
      }
    }
  }
`;

export default function Post({
  title,
  content,
  date,
  user,
  published,
  id,
  isMyProfile,
}) {
  const [publishPost, { data, loading }] = useMutation(PUBLISH_POST);
  const [unpublishPost, { data1, loading1 }] = useMutation(UNPUBLISH_POST);

  const formatedDate = new Date(Number(date));
  return (
    <div
      className="Post"
      style={published === false ? { backgroundColor: "hotpink" } : {}}
    >
      {isMyProfile && published === false && (
        <p
          className="Post__publish"
          onClick={() => {
            try {
              publishPost({
                variables: {
                  postId: id,
                },
              });
            } catch (error) {
              console.log(error);
            }
          }}
        >
          publish
        </p>
      )}
      {isMyProfile && published === true && (
        <p
          className="Post__publish"
          onClick={() => {
            unpublishPost({
              variables: {
                postId: id,
              },
            });
          }}
        >
          unpublish
        </p>
      )}
      <div className="Post__header-container">
        <h2>{title}</h2>
        <h4>
          Created At {`${formatedDate}`.split(" ").splice(0, 3).join(" ")} by{" "}
          {user}
        </h4>
      </div>
      <p>{content}</p>
    </div>
  );
}
