<template>
  <div>
    <div class="row">
      <div class="col">
        <h5><i class="bi-boxes me-2"></i>Configuração da equipe</h5>
      </div>
    </div>
    <div class="row">
      <div class="col-8">
        <p>Enfermeiro: <strong>{{ eqp.enfermeiro }}</strong></p>
        <p>Socorrista: <strong>{{ eqp.socorrista }}</strong></p>
        <p>Médico: <strong>{{ eqp.medico }}</strong></p>
        <p>Carro: <strong>{{ eqp.carro }}</strong></p>
        <p>Telefone: <strong>{{ eqp.telefone }}</strong></p>
        <p>Kit de reanimação: <strong>{{ eqp.kitsDeReanimacao }}</strong></p>
      </div>
      <div class="col-4 text-center">
        <div class="row">
          <div class="col">
            <img class="img-fluid" :src="require(`@/assets/ambulancias/${imgAmbulancia}`)">
          </div>
        </div>
        <div class="row mt-3">
          <div class="col">
            <button type="button" class="btn btn-primary" @click="montarEquipe">Montar equipe</button>
          </div>
        </div>              
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'ConfiguracaoEquipe',
    computed: {
      ...mapState({
        eqp: state => state.equipe
      }),
      imgAmbulancia () {
        if (this.eqp.kitsDeReanimacao) {
          return 'uti.png'
        }
        if (this.eqp.carro) {
          return 'simples.png'
        }
        return 'indefinida.png'
      }
    },
    methods:{
      montarEquipe(){
        //faz uma cópia do objeto equipe montado
        let equipe = Object.assign({}, this.$store.state.equipe)
        
        //faz o acionamento da mutation passando por parametro a 'equipe' montada atual
        this.$store.commit('setNewEquipe', equipe)
      }
    }
}
</script>
<style scoped>
p{
  font-style:italic
}
strong{
color: green
}
</style>

