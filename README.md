# Custom Closets

This application allows users to login, add photos, and manage their personal closets while giving them the capability to navigate through other users’ closets.

### Planning

Wireframes were constructed to set up the original structure of the site and plan where information could be found for the user: [wireframes.pdf](wireframes.pdf).

[User stories](https://trello.com/b/Z6VBLVXy/custom-closets-user-stories) are hosted on trello, which helped organize how the user would interact with the application, and what would happen after each interaction.

### Entity Relationship Diagram: Modeling the site's data

#### Clothing Model
* category - String
* brand - String
* color - String
* size - String
* imageURL - String

#### User Model
* username - String
* password - String
* createdAt - Date
* [Clothing]

###Technologies

-**Node.js**
-Allowed the creation of a server and used various node modules written in Javascript.

-**MongoDB, Mongoose**
-The data models are stored in a NoSQL database, in which Mongoose was used to query and interact with that database (MongoDB).

-**Javascript, HTML, CSS**
-The app is written entirely in Javascript, and the structure and styling were implemented with HTML and CSS.

### Unsolved Problems

**AWS**
-Multiple attempts were made to allow the user to upload and retrieve their own photos using AWS and multer, so that would be a feature to reevaluate later on.

**Organization**
-I would add a way to hide a clothing item category title if that user doesn't own any of those type of clothes. Eg. don't have a 'jackets' section if user doesn't own a jacket in their closet.

**Users**
-Make a route that allows to edit a user's password and create a way to delete a user.
