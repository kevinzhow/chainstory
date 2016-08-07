package utils

import (
	"fmt"
	"log"
	"os"
	"path/filepath"
)

// exists returns whether the given file or directory exists or not
func FileExists(path string) (bool, error) {
	_, err := os.Stat(path)
	if err == nil {
		return true, nil
	}
	if os.IsNotExist(err) {
		return false, nil
	}
	return true, err
}

// application start patch parent directory
func getApplicationRoot() string {
	dir, err := filepath.Abs(filepath.Dir(os.Args[0]) + "/../")
	if err != nil {
		log.Fatalf("get application directory error: %v", err)
	}
	return dir
}

// application root directory
var appRoot string = ""

func SetAppRoot(path string) {
	if exist, _ := FileExists(path); exist == true {
		appRoot, _ = filepath.Abs(path)
	}
}
func GetAppRoot() string {
	if len(appRoot) <= 0 {
		appRoot = getApplicationRoot()
	}
	return appRoot
}

var appLogDir string = ""

func SetAppLogDir(path string) {
	appLogDir = path
}

func GetAppLogDir() string {
	if appLogDir == "" {
		// if haven't set the log file directory, use logs dir under application root
		appLogDir = getApplicationRoot() + "/logs"
	}
	return appLogDir
}

var appConfDir string = ""

func SetAppConfDir(path string) {
	appConfDir = path
}

func GetAppConfDir() string {
	if appConfDir == "" {
		// if haven't set the conf file directory, use conf dir under application root
		appConfDir = getApplicationRoot() + "/conf"
	}
	return appConfDir
}

// Get the conf file full path with specified filename
func GetConfFile(filename string) string {
	confFile := fmt.Sprintf("%s/%s", GetAppConfDir(), filename)
	return confFile
}

// Get the log file full path with specified filename
func GetLogFile(filename string) string {
	logDir := GetAppLogDir()

	const tmpdir string = "/tmp"
	if exist, _ := FileExists(logDir); exist == true {
		logDir, _ = filepath.Abs(logDir)
	} else {
		logDir = tmpdir
	}
	logfile := logDir + "/" + filename
	return logfile
}
