import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { CCard, CCardBody, CCardHeader, CListGroup, CListGroupItem, CButton } from '@coreui/react'

const Project = (props) => {
  const [project, setProject] = useState(undefined)

  // The result of the useLocation hook
  const currentLocation = useLocation()

  useEffect(() => {
    const { project } = currentLocation.query
    setProject(project)
  }, [currentLocation])

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
          <CListGroupItem component="a" href="#">
            <h4>Console Error on Website in Chrome</h4>
            <p style={{ marginBottom: '0' }}>#584 - Opened on: October 2, 2021</p>
          </CListGroupItem>
        </CListGroup>
      </CCardBody>
    </CCard>
  )
}

export default Project
