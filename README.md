# Windows 365 Readiness Assessment

A single-page web application to help Microsoft Customer Success Architects (CSAs) assess whether a customer is ready to deploy Windows 365.

## Features

- Checklist of key readiness areas: Entra ID setup, Intune enrollment, network requirements, licensing, and endpoint configuration
- Color-coded status indicators: Green (Ready), Yellow (In Progress), Red (Not Started)
- Dynamic Next Steps section with specific actions for areas not ready

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

Start the development server:
```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

## Usage

1. For each readiness area, select the current status from the dropdown.
2. The status indicator will update with the appropriate color.
3. The Next Steps section will display actionable items for areas that are not yet ready.

## Technologies Used

- Vite
- Vanilla JavaScript
- CSS