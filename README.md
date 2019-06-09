# JobHunters

Link to Job Hunters app: [JobHunters](https://jobs-hunter.herokuapp.com/)

## Job Hunters Front-End Overview

Job Hunters [Back-End Overview](https://github.com/RomanBogatikov/jobhunters_backend)


Job Hunters removes the friction of having to visit multiple job platforms or search your inbox to find your dream job!

The Job Hunters application solves the problem of job seekers searching for jobs online and not having a simple way to save the jobs they are interested in. As employers distribute jobs across the internet, job seekers can come across jobs anywhere. Prior to Job Hunters, one of the ways to save a job was to email yourself the link.

Users can add the company name, job title, role description and a link to the online application. The added jobs are then saved to the “Jobs Inbox.” A user can directly access the job link to apply and update their jobs inbox to reflect so.

## Technical Details

To build the front-end of the Jobs Hunter application we used React.js. There is a total of four component routes for the NavBar, Login/Authorization, Create a new job form and a route to show the job details. For CSS styling, we utilized React-Materialize for a clean, modern and professional look.

**The technical challenges we expeirenced to build the front-end were:**

* Implementing login with React and Express
* Rendering user specific jobs from logged in user

## Future Improvements

The project deadline was six days to build. If allowed more time, we would build out react routes to navigate the website, add web tokens for user authorization and build out site functionality such as a user dashboard to upload resume, application notes and total applied jobs. Regarding UX/UI, we would update the form to post in descending order to render the most recently added jobs first, add date to track application timing, and a contacted field noting if the employer has reached out.


**User stories:**
* When new user signs up, the user is logged in automatically
* When user tries to sign up with a username that exists in the database, a meaningful error message is displayed
* When user tries to log in with a wrong username or password, a meaningful error message is displayed
* When an existing user tries to sign up instead of logging in, a meaningful error message is displayed
* A logged in user sees a list of saved jobs
* A user can Create, Read, Update, Delete a job from a job list

PS. JobHunters was a group project (group of 3) where I worked mostly on user login/signup and backend routes

