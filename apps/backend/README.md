
## Setup

Install dependencies:

```
pnpm install
```

Copy the env example file

```
cp .env.example .env
```

In both Docker Compose files, update the name of the containers and networks to match the respective project.

E.g. If my project is called "URL Shortener", I'd update the docker compose file to:

```yml
version: '3.8'

services:
  url_shortener_postgres:
    image: postgres:alpine
    container_name: url_shortener_postgres
    restart: always
    env_file:
      - .env
    environment:
      - POSTGRES_USER=${POSTGRES_USER}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
    ports:
      - '5432:5432'
    volumes:
      - postgres_data:/var/lib/postgresql/data

  url_shortener_redis:
    image: redis:alpine
    container_name: url_shortener_redis
    ports:
      - '6379:6379'
    volumes:
      - redis_data:/data

networks:
  default:
    name: url_shortener

volumes:
  postgres_data:
  redis_data:

```

You should also update the docker compose test file:

```yml
version: '3.8'

services:
  test_url_shortener_postgres:
    image: postgres:alpine
    container_name: test_url_shortener_postgres
    restart: 'no'
    healthcheck:
      test: ['CMD-SHELL', 'pg_isready -U $POSTGRES_USER']
      interval: 10s
      timeout: 5s
      retries: 5
    env_file:
      - .env.test
    environment:
      - POSTGRES_USER=${POSTGRES_USER}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
    ports:
      - '5444:5432' # Different port to avoid conflict with the development environment
    volumes:
      - test_url_shortener_postgres:/var/lib/postgresql/data

  test_url_shortener_redis:
    image: redis:alpine
    container_name: test_url_shortener_redis
    ports:
      - '6380:6379' # Different port to avoid conflict with the development environment
    volumes:
      - test_url_shortener_redis:/data

networks:
  default:
    name: nestjs_starter_test

volumes:
  test_url_shortener_postgres: # Needs to be the same as the volume name in the postgres service
  test_url_shortener_redis: # Needs to be the same as the volume name in the redis service

```