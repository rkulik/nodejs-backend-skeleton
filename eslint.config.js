// eslint-disable-next-line @typescript-eslint/no-require-imports, no-undef
const rkulik = require('@rkulik/eslint-config').default;

// eslint-disable-next-line no-undef
module.exports = rkulik({}, { ignores: ['migrations'] });
