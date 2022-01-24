# Xpeed Studio Task

## Getting Started

### Installation

You need Node JS to be installed on the system for the application to work. Check the versions used for this project (mentioned below) to identify which versions were used for this project.
Different versions may bring up errors and stop the application from running properly so it is highly recommended that the versions listed below are used to run this application.

### Versions

**Node JS:** 16.13.0

**MongoDB:** 5.0.4

**React JS:** 17.0.2

**Express JS:** 4.17.2

### Instructions

To run the application, clone the entire project onto your preferred local directory. If a zip file is downloaded, extract the contents of the zip file first. 

Now start up a CLI. Change your working directory on the CLI to the project's root folder and then run the following command to install all necessary backend dependencies:

*Note: Common commands for tasks such as changing directories can vary from one CLI to another. The code snippets written below are all tested on Windows Powershell and 
would therefore work on it.*

```
  npm i
```

Now to install all necessary frontend depenedencies enter the following commands in your CLI:

```
  cd client
  npm i
```

After all dependencies have finished installation, return to the root directory on your CLI by running the following command,

```
  cd ..
```

The project uses an environment variable to declare its database configuration. Create a .env file inside the root folder and enter the following using any text editor software
and then save the file:

```
  DB_URL="<database_url>"
```

Replace *<database_url>* using any existing database of yours. It can be a connection string for a local MongoDB database or a live one from MongoDB Atlas for example. 

Now on your CLI from the root folder as its current directory run the following command to start up the applciation. A tab should open up on your default browser window after successful startup.

```
  nmp run dev
```

## Using the Application

The applications is fairly simple. To begin, drag and drop .txt files on to the box shown on the web page that shows the drag and drop icon and asks for a file to be dropped.
Also enter a title for the result before uploading the file. The text file must only contain a one line calculation string using only _+_ , _-_ , _/_ or _*_ operators for _addition,
subtraction, division_ and _multiplication_.

The program is designed to be such that you have to wait at least 15 seconds to get the results of your calculation after a file has been dropped. Once the calculation result
is shown and the button is unlocked, click on it to upload the result and have it shown as a card over the dark inset section on the top within your screen. All results added will
be displayed in this scrollable section. The input file also gets stored in the _":root:/client/public/uploads"_ folder as a record for later use.

These windows can be dragged and dropped in different places to reorder them. A link is also available at the bottom to take you to Screen B. This screen does 
not support drag and drop and is only meant to display the results. It however reflects any changes made using Screen A without requiring reload of the page. Any change of order
automatically gets shown on Screen B almost immediately.

**_Note:_** If you're using the free version of MongoDB Atlas, you may notice the changes to be happening slower than necessary.

Every result card also has a "See Input" button that can be clicked on to see the input used previously to have that result generated on the card. Clicking the button displays 
the input in a pop-up window and if you scroll too far down, you may need to scroll up again to see the window appear within this dark inset section. Its position is sadly relative to
the dark inset section currently and there are plans to fix this CSS issue shortly.
