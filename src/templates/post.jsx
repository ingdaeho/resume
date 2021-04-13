import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import Moment from "react-moment"
import { graphql } from "gatsby"
import { RichText } from "prismic-reactjs"
import ReactMarkdown from "react-markdown"
import gfm from "remark-gfm"
import styled from "@emotion/styled"
import colors from "styles/colors"
import Layout from "components/Layout"

const PostHeroContainer = styled("div")`
  max-height: 500px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-bottom: 3em;

  img {
    width: 100%;
  }
`

const PostHeroAnnotation = styled("div")`
  padding-top: 0.25em;

  h6 {
    text-align: right;
    color: ${colors.grey600};
    font-weight: 400;
    font-size: 0.85rem;
  }

  a {
    color: currentColor;
  }
`

const PostCategory = styled("div")`
  max-width: 550px;
  margin: 0 auto;
  text-align: center;
  font-weight: 600;
  color: ${colors.grey600};

  h5 {
    margin-top: 0;
    margin-bottom: 1em;
  }
`

const PostTitle = styled("div")`
  max-width: 550px;
  margin: 0 auto;
  text-align: center;

  h1 {
    margin-top: 0;
  }
`

const PostBody = styled("div")`
  max-width: 700px;
  margin: 0 auto;

  h2 {
    color: ${colors.blue700};
  }

  h3 {
    margin: 1.5em 0 0.3em;
  }

  h4 {
    margin-bottom: 0.3em;
    color: ${colors.grey700};
  }

  h5 {
    margin: 0.2em 0;
    font-weight: 700;
    color: ${colors.green600};
  }

  ul {
    padding: 0;
    margin: 0.3em 0;
    list-style-type: none;

    li {
      word-break: keep-all;

      blockquote {
        margin: 0.5em 0;
      }
    }
  }

  span {
    color: ${colors.blue600};
  }

  code {
    background-color: ${colors.blue100};
    display: inline-block;
    padding: 0 0.5em;
    margin: 0 0.2em;
    border-radius: 0.3em;
    font-size: 85%;
    color: #333;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: 1.6;
  }

  a {
    border-bottom: 0.01rem solid ${colors.blue600};
    color: #333;
    text-decoration: none;

    :hover {
      color: ${colors.blue600};
    }
  }

  blockquote {
    border-left: 0.25rem solid ${colors.blue500};
    margin: 0 0 1rem;
    padding: 0 0 0 1.25rem;
    display: block;
    margin-block-start: 0.2em;
    margin-block-end: 1.5em;
    word-break: keep-all;
  }

  strong {
    position: relative;

    :after {
      content: "";
      display: inline-block;
      position: absolute;
      height: 8px;
      width: 100%;
      bottom: 0px;
      background-color: ${colors.blue400};
      opacity: 0.25;
      left: 0;
    }
  }

  .block-img {
    margin-top: 0.5em;
    margin-bottom: 0.5em;

    img {
      width: 100%;
    }
  }

  p {
    margin: 0 0 6px 0;
    word-break: keep-all;
  }
`

const PostMetas = styled("div")`
  max-width: 700px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  margin-bottom: 2em;
  justify-content: space-between;
  font-size: 0.85em;
  color: ${colors.grey600};
`

const PostAuthor = styled("div")`
  margin: 0;
`

const PostDate = styled("div")`
  margin: 0;
`

const Post = ({ post, meta }) => {
  const markdown = RichText.asText(post.post_body)
  return (
    <>
      <Helmet
        title={`Resume | 임대호`}
        titleTemplate={`%s`}
        meta={[
          {
            name: `description`,
            content: meta.description,
          },
          {
            property: `og:title`,
            content: `${post.post_title[0].text} | 임대호`,
          },
          {
            property: `og:description`,
            content: meta.description,
          },
          {
            property: `og:type`,
            content: `website`,
          },
          {
            name: `twitter:card`,
            content: `summary`,
          },
          {
            name: `twitter:creator`,
            content: meta.author,
          },
          {
            name: `twitter:title`,
            content: meta.title,
          },
          {
            name: `twitter:description`,
            content: meta.description,
          },
        ].concat(meta)}
      />
      <Layout>
        <PostCategory>{RichText.render(post.post_category)}</PostCategory>
        <PostTitle>{RichText.render(post.post_title)}</PostTitle>
        <PostMetas>
          <PostAuthor>{post.post_author}</PostAuthor>
          <PostDate>
            <Moment format="MMMM D, YYYY">{post.post_date}</Moment>
          </PostDate>
        </PostMetas>
        {post.post_hero_image && (
          <PostHeroContainer>
            <img src={post.post_hero_image.url} alt="bees" />
            <PostHeroAnnotation>
              {RichText.render(post.post_hero_annotation)}
            </PostHeroAnnotation>
          </PostHeroContainer>
        )}
        <PostBody>
          <ReactMarkdown
            plugins={[gfm]}
            children={markdown}
            escapeHtml={false}
          />
        </PostBody>
      </Layout>
    </>
  )
}

export default ({ data }) => {
  const postContent = data.prismic.allPosts.edges[0].node
  const meta = data.site.siteMetadata
  return <Post post={postContent} meta={meta} />
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
}

export const query = graphql`
  query PostQuery($uid: String) {
    prismic {
      allPosts(uid: $uid) {
        edges {
          node {
            post_title
            post_hero_image
            post_hero_annotation
            post_date
            post_category
            post_body
            post_author
            post_preview_description
            _meta {
              uid
            }
          }
        }
      }
    }
    site {
      siteMetadata {
        title
        description
        author
      }
    }
  }
`
