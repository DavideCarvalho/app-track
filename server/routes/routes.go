package routes

import (
	"github.com/gorilla/mux"
	"../container"
)
func MakeAppRoutes(router *mux.Router) *mux.Router {
	router.HandleFunc("/container/{containerId}", container.GetContainerMovements).Methods("GET")
	return router
}
