DOCKER_NAME=next-auth-app

run:
	docker-compose up -d && docker logs -f ${DOCKER_NAME}

remove:
	docker-compose down && docker image rm ${DOCKER_NAME}-next-app

log-node:
	docker logs -f ${DOCKER_NAME}

log-mongo:
	docker logs -f mongodb_app

shell:
	docker exec -it ${DOCKER_NAME} bash

push-prisma:
	docker exec -it ${DOCKER_NAME} npx prisma db push

mongo-it:
	docker exec -it ${DOCKER_NAME}-mongo-1 mongo admin --port 27018