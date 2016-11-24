var context = require.context('./app', true, /\.js$/);
context.keys().forEach(context);
context = require.context('./components', true, /\.js$/);
context.keys().forEach(context);
context = require.context('./services', true, /\.js$/);
context.keys().forEach(context);
