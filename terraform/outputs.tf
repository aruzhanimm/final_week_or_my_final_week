output "control_public_ip" { value = aws_instance.control.public_ip }
output "worker_public_ip" { value = aws_instance.worker.public_ip }
output "ssh_example" {
  value = "ssh -i <private_key.pem> ec2-user@${aws_instance.control.public_ip}"
}
