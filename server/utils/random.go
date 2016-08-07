package utils

import (
	"math/rand"
	"time"
	"unicode/utf8"
)

const letterBytes string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
const (
	letterIdxBits = 6                    // 6 bits to represent a letter index
	letterIdxMask = 1<<letterIdxBits - 1 // All 1-bits, as many as letterIdxBits
	letterIdxMax  = 63 / letterIdxBits   // # of letter indices fitting in 63 bits
)

var randSource = rand.NewSource(time.Now().UnixNano())

func GetRandomNumber() int64 {
	return randSource.Int63()
}

func RandomeNumber(max int) int {
	return rand.New(rand.NewSource(randSource.Int63())).Intn(max)
}

// Get a random string of the specified length
func GetRandomString(len int) string {
	b := make([]byte, len)
	// A src.Int63() generates 63 random bits, enough for letterIdxMax characters!
	for i, cache, remain := len-1, randSource.Int63(), letterIdxMax; i >= 0; {
		if remain == 0 {
			cache, remain = randSource.Int63(), letterIdxMax
		}
		if idx := int(cache & letterIdxMask); idx < utf8.RuneCountInString(letterBytes) {
			b[i] = letterBytes[idx]
			i--
		}
		cache >>= letterIdxBits
		remain--
	}
	return string(b)
}
