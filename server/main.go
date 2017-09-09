package main

import (
	"fmt"
	"net/http"
	"github.com/gorilla/mux"
	"./routes"
)

// Container Struct para o tipo Container no banco de dados

func main() {
	router := mux.NewRouter()
	router = routes.MakeAppRoutes(router)
	http.Handle("/", router)
	fmt.Println("Listening on port 8081")
	http.ListenAndServe(":8081", nil)
}
