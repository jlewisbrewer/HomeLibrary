# ![HomeLibrary](https://fontmeme.com/permalink/210209/c32a7db96ab2f3e799798ce677de495a.png)

A web application designed to store book information in a user's library.

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


