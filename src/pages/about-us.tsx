import { FC } from 'react'
import SimpleLayout from '@layouts/Simple'
import AboutHero from '@components/about-us/AboutHero'
import MissionStatement from '@components/about-us/MissionStatement'
import BoardMembers from '@components/about-us/BoardMembers'
import AboutOurMission from '@components/about-us/AboutOurMission'
import Timeline from '@components/about-us/Timeline'
import { graphql } from 'gatsby'

type Props = {
  data: {
    markdownRemark: {
      frontmatter: {
        missionStatement: string
        aboutOurMission: string
        timelineItems: {
          period: string
          description: string
        }[]
      }
    }
  }
}

const AboutUsPage: FC<Props> = ({
  data: {
    markdownRemark: { frontmatter },
  },
}) => {
  const { missionStatement, aboutOurMission, timelineItems } = frontmatter

  return (
    <SimpleLayout pageTitle="About us">
      <AboutHero />
      <MissionStatement missionStatement={missionStatement} />
      <BoardMembers />
      <AboutOurMission content={aboutOurMission} />
      <Timeline items={timelineItems} />
    </SimpleLayout>
  )
}

export default AboutUsPage

export const pageQuery = graphql`
  query AboutUsPageQuery {
    markdownRemark(fileAbsolutePath: { glob: "**/content/pages/about-us.md" }) {
      frontmatter {
        aboutOurMission
        missionStatement
        timelineItems {
          description
          period
        }
      }
    }
  }
`
