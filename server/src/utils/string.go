package utils

import (
	"encoding/json"
	"unicode"
)

func FormatToJson(obj interface{}) string {
	b, _ := json.Marshal(obj)
	return string(b)
}

// Converts string to snake case
// e.g.: SnakeCase("Http Request") => "http_request"
// e.g.: SnakeCase("http request") => "http_request"
func SnakeCase(input string) string {
	runes := []rune(input)
	length := len(runes)

	var out []rune
	for i := 0; i < length; i++ {
		if runes[i] == ' ' {
			out = append(out, '_')
		} else {
			// replace camelCase with '_'
			if i > 0 && unicode.IsUpper(runes[i]) && (unicode.IsLower(runes[i-1])) {
				out = append(out, '_')
			}
			if unicode.IsLetter(runes[i]) {
				out = append(out, unicode.ToLower(runes[i]))
			}
		}
	}
	return string(out)
}
