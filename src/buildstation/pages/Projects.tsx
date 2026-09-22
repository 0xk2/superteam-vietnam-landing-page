import { useCallback, useEffect, useState } from 'react'
import { API, PAGES } from '../config'
import { EVENT } from '../data'
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

// Projects are submitted through the Road to Colosseum form.
function SubmitLink() {
  return (
    <a
      className="bs-button bs-button--outline"
      href={EVENT.roadToColosseumUrl}
      target="_blank"
      rel="noreferrer"
    >
      Submit a project
    </a>
  )
}

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
        <p className="bs-state__title">The first projects are still being built.</p>
        <p className="bs-muted">
          Public projects will appear here after teams submit and approve publication. The learning
          material opens first.
        </p>
        <div className="bs-actions">
          <a className="bs-button" href={PAGES.learn}>
            Start learning →
          </a>
          <SubmitLink />
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="bs-actions bs-projects__submit">
        <SubmitLink />
      </div>
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
    </>
  )
}

export default function Projects() {
  return (
    <Layout current="projects">
      <div className="bs-page">
        <PageHead kicker="Public project gallery" title="Products in motion.">
          A public record of teams turning the onchain-time prompt into specific products, testing
          assumptions, and documenting what changed.
        </PageHead>
        <Gallery />
      </div>
    </Layout>
  )
}
