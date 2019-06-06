import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

const IndexPage = ({ data: { NotInArticles, NotEqualArticles } }) => (
  <Layout>
    <h1>Filter using not in</h1>
    {NotInArticles.nodes.map(node => {
      const tags = node.tags.map(({ tag }) => tag).join(", ")
      return <div key={node.id}>{`${node.title} - Tags: ${tags}`}</div>
    })}

    <h1>Filter using not equal</h1>
    {NotEqualArticles.nodes.map(node => {
      const tags = node.tags.map(({ tag }) => tag).join(", ")
      return <div key={node.id}>{`${node.title} - Tags: ${tags}`}</div>
    })}
  </Layout>
)

export default IndexPage

export const pageQuery = graphql`
  query {
    NotInArticles: allStrapiArticle(
      filter: { tags: { elemMatch: { tag: { nin: ["Featured"] } } } }
    ) {
      nodes {
        id
        title
        tags {
          tag
        }
      }
    }

    NotEqualArticles: allStrapiArticle(
      filter: { tags: { elemMatch: { tag: { ne: "Featured" } } } }
    ) {
      nodes {
        id
        title
        tags {
          tag
        }
      }
    }
  }
`
