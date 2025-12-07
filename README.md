# Juicebox

A modern Next.js web application featuring interactive tutorials, surveys, and animated transitions. Built with React 19, Next.js 16, and GSAP animations.

## Features

- **Interactive Tutorial Flow**: Multi-step tutorial with Swiper integration and character-by-character text animations
- **Dynamic Survey System**: Form validation using Zod with step-by-step data collection
- **Smooth Animations**: GSAP-powered page transitions and background gradients
- **Lottie Animations**: Interactive Lottie animations that respond to page context
- **Smooth Scrolling**: Lenis smooth scroll implementation
- **Responsive Design**: Mobile-first design optimized for iPhone 14 Pro Max (430x932px)
- **Type Safety**: Full TypeScript support throughout the application

## Tech Stack

- **Framework**: Next.js 16.0.6 (App Router)
- **React**: 19.2.0
- **TypeScript**: 5.x
- **Styling**: Tailwind CSS 4.x
- **Animations**:
  - GSAP 3.13.0
  - Lottie Web 5.13.0
- **UI Components**:
  - Swiper 12.0.3 (carousel/slider)
  - Lenis 1.0.42 (smooth scrolling)
- **Validation**: Zod 4.1.13

## Prerequisites

- Node.js 20.x or higher
- npm or yarn package manager

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd juicebox
```

### 2. Install Dependencies

```bash
npm install
```

or if you're using yarn:

```bash
yarn install
```

### 3. Run the Development Server

```bash
npm run dev
```

or with yarn:

```bash
yarn dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### 4. Build for Production

```bash
npm run build
npm start
```

or with yarn:

```bash
yarn build
yarn start
```

## Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Creates an optimized production build
- `npm start` - Starts the production server
- `npm run lint` - Runs ESLint to check code quality

## Project Structure

```
juicebox/
├── app/
│   ├── components/          # Reusable UI components
│   │   ├── AnimatedBackground.tsx
│   │   ├── CTAButton.tsx
│   │   ├── DotIndicator.tsx
│   │   ├── IconButton.tsx
│   │   ├── Input.tsx
│   │   ├── TopNav.tsx
│   │   └── screens/        # Page-level components
│   ├── contexts/           # React Context providers
│   │   ├── BackButtonContext.tsx
│   │   ├── CTAButtonContext.tsx
│   │   ├── FormDataContext.tsx
│   │   ├── LoaderContext.tsx
│   │   ├── LottieContext.tsx
│   │   └── NavigationContext.tsx
│   ├── styles/             # CSS modules
│   │   ├── button.css
│   │   ├── form.css
│   │   ├── layout.css
│   │   ├── positioning.css
│   │   └── typography.css
│   ├── tutorial/           # Tutorial page
│   ├── survey/             # Survey page
│   ├── results/            # Results page
│   ├── onboarding/         # Onboarding page
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── public/                 # Static assets
└── package.json
```

## Key Features Explained

### Animated Background System

The app features a sophisticated background animation system that smoothly transitions between different gradient states:

- **Home**: Radial gradient from top
- **Tutorial (first slide)**: Centered radial gradient
- **Other pages**: Default top gradient

All transitions are handled by the `AnimatedBackground` component with 0.8s GSAP animations.

### Context-Based State Management

The application uses React Context for global state management:

- **NavigationContext**: Handles page transitions
- **CTAButtonContext**: Manages the floating CTA button state
- **LottieContext**: Controls Lottie animation size and behavior
- **FormDataContext**: Persists form data across pages
- **LoaderContext**: Manages initial loading state

### Form Validation

All form inputs use Zod schemas for type-safe validation:
- Email validation with proper format checking
- Name validation with length requirements
- Real-time error feedback

## Design Specifications

- **Mobile viewport**: 430px × 932px (iPhone 14 Pro Max)
- **Desktop constraint**: Content is centered with max-width
- **Status bar height**: 46px
- **Background height**: 481px (527px - 46px status bar)

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile Safari (iOS)
- Chrome for Android

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and proprietary.

## Contact

For questions or support, please contact the development team.
