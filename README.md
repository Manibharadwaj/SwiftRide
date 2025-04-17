# SwiftRide 🚗🗺️

A modern React-based ride-booking app inspired by Uber, built with real-time tracking, interactive panels, and socket integration.

## 📲 Features

- **Live User Location Tracking**: Uses Leaflet and the Geolocation API to show the user's real-time location on a map.
- **Real-time Ride Updates**: Integration with Socket.io to update the user on ride status, including vehicle availability, waiting for the driver, and ride confirmation.
- **Search Locations**: Smart pickup and destination search with live suggestions fetched from the backend.
- **Vehicle Panel**: Allows users to select their preferred vehicle and see the fare estimate.
- **Seamless UX/UI**: Uses GSAP for smooth animations and a user-friendly experience.
- **Authentication**: Secure API requests with authentication tokens.

## 🚀 Tech Stack

- **Frontend**: React, Tailwind CSS, GSAP for animations, React Leaflet for mapping
- **Backend**: Custom API (Node.js/Express) for ride fare calculation, user authentication, and more
- **Real-time Communication**: Socket.io for live updates on ride status
- **APIs**: Graphhopper API for location tracking, custom backend API for suggestions, fare, and ride management

## 🛠️ Installation

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Steps

1. **Clone the repository**:

    git clone https://github.com/Manibharadwaj/SwiftRide
    
2. **Install dependencies**:

    npm install
    
3. **Set up environment variables**:
   
    Create a `.env` file at the root of the project and define the following:


    VITE_BASE_URL=https://your-backend-url.com/api


4. **Start the application**:


    npm run dev

    The app should now be running at `http://localhost:3000`.

## 📍 Usage

1. **Open the app**: Launch the app on your browser.
2. **Search Pickup & Destination**: Enter a pickup and destination location. You will receive real-time suggestions based on your input.
3. **Select Vehicle**: Choose the vehicle type you wish to book and view the fare estimate.
4. **Confirm Ride**: Once a vehicle is selected, confirm your ride and wait for the driver to arrive.
5. **Track Ride in Real-Time**: Track your driver’s location and receive live updates via push notifications.

## 🔐 Authentication

For API requests, ensure you are logged in and have a valid authentication token. You can obtain the token by logging into the app.

### Example Authentication Header

Authorization: Bearer <your-token>
💡 Screenshots
Live location tracking on the map

Vehicle selection and fare calculation

🎯 Roadmap
Real-time vehicle tracking: Integrate real-time vehicle tracking on the map.

Push Notifications: Implement notifications for ride status changes.

Multiple Payment Options: Add payment integration for ride charges.

🤝 Contributing
We welcome contributions! Feel free to fork the repository and submit a pull request.

Fork the project.

Create a new branch (git checkout -b feature/your-feature).

Commit your changes (git commit -m 'Add new feature').

Push to the branch (git push origin feature/your-feature).

Open a pull request.

📝 License
This project is licensed under the MIT License - see the LICENSE file for details.

👨‍💻 Built By
@manibharadwajcr

Made with ❤️ by the Mani Bharadwaj C R.
