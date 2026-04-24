# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

Lab Overview
In this lab, you will create a set of reusable UI components for your company’s internal component library. You will practice creating TypeScript React components with proper prop typing, component composition, and prop handling. This lab focuses on component creation, TypeScript interfaces, prop handling, and component composition using React and TypeScript.

Workplace Context
Imagine you are a frontend developer tasked with building a component library for your company’s internal applications. Your team needs a set of reusable, type-safe components that can be easily configured for different use cases. These components will be used across multiple applications, so they need to be well-documented, properly typed, and flexible enough to handle various scenarios.

This lab will help you practice building the foundational components that will be used throughout your company’s applications.

Objectives
By the end of this lab, you will:

Create reusable React components with TypeScript interfaces for props.
Implement proper prop handling and validation.
Use component composition effectively.
Apply TypeScript best practices for component development.
Document components with clear prop interfaces.

Activity Tasks
Component Implementation:

Implement each component according to its interface requirements.
Use proper TypeScript types and interfaces.
Implement prop validation where appropriate.
Handle optional props and children correctly.
Component Testing:

Test different prop combinations.
Verify that components render correctly with various props.
Component Composition:

Create example usage of components working together.
Demonstrate prop passing between components.
Show how to handle component nesting.
Documentation:

Add comments to describe component props.
Create example usage documentation.
Document any special prop handling or requirements.

Reflection Questions
How did you handle optional props in your components?
- Handling Optional Props: Optional props were managed using TypeScript's optional property syntax (?) in interfaces, allowing components like AlertBox, ProductDisplay, and UserProfileCard to conditionally render elements (e.g., close buttons, descriptions, or edit buttons) only when the prop is provided, ensuring flexibility without breaking functionality.

What considerations did you make when designing the component interfaces?
- Designing Component Interfaces: Interfaces were designed with clear, descriptive names and included both required and optional properties, prioritizing reusability by supporting common use cases like displaying user details or product info, while keeping the API simple and intuitive for future developers integrating the components.

How did you ensure type safety across your components?
- 
Ensuring Type Safety: Type safety was achieved through strict TypeScript interfaces that defined exact prop types, including unions for alert types and object shapes for user/product data, with verbatimModuleSyntax enforcing type-only imports to prevent runtime errors and maintain compile-time checks across all components.

What challenges did you face when implementing component composition?

- Challenges in Component Composition: Component composition was challenging when handling nested children and prop passing between components, requiring careful prop drilling and ensuring that optional children rendered correctly without disrupting layout, which was resolved by using React's children prop and conditional rendering patterns.

I had Github-Copilot help me with some red squiggly line TS errors, and this is the way it resolved them: "Build and Configuration Fixes: The project addressed build errors by updating TypeScript configurations to exclude test files and use type-only imports, resolving red-squiggle issues and ensuring the component library compiled successfully while maintaining strict type checking".