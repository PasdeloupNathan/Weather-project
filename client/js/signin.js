var app = new Vue({
    el: '#app',
    data: {
        username: "",
        password: "",
        email: "",
        confirm: ""
    },
    mounted: function mounted() {
        var vm = this;
    },
    methods: {
        sign() {
            const vm = this;
            if (vm.confirm === vm.password) {
                axios.post("http://localhost:5000/create-user", {
                    username: vm.username,
                    password: vm.password,
                    email: vm.email,
                }).then(response => {
                    console.log(response.success)
                    if (response.success == "success") {
                        alert("iquwdiuwq")
                    } else {
                        alert(response.data.data)
                    }
                });
            } else {
                alert("les deux mots de passes ne correspondent pas");
            }
        }
    }
})