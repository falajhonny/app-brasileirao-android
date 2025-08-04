package services

import (
	"api-brasileirao/config"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestBuscar_InvalidEndpoint(t *testing.T) {
	result, err := Buscar("invalid-endpoint-that-does-not-exist")
	
	assert.Error(t, err)
	assert.Nil(t, result)
}

func TestBuscar_EmptyEndpoint(t *testing.T) {
	result, err := Buscar("")
	
	assert.Error(t, err)
	assert.Nil(t, result)
}

func TestBuscar_ConfigTokenExists(t *testing.T) {
	token := config.GetToken()
	assert.NotEmpty(t, token)
	assert.Contains(t, token, "test_")
}