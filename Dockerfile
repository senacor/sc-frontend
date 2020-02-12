FROM node

# If needed, install system dependencies here

# Add package.json before rest of repo for caching
ADD package.json /app/
WORKDIR /app
RUN npm install

ADD . /app
