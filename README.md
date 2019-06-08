<h1>JobHunters</h1>
Link to Job Hunters app: [JobHunters](https://jobs-hunter.herokuapp.com/)
<h2>Job Hunters Front-End Overview </h2>
Job Hunters [Back-End Overview](https://github.com/RomanBogatikov/jobhunters_backend)
<p>
Job Hunters removes the friction of having to visit multiple job platforms or search your inbox to find your dream job!
</p>

<p>
The Job Hunters application solves the problem of job seekers searching for jobs online and not having a simple way to save the jobs they are interested in. As employers distribute jobs across the internet, job seekers can come across jobs anywhere. Prior to Job Hunters, one of the ways to save a job was to email yourself the link.
</p>

<p>
Users can add the company name, job title, role description and a link to the online application. The added jobs are then saved to the “Jobs Inbox.” A user can directly access the job link to apply and update their jobs inbox to reflect so.
</p>

<h2>Technical Details </h2>

<p>
To build the front-end of the Jobs Hunter application we used React.js. There is a total of four component routes for the NavBar, Login/Authorization, Create a new job form and a route to show the job details. For CSS styling, we utilized React-Materialize for a clean, modern and professional look.
</p>

<p>
The technical challenges we expeirenced to build the front-end were:

<li>Implementing login with React and Express
</li>

<li>Rendering user specific jobs from logged in user
</li>
</p>

<h2>Improvements</h2>

<p>The project deadline was six days to build. If allowed more time, we would build out react routes to navigate the website, add web tokens for user authorization and build out site functionality such as a user dashboard to upload resume, application notes and total applied jobs. Regarding UX/UI, we would update the form to post in descending order to render the most recently added jobs first, add date to track application timing, and a contacted field noting if the employer has reached out.
</p>

<p>User stories:</p>
<li>When new user signs up, the user is logged in automatically</li>
<li>When user tries to sign up with a username that exists in the database, a meaningful error message is displayed</li>
<li>When user tries to log in with a wrong username or password, a meaningful error message is displayed</li>
<li>When an existing user tries to sign up instead of logging in, a meaningful error message is displayed</li>
<li>A logged in user sees a list of saved jobs</li>
<li>A user can Create, Read, Update, Delete a job from a job list</li>

<p>PS. JobHunters was a group project (group of 3) where I worked mostly on user login/signup and backend routes</p>

