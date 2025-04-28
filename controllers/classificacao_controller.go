package controllers

import (
	"api-brasileirao/services"
	"api-brasileirao/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetClassificacao(c *gin.Context) {
	if data, found := utils.GetFromCache("classificacao"); found {
		c.JSON(http.StatusOK, data)
		return
	}

	data, err := services.Buscar("campeonatos/14/tabela")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"erro": err.Error()})
		return
	}

	utils.SetToCache("classificacao", data, 10)

	c.JSON(http.StatusOK, data)
}
