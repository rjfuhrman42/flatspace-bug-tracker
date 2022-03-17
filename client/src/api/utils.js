import axios from 'axios'

const BASE_URL = '/api/v1'

export const getBugs = async (project_id) => {
  try {
    const response = await axios.get(`${BASE_URL}/bugs/${project_id}`)

    if (response) {
      return response.data.data
    }
  } catch (err) {
    console.log(err)
  }
}
