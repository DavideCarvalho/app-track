package database

import (
	"github.com/go-bongo/bongo"
)

func GetDatabaseConnection() *bongo.Connection {
	config := &bongo.Config{
		ConnectionString: "localhost",
		Database:         "bongotest",
	}
	connection, err := bongo.Connect(config)
	checkErr(err)
	return connection
}

func checkErr(err error) {
	if err != nil {
		panic(err)
	}
}