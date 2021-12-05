import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
} from '@coreui/react'

const CreateProject = () => {
  return (
    <CCard className="mb-4">
      <CCardHeader>
        <strong>Create a new project</strong>
      </CCardHeader>
      <CCardBody>
        <CForm>
          <p className="text-medium-emphasis small">Create a new project to add bugs</p>
          <div className="mb-3">
            <CFormLabel htmlFor="exampleFormControlInput1">Project Name</CFormLabel>
            <CFormInput type="text" id="exampleFormControlInput1" placeholder="hello-word-app..." />
          </div>
          <div className="mb-3">
            <CFormLabel htmlFor="exampleFormControlTextarea1">Description (optional)</CFormLabel>
            <CFormTextarea id="exampleFormControlTextarea1" rows="3"></CFormTextarea>
          </div>
        </CForm>

        <CButton style={{ float: 'right', color: 'white' }} color="success">
          Create project
        </CButton>
      </CCardBody>
    </CCard>
  )
}

export default CreateProject
