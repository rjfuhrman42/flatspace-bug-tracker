import React from 'react'
import { CCard, CCardBody, CCardHeader, CListGroup, CListGroupItem } from '@coreui/react'

const Project = () => {
  return (
    <CCard className="mb-4">
      <CCardHeader>
        <strong>example-project&#39;s bugs</strong>
      </CCardHeader>
      <CCardBody>
        <CListGroup>
          <CListGroupItem component="a" href="#/base/project">
            <h4>Console Error on Website in Chrome</h4>
            <p style={{ marginBottom: '0' }}>#584 - Opened on: October 2, 2021</p>
          </CListGroupItem>
        </CListGroup>
      </CCardBody>
    </CCard>
  )
}

export default Project
