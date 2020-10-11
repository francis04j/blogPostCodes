docker build -t francis04j/weatherapi .
[tag it][ build-context is dot]

docker run -p 8080:80 francis04j/weatherapi

MUST TO docker push
so that Terraform can get latest build of your image

Set up service principal so that terraform can auto-login to azure

Set up resource group and stroage account(blob) so that
 - your CI/CD pipeline can work with terraform stored state

 (1) tf_rg_blobstore
 terrastorageweatherapi
 tfweatherstate

terraform init
terraform plan
terraform apply
terraform destroy

setx - used to set envronment variables in windows