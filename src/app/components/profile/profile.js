

(function (app) {

    app.component('profiles', {
        templateUrl: '/app/components/profile/profile.html',
        controllerAs: 'vm',
        controller: controller
    });

    controller.$inject = ['$scope', '$state']

    function controller($scope, $state) {

        var vm = this;

        vm.$onInit = onInit;

        function onInit(){
            console.log('Profile init');
        }

        vm.startConversation = function () {
            $scope.$emit('Conversation.Start');
            $state.go('app.conversation.view', { id: 1 });
        }
    }

})(angular.module('conversations'));

