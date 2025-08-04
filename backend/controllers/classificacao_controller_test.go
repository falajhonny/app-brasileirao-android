package controllers

import (
	"api-brasileirao/utils"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

func TestGetClassificacao_CacheHit(t *testing.T) {
	gin.SetMode(gin.TestMode)

	cachedData := []map[string]interface{}{
		{
			"posicao": float64(1),
			"time": map[string]interface{}{
				"nome_popular": "Santos",
			},
			"pontos": float64(65),
		},
	}

	utils.SetToCache("classificacao", cachedData, 10)

	w := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(w)

	GetClassificacao(c)

	assert.Equal(t, http.StatusOK, w.Code)

	var response []map[string]interface{}
	err := json.Unmarshal(w.Body.Bytes(), &response)
	assert.NoError(t, err)
	assert.Equal(t, cachedData, response)
}

func TestGetClassificacao_HandlerExists(t *testing.T) {
	gin.SetMode(gin.TestMode)
	
	w := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(w)

	assert.NotPanics(t, func() {
		GetClassificacao(c)
	})
}