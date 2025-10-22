# Red Sound

[My Notes](notes.md)

For my startup I am creating a simple quoting and booking service for an existing business that I run. I am going to 


> [!NOTE]
>  This is a template for your startup application. You must modify this `README.md` file for each phase of your development. You only need to fill in the section for each deliverable when that deliverable is submitted in Canvas. Without completing the section for a deliverable, the TA will not know what to look for when grading your submission. Feel free to add additional information to each deliverable description, but make sure you at least have the list of rubric items and a description of what you did for each item.

> [!NOTE]
>  If you are not familiar with Markdown then you should review the [documentation](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax) before continuing.

## 🚀 Specification Deliverable

> [!NOTE]
>  Fill in this sections as the submission artifact for this deliverable. You can refer to this [example](https://github.com/webprogramming260/startup-example/blob/main/README.md) for inspiration.

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [X] Proper use of Markdown
- [X] A concise and compelling elevator pitch
- [X] Description of key features
- [X] Description of how you will use each technology
- [X] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

### Elevator pitch

The last thing you want when planning your corporate event or worse, your wedding is unneeded stress and anxiety. When you're figuring out what you want in terms of your audio solution for your event every website that you look for is confusing and convoluted and worst of all you need to call someone or email them and wait for a response to even have an idea of how much its going to cost. Exhausting Right? Red Sound takes away all of those issues with a simple quoting and booking system where you build the package and options that you want. You understand the cost from the very beginning and you book your own date for your event. We take the stress out of your planning to allow you to focus on the more important things involved with your event. 

### Design

![Design image](sketch1.png) 
![Design image2](sketch2.png)

### Key features

- A package builder for exactly what the client wants to rent for their event
- A calendar system where the client can see unavailable dates and book the date for their event
- The ability to log in and update booking until a certain point previous to event
- Pay a deposit for the event
- A detailed description of all the services that we offer

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - I will have HTML pages that display our offerings and the general look of the website. I want to have 3 HTML pages, the front page, the calendar page, and the contact info.
- **CSS** - I will have the page with the different packages be interactive where you can build your own package of exactly what you want in your event. 
- **React** - I will have a login, along with the ability to see what dates are already booked or unavailable on the calendar. I want it to be interactive and intuitive.
- **Service** - Services will be used to track the dates that people book and exactly what they want, along with their contact information so that we can reach out to them.
- **DB/Login** - Store the users, and make it secure so that other people can't go in and change a quote or date that someone else already set up 
- **WebSocket** - When someone books a date, it goes public so that others can see that that date is filled.

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Server deployed and accessible with custom domain name** - [My server link](https://yourdomainnamehere.click).

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [X] **HTML pages** - I have several HTML pages that display the different parts of the website including booking and package description for purchases. 
- [x] **Proper HTML element usage** - I properly formatted the HTML to include the elements including div, nav, body, title, and more.
- [x] **Links** - I linked the folders to eachother using the a command so that when certian items on the page are clicked, they link to other html folders that include the information for that page.
- [x] **Text** - I have different text labeled under different sections so that in the future the text can be easily modified with css or bootstrap
- [x] **3rd party API placeholder** - I put a placeholder for a calendar API to be included on the booking page.
- [x] **Images** - I put in the image of the logo on every page as a clickable image that links back to the homepage
- [x] **Login placeholder** - I have one specific folder that includes the proper formatting for login that will in the future upload to the database
- [x] **DB data placeholder** - I have a placeholder on the booking page for the unavailable dates to show up for the people that have already booked an event
- [x] **WebSocket placeholder** - I have the information entry on the booking page that will allow me to contact them through the website

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Header, footer, and main content body** - I added these items to every page to make them fit in a well presented fashion
- [x] **Navigation elements** - I made navigation elements that link to each page and made them have boxes that highlight with hover to make it visually pleasing
- [x] **Responsive to window resizing** - I made it so the sight looks good on mobile as well as any size desktop site
- [x] **Application elements** - I used good contrast of colors to make the site and text easy to look at
- [x] **Application text content** - I used a consitent font and text size and colors so that it matched throughout
- [x] **Application images** - My logo is adjustable with size and stays centered

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Bundled using Vite** - I bundled the aplication using vite
- [x] **Components** - I replaced the html with jsx files and embedded them within react
- [x] **Router** - I routed the pages together with react to allow for nav link navigation

## 🚀 React part 2: Reactivity deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **All functionality implemented or mocked out** - I did not complete this part of the deliverable.
- [ ] **Hooks** - I did not complete this part of the deliverable.

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Node.js/Express HTTP service** - I did not complete this part of the deliverable.
- [ ] **Static middleware for frontend** - I did not complete this part of the deliverable.
- [ ] **Calls to third party endpoints** - I did not complete this part of the deliverable.
- [ ] **Backend service endpoints** - I did not complete this part of the deliverable.
- [ ] **Frontend calls service endpoints** - I did not complete this part of the deliverable.
- [ ] **Supports registration, login, logout, and restricted endpoint** - I did not complete this part of the deliverable.


## 🚀 DB deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Stores data in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Stores credentials in MongoDB** - I did not complete this part of the deliverable.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [ ] **Application is fully functional** - I did not complete this part of the deliverable.
