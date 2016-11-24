module.exports = {
  template: require('./message-component.html'),
  controller: function MessageComponentController() {
    this.title = "This is response from YaaS server";
  },
  bindings: {
    message: '='
  }
};
