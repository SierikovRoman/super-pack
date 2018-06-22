// Application module
(function() {
var app = angular.module("app", ['pascalprecht.translate', 'ngSanitize']);

app.config(['$translateProvider', function ($translateProvider) {
	if(JSON.parse(localStorage.getItem('language')) !== null){
		$translateProvider.preferredLanguage(JSON.parse(localStorage.getItem('language')));
	}else{
		$translateProvider.preferredLanguage('en');
	}
	$translateProvider.useSanitizeValueStrategy('escaped');

	$translateProvider.useStaticFilesLoader({
        prefix: './languages/', //относительный путь, например: /languages/
        suffix: '.json' //расширение файлов
	});
}]);


app.controller("MainController",['$scope','$translate', function($scope,$translate){

	$scope.changeLang = function(event){
		event.stopPropagation();
		$translate.use(event.target.text);
	}
}]);

})();