import { graphql } from 'gatsby'
import React from 'react'
import Section from '../components/Section'
import DefaultLayout from '../layouts/Default'

class MainPageTemplate extends React.Component {
  render() {
    const { site, pages, pageLookup, pageStructure } = this.props.pageContext
    const pageDetails = this.props.data.contentfulSitePage
    const page = {
      ...pageStructure,
      ...pageDetails,
    }
    if (page.sections === null) {
      page.sections = []
    }

    return (
      <DefaultLayout
        site={site}
        pages={pages}
        pageLookup={pageLookup}
        page={page}
      >
        {/* page header */}
        <header>
          <h1>{page.title}</h1>
        </header>

        {/* page body */}
        {page.sections.map((section) => {
          return (
            <Section
              key={section.contentful_id}
              page={page}
              section={section}
            />
          )
        })}

        {/* page footer */}
        <footer>
          <p>{page.updatedAt}</p>
        </footer>
      </DefaultLayout>
    )
  }
}

export default MainPageTemplate

export const pageQuery = graphql`
  query MainPageDetails($pageContentfulId: String!) {
    contentfulSitePage(contentful_id: { eq: $pageContentfulId }) {
      contentful_id
      title
      flavor
      updatedAt

      sections {
        contentful_id
        title
        slug

        flavor
        layout

        content {
          ... on ContentfulContentMarkdown {
            contentful_id
            label
            internal {
              type
            }
            entry {
              childMarkdownRemark {
                html
              }
            }
          }

          ... on ContentfulContentPhoto {
            contentful_id
            label
            internal {
              type
            }
            entry {
              contentful_id
              title
              description
              file {
                contentType
                url
                details {
                  image {
                    width
                    height
                  }
                  size
                }
              }
            }
          }

          ... on ContentfulContentPrezi {
            contentful_id
            label
            internal {
              type
            }

            width
            height
            embedUrl
          }
        }
      }
    }
  }
`
