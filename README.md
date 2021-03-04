# Post Graduate Admission System

<!-- Description -->

This is a semester project developed under the instuctions and requirements of the course instructor at UET Taxila to digitalize the process of admissions at **UET Taxila**.

The **Frontend** repository for this App is at **[Frontend](https://www.github.com/ikrma47/react-frontend "Backend of this project")**

## Table of Content

1. **[Installation](#installation "Installation")**
   - **[One Time Setup](#one-time-setup "setting up the app")**
   - **[Starting the App](#starting-the-app "starting the app")**
2. **[How To Use](#how-to-use "how to use")**
3. **[Features](#features "Features")**
4. **[Report Issue](#issues-and-bugs)**

## Installation

First you need to clone/download the project on your system. Make sure you have **Node LTS** ( Any Version ) should be install on your system.

Secondly the database **postgreSQL** should be installed on your system. If not then **[click to download](https://www.postgresql.org/download/ "postgres")**.

Install the postgreSQL with **database cluster** configuration and also set the environment variables ( including password as **PGPASSWORD**) in your windows/OS environment to run the postgres shell from cmd/terminal. The environemnt variables maybe in **PG_env.bat** file of destination folder of setup installation.

#### One Time Setup

Open your shell/CMD and navigate to the directory of this project on your system and run the following commands to install the dependencies.

```bash
npm install

npm install sequelize-cli -g
```

Make a .env file (if missing) in the root directory of the project. The variable in the .env files are

**.env-example**

```env
PASSPORT_SECRET=YOUR_PASSPORT_SECRET_HERE

AWSAccessKeyId=AWS_ACCESS_KEY_ID_HERE

AWSSecretKey=AWS_SECRET_KEY_HERE

Bucket=BUCKET_NAME_HERE

REGION=BUCKET_REGION_HERE

FRONTEND_URL=FRONTEND_URL_HERE

NO_REPLY_EMAIL=YOUR_NO_REPLY_EMAIL'S_ADDRESS_HERE

NO_REPLY_EMAIL_PASSWORD=YOUR_NO_REPLY_EMAIL'S_PASSWORD_HERE

PORT=YOUR_BACKEND_SERVER_PORT_HERE
```

Run the postgres migrations to populate the nesscary tables. Open your shell/CMD and navigate to the root directory of this project on your system and run the following command.

```bash
sequelize db:migrate
```

#### Starting the Server

**Make Sure GIT BASH is Installed ( For Windows users)**

Open your **GIT BASH** terminal and navigate to the directory of this project on your system and run the `npm start` command every time you want to run the project.

After running the `npm start` command, when the server gets functional, The First thing you need to do is to Make Sure Your **Frontend Server** is running. Click and follow details on the **[Frontend Server](https://www.github.com/ikrma47/react-frontend "frontend server")** to run the server.

## How To Use

When the both frontend and backend server are functional, follow the below steps

1. Signup with your correct email.
2. login with your email.
3. verify your email **(For first time only)**.

Then you are ready to go ahead Interact with the app.

## Features

- Scalable Structure
- Signup with unique Email and CNIC
- Login with Email/CNIC
- Verification of Email through OTP
- Forgot password
- Admin and Applicant Dashboards

## Issues and bugs

If you encounter any issue or bug kindly reach to me at **Ikrmaahmad47@gmail.com** or simply open an **[Issue at github](https://github.com/ikrma47/react-frontend/issues "open an issue")**.
