# Modern E-commerce Store

A full-featured e-commerce store built with React, Redux, and Tailwind CSS.

## 🚀 Features

- 🛍️ Product catalog with categories
- 🔍 Advanced product search and filtering
- 🛒 Shopping cart functionality
- 💳 Secure checkout process with Stripe integration
- 📱 Fully responsive design
- ⚡ Fast and optimized performance
- 🔄 Real-time cart updates
- 🌓 Light/Dark mode support

## 🛠️ Tech Stack

- ⚛️ React 18
- 🔄 Redux Toolkit for state management
- 🎨 Tailwind CSS for styling
- 🚀 Vite for fast development and building
- 🔄 React Router for navigation
- 💳 Stripe for payments
- 📦 React Icons
- 📝 React Hot Toast for notifications

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn
- Stripe account for payment processing

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/ecommerce-store.git
   cd ecommerce-store
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn
   ```

3. Set up environment variables
   - Create a `.env` file in the root directory
   - Add your Stripe public key:
     ```
     VITE_APP_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
     ```

4. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## 📂 Project Structure

```
src/
├── components/         # Reusable UI components
├── pages/             # Page components
├── store/             # Redux store configuration
│   ├── slices/        # Redux slices
│   └── store.js       # Store configuration
├── assets/            # Static assets
├── styles/            # Global styles
└── utils/             # Utility functions
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```
VITE_APP_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
VITE_APP_API_URL=your_api_url
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- [Stripe](https://stripe.com/)

 