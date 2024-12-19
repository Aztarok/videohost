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

## To-Do List:
❌ Protect specific pages with auth logic\
❌ Create profile and settings pages\
❌ Make uploading videos possible\
❌ Send the videos to supabase and fetch them\
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

