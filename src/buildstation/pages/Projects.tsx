import { useCallback, useEffect, useState } from 'react'
import { API, PAGES } from '../config'
import Layout, { PageHead } from '../Layout'

type Project = {
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

const dateFormat = new Intl.DateTimeFormat('en', { day: '2-digit', month: 'short' })

function Gallery() {
  const [projects, setProjects] = useState<Project[]>([])
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')

  const load = useCallback(async () => {
    setStatus('loading')
    try {
      const response = await fetch(API.projects)
      if (!response.ok) throw new Error('Unable to load projects.')
      const result = (await response.json()) as { projects?: Project[] }
      setProjects(result.projects ?? [])
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  if (status === 'loading') {
    return <p className="bs-state">Loading projects…</p>
  }

  if (status === 'error') {
    return (
      <div className="bs-state">
        <p className="bs-state__title">Couldn’t load the projects.</p>
        <p className="bs-muted">Check your connection and try again.</p>
        <button type="button" className="bs-button bs-button--outline" onClick={load}>
          Try again
        </button>
      </div>
    )
  }

  if (projects.length === 0) {
    return (
      <div className="bs-state">
        <p className="bs-state__title">No projects yet.</p>
        <p className="bs-muted">Projects will show up here after Sunday&apos;s submissions.</p>
        <a className="bs-button" href={PAGES.learn}>
          Start learning →
        </a>
      </div>
    )
  }

  return (
    <ul className="bs-projects">
      {projects.map((project) => (
        <li key={project.id} className="bs-project">
          <p className="bs-project__meta">
            <span>{project.teamName}</span>
            <span>{dateFormat.format(project.createdAt)}</span>
          </p>
          <h2 className="bs-project__name">{project.projectName}</h2>
          <p className="bs-project__for">For {project.targetUser}</p>
          <p className="bs-project__text">{project.product}</p>
          <p className="bs-project__iteration">
            <span>Latest iteration</span>
            {project.iteration}
          </p>
          <p className="bs-project__links">
            {project.demoUrl && (
              <a href={project.demoUrl} target="_blank" rel="noreferrer">
                Open demo ↗
              </a>
            )}
            {project.repoUrl && (
              <a href={project.repoUrl} target="_blank" rel="noreferrer">
                Repository ↗
              </a>
            )}
          </p>
        </li>
      ))}
    </ul>
  )
}

export default function Projects() {
  return (
    <Layout current="projects">
      <div className="bs-page">
        <PageHead kicker="Da Nang #BuildStation" title="Project showcase">
          Projects built at Da Nang #BuildStation. Each team decides whether to publish theirs.
        </PageHead>
        <Gallery />
      </div>
    </Layout>
  )
}
