package container

import (
	"net/http"
	"encoding/json"
	"github.com/gorilla/mux"
	"io/ioutil"
)

type ContainerMovement struct {
	Time string `json:"time"`
	Location string `json:"location"`
	Description string `json:"description"`
	Date string `json:"date"`
	Vessel string `json:"vessel"`
	Voyage string `json:"voyage"`
}

type ContainerMovementsJson struct {
	Company string `json:"company"`
	ContainerMovement []ContainerMovement `json:"containerMovements"`
}

//GetContainerMovements add container to MongoDB database
func GetContainerMovements(w http.ResponseWriter, r *http.Request) {
	requestVariables := mux.Vars(r)["containerId"]
	scrapperResponse, err := http.Get("http://localhost:5000/msc/"+requestVariables)
	checkErr(err)
	ReturnScrapperContentAsJson(scrapperResponse, w)
}

func ReturnScrapperContentAsJson(scrapperResponse *http.Response, w http.ResponseWriter) {
	containerMovements, err := ioutil.ReadAll(scrapperResponse.Body)
	checkErr(err)
	var containerMovementsMarshal []ContainerMovement
	json.Unmarshal(containerMovements, &containerMovementsMarshal)
	containerMovementsJson := ContainerMovementsJson{"MSC", containerMovementsMarshal}
	w.Header().Set("content-type", "application/json")
	json.NewEncoder(w).Encode(containerMovementsJson)
}

func checkErr(err error) {
	if err != nil {
		panic(err)
	}
}