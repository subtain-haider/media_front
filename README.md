
# File Management Dashboard

This project is a **File Management Dashboard** built with **Next.js** and **TypeScript**. It allows authenticated users to upload files (images/videos), tag them, generate public shareable links, and organize them using drag-and-drop functionality.

## Features

1. **User Authentication**:
    - Users must log in to access the dashboard.
    - Tokens are managed for secure access.

2. **File Upload**:
    - Upload image or video files.
    - Add tags for better categorization.
    - Files are stored on the backend and displayed in the UI.

3. **Drag-and-Drop File Organization**:
    - Users can reorder uploaded files using drag-and-drop functionality powered by `@hello-pangea/dnd`.

4. **Generate Public Links**:
    - Users can generate a public link for files.
    - Public links allow anyone (even unauthenticated users) to view/download the files.

5. **Responsive UI**:
    - Built using **Material UI** for clean and responsive design.
    - Error notifications are handled using `react-toastify`.

---

## Tech Stack

- **Frontend**:
    - Next.js (React Framework)
    - TypeScript
    - Material UI (UI Components)
    - @hello-pangea/dnd (Drag-and-Drop)
    - React Dropzone (File Upload)
    - React Toastify (Notifications)

- **Backend**:
    - Node.js with Express.js (for handling API requests)
    - MongoDB (for storing files metadata)
    - Multer (for file uploads)
    - Authentication via JWT

---

## Installation

### Prerequisites

- **Node.js** (v16 or later)
- **npm** or **yarn**

### Steps

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```
   or
   ```bash
   yarn
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```
   or
   ```bash
   yarn dev
   ```

4. The app will be available at [http://localhost:3000](http://localhost:3000).

---

### Environment Variables

The API URL is configurable through environment variables. Add the following to a `.env` file in the project root:

```env
REACT_APP_API_URL=http://localhost:5002/api  # For Development
REACT_APP_API_URL=https://your-production-api.com/api  # For Production


```
## Project Structure

```
.
├── components/
│   ├── FileList.tsx      # Component for displaying and managing files
│   ├── UploadDialog.tsx  # Dialog for uploading files
├── services/
│   ├── fileService.ts    # API services for file-related operations
├── utils/
│   ├── tokenHelper.ts    # Token management utilities
├── app/
│   ├── dashboard/
│   │   ├── page.tsx      # Dashboard Page (Main UI)
│   ├── auth/
│   │   ├── login/        # Authentication pages (optional)
├── public/
│   ├── uploads/          # Uploaded files (served from backend)
├── README.md             # Project Documentation
├── package.json          # Dependencies and Scripts
└── tsconfig.json         # TypeScript Configuration
```

---

## API Endpoints

Ensure your backend supports these endpoints:

1. **Upload Files**:
    - Endpoint: `POST /api/files/upload`
    - Payload: `FormData` with `files` and `tags`.

2. **Fetch User Files**:
    - Endpoint: `GET /api/files/my`
    - Returns user's uploaded files.

3. **Generate Public Link**:
    - Endpoint: `POST /api/files/generate-link/:fileId`
    - Returns a shareable public link.

4. **View File via Public Link**:
    - Endpoint: `GET /api/files/public/:token`

---

## Environment Variables

Create a `.env.local` file for frontend configuration:

```
NEXT_PUBLIC_API_URL=http://localhost:5002/api
```

Replace `http://localhost:5002/api` with your backend API URL.

---

## Usage

1. **Upload Files**:
    - Click the "Upload New Files" button.
    - Drag & drop or select files and add tags.

2. **View Files**:
    - Uploaded files appear in a list with file names, sizes, and tags.

3. **Generate Public Link**:
    - Click the "Copy Link" button to generate a shareable public link.

4. **Reorder Files**:
    - Use drag-and-drop to reorder files.

---

## Screenshots

### Dashboard
![Dashboard](https://via.placeholder.com/800x400?text=Dashboard+View)

### File Upload Dialog
![Upload Dialog](https://via.placeholder.com/800x400?text=Upload+Dialog)

---

## Acknowledgments

- **Material UI** for elegant UI components.
- **@hello-pangea/dnd** for drag-and-drop functionality.
- **React Toastify** for notifications.

---
