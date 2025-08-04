package utils

import (
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
)

func TestSetToCache_Success(t *testing.T) {
	key := "test_key"
	data := map[string]interface{}{
		"id":   1,
		"nome": "Santos",
	}
	ttlMinutes := 5

	SetToCache(key, data, ttlMinutes)

	result, found := GetFromCache(key)
	assert.True(t, found)
	assert.Equal(t, data, result)
}

func TestGetFromCache_KeyNotFound(t *testing.T) {
	result, found := GetFromCache("non_existent_key")
	assert.False(t, found)
	assert.Nil(t, result)
}

func TestGetFromCache_ExpiredKey(t *testing.T) {
	key := "expired_key"
	data := "expired_data"

	mutex.Lock()
	cache[key] = cacheItem{
		Data:       data,
		Expiration: time.Now().Add(-1 * time.Hour).Unix(),
	}
	mutex.Unlock()

	result, found := GetFromCache(key)
	assert.False(t, found)
	assert.Nil(t, result)

	mutex.RLock()
	_, exists := cache[key]
	mutex.RUnlock()
	assert.False(t, exists)
}

func TestCache_ConcurrentAccess(t *testing.T) {
	key := "concurrent_key"
	data := "concurrent_data"

	done := make(chan bool, 10)

	for i := 0; i < 5; i++ {
		go func() {
			SetToCache(key, data, 5)
			done <- true
		}()
	}

	for i := 0; i < 5; i++ {
		go func() {
			GetFromCache(key)
			done <- true
		}()
	}

	for i := 0; i < 10; i++ {
		<-done
	}

	result, found := GetFromCache(key)
	assert.True(t, found)
	assert.Equal(t, data, result)
}

func TestCache_DifferentDataTypes(t *testing.T) {
	stringData := "string_value"
	SetToCache("string_key", stringData, 5)

	intData := 42
	SetToCache("int_key", intData, 5)

	mapData := map[string]interface{}{"key": "value"}
	SetToCache("map_key", mapData, 5)

	sliceData := []string{"item1", "item2"}
	SetToCache("slice_key", sliceData, 5)

	result1, found1 := GetFromCache("string_key")
	assert.True(t, found1)
	assert.Equal(t, stringData, result1)

	result2, found2 := GetFromCache("int_key")
	assert.True(t, found2)
	assert.Equal(t, intData, result2)

	result3, found3 := GetFromCache("map_key")
	assert.True(t, found3)
	assert.Equal(t, mapData, result3)

	result4, found4 := GetFromCache("slice_key")
	assert.True(t, found4)
	assert.Equal(t, sliceData, result4)
}

func TestCache_OverwriteKey(t *testing.T) {
	key := "overwrite_key"
	originalData := "original_value"
	newData := "new_value"

	SetToCache(key, originalData, 5)
	result1, found1 := GetFromCache(key)
	assert.True(t, found1)
	assert.Equal(t, originalData, result1)

	SetToCache(key, newData, 5)
	result2, found2 := GetFromCache(key)
	assert.True(t, found2)
	assert.Equal(t, newData, result2)
}

func TestCache_ZeroTTL(t *testing.T) {
	key := "zero_ttl_key"
	data := "zero_ttl_data"

	SetToCache(key, data, 0)

	time.Sleep(100 * time.Millisecond)

	result, found := GetFromCache(key)
	assert.False(t, found)
	assert.Nil(t, result)
}