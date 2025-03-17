docker run -itd -e POSTGRES_USER=my_user -e POSTGRES_PASSWORD=root -p 5432:5432  --name postgresql postgres

$ PGPASSWORD=baeldung psql -h localhost -p 5432 -U baeldung 