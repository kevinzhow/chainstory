require('./style.less')

module.exports = {
  template: require('./template.html'),
  replace: true,
  props: ['side', 'name']
}
