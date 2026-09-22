// Project submissions for the Da Nang Build Station
// (ported from the Next.js /api/submissions route).
import { getStore } from '@netlify/blobs'

type SubmissionPayload = Record<string, unknown>

function value(payload: SubmissionPayload, key: string, limit = 5000) {
  const raw = payload[key]
  return typeof raw === 'string' ? raw.trim().slice(0, limit) : ''
}

function validUrl(candidate: string) {
  if (!candidate) return true
  try {
    const url = new URL(candidate)
    return url.protocol === 'https:' || url.protocol === 'http:'
  } catch {
    return false
  }
}

export const config = { path: '/danang-buildstation/api/submissions', method: 'POST' }

export default async (request: Request) => {
  try {
    const payload = (await request.json()) as SubmissionPayload

    // Honeypot filled in: pretend success so bots move on.
    if (value(payload, 'website', 200)) {
      return Response.json({ ok: true, id: 'received' })
    }

    const projectName = value(payload, 'projectName', 120)
    const teamName = value(payload, 'teamName', 120)
    const contactName = value(payload, 'contactName', 120)
    const contactEmail = value(payload, 'contactEmail', 240)
    const members = value(payload, 'members', 1000)
    const targetUser = value(payload, 'targetUser', 1000)
    const problem = value(payload, 'problem', 3000)
    const product = value(payload, 'product', 3000)
    const iteration = value(payload, 'iteration', 3000)
    const demoUrl = value(payload, 'demoUrl', 500)
    const repoUrl = value(payload, 'repoUrl', 500)
    const publicConsent = payload.publicConsent === true
    const conductConsent = payload.conductConsent === true

    if (
      !projectName ||
      !teamName ||
      !contactName ||
      !contactEmail ||
      !members ||
      !targetUser ||
      !problem ||
      !product ||
      !iteration
    ) {
      return Response.json({ error: 'Complete every required field before submitting.' }, { status: 400 })
    }

    if (!contactEmail.includes('@')) {
      return Response.json({ error: 'Enter a valid contact email.' }, { status: 400 })
    }

    if (!demoUrl && !repoUrl) {
      return Response.json({ error: 'Add a demo link, a repository link, or both.' }, { status: 400 })
    }

    if (!validUrl(demoUrl) || !validUrl(repoUrl)) {
      return Response.json(
        { error: 'Demo and repository links must begin with http:// or https://.' },
        { status: 400 },
      )
    }

    if (!conductConsent) {
      return Response.json({ error: 'Confirm the participant and project declaration.' }, { status: 400 })
    }

    const id = `BS-${crypto.randomUUID().slice(0, 8).toUpperCase()}`
    const createdAt = Date.now()
    const store = getStore({ name: 'buildstation-submissions', consistency: 'strong' })
    const visibility = publicConsent ? 'public' : 'private'

    await store.setJSON(`${visibility}/${createdAt}-${id}`, {
      id,
      createdAt,
      projectName,
      teamName,
      contactName,
      contactEmail,
      members,
      targetUser,
      problem,
      product,
      iteration,
      demoUrl: demoUrl || null,
      repoUrl: repoUrl || null,
      publicConsent,
    })

    return Response.json({ ok: true, id })
  } catch (error) {
    console.error('Submission failed', error)
    return Response.json({ error: 'We could not save the project. Try again in a moment.' }, { status: 500 })
  }
}
