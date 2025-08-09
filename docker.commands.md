change potgres password:docker compose exec -it db psql -U postgres ->ALTER USER postgres WITH PASSWORD 'your-new-password'; -> \q;

dev docker:
  Build and start the services;


  Run migrations (if you haven't already):

  docker compose -f docker-compose.dev.yml exec web npx prisma migrate dev