package main

import (
	"api-brasileirao/routes"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	// Configuração CORS
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"}, // libera o frontend React
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept"},
		AllowCredentials: true,
	}))

	routes.RegisterRoutes(router)

	router.Run(":8080")
}
