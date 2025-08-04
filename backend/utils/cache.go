package utils

import (
	"sync"
	"time"
)

// estrutura de cada item no cache
type cacheItem struct {
	Data       interface{}
	Expiration int64 // timestamp em segundos
}

var cache = make(map[string]cacheItem)
var mutex = &sync.RWMutex{}

// Pega do cache, verificando expiração
func GetFromCache(key string) (interface{}, bool) {
	mutex.RLock()
	defer mutex.RUnlock()

	item, found := cache[key]
	if !found {
		return nil, false
	}

	// Verifica se expirou
	if time.Now().Unix() > item.Expiration {
		mutex.RUnlock() // Release read lock
		mutex.Lock()    // Acquire write lock
		// Double-check expiration after acquiring write lock
		if time.Now().Unix() > item.Expiration {
			delete(cache, key)
		}
		mutex.Unlock()  // Release write lock
		mutex.RLock()   // Reacquire read lock
		return nil, false
	}

	return item.Data, true
}

// Salva no cache com TTL em minutos
func SetToCache(key string, data interface{}, ttlMinutes int) {
	mutex.Lock()
	defer mutex.Unlock()

	expiration := time.Now().Add(time.Duration(ttlMinutes) * time.Minute).Unix()
	cache[key] = cacheItem{
		Data:       data,
		Expiration: expiration,
	}
}
