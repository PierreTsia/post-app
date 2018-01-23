<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card color="cyan darken-2" class="white--text">
          <v-container fluid grid-list-lg>
            <v-layout row>
              <v-flex class="mt-4" xs6 sm4>
                <v-card-media src="http://lorempixel.com/output/business-q-c-495-376-2.jpg" height="125px" contain></v-card-media>
              </v-flex>
              <v-flex xs6 sm8>
                <v-card-title primary-title>
                  <div>
                    <div>
                      <h3>Mon titre</h3>
                    </div>
                    <div>Le Lorem Ipsum est simplement du faux texte employorceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu
                      n'en soit modifié</div>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-btn flat>
                    <v-icon left>arrow_forward</v-icon>
                    View Post
                  </v-btn>
                </v-card-actions>
  
              </v-flex>
  
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
