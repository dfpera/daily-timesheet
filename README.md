# Cumul8 Front-end Assignment
## Contents
[Goals](#goals)

[Requirements](#requirements)

[Assumptions](#assumptions)

[States](#states)

* [Input](#input)
* [Submission](#submission)
* [Results](#results)

[Tasks](#tasks)

[How To Run](#how-to-run)

[Citations](#citations)

## Goals
* Submit daily timesheet to managers
* Capture email, hours, minutes, type of work completed and (optionally) a message.

## Requirements
* Modular layout to allow for more fields to be added easily
* Show off UI/Design Skills
* Work in latest version of Chrome
* Work with no internet connection
* Submit via ZIP file
* Contain a single index.html to open

## Assumptions
* Works on desktop, tablet and mobile but mainly designed for mobile use
* A failure state is required

## States
### Input
![Result Screen Sketch](/readme/input.jpg?raw=true)
#### Requirements
* Focusing on input should remove placeholder
* Validate all inputs
* Selecting the radio button should highlight it
* Clear returns the form to default values
* Tapping submit moves to submission screen

---

### Submission
![Result Screen Sketch](/readme/submission.jpg?raw=true)
#### Requirements
* Displays a throbber
* Disables input
* Shows for one second before automatically moving to results screen

---

### Results
![Result Screen Sketch](/readme/result.jpg?raw=true)
#### Requirements
* Restart clears form and allows user to send another timesheet
* Failure allows user to retry their previous submission

---

## Tasks
* Setup repository
* Implement HTML
* Impement JS
* Mockup timesheet on Adobe XD
* Implement SASS
* Test assignment
* Fix bugs
* Submit to Cumul8

## How to Run
1. Download the repository
2. `cd` into the correct directory of the repository
3. Run `npm install`
4. Run `npm test`
5. The project should have opened a new browser tab with the project running

## Citations
* CSS Framework - [CodyHouse](https://codyhouse.co/)
* Icons [FreePik](https://www.freepik.com)
* [jQuery](https://jquery.com/)
* Form Validation [jQuery.Validate()](https://jqueryvalidation.org/)