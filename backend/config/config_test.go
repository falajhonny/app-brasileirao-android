package config

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestGetToken_ReturnsToken(t *testing.T) {
	result := GetToken()
	assert.NotEmpty(t, result)
	assert.IsType(t, "", result)
}

func TestGetToken_ReturnsTestToken(t *testing.T) {
	expectedToken := "test_99496160057c22591d39add19c660f"
	result := GetToken()
	assert.Equal(t, expectedToken, result)
}

func TestGetToken_ConsistentResult(t *testing.T) {
	result1 := GetToken()
	result2 := GetToken()
	assert.Equal(t, result1, result2)
}

func TestGetToken_NotEmpty(t *testing.T) {
	result := GetToken()
	assert.Greater(t, len(result), 0)
}