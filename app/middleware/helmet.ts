const helmet = require('helmet');

export default helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ['\'self\''],
    },
  },
});
