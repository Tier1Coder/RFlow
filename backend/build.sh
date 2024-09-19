#!/bin/bash

# Install required Python packages
pip install -r backend/requirements.txt

# Run migrations
python backend/rflow_django/manage.py migrate

# Create superuser if the environment variable is set
if [[ $CREATE_SUPERUSER == "True" ]];
then
  python backend/rflow_django/manage.py createsuperuser --no-input
fi
