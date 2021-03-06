var app = new Vue({
    el: '#app',
    data: {
        countries: "",
        fake: [],
        search: ""
    },
    mounted: function mounted() {
        var vm = this;
        //fonction chercher les données dans le fichier json asynchrone
        async function getJSON(path) {
            return await fetch(path).then(r => r.json());
        }

        getJSON('../city.list.min.json').then((value) => {
            //quand on as les données on les traites
            const test = value;
            const countries = [];
            for (let i of test) {
                //filtre en françe par défaut
                if (i.country == "FR") {
                    //filtrer les villes en doubles
                    if (countries.indexOf(i.name) === -1) {
                        countries.push(i.name);
                    }
                }
            }
            vm.countries = countries;
        });
    },
    methods: {
        add() {
            const vm = this;
            //envois du nouveau favoris au backend
            //à recuperer : id user , id ville
            vm.fake.push(vm.search);
        }
    }
})