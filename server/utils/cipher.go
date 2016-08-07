package utils

import (
	"crypto/md5"
	"fmt"
	"io"
)

// Get the md5 hash string of the specified str
func MD5(str string) string {
	h := md5.New()
	io.WriteString(h, str)
	return fmt.Sprintf("%x", h.Sum(nil))
}
