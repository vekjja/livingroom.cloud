#  outputs.tf 

output "db_endpoint" {
  description = "The hostname/endpoint of the RDS instance."
  value       = aws_db_instance.postgres.endpoint
}

# output "db_connection_url" {
#   description = "A PostgreSQL connection URL including username and password."
#   # Construct a standard Postgres URL: postgresql://<user>:<pass>@<host>:<port>/<dbname>
#   value = format(
#     "postgresql://%s:%s@%s:%d/%s",
#     aws_db_instance.postgres.username,
#     random_password.db_password.result,         # or store in Secrets Manager instead
#     aws_db_instance.postgres.endpoint,
#     aws_db_instance.postgres.port,
#     aws_db_instance.postgres.identifier
#   )

#   # Hides this output by default in CLI/UI
#   sensitive = true
# }