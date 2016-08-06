package controllers

import (
  "net/http"
  "fmt"
  "io/ioutil"
  "path/filepath"
  "os"
)

// Display the Hello World page for fun
func IndexGET(w http.ResponseWriter, r *http.Request) {
  // Find the current path
  http_root, osError := os.Getwd()

  // Detact Error
  if osError != nil {
      fmt.Println(osError)
      os.Exit(1)
  }

  // Locate to the web resouerce folder
  http_root = fmt.Sprintf("%s/../web", http_root)

  fmt.Printf("Fetch: %s %s\n", r.URL.Path)
  var filename, fileext string

  // Serve index.html for / as default
  if (r.URL.Path == "/") {
    filename = "index"
    fileext = "html"
  } else {
    filename = http_root + r.URL.Path
    fileext = filepath.Ext(filename)
  }

  content, err := ioutil.ReadFile(filename)
  if err != nil {
      fmt.Printf("   404 Not Found!\n")
      w.WriteHeader(http.StatusNotFound)
      return
  }

  var contype string
  switch fileext {
      case ".html", "htm":
          contype = "text/html"
      case ".css":
          contype = "text/css"
      case ".js":
          contype = "application/javascript"
      case ".png":
          contype = "image/png"
      case ".jpg", ".jpeg":
          contype = "image/jpeg"
      case ".gif":
          contype = "image/gif"
      default:
          contype = "text/plain"
  }
  fmt.Printf("ext %s, ct = %s\n", fileext, contype)

  w.Header().Set("Content-Type", contype)
  fmt.Fprintf(w, "%s", content)
}
