# Moodslider

This repository is for my Sky unattended coding assessment, following the brief located in the repository as assessment_brief.pdf

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Usage

You need ```npm``` and ```bower``` installed globally to run and test this project.

Install dependencies with ```npm install``` post completion a hook will run ```bower install``` for you.

You may need to run ```npm install http-server -g``` to install and be able to run a local web server.

Once all pre-requisites are met you can run the project with either ```npm start``` or ```http-server -o``` and navigate to ```http://localhost:8000```

## Notes

- Given more time I would implement some form of unit testing for the project.
- I have observed a bug on Chrome on Mac and Edge on Windows whereby an uploaded file does not redirect immediately to the home page, on my test system running Chrome on Windows I have been unable to reproduce but given more time I would address this bug. For now you can just click the home button on the navbar.

## Built With

* [AngularJS](https://angularjs.org/) - The web framework used
* [Bootstrap](https://getbootstrap.com/) - Front end framework
* [bootstrap-slider](https://github.com/seiyria/bootstrap-slider/) - Used for the sliders

## Authors

* **Matthew Sorsby** - *All work* - [Sorsby](https://github.com/Sorsby)
