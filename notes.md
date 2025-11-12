# CS 260 Notes

[My startup - Simon](https://simon.cs260.click)

I am testing a commit here.

## GitHub learning assignment

I have learned that through github it is easy to push and pull commits that show changes and help me to document and progress in my work. 
I need to continue practicing and learning how to use markdown format of writing notes and things on .md files but over time I should be improving. 

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)


## AWS


## Caddy

I can make my domain and website secure by going into the caddy file and deleting the port80 and replacing it with my domain name

## HTML
There organization is very important when applying css and bootstrap

* **`<!DOCTYPE html>`**: This is the document type declaration. It must be the very first line in an HTML file and tells the browser to render the page as HTML5.
* **`<link>`**: A self-closing tag used in the `<head>` to connect the HTML file to external resources. Its most common use is linking a CSS stylesheet:
    * `rel="stylesheet"`: Specifies the relationship (a stylesheet).
    * `href="style.css"`: Specifies the URL of the resource.
* **`<div>`**: A generic, block-level container (division). It's used to group other elements for layout and styling (e.g., applying CSS Grid, Flexbox, or margins).
* **`<span>`**: A generic, inline-level container. It's used to group small pieces of text or other inline elements, often to apply a specific style (like color) to just that part.
    * **Default Display**: `<span>` has a default `display: inline;` property.
* **Basic Tags**:
    * First-level heading: `<h1>`
    * Second-level heading: `<h2>`
    * Third-level heading: `<h3>`
    * Paragraph: `<p>`
    * Ordered List: `<ol>` (uses `<li>` items)
    * Unordered List: `<ul>` (uses `<li>` items)
* **Hyperlinked Image**: To make an image a clickable link, you nest the `<img>` tag inside the `<a>` (anchor) tag.
    * `<a href="httpsroute.html"><img src="image.jpg" alt="A descriptive alt text"></a>`
* **Script Tag**: To include JavaScript in an HTML page, use the `<script>` tag.
    * External file: `<script src="app.js"></script>` (Best practice: place before the closing `</body>` tag).
    * Inline script: `<script>...javascript code...</script>`

## CSS
Bootstrap can be incorporated as more of a background thought by implementing it first vs last compared to my css file

!important makes the element be priority over the default

viewport meta must be added to html head to make mobile @media work in css

* **Selectors (ID vs. Class)**:
    * **ID Selector (`#`)**: e.g., `#title`. Selects *one unique* element on the page that has the matching `id` attribute. IDs must be unique.
    * **Class Selector (`.`)**: e.g., `.grid`. Selects *all* elements on the page that have the matching `class` attribute. An element can have multiple classes.
    * **Type Selector**: e.g., `div`. Selects *all* elements of that type (e.g., all `<div>` tags).
        * To make all divs red: `div { background-color: red; }`
* **CSS Box Model**: The layers of a box, from the inside out:
    1.  **Content**: The text, image, etc.
    2.  **Padding**: The transparent space *inside* the border, between the content and the border.
    3.  **Border**: The line that goes around the padding and content.
    4.  **Margin**: The transparent space *outside* the border, between this element and other elements.
* **Padding & Margin Shorthand**: The values are applied in a clockwise direction (Top, Right, Bottom, Left).
    * `padding: 10px;` (1 value): All 4 sides are 10px.
    * `padding: 10px 20px;` (2 values): Top/Bottom are 10px, Left/Right are 20px.
    * `padding: 10px 20px 5px;` (3 values): Top is 10px, Left/Right are 20px, Bottom is 5px.
    * `padding: 10px 20px 5px 15px;` (4 values): Top (10), Right (20), Bottom (5), Left (15).
* **Flexbox**: A layout model. Applying `display: flex;` to a container makes its direct children "flex items." You can then control their alignment, direction (row/column), and spacing.
* **Targeting Specific Text**: To style *only* a specific word (like "trouble" but not "double"), you must wrap that word in its own element, like a `<span>`, and give it an ID or class.
    * HTML: `This is <span class="green-text">trouble</span>.`
    * CSS: `.green-text { color: green; }`

## React Part 1: Routing
It takes some effort to switch all a links to navlink to allow for react routing. Ai is quite good at doing it

* **Library**: We use `react-router-dom` for routing.
* **`BrowserRouter`**: This component should wrap your entire application (usually in `index.js` or `App.js`) to enable routing.
* **`Routes`**: A container that holds all your individual `Route` definitions.
* **`Route`**: Defines a single path and the component to render.
    * `<Route path="/about" element={<AboutComponent />} />`
* **`Link` vs. `NavLink`**:
    * Both are used to create navigation links instead of `<a>` tags (which would refresh the page).
    * **`Link`**: A basic link.
    * **`NavLink`**: A special `Link` that knows if it is "active" (if its `to` prop matches the current URL). It automatically adds an `active` class to the element, which you can style in your CSS (e.g., `.active { color: blue; }`).

## React Part 2: Reactivity
APIs are easy to implement, but hard to create. All I need to do is include the link to it in the javascript.

* **Reactivity**: This is React's core concept. The UI "reacts" and automatically re-renders when the underlying data (state) changes.
* **State (`useState`)**: The `useState` hook is how you create "reactive" data.
    * `const [count, setCount] = useState(0);`
    * `count` is the value (the "state").
    * `setCount` is the *only* function you should use to change that value.
    * When you call `setCount(1)`, React knows the state has changed and re-renders the component (and any children) that use the `count` value.
* **Props**: How components pass data *down* to their children. If a prop changes, the child component re-renders.
* **Side Effects (`useEffect`)**: This hook is for any code that interacts with the "outside world"—timers, subscriptions, or **API calls**.
    * `useEffect(() => { ... }, [dependencyArray]);`
    * The function inside runs *after* the component renders.
    * **Dependency Array (`[]`)**: This is crucial.
        * `[]` (empty array): The effect runs **only once** when the component first mounts. This is perfect for fetching data.
        * `[someVariable]`: The effect runs once on mount *and* any time `someVariable` changes.
        * *No array* (omitted): The effect runs after *every single render*. **Avoid this.**
* **Fetching API Data**: The standard pattern is to use `fetch` inside a `useEffect` hook (with an empty dependency array) and store the JSON response in state using `useState`.

## JavaScript
* **The DOM**: The Document Object Model. It's a tree-like object representation of the HTML document. JavaScript uses the DOM to find, read, and change HTML elements (nodes).
* **Selecting Elements**:
    * `document.getElementById('someId')`: Selects the single element with the ID `someId`.
    * `document.querySelector('#someId')`: Selects the *first* element matching the CSS selector. Can use ID (`#`), class (`.`), or type (`div`).
* **Modifying Elements**:
    * `element.addEventListener('click', myFunction)`: Attaches an event handler. It "listens" for an event (like 'click') and runs the specified function when it happens.
    * `element.style.color = 'green'`: Changes the CSS properties of an element. Note that CSS properties with a dash (e.g., `background-color`) become camelCase in JS (e.g., `element.style.backgroundColor`).
    * `element.textContent = 'new text'`: Changes the text *inside* an element, ignoring any HTML.
* **Control Structures**:
    * **If/Else**: `if (condition) { ... } else if (condition2) { ... } else { ... }`
    * **For Loop**: `for (let i = 0; i < 5; i++) { console.log(i); }` (Outputs 0, 1, 2, 3, 4)
    * **While Loop**: `while (condition) { ... }`
    * **Switch**: `switch (value) { case x: ...; break; case y: ...; break; default: ...; break; }`
* **Functions**:
    * **Arrow Function**: A compact syntax. `const add = (a, b) => a + b;` is similar to `function add(a, b) { return a + b; }`.
* **Objects**:
    * **Literal Syntax**: `const myObj = { name: 'Simon', age: 20 };`
    * **Adding Properties**: Yes, you can add new properties after creation: `myObj.newProp = 'hello';`
* **Arrays**:
    * **`.map()`**: An array method that creates a *new* array by running a function on every element in the original array.
* **JSON (JavaScript Object Notation)**:
    * A lightweight, text-based data format used for sending data (e.g., in an API).
    * It looks like a JS object, but keys *must* be in double quotes: `{"name": "Simon", "age": 20}`.
* **Promises**:
    * An object representing the eventual success or failure of an asynchronous operation (like an API call).
    * Starts in a `pending` state, then "settles" as either `fulfilled` (success) or `rejected` (error).
    * We handle the results using `.then()` for success and `.catch()` for errors, or with `async/await` syntax.

## Console Commands (Linux/Bash)
* `pwd`: **Print Working Directory** (shows your current folder).
* `cd`: **Change Directory** (e.g., `cd documents`).
* `ls`: **List** files in the current directory.
    * `ls -la`: Lists in `l`ong format (permissions, owner, size) and shows `a`ll files (including hidden "dot" files).
* `mkdir`: **Make Directory** (create a new folder).
* `mv`: **Move** a file or **rename** it (e.g., `mv old.txt new.txt`).
* `rm`: **Remove** (delete) a file. `rm -r` removes a directory.
* `chmod`: **Change Mode** (change permissions, e.g., `chmod 755 script.sh`).
* `nano` / `vim`: Text editors.
* `man`: **Manual** (shows help page for a command, e.g., `man ls`).
* `ssh`: **Secure Shell**. Creates a remote shell session to another computer (e.g., `ssh user@domain.com`).
* `ps`: **Processes** (lists currently running processes).
* `wget`: Downloads a file from a URL.
* `sudo`: **Super User Do** (run a command with administrative privileges).

## Networking & Domains
* **Ports**:
    * **Port 80**: **HTTP** (Hypertext Transfer Protocol - unencrypted web).
    * **Port 443**: **HTTPS** (HTTP Secure - encrypted web).
    * **Port 22**: **SSH** (Secure Shell - remote login).
* **HTTPS**: Requires a **TLS/SSL web certificate** to verify the server's identity and enable encryption.
* **Domain Names**: (e.g., `banana.fruit.bozo.click`)
    * **Top-Level Domain (TLD)**: The last part. (e.g., `.click`, `.com`, `.org`).
    * **Root Domain**: The main part. (e.g., `bozo.click`).
    * **Subdomain**: Anything to the left of the root domain. (e.g., `fruit` and `banana` are both subdomains).
* **DNS Records**:
    * **A Record**: Points a domain name directly to an **IP address** (e.g., `192.168.1.1`).
    * **CNAME Record**: Points a domain name to *another domain name*.

## Service
- **Start Simple:** Begin with a basic Express server that just responds to a test route (e.g., `/api/hello`). Make sure your server runs before adding complexity.
- **Middleware:** Use middleware like `express.json()` to parse JSON bodies if your frontend and backend are on different origins.
- **Error Handling:** Always handle errors in your routes and return meaningful status codes (e.g., 400 for bad requests, 500 for server errors).
- **Authentication:** Implement authentication for protected routes. Use middleware to check authentication before allowing access.
- **Logging:** Use `console.log()` or a logging library to track requests and errors for easier debugging.
- **Frontend Integration:** Use `fetch` in your React app to call your backend endpoints. Handle loading and error states in your UI.
- **Third-Party APIs:** When calling third-party APIs (like Calendly), do so from the backend if you need to keep API keys secret, or from the frontend if it's a public integration.


## MongoDB

- **Collections:** using collections allows me to separate different types of data like users and packageInfo
- **Operations:** I can use operations like findOne, insertOne, and updateOne to change info in the database