import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // Multi-page build: the main landing plus the Build Station pages,
      // served under /danang-buildstation/.
      input: {
        main: 'index.html',
        danangBuildstation: 'danang-buildstation/index.html',
        danangBuildstationLearn: 'danang-buildstation/learn/index.html',
        danangBuildstationProjects: 'danang-buildstation/projects/index.html',
        danangBuildstationSubmit: 'danang-buildstation/submit/index.html',
        danangBuildstationContact: 'danang-buildstation/contact/index.html',
      },
    },
  },
})
