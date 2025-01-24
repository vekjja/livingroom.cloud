#  provider.tf
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.5"
    }
  }

  required_version = ">= 1.0.0"
}

provider "aws" {
  region = "us-east-1"
  profile = "kev-aws"
}

