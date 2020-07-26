const contentSecurityPolicy = {
  directives: {
    defaultSrc: ["'self'"],
    styleSrc: ["'self'"],
    reportUri: '/report-violation'
  }
};

export { contentSecurityPolicy };
