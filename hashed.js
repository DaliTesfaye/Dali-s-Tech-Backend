// Save this as hash.js and run: node hash.js
const bcrypt = require('bcryptjs');
const password = 'your_admin_password'; // Replace with your desired password

bcrypt.hash(password, 10, (err, hash) => {
  if (err) throw err;
  console.log('Hashed password:', hash);
});