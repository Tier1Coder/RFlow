# RFlow

RFlow is a tool created for parsing and visualising BPMN 2.0 diagrams contained in XML files. 

The application is written in Python's Django and JavaScript's React. 

The backend is a server that serves the frontend and provides the API for the frontend to interact with the BPMN parser. 
The frontend is a React application that allows the user to upload a BPMN 2.0 XML (XMI) file and visualise the 
diagram contained in the file.

To visit the live version of the application, click [here](https://rflow.vercel.app/).

The photos below show the application's capabilities.

![Login Page](https://github.com/user-attachments/assets/51564518-5272-4923-b4b5-e0adb8aec929)
*Figure: Login page.*
![Main Page](https://github.com/user-attachments/assets/a4d5e16f-ae9b-4576-bd88-d3aa479101bb)
*Figure 2: Home page.*
![Visualization](https://github.com/user-attachments/assets/d8faae13-62ed-450c-acf4-a3aa6b93f334)
*Figure 3: XML file visualization page.*
![Error](https://github.com/user-attachments/assets/ebc4f830-2f1f-4d1e-bb69-93d426f20af1)
*Figure 4: Monaco Editor interface for identifying and correcting potential XML file errors.*


## Prerequisites - DEV setup

The backend requires a `.env` file to be created in the `backend/rflow_django` directory. The file should contain the following:

```
SECRET_KEY=your_secret_key
DEBUG=True
```


The frontend requires a `.env` file to be created in the `frontend/rflow_react` directory. 
The file should contain the following:

```
REACT_APP_API_URL=[your_api_url]
```


## Prerequisites - PROD setup

The backend requires a .env file to be created in the backend/rflow_django directory. 
The file should contain the following:

```
SECRET_KEY=your_secret_key
DEBUG=False
ALLOWED_HOSTS=yourdomain.com,anotherdomain.com
CORS_ALLOWED_ORIGINS=https://yourdomain.com,https://anotherdomain.com
CSRF_TRUSTED_ORIGINS=https://yourdomain.com,https://anotherdomain.com
DATABASE_URL=your_database_url

CREATE_SUPERUSER=True // Set to True if you want to create a superuser
DJANGO_SUPERUSER_EMAIL=your_email // Required if CREATE_SUPERUSER is set to True
DJANGO_SUPERUSER_PASSWORD=your_password // Required if CREATE_SUPERUSER is set to True
DJANGO_SUPERUSER_USERNAME=your_username // Required if CREATE_SUPERUSER is set to True
```


The frontend requires a `.env` file to be created in the `frontend/rflow_react` directory. 
The file should contain the following:

```
REACT_APP_API_URL=[your_api_url]
```


## Installation & running project locally

To install the application, you need to have Python 3.12 or higher installed on your machine.
Example installation:

1. Clone the repository
2. Create environment variables in the backend and frontend directories
3. Install the required packages by running `pip install -r requirements.txt` in the backend directory
4. Install the required packages by running `npm install` in the frontend directory
5. Run the backend server by running `python manage.py runserver` in the backend directory
6. Run the frontend server by running `npm start` in the frontend directory


## Engineering thesis
This project is a part of my engineering thesis at University of Zielona Góra. 
The full title of the thesis is "Graphical visualization of BPMN diagrams contained in XML files".
