package main

import (
	"flag"
	"log"
	"os"
	"strconv"
	"utils"
)

func initLogger() {

	const file string = "chain_story.log"
	const flag = os.O_RDWR | os.O_CREATE | os.O_APPEND
	const mask = 0666

	logfile := utils.GetLogFile(file)

	f, err := os.OpenFile(logfile, flag, mask)
	if err != nil {
		log.Fatalf("error opening log file: %v", err)
	}
	log.Printf("Log file - [%s]", logfile)
	log.SetOutput(f)
	log.SetFlags(log.LstdFlags | log.Llongfile)
}

func main() {
	rootPtr := flag.String("root", "", "application directory")
	logDirPtr := flag.String("log", "", "log file directory")
	confDirPtr := flag.String("conf", "", "log file directory")
	//stagePtr := flag.String("env", "prod", "Application Running mode [test|prod]")
	hostPtr := flag.String("host", "0.0.0.0", "host name or ip address")
	portPtr := flag.Int("port", 9527, "port name")
	flag.Parse()

	utils.SetAppRoot(*rootPtr)
	//utils.SetAppStage(*stagePtr)
	utils.SetAppLogDir(*logDirPtr)
	utils.SetAppConfDir(*confDirPtr)
	initLogger()

	log.Printf("Application Directory - [%s]", utils.GetAppRoot())
	//log.Printf("Application Running Mode - [%s]", utils.GetAppStage())

	err := BootServer(*hostPtr, strconv.Itoa(*portPtr))
	if err != nil {
		log.Fatalf("Boot server faild, error %s\n", err)
		os.Exit(-1)
	}
}
