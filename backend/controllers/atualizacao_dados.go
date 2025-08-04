package controllers

import (
	"api-brasileirao/database"
	"api-brasileirao/services"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func AtualizarDados(c *gin.Context) {

	if artilheirosResp, err := services.Buscar("campeonatos/14/artilharia"); err == nil {
		if lista, ok := artilheirosResp.([]interface{}); ok {
			database.SalvarArtilheiros(lista)
		} else {
			log.Println("Formato inesperado no retorno de artilheiros")
		}
	} else {
		log.Println("Erro ao buscar artilheiros:", err)
	}

	if classResp, err := services.Buscar("campeonatos/14/tabela"); err == nil {
		database.SalvarClassificacao(classResp)
	} else {
		log.Println("Erro ao buscar classificacao:", err)
	}

	if rodadaResp, err := services.Buscar("campeonatos/14/rodadas"); err == nil {
		database.SalvarRodadasComPartidas(rodadaResp)
	} else {
		log.Println("Erro ao buscar rodadas:", err)
	}

	if partidasResp, err := services.Buscar("campeonatos/14/partidas"); err == nil {
		database.SalvarTodasPartidas(partidasResp)
	} else {
		log.Println("Erro ao buscar histórico de partidas:", err)
	}

	c.JSON(http.StatusOK, gin.H{"mensagem": "Dados atualizados com sucesso"})
}
