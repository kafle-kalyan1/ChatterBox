# ChatterBox

## Overview

ChatterBox is a 1-on-1 chatting web app that allows users to send messages to each other in real-time. The app is built using Django for the backend and React for the frontend.

## Features

- User authentication and authorization
- Real-time messaging using Django Channels and WebSockets
- Responsive design for different screen sizes

## Installation

### Backend

1. Clone the repository: `git clone https://github.com/kafle-kalyan1/chatterbox.git`
2. Navigate to the `backend` directory: `cd backend`
3. Create new virtual enviroment: `python -m venv env_name`
4. Activate virtual enviroment: `env_name\Scripts\activate`
4. Install the required Python packages: `pip install -r requirements.txt`
5. Run database migrations: `python manage.py migrate`
6. Start the Django development server: `python manage.py runserver`

### Frontend

1. Navigate to the `frontend` directory: `cd frontend`
2. Install the required packages: `npm install`
3. Start the development server: `npm start`

## Configuration

### Backend

The backend settings can be configured in the `chatterbox/settings.py` file. You can change the database settings, secret key, and other settings here.

### Frontend

The frontend settings can be configured in the `frontend/src/config.js` file. You can change the API endpoint and other settings here.

## Usage

1. Navigate to `http://localhost:3000` in your web browser.
2. Register a new account or log in with an existing one.
3. Start a new chat to the user you want to chat with.
4. Send messages in real-time using the chat interface.

