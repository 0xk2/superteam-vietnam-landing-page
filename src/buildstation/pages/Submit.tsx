import { useState, type FormEvent, type ReactNode } from 'react'
import { API, PAGES } from '../config'
import Layout, { PageHead } from '../Layout'

function Field({
  id,
  label,
  hint,
  children,
}: {
  id: string
  label: string
  hint?: string
  children: ReactNode
}) {
  return (
    <div className="bs-field">
      <label htmlFor={id}>{label}</label>
      {children}
      {hint && <p className="bs-field__hint">{hint}</p>}
    </div>
  )
}

function SubmissionForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')
  const [error, setError] = useState('')
  const [confirmation, setConfirmation] = useState('')

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)

    if (!formData.get('demoUrl') && !formData.get('repoUrl')) {
      setError('Add a demo link, a repository link, or both.')
      form.querySelector<HTMLInputElement>('#demoUrl')?.focus()
      return
    }

    setError('')
    setStatus('loading')

    const payload: Record<string, unknown> = Object.fromEntries(formData.entries())
    payload.publicConsent = formData.get('publicConsent') === 'on'
    payload.conductConsent = formData.get('conductConsent') === 'on'

    try {
      const response = await fetch(API.submissions, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const result = (await response.json()) as { id?: string; error?: string }
      if (!response.ok) throw new Error(result.error || 'The project could not be saved.')
      setConfirmation(result.id || 'Received')
      setStatus('success')
    } catch (caught) {
      setError(
        caught instanceof Error ? caught.message : 'The project could not be saved. Try again.',
      )
      setStatus('idle')
    }
  }

  if (status === 'success') {
    return (
      <div className="bs-state" role="status">
        <p className="bs-state__title">Project received.</p>
        <p>
          Your confirmation code is <strong className="bs-mono">{confirmation}</strong>. Keep it in
          case the organizers follow up.
        </p>
        <div className="bs-actions">
          <a className="bs-button" href={PAGES.projects}>
            View projects →
          </a>
          <a className="bs-button bs-button--outline" href={PAGES.learn}>
            Return to learning
          </a>
        </div>
      </div>
    )
  }

  return (
    <form className="bs-form" onSubmit={onSubmit} aria-busy={status === 'loading'}>
      {error && (
        <p className="bs-form__error" role="alert">
          {error}
        </p>
      )}

      {/* Honeypot: people never see or fill this. */}
      <input
        className="bs-visually-hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        name="website"
      />

      <fieldset>
        <legend>Team and contact</legend>
        <div className="bs-form__fields">
          <div className="bs-form__pair">
            <Field id="projectName" label="Project name *">
              <input
                id="projectName"
                name="projectName"
                required
                maxLength={120}
                placeholder="Minute Market"
              />
            </Field>
            <Field id="teamName" label="Team name *">
              <input
                id="teamName"
                name="teamName"
                required
                maxLength={120}
                placeholder="Team name"
              />
            </Field>
            <Field id="contactName" label="Primary contact *">
              <input
                id="contactName"
                name="contactName"
                required
                maxLength={120}
                autoComplete="name"
                placeholder="Full name"
              />
            </Field>
            <Field id="contactEmail" label="Contact email *">
              <input
                id="contactEmail"
                name="contactEmail"
                required
                type="email"
                maxLength={240}
                autoComplete="email"
                spellCheck={false}
                placeholder="you@example.com"
              />
            </Field>
          </div>
          <Field
            id="members"
            label="Team members *"
            hint="List each member’s name and role. One person per line works well."
          >
            <textarea
              id="members"
              name="members"
              required
              maxLength={1000}
              rows={4}
              placeholder={'Anh — product\nMinh — engineering'}
            />
          </Field>
        </div>
      </fieldset>

      <fieldset>
        <legend>Product</legend>
        <div className="bs-form__fields">
          <Field
            id="targetUser"
            label="Target user *"
            hint="Name a specific community or role, not “everyone.”"
          >
            <textarea
              id="targetUser"
              name="targetUser"
              required
              maxLength={1000}
              rows={3}
              placeholder="Independent language tutors in Da Nang who sell short speaking-practice sessions."
            />
          </Field>
          <Field
            id="problem"
            label="Problem evidence *"
            hint="Explain the moment, current workaround, and any user evidence you collected."
          >
            <textarea
              id="problem"
              name="problem"
              required
              maxLength={3000}
              rows={5}
              placeholder="What is difficult today, and how do you know?"
            />
          </Field>
          <Field
            id="product"
            label="What you built *"
            hint="Describe the essential user journey that currently works."
          >
            <textarea
              id="product"
              name="product"
              required
              maxLength={3000}
              rows={5}
              placeholder="A user can publish availability, another user can…"
            />
          </Field>
          <Field
            id="iteration"
            label="What changed through iteration? *"
            hint="Describe the most important feedback and the product decision it caused."
          >
            <textarea
              id="iteration"
              name="iteration"
              required
              maxLength={3000}
              rows={5}
              placeholder="After testing with three users, we changed…"
            />
          </Field>
        </div>
      </fieldset>

      <fieldset>
        <legend>Evidence and links</legend>
        <div className="bs-form__fields">
          <div className="bs-form__pair">
            <Field
              id="demoUrl"
              label="Demo link"
              hint="Required if you do not provide a repository."
            >
              <input
                id="demoUrl"
                name="demoUrl"
                type="url"
                inputMode="url"
                maxLength={500}
                spellCheck={false}
                placeholder="https://your-demo.example"
              />
            </Field>
            <Field
              id="repoUrl"
              label="Repository link"
              hint="Required if you do not provide a demo."
            >
              <input
                id="repoUrl"
                name="repoUrl"
                type="url"
                inputMode="url"
                maxLength={500}
                spellCheck={false}
                placeholder="https://github.com/team/project"
              />
            </Field>
          </div>
        </div>
      </fieldset>

      <fieldset>
        <legend>Publication and declaration</legend>
        <div className="bs-form__fields">
          <label className="bs-check">
            <input type="checkbox" name="publicConsent" />
            <span>
              Show this project in the public showcase.
              <span className="bs-field__hint">
                Contact details and team members stay private.
              </span>
            </span>
          </label>
          <label className="bs-check">
            <input type="checkbox" name="conductConsent" required />
            <span>
              We own this work or have the right to use it, and we&apos;ll follow the event&apos;s code of conduct. *
            </span>
          </label>
        </div>
      </fieldset>

      <button type="submit" className="bs-button" disabled={status === 'loading'}>
        {status === 'loading' ? 'Submitting project…' : 'Submit project →'}
      </button>
    </form>
  )
}

export default function Submit() {
  return (
    <Layout current="submit">
      <div className="bs-page">
        <PageHead kicker="Da Nang #BuildStation · Sunday 27 September" title="Submit your project">
          Submit what your team can demo today. No account needed. This doesn&apos;t replace your
          Colosseum submission.
        </PageHead>
        <SubmissionForm />
      </div>
    </Layout>
  )
}
