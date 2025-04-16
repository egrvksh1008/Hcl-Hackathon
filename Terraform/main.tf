# Define the AWS provider configuration.
provider "aws" {
  region = "us-east-1"  # Replace with your desired AWS region.
}

variable "cidr" {
  default = "10.0.0.0/16"
}

resource "aws_vpc" "myvpc" {
  cidr_block = var.cidr
}

resource "aws_subnet" "Pub-sub1" {
  vpc_id                  = aws_vpc.myvpc.id
  cidr_block              = "10.0.0.1/24"
  availability_zone       = "us-east-1a"
  map_public_ip_on_launch = true
}

resource "aws_subnet" "Private-sub1" {
  vpc_id                  = aws_vpc.myvpc.id
  cidr_block              = "10.0.0.2/24"
  availability_zone       = "us-east-1a"
  map_public_ip_on_launch = False
}
