import routes from './index'
import Router from 'react-router'

let router

export default {
  getCurrentPath () {
    return router.getCurrentPath()
  },

  makePath (to, params, query) {
    return router.makePath(to, params, query)
  },

  makeHref (to, params, query) {
    return router.makeHref(to, params, query)
  },

  transitionTo (to, params, query) {
    router.transitionTo(to, params, query)
  },

  replaceWith (to, params, query) {
    router.replaceWith(to, params, query)
  },

  goBack () {
    router.goBack()
  },

  run (render) {
    router.run((Handler, state) => {
      render(Handler, state)
    })
  }
}

router = Router.create({
  routes: routes,
  location: Router.HistoryLocation
})
