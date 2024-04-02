# Challenge 18: NoSql Social Network API
![License badge](https://img.shields.io/badge/license-MIT_License-blue)

## Description

For this assignment, we had to create a social network API using mongoDB and mongoose. We had to write the code from scratch, but were given guidelines to follow and help get started. In this social network, it needed to have users, thoughts, and reactions. Using CRUD operations, the database needed to create, get, update and delete users and thoughts. It also needed to create and delete new friends and reactions. Here were the User Story and Acceptance Criteria.

## User Story

```md
AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data
```

## Acceptance Criteria

```md
GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list
```

## Walkthrough Video
[NoSql Socal Network Walkthrough Video](https://drive.google.com/file/d/1dkToLcM3-xQGgE5w8JJKN5xmuNPc0JJt/view)

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Tests](#tests)
- [License](#license)
- [Questions](#questions)

## Installation

Once this repo has been cloned to your local system and opened in VS Code, you will need to install all the required packages. In your terminal, run `npm i` and it will install the necessary packages. Running `npm run seed` will seed the database with users. If you have MongoDB Compass, you should be able to see the newly created database with the seeded users.

## Usage

To start the database, run `npm start` in the terminal. You'll need to open Insomnia to be able to play around with the routes. Using the localhost link, you're able to test all the routes within the routes folder. 

## Contributing

N/A

## Tests

N/A

## License
MIT License

---

## Questions

Any questions you may have, please feel free to reach out to me using either contact.<br>
GitHub Profile: https://github.com/ashpfander<br>
Email: ashmpfander@gmail.com