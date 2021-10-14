var app = new Vue({
    el: '#app',
    data: {
        search: ""
    },
    mounted: function mounted() {
        var vm = this;
        vm.search = "Paris";
    },
    methods: {
        boom() {
            alert(this.search);
        },
        search() {
            async function getJSON(path) {
                return await fetch(path).then(r => r.json());
            }

            getJSON('../city.list.min.json').then((value) => {
                const test = value;
                const country = [];
                const search = "Paris";
                console.log(test);
                console.time("test");
                for (let i of test) {
                    if (i.country == "FR") {
                        if (country.indexOf(i.name) === -1) {
                            country.push(i.name);
                        }

                        if (i.name === search) {
                            console.timeEnd("test");
                            break
                        }
                    }
                }
                console.log(country);
            });
        }
    }
})