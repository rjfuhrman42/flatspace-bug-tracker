import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CCard, CCardBody, CCardHeader, CListGroup, CListGroupItem } from '@coreui/react'
import axios from 'axios'

const Projects = () => {
  const [projects, setProjects] = useState(undefined)

  async function getProjects() {
    try {
      const response = await axios.get('/api/v1/projects')
      // figure out a way to cache this so we dont have to ask the server every time

      if (response) {
        console.log(response.data.data)
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
              <CListGroupItem key={project._id}>
                <div className="project-name-group">
                  <Link
                    className="project-link"
                    to={{ pathname: `project/${project._id}`, query: { project } }}
                  >
                    <h5>{project.name}</h5>
                  </Link>
                  {
                    // each project has a timestamp for when it was created
                    // if its been less than five minutes since the project was created, add NEW tag next to the title
                    // so that the user can quickly see the project they just created
                    // 300,000ms is equal 5 minutes
                    Date.now() - Date.parse(project.createdAt) <= 300000 && (
                      <span className="badge bg-success">NEW</span>
                    )
                  }
                </div>

                <p>{project.description}</p>
              </CListGroupItem>
            ))}
        </CListGroup>
      </CCardBody>
    </CCard>
  )
}

export default Projects
