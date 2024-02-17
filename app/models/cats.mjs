import data from '@begin/data'
import { validator } from '@begin/validator'
import { Cat } from './schemas/cats.mjs'

const deleteCat = async function (key) {
  await data.destroy({ table: 'cats', key })
  return { key }
}

const upsertCat = async function (cat) {
  return data.set({ table: 'cats', ...cat })
}

const getCat = async function (key) {
  return data.get({ table: 'cats', key })
}

const getCats = async function () {
  const databasePageResults = await data.page({
    table: 'cats',
    limit: 25
  })

  let cats = []
  for await (let databasePageResult of databasePageResults) {
    for (let cat of databasePageResult) {
      delete cat.table
      cats.push(cat)
    }
  }

  return cats
}

const validateCat = {
  shared (req) {
    return validator(req, Cat)
  },
  async create (req) {
    let { valid, problems, data } = validate.shared(req)
    if (req.body.key) {
      problems['key'] = { errors: '<p>should not be included on a create</p>' }
    }
    // Insert your custom validation here
    return !valid ? { problems, cat: data } : { cat: data }
  },
  async update (req) {
    let { valid, problems, data } = validate.shared(req)
    // Insert your custom validation here
    return !valid ? { problems, cat: data } : { cat: data }
  }
}

export {
  deleteCat,
  getCat,
  getCats,
  upsertCat,
  validateCat
}