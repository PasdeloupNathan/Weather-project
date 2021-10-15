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
            if (vm.username == "" || vm.password == "" || vm.email == "" || vm.confirm == "") {
                alert("merci de tour remplir !")
            } else {
                if (vm.email.split("@").length < 2) {
                    alert("merci de saisir une adresse mail correcte");
                } else {
                    if (vm.confirm === vm.password) {
                        axios.post("http://localhost:5000/create-user", {
                            username: vm.username,
                            password: vm.password,
                            email: vm.email,
                        }).then(response => {
                            if (response.data.status == "success") {
                                window.location = 'weather.html';
                            } else {
                                alert(response.data.data)
                            }
                        });
                    } else {
                        alert("les deux mots de passes ne correspondent pas");
                    }
                }
            }
        }
    }
})