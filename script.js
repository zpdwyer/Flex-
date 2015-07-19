function load_sound(playlist_url) { 
    var playlist_url = "https://soundcloud.com/zdwywr/sets/edm" 
    SC.initialize({ 
                         client_id: 'e37f3c1f5f6ba94620a84468518dc09d' 
                   }); 
      
      
     SC.get('/resolve', { url: playlist_url }, function(set) { 
            $(set.tracks).each(function(i, track) 
             { 
							   var count = 0; 
                               var track_IDs = []; 
							   var Song_Choices = [];
                               track_IDs.push(track.id); 
                               var is_playing = false; 
							   var nextSongs = [];
							   
                               while(is_playing!=true) 
                               { 	
									nextSongs.push(track_IDs.getValue(Song_Choices.pop())); 
									nextSongs.push(track_IDs.getValue(Song_Choices.pop()));
									nextSongs.push(track_IDs.getValue(Song_Choices.pop()));
									load_Songs(nextSongs);
									
									SC.stream('/tracks/' + track_ID, {volume:50, onfinish:is_playing=false}, function(sound) 
                                           { 
                                                 is_playing = true; 
                                                 sound.play(); 
												 var userRef = new Firebase("https://<your-firebase-app>.firebaseio.com/users");
											     var authData = ref.getAuth();
												 var votingRef = new Firebase("https://<your-firebase-app>.firebaseio.com/songChoices");
												 if(authData){
														var userID = authData.uniqueID;
														var votesLeftRef = userRef.child(userID + '/votesLeft');
														var votesLeft = votesLeftRef.val();
														if(votesLeft!=0) {
																if(document.getElementById("Choice1").onclick(function())){
																		var choiceOneRef = votingRef.child('/Choice_1');
																		var maxRefOne = choiceOneRef.push(1);
																}
																if(document.getElementById("Choice2").onclick(function())){
																		var choiceTwoRef = votingRef.child('/Choice_2');
																		var maxRefTwo = choiceOneRef.push(1);
																}
																if(document.getElementById("Random").onclick(function())){
																		var choiceRandom = votingRef.child('/Random');
																		var maxRefRandom = choiceOneRef.push(1);
																}
														}
													}
													document.getElementById("start").onclick = function() 
                                           }); 
									var winner = Vote_Count(maxRefOne,maxRefTwo,maxRefRandom); 
									track_ID = track_IDs.getValue(songChoices.getValue(winner)));
									if(is_playing===false)
									{
										while(num < 3)
										{
											var randomNum = Math.random() * (max - min) + min;
											Song_Choices.push(track_IDs.getValue(randomNum));
										}
										load_Songs(Song_Choices); 
									}
                            
							   }
                 }); 
            }); 
 } 
 
 function load_Songs(songChoices){
	 
	 this.songChoices=songChoices; 
	 var choice1 = songChoices[0];
	 var choice2 = songChoices[1];
	 var choice3 = songChoices[2];
	 document.getElementById("Choice1").innerHTML = choice1;
	 document.getElementById("Choice2").innerHTML = choice2;
 }
 
 function Vote_Count(maxRefOne, maxRefTwo, maxRefRandom){
	 this.maxRefOne = maxRefOne;
	 this.maxRefTwo = maxRefTwo;
	 this.maxRefRandom = maxRefRandom;
	 var voteRef = new Firebase("https://<your-firebase-app>.firebaseio.com/songChoices");
	 var currentParent = maxRefOne.parent();
	 var countOne=0;
	 var countTwo=0;
	 var countRandom=0;
	 var winnerValue
	 
	 while(currentParent!=0)
	 {  
		 maxRefOne.remove();
		 countOne++;
		 currentParent = currentParent.parent();
	 }
	  
	 currentParent = maxRefTwo.parent();
	 while(currentParent!=0)
	 {
		 maxRefTwo.remove();
		 countTwo++;
		 currentParent = currentParent.parent();
	 }
	 currentParent = maxRefRandom.parent();
	 while(currentParent!=0)
	 {
		 maxRefRandom.remove();
		 countRandom++;
		 currentParent = currentParent.parent();
	 }
	 if(countOne > countTwo)
	 {
		 winnerValue = 1
		 if(countOne>countRandom)
		 {
			 return winnerValue;
		 }
		 else 
		 {
			 winnerValue = 3;
			 return winnerValue; 
		 }
	 }
	 else
	 {
		 winnerVlaue = 2
		 if(countTwo > countRandom)
		 {
			 return winnerValue; 
		 }
		 else
		 {
			 winnerValue = 3
			 return winnerValue; 
		 }
	 }
	 
 }
 /*function Voting_Period(){
	 
	 var userRef = new Firebase("https://<your-firebase-app>.firebaseio.com/users");
	 var authData = ref.getAuth();
	 var votingRef = new Firebase("https://<your-firebase-app>.firebaseio.com/songChoices");
	 
	 if(authData){
		 var userID = authData.uniqueID;
		 var votesLeftRef = userRef.child(userID + '/votesLeft');
		 var votesLeft = votesLeftRef.val();
		 if(votesLeft!=0) {
			 if(document.getElementById("Choice1").onclick(function())){
				 var choiceOneRef = votingRef.child('/Choice_1');
				 var maxRefOne = choiceOneRef.push(1);
			 }
			 if(document.getElementById("Choice2").onclick(function())){
				 var choiceTwoRef = votingRef.child('/Choice_2');
				 var maxRefTwo = choiceOneRef.push(1);
			 }
			 if(document.getElementById("Random").onclick(function())){
				 var choiceRandom = votingRef.child('/Random');
				 var maxRefRandom = choiceOneRef.push(1);
			 }
		 }
	 }
 
 }*/
