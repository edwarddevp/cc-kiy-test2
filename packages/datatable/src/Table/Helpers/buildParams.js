import { splitItem } from './splitItem'

export const buildParams = (action, item) => {
  let object
  action.params ?
    object = {
      href: `${action.route}/${action.params.map(a => `[${a.label}]`).join('/')}`,
      as: `${action.route}/${action.params.map(a => `${splitItem(a.field, item)}`).join('/')}`
    } :
    object = {
      href: `${action.route}/[id]`,
      as: `${action.route}/${item._id || item.id}`
    }
  return object
}