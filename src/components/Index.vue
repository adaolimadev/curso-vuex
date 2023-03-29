<template>
  <div id="teste">
    
    <nav class="navbar navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">{{ $store.state.titulo }}</a>
      </div>
    </nav>

    <div class="container">

      <div class="row mt-5">
        <div class="col-6 p">
          <profissionais />
        </div>

        <div class="col-6">
          <equipamentos />
        </div>
      </div>

      <div class="row mt-5 mb-5 bg-light p-2">
        <div class="col">
          <configuracao-equipe />
        </div>
      </div>

      <div class="row mt-5 mb-5">
        <div class="col">
          <equipes />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ConfiguracaoEquipe from './ConfiguracaoEquipe.vue'
import Equipamentos from './Equipamentos.vue'
import Equipes from './Equipes.vue'
import Profissionais from './Profissionais.vue'
import { mapMutations, mapActions } from 'vuex'

export default {
  components: { 
    ConfiguracaoEquipe,
    Equipamentos,
    Equipes,
    Profissionais
  },
  name: 'Index',
  props: {
    msg: String
  },
  methods: {
    ...mapMutations([
      'setEnfermeiros',
      'setSocorristas',
      'setMedicos',
      'setCarros',
      'setTelefones',
      'setKits'
    ]),
    // ...mapActions([
    //   'fetchEquipamentos',
    //   'fetchProfissionais'
    // ])

    //Exemplo de mapeamento em forma de objetos e funções
    ...mapActions({
      fetchEquipamentos: (dispatch, payload) => {
        //implementação da lógica
        
        dispatch('fetchEquipamentos', payload)
        //implementação de mais lógica
      },
      fetchProfissionais: 'fetchProfissionais'
    })
  },

  //Aproveita o componente central 'Index' para pegar os dados do json e disparar as actions 
  created () {

    this.fetchEquipamentos()
    this.fetchProfissionais()
    
    //this.$store.dispatch('fetchEquipamentos')
    //this.$store.dispatch('fetchProfissionais')

    // fetch(`${this.baseUrl}/enfermeiros`)
    // .then(response => response.json())
    // .then(dados => this.setEnfermeiros(dados))

    // fetch(`${this.baseUrl}/socorristas`)
    // .then(response => response.json())
    // .then(dados => this.setSocorristas (dados))

    // fetch(`${this.baseUrl}/medicos`)
    // .then(response => response.json())
    // .then(dados => this.setMedicos(dados))

    // Exemplo usando Actions com mutations
    // fetch(`${this.baseUrl}/equipamentos`)
    // .then(response => response.json())
    // .then(dados => {
    //   this.$store.dispatch('adicionarEquipamentos', dados)
    // })


    // Exemplo usando mutations
    // fetch(`${this.baseUrl}/equipamentos`)
    // .then(response => response.json())
    // .then(dados => {
    //   this.setCarros(dados.carros)
    //   this.setTelefones(dados)
    //   this.setKits(dados)
    // })

    //Exemplo sem mapMutations
    // fetch(`${this.baseUrl}/medicos`)
    // .then(response => response.json())
    // .then(dados => this.$store.commit('setMedicos', dados))
  }
}
</script>
