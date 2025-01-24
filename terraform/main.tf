#  main.tf

resource "random_password" "db_password" {
  length           = 16
  special          = true
  override_special = "!#$%&*()-_=+[]{}<>:?" # custom set
}

resource "aws_secretsmanager_secret" "rds_password" {
  name        = "${var.app_name}-rds-psql-passwd"
  description = "Auto-generated RDS master password"
}

resource "aws_secretsmanager_secret_version" "rds_password_version" {
  secret_id     = aws_secretsmanager_secret.rds_password.id
  secret_string = random_password.db_password.result
}

resource "aws_db_instance" "postgres" {
  identifier             = "${var.app_name}-rds-psql"
  allocated_storage      = 20
  max_allocated_storage  = 100
  engine                 = "postgres"
  engine_version         = "17.2"
  instance_class         = "db.t3.micro"

  username               = "exampleuser"
  password               = random_password.db_password.result

  db_subnet_group_name   = aws_db_subnet_group.rds_subnet_group.name
  vpc_security_group_ids = [aws_security_group.rds_sg.id]

  # Mark the DB as publicly accessible
  publicly_accessible    = true

  # No final snapshot
  skip_final_snapshot = true

  # Use the default Postgres 15 parameter group
  parameter_group_name = "default.postgres17"

  tags = {
    Name = "${var.app_name}-rds-psql"
  }
}
