/**
 * Created by marcos on 06/05/15.
 */

var cursoModulo = angular.module('cursoModulo', ['rest']);

cursoModulo.directive('cursoform', function(){
    return {
        restrict: 'E',
        replace: true,
        templateUrl: '/static/course/html/course_form.html',
        scope: {
            course: '=',
            nameLabel: '@',
            durationLabel: '@',
            planLabel: '@',
            saveComplete: '&'
        },
        controller: function($scope, CursoApi) {
            $scope.ajaxFlag = false;
            $scope.clearFields = function() {
                $scope.course.name = '';
                $scope.course.duration = '';
                $scope.course.educationProject = '';
            };


            $scope.salvar = function() {
                $scope.ajaxFlag = true;
                $scope.errors = {};
                CursoApi.salvar($scope.course)
                    .success(function(course){
                        $scope.ajaxFlag = false;
                        $scope.clearFields();
                        if($scope.saveComplete != undefined) {
                            $scope.saveComplete({'curso': course});
                        }
                    })
                    .error(function(errors) {
                        $scope.errors = errors;
                        $scope.ajaxFlag = false;
                    })
            };


            $scope.deletar = function() {
                var r = confirm('Deseja realmente remover este registro?');
                if(r) {
                    $http.post('/acourses/rest/deletar', $scope.course.id())
                        .success()
                }
            };
        }
    };
});



cursoModulo.directive('linhatabela', function(){
    return {
        restrict: 'A',
        replace: true,
        templateUrl: '/static/course/html/course_table_line.html',
        scope: {
            course: '=',
            deleteComplete: '&'
        },
        controller: function($scope, CursoApi) {
            $scope.deletandoFlag = false;
            $scope.edicaoFlag = false;
            $scope.cursoEdicao = {};

            $scope.editar = function() {
                $scope.edicaoFlag = true;
                $scope.cursoEdicao.id = $scope.course.id;
                $scope.cursoEdicao.name = $scope.course.name;
                $scope.cursoEdicao.duration = $scope.course.duration;
                $scope.cursoEdicao.educationProject = $scope.course.educationProject;
            };

            $scope.deletar = function() {
                var r = confirm("Deseja realmente deletar este registro?");

                if(r) {
                    $scope.deletandoFlag = true;
                    CursoApi.deletar($scope.course.id)
                        .success(function(){
                            $scope.deleteComplete({'curso':$scope.course});
                            $scope.deletandoFlag = false;
                        });
                }
            };

            $scope.cancelarEdicao = function() {
                $scope.edicaoFlag = false;
            };

            $scope.completarEdicao = function() {
                CursoApi.editar($scope.cursoEdicao)
                    .success(function(course){
                        $scope.course = course;
                        $scope.edicaoFlag = false;
                    });
            }
        }
    };
});







