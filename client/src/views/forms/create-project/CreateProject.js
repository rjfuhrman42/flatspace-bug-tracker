import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
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

import axios from 'axios'

const CreateProject = () => {
  const [projectName, setProjectName] = useState('')
  const [projectDescription, setProjectDescription] = useState('')
  const history = useHistory()

  async function createProject() {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    try {
      await axios.post(
        '/api/v1/projects',
        { name: projectName, description: projectDescription },
        config,
      )
      history.push('/base/projects')
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <CCard className="mb-4">
      <CCardHeader>
        <strong>Create a new project</strong>
      </CCardHeader>
      <CCardBody>
        <CForm>
          <p className="text-medium-emphasis small">Create a new project to add bugs</p>
          <div className="mb-3">
            <CFormLabel htmlFor="projectNameInput">Project Name</CFormLabel>
            <CFormInput
              type="text"
              id="projectNameInput"
              value={projectName}
              placeholder="hello-word-app..."
              onChange={(e) => setProjectName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <CFormLabel htmlFor="projectDescriptionInput">Description (optional)</CFormLabel>
            <CFormTextarea
              id="projectDescriptionInput"
              value={projectDescription}
              rows="3"
              onChange={(e) => setProjectDescription(e.target.value)}
            ></CFormTextarea>
          </div>
        </CForm>

        <CButton
          style={{ float: 'right', color: 'white' }}
          color="success"
          onClick={() => createProject()}
        >
          Create project
        </CButton>
      </CCardBody>
    </CCard>
  )
}

export default CreateProject
