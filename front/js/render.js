/*** Render function vdom
****/
const h = require('virtual-dom/h')
const EventListener = require('vdom-event-listener')
const edit = require('./edit')
module.exports = (state) => {

  const renderResult = (result) => {
    if (result.id) {
      return h('li', [
        h('span', result.name),
        h('a', {
          href: '#',
          className: 'edit-link',
          dataset: { 'id': result.id },
          listeningHook: new EventListener(edit, 'click')
        }, 'Edit'),
      ])
    } else {
      return h('li', [
        h('span', result)
      ])
    }
  }

  return h('div', [
    h('div', [
      h('span', 'Search: '),
      h('span.name', state.keyword)
    ]),
    h('ul', state.results.map(renderResult))
  ])

}
