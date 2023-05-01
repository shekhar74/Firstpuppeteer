# Puppeteer Project

This is a project to get data from Indeed.

## Steps to start 

* Open VScode and open an empty folder and type git init in terminal
* git clone https://github.com/shekhar74/Firstpuppeteer.git
* cd Firstpuppeteer
* npm i
* npm run serve
* Once you get the message "listening 8080" in console then go to POSTMAN or ThunderClient.

### Make a POST request

* localhost:8080/
* body {"jobtype" = "MERN", "location" = "bangalore" } in jobtype and location enter your search query
* this will get your result in response and a JSON file will be created with your query as name.