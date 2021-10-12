var app = new Vue({
    el: '#app',
    data: {
        test: "test ! "
    },
    mounted: function mounted() {
        var vm = this;
        vm.test = "all right"
    }
})