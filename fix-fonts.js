const fs = require('fs');
const file = 'sanjay-portfolio.html';
const content = fs.readFileSync(file, 'utf8');

const targetStr = `    /* ── NEXA ── */
    @font-face {
      font-family: 'Nexa';
      src: url('fonts/nexa-thin.woff2') format('woff2');
      font-weight: 200;
      font-style: normal;
      font-display: swap;
    }

    @font-face {
      font-family: 'Nexa';
      src: url('fonts/nexa-light.woff2') format('woff2');
      font-weight: 300;
      font-style: normal;
      font-display: swap;
    }

    @font-face {
      font-family: 'Nexa';
      src: url('fonts/nexa-regular.woff2') format('woff2');
      font-weight: 400;
      font-style: normal;
      font-display: swap;
    }

    @font-face {
      font-family: 'Nexa';
      src: url('fonts/nexa-bold.woff2') format('woff2');
      font-weight: 700;
      font-style: normal;
      font-display: swap;
    }

    @font-face {
      font-family: 'Nexa';
      src: url('fonts/nexa-bold.woff2') format('woff2');
      font-weight: 800;
      font-style: normal;
      font-display: swap;
    }

    /* ── BANK GOTHIC ── */
    @font-face {
      font-family: 'BankGothic';
      src: url('fonts/bank-gothic-light.otf') format('opentype');
      font-weight: 300;
      font-style: normal;
      font-display: swap;
    }

    @font-face {
      font-family: 'BankGothic';
      src: url('fonts/bank-gothic-light.otf') format('opentype');
      font-weight: 400;
      font-style: normal;
      font-display: swap;
    }

    @font-face {
      font-family: 'BankGothic';
      src: url('fonts/bank-gothic.ttf') format('truetype');
      font-weight: 500;
      font-style: normal;
      font-display: swap;
    }

    @font-face {
      font-family: 'BankGothic';
      src: url('fonts/bank-gothic.ttf') format('truetype');
      font-weight: 600;
      font-style: normal;
      font-display: swap;
    }

    @font-face {
      font-family: 'BankGothic';
      src: url('fonts/bank-gothic.ttf') format('truetype');
      font-weight: 700;
      font-style: normal;
      font-display: swap;
    }

    /* ── CROOGLA ── */
    @font-face {
      font-family: 'Croogla';
      src: url('fonts/croogla-regular.woff2') format('woff2');
      font-weight: 200;
      font-style: normal;
      font-display: swap;
    }

    @font-face {
      font-family: 'Croogla';
      src: url('fonts/croogla-regular.woff2') format('woff2');
      font-weight: 300;
      font-style: normal;
      font-display: swap;
    }

    @font-face {
      font-family: 'Croogla';
      src: url('fonts/croogla-regular.woff2') format('woff2');
      font-weight: 400;
      font-style: normal;
      font-display: swap;
    }

    @font-face {
      font-family: 'Croogla';
      src: url('fonts/croogla-regular.woff2') format('woff2');
      font-weight: 500;
      font-style: normal;
      font-display: swap;
    }

    @font-face {
      font-family: 'Croogla';
      src: url('fonts/croogla-regular.woff2') format('woff2');
      font-weight: 700;
      font-style: normal;
      font-display: swap;
    }

    /* ── AMSTERDAM ONE ── */
    @font-face {
      font-family: 'AmsterdamOne';
      src: url('fonts/amsterdam-one.ttf') format('truetype');
      font-weight: 400;
      font-style: normal;
      font-display: swap;
    }`;

const replacement = `    /* ── NEXA ── */
    @font-face {
      font-family: 'Nexa';
      src: url('fonts/nexa-thin.woff2') format('woff2');
      font-weight: 200;
      font-style: normal;
      font-display: swap;
    }

    @font-face {
      font-family: 'Nexa';
      src: url('fonts/nexa-light.woff2') format('woff2');
      font-weight: 300;
      font-style: normal;
      font-display: swap;
    }

    @font-face {
      font-family: 'Nexa';
      src: url('fonts/nexa-regular.woff2') format('woff2');
      font-weight: 400;
      font-style: normal;
      font-display: swap;
    }

    @font-face {
      font-family: 'Nexa';
      src: url('fonts/nexa-bold.woff2') format('woff2');
      font-weight: 700;
      font-style: normal;
      font-display: swap;
    }

    /* ── BANK GOTHIC ── */
    @font-face {
      font-family: 'BankGothic';
      src: url('fonts/bank-gothic-light.otf') format('opentype');
      font-weight: 300;
      font-style: normal;
      font-display: swap;
    }

    @font-face {
      font-family: 'BankGothic';
      src: url('fonts/bank-gothic.ttf') format('truetype');
      font-weight: 500;
      font-style: normal;
      font-display: swap;
    }

    /* ── CROOGLA ── */
    @font-face {
      font-family: 'Croogla';
      src: url('fonts/croogla-regular.woff2') format('woff2');
      font-weight: 400;
      font-style: normal;
      font-display: swap;
    }

    /* ── AMSTERDAM ONE ── */
    @font-face {
      font-family: 'AmsterdamOne';
      src: url('fonts/amsterdam-one.ttf') format('truetype');
      font-weight: 400;
      font-style: normal;
      font-display: swap;
    }`;

if (content.includes(targetStr)) {
  fs.writeFileSync(file, content.replace(targetStr, replacement));
  console.log('Replaced successfully.');
} else {
  console.log('Target string not found.');
  const regex = new RegExp(targetStr.replace(/\r?\n/g, '\\s*'), 'g');
  if (regex.test(content)) {
     console.log('Regex found it. Replacing...');
     fs.writeFileSync(file, content.replace(regex, replacement));
  } else {
     console.log('Still not found.');
  }
}
