package controllers

import (
	"api-brasileirao/services"
	"api-brasileirao/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetRodadas(c *gin.Context) {
	// TODO: Remover comentários e implementar quando for testar
	/*
		// Primeiro tenta buscar do banco de dados
		rodadas, err := database.BuscarRodadasDB()
		if err == nil {
			c.JSON(http.StatusOK, rodadas)
			return
		}
	*/

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

	// TODO: Remover comentários e implementar quando for testar
	/*
		// Primeiro tenta buscar do banco de dados
		partidas, err := database.BuscarPartidasPorRodadaDB(rodadaID)
		if err == nil {
			c.JSON(http.StatusOK, partidas)
			return
		}
	*/

	cacheKey := "jogos_rodada_" + rodadaID
	if data, found := utils.GetFromCache(cacheKey); found {
		c.JSON(http.StatusOK, data)
		return
	}

	// Busca a rodada completa
	responseData, err := services.Buscar("campeonatos/14/rodadas/" + rodadaID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"erro": err.Error()})
		return
	}

	// Transformar a resposta genérica em mapa
	mapData, ok := responseData.(map[string]interface{})
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"erro": "Formato inesperado da resposta"})
		return
	}

	// Pega somente o campo "partidas"
	partidas, found := mapData["partidas"]
	if !found {
		c.JSON(http.StatusInternalServerError, gin.H{"erro": "Partidas não encontradas"})
		return
	}

	// Cacheia só as partidas
	utils.SetToCache(cacheKey, partidas, 10)

	// Responde apenas as partidas
	c.JSON(http.StatusOK, partidas)
}
