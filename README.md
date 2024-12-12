# Member Management Dashboard

This project is a **Member Management App** that provides functionality to manage and display user data, activity logs, and members in a table. It includes authentication to ensure that only authorized users can access the dashboard. The project is built using **Vite**, **React** with **TypeScript** and employs `useContext` for global state management.

---

## Features

### Core Features
- **Authentication**:
  - Users can log in or sign up.
  - Dashboard access is restricted to authenticated users.
  
- **Dashboard**:
  - Displays the number of users.
  - Shows user activity logs.
  - Lists members in a table format.

- **Profile Management**:
  - Users can upload profile pictures.
  - Fields include first name, last name, date of birth, phone number, and profile picture.


## Technologies Used

- **Frontend**:
  - Vite
  - React
  - Typescript

- **Backend**:
  - Node.js with Express (for the API)
  - Hosted on Vercel: [Member Management Backend](https://member-management-backend.vercel.app)

## Installation and Setup

### Prerequisites
- Node.js (v21)
- npm 

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/kwambiee/membrews-master.git
   cd membrews-master
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open the app in your browser:
   ```
   http://localhost:3000
   ```

---

## Environment Variables

Create a `.env.local` file in the root directory and add the following variables:

```env
NEXT_PUBLIC_BACKEND_URL=https://member-management-backend.vercel.app
```

---

## Authentication Flow

1. **Sign Up**:
   - Collect user details: first name, last name, date of birth, phone, and profile picture.
   - Send the data to the backend API for registration.

2. **Log In**:
   - Authenticate with email and password.
   - Receive a token and userId from the backend.

3. **Dashboard Access**:
   - Validate token with `useContext`.
   - Redirect to the login page if the user is unauthenticated.



## Contributions

Contributions are welcome! Please create a pull request with your proposed changes.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

## Contact

For any questions or feedback, please contact:
- Name: Joy Kwamboka
- Email: [kwambokaj2.jk@gmail.com](mailto:kwambokaj2.jk@gmail.com)
- GitHub: [https://github.com/kwambiee](https://github.com/kwambiee)

