// comment-above-the-code-35e38026: The Comment Above the Code.
// This program writes one line to /output/entry.txt, where the gate
// reads it. The line is the comment a developer left above fragile
// production code: funny because it is painfully true.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// The line: a sleep(200) nobody dares remove, because twice already
// it turned out to be load-bearing. The failure is specific and
// recognisable — a magic delay quietly holding checkout together —
// and the punchline lands on the last words: he tested it twice and
// refuses to test it a third time. It reads like a real comment left
// in a real codebase by someone who has been burned and learned.
const LINE =
  '// WARNING: removing this sleep(200) breaks checkout in production. I tested it twice. I will not test it a third time.';

// The gate: /output/entry.txt must be UTF-8 text of 1 to 200
// characters, one line, not only white space.
if (LINE.length < 1 || LINE.length > 200 || !LINE.trim() || LINE.includes('\n')) {
  console.error('entry must be 1-200 characters, one line, non-whitespace text');
  process.exit(1);
}

// No trailing newline: the file is exactly the one line.
mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(join(OUTPUT_DIR, 'entry.txt'), LINE);
console.log(`wrote ${LINE.length} chars to ${join(OUTPUT_DIR, 'entry.txt')}`);
