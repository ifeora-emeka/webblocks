import { API_URL } from '@/lib/constants'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookie from 'js-cookie'

export const projectsAPI = createApi({
  reducerPath: 'projectsAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL + '/projects',
    prepareHeaders: (headers) => {
      const token = Cookie.get('token')
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: (builder) => ({
    createProject: builder.mutation<any, { name: string; type: string }>({
      query: (projectData) => ({
        url: '/',
        method: 'POST',
        body: projectData,
      }),
    }),
  }),
})

export const { useCreateProjectMutation } = projectsAPI
