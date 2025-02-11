# Aztarok Dev Log

## 12/10/24:

### Made auth with Supabase and can redirect users out of protected pages, but there are no pages that need to be protected yet.

## 12/11/24:

### Commit 1: Added Shadcn Button and Input components. Created a Navbar where it can detect if a user is logged in or not. Plus the navbar can redirect to the profile page and auth pages and can sign users out.
### Commit 2: Used the Shadcn components to create login and sign up forms. The forms are also changed based on the route in the auth group layout.tsx automatically.
### Commit 3: Fixed README

## 12/13/24:

### Commit 1: Made the auth seamless for the email and password sign up, sign in, and sign out. Now I can work on the main page and I will add google auth later.

## 12/16/24:

### Commit 1: Reformatted the layout and now it looks clean. Just have to add features to the buttons.

## 12/17/24:

### Commit 1: Added Zustand and Immer global state context for videos. Added custom types and working on pagination.
### Commit 2: Added pagination that works property and looks nice.
### Commit 3: FIXED Display Issue and README.

## 12/18/24:

### Commit 1: Fixed x overflow on layout.tsx. The problem was because I had w-full on a server component layout I think. It fixed the problem of the layout shifting when clicking dialog boxes and even when adding more videos to the page.
### Commit 2: Spruced up Zustand with Immer and Persist middlewares. Now the app can tell when to fetch a user's data and when to chill out. Styled the navbar for better UX. Made better types for videos and users. Main layout has been styled. Supabase trigger functions when user signs up. Supabase profiles table.
### Commit 3: Cleaned up hydration for Supabase and Zustand fetchs. Removed a useless localStorage variable. Fixed passing session down and the Session type. Can sign up and sign in cleanly. I just have to update the sign up and sign in forms to accept user input again because I am using dummy data. 

## 12/19/24:

### Commit 1: Auth is now correctly fetched based on if the user is logged in or not. Auth is also stored in Zustand forever, after an initial Supabase fetch when a user signs in.

## 12/20/24:

### Commit 1: Starting work on the video uploading and fetching. The first thing that is finished is the video page layout.

## 12/31/24:

### Commit 1: Added Tanstack Query, React Dropzone, more types and more zustand stores and another page for uploading and fixed auth pages. Made protected route to upload videos. Added drag and drop to upload files. Made uploading videos to Supabase possible. FINALLY finished the best version of auth fetching and storage I could think of. Future plans are to fetch videos from Supabase and react to them, add profile and following systems, let people download videos, add Google sign in.

## 2/10/25:

### Commit 1: First commit in 2025! I made it possible to upload thumbnails and videos to Supabase.
###

## To-Do List:
❌ Create profile and settings pages\
✅ Made it possible to delete videos\
✅ Made it possible to watch videos\
✅ Fetch videos from Supabase\
✅ Make uploading thumbnails possible\
✅ Make uploading videos possible\
✅ Send the videos to supabase\
✅ Protect specific pages with auth logic\
✅ Create Supabase trigger function to detect when a user signs up\
✅ Create Supabase table for user data\
✅ Style the layout for the main page\
✅ Style the Navbar for better UX\
✅ Make better types for videos and users\
✅ Add Zustand store with immer and persistance\
✅ Add Pagination\
✅ Display Videos Nicely\
✅ Improve the authentication experience for users\
✅ Implement Shadcn Button and Input components\
✅ Detect logged-in state in Navbar\
✅ Add redirect logic to profile and auth pages

