psql -c "CREATE user node_user WITH PASSWORD '12345' SUPERUSER;"
psql -c 'CREATE database pgs_admission WITH OWNER node_user;'