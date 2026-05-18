variable "aws_region" {
  type    = string
  default = "us-east-1"
}

variable "project_name" {
  type    = string
  default = "sre-endterm"
}

variable "instance_type" {
  type    = string
  default = "t3.micro"
}

variable "key_name" {
  type = string
}

variable "public_key_path" {
  type = string
}

variable "ami_id" {
  type    = string
  default = "ami-0c02fb55956c7d316"
}
