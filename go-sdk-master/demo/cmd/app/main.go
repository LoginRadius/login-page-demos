package main

import (
	"log"
	"net/http"
	"os"
	"path/filepath"

	"github.com/LoginRadius/go-sdk/demo/pkg/handleposts"
	"github.com/LoginRadius/go-sdk/demo/pkg/handleputs"
	"github.com/joho/godotenv"
	"github.com/julienschmidt/httprouter"
)

func main() {
	cwd, _ := os.Getwd()

	err := godotenv.Load(
		filepath.Join(cwd, "../../config/secret.env"),
		filepath.Join(cwd, "../../config/public.env"),
	)

	if err != nil {
		log.Fatal("Error loading env files, please configure your secret.env and public.env.")
	}

	router := httprouter.New()

	router.POST("/index", handleposts.Index)
	router.POST("/api/profile", handleposts.Profile)
	router.PUT("/api/profile/changepassword", handleputs.ChangePassword)
	router.PUT("/api/profile/update", handleputs.UpdateProfile)

	// if not found look for a static file
	static := httprouter.New()
	static.ServeFiles("/*filepath", http.Dir(filepath.Join(cwd, "../../ui/assets")))
	router.NotFound = static

	http.ListenAndServe(":3000", router)
}
