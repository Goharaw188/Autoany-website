# Autoany Website

A modern, responsive website built with React, TypeScript, and Vite. This project showcases automation services with an elegant design featuring smooth animations, interactive components, and a professional user interface.

## Features

- **Modern React Architecture**: Built with React 18, TypeScript, and Vite for optimal performance
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Smooth Animations**: Powered by Framer Motion and GSAP for engaging user experiences
- **Component Library**: Comprehensive UI components using Radix UI and shadcn/ui
- **Interactive Elements**: Custom components including carousels, galleries, and navigation
- **Performance Optimized**: Fast loading with Vite's build system

## Tech Stack

- **Frontend**: React 18, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI, shadcn/ui
- **Animations**: Framer Motion, GSAP
- **Routing**: React Router DOM
- **State Management**: TanStack Query
- **Icons**: Lucide React

## How to Run

### Prerequisites

Make sure you have Node.js (version 16 or higher) and npm installed on your system.

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd autoany-website-main
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the port shown in your terminal).

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## How to Test

### Running Tests

To run the test suite for this project, execute the following command in your terminal:

```bash
npm test
```

### Testing Components

For component-specific testing, you can run:

```bash
# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Manual Testing

1. **Responsive Design**: Test the website on different screen sizes (mobile, tablet, desktop)
2. **Navigation**: Verify all navigation links work correctly
3. **Animations**: Check that all animations and transitions work smoothly
4. **Performance**: Use browser dev tools to check loading times and performance metrics

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   └── ...             # Custom components
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── assets/             # Static assets
└── main.tsx           # Application entry point
```

## Development

### Adding New Components

1. Create your component in the `src/components/` directory
2. Follow the existing naming conventions and TypeScript patterns
3. Export the component and import it where needed

### Styling Guidelines

- Use Tailwind CSS classes for styling
- Follow the existing design system and color palette
- Ensure responsive design principles are maintained

## Deployment

### Production Build

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

### Deployment Options

- **Vercel**: Connect your GitHub repository for automatic deployments
- **Netlify**: Drag and drop the `dist` folder or connect via Git
- **GitHub Pages**: Use GitHub Actions for automated deployment
- **AWS S3**: Upload the `dist` folder to an S3 bucket with static hosting

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.