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

func TestGetRodadas_HandlerExists(t *testing.T) {
	gin.SetMode(gin.TestMode)
	
	w := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(w)

	assert.NotPanics(t, func() {
		GetRodadas(c)
	})
}

func TestGetJogosPorRodada_CacheHit(t *testing.T) {
	gin.SetMode(gin.TestMode)

	cachedData := []map[string]interface{}{
		{
			"partida_id": float64(999),
			"status":     "finalizada",
		},
	}

	utils.SetToCache("jogos_rodada_5", cachedData, 10)

	w := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(w)
	c.Params = gin.Params{gin.Param{Key: "rodada", Value: "5"}}

	GetJogosPorRodada(c)

	assert.Equal(t, http.StatusOK, w.Code)

	var response []map[string]interface{}
	err := json.Unmarshal(w.Body.Bytes(), &response)
	assert.NoError(t, err)
	assert.Equal(t, cachedData, response)
}

func TestGetJogosPorRodada_HandlerExists(t *testing.T) {
	gin.SetMode(gin.TestMode)
	
	w := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(w)
	c.Params = gin.Params{gin.Param{Key: "rodada", Value: "1"}}

	assert.NotPanics(t, func() {
		GetJogosPorRodada(c)
	})
}