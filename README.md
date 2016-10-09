# Closet_App

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
-All of the content and web layout organization was designed using common industry practices.

-**MongoDB, Mongoose**
-The structure of the board was built using CSS, which includes colors and shapes that constitute the game board and side elements.

-**Javascript, HTML, CSS**
-Data organization and function of the game is implemented using Javascript, and the jQuery library is a usefull too to bring the game to life and manipulate the DOM.
