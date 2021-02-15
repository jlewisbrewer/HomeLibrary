# [![HomeLibrary](https://i.postimg.cc/c18Q6msh/Screen-Shot-2021-02-14-at-4-10-07-PM.png)](https://postimg.cc/Thfy4n55)

A web application designed to store book information in a user's library.

## Preview

Initial Page:
[![Initial page](https://i.postimg.cc/pLscWZZC/Screen-Shot-2021-02-14-at-3-51-07-PM.png)](https://postimg.cc/QFWJScvK)

Register a new user:
[![Register a new user](https://i.postimg.cc/W1z6nPGm/Screen-Shot-2021-02-14-at-3-54-03-PM.png)](https://postimg.cc/18xqm2Y4)

Library after logging in:
[![Library after logging in](https://i.postimg.cc/sDvvHfL2/Screen-Shot-2021-02-14-at-3-59-25-PM.png)](https://postimg.cc/0b1kbvPg)

Show book information:
[![Show book information](https://i.postimg.cc/sDvvHfL2/Screen-Shot-2021-02-14-at-3-59-25-PM.png)](https://postimg.cc/0b1kbvPg)

Search for books to add:
[![Search for books to add](https://i.postimg.cc/sDvvHfL2/Screen-Shot-2021-02-14-at-3-59-25-PM.png)](https://postimg.cc/0b1kbvPg)

Add books to library:
[![Add books to library](https://i.postimg.cc/Y9TqJYZq/Screen-Shot-2021-02-14-at-4-04-01-PM.png)](https://postimg.cc/WF6vZFsQ)

Remove books from library:
[![Remove books fromo library](https://i.postimg.cc/FKB9L09g/Screen-Shot-2021-02-14-at-4-05-19-PM.png)](https://postimg.cc/67CJs24y)

Search books in library:
[![Search books in library](https://i.postimg.cc/PrtBdPHt/Screen-Shot-2021-02-14-at-4-06-37-PM.png)](https://postimg.cc/6TmH06TS)

Sort books in library:
[![Sort books in library](https://i.postimg.cc/LX5JdHsv/Screen-Shot-2021-02-14-at-4-08-07-PM.png)](https://postimg.cc/1nxmw1wN)

## Installation

This application is built using ASP.NET for the back end and Angular for the frontend. After downloading the project, you will need to create an `appsettings.json` file. This file was not added to github in order not to display the salt used to generate tokens. To create this file, make a copy of the `appsettings.Development.json` file, and then add the following JSON class:
``"AppSettings": {
    "Token": "YOUR SALT HERE"
  }``
  
  To run the server, you need to navigate to the `HomeLibrary.API` folder and build and run 
the project using dotnet:

`dotnet build`

`dotnet run`

To run the client, you will have to navigate to the `HomeLibrary-SPA` folder and build and run the project using Angular. On the commandline, type:

`ng serve`

Open a web browser and go to port 4200 to interact with the client locally.

## To Do

- [ ] Publish webpage
- [x] Enable users to sort books in their library by author, title, etc.
- [ ] Implement admin tools such as book deletion and password resets
- [ ] Add more Book information such as language.
- [ ] Enable multiple authors and display books by author in user's library.
- [ ] Display stats about User's library.

## License

This project is available as open source under the terms of the [MIT license](https://opensource.org/licenses/MIT).


