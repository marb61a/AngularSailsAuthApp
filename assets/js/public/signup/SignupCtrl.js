angular.module('SignupMod')
    .controller('SignupCtrl', ['$scope', '$http', function($scope, $http){
        
    $scope.runSignup = function(){
            console.log('Signup Controller initialized...');
            
            $http.post('/signup', {
    			name: $scope.name,
    			email: $scope.email,
    			password: $scope.password
    		})
    		.then(function onSuccess(response){
    			window.location = '/user';
    		})
    		.catch(function onError(err){
    			console.log('Error: ',err);
    		});
        };
    }]);