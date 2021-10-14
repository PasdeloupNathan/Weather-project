var app = new Vue({
    el: '#app',
    data: {
        countries: "",
        fake: [],
        search: ""
    },
    mounted: function mounted() {
        var vm = this;
        async function getJSON(path) {
            return await fetch(path).then(r => r.json());
        }

        getJSON('../city.list.min.json').then((value) => {
            const test = value;
            const countries = [];
            for (let i of test) {
                if (i.country == "FR") {
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
            axios.post("http://localhost:5000/favoris").then(
                res => {
                    const response = res.data;
                    if (response.status === "success") {
                        vm.fake.push(vm.search);
                    } else {
                        alert("attention , cette ville n'existe pas en france");
                    }
                })
        }
    }
})