import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { CCard, CCardBody, CCardHeader, CListGroup, CListGroupItem, CButton } from '@coreui/react'
import { getBugs } from '../../../api/utils'

const Project = (props) => {
  const [project, setProject] = useState(undefined)
  const [bugs, setBugs] = useState(undefined)

  // The result of the useLocation hook
  const currentLocation = useLocation()

  useEffect(() => {
    const { project } = currentLocation.query
    setProject(project)
  }, [currentLocation])

  useEffect(() => {
    project &&
      getBugs(project._id).then((data) => {
        console.log(data)
        setBugs(data)
      })
  }, [project])

  return (
    <CCard className="mb-4">
      <CCardHeader>
        <strong>{project && project.name}&#39;s bugs</strong>
      </CCardHeader>
      <CCardBody>
        <CButton style={{ marginBottom: '1em', color: 'white' }} color="success">
          Create a new bug +
        </CButton>
        <CListGroup>
          {bugs ? (
            bugs.map((bug) => (
              <CListGroupItem component="a" href="#" key={bug._id}>
                <h4>{bug.name}</h4>
                <p style={{ marginBottom: '0' }}>{bug.description}</p>
                <p>
                  #{bug._id} - Opened on: {bug.createdAt}
                </p>
              </CListGroupItem>
            ))
          ) : (
            <CListGroupItem>
              <h4>This project has no bugs. Try creating one to see it here!</h4>
            </CListGroupItem>
          )}
        </CListGroup>
      </CCardBody>
    </CCard>
  )
}

export default Project
