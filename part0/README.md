# Fullstack open: part 0

## Content

- [Description](#description)
- [Exercises](#exercises)

## Description

In this part of the course, we go through an example [webapp](https://studies.cs.helsinki.fi/exampleapp) provided by the course.

The task is to understand what is going on behind the scenes when rendering the page and adding a new note on the [notes](https://studies.cs.helsinki.fi/exampleapp/notes) page.

## Exercises

Part 0 of the course has 5 different exercises that mostly include reading through course material to get a better understanding of the languages used for webapp creation.

### Exercise 0.1: HTML

In this exercise we review the basics of HTML by reading this [HTML tutorial.](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website/Creating_the_content)

### Exercise 0.2: CSS

In this exercise we review the basics of CSS by reading this [CSS tutorial.](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website/Styling_the_content)

### Exercise 0.3: HTML forms

In this exercise we learn the basics of HTML forms by reading this [HTML form tutorial.](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Your_first_form)

### Exercise 0.4: New note diagram

When reading through the course material we are provided with the following diagram on what is happening when rendering the [notes page](https://studies.cs.helsinki.fi/exampleapp/notes) of the exampleapp:

```mermaid

sequenceDiagram
    participant browser
    participant server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes

```

We are tasked with creating our own diagram using [Mermaid](https://github.com/mermaid-js/mermaid#sequence-diagram-docs---live-editor) syntax, explaining what happens when you add a new note in the exampleapp.

#### My solution

```mermaid

sequenceDiagram
  participant browser
  participant server

  browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
  activate server
  server-->>browser: Status code 302. Found
  deactivate server

  Note right of server: This is a URL redirect,<br>with which the server asks the browser to perform a new HTTP GET request<br>to the address defined in the header's Location - the address notes.
  #Using <br> is not correct here. Need to change to a correct way to implement line breaks in Mermaid

  browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
  activate server
  server-->>browser: HTML document
  deactivate server

  browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
  activate server
  server-->>browser: the css file
  deactivate server

  browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
  activate server
  server-->>browser: the JavaScript file
  deactivate server

  Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

  browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
  activate server
  server-->>browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]
  deactivate server

  Note right of browser: The browser executes the callback function that renders the notes

```

### Exercise 0.5: Single page app diagram

In this exercise we are tasked with implementing a diagram explaining what happens when rendering the single page version of the provided [expampleapp.](https://studies.cs.helsinki.fi/exampleapp/spa)

#### My solution

```mermaid

sequenceDiagram
  participant browser
  participant server

  browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
  activate server
  server-->>browser: HTML document
  deactivate server

  browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
  activate server
  server-->>browser: the css file
  deactivate server

  browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
  activate server
  server-->>browser: the JavaScript file
  deactivate server

  Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

  browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
  activate server
  server-->>browser: [{ "content": "single page application?", "date": "2025-06-22" }, ... ]
  deactivate server

  Note right of browser: The browser executes the callback function that renders the notes
```

### Exercise 0.6: New note on Single page app diagram

In this exercise we are tasked with implementing a diagram explaining what happens while adding a new note on the single page version on the exampleapp.

#### My solution

```mermaid

sequenceDiagram
  participant browser
  participant server

  browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
  activate server

  Note right of browser: The POST request to the address new_note_spa contains the new note as JSON data<br>containing both the content of the note (content) and the timestamp (date)
  #Using <br> is not correct here. Need to change to a correct way to implement line breaks in Mermaid

  server-->>browser: { "message": "note created" }
  deactivate server

  Note right of server: The server responds with status code 201 created.<br>This time the server does not ask for a redirect,<br>the browser stays on the same page, and it sends no further HTTP requests.
  #Using <br> is not correct here. Need to change to a correct way to implement line breaks in Mermaid

  Note left of browser: Using the JavaScript file fetched from the server,<br>creates a new note, adds it to the notes list,<br>rerenders the note list on the page and sends the new note to the server.
  #Using <br> is not correct here. Need to change to a correct way to implement line breaks in Mermaid
```
This sequence diagram illustrates how the SPA loads resources only once and fetches new data via AJAX without a full page reload.
