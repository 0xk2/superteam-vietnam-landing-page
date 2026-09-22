// Public project showcase for the Da Nang Build Station
// (ported from the Next.js /api/projects route).
import { getStore } from '@netlify/blobs'

type PublicProject = {
  id: string
  projectName: string
  teamName: string
  targetUser: string
  problem: string
  product: string
  iteration: string
  demoUrl?: string | null
  repoUrl?: string | null
  createdAt: number
}

export const config = { path: '/danang-buildstation/api/projects', method: 'GET' }

export default async () => {
  try {
    const store = getStore({ name: 'buildstation-submissions', consistency: 'strong' })
    const { blobs } = await store.list({ prefix: 'public/' })
    const keys = blobs
      .map(({ key }) => key)
      .sort((a, b) => b.localeCompare(a))
      .slice(0, 50)
    const entries = await Promise.all(keys.map((key) => store.get(key, { type: 'json' })))
    // Only publish the fields that are meant to be public; contact details stay private.
    const projects = entries
      .filter((entry): entry is PublicProject => entry !== null)
      .map(({ id, projectName, teamName, targetUser, problem, product, iteration, demoUrl, repoUrl, createdAt }) => ({
        id,
        projectName,
        teamName,
        targetUser,
        problem,
        product,
        iteration,
        demoUrl,
        repoUrl,
        createdAt,
      }))

    return Response.json({ projects })
  } catch (error) {
    console.error('Project listing failed', error)
    return Response.json({ error: 'The project gallery is temporarily unavailable.' }, { status: 500 })
  }
}
