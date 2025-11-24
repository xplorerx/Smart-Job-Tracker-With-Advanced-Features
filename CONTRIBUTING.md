# Contributing

Thanks for your interest in contributing! This project aims to be practical, accessible, and privacy-first.

## Code of conduct
See CODE_OF_CONDUCT.md.

## How to contribute
1. Open an issue to discuss your proposal.
2. Small fixes: PR referencing the issue.
3. Larger changes: propose an RFC with problem, solution, alternatives, impact.

## Setup
- `pnpm install`
- `cp .env.example .env`
- `pnpm prisma migrate dev && pnpm prisma generate`
- `pnpm dev`

## Guidelines
- TypeScript with strict types where feasible
- Accessibility and privacy considerations
- Add tests for utilities and analytics

## Commit style
Use clear, descriptive messages: feat/fix/docs/test.

## PR checklist
Linked issue, description, screenshots (if UI), tests, no secrets, accessibility considered.
