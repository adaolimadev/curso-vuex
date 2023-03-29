<template>
    <div class="row">
        <div class="col-1" v-if="dados.id" v-text="dados.id"></div>
        <div class="col" v-if="dados.nome" v-text="dados.nome"></div>
        <div class="col" v-if="dados.placa" v-text="dados.placa"></div>
        <div class="col" v-if="dados.telefone" v-text="dados.telefone"></div>
        <div class="col" v-if="dados.kit" v-text="dados.kit"></div>
        <div class="col-2" v-if="dados.escala" v-text="dados.escala"></div>
        <div class="col-2" v-if="dados.turno" v-text="dados.turno"></div>
        <div class="col-1">
            <i class="bi-check2-square" style="cursor: pointer" @click="adicionarItemEquipe"></i>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
    name: 'Item',
    props: {
        dados: Object,
        tipo: String
    },
    methods: {
        // ...mapMutations(['setItemEquipe']),
        ...mapMutations({
            setItemEquipe:'setItemEquipe'
        }),


        // Método que verifica qual o tipo e o nome do item clicado
        adicionarItemEquipe(){
            let item = {
                tipo: this.tipo,
                dados: this.dados
            }

            this.setItemEquipe(item)

            // Ao acionar o método 'setItemEquipe' através do commit também é passado o objeto 'item' por parametro (payload)
            // this.$store.commit({
            //     type: 'setItemEquipe',
            //     item
            // })
        }
    }
}
</script>