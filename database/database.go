package database

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/lib/pq"
)

var DB *sql.DB

func Connect() {
	connStr := "host=localhost port=5432 user=postgres password=8080 dbname=AppBrasileirao sslmode=disable"
	var err error
	DB, err = sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal("Erro ao conectar ao banco de dados:", err)
	}

	err = DB.Ping()
	if err != nil {
		log.Fatal("Erro ao verificar a conexão com o banco:", err)
	}

	fmt.Println("Conexão com o PostgreSQL estabelecida com sucesso!")
}
