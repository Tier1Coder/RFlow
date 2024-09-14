# RFlow

RFlow is a tool created for parsing and visualising BPMN 2.0 diagrams contained in XML files. 

The application is written in Python's Django and JavaScript's React. 

The backend is a server that serves the frontend and provides the API for the frontend to interact with the BPMN parser. 
The frontend is a React application that allows the user to upload a BPMN 2.0 XML (XMI) file and visualise the 
diagram contained in the file.

To visit the live version of the application, click [here](https://rflow.vercel.app/).


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
```


The frontend requires a `.env` file to be created in the `frontend/rflow_react` directory. 
The file should contain the following:

```
REACT_APP_API_URL=[your_api_url]
```


## Installation & running project locally

To install the application, you need to have Python 3.12 or higher installed on your machine.

1. Clone the repository
2. Create a virtual environment and activate it
3. Navigate to the `backend` directory
4. Install the requirements by running `pip install -r requirements.txt`
5. Navigate to the `backend/rflow_django` directory where `manage.py` is located
6. Run the server by running `python manage.py runserver [port]`
7. Open a new terminal window and navigate to the `frontend/rflow_react` directory where package.json is located
8. Install the frontend dependencies by running `npm install`
9. Start the frontend by running `npm start`


## License

TODO

## Engineering thesis
This project is a part of my engineering thesis at University of Zielona Góra. 
The full title of the thesis is "Graphical visualization of BPMN diagrams contained in XML files".
