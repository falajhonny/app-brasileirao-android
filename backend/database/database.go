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

// NOVAS FUNÇÕES DE BUSCA NO BANCO
// TODO: Remover comentários e implementar quando for testar

type Artilheiro struct {
	ID       int    `json:"atleta_id"`
	Nome     string `json:"atleta_nome"`
	TimeID   int    `json:"time_id"`
	TimeNome string `json:"time_nome"`
	Gols     int    `json:"gols"`
	Jogos    int    `json:"jogos"`
}

type Classificacao struct {
	TimeID      int    `json:"time_id"`
	NomePopular string `json:"nome_popular"`
	Posicao     int    `json:"posicao"`
	Pontos      int    `json:"pontos"`
	Vitorias    int    `json:"vitorias"`
	Empates     int    `json:"empates"`
	Derrotas    int    `json:"derrotas"`
	SaldoGols   int    `json:"saldo_gols"`
}

type Partida struct {
	ID              int    `json:"partida_id"`
	Rodada          int    `json:"rodada"`
	TimeMandante    string `json:"time_mandante"`
	TimeVisitante   string `json:"time_visitante"`
	PlacarMandante  int    `json:"placar_mandante"`
	PlacarVisitante int    `json:"placar_visitante"`
	Data            string `json:"data_realizacao"`
	Status          string `json:"status"`
}

type Rodada struct {
	Numero int    `json:"rodada"`
	Status string `json:"status"`
}

/*
// Função para buscar artilheiros do banco
func BuscarArtilheirosDB() ([]Artilheiro, error) {
	rows, err := DB.Query(`
		SELECT atleta_id, atleta_nome, time_id, time_nome, gols, jogos
		FROM artilheiros
		ORDER BY gols DESC
	`)
	if err != nil {
		return nil, fmt.Errorf("erro ao buscar artilheiros: %v", err)
	}
	defer rows.Close()

	var artilheiros []Artilheiro
	for rows.Next() {
		var a Artilheiro
		err := rows.Scan(&a.ID, &a.Nome, &a.TimeID, &a.TimeNome, &a.Gols, &a.Jogos)
		if err != nil {
			return nil, fmt.Errorf("erro ao ler artilheiro: %v", err)
		}
		artilheiros = append(artilheiros, a)
	}
	return artilheiros, nil
}

// Função para buscar classificação do banco
func BuscarClassificacaoDB() ([]Classificacao, error) {
	rows, err := DB.Query(`
		SELECT time_id, nome_popular, posicao, pontos, vitorias, empates, derrotas, saldo_gols
		FROM classificacao
		ORDER BY posicao ASC
	`)
	if err != nil {
		return nil, fmt.Errorf("erro ao buscar classificação: %v", err)
	}
	defer rows.Close()

	var classificacao []Classificacao
	for rows.Next() {
		var c Classificacao
		err := rows.Scan(&c.TimeID, &c.NomePopular, &c.Posicao, &c.Pontos, &c.Vitorias, &c.Empates, &c.Derrotas, &c.SaldoGols)
		if err != nil {
			return nil, fmt.Errorf("erro ao ler classificação: %v", err)
		}
		classificacao = append(classificacao, c)
	}
	return classificacao, nil
}

// Função para buscar partidas de uma rodada do banco
func BuscarPartidasPorRodadaDB(rodada int) ([]Partida, error) {
	rows, err := DB.Query(`
		SELECT partida_id, rodada, time_mandante, time_visitante,
			   placar_mandante, placar_visitante, data_realizacao, status
		FROM partidas
		WHERE rodada = $1
		ORDER BY data_realizacao ASC
	`, rodada)
	if err != nil {
		return nil, fmt.Errorf("erro ao buscar partidas: %v", err)
	}
	defer rows.Close()

	var partidas []Partida
	for rows.Next() {
		var p Partida
		err := rows.Scan(&p.ID, &p.Rodada, &p.TimeMandante, &p.TimeVisitante,
			&p.PlacarMandante, &p.PlacarVisitante, &p.Data, &p.Status)
		if err != nil {
			return nil, fmt.Errorf("erro ao ler partida: %v", err)
		}
		partidas = append(partidas, p)
	}
	return partidas, nil
}

// Função para buscar todas as rodadas do banco
func BuscarRodadasDB() ([]Rodada, error) {
	rows, err := DB.Query(`
		SELECT rodada, status
		FROM rodadas
		ORDER BY rodada ASC
	`)
	if err != nil {
		return nil, fmt.Errorf("erro ao buscar rodadas: %v", err)
	}
	defer rows.Close()

	var rodadas []Rodada
	for rows.Next() {
		var r Rodada
		err := rows.Scan(&r.Numero, &r.Status)
		if err != nil {
			return nil, fmt.Errorf("erro ao ler rodada: %v", err)
		}
		rodadas = append(rodadas, r)
	}
	return rodadas, nil
}
*/
