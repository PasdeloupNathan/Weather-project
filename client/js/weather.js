var app = new Vue({
    el: '#app',
    data: {
        favorites: ["Paris", "Bordeaux", "Lille"],
        searchStr: "",
        last: "",
        weather: {
            temp: 0,
            description: "",
            country: "",
            city: "",
            humidity: "",
            sunset: "",
            windspeed: "",
            logo: ""
        },
        day: "",
        date: ""
    },
    mounted: function mounted() {
        const dayMap = new Map([
            [1, "lundi"],
            [2, "mardi"],
            [3, "mercredi"],
            [4, "jeudi"],
            [5, "vendredi"],
            [6, "samedis"],
            [7, "dimanche"]
        ]);
        const monthMap = new Map([
            [0, "janvier"],
            [1, "fevrier"],
            [2, "mars"],
            [3, "avril"],
            [4, "mai"],
            [5, "juin"],
            [6, "juillet"],
            [7, "aout"],
            [8, "septembre"],
            [9, "octobre"],
            [10, "novembre"],
            [11, "décembre"],
        ]);
        var vm = this;
        vm.searchStr = "Paris";
        this.search();
        vm.searchStr = "";
        const today = new Date();
        vm.day = dayMap.get(today.getDay());
        vm.date = `${today.getUTCDate() + 1} ${monthMap.get(today.getUTCMonth())} ${today.getFullYear()}`
    },
    methods: {
        search() {
            var vm = this;
            if (vm.searchStr == "") {
                alert('selectionnez une ville !');
            } else {
                if (vm.favorites.indexOf(vm.searchStr) == -1) {
                    alert("merci de selectionner uniquement un de vos favoris");
                } else {
                    if (vm.last !== vm.searchStr) {
                        vm.last = vm.searchStr;
                        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${vm.searchStr}&units=metric&appid=4ba144aa4c9a4960b0d479e1dfd914a1&lang=fr`).then(
                            res => {
                                console.log(res.data);
                                vm.weather.temp = parseInt(res.data.main.temp);
                                vm.weather.description = res.data.weather[0].description;
                                vm.weather.country = res.data.sys.country;
                                vm.weather.city = res.data.name;
                                vm.weather.humidity = res.data.main.humidity;
                                vm.weather.sunset = res.data.sys.sunset;
                                vm.weather.windspeed = res.data.wind.speed * 10;
                                vm.weather.logo = `https://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`
                                console.log(res.data.weather[0].icon);
                            }).catch((error) => {
                            console.error(error)
                        })
                    }
                }
            }
        }
    }
})