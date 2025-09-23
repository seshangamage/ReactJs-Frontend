# Laptop Management System - React Frontend

A React.js frontend application for managing laptop inventory with full CRUD operations.

## Features

- **View Laptops**: Browse all laptops in a responsive table format
- **Add Laptop**: Create new laptop entries with detailed specifications
- **Edit Laptop**: Update existing laptop information
- **Delete Laptop**: Remove laptops from the inventory
- **View Details**: See comprehensive laptop information
- **Responsive Design**: Works on desktop and mobile devices

## Backend API

This frontend connects to: `https://sheshantestbackend-hxeugfb9bzf8baem.canadacentral-01.azurewebsites.net/api/laptops`

## Tech Stack

- React 18
- React Router DOM (for navigation)
- React Bootstrap (UI components)
- Axios (HTTP client)
- Bootstrap 5 (styling)

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd ReactJs-Frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:3000`

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## Project Structure

```
src/
├── components/
│   ├── NavigationBar.js    # Main navigation component
│   ├── LaptopList.js       # Display all laptops in table format
│   ├── LaptopForm.js       # Form for creating/editing laptops
│   └── LaptopDetails.js    # Detailed view of a single laptop
├── services/
│   └── laptopService.js    # API service for laptop operations
├── App.js                  # Main app component with routing
├── index.js               # App entry point
└── index.css              # Global styles
```

## API Integration

The application integrates with the following API endpoints:

- `GET /api/laptops` - Fetch all laptops
- `GET /api/laptops/:id` - Fetch a specific laptop
- `POST /api/laptops` - Create a new laptop
- `PUT /api/laptops/:id` - Update an existing laptop
- `DELETE /api/laptops/:id` - Delete a laptop

## Usage

### Adding a New Laptop
1. Click "Add New Laptop" button
2. Fill in the required fields (Brand and Model are mandatory)
3. Add optional specifications and description
4. Click "Create Laptop"

### Editing a Laptop
1. Click "Edit" button next to any laptop in the list
2. Modify the fields as needed
3. Click "Update Laptop"

### Viewing Laptop Details
1. Click "View" button next to any laptop
2. See comprehensive information about the laptop
3. Edit or delete from the details page if needed

### Deleting a Laptop
1. Click "Delete" button next to any laptop
2. Confirm the deletion in the popup dialog

## Error Handling

- Network errors are displayed with user-friendly messages
- Form validation prevents submission of incomplete data
- Loading states provide feedback during API calls
- Success messages confirm completed operations

## Responsive Design

The application is fully responsive and works well on:
- Desktop computers
- Tablets
- Mobile phones

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
