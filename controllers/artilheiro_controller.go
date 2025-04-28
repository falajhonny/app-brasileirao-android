package controllers

import (
	"api-brasileirao/services"
	"api-brasileirao/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetArtilheiros(c *gin.Context) {
	if data, found := utils.GetFromCache("artilheiros"); found {
		c.JSON(http.StatusOK, data)
		return
	}

	data, err := services.Buscar("campeonatos/14/artilharia")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"erro": err.Error()})
		return
	}

	utils.SetToCache("artilheiros", data, 10)

	c.JSON(http.StatusOK, data)
}
