const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'page.tsx');
let txt = fs.readFileSync(filePath, 'utf8');

// Add !pwdHasSpecial check in front-end submit validation
const oldCheck = `      if (!pwdHasUpper || !pwdHasLower || !pwdHasDigit) {
        setErrorMessage('Password must include uppercase, lowercase, and a number (0-9).');
        setSpinType('shake');
        setTimeout(() => setSpinType('idle'), 400);
        return;
      }`;
const newCheck = `      if (!pwdHasUpper || !pwdHasLower || !pwdHasDigit) {
        setErrorMessage('Password must include uppercase, lowercase, and a number (0-9).');
        setSpinType('shake');
        setTimeout(() => setSpinType('idle'), 400);
        return;
      }
      if (!pwdHasSpecial) {
        setErrorMessage('Password must include at least one special character (!@#$%^&*).');
        setSpinType('shake');
        setTimeout(() => setSpinType('idle'), 400);
        return;
      }`;

if (txt.includes(oldCheck)) {
  txt = txt.replace(oldCheck, newCheck);
  console.log('Submit validation patch applied.');
} else {
  console.error('Submit validation target NOT found!');
}

fs.writeFileSync(filePath, txt, 'utf8');
