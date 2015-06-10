'use strict';
/* App module */

var workApp = angular.module('workApp',[
    'workControllers',
    'workDirectives',
    'ngFileUpload'
]);

workApp.config(['$locationProvider',
    function($locationProvider){
		$locationProvider.html5Mode(true);
    }
]);

var workControllers = angular.module('workControllers', []);

workControllers.controller('mainCtrl',['$scope', '$http', 'Upload',
    function($scope, $http, Upload){
      $scope.filelen = 0;
      $scope.$watch('files', function (data) {
        // $scope.upload($scope.files);
        $scope.drop_box_error = '';
      });
      $scope.upload = function (files) {
          if (files && files.length) {
              for (var i = 0; i < files.length; i++) {
                  var file = files[i];
                  Upload.upload({
                      url: 'backend/upload.php',
                      method: 'POST',
                      //fields: {'username': $scope.username},
                      file: file,
                      sendFieldsAs: 'form',
                      fields: {
                        tags: [ 'dark', 'moon' ]
                      }
                  }).progress(function (evt) {
                      var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                      console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                  }).success(function (data, status, headers, config) {
                      console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
                  });
              }
          }
      };

      /////////////////////////////////////////////////
      $scope.progressShow = false;
      $scope.btnrunShow = true;
    	// $scope.isDisabled = true;
    	// $scope.out1 = 0;
      $scope.in_inn = '';
      $scope.in_kpp = '';
      $scope.in_bik = '';
      $scope.in_kor = '';
      $scope.in_rh = '';

      $scope.in_inn_check = '';
      $scope.in_kpp_check = '';
      $scope.in_bik_check = '';
      $scope.in_kor_check = '';
      $scope.in_rh_check = '';

    	$scope.runexec = function(){
        var check = true;
        $scope.out1 = '';

        if($scope.in_inn == '' || $scope.in_inn.length < 10 || $scope.in_inn.length > 12){$scope.in_inn_check = 'has-error'; check = false;}else{$scope.in_inn_check = 'has-success';}
        if($scope.in_kpp == '' || $scope.in_kpp.length != 9){$scope.in_kpp_check = 'has-error'; check = false;}else{$scope.in_kpp_check = 'has-success';}
        if($scope.in_bik == '' || $scope.in_bik.length != 9){$scope.in_bik_check = 'has-error'; check = false;}else{$scope.in_bik_check = 'has-success';}
        if($scope.in_kor == '' || $scope.in_kor.length != 20){$scope.in_kor_check = 'has-error'; check = false;}else{$scope.in_kor_check = 'has-success';}
        if($scope.in_rh == '' || $scope.in_rh.length != 20){$scope.in_rh_check = 'has-error'; check = false;}else{$scope.in_rh_check = 'has-success';}
        try{
          if($scope.files.length == 1){$scope.drop_box_error = '';}else{$scope.drop_box_error = 'выберете файл!'; check = false;}
        }catch(e){
          $scope.drop_box_error = 'выберете файл!'; check = false;
        }

        if(check == true){
          $scope.progressShow = true;
          $scope.btnrunShow = false;

          $scope.upload($scope.files);

      		$http.post('/backend/server.php', {q:'query', p1:$scope.in_inn, p2:$scope.in_kpp, p3:$scope.in_bik, p4:$scope.in_kor, p5:$scope.in_rh}).
  			  success(function(data, status, headers, config) {
  			  	console.log(data);
  			  	$scope.out1 = data;
            $scope.progressShow = false;
            $scope.btnrunShow = true;
  			    // this callback will be called asynchronously
  			    // when the response is available
  			  }).
  			  error(function(data, status, headers, config) {
  			    // called asynchronously if an error occurs
  			    // or server returns response with an error status.
    			});
        }else{
          $scope.out1 = 'ошибка при заполнении полей';
        }
    	}// end runexec()

    }//end function
]);


var workDirectives = angular.module('workDirectives', []);

workDirectives.directive('validNumber', function() {
  return {
    require: '?ngModel',
    link: function(scope, element, attrs, ngModelCtrl) {
      if(!ngModelCtrl) {
        return; 
      }

      ngModelCtrl.$parsers.push(function(val) {
      	// console.log(val);
        if (angular.isUndefined(val)) {
            var val = '';
        }
        var clean = val.replace( /[^0-9]+/g, '');
        // if(clean > 100){
        // 	// console.log('bigger');
        // 	clean = '100';
        // 	ngModelCtrl.$setViewValue(clean);
        //   	ngModelCtrl.$render();
        // }else

        if (val !== clean) {
          ngModelCtrl.$setViewValue(clean);
          ngModelCtrl.$render();
        }
        return clean;
      });

      element.bind('keypress', function(event) {
        if(event.keyCode === 32) {
          event.preventDefault();
        }
      });
    }
  };
});