resource "aws_ecr_repository" "backend" {
  name                 = "backend"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true # ECR сканирует образы на CVE при каждом push
  }

  tags = {
    Name = "backend"
  }
}

resource "aws_ecr_repository" "frontend" {
  name                 = "frontend"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true # ECR сканирует образы на CVE при каждом push
  }

  tags = {
    Name = "frontend"
  }
}
