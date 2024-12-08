# MCDA Project (Into the Kitchen) Recipe Finder

A full-stack web application built with React and ASP.NET Core that allows users to discover, share, and shop for recipes. Users can browse through user-generated recipes and conveniently purchase the required ingredients.

## Project Structure

```
src/
├── mcda_project.client/     # React Frontend
│   ├── src/                 # React source files
│   ├── public/             # Static assets
│   └── package.json        # Frontend dependencies
└── MCDA_Project.Server/    # ASP.NET Core Backend
    ├── Controllers/        # API endpoints
    ├── Models/            # Data models
    ├── Data/              # Database context
    └── Migrations/        # Database migrations
```

## Tech Stack

### Frontend
- React
- Vite (Build tool)
- Tailwind CSS (Styling)
- ESLint (Code linting)

### Backend
- ASP.NET Core
- Entity Framework Core
- SQL Server

## Key Features

- User-generated recipe sharing platform
- Detailed recipe viewing with ingredients and instructions
- Ingredient shopping functionality
- User authentication and profile management
- Recipe search

## Prerequisites

- Node.js and npm
- .NET 7.0 SDK or later
- SQL Server

## Getting Started

1. Clone the repository
```bash
git clone [repository-url]
```

2. Setup Frontend
```bash
cd src/mcda_project.client
npm install
npm run dev
```

3. Setup Backend
```bash
cd src/MCDA_Project.Server
dotnet restore
dotnet run
```

## Development

- Frontend development server runs on `http://localhost:5173`
- Backend API server runs on `http://localhost:5000`

## User Features

### For Recipe Creators
- Create and publish recipes
- Upload recipe images
- Specify ingredients and quantities
- Add step-by-step instructions
- Edit and manage published recipes

### For Recipe Browsers
- Browse through community recipes
- Search recipes by ingredients or name
- Filter recipes by categories
- Save favorite recipes
- Purchase recipe ingredients directly

### Shopping Features
- Add ingredients to shopping cart
- Secure checkout process

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
