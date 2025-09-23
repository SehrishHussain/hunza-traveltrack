#  Location Tracking App 🌍

A full-stack location tracking application built with React Native (frontend), Express.js (backend), and MongoDB (database). Designed for travelers and outdoor enthusiasts to share their GPS location even in low-connectivity environments.

##  Overview

This application allows authenticated users to periodically share their GPS location, with robust offline capabilities that cache data when internet is unavailable and sync automatically when connectivity is restored. Perfect for travel safety, outdoor exploration, or remote-area tracking scenarios.

##  Tech Stack

### Frontend (Mobile App)
- **React Native** (migrating from Expo → Bare React Native)
- **Redux** for state management (auth token, user state)
- **AsyncStorage** for local persistence
- **NetInfo** for online/offline detection
- **Expo Location API** (transitioning to `react-native-background-geolocation`)

### Backend (API Server)
- **Express.js** with TypeScript
- **MongoDB** + Mongoose ODM
- **JWT authentication** (Google OAuth planned)
- REST API for saving and retrieving user locations

### Database Models
- **User**: stores authentication details
- **Location**: stores user ID reference, coordinates, and timestamp

##  Features Implemented ✅

### Mobile App
- **Authentication-aware location tracking** - Associates location entries with logged-in user
- **Current Location Retrieval** - GPS coordinates using expo-location with permission handling
- **Online/Offline Handling** - Caches locations in AsyncStorage when offline, syncs when online
- **Modular Utilities** - Consistent location fetching and storage logic
- **UI Feedback** - Loader + status messages with comprehensive error handling

###  Backend API
- **Location API** - POST `/api/location/save` endpoint with user reference
- **MongoDB Integration** - Location schema referencing User via ObjectId
- **Secure Data Storage** - Timestamped location entries with user association

## 🚧 Roadmap & Next Steps

###  Background Location Tracking
- Migrate to Bare React Native
- Integrate `react-native-background-geolocation` for periodic updates
- Enable tracking when app is in background or killed

###  Sync Cached Locations
- Automatic sync of unsynced locations on app resume
- Background service for delayed synchronization

###  User Dashboard
- Next.js frontend for location history visualization
- Map-based display of user routes
- Trip-based grouping and analytics

###  Enhanced Authentication
- Google OAuth integration
- Secure token management and refresh

##  Use Cases

- **Travelers in remote areas** - Mountains, valleys, and low-internet regions
- **Safety tracking** - Solo trips and adventure activities
- **Offline-first applications** - Where delayed syncing is acceptable
- **Field research** - Location data collection in connectivity-challenged environments

##  Current Status ⚡

**Core functionality implemented**: Location tracking with online/offline handling is fully operational. Currently transitioning from Expo to Bare React Native to enable advanced background tracking capabilities.

##  Getting Started

### Prerequisites
- Node.js 16+
- MongoDB 4.4+
- React Native development environment
- iOS/Android simulator or physical device

### Installation
```bash
# Clone the repository
git clone https://github.com/SehrishHussain/traveltrack.git

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../mobile
npm install

# Start development servers
# Backend (runs on port 3001)
cd ../backend
npm run dev

# Frontend (iOS)
cd ../mobile
npx react-native run-ios

# Frontend (Android)
npx react-native run-android
```

### Environment Setup
Create `.env` files in both backend and mobile directories with appropriate configuration variables.


##  Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

##  License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

##  Team

- **Sehrish Hussain** - Project Lead & Developer

##  Support

For support, email [email protected] or create an issue in the repository.

---

**Built with ❤️ for travelers and adventurers worldwide**
## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
