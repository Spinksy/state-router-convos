

(function (app) {
    
    app.component('conversation', {
        templateUrl: '/app/components/conversation/conversation.html',
        controllerAs: 'vm',
        controller: controller
    });

    controller.$inject = ['$scope', '$stateParams', '$timeout']

    function controller($scope, $stateParams, $timeout) {
        
        var vm = this;
        vm.conversation = { title: 'The Conversation' }

        console.log('Conversation Init')
            vm.id = $stateParams.id;
            console.log(vm.id)

    }

})(angular.module('conversations'));

(function (app) {
    
    app.component('conversationEdit', {
        template: '<input type="text" ng-model="vm.id"></input><a ui-sref="app.conversation.view">Cancel</a>',
        controllerAs: 'vm',
        controller: editController,
        bindings: {
            id: '='
        }
    });

    editController.$inject = []

    function editController() {
        
        var vm = this;
    }

})(angular.module('conversations'));

(function (app) {
    
    app.component('conversationView', {
        template: '<a ui-sref="app.conversation.edit">Edit</a><div>View {{vm.id}}</div>',
        controllerAs: 'vm',
        controller: viewController,
        bindings: {
            id: '<'
        }
    });

    viewController.$inject = ['$scope', '$stateParams', '$timeout']

    function viewController($scope, $stateParams, $timeout) {
        
        var vm = this;

        vm.$onInit = function(){
            console.log(vm.id)
        }

        console.log($stateParams)

    }
})(angular.module('conversations'));