package routes

import (
	"api-brasileirao/controllers"

	"github.com/gin-gonic/gin"
)

func RegisterRoutes(router *gin.Engine) {
	api := router.Group("/api")
	{
		api.GET("/rodadas", controllers.GetRodadas)
		api.GET("/jogos/:rodada", controllers.GetJogosPorRodada)
		api.GET("/classificacao", controllers.GetClassificacao)
		api.GET("/artilheiros", controllers.GetArtilheiros)
		api.POST("/atualizar-dados", controllers.AtualizarDados) // NOVO
	}
}
