import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import styled from "@emotion/styled"
import colors from "styles/colors"
import { Link, graphql } from "gatsby"
import { RichText } from "prismic-reactjs"
import Button from "components/_ui/Button"
import Layout from "components/Layout"
import ReactMarkdown from "react-markdown"

const ProjectHeroContainer = styled("div")`
  background: ${colors.grey200};
  display: flex;
  justify-content: center;
  align-items: flex-end;
  overflow: hidden;
  position: relative;
  padding-top: 2.25em;
  margin-bottom: 3.5em;

  img {
    max-width: 600px;
  }
`

const ProjectTitle = styled("div")`
  max-width: 550px;
  margin: 0 auto;
  text-align: center;
  word-break: keep-all;
`

const ProjectBody = styled("div")`
  max-width: 750px;
  margin: 0 auto;

  h2 {
    color: ${colors.blue700};
  }

  h3 {
    margin: 1.5em 0 0.3em;
    a {
      text-decoration: none;
      span {
        color: ${colors.blue400};
      }
    }
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

  p {
    a {
      border-bottom: 0.01rem solid ${colors.blue600};
      color: #333;
      text-decoration: none;

      :hover {
        color: ${colors.blue600};
      }
    }
  }

  ul {
    padding: 0;
    margin: 0.3em 0;
    list-style-type: none;
    p {
      margin: 0;
    }
  }

  ol {
    a {
      border-bottom: 0.01rem solid ${colors.blue600};
      color: #333;
      text-decoration: none;

      :hover {
        color: ${colors.blue600};
      }
    }
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
    margin-top: 3.5em;
    margin-bottom: 0.5em;

    img {
      width: 100%;
    }
  }

  .embed-youtube {
    iframe {
      width: 100%;
      height: 500px;
      border: none;
    }
    .codeblock {
      code {
        width: 100%;
      }
    }
  }
`

const WorkLink = styled(Link)`
  margin-top: 3em;
  display: block;
  text-align: center;
`

const Project = ({ project, meta }) => {
  const markdown = RichText.asText(project.project_description)
  return (
    <>
      <Helmet
        title={`${project.project_title[0].text} | 임대호`}
        titleTemplate={`%s`}
        meta={[
          {
            name: `description`,
            content: meta.description,
          },
          {
            property: `og:title`,
            content: `${project.project_title[0].text} | 임대호`,
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
        <ProjectTitle>{RichText.render(project.project_title)}</ProjectTitle>
        {project.project_hero_image && (
          <ProjectHeroContainer>
            <img src={project.project_hero_image.url} alt="bees" />
          </ProjectHeroContainer>
        )}
        <ProjectBody>
          <ReactMarkdown children={markdown} escapeHtml={false} />
          <WorkLink to={"/work"}>
            <Button className="Button--secondary">See other work</Button>
          </WorkLink>
        </ProjectBody>
      </Layout>
    </>
  )
}

export default ({ data }) => {
  const projectContent = data.prismic.allProjects.edges[0].node
  const meta = data.site.siteMetadata
  return <Project project={projectContent} meta={meta} />
}

Project.propTypes = {
  project: PropTypes.object.isRequired,
}

export const query = graphql`
  query ProjectQuery($uid: String) {
    prismic {
      allProjects(uid: $uid) {
        edges {
          node {
            project_title
            project_preview_description
            project_preview_thumbnail
            project_category
            project_post_date
            project_hero_image
            project_description
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
