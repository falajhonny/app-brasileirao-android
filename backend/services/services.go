package services

import (
	"fmt"
)

type Partida struct {
	ID              int    `json:"partida_id"`
	Mandante        string `json:"time_mandante_nome"`
	Visitante       string `json:"time_visitante_nome"`
	PlacarMandante  int    `json:"placar_mandante"`
	PlacarVisitante int    `json:"placar_visitante"`
	Data            string `json:"data_realizacao"`
	Status          string `json:"status"`
}

func BuscarRodadaCompleta(rodada int) ([]Partida, error) {
	res, err := Buscar(fmt.Sprintf("campeonatos/14/rodadas/%d", rodada))
	if err != nil {
		return nil, err
	}

	mapData := res.(map[string]interface{})
	partidasRaw := mapData["partidas"].([]interface{})

	var partidas []Partida
	for _, p := range partidasRaw {
		raw := p.(map[string]interface{})
		partidas = append(partidas, Partida{
			ID:              int(raw["partida_id"].(float64)),
			Mandante:        raw["time_mandante"].(map[string]interface{})["nome_popular"].(string),
			Visitante:       raw["time_visitante"].(map[string]interface{})["nome_popular"].(string),
			PlacarMandante:  int(raw["placar_mandante"].(float64)),
			PlacarVisitante: int(raw["placar_visitante"].(float64)),
			Data:            raw["data_realizacao"].(string),
			Status:          raw["status"].(string),
		})
	}

	return partidas, nil
}
