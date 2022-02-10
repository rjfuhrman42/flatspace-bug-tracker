import React from 'react'
import { CCard, CCardBody, CCardHeader, CListGroup, CListGroupItem } from '@coreui/react'

const Projects = () => {
  return (
    <CCard className="mb-4">
      <CCardHeader>
        <strong>Projects</strong>
      </CCardHeader>
      <CCardBody>
        <p className="text-medium-emphasis small">Your current projects</p>
        <CListGroup>
          <CListGroupItem component="a" href="#/base/project">
            example-project
          </CListGroupItem>
        </CListGroup>
      </CCardBody>
    </CCard>
  )
}

export default Projects
