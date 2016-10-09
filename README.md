# Closet_App

This application allows users to login, add photos, and manage their personal closets while giving them the capability to navigate through other users’ closets.

### Planning

Wireframe were constructed to set up the original structure of the site and plan where information could be found for the user: [wireframes.pdf](wireframes.pdf).

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
