package utils

import (
	"fmt"
	"time"
)

const DAILY_MILLISECOND = 1000 * 60 * 60 * 24

func GetDateString(epochMillseconds int64) string {
	return time.Unix(epochMillseconds/1000, 0).Format("2006.01.02")
}

func NormalizeInterval(interval uint64) string {
	interval = interval / 1000
	if interval < 60 {
		return fmt.Sprintf("%ds", interval)
	}
	if interval < 60*60 {
		return fmt.Sprintf("%dm", interval/60)
	}
	if interval < 60*60*24 {
		return fmt.Sprintf("%dh", interval/60/60)
	}
	return fmt.Sprintf("%dd", interval/60/60/24)
}
