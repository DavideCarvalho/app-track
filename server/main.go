package main

import (
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
	"./container"
)

// Container Struct para o tipo Container no banco de dados


func main() {
	router := mux.NewRouter()
	router.HandleFunc("/container", container.AddNewContainer).Methods("POST")
	http.Handle("/", router)
	fmt.Println(http.ListenAndServe(":8080", nil))
}
