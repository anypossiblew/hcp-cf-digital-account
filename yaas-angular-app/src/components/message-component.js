module.exports = {
  template: require('./message-component.html'),
  controller: function MessageComponentController() {
    this.title = "The response from YaaS server";
  },
  bindings: {
    message: '='
  }
};
