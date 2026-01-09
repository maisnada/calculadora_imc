// scripts/update-copilot-instructions.js
import fs from 'fs';
import { execSync } from 'child_process';

const commitMsgFile = process.argv[2];
const commitMsg = fs.readFileSync(commitMsgFile, 'utf8');

const diff = execSync('git diff --cached', { encoding: 'utf8' });

// prompt:
// "Atualize copilot-instructions.md com base nessa mensagem
//  e nesse diff, mantendo histórico resumido"

fs.appendFileSync(
  'copilot-instructions.md',
  `\n## ${commitMsg.trim()}\n${diff.substring(0, 500)}\n`
);
