import Vuex from 'vuex'

export default new Vuex.Store({
    state: {
        baseUrl: 'http://localhost:3000',
        titulo: 'Emergências Médicas',
        equipe: {
            enfermeiro:'',
            socorrista: '',
            medico: '',
            carro: '',
            telefone: '',
            kitDeReanimacao: ''
        },
        equipes: [],
        enfermeiros: [],
        socorristas: [],
        medicos: [],
        equipamentos: {
            carros: [],
            telefones: [],
            kitsDeReanimacao: []
        }
    },
    getters: {
        //Métodos que obtem informações do State 
        //Metodo utilizando função normal
        totalEnfermeiros (state) {
            return state.enfermeiros.length
        },
        //método usando arrow function
        totalMedicos: state => state.medicos.length,
        totalSocorristas: state => state.socorristas.length,
        socorristasPorTurno (state) { //closure
            return turno => !turno ? state.socorristas : state.socorristas.filter(s => s.turno === turno)
        },
        totalSocorristasPorTurno: (state, getters) =>  turno => getters.socorristasPorTurno(turno).length   
    },
    mutations: {
        // Função que recebe um item como parametro
        setItemEquipe: (state, item) => {
            let t = item.tipo
            let d = item.dados
            //faz a verificação de qual 'tipo' e qual 'nome_item' chegou
            if (t == 'enfermeiros') state.equipe.enfermeiro = d.nome
            if (t == 'socorristas') state.equipe.socorrista = d.nome
            if (t == 'medicos') state.equipe.medico = d.nome
            if (t == 'carros') state.equipe.carro = d.placa
            if (t == 'telefones') state.equipe.telefone = d.telefone
            if (t == 'kits-de-reanimacao') state.equipe.kitsDeReanimacao = d.kit
        },
                
        //Função exemplo do payload
        //Por padrão recebe o 'state' e um 'payload' que pode ser qualquer parametro no caso recebe um objeto 'item'
        // setItemEquipe2: (state, payload) => {
        //     console.log(payload)
        //     let item = payload.item
        //     let t = item.tipo
        //     let d = item.dados
        //     //faz a verificação de qual 'tipo' e qual 'item' chegou
        //     if (t == 'enfermeiros') state.equipe.enfermeiro = d.nome
        //     if (t == 'socorristas') state.equipe.socorrista = d.nome
        //     if (t == 'medicos') state.equipe.medico = d.nome
        //     if (t == 'carros') state.equipe.carro = d.placa
        //     if (t == 'telefones') state.equipe.telefone = d.telefone
        //     if (t == 'kits-de-reanimacao') state.equipe.kitsDeReanimacao = d.kit
        // },

        setEnfermeiros: (state, payload) => {
            state.enfermeiros = payload
        },
        setSocorristas: (state, payload) => {
            state.socorristas = payload
        },
        setMedicos: (state, payload) => {
            state.medicos = payload
        }, 
        setCarros: (state, payload) => {
            state.equipamentos.carros = payload
        },
        setTelefones: (state, payload) => {
            state.equipamentos.telefones = payload
        },
        //tanto faz o nome da variavel payload
        setKits: (state, kitsDeReanimacao) => {
            state.equipamentos.kitsDeReanimacao = kitsDeReanimacao
        },
        setNewEquipe(state, payload) {
            //recebe o 'payload' no caso um array de 'equipe' e adiciona ao array de 'equipes' do state
            state.equipes.push(payload)

            //limpa a 'equipe' após a inserção no array de 'equipes'
            state.equipe = {}

            //mostra o array de equipes
            console.log(state.equipes)
        }
    },
    actions: {
        //Método que busca os 'equipamentos' no Json, armazena em 'dados' e os define usando as mutations e seus respectivos objetos
        fetchEquipamentos(context) {
            fetch(`${context.state.baseUrl}/equipamentos`)
            .then(response => response.json())
            .then(dados => {
                context.commit('setCarros', dados.carros)
                context.commit('setTelefones', dados.telefones)
                context.commit('setKits', dados.kitsDeReanimacao)
             })
        },

        fetchProfissionais(context) {
            fetch(`${context.state.baseUrl}/enfermeiros`)
            .then(response => response.json())
            .then(dados => context.commit('setEnfermeiros', dados))

            fetch(`${context.state.baseUrl}/socorristas`)
            .then(response => response.json())
            .then(dados => context.commit('setSocorristas', dados))

            fetch(`${context.state.baseUrl}/medicos`)
            .then(response => response.json())
            .then(dados => context.commit('setMedicos', dados))
        }
    }
})