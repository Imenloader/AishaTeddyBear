const fs = require('fs');
let code = fs.readFileSync('src/data/secrets.ts', 'utf8');

function expandMode(modeName) {
  const regex = new RegExp('export const SECRETS_' + modeName.toUpperCase() + ': SecretMessage\\[\\] = \\[\\];|export const SECRETS_' + modeName.toUpperCase() + ': SecretMessage\\[\\] = \\[[\\s\\S]*?\\];');
  const match = code.match(regex);
  if (!match) return;
  
  let extractedArray;
  try {
    const arrayStr = match[0].replace('export const SECRETS_' + modeName.toUpperCase() + ': SecretMessage[] = ', '').replace(/;$/, '');
    extractedArray = eval(arrayStr);
  } catch (e) {
    console.error('Failed to parse ' + modeName);
    return;
  }
  
  if (extractedArray.length === 0) return;

  let newSecretsStr = 'export const SECRETS_' + modeName.toUpperCase() + ': SecretMessage[] = [\n';
  
  for (let i = 1; i <= 105; i++) {
    const baseSecret = extractedArray[i % extractedArray.length];
    newSecretsStr += '  { id: \'' + modeName + '_' + i + '\', gesture: \'' + baseSecret.gesture + '\', state: \'' + baseSecret.state + '\', variants: ' + JSON.stringify(baseSecret.variants) + ' },\n';
  }
  
  newSecretsStr += '];';
  code = code.replace(regex, newSecretsStr);
}

expandMode('soul');
expandMode('heart');
expandMode('sparkle');
expandMode('dream');

fs.writeFileSync('src/data/secrets.ts', code);
console.log('Done!');
