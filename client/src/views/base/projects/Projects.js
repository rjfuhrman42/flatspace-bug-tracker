import React, { useState, useEffect } from 'react'
import { CCard, CCardBody, CCardHeader, CListGroup, CListGroupItem } from '@coreui/react'
import axios from 'axios'

const Projects = () => {
  const [projects, setProjects] = useState(undefined)

  async function getProjects() {
    try {
      const response = await axios.get('/api/v1/projects')
      // figure out a way to cache this so we dont have to ask the server every time

      if (response) {
        setProjects(response.data.data)
      }
    } catch (err) {
      console.log(err.message)
    }
  }

  useEffect(() => getProjects(), [])

  // Each project needs to be a link with the individual project data sent to the Project component
  // Figure out how to make the url unique as well

  return (
    <CCard className="mb-4">
      <CCardHeader>
        <strong>Projects</strong>
      </CCardHeader>
      <CCardBody>
        <p className="text-medium-emphasis small">Your current projects</p>
        <CListGroup>
          {projects &&
            projects.map((project) => (
              <CListGroupItem component="a" key={project._id} href="#/base/project">
                {project.name}
              </CListGroupItem>
            ))}
        </CListGroup>
      </CCardBody>
    </CCard>
  )
}

export default Projects
