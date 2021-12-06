import React from 'react'
import { CCard, CCardBody, CCardHeader, CListGroup, CListGroupItem, CHeader } from '@coreui/react'

const Project = () => {
  return (
    <CCard className="mb-4">
      <CCardHeader>
        <strong>example-project&#39;s bugs</strong>
      </CCardHeader>
      <CListGroup></CListGroup>
      <CListGroupItem component="a" href="#/base/project">
        #123 error: no list items found...
      </CListGroupItem>
    </CCard>
  )
}

export default Project
