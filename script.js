window.onload = function load_sound() {
    var playlist_url = "https://soundcloud.com/zdwywr/sets/edm";
    var choiceOneRef;
    var choiceTwoRef;
    var choiceRandom;
    
    SC.initialize({
                  client_id: 'e37f3c1f5f6ba94620a84468518dc09d'
                  });
    
    
    SC.get('/resolve', { url: playlist_url }, function(set) {
           var track_IDs = [];
           var voteCountArray=[];
           var firstPlay=true;
           var num;
           var max;
           var count=0;
           var winner;
           var x=0;
           $(set.tracks).each(function(i, track) {
                              track_IDs.push(track.id);
                              });
           var track_ID;
           track_ID = track_IDs.pop();
           var Song_Choices = [];
           var is_playing = false;
           var nextSongs = [];
           
           if(firstPlay!==false)
           {
           
           while(count < 3)
           {
                                            max = track_IDs.length;
											num = Math.floor(Math.random() * (max - 0) + 0);
											Song_Choices.push(track_IDs[num]);
                                            count++;
           }
           load_Songs(Song_Choices);
           firstPlay=false;
           count=0;
           }
           while(count<=track_IDs.length)
           {
           nextSongs.push(track_IDs[Song_Choices.pop()]);
           nextSongs.push(track_IDs[Song_Choices.pop()]);
           nextSongs.push(track_IDs[Song_Choices.pop()]);
           load_Songs(nextSongs);
           
           SC.stream('/tracks/' + track_ID, {volume:50, onfinish:is_playing=false}, playSong(sound));
           
           var userID = authData.uniqueID;
           var votesLeftRef = userRef.child(userID + '/votesLeft');
           votesLeftRef.set(1);
           
           winner = voteCount();
           
           track_ID = track_IDs[songChoices[winner]];
           
           if(is_playing===false)
           {
           while(num < 3)
           {
                                            max = track_IDs.length;
											num = Math.random() * (max - 0) + 0;
											Song_Choices.push(track_IDs.getValue(num));
           }
           load_Songs(Song_Choices);
           }
           
           }
           
           }
           
           );
};
function load_Songs(songChoices){
    SC.initialize({
                  client_id: 'e37f3c1f5f6ba94620a84468518dc09d'
                  });
    this.songChoices=songChoices;
    var choice1 = songChoices[0];
    var choice2 = songChoices[1];
    var choice3 = songChoices[2];
    var i=0;
    var songTitles=[];
    while(i<songChoices.length)
    {
        SC.get('/tracks/' + choice1, songTitles.push(track.title));
    }
    document.getElementById("Choice1").innerHTML = songTitles[0];
    document.getElementById("Choice2").innerHTML = songTitles[1];
}


function playSong(sound)
{
    is_playing = true;
    sound.play();
    var userRef = new Firebase("https://<your-firebase-app>.firebaseio.com/users");
    var authData = ref.getAuth();
    var votingRef = new Firebase("https://<your-firebase-app>.firebaseio.com/songChoices");
    choiceOneRef = votingRef.child('/Choice_1');
    choiceOneRef.set(0);
    choiceTwoRef = votingRef.child('/Choice_2');
    choiceTwoRef.set(0);
    choiceRandom = votingRef.child('/Random');
    choiceRandom.set(0);
    if(authData)
    {
        var userID = authData.uniqueID;
        var votesLeftRef = userRef.child(userID + '/votesLeft');
        var votesLeft = votesLeftRef.val();
        if(votesLeft!==0)
        {
            document.getElementById("Choice1").onclick = function()
            {
                choiceOneRef.transaction(function (current_value)
                                       {
                                       return (current_value || 0) + 1;
                                       });
                votesLeft.set(0);
                
            };
            document.getElementById("Choice2").onclick = function()
            {
                choiceTwoRef.transaction(function (current_value)
                                       {
                                       return (current_value || 0) + 1;
                                       });
                votesLeft.set(0);
            };
            document.getElementById("Random").onclick = function()
            {
                choiceRandom.transaction(function (current_value)
                                       {
                                       return (current_value || 0) + 1;
                                       });
                votesLeft.set(0);
            };
        }
    }
    
}

function voteCount(){
    var votingRef = new Firebase("https://<your-firebase-app>.firebaseio.com/songChoices");
    var count=0;
    choiceOneRef = votingRef.child('/Choice_1');
    choiceTwoRef = votingRef.child('/Choice_2');
    choiceRandom = votingRef.child('/Random');
    voteCountArray.push(choiceOneRef.val());
    voteCountArray.push(choiceTwoRef.val());
    voteCountArray.push(choiceRandom.val());
    var max = Math.max.apply(Math, voteCountArray);
    var winner=0;
    while(count<voteCountArray.length)
    {
        if(max === voteCountArray[count])
        {
            winner = count;
        }
        count++;

    }
    return winner;
    

}
/*function Vote_Count(maxRefOne, maxRefTwo, maxRefRandom){
 this.maxRefOne = maxRefOne;
 this.maxRefTwo = maxRefTwo;
 this.maxRefRandom = maxRefRandom;
 var voteRef = new Firebase("https://<your-firebase-app>.firebaseio.com/songChoices");
 var currentParent = maxRefOne.parent();
 var countOne=0;
 var countTwo=0;
 var countRandom=0;
 var winnerValue;
 
 while(currentParent!==0)
 {
 maxRefOne.remove();
 countOne++;
 currentParent = currentParent.parent();
 }
 
 currentParent = maxRefTwo.parent();
 while(currentParent!==0)
 {
 maxRefTwo.remove();
 countTwo++;
 currentParent = currentParent.parent();
 }
 currentParent = maxRefRandom.parent();
 while(currentParent!==0)
 {
 maxRefRandom.remove();
 countRandom++;
 currentParent = currentParent.parent();
 }
 if(countOne > countTwo)
 {
 winnerValue = 1;
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
 winnerVlaue = 2;
 if(countTwo > countRandom)
 {
 return winnerValue;
 }
 else
 {
 winnerValue = 3;
 return winnerValue;
 }
 }
 
 }*/
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
