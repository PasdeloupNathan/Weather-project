var app = new Vue({
    el: '#app',
    data: {
        username: "",
        password: ""
    },
    mounted: function mounted() {
        var vm = this;
    },
    methods: {
        log() {
            const vm = this;
            axios.post("http://localhost:5000/login", {
                username: vm.username,
                password: vm.password
            }).then(response => {
                if (response.status === "success") {
                    window.location.href = "weather.php";
                } else {
                    alert(response.data.data)
                }
            });
        }
    }
})