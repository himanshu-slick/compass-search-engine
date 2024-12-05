# Compass Search Engine

Navigate Your Knowledge with Precision and Elegance

## Features

- **Powerful Full-Text Search** - Advanced search capabilities with relevance scoring
- **Smart Filtering** - Filter by categories, ratings, and more
- **Real-Time Results** - Instant search results with debounced queries
- **Responsive Design** - Seamless experience across all devices
- **Modern UI/UX** - Clean and intuitive interface with smooth animations
- **Type-Safe** - Built with modern JavaScript best practices
- **Advanced Analytics** - Track search patterns and user behavior

## Tech Stack

- **Frontend**

  - Next.js 13+ (App Router)
  - Tailwind CSS
  - Lucide React Icons
  - React Hooks

- **Backend**

  - MongoDB
  - Mongoose
  - Next.js API Routes

- **Development**
  - ESLint
  - Prettier
  - Jest
  - React Testing Library

## Installation & Setup

### Prerequisites

- Node.js 18+
- MongoDB 4.4+
- npm/yarn

### Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/compass-search.git
   cd compass-search
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**

   ```bash
   # Create .env.local file
   cp .env.example .env.local

   # Add your MongoDB URI
   MONGODB_URI=mongodb://localhost:27017/compass
   ```

4. **Database Setup**

   ```bash
   # Start MongoDB (MacOS)
   brew services start mongodb-community

   # Seed the database
   npm run seed
   ```

5. **Start Development Server**

   ```bash
   npm run dev
   ```

   Visit http://localhost:3000

## Project Structure

```
compass-search/
├── app/                    # Next.js 13+ App Directory
│   ├── api/               # API Routes
│   ├── components/        # React Components
│   ├── lib/              # Utilities & Hooks
│   └── models/           # MongoDB Models
├── scripts/               # Utility Scripts
├── public/               # Static Assets
└── tests/                # Test Suites
```

## Search Features

- **Text Search**

  - Title matching (10x weight)
  - Content matching (5x weight)
  - Tag matching (3x weight)
  - Phrase matching ("exact phrase")
  - Exclusion terms (-exclude)

- **Filters**
  - Category filtering
  - Rating threshold
  - Date range
  - Author filtering

## API Endpoints

```bash
# Basic Search
GET /api/search?q=javascript

# Filtered Search
GET /api/search?q=javascript&category=programming&rating=4.5

# Advanced Search
GET /api/search?q="machine learning"&exclude=beginner
```

## Testing

```bash
# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Watch mode
npm test -- --watch
```

## Performance

- Debounced search queries
- MongoDB text indexes
- Optimized relevance scoring
- Efficient data caching
- Lazy loading results

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Next.js Documentation
- MongoDB Documentation
- Tailwind CSS
- Lucide Icons

## Contact

Your Name - @yourtwitter
Project Link: https://github.com/yourusername/compass-search
