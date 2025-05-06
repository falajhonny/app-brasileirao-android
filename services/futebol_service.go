package services

import (
	"api-brasileirao/config"
	"encoding/json"
	"errors"
	"fmt"
	"io"
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

	if resp.StatusCode != 200 {
		return nil, fmt.Errorf("erro ao buscar dados: status %d", resp.StatusCode)
	}

	body, _ := io.ReadAll(resp.Body)

	var result interface{}
	err = json.Unmarshal(body, &result)
	if err != nil {
		return nil, fmt.Errorf("erro ao decodificar JSON: %v", err)
	}

	return result, nil
}
