[![Build Status](https://travis-ci.org/uniqueayo1988/iReporter-frontend.svg?branch=develop)](https://travis-ci.org/uniqueayo1988/iReporter-frontend) [![Coverage Status](https://coveralls.io/repos/github/uniqueayo1988/iReporter-frontend/badge.svg?branch=develop)](https://coveralls.io/github/uniqueayo1988/iReporter-frontend?branch=develop)

# iReporter Frontend App

## Project Overview
The **iReporter** app is developed to curb the menace of corruption in Africa. The app enables any/every citizen to bring any form of corruption to the notice of appropriate authorities and the general public. Users can also report on things that need government intervention.

### Application Link
Front-end: https://ireporter-client.herokuapp.com/
Back-end: https://andela-ireporter.herokuapp.com/

### UI Template Link
html/css/js link: https://uniqueayo1988.github.io/iReporter/UI

### Pivotal Tracker Link
https://www.pivotaltracker.com/n/projects/2313129

## Features

### Users

1. Users can create an account and log in

2. A user can create a red-flag record (An incident linked to corruption) or an intervention record (a call for a government agency to intervene e.g repair bad road sections, floodings etc).

3. A user can edit or delete records in draft.

4. A user can see all records by individual users.

5. A user can see all records in draft.

6. The admin user is able to do the following:
a. See a list of records.
b. Change the status of a record.

### Admin

1. Admin can change the status of a red-flag/intervention records

2. Admin can list all red-flags/intervention records created by all users.

## Getting Started

```
# Clone the app
git clone https://github.com/uniqueayo1988/ireporter-frontend.git

# Switch to directory
cd iReporter-frontend

# Install Package dependencies and devDependencies
npm install

# Start the application
npm run start

# View the application
localhost:8080

# Admin login
email: admin@admin.com
password: admin
```

## Testing
* Server side tests - Run `npm run test`

## Resources

* https://reactjs.org/

* https://reacttraining.com/react-router/web/api/Link

* https://jestjs.io

## License and Copyright

&copy; Ayo-Oluwa Adebayo

Licensed under the [MIT License](https://opensource.org/licenses/MIT).
