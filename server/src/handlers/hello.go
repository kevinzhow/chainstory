package handlers

import "github.com/ant0ine/go-json-rest/rest"
import "crypto/sha1"
import "fmt"

// Return the Hello World for fun
func HelloGET(w rest.ResponseWriter, r *rest.Request) {
	response := MakeResponse()
	response["message"] = "Hello, World"
	w.WriteJson(response)
}

func WeChatSignGET(w rest.ResponseWriter, r *rest.Request) {
	timestamp := r.URL.Query().Get("timestamp")

	response := MakeResponse()
	string1 := "noncestr=jcYWchBYX4o2GF&timestamp="+timestamp+"&url=https://zi.com/chainstory"
    h := sha1.New()
    h.Write([]byte(string1))

    // This gets the finalized hash result as a byte
    // slice. The argument to `Sum` can be used to append
    // to an existing byte slice: it usually isn't needed.
    bs := h.Sum(nil)

    // SHA1 values are often printed in hex, for example
    // in git commits. Use the `%x` format verb to convert
    // a hash results to a hex string.
	response["signature"] = fmt.Sprintf("%x", bs)
	w.WriteJson(response)
}