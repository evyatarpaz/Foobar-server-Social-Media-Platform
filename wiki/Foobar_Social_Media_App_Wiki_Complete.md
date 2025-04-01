
# Foobar Social Media App Wiki

## Overview
The Foobar project is a cutting-edge social network designed to enhance online interactions by allowing users to connect, share, and interact seamlessly. It integrates a bloom filter, utilizes a JavaScript server, and features a web frontend built with React, alongside an Android application developed in Android Studio.

## Technical Stack
- **Frontend**: React, Android Studio
- **Backend**: JavaScript server, cpp server
- **Database**: MongoDB
- **Additional Technologies**: Bloom filters for efficient data queries

## Key Components

### 1. User Authentication
- **SignUp**: New users can register by providing a username, email, password, and profile picture.
- **SignIn**: Users log in to access their accounts.

### 2. User Interface
- **FeedPage**: Central hub for user activities, including viewing, posting, and interacting with posts.
- **Profile Management**: Users can customize their profiles and manage connections with other users.

### 3. Social Features
- **Posts and Comments**: Users can create posts and comment on other posts.
- **Friend Management**: Features include sending and receiving friend requests, which influence the visibility of posts and interactions.

## BloomFilter server  Setup
Follow these steps to set up and run the project locally:

1. **Open Terminal and Navigate to Project Folder**:
   ```
   cd path/to/project_folder
   ```

2. **Change to Source Directory**:
   ```
   cd src
   ```

3. **Compile the Project**:
   ```
   g++ -o bloomfilter ./Tcp.cpp ./App.cpp ./InputManagement.cpp ./BloomFilter.cpp ./HashCode.cpp ./AddAddress.cpp ./CheckAddress.cpp
   // Or compile all at once
   g++ -o bloomfilter ./*.cpp
   ```

4. **Run the Application**:
   ```
   ./bloomfilter
   ```

## Loaded Forbidden Links
www.DarkDeeds.com
www.VillainVault.com
www.EvilEmpire.com
www.ShadowSyndicate.com
www.ChaosCrew.com
www.NefariousNetwork.com
www.CorruptConclave.com
www.SinisterScheme.com
www.GloomGuild.com
www.MaliceManor.com

## Development Process
- **Division of Work**: Split into four main parts:
  1. **Testing**: Includes various unit tests for functionality.
  2. **Implementation**: Development of classes and associated tests.
  3. **Main Method and Refactoring**: Focuses on code optimization and maintainability.
  4. **CI/CD Workflow**: Setting up Docker and GitHub workflows for integration and deployment.

## Refactoring Details
- **Separation of Concerns**: Extracted `addAddress` and `checkAddress` from the `BloomFilter` class and turned them into standalone classes following the ICommand design pattern.
- **HashCode Implementation**: Decoupled hashing functionality from the `BloomFilter` class for better modularity.
- **Input Management**: Introduced a class to handle and validate user input efficiently.

## Continuous Integration and Deployment
- **Docker Integration**: Created a DockerHub account and set up a Docker workflow.
- **GitHub Actions**: Implemented CI/CD workflows to ensure compatibility across different platforms and environments.

## Server Setup

### Overview
The Foobar Server App is crucial for handling all backend functionalities, structured following the Model-View-Controller (MVC) architecture.

### Project Structure
- **Model**: Handles CRUD operations for users, posts, and authentication tokens.
- **Controller**: Manages route handlers for incoming HTTP requests.

### Setup and Configuration
1. **Clone the Repository**:
   ```
   git clone https://github.com/Eliaddr119/Foobar-Server.git
   ```
2. **Install Dependencies**:
   ```
   npm install
   ```
3. **Start the Server**:
   ```
   node app.js
   ```
## Handling TCP Connection Issues

If the server fails to connect via TCP, it might be due to an incorrect or inaccessible IP address. Follow these steps to resolve the issue:

1. **Identify Your Computer's IP Address**:
   - On Windows, open Command Prompt and enter the command:
     ```
     ipconfig
     ```
   - On Ubuntu, open Terminal and enter the command:
     ```
     ifconfig
     ```
   Look for the `IPv4 Address` on Windows or the `inet` address under your network interface on Ubuntu. This address represents your local IP.

2. **Update Server Configuration**:
   - Modify the `IP_ADDRESS_TCP` setting in your server configuration - config\.env.local to match the IP address you identified. This adjustment ensures that the server attempts to connect using the correct local network IP.

By ensuring the correct IP address is used, you can enhance the server's ability to establish a reliable TCP connection. This step is crucial for maintaining connectivity and should resolve common issues related to network configurations.
"""

### MongoDB Connection
- **Database URL**:
  ```
  MONGODB_URI=mongodb://localhost:27017/foobar_db
  ```

## Web Application Setup

To run the app locally, follow these steps:

1. **Clone the repository**:
   ```
   git clone https://github.com/Eliaddr119/foobar_part2_web.git
   ```

2. **Navigate to the project directory**:
   ```
   cd foobar
   ```

3. **Install dependencies**:
   ```
   npm install
   ```

4. **Start the development server**:
   ```
   npm start
   ```

This command will run the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser. The page will reload automatically when you make changes. You will also need to run the server and Mongo DB.


## Android Application Setup

### Cloning and Opening
1. **Clone the Android Repository**:
   ```
   git clone -b part4_error_message_when_link_corrupt https://github.com/Eliaddr119/Foobar-part2-Android.git
   ```
2. **Open with Android Studio**:
   - Launch Android Studio.
   - Select "Open an Existing Project".
   - Navigate to the directory where you cloned the repository and open it.

### Environment Setup and Configuration
- **Gradle Sync**:
  - Ensure that Android Studio performs a Gradle sync automatically when the project is opened. This will setup all the necessary dependencies as defined in the project’s `build.gradle` files.
- **SDK and Build Tools**:
  - Verify that the Android SDK and build tools versions specified in `build.gradle` are installed and properly configured in Android Studio.

### Running the App
- **Device Selection**:
  - Connect an Android device via USB or set up an emulator through Android Studio’s AVD Manager.
- **Build and Run**:
  - Press the 'Run' button in Android Studio. Choose the connected device or an emulator to build and run the app.

## Sign In & Sign Up 
### Web
### SignUp 📝

*here we can see the "cilck here" can move us to the sign In page*

![Screenshot 2024-03-06 224822](https://github.com/Eliaddr119/foobar_part2_web/assets/113431442/6873fee3-2623-4882-b06b-72ba31de9042)

*here we can see the we must fill all the filed on the SignUp page*

![Screenshot 2024-03-06 230217](https://github.com/Eliaddr119/foobar_part2_web/assets/113431442/5bbe7666-9020-45a4-b14a-be485767826d)

*here we can see that the password must match*

![Screenshot 2024-03-06 224953](https://github.com/Eliaddr119/foobar_part2_web/assets/113431442/ab6ebd4f-6220-4aef-bdf1-17284e345abb)

*here we can see that the password must contain at least one upercase lowercase letter, one number, and characters*

![Screenshot 2024-03-06 2249asda23](https://github.com/Eliaddr119/foobar_part2_web/assets/113431442/65078c84-03c4-4d59-b2e2-d912056f371b)

### SignIn 🔐

*here we can see the "cilck here" can move us to the sign Up page to make a new account*

![Screenshot 2024-03-06 224813](https://github.com/Eliaddr119/foobar_part2_web/assets/113431442/dac339df-73f0-4b80-b9d8-a88425640688)

*here we can see that we must have an account, and that the password must match the password you entered when you created the account*

![Screenshot 2024-03-06 225020](https://github.com/Eliaddr119/foobar_part2_web/assets/113431442/0ef6562f-1648-4346-85d8-243ac5d9a44b)

### Android
### SignUp Screen

- The SignUp screen allows users to register for a new account by filling out a registration form.

![Screenshot 2024-03-07 222649](https://github.com/Eliaddr119/Foobar-part2-Android/assets/113431442/88116ec0-3d54-478c-8b71-19fc493940d2)

- If the password entered in the "Password" and "Confirm Password" fields does not match, an error message is displayed indicating that the passwords do not match.
 
![Screenshot 2024-03-07 224121](https://github.com/Eliaddr119/Foobar-part2-Android/assets/113431442/50fcda43-ba7e-43e3-bd0c-ca10960bc1f6)

- Dark mode

![Screenshot 2024-03-07 230852](https://github.com/Eliaddr119/Foobar-part2-Android/assets/113431442/f0fefabe-e2b5-474d-8f17-e531fbcf6ce7)

- Users must fill out all the fields in the registration form to proceed with the sign-up process.

![Screenshot 2024-03-07 222808](https://github.com/Eliaddr119/Foobar-part2-Android/assets/113431442/5054f2e2-19f9-4d00-9bff-162f23f96fd7)

- Users are required to upload a profile picture during the registration process.

![Screenshot 2024-03-07 222756](https://github.com/Eliaddr119/Foobar-part2-Android/assets/113431442/4f59eadc-3c5f-46b1-a37e-235ff739128c)

- Password must contain at least one uppercase lowercase and a number, the password must be at least 8 characters

![Screenshot 2024-03-07 222718](https://github.com/Eliaddr119/Foobar-part2-Android/assets/113431442/4b0d564c-9f0c-4fd5-9b8f-30d71bc04a9c)

- Upload a profile photo, gallery or camera

![Screenshot 2024-03-07 222831](https://github.com/Eliaddr119/Foobar-part2-Android/assets/113431442/d4411154-7abe-4b1a-9267-68277535120e)


- "Click here" link at the bottom of the screen will navigate the user to the SignIn screen.

![Screenshot 2024-03-07 222657](https://github.com/Eliaddr119/Foobar-part2-Android/assets/113431442/737b3e0f-bfc8-4186-b411-58c5ae97826c)



### SignIn Screen

- The SignIn screen provides users with a form to sign in to their accounts.

![Screenshot 2024-03-07 222633](https://github.com/Eliaddr119/Foobar-part2-Android/assets/113431442/b9d75de9-39ab-4e55-a705-02317bf93688)

- If the entered password is incorrect, an error message is displayed indicating that the password is incorrect.

![Screenshot 2024-03-07 222911](https://github.com/Eliaddr119/Foobar-part2-Android/assets/113431442/a9d79da0-e959-44cc-ad8e-dd2605107e4d)

- Dark mode
  
![Screenshot 2024-03-07 222640](https://github.com/Eliaddr119/Foobar-part2-Android/assets/113431442/b1f49cd6-2713-4e3f-b386-7b3614de971b)
  
- The "Click here" link at the bottom of the screen will navigate the user to the SignUp screen to create a new account.

![Screenshot 2024-03-07 222640](https://github.com/Eliaddr119/Foobar-part2-Android/assets/113431442/f0a997c7-7b39-4889-812f-49b14e3dc796)

## Feed Page
### Web
### FeedPage 📰

*here we can see all the FeedPage*

![Screenshot 2024-03-06 225033](https://github.com/Eliaddr119/foobar_part2_web/assets/113431442/47d867e2-ae5b-4856-bdd2-165c2324384a)

*here we can see how to upload a new post*
*clicking on the "write about something !" will open a box with the option to upload a post*

![Screenshot 2024-03-06 22503qe3](https://github.com/Eliaddr119/foobar_part2_web/assets/113431442/4d801f42-83fe-4f5c-81b2-718e321d7f35)

*here we can see the post upload box*

![Screenshot 2024-03-06 225224](https://github.com/Eliaddr119/foobar_part2_web/assets/113431442/593028bc-baab-42e2-bfdb-fe27e320932a)

*here we can see that the psot we upload have the option to edit the post or delete it*

![Screenshot 2024-03-06 225238](https://github.com/Eliaddr119/foobar_part2_web/assets/113431442/e232d4be-35a2-45f2-a239-f99aea3f7362)

---

### Android
### Post Feed

- The Post Feed displays a dynamic list of posts uploaded by users.
  ![image](https://github.com/Eliaddr119/Foobar-part2-Android/assets/114868880/93e20a64-a5d9-49b9-85cc-45c36d45aaba)
- By dragging down you can fetch the latest 20 posts from friends and 5 from non-friends.
  ![image](https://github.com/Eliaddr119/Foobar-part2-Android/assets/114868880/b2d1e8e5-9c55-45a6-832e-e63bfc71b0d9)

- By clicking on the option button on the upper right side users can edit and delete their posts
![image](https://github.com/Eliaddr119/Foobar-part2-Android/assets/114868880/59d42f09-2f83-4050-92d9-c83f54aaee54)

- Users can add a new post by clicking on the "add a new post" button.

![Screenshot 2024-04-30 105814](https://github.com/Eliaddr119/Foobar-part2-Android/assets/114868880/89bf38a4-9124-48d7-93c2-7e22ee2721b6)
 * return using the return button on your Android phone
![Screenshot 2024-03-07 223129](https://github.com/Eliaddr119/Foobar-part2-Android/assets/113431442/7d835e73-5c63-4561-a721-1bc31ac652f4)

- Users can access additional settings, including dark mode and logout, by clicking on the settings icon.

![image](https://github.com/Eliaddr119/Foobar-part2-Android/assets/114868880/d521965b-b7ac-4c8d-b799-78b0fab5550f)
- Update Profile allows you to change the user's display name and password, and by pressing the photo above you can change the profile picture. You can also delete the account from here
  ![image](https://github.com/Eliaddr119/Foobar-part2-Android/assets/114868880/e6c27b54-6135-4c26-bf44-33a1290582a9)

  
