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
  const [publishPost] = useMutation(PUBLISH_POST);
  const [unpublishPost] = useMutation(UNPUBLISH_POST);

  const formattedDate = new Date(Number(date));
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
          Created At {`${formattedDate}`.split(" ").splice(0, 3).join(" ")} by{" "}
          {user}
        </h4>
      </div>
      <p>{content}</p>
    </div>
  );
}
