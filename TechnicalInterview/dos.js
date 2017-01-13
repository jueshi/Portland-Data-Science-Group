technical.controller( 'dosCtrl', function( $scope, $http ) {
	$scope.subject 	= "DOS";
	
	$scope.questions = [{ question: "placeholder 1",
						  answer: "",
						  rank: 1,
						  id: 1
						},
						{ question: "placeholder 2",
						  answer: "",
						  rank: 2,
						  id: 2
						},
						{ question: "placeholder 3",
						  answer: "",
						  rank: 3,
						  id: 3
						}
					  ];
	$scope.random 	= pick3( $scope.questions );
	$scope.show 	= false;
	$scope.answers 	= false;
	$http({
        method : "GET",
        url : "load.php",
		params: { category: 'C++'}
    }).then(function mySucces(response) {
        $scope.questions = response.data;
		$scope.random 	 = pick3( $scope.questions );
    }, function myError(response) {
    });
    
	$scope.better = function( id ) {
		showBetter( $scope.subject, id );
	}
	$scope.rank = function( id ) {
		showRank( $scope.subject, id );
	}
	$scope.suggest = function() {
		showSuggest( $scope.subject );
	}
})
.directive( "questionsDos", function() {
	return {
		restrict: 'A',
		template: "<a name='dos'/>" +
				  "<h1 class='w3-container w3-teal' ng-click='show=!show' onclick='location.href=\"#dos\"'>&#9205; {{subject}}</h1>" +
				  "<hr/>" +
				  "<div style='font-size: 20px;' ng-show='show'>" +
				  "<button class='w3-btn w3-teal w3-round w3-tiny' ng-click='answers=!answers'>Show Answers</button>" +
				  "<ul>" +
				  "	<li ng-repeat='question in random'><span class='w3-tooltip rank' name='dos' id='{{question.id}}'>Rank {{question.rank}} <span class='w3-text w3-tag w3-khaki w3-round w3-small' ng-click='rank(question.id);'>Click to Suggest Another Ranking</span></span> {{question.question}}<br/><br/>" +
				  "	<span ng-show='answers'><span class='answer'>{{question.answer}}</span> <button class='w3-btn w3-khaki w3-round w3-small' ng-click='better(question.id);'>Suggest A Better Answer</button><br/></span>Correct <input class='dos-correct' type='checkbox'/><br/><br/></li>" +
				  "</ul>" +
				  "<button class='w3-btn w3-green score' name='dos'>Score</button>" +
				  "&nbsp;<button class='w3-btn w3-khaki w3-round w3-small' ng-click='suggest();'>Suggest a Question</button>" +
				  "</div>"
	}
});