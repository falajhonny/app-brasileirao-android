package services

import (
	"api-brasileirao/config"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"log"
	"net/http"
)

func Buscar(endpoint string) (interface{}, error) {
	url := fmt.Sprintf("https://api.api-futebol.com.br/v1/%s", endpoint)

	req, _ := http.NewRequest("GET", url, nil)
	req.Header.Set("Authorization", "Bearer "+config.GetToken())

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode == 429 {
		return nil, errors.New("limite de requisições atingido, tente novamente em alguns minutos")
	}

	if resp.StatusCode == 403 {
		body, _ := io.ReadAll(resp.Body)
		log.Printf("[API Error 403] Body: %s", string(body))
		return nil, errors.New("acesso negado - verifique se o token está válido e ativo")
	}

	if resp.StatusCode != 200 {
		body, _ := io.ReadAll(resp.Body)
		log.Printf("[API Error %d] Body: %s", resp.StatusCode, string(body))
		return nil, fmt.Errorf("erro ao buscar dados: status %d", resp.StatusCode)
	}

	body, _ := io.ReadAll(resp.Body)
	log.Printf("[API Response] Body: %s", string(body))

	var result interface{}
	err = json.Unmarshal(body, &result)
	if err != nil {
		return nil, fmt.Errorf("erro ao decodificar JSON: %v", err)
	}

	return result, nil
}
