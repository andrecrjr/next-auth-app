run:
	docker-compose up

remove:
	docker-compose down && docker image rm next-auth-app-next-app

log-node:
	docker logs -f next-auth-app-next-app

log-mongo:
	docker logs -f mongodb_app
