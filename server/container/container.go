package container

import (
	"github.com/go-bongo/bongo"
	"net/http"
	"io/ioutil"
	"encoding/json"
	"../database"
)

// Container Struct para adicionar o container na base de dados
type Container struct {
	bongo.DocumentBase `bson:",inline"`
	IDContainer        string `json:"idContainer"`
	NomeEmpresa        string `json:"nomeEmpresa"`
}

//AddNewContainer add container to MongoDB database
func AddNewContainer(w http.ResponseWriter, r *http.Request) {
	databaseConnection := database.GetDatabaseConnection()
	containerDatabase := returnContainerToInsertToDatabase(r)
	databaseConnection.Collection("containers").Save(containerDatabase)
	json.NewEncoder(w).Encode(containerDatabase)
}

func returnContainerToInsertToDatabase(r *http.Request) *Container {
	var container Container
	b, _ := ioutil.ReadAll(r.Body)
	json.Unmarshal(b, &container)
	return &container
}