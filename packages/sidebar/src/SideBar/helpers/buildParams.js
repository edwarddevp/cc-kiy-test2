import { splitItem } from './splitItem'

export const buildParams = (action) => {
  let object
  action.params ?
    object = {
      href: `${action.route}/${action.params.map(a => `[${a.label}]`).join('/')}`,
      as: `${action.route}/${action.params.map(a => `${splitItem(a.label, {id:a.value})}`).join('/')}`
    } :
    action.as ?
    object = {
      href: action.route,
      as: action.as
    } :
      object = {
        href: action.route
      }
  return object
}