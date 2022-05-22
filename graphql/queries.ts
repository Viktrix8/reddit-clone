import { gql } from '@apollo/client'

export const GET_ALL_POSTS = gql`
  query MyQuery {
    getPostList {
      body
      image
      subreddit_id
      title
      username
      id
      created_at
      subreddit {
        created_at
        id
        topic
      }
      votes {
        id
        post_id
        upvote
        username
      }
      comments {
        username
        text
        post_id
        id
      }
    }
  }
`

export const GET_SUBREDDIT_BY_TOPIC = gql`
  query MyQuery($topic: String!) {
    getSubredditListByTopic(topic: $topic) {
      id
      topic
      created_at
    }
  }
`

export const GET_ALL_POSTS_BY_TOPIC = gql`
  query MyQuery($topic: String!) {
    getPostListByTopic(topic: $topic) {
      body
      comments {
        created_at
        id
        post_id
        text
        username
      }
      created_at
      id
      image
      subreddit {
        created_at
        id
        topic
      }
      subreddit_id
      title
      username
      votes {
        username
        upvote
        post_id
        id
        created_at
      }
    }
  }
`

export const GET_POST_BY_POST_ID = gql`
  query MyQuery($post_id: ID!) {
    getPostByPostId(post_id: $post_id) {
      username
      title
      subreddit_id
      subreddit {
        created_at
        id
        topic
      }
      image
      id
      created_at
      comments {
        created_at
        id
        post_id
        text
        username
      }
      body
      votes {
        created_at
        id
        post_id
        upvote
        username
      }
    }
  }
`

export const GET_ALL_VOTES_BY_POST_ID = gql`
  query MyQuery($post_id: ID!) {
    getVotesByPostId(post_id: $post_id) {
      created_at
      id
      post_id
      upvote
      username
    }
  }
`

export const GET_SUBREDDITS_WITH_LIMIT = gql`
  query MyQuery($limit: Int!) {
    getSubredditListLimit(limit: $limit) {
      created_at
      id
      topic
    }
  }
`
