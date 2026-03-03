const { openSocket } = require('../src/socket');

openSocket('example.com', 80)
  .then((data) => {
    console.log('✅ Got data, length:', data.length);
  })
  .catch((err) => {
    console.log('❌ Error:', err.message);
  });