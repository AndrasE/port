<h3 align="center">
  <a href="https://andrasegyed.netlify.app/" target="_blank" rel="noopener noreferrer">
  <img src="https://github.com/AndrasE/raw-readme/blob/6a2f5d2470156f4cc6f17a427589f9105c4ce6cc/logo/port-readme-img.png" width="130px">
  </a>
  <br/>
Dynamic Portfolio Webpage Vanilla JavaScript and CSS
</h3> 

## Hello there 👋

This webpage showcases my proficiency in crafting dynamic web experiences using only vanilla JavaScript and CSS. While inspired by a YouTube **[tutorial](https://youtu.be/zJE-ze4TfXc)** via **[CrypticalCoder](https://www.youtube.com/@CrypticalCoder)**. I've extensively customized and enhanced the original design to align with my personal vision.

I began by meticulously analyzing the tutorial's code, gaining a deep understanding of its structural and design principles. From there, I tailored the project to my specific requirements, incorporating new elements and features such us "swipe and tap" functionalities with lazy loading.

As the project expanded, I aimed to improve navigation on this single-page site. To achieve this, I organized the website into distinct sections using EJS templates. Netlify then dynamically compiles these templates into a complete HTML file during deployment, ensuring a seamless and efficient browsing experience.

For a more detailed exploration of the project's journey and capabilities, please visit the 'Read More' section at the project page.

<div align="center">
<img src="https://github.com/AndrasE/raw-readme/blob/6ee4bad9cbd157895e8bae5bdfb0018c95b94041/thumbs/port_1.png" width="220">
<img src="https://github.com/AndrasE/raw-readme/blob/6ee4bad9cbd157895e8bae5bdfb0018c95b94041/thumbs/port_2.png" width="220">
<img src="https://github.com/AndrasE/raw-readme/blob/6ee4bad9cbd157895e8bae5bdfb0018c95b94041/thumbs/port_3.png" width="220">
</div>

### Key Features

- **Lazy Loading** - Optimizes page performance by deferring the loading of non-essential elements until they are needed.  
- **Embeds** - The website includes embeds to display external content including Youtube, Codesandbox and Github pages.
- **Swipe Functionality** - Using **[hammer.js](https://hammerjs.github.io/)** can recognize gestures made by touch, mouse and pointerEvents.
- **Custom Animations** - Smooth transitions and effects enhance the overall user experience.
- **Enhanced Functionality** - Additional features and interactions have been added to provide a more engaging experience.  

## Run 🚀

### HTML, CSS, and Vanilla JS Setup

To use the plain HTML version of this project, follow these steps:

Clone the repository:

`git clone https://github.com/AndrasE/port`

Navigate to the public folder:

`cd PROJECTNAME/public`

Open index.html in your browser:

`open index.html`

### Running the Project with EJS

Install the project dependencies:

`
$ npm install
`

Install nodemon globally (if not already installed):

`
$ npm install -g nodemon
`

Serve and compile the EJS templates:

`
$ nodemon render-ejs.js
`

The command above will automatically compile your EJS templates and generate an HTML file in the `public` folder.