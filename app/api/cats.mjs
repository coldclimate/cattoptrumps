import { upsertCat, validate } from '../models/cats.mjs'

export async function get (req) {
  if (req.session.problems) {
  // 5. Back at the form we pull the problems and initial values off the session
    let { problems, cat, ...session } = req.session
    return {
      session,
      // 6. The HTML page can get problems and initial values off the store
      json: { problems, cat }
    }
  }

// 1. First user gets a blank form to fill out
//  return { }
}

export async function post(req) {
  const session = req.session
  // 2. Validate form inputs and return problems
  let { problems, cat } = await validate.create(req)
  if (problems) {
    return {
    // 3. Problems and initial values added to session
      session: { ...session, problems, cat },
      // Used for progressive enhancement next module
      json: { problems, cat },
      // 4. Redirects back to the form with the above session
      location: '/cats'
    }
  }

  // If validation is successful the problems and old values are removed from the session
  let { problems: removedProblems, cat: removed, ...newSession } = session
  try {
    const result = await upsertCat(cat)
    return {
      session: newSession,
      json: { cat: result },
      location: '/cats'
    }
  }
  catch (err) {
    return {
      session: { ...newSession, error: err.message },
      json: { error: err.message },
      location: '/cats'
    }
  }
}