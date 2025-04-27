package controllers

import (
	"api-brasileirao/services"
	"api-brasileirao/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetJogosPorRodadaHandler(c *gin.Context) {
	rodada := c.Param("rodada")
	cacheKey := "jogos_" + rodada

	if data, found := utils.GetFromCache(cacheKey); found {
		c.JSON(http.StatusOK, data)
		return
	}

	data, err := services.Buscar("campeonatos/14/rodadas/" + rodada)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"erro": err.Error()})
		return
	}

	utils.SetToCache(cacheKey, data, 5)

	c.JSON(http.StatusOK, data)
}
