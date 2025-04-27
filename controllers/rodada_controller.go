package controllers

import (
	"api-brasileirao/services"
	"api-brasileirao/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetRodadas(c *gin.Context) {
	// Primeiro tenta pegar do cache
	if data, found := utils.GetFromCache("rodadas"); found {
		c.JSON(http.StatusOK, data)
		return
	}

	// Se não achou no cache, busca na API
	data, err := services.Buscar("campeonatos/14/rodadas")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"erro": err.Error()})
		return
	}

	// Salva no cache para a próxima vez
	utils.SetToCache("rodadas", data, 5)

	c.JSON(http.StatusOK, data)
}

func GetJogosPorRodada(c *gin.Context) {
	rodadaID := c.Param("rodada")

	cacheKey := "jogos_rodada_" + rodadaID
	if data, found := utils.GetFromCache(cacheKey); found {
		c.JSON(http.StatusOK, data)
		return
	}

	data, err := services.Buscar("campeonatos/14/rodadas/" + rodadaID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"erro": err.Error()})
		return
	}

	utils.SetToCache(cacheKey, data, 5) // 5 minutos de cache
	c.JSON(http.StatusOK, data)
}
