# Contributing to ScamShield AI

Thank you for your interest in contributing! We welcome all contributions.

## How to Contribute

### 1. Fork the Repository
```bash
git clone https://github.com/YOUR_USERNAME/ScamShield-AI.git
cd ScamShield-AI
```

### 2. Create a Feature Branch
```bash
git checkout -b feature/your-feature-name
```

### 3. Make Your Changes
- Keep commits clean and descriptive
- Follow the existing code style
- Use TypeScript for new code
- Add comments for complex logic

### 4. Test Your Changes
```bash
npm run dev
npm run lint
```

### 5. Commit and Push
```bash
git commit -m "Add: Description of changes"
git push origin feature/your-feature-name
```

### 6. Create a Pull Request
- Describe what you changed
- Explain why these changes were needed
- Reference any related issues

## Code Style

- Use TypeScript
- Follow existing patterns
- Components use functional syntax
- Props are typed
- Use Tailwind CSS for styling
- ESLint rules enforced

## Project Structure

When adding features:
- Components go in `src/components/`
- Pages go in `src/pages/`
- Utilities go in `src/utils/`
- Types go in `src/types/`
- Stores go in `src/store/`

## File Naming

- React components: `PascalCase.tsx`
- Utilities: `camelCase.ts`
- Styles: Inline Tailwind CSS

## Commit Messages

Use conventional commits:
- `feat: Add new feature`
- `fix: Fix a bug`
- `docs: Update documentation`
- `style: Code style changes`
- `refactor: Refactor code`
- `test: Add tests`
- `chore: Build/dependency updates`

## Before Submitting

- Test your changes thoroughly
- Run `npm run lint`
- Update documentation if needed
- Add comments to complex code
- Ensure no console errors

## Areas for Contribution

- Bug fixes
- Feature enhancements
- Documentation improvements
- Performance optimization
- Accessibility improvements
- Internationalization
- Test coverage

## Questions?

Open a GitHub discussion or issue for questions!

Thank you for contributing! 🙏
