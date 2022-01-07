# Docker

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Clone repository

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Create images and start container

```
docker-compose up
```

## Useful comands for docker

1. List all images

```
docker images
```

2. Delete an image

```
docker image rm "image_id/_name"
```

3. List the running containers

```
docker ps
```

4. List all containers (running and stopped)

```
docker ps -a
```

5. Delete all running and stopped containers

```
docker rm -f $(docker ps -a -q)
```

6. Stop the container

```
docker-compose down
```

7. Delete all

```
docker system prune -a
```
