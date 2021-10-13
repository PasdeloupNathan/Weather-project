var app = new Vue({
    el: '#app',
    data: {
        test: "test ! "
    },
    mounted: function mounted() {
        var vm = this;
        vm.test = "all right";
        axios.get("http://localhost:5000/").then(
            res => {
                console.log(res.data);
            })
    },
    methods: {
        boom() {
            alert(this.test);
        }
    }
})