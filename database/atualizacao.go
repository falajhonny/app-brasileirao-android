package database

import (
	"api-brasileirao/services"
	"fmt"
	"log"
	"regexp"
)

type Partida struct {
	ID              int
	Mandante        string
	Visitante       string
	PlacarMandante  int
	PlacarVisitante int
	Data            string
	Status          string
}

func BuscarRodadaCompleta(rodada int) ([]Partida, error) {
	endpoint := "campeonatos/14/partidas"
	log.Println("[Rodadas] Buscando partidas completas no endpoint:", endpoint)

	response, err := services.Buscar(endpoint)
	if err != nil {
		return nil, fmt.Errorf("erro ao buscar partidas: %v", err)
	}

	mapData, ok := response.(map[string]interface{})
	if !ok {
		return nil, fmt.Errorf("formato inesperado da resposta")
	}

	partidasMap, ok := mapData["partidas"].(map[string]interface{})
	if !ok {
		return nil, fmt.Errorf("chave 'partidas' não encontrada ou em formato inválido")
	}

	faseUnica, ok := partidasMap["fase-unica"].(map[string]interface{})
	if !ok {
		return nil, fmt.Errorf("chave 'fase-unica' não encontrada ou inválida")
	}

	rodadaKey := fmt.Sprintf("%da-rodada", rodada)
	lista, existe := faseUnica[rodadaKey]
	if !existe {
		log.Printf("[Rodadas] Rodada '%s' não encontrada", rodadaKey)
		return []Partida{}, nil
	}

	partidasArray, ok := lista.([]interface{})
	if !ok {
		return nil, fmt.Errorf("lista de partidas da %s inválida", rodadaKey)
	}

	var partidas []Partida
	for _, item := range partidasArray {
		p := item.(map[string]interface{})
		timeMandante := p["time_mandante"].(map[string]interface{})
		timeVisitante := p["time_visitante"].(map[string]interface{})

		data := ""
		if p["data_realizacao"] != nil {
			data = p["data_realizacao"].(string)
		}
		hora := ""
		if p["hora_realizacao"] != nil {
			hora = p["hora_realizacao"].(string)
		}

		partida := Partida{
			ID:              int(p["partida_id"].(float64)),
			Mandante:        timeMandante["nome_popular"].(string),
			Visitante:       timeVisitante["nome_popular"].(string),
			PlacarMandante:  intFromInterface(p["placar_mandante"]),
			PlacarVisitante: intFromInterface(p["placar_visitante"]),
			Data:            data + " " + hora,
			Status:          strOrEmpty(p["status"]),
		}
		partidas = append(partidas, partida)
	}

	log.Printf("[Rodadas] Total de partidas encontradas para rodada %d: %d\n", rodada, len(partidas))
	return partidas, nil
}

func SalvarArtilheiros(data interface{}) {
	log.Printf("[Artilheiros] Recebido: %+v", data)
	tx, err := DB.Begin()
	if err != nil {
		log.Println("Erro ao iniciar transação de artilheiros:", err)
		return
	}

	stmt, err := tx.Prepare(`
		INSERT INTO artilheiros (atleta_id, atleta_nome, time_id, time_nome, gols, jogos, data_atualizacao)
		VALUES ($1, $2, $3, $4, $5, $6, NOW())
		ON CONFLICT (atleta_id) DO UPDATE
		SET gols = EXCLUDED.gols,
		    atleta_nome = EXCLUDED.atleta_nome,
		    time_nome = EXCLUDED.time_nome,
		    time_id = EXCLUDED.time_id,
		    jogos = EXCLUDED.jogos,
		    data_atualizacao = NOW()
	`)
	if err != nil {
		log.Println("Erro ao preparar statement de artilheiros:", err)
		_ = tx.Rollback()
		return
	}
	defer stmt.Close()

	lista, ok := data.([]interface{})
	if !ok {
		log.Println("Erro ao converter artilheiros: tipo inválido")
		_ = tx.Rollback()
		return
	}

	for i, item := range lista {
		registro, ok := item.(map[string]interface{})
		if !ok {
			log.Printf("[Artilheiros] Erro no índice %d: registro inválido", i)
			continue
		}

		atleta, ok := registro["atleta"].(map[string]interface{})
		if !ok {
			log.Printf("[Artilheiros] Erro no índice %d: campo 'atleta' ausente", i)
			continue
		}

		time, ok := registro["time"].(map[string]interface{})
		if !ok {
			log.Printf("[Artilheiros] Erro no índice %d: campo 'time' ausente", i)
			continue
		}

		atletaID, ok := atleta["atleta_id"].(float64)
		if !ok {
			log.Printf("[Artilheiros] Erro ao converter atleta_id no índice %d", i)
			continue
		}

		atletaNome, ok := atleta["nome_popular"].(string)
		if !ok {
			log.Printf("[Artilheiros] Erro ao converter nome_popular no índice %d", i)
			continue
		}

		timeID, ok := time["time_id"].(float64)
		if !ok {
			log.Printf("[Artilheiros] Erro ao converter time_id no índice %d", i)
			continue
		}

		timeNome, ok := time["nome_popular"].(string)
		if !ok {
			log.Printf("[Artilheiros] Erro ao converter time_nome no índice %d", i)
			continue
		}

		gols, ok := registro["gols"].(float64)
		if !ok {
			log.Printf("[Artilheiros] Erro ao converter gols no índice %d", i)
			continue
		}

		log.Printf("Inserindo: atleta_id=%d, atleta_nome=%s, time_id=%d, time_nome=%s, gols=%d",
			int(atletaID), atletaNome, int(timeID), timeNome, int(gols))

		_, err := stmt.Exec(
			int(atletaID),
			atletaNome,
			int(timeID),
			timeNome,
			int(gols),
			0,
		)
		if err != nil {
			log.Printf("Erro ao executar INSERT para atleta %s: %v", atletaNome, err)
		}
	}

	if err := tx.Commit(); err != nil {
		log.Println("Erro ao fazer commit de artilheiros:", err)
	} else {
		log.Println("[Artilheiros] Commit concluído com sucesso.")
	}
}

func SalvarTodasPartidas(data interface{}) {
	log.Printf("[Partidas] Recebido: %+v", data)

	tx, err := DB.Begin()
	if err != nil {
		log.Println("[Partidas] Erro ao iniciar transação:", err)
		return
	}

	stmt, err := tx.Prepare(`
		INSERT INTO partidas (
			partida_id, rodada, time_mandante, time_visitante,
			escudo_mandante, escudo_visitante, placar_mandante, placar_visitante,
			data_realizacao, status, slug
		) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
		ON CONFLICT (partida_id) DO UPDATE SET
			placar_mandante = EXCLUDED.placar_mandante,
			placar_visitante = EXCLUDED.placar_visitante,
			status = EXCLUDED.status,
			data_realizacao = EXCLUDED.data_realizacao
	`)
	if err != nil {
		log.Println("[Partidas] Erro ao preparar statement:", err)
		_ = tx.Rollback()
		return
	}
	defer stmt.Close()

	rootMap, ok := data.(map[string]interface{})
	if !ok {
		log.Println("[Partidas] Erro: estrutura raiz não é um mapa")
		_ = tx.Rollback()
		return
	}

	partidasMap, ok := rootMap["partidas"].(map[string]interface{})
	if !ok {
		log.Println("[Partidas] Erro: chave 'partidas' não contém um objeto esperado")
		_ = tx.Rollback()
		return
	}

	partidasInterno, ok := partidasMap["partidas"].(map[string]interface{})
	if !ok {
		log.Println("[Partidas] Erro: chave 'partidas.partidas' não contém um objeto esperado")
		_ = tx.Rollback()
		return
	}

	primeiraFase, ok := partidasInterno["primeira-fase"].(map[string]interface{})
	if !ok {
		log.Println("[Partidas] Erro: chave 'primeira-fase' não é um mapa")
		_ = tx.Rollback()
		return
	}

	totalInseridas := 0
	for chave, valor := range primeiraFase {
		chaveMap, ok := valor.(map[string]interface{})
		if !ok {
			log.Printf("[Partidas] %s não é um mapa", chave)
			continue
		}
		ida, ok := chaveMap["ida"].(map[string]interface{})
		if !ok {
			log.Printf("[Partidas] %s não possui 'ida' como mapa", chave)
			continue
		}

		mandante := ida["time_mandante"].(map[string]interface{})
		visitante := ida["time_visitante"].(map[string]interface{})

		placarMandante := intFromInterface(ida["placar_mandante"])
		placarVisitante := intFromInterface(ida["placar_visitante"])
		data := strOrEmpty(ida["data_realizacao"])
		hora := strOrEmpty(ida["hora_realizacao"])
		status := strOrEmpty(ida["status"])
		slug := strOrEmpty(ida["slug"])

		_, err := stmt.Exec(
			int(ida["partida_id"].(float64)),
			0, // rodada não está presente nesse formato, pode ser ajustado se necessário
			strOrEmpty(mandante["nome_popular"]),
			strOrEmpty(visitante["nome_popular"]),
			strOrEmpty(mandante["escudo"]),
			strOrEmpty(visitante["escudo"]),
			placarMandante,
			placarVisitante,
			data+" "+hora,
			status,
			slug,
		)
		if err != nil {
			log.Printf("[Partidas] Erro ao inserir partida ID %v: %v", ida["partida_id"], err)
		} else {
			totalInseridas++
		}
	}

	if err := tx.Commit(); err != nil {
		log.Println("[Partidas] Erro ao fazer commit:", err)
	} else {
		log.Printf("[Partidas] Commit concluído com sucesso. %d partidas salvas.\n", totalInseridas)
	}
}

func extractRodadaFromKey(key string) int {
	re := regexp.MustCompile(`^(\d+)`)
	match := re.FindStringSubmatch(key)
	if len(match) >= 2 {
		var rodada int
		fmt.Sscanf(match[1], "%d", &rodada)
		return rodada
	}
	return 0
}

func strOrEmpty(value interface{}) string {
	if str, ok := value.(string); ok {
		return str
	}
	return ""
}

func intFromInterface(value interface{}) int {
	if val, ok := value.(float64); ok {
		return int(val)
	}
	return 0
}

func SalvarClassificacao(data interface{}) {
	log.Printf("[Classificacao] Recebido: %+v", data)
	tx, err := DB.Begin()
	if err != nil {
		log.Println("Erro ao iniciar transação de classificacao:", err)
		return
	}

	stmt, err := tx.Prepare(`
		INSERT INTO classificacao (time_id, nome_popular, posicao, pontos, vitorias, empates, derrotas, saldo_gols)
		VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
		ON CONFLICT (time_id) DO UPDATE SET
			nome_popular = EXCLUDED.nome_popular,
			posicao = EXCLUDED.posicao,
			pontos = EXCLUDED.pontos,
			vitorias = EXCLUDED.vitorias,
			empates = EXCLUDED.empates,
			derrotas = EXCLUDED.derrotas,
			saldo_gols = EXCLUDED.saldo_gols`)
	if err != nil {
		log.Println("Erro ao preparar statement de classificacao:", err)
		_ = tx.Rollback()
		return
	}
	defer stmt.Close()

	lista, ok := data.([]interface{})
	if !ok {
		log.Println("Erro ao converter classificacao")
		_ = tx.Rollback()
		return
	}

	for _, item := range lista {
		reg := item.(map[string]interface{})
		time := reg["time"].(map[string]interface{})

		_, err := stmt.Exec(
			int(time["time_id"].(float64)),
			time["nome_popular"],
			int(reg["posicao"].(float64)),
			int(reg["pontos"].(float64)),
			int(reg["vitorias"].(float64)),
			int(reg["empates"].(float64)),
			int(reg["derrotas"].(float64)),
			int(reg["saldo_gols"].(float64)),
		)
		if err != nil {
			log.Println("Erro ao inserir classificação:", err)
		}
	}

	if err := tx.Commit(); err != nil {
		log.Println("Erro ao fazer commit de classificacao:", err)
	}
}

func SalvarRodadasComPartidas(data interface{}) {
	log.Printf("[Rodadas] Recebido: %+v", data)
	tx, err := DB.Begin()
	if err != nil {
		log.Println("Erro ao iniciar transação de rodadas:", err)
		return
	}

	rodadas, ok := data.([]interface{})
	if !ok {
		log.Println("Erro ao converter rodadas")
		_ = tx.Rollback()
		return
	}

	for _, r := range rodadas {
		rodada := r.(map[string]interface{})
		num := int(rodada["rodada"].(float64))
		status := rodada["status"].(string)

		_, err := tx.Exec(`
			INSERT INTO rodadas (rodada, status) 
			VALUES ($1, $2)
			ON CONFLICT (rodada) DO UPDATE SET status = EXCLUDED.status`, num, status)
		if err != nil {
			log.Printf("Erro ao salvar rodada %d: %v", num, err)
			continue
		}
	}

	if err := tx.Commit(); err != nil {
		log.Println("Erro ao fazer commit de rodadas:", err)
		return
	}

	// Após salvar rodadas, buscamos e salvamos todas as partidas de uma vez
	log.Println("[Rodadas] Buscando partidas completas no endpoint: campeonatos/14/partidas")
	partidasResp, err := services.Buscar("campeonatos/14/partidas")
	if err != nil {
		log.Println("Erro ao buscar todas as partidas:", err)
		return
	}

	SalvarTodasPartidas(partidasResp)
}
