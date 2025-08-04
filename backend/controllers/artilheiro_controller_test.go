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

func TestGetArtilheiros_CacheHit(t *testing.T) {
	gin.SetMode(gin.TestMode)

	cachedData := []map[string]interface{}{
		{
			"atleta": map[string]interface{}{
				"nome_popular": "Pelé",
			},
			"gols": float64(100),
		},
	}

	utils.SetToCache("artilheiros", cachedData, 10)

	w := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(w)

	GetArtilheiros(c)

	assert.Equal(t, http.StatusOK, w.Code)

	var response []map[string]interface{}
	err := json.Unmarshal(w.Body.Bytes(), &response)
	assert.NoError(t, err)
	assert.Equal(t, cachedData, response)
}

func TestGetArtilheiros_HandlerExists(t *testing.T) {
	gin.SetMode(gin.TestMode)
	
	w := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(w)

	assert.NotPanics(t, func() {
		GetArtilheiros(c)
	})
}