provider "azurerm"  {
    version = "2.5.0"
    features {}
}

terraform {
    backend "azurerm" {
        resource_group_name  = "tf_rg_blobstore"
        storage_account_name = "terrastorageweatherapi"
        container_name       = "tfweatherstate"
        key                  = "terraform.tfstate"
    }
}

variable "imagebuild" {
  type        = string
  description = "Latest Image Build"
}

resource "azurerm_resource_group" "tf_weather" {
    name = "weatherapirg"
    location = "uksouth"
}

resource "azurerm_container_group" "tf_container" {
    name =                  "weatherapi"
    location =              azurerm_resource_group.tf_weather.location
    resource_group_name =   azurerm_resource_group.tf_weather.name

    ip_address_type    = "public"
    dns_name_label      = "francis04jweather"
    os_type             = "Linux"

    container {
        name            = "franisweatherapi"
        image           = "francis04j/weatherapi:${var.imagebuild}"
        cpu             = "1"
        memory          = "1"

        ports {
            port        = 80
            protocol    = "TCP"
        }
    }
}