$(document).ready(function () {

    // Initial Display Parameters
    thisHeight = $(document).height() * .9;
    thisWidth  = thisHeight * 4 / 3;
    
    DispWidth  = thisHeight * 5 / 6;
    DispHeight = DispWidth / 2;
    
    ConfWidth  = thisHeight * 4 / 6;
    ConfHeight = ConfWidth / 2;


    $('#Main').css('min-height', thisHeight);
    $('#Main').css('width', thisWidth);
    
    
    var S2 = [];
    var S4 = [];
    var A1 = [];
    var Trial            = new Array;
    var Transition       = new Array;
    var Rew4_magnitude   = new Array;
    var Rew5_magnitude   = new Array;
    var Rew4_probability = new Array;
    var Rew5_probability = new Array;
    var level            = new Array;
    var L2_state         = new Array;
    var L3_state         = new Array;
    
    var perc_rew         = [];
    var num_reward       = 0 ;
    var Subject_ID       = 0;
    var Action           = new Array;
    var RT1              = new Array;
    var RT2              = new Array;
    var RT3              = new Array;
    var ques_ans         = new Array;
    var missed1          = new Array;
    var missed2          = new Array;
    var missed3          = new Array;
    
    var NumTrials        = 0;


    // Creating the htmls for the objects that are always the same, those changing are set in Step_getdata
    var Earth_html          = '<img id = "id_Plan_Earth" src="images/Planet_Earth.png"        width = "' + thisHeight * 0.2 + '"  class="img-responsive center-block" >';
    var Portal_html         = '<img id = "id_portal"  src="images/Portal.gif "                width = "' + thisHeight * 0.3 + '"  class="img-responsive center-block" >'; // non rotating portal 
    var portal_rotate_html  = '<img id = "id_portal"  src="images/Portal_rotating.gif "       width = "' + thisHeight * 0.3 + '"  class="img-responsive center-block" >';
    var Sad_Face_html       = '<img id = "id_Sad_Face" src="images/Sad.png"                   width = "' + thisHeight * 0.4 + '"  class="img-responsive center-block" >';



////////////////////////////////////////////////////////////////////////////////
//            Define question and answers at the beginning
var questions = [
         // Q1
    {
        text: "Which one represents the sequence of a full journey?",
        answers: [
            { id: "answer1", text: "Earth – Spaceship – Space station – Alien planet " },
            { id: "answer2", text: "Earth – Space station – Alien planet – Spaceship" },
            { id: "answer3", text: "Earth – Alien planet  – Space station – Spaceshi" }
        ]
    },   // Q2
    {
        text: "When do you need to press space?",
        answers: [
            { id: "answer1", text: "Collecting money at the alien planet." },
            { id: "answer2", text: "Entering the portal." },
            { id: "answer3", text: "Both of the above." }
        ]
    },  // Q3
        {
        text: "Which one is correct?",
        answers: [
            { id: "answer1", text: "Helium-brown planet always has more money." },
            { id: "answer2", text: "Helium-purple planet always has more money." },
            { id: "answer3", text: "The amount of money in both planets changes periodically." }
        ]
    },  // Q4
        {
        text: "Which one is correct?",
        answers: [
            { id: "answer1", text: "Each day, the journey starts from the earth." },
            { id: "answer2", text: "The starting point could be earth, space stations, or helium planets." },
            { id: "answer3", text: "The starting point is either earth or helium planets." }
        ]
    },  // Q5
        {
        text: "Consider one spaceship. Which one is correct?",
        answers: [
            { id: "answer1", text: "It always goes to the same space station." },
            { id: "answer2", text: "Its space station destination is random." },
            { id: "answer3", text: "Its space station destination will change periodically." }
        ]
    },  // Q6
        {
        text: "Consider a trip from space station 1, via portal. Which one is correct?",
        answers: [
            { id: "answer1", text: "We always end up on the purple planet." },
            { id: "answer2", text: "We always end up on the brown planet." },
            { id: "answer3", text: "The destination changes once in a while." }
        ]
    },  // Q7
        {
        text: "Which one is correct about response keys?",
        answers: [
            { id: "answer1", text: "Pressing F always chooses the spaceship on the left of the screen." },
            { id: "answer2", text: "Pressing F always chooses the blue spaceship." },
            { id: "answer3", text: "Pressing J always chooses the blue spaceship." }
        ]
    }, // Q8
         {
        text: "Which one is correct regarding the amount of money on the planets?",
        answers: [
            { id: "answer1", text: "One planet always has more money than the other." },
            { id: "answer2", text: "Planets sometimes have equal amount of money." },
            { id: "answer3", text: "The purple planet always has more money." }
        ]
    }
];

// true responses
const trueResponses = ['answer3', 'answer3', 'answer3', 'answer3', 'answer3', 'answer3', 'answer3', 'answer3'];

var currentQuestionIndex = 0;
       // if warm_up 
var if_warmup = 1; 
   
////////////////////////////////////////////////////////////////////////////////

    // CHOOSE TO IGNORE THE INTRODUCTION FUNCTIONS !

    setTimeout(function () {
        
        Step_TakeID();
        //	Step_1(TrialNum); // SKIP information sheet go to 
        //        Information();//Start with information sheet
    
    },10);
    
////////////////////////////////////////////////////////////////////////////
    var rew_duration    = 1200; // how many MILLISECONDS to show the reward for 
    var wait            = 1000; // how many MILLISECONDS to wait befor saying you are too late 
    var wait_intro      = 350;  // how many MILLISECONDS show each digit (1 , 2 , 3 !) shows on the screen 
    var wait_missedit   = 1000; // how many MILLISECONDS to wait in missed it page 
    var wait_break      = 30;   // how many SECONDS to wait for the break
    var trial_break   	= 95  ; // every how many trials to have a break
    
/////////////////////////////////////////// start of the experiment 
    function Step_TakeID() {
        console.log("Step_TakeID");
        $('#Stage').empty();
        $('#Top').css('height', thisHeight / 20);
        $('#Stage').css('width', DispWidth * 1.4);
        $('#Stage').css('min-height', thisHeight * 17 / 20);
        $('#Bottom').css('min-height', thisHeight / 20);
        
        
        var Title = '<div id = "Title"><H2 align = "center"> Please enter the participant number and press space </H2></div>';
        
        CreateDiv('Stage', 'TextBoxDiv');
        $('#TextBoxDiv').html(Title);
        
        ID_input_html = ' Participant number: <input type="text" name="fname" value="000">';
        
        // show the portal 
        CreateDiv('Stage', 'sub_stage_top');
        $('#sub_stage_top').addClass('row');
        $('#sub_stage_top').css('height', DispWidth * 0.4);  
        // dsiplay reward !  
        CreateDiv('sub_stage_top', 'id_sad');
        $('#id_sad').addClass('col-xs-12');
        $('#id_sad').html(ID_input_html);
        $('#id_sad').css('margin', 'auto');
        $('#id_sad').show();
        
        // Key press
        $( "body" ).keydown(function(e) {
            var k = e.keyCode; // get the key code of what was pressed 
            if (k ===32){
                $("body").off("keydown");
                Step_setup($("input:text").val());
            };
        });
    }
    
    
    function Step_setup(ID) {
        console.log("Step_getdata");
        
      if (if_warmup==1) {
            Instruct = true 
          ////////////////////////////////////////////////////////////////////////////   
            NumTrials = 10; // cant be more then 365
          ////////////////////////////////////////////////////////////////////////////
        }
        else {
          Instruct = false
            ////////////////////////////////////////////////////////////////////////////
            NumTrials = 10; // cant be more then 365
            ////////////////////////////////////////////////////////////////////////////
            if_warmup=0
        }
        
        if (ID>10) {
            alert('Please enter correct Subject number');
            Step_TakeID();
        }
        
        
        // make the subject id in to 0001 format 
        ID = parseInt(ID);
        var str = "" + ID;
        var pad = "0000";
        var ID = pad.substring(0, pad.length - str.length) + str;
        console.log("Participant number :" + ID);
        Subject_ID = ID; 

        var str1 = "Subj";
        var str2 = "_info_stim.json";
        
        var json_filename = str1.concat(ID);
        var json_filename = json_filename.concat(str2);
        
        //        console.log("Participant file name :" + json_filename);

        //        var json_filename = 'Subj0001_info_stim.json';
    
        // internet says this should resolve an error i have.. it works 
        $.ajaxSetup({beforeSend: function(xhr){
                if (xhr.overrideMimeType)
                {
                    xhr.overrideMimeType("application/json");
                }
            }
        });
    
        // get json files    
        $.getJSON(json_filename, function(json) {
            //            console.log('success');
            //            console.log('json.S2 : ' + json.S2);
            //            console.log('json.S4 : ' + json.S4);
            //            console.log('json.A1 : ' + json.A1);
            S2  = json.S2;
            S4  = json.S4;
            A1  = json.A1;
            for (var TrialNums = 0; TrialNums < NumTrials; TrialNums++) {
                Trial[TrialNums]            = json.Trial[TrialNums];
                Transition[TrialNums]       = json.Transition[TrialNums];
                Rew4_magnitude[TrialNums]   = json.Rew4_magnitude[TrialNums];
                Rew5_magnitude[TrialNums]   = json.Rew5_magnitude[TrialNums];
                Rew4_probability[TrialNums] = json.Rew4_probability[TrialNums];
                Rew5_probability[TrialNums] = json.Rew5_probability[TrialNums];
                level[TrialNums]            = json.level[TrialNums];
                L2_state[TrialNums]         = json.L2_state[TrialNums];
                L3_state[TrialNums]         = json.L3_state[TrialNums];
            };
            
            arrange() ;
     
        });
    
    
        // this function is so that non of data import is missed as javascript carries on without waiting for the getJSON
  function arrange() {
                  console.log(if_warmup);
    console.log(NumTrials);
           slides_set = 1;
            // Get space station images (previously intergalactic plantes)
            if (if_warmup===0) {
              if (S2 === 0)    {
                  S2_Img = 'SpaceStation_1.png';      S2_name = 'Space Station 1';
                  S3_Img = 'SpaceStation_2.png';      S3_name = 'Space Station 2';
              }    else if (S2 === 1)  {
                  S3_Img = 'SpaceStation_1.png';      S3_name = 'Space Station 2';
                  S2_Img = 'SpaceStation_2.png';      S2_name = 'Space Station 1';
              }
            } else if (if_warmup===1){
                    if (S2 === 0)    {
                  S2_Img = 'SpaceStation_3.png';      S2_name = 'Space Station 3';
                  S3_Img = 'SpaceStation_4.png';      S3_name = 'Space Station 4';
              }    else if (S2 === 1)  {
                  S3_Img = 'SpaceStation_3.png';      S3_name = 'Space Station 3';
                  S2_Img = 'SpaceStation_4.png';      S2_name = 'Space Station 4';
              }
                
            };
    
            // Get EXtragalactic planet images
            if (if_warmup===0) {
              if (S4 === 0)    {
                  S4_Img = 'Planet_Blue.png';     S4_name = 'Helium Blue';
                  S5_Img = 'Planet_Green.png';    S5_name = 'Helium Green';
              }    else if (S4 === 1)   {
                  S5_Img = 'Planet_Blue.png';     S5_name = 'Helium Blue';
                  S4_Img = 'Planet_Green.png';    S4_name = 'Helium Green';
              }
            } else if (if_warmup===1){
              if (S4 === 0)    {
                  S4_Img = 'Planet_Brown.png';     S4_name = 'Helium Brown';
                  S5_Img = 'Planet_Purple.png';    S5_name = 'Helium Purple';
              }    else if (S4 === 1)   {
                  S5_Img = 'Planet_Brown.png';     S5_name = 'Helium Brown';
                  S4_Img = 'Planet_Purple.png';    S4_name = 'Helium Purple';
              } 
            };
        
            // Get spaceship images 
            if (if_warmup===0) {
              if (A1 === 0)   {
                  A1_Img = 'SpaceShip_B.png';    A1_name = 'Black SpaceShipt';
                  A2_Img = 'SpaceShip_R.png';    A2_name = 'Red SpaceShipt';
              }    else if (A1 === 1) {
                  A2_Img = 'SpaceShip_R.png';    A2_name = 'Red SpaceShipt';
                  A1_Img = 'SpaceShip_B.png';    A1_name = 'Black SpaceShipt';
              }
            } else if (if_warmup===1){
              if (A1 === 0)   {
                  A1_Img = 'SpaceShip_L.png';    A1_name = 'Blue SpaceShipt';
                  A2_Img = 'SpaceShip_G.png';    A2_name = 'Green SpaceShipt';
              }    else if (A1 === 1) {
                  A2_Img = 'SpaceShip_L.png';    A2_name = 'Blue SpaceShipt';
                  A1_Img = 'SpaceShip_G.png';    A1_name = 'Green SpaceShipt';
              }
            };
        
            console.log('S2 : ' + S2_name + ', S3 : ' + S3_name);
            console.log('S4 : ' + S4_name + ', S5 : ' + S5_name);
            console.log('A1 : ' + A1_name + ', A2 : ' + A2_name);

            S2_html     = '<img id = "id_In_plan_1" src="images/'  + S2_Img + '"  width = "' + thisHeight * 0.2 + '"  class="img-responsive center-block" >';
            S3_html     = '<img id = "id_In_plan_2" src="images/'  + S3_Img + '"  width = "' + thisHeight * 0.2 + '"  class="img-responsive center-block" >';
            S4_html     = '<img id = "id_Ex_plan_1" src="images/'  + S4_Img + '"  width = "' + thisHeight * 0.2 + '"  class="img-responsive center-block" >';
            S5_html     = '<img id = "id_Ex_plan_2" src="images/'  + S5_Img + '"  width = "' + thisHeight * 0.2 + '"  class="img-responsive center-block" >';
            A1_html     = '<img id = "id_rocket_1"  src="images/'  + A1_Img + '"  width = "' + thisHeight * 0.15 + '"  class="img-responsive center-block" >';
            A2_html     = '<img id = "id_rocket_2"  src="images/'  + A2_Img + '"  width = "' + thisHeight * 0.15 + '"  class="img-responsive center-block" >';

            
            if (Instruct === true) {
                Instructions(1,ID); // perhaps should probably start with trial 1
            } else {
                Step_pre_trial(1,ID);
            }   
        }
        
    }
    
    
    // first page show the first page of experiment, second page show the second and third pages 
    function Instructions(PageNum,ID) {
        $('#Stage').empty();
        $('#Top').css('height', thisHeight / 18);
        //        $('#Stage').css('width', DispWidth + DispWidth*1/2);
        $('#Stage').css('width', DispWidth + DispWidth*.6);
        $('#Stage').css('min-height', thisHeight * 17 / 20);
        $('#Bottom').css('min-height', thisHeight / 20);

        var NumPages = 32;//number of pages //13
        var PicHeight = DispWidth *.85 ; // make this larger, perhaps are also change stage dimentions 

        // slides_set THE which instructions to show 

        CreateDiv('Stage', 'TextBoxDiv');
        var Title = '<H2 align = "center">Instructions</H2>';
        var ThisImage = '<div align = "center"><img src="images/' + slides_set + '_Slide' + PageNum + '.png" alt="house" height="' + PicHeight + '" align="center"></div>';
        //        $('#TextBoxDiv').html(Title + ThisImage);
        $('#TextBoxDiv').html(ThisImage);

        var Buttons = '<div align="center"><input align="center" type="button"  class="btn btn-default" id="Back" value="Back" >\n\
                      <input align="center" type="button"  class="btn btn-default" id="Next" value="Next" >\n\
                      <input align="center" type="button"  class="btn btn-default" id="Start" value="Start!" ></div>';

        $('#Bottom').html(Buttons);

        if (PageNum === 1) {
            $('#Back').hide();
        }
        ;
        if (PageNum === NumPages) {
            $('#Next').hide();
        }
        ;
        if (PageNum < NumPages) {
            $('#Start').hide();
        }
        ;

        $('#Back').click(function () {
            $('#TextBoxDiv').remove();
            $('#Stage').empty();
            $('#Bottom').empty();
            Instructions(PageNum - 1);
        });

        $('#Next').click(function () {
            $('#TextBoxDiv').remove();
            $('#Stage').empty();
            $('#Bottom').empty();
            Instructions(PageNum + 1);
        });

        $('#Start').click(function () {
            $('#TextBoxDiv').remove();
            $('#Stage').empty();
            $('#Bottom').empty();
            Step_pre_trial(1);
        });
        
    }
    
    
    // The actual experimment starts here
    function Step_pre_trial(TrialNum,ID) {
        console.log("Step_pre_trial");
        $('#Stage').empty();
        CreateDiv('Stage', 'TextBoxDiv');
        var Title = '<div id = "Title"><H2 align = "center"> Day starting in </H2></div>';
        $('#TextBoxDiv').html(Title);
        
        CreateDiv('Stage', 'TextBoxDiv1');
        
        Trial[TrialNum-1] = TrialNum;
        Action[TrialNum-1] = 0;
        RT1[TrialNum-1] = 0;
        RT2[TrialNum-1] = 0;
        RT3[TrialNum-1] = 0;
        missed1[TrialNum-1] = 0;
        missed2[TrialNum-1] = 0;
        missed3[TrialNum-1] = 0;

        setTimeout(function () {
            $('#TextBoxDiv1').html('<H1 align = "center">3</H1>');
            setTimeout(function () {
                $('#TextBoxDiv1').html('<H1 align = "center">2</H1>');
                setTimeout(function () {
                    $('#TextBoxDiv1').html('<H1 align = "center">1</H1>');
                    setTimeout(function () {
                        $('#TextBoxDiv1').empty();
                        Step_0(TrialNum);//Start with the first trial
                    }, wait_intro);
                }, wait_intro);
            }, wait_intro);
        }, 200);

    }


    // step_0 from where it choses which level to start from 
    function Step_0(TrialNum){
        console.log('TrialNum:                   ' + TrialNum);
        console.log('Step_0');
        console.log('Starting from level ' + level[TrialNum-1]);

        //        console.log('Transition ' + Transition);
        //        console.log('level ' + level);


        if (level[TrialNum-1]===1){
            Step_1(TrialNum);
        
        } else if (level[TrialNum-1]===2) {
            // if starting from level 2 then which stage is it? 
            if (L2_state[TrialNum-1]===2) {
                Step_2(TrialNum,1);
            } else if (L2_state[TrialNum-1]===3) {
                Step_2(TrialNum,2);
            }
            
        } else if (level[TrialNum-1]===3) {
            // if starting from level 3 then which stage is it? 
            if (L3_state[TrialNum-1]===4) {
                Step_3(TrialNum,1);
            } else if (L3_state[TrialNum-1]===5) {
                Step_3(TrialNum,2);
            }        
        }
    }


    // Step 1: choosing a spaceship taking to in planet
    function Step_1(TrialNum) {
        console.log("Step_1");
        $('#Stage').empty();
        $('#Top').css('height', thisHeight / 20);
        $('#Stage').css('width', DispWidth * 1.4);
        $('#Stage').css('min-height', thisHeight * 17 / 20);
        $('#Bottom').css('min-height', thisHeight / 20);

        // the text
        CreateDiv('Stage', 'TextBoxDiv');
        var Title = '<div id = "Title"><H2 align = "center">Choose a Rocket</H2></div>';
        $('#TextBoxDiv').html(Title);
        
        
        ////////////////////// sub_stage_top ///////////////////////////////////
        // Creat the middle row for spaceships 
        CreateDiv('Stage', 'sub_stage_top');
        $('#sub_stage_top').addClass('row');
        $('#sub_stage_top').css('height', thisHeight * 0.3);        
        $('#sub_stage_top').css('margin', 'auto');
        
        // counterbalancing the place of the 
        A1_left = (Math.floor(Math.random() * 2) === 0);
        //        console.log('A1_left: ' + A1_left);
        
        if (A1_left) {
            left_html  = A1_html;
            right_html = A2_html;
        } else {
            left_html  = A2_html;
            right_html = A1_html;
        }
        
        // display Rocket 1
        CreateDiv('sub_stage_top', 'id_rocket_left');
        $('#id_rocket_left').addClass('col-xs-6');
        $('#id_rocket_left').html(left_html);
        $('#id_rocket_left').css('margin', 'auto');
        $('#id_rocket_left').show();
        // display Rocket 2
        CreateDiv('sub_stage_top', 'id_rocket_right');
        $('#id_rocket_right').addClass('col-xs-6');
        $('#id_rocket_right').html(right_html);
        $('#id_rocket_right').css('margin', 'auto');
        $('#id_rocket_right').show();
        
        
        ////////////////////// sub_stage_middle ////////////////////////////////
        // some space between planet and portal The overall height is thisHeight * 0.3
        CreateDiv('Stage', 'sub_stage_space');
        $('#sub_stage_space').css('height', thisHeight * 0.1);
        
        // Creat the bottom row for spaceships
        CreateDiv('Stage', 'sub_stage_middle');
        $('#sub_stage_middle').addClass('row');
        $('#sub_stage_middle').css('height', thisHeight * 0.2);        
        $('#sub_stage_middle').css('margin', 'auto');
        
        // Display earth 
        CreateDiv('sub_stage_middle', 'id_Plan_Earth');
        $('#id_Plan_Earth').addClass('col-xs-12');
        $('#id_Plan_Earth').html(Earth_html);
        $('#id_Plan_Earth').css('margin', 'auto');
        $('#id_Plan_Earth').show();
        
        
        ////////////////////// sub_stage_bottom ////////////////////////////////
        // Creat keyboard respons cue
        CreateDiv('Stage', 'sub_stage_bottom');
        $('#sub_stage_bottom').addClass('row');
        $('#sub_stage_bottom').css('height', thisHeight * 0.15);        
        $('#sub_stage_bottom').css('margin', 'auto');
        var Title = '<div id = "Title"><H4 align = "center">Using F and J choose your spaceship</H4></div>';
        $('#sub_stage_bottom').html(Title);
        
        
        // selfexplanatory, tic set to current time 
        tic1 = (new Date()).getTime(); // for RT of choosing spaceship 
       
        
        var timer;
        Func_timer();
        // the timer function that runs you missed it page
        function Func_timer() {
            console.log("setTimeout: on");    
            timer = setTimeout(function(){ 
                $("body").off("keydown"); // detaches the keydwon from our dear event 
                console.log("Timer in Step 1 fired");    
                clearTimeout(timer);
                missed1[TrialNum-1] = 1;
                Step_MissedIt(TrialNum);
            }, wait);
        };
        
        
        // Key press, the wai step (showing some graphic change to rocket chose) is disable as it compromises key press and makes it able to detect two simulatanous keys, wrap this perhaps .. 
        
        $("body").on("keydown", function(e) {
            var k = e.keyCode; // get the key code of what was pressed             
            
            // the one the left chosen 
            if (k === 70){
                $("body").off("keydown");
                //                alert( "N 1 pressed ");
                RT1[TrialNum-1] = (new Date()).getTime() - tic1;
                clearTimeout(timer); console.log("setTimeout: off"); // turn of the timer 
                $("body").off("keydown"); // detaches the keydwon from our dear event 
                if (A1_left) {
                    Action[TrialNum-1] = 1;
                    Step_m(TrialNum,1,left_html,right_html,k); 
                } else {
                    Action[TrialNum-1] = 2;
                    Step_m(TrialNum,2,left_html,right_html,k); 
                }
            } else if (k === 74) {
                $("body").off("keydown");
                //                alert( "N 2 pressed ");
                RT1[TrialNum-1] = (new Date()).getTime() - tic1;
                clearTimeout(timer); console.log("setTimeout: off");
                $("body").off("keydown");
                if (A1_left) {
                    Action[TrialNum-1] = 2;
                    Step_m(TrialNum,2,left_html,right_html,k); 
                } else {
                    Action[TrialNum-1] = 1;
                    Step_m(TrialNum,1,left_html,right_html,k); 
                }
                
            };            
            
        });
        
    };
    
    // Sajjad
    // Step middle: showing which spaceship has been selected
    
    function Step_m(TrialNum,level_2,left_html,right_html,k) {
        // if level_2=1 -> S2, else if level_2=2 -> S3
        console.log("Step_m");
        console.log("level_m: " + level_2);
                
        if(level_2===1){
            var Title = '<div id = "Title"><H2 align = "center"> You are on planet ' + S2_name + '</H2></div>';
            var html_In_plan = S2_html;
        } else if (level_2===2){
            var Title = '<div id = "Title"><H2 align = "center"> You are on planet ' + S3_name + '</H2></div>';
            var html_In_plan = S3_html;
        };
        $('#Stage').empty();
        $('#Top').css('height', thisHeight / 20);
        $('#Stage').css('width', DispWidth * 1.4);
        $('#Stage').css('min-height', thisHeight * 17 / 20);
        $('#Bottom').css('min-height', thisHeight / 20);
      
        ////////////////////// sub_stage_top ///////////////////////////////////
        // Creat the bottom row for spaceships
        CreateDiv('Stage', 'sub_stage_middle');
        $('#sub_stage_middle').addClass('row');
        $('#sub_stage_middle').css('height', thisHeight * 0.1);        
        $('#sub_stage_middle').css('margin', 'auto');
        

        if (k === 70){
        // display Rocket 1
        
        CreateDiv('sub_stage_middle', 'id_rocket_left');
        $('#id_rocket_left').addClass('col-xs-12');
        $('#id_rocket_left').html(left_html);
        $('#id_rocket_left').css('margin', 'auto');
        $('#id_rocket_left').show()
        
        }
        else if (k === 74) {
        // display Rocket 2

         CreateDiv('sub_stage_middle', 'id_rocket_right');
        $('#id_rocket_right').addClass('col-xs-12');
        $('#id_rocket_right').html(right_html);
        $('#id_rocket_right').css('margin', 'auto');
        $('#id_rocket_right').show()       
        
        }
        setTimeout(function () { // wait between pages
        
            Step_2(TrialNum,level_2)

        },2000);
}

    // Step 2: arrive at in planet, press space to use portal, once pressed move to stage 3
    function Step_2(TrialNum,level_2) {
        // if level_2=1 -> S2, else if level_2=2 -> S3
        console.log("Step_2");
        console.log("level_2: " + level_2);

        //        debugger;
        $('#Stage').empty();
        $('#Top').css('height', thisHeight / 20);
        $('#Stage').css('width', DispWidth * 1.4);
        $('#Stage').css('min-height', thisHeight * 17 / 20);
        $('#Bottom').css('min-height', thisHeight / 20);
                
        if(level_2===1){
            var Title = '<div id = "Title"><H2 align = "center"> You are on planet ' + S2_name + '</H2></div>';
            var html_In_plan = S2_html;
        } else if (level_2===2){
            var Title = '<div id = "Title"><H2 align = "center"> You are on planet ' + S3_name + '</H2></div>';
            var html_In_plan = S3_html;
        };

        
        setTimeout(function () { // wait between pages 

        
            CreateDiv('Stage', 'TextBoxDiv');
            $('#TextBoxDiv').html(Title);

            ////////////////////// sub_stage_top ////////////////////////////////
            // show the portal 
            CreateDiv('Stage', 'sub_stage_top');
            $('#sub_stage_top').addClass('row');
            $('#sub_stage_top').css('height', thisHeight * 0.3);  

        
        
            ////////////////////// sub_stage_middle ////////////////////////////////
            // some space between planet and portal 
            CreateDiv('Stage', 'sub_stage_space');
            $('#sub_stage_space').css('height', thisHeight * 0.1);
        
            // place the intergalactic planet here 
            CreateDiv('Stage', 'sub_stage_middle');
            $('#sub_stage_middle').addClass('row');
            $('#sub_stage_middle').css('height', thisHeight * 0.2);  
            // display the planet that was chosen 
            CreateDiv('sub_stage_middle', 'id_in_planet');
            $('#id_in_planet').addClass('col-xs-12');
            $('#id_in_planet').html(html_In_plan);
            $('#id_in_planet').css('height', thisHeight * 0.2);
            $('#id_in_planet').css('margin', 'auto');
            $('#id_in_planet').show();


            // waiting 300 ms before showing the portal
            setTimeout(function () {
            
                tic2 = (new Date()).getTime(); // for RT of choosing spaceship 

                // display portal  
                CreateDiv('sub_stage_top', 'id_portal');
                $('#id_portal').addClass('col-xs-12');
                $('#id_portal').html(portal_rotate_html);
                $('#id_portal').css('margin', 'auto');
                $('#id_portal').show();
                ////////////////////// sub_stage_bottom ////////////////////////////////
                // Creat keyboard respons cue
                CreateDiv('Stage', 'sub_stage_bottom');
                $('#sub_stage_bottom').addClass('row');
                $('#sub_stage_bottom').css('height', thisHeight * 0.15);        
                $('#sub_stage_bottom').css('margin', 'auto');
                var Title = '<div id = "Title"><H4 align = "center"> Press space to use the portal </H4></div>';
                $('#sub_stage_bottom').html(Title);
        

        
        
                var timer;
                Func_timer();
                // the timer function that runs you missed it page
                function Func_timer() {
                    console.log("setTimeout: on");    
                    timer = setTimeout(function(){
                        $("body").off("keydown"); // detaches the keydwon from our dear event 
                        console.log("Timer in Step 2");    
                        clearTimeout(timer);
                        missed2[TrialNum-1] = 1;
                        Step_MissedIt(TrialNum);
                    }, wait);
                };
            
            
                // Key press 
                $("body").on("keydown", function(e)  { // JUST BY FIRING THIS LINE STEP_2 IS FIRED ... SO ON TOP OF CALLING 3 2 IS ALSO CALLED 
                    
                    var k = e.keyCode; // get the key code of what was pressed 
                    if (k ===32){
                        $("body").off("keydown");    
                        clearTimeout(timer); console.log("setTimeout: off"); // turn of the timer 
                        RT2[TrialNum-1] = (new Date()).getTime() - tic2;
                    
                        if (Transition[TrialNum] === 0 ){
                            if (level_2 === 1){ // if transition is zero level_2 => level_3 
                                // S4
                                Step_3(TrialNum,1);
                            } else {
                                // S5
                                Step_3(TrialNum,2);
                            }
                        } else { // if transition is not zero then things change 
                            if (level_2 === 1){
                                // S5
                                Step_3(TrialNum,2);
                            } else {
                                // S4
                                Step_3(TrialNum,1);
                            }
                        }
                    
                    };
                });
        
        
        
            },300); // waiting for portal to open 

        },200); // // wait between pages 

        

    }
        
        
    // Step 3: arrive at ex planet, press space to take reward
    function Step_3(TrialNum,level_3) {
        // if level_3 1 then S4 if it is 2 then S5 
        
        console.log("Step_3");
        $('#Stage').empty();
        $('#Top').css('height', thisHeight / 20);
        $('#Stage').css('width', DispWidth * 1.4);
        $('#Stage').css('min-height', thisHeight * 17 / 20);
        $('#Bottom').css('min-height', thisHeight / 20);

        
        setTimeout(function () { // wait to creat a gap between pages 
        
            // if the trial starts from level three then the title is different 
            if (level[TrialNum]===3) {
                if(level_3===1){
                    // S4
                    var Title = '<div id = "Title"><H2 align = "center"> You are at planet ' + S4_name + '</H2></div>';
                    var html_Ex_plan = S4_html;
                } else {
                    // S5 
                    var Title = '<div id = "Title"><H2 align = "center"> You are at planet ' + S5_name + '</H2></div>';
                    var html_Ex_plan = S5_html;
                };
            } else {
                if(level_3===1){
                    // S4
                    var Title = '<div id = "Title"><H2 align = "center"> Portal took you to ' + S4_name + '</H2></div>';
                    var html_Ex_plan = S4_html;
                } else {
                    // S5 
                    var Title = '<div id = "Title"><H2 align = "center"> Portal took you to ' + S5_name + '</H2></div>';
                    var html_Ex_plan = S5_html;
                };
            }




            CreateDiv('Stage', 'TextBoxDiv');
            $('#TextBoxDiv').html(Title);


            tic3 = (new Date()).getTime(); // for RT of choosing spaceship 
        
        
            ////////////////////// sub_stage_top ///////////////////////////////////
            CreateDiv('Stage', 'sub_stage_top');
            $('#sub_stage_top').addClass('row');
            $('#sub_stage_top').css('height', thisHeight * 0.3);  

            ////////////////////// sub_stage_middle ////////////////////////////////
            // some space between planet and portal The overall height is thisHeight * 0.3
            CreateDiv('Stage', 'sub_stage_space');
            $('#sub_stage_space').css('height', thisHeight * 0.1);
        
            // place the ExoGalactic planet here 
            CreateDiv('Stage', 'sub_stage_middle');
            $('#sub_stage_middle').addClass('row');
            $('#sub_stage_middle').css('height', thisHeight * 0.2);  
            // display the planet that was chosen 
            CreateDiv('sub_stage_middle', 'id_ex_planet');
            $('#id_ex_planet').addClass('col-xs-12');
            $('#id_ex_planet').html(html_Ex_plan);
            $('#id_ex_planet').css('height', thisHeight * 0.2);
            $('#id_ex_planet').css('margin', 'auto');
            $('#id_ex_planet').show();
        

            ////////////////////// sub_stage_bottom ////////////////////////////////
            // Creat keyboard respons cue
            CreateDiv('Stage', 'sub_stage_bottom');
            $('#sub_stage_bottom').addClass('row');
            $('#sub_stage_bottom').css('height', thisHeight * 0.15);        
            $('#sub_stage_bottom').css('margin', 'auto');
            var Title = '<div id = "Title"><H4 align = "center">Press space to see the reward</H4></div>';
            $('#sub_stage_bottom').html(Title);

            var timer;
            Func_timer();
            // the timer function that runs you missed it page
            function Func_timer() {
                console.log("setTimeout: on");
                timer = setTimeout(function(){
                    $("body").off("keydown"); // detaches the keydwon from our dear event 
                    console.log("Timer in Step 3");
                    clearTimeout(timer);
                    missed3[TrialNum-1] = 1;
                    Step_MissedIt(TrialNum);
                }, wait);
            };

            // Key press
            $( "body" ).keydown(function(e) {
                var k = e.keyCode;          // get the key code of what was pressed 
                $("body").off("keydown");
                if (k ===32){
                    clearTimeout(timer); console.log("setTimeout: off"); // turn of the timer 
                    RT3[TrialNum-1] = (new Date()).getTime() - tic3;
                    rewarding ();
                
                    // replace this by 
                    setTimeout(function () {
                        console.log("step_pre_trial fired from Step_3");
                        if (TrialNum >= NumTrials) {// is it the end?
                            Step_End();
                        } else if (TrialNum % trial_break === 0){ // is it break time
                            Step_Break(TrialNum);
                        } else {
                            Step_pre_trial(TrialNum + 1);
                        }

                    },rew_duration);
                };
            });
        
        
            // dsiplay reward ! 
            function rewarding () {
            
                $('#sub_stage_bottom').empty(); // to clear the key instructions
            
                if(level_3===1) {
                    Rew = Rew4_magnitude[TrialNum];
                } else if (level_3===2){
                    Rew = Rew5_magnitude[TrialNum];
                }
            
                if (Rew === .1){    // reward positive :)
                    RewHeight = thisHeight * 0.13 * 2;
                    var points = 100;
                    num_reward += 1; // count how many times was the reward was reached 
                } else {            // reward negative :(
                    RewHeight = thisHeight * 0.13 * 0.8;
                    var points = 20;
                }
                
            
                var Reward_html         = '<img id = "id_Reward.png" src="images/Reward.png"              width = "' + RewHeight + '"  class="img-responsive center-block" >';
                console.log('Reward: ' + Rew);
                var Title = '<div id = "Title"><H2 align = "center"> You found ' + points + ' points </H2></div>';
                $('#TextBoxDiv').empty();
                CreateDiv('sub_stage_top', 'TextBoxDiv');
                $('#TextBoxDiv').html(Title);
                CreateDiv('sub_stage_top', 'reward');
                $('#reward').addClass('col-xs-12');
                $('#reward').html(Reward_html);
                $('#reward').css('margin', 'auto');
                $('#reward').show();
            }        
        
        },200); // creating a gap between the screens  

        
    }
    
    
    // step MissedIt: come here when too slow
    function Step_MissedIt(TrialNum) {
        console.log("Step_MissedIt");
        $('#Stage').empty();
        $('#Top').css('height', thisHeight / 20);
        $('#Stage').css('width', DispWidth * 1.4);
        $('#Stage').css('min-height', thisHeight * 17 / 20);
        $('#Bottom').css('min-height', thisHeight / 20);
        
        
        var Title = '<div id = "Title"><H2 align = "center"> too late...  try the next day </H2></div>';
        
        CreateDiv('Stage', 'TextBoxDiv');
        $('#TextBoxDiv').html(Title);
        
        // show the portal 
        CreateDiv('Stage', 'sub_stage_top');
        $('#sub_stage_top').addClass('row');
        $('#sub_stage_top').css('height', DispWidth * 0.4);  
        // dsiplay reward !  
        CreateDiv('sub_stage_top', 'id_sad');
        $('#id_sad').addClass('col-xs-12');
        $('#id_sad').html(Sad_Face_html);
        $('#id_sad').css('margin', 'auto');
        $('#id_sad').show();
        
        
        // to move out of missed it with time
        setTimeout(function () {
            console.log("step_pre_trial fired from Step_MissedIt");
           
            if (TrialNum >= NumTrials) {// is it the end?
                Step_End();
            } else if (TrialNum % trial_break === 0){ // is it break time
                Step_Break(TrialNum);
            } else {
                Step_pre_trial(TrialNum + 1);
            }
                     
        },wait_missedit);


    }
    
    
    // step MissedIt: come here when too slow
    function Step_Break(TrialNum) {
        console.log("Step_Break");
        $('#Stage').empty();
        $('#Top').css('height', thisHeight / 20);
        $('#Stage').css('width', DispWidth * 1.4);
        $('#Stage').css('min-height', thisHeight * 17 / 20);
        $('#Bottom').css('min-height', thisHeight / 20);
        
        
        var Title = '<div id = "Title"><H2 align = "center"> Break Time! </H2>\n\
<H3 align = "center"> Please do not do anything and just relax. </H3> \n\
<H3 id = timer_id align = "center">  </H3></div>';
        
        CreateDiv('Stage', 'TextBoxDiv');
        $('#TextBoxDiv').html(Title);


        var seconds_left = wait_break; // wait_break in seconds 
        var interval = setInterval(function() {
            document.getElementById('timer_id').innerHTML = "The game will resume in " + --seconds_left + " seconds";

            if (seconds_left <= 0)
            {
                document.getElementById('timer_id').innerHTML = "You are Ready!";
                clearInterval(interval);

                console.log("step_pre_trial fired from Step_Break");
                if (TrialNum >= NumTrials) {// is it the end?
                    Step_End();
                } else {
                    Step_pre_trial(TrialNum + 1);
                }

        
        
            }
        }, 1000); // dont touch this 1000, it makes the timer in seconds 
        

    }


    function Step_End() {
    
        console.log("Step_End");
        $('#Stage').empty();
        $('#Top').css('height', thisHeight / 20);
        $('#Stage').css('width', DispWidth * 1.4);
        $('#Stage').css('min-height', thisHeight * 17 / 20);
        $('#Bottom').css('min-height', thisHeight / 20);
        
        
        var Title = '<div id = "Title"><H2 align = "center"> You finished the experiment. </H2>\n\
        <H2 align = "center"> Please dont close this page and call the experimenter </H2></div>';
        
        CreateDiv('Stage', 'TextBoxDiv');
        $('#TextBoxDiv').html(Title);
        
        // go to a page to show all the data 
        
        
        $("body").on("keydown", function(e) {
            var k = e.keyCode; // get the key code of what was pressed             
            
            // the one the left chosen 
            if (k === 81){
                $("body").off("keydown");
                if (if_warmup===1) {
                  Step_ShowQuestions();
                } else { 
                  Step_ShowData
                } 
            }                 
            
        });

          if (if_warmup===1) {
            Step_ShowQuestions();
          } else { 
            Step_ShowData
          } 
    }
    

    function Step_ShowQuestions() {
    console.log("Step_ShowQuestions");
    $('#Stage').empty();

    var currentQuestion = questions[currentQuestionIndex];

    // Construct the question and answers HTML
    var questionHtml = `<div id="questionDiv">
        <h2 align="center">${currentQuestion.text}</h2>`;

    currentQuestion.answers.forEach(function(answer) {
        questionHtml += `
            <div class="answer">
                <input type="radio" id="${answer.id}" name="answer" value="${answer.text}">
                <label for="${answer.id}">${answer.text}</label>
            </div>`;
    });

    questionHtml += `<button class="submit-button" id="submit-button">Submit</button></div>`;

    CreateDiv('Stage', 'QuestionBoxDiv');
    $('#QuestionBoxDiv').html(questionHtml);

    // Attach event listener for submit button click
    $('#submit-button').on('click', submitAnswer)
  
}

// Function to handle answer submission
    function submitAnswer() {
    const answers = document.getElementsByName('answer');
    let selectedAnswer = null;
    for (const answer of answers) {
        if (answer.checked) {
            selectedAnswer = answer.id;
            break;
        }
    }

    if (selectedAnswer === null) {

    } else {
        currentQuestionIndex++;
        ques_ans[currentQuestionIndex-1] = selectedAnswer;

        if (currentQuestionIndex < questions.length) {
            // Show the next question if there are more questions
            Step_ShowQuestions();
        } else {
            // All questions are answered
            alert('You have completed all the questions.');
            Step_ShowData(ques_ans)
  
        }
    }
}


    // stuff to be saved are here
    
    function Step_ShowData() {
    console.log("Step_ShowData");
    $('#Stage').empty();
    $('#Top').css('height', thisHeight / 20);
    $('#Stage').css('width', DispWidth * 1.4);
    $('#Stage').css('min-height', thisHeight * 17 / 20);
    $('#Bottom').css('min-height', thisHeight / 20);
    
    // Get the percentage correct
    perc_rew = num_reward / NumTrials * 100;
    
    // Check the responses against the true answers
    var allCorrect = true;
    for (let i = 0; i < ques_ans.length; i++) {
        if (ques_ans[i] !== trueResponses[i]) {
            allCorrect = false;
            break;
        }
    }

    
    // Create a structure to hold the output data
    var outputData = {
        ID: Subject_ID,
        Trial: Trial,
        Level: level,
        Action: Action,
        RT1: RT1,
        RT2: RT2,
        RT3: RT3,
        Missed1: missed1,
        Missed2: missed2,
        Missed3: missed3,
        QuesAns: ques_ans,
        ReadyToMain: allCorrect,
        PercRew: perc_rew
    };


    // Show message based on correctness of answers
    var message;
    if (allCorrect) {
        message = '<H2 align="center">All responses are correct. <br> Now you can enter the main experiment.</H2>';
    } else {
        message = '<H2 align="center">You could not response to all questions correctly. <br> We need to say good bye to you and thank you for your participation.</H2>';
    }

    // Display the message and the output data
    var outputHtml = `${message}<p>ID           = [${outputData.ID}];<br>
                                    Trial       = [${outputData.Trial}];<br>
                                    Level       = [${outputData.Level}];<br>
                                    Action      = [${outputData.Action}];<br>
                                    RT1         = [${outputData.RT1}];<br>
                                    RT2         = [${outputData.RT2}];<br>
                                    RT3         = [${outputData.RT3}];<br>
                                    Missed1     = [${outputData.Missed1}];<br>
                                    Missed2     = [${outputData.Missed2}];<br>
                                    Missed3     = [${outputData.Missed3}];<br>
                                    QuesAns     = [${outputData.QuesAns}];<br>
                                    ReadyToMain = [${outputData.ReadyToMain}];<br>
                                    PercRew     = [${outputData.PercRew}]</p>`;
                                    
    // Sajjad: here you can eaither put outputHtml or message alone                                 

  //  CreateDiv('Stage', 'TextBoxDiv');
  //  $('#TextBoxDiv').html(outputHtml);
    
        CreateDiv('Stage', 'TextBoxDiv');
    $('#TextBoxDiv').html(message);
    
        //downloadResponses(outputData);
        saveData(outputData);

    }

// Function to handle response download
    function downloadResponses(data) {
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
    var downloadAnchorNode = document.createElement('a');
    var filename = `responses_${data.ID}.json`; // Use ID in the filename
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", filename);
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    check_if_warmup(data.ReadyToMain);
    }

// send data to google drive
    function saveData(outputData) {

        var url = "https://script.google.com/macros/s/AKfycbysjYIZ43htkTjNuW3BvFC46WTL_xfP8CxGff3z4yCi8cwYLuszn_i5i4penPqJSqQiNQ/exec"; // Replace with your script URL
        
        var options = {
            redirect: "follow",
            method: "POST",
            headers: {
                "Content-Type": "text/plain;charset=utf-8",
            },
            body: JSON.stringify(outputData)
        };

        fetch(url, options)
            .then(response => response.json())
            .then(data => {
                console.log("Data saved successfully:", data);
            })
            .catch(error => {
                console.error("Error saving data:", error);
            });

        check_if_warmup(outputData.ReadyToMain);
    }


    function check_if_warmup(ReadyToMain) {
    if (if_warmup===1 && ReadyToMain){
        Instruct = false;
          ////////////////////////////////////////////////////////////////////////////
        var NumTrials = 5; // cant be more then 365
          ////////////////////////////////////////////////////////////////////////////
        if_warmup=0;
        go_to_main()
    }
    }
    
    function go_to_main(){

      var Buttons = '<div align="center"><input align="center" type="button"  class="btn btn-default" id="Start" value="Start!" ></div>';
                    
      $('#Bottom').css('min-height', thisHeight / 20);
      $('#Bottom').html(Buttons);
       
      $('#Start').click(function () {
      $('#TextBoxDiv').remove();
      $('#Stage').empty();
      $('#Bottom').empty();
      Step_setup(Subject_ID);
   });

  }
    // the end 

    //Utility Functions
    function CreateDiv(ParentID, ChildID) {

        var d = $(document.createElement('div'))
                .attr("id", ChildID);
        var container = document.getElementById(ParentID);

        d.appendTo(container);
    }

});
