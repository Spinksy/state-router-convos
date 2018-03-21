
    var app = angular.module('conversations', ['ui.router', 'ui.bootstrap']);

    app.config(config).run(run);

    config.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider'];
    run.$inject = ['$rootScope', '$state', '$transitions', '$uiRouter'];

    function config($stateProvider, $locationProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state({
                name: 'app',
                url: '/conversationapp',
                component: 'conversationApp'
            })
            .state('app.conversations', {
                url: '/conversations',
                component: 'conversations'
            })
            .state({
                name: 'app.conversation',
                url: '/conversation/:id',
                component: 'conversation',
                abstract: true
            })
            .state({
                name: 'app.conversation.view',
                url: '/view',
                component: 'conversationView'
            })
            .state({
                name: 'app.conversation.edit',
                url: '/edit',
                component: 'conversationEdit'
            })
            .state({
                name: 'app.error',
                url: '/error',
                component: 'errorPage'
            });
    }

    function run($rootScope, $state, $transitions, $uiRouter) {

        var Visualizer = window['@uirouter/visualizer'].Visualizer;
        var visPlugin = $uiRouter.plugin(Visualizer);

    }


