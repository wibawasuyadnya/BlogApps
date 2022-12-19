import { gql } from '@apollo/client';

const GET_ALL_SLUGS = gql`
query {
    posts {
      data {
        attributes {
          slug
          category {
            data {
              attributes {
                name
              }
            }
          }
        }
      }
    }
  }
`;

const GET_ALL_POSTS = gql`
query {
    posts {
      data {
        attributes {
          title
          description
          slug
          thumbnail {
            data {
              attributes{
                 url
              }
            }
          }
          category {
            data { 
              attributes {
                name
              }
            }
          }
          publishedAt
        }
      }
    }
  }
`;

const GET_INDIVIDUAL_POST = gql`
query ($slugUrl: String!) {
    posts( filters: { 
        slug : { eq: $slugUrl } 
    }) 
    {
      data {
        attributes {
          title
          content
          publishedAt
          thumbnail {
            data {
              attributes{
                 url
              }
            }
          }
          category {
            data { 
              attributes {
                name
              }
            }
          }
        }
      }
    }
  }
`;


export { GET_ALL_POSTS, GET_INDIVIDUAL_POST, GET_ALL_SLUGS };