const activities = [
    `Follow my instructions as fast as you can.  <say-as interpret-as="interjection">good luck</say-as>.
        <break time= "0.5s" />
        Put your hands straight up in the air. 
        <break time= "1.5s" />
        Touch your knees. 
        <break time= "1.5s" />
        Touch your head. 
        <break time= "1.5s" />
        Touch your toes. 
        <break time= "1.5s" />
        Touch your ears. 
        <break time= "1.5s" />
        Touch your elbows. 
        <break time= "1.5s" />
        Good job!
        <break time= "1s" />
        `,
    `Follow my instructions.
        <break time= "0.5s" />
        Stand up tall on your tippy toes. 
        <break time= "1.5s" />
        Crouch down as small as you can. 
        <break time= "1.5s" />
        Stand up tall on your tippy toes.
        <break time= "1.5s" />
        Crouch down as small as you can. 
        <break time= "1.5s" />
        Stand up tall on your tippy toes.
        <break time= "1.5s" />
        Last time! Crouch down as small as you can.
        <break time= "1.5s" />
        <say-as interpret-as="interjection">well done</say-as>.
        <break time= "1s" />
        `,
    `Run on the spot slowly as I count to 5.
        1 <break time= "1s" /> 
        2 <break time= "1s" />
        3 <break time= "1s" />
        4 <break time= "1s" />
        5 <break time= "1s" />
        <say-as interpret-as="interjection">well done</say-as>.
        <break time= "1s" />`,
    `Run on the spot as fast as you can. I'll count to five.
        <prosody rate="fast">Go</prosody>.
        1 <break time= "1s" /> 
        2 <break time= "1s" />
        3 <break time= "1s" />
        4 <break time= "1s" />
        5 <break time= "1s" />
        <say-as interpret-as="interjection">way to go</say-as>.
        <break time= "1s" />`,
    `Run on the spot slowly as I count to 5.
        1 <break time= "1s" /> 
        2 <break time= "1s" />
        3 <break time= "1s" />
        4 <break time= "1s" />
        5 <break time= "1s" />
        <say-as interpret-as="interjection">well done</say-as>.
        <break time= "1s" />`,
    `Flap like a bird for a count of 3.
        1 <break time= "1s" /> 
        2 <break time= "1s" />
        3 <break time= "1s" />
        <break time= "1s" />`,
    `Squat down and Jump like a frog.
        <break time= "1s" /> 
        <say-as interpret-as="interjection">ribbit</say-as> <break time= "1s" /> 
        <say-as interpret-as="interjection">ribbit</say-as> <break time= "1s" />
        <say-as interpret-as="interjection">ribbit</say-as> <break time= "1s" />
        <say-as interpret-as="interjection">ribbit</say-as> <break time= "1s" />
        <break time= "1s" />`,
    `Ok now lick your elbow! <break time= "2s" />.  
        <say-as interpret-as="interjection">just kidding</say-as>. Nobody can do that.
        <break time= "1s" />`,
    `March around in a circle.
        March <break time= "0.5s" /> 
        March <break time= "0.2s" />
        March <break time= "0.5s" />
        March. Keep going! <break time= "0.5s" />
        March <break time= "0.5s" />
        March <break time= "0.2s" />
        March <break time= "0.5s" />
        March <break time= "0.5s" />
        <say-as interpret-as="interjection">well done</say-as>.
        <break time= "1s" />`,
    `Let's make some faces.
        <break time= "0.8s" /> 
        Make a happy face <break time= "2s" /> 
        Make a sad face <break time= "2s" />
        Make a angry face <break time= "2s" />
        Make a scary face <break time= "2s" />
        Make a silly face <break time= "2s" />
        <say-as interpret-as="interjection">well done</say-as>.
        <break time= "1s" />`,
    `Spin around 3 times.
        <break time= "0.6s" /> 
        1 <break time= "1s" /> 
        2 <break time= "1s" />
        3 <break time= "1s" />
        Don't get too dizzy!
        <break time= "1s" />`,
    `Clap your hands as I count.
        <break time= "0.6s" /> 
        1 <break time= "1s" /> 
        2 <break time= "1s" />
        3 <break time= "1s" />
        4 <break time= "1s" />
        5 <break time= "1s" />
        <audio src='soundbank://soundlibrary/human/amzn_sfx_crowd_applause_01'/>
        <break time= "1s" />`,
    `Stomp your feet as I count.
        <break time= "1s" /> 
        1 <break time= "1s" /> 
        2 <break time= "1s" />
        3 <break time= "1s" />
        4 <break time= "1s" />
        5 <break time= "1s" />
        <break time= "1s" />`,
    `Let's really move. Shake your whole body and freeze when I say.
        <break time= "1s" /> 
        Shake <break time= "1s" /> 
        Shake <break time= "0.6s" />
        Shake <break time= "1s" />
        <prosody volume="x-loud">Freeze</prosody> <break time= "1.5s" />
        Shake <break time= "1s" />
        Shake <break time= "1.1s" /> 
        Shake <break time= "0.8s" />
        Shake <break time= "1s" /> 
        Shake <break time= "0.888s" /> 
        <prosody volume="x-loud">Freeze.</prosody> Try and hold still <break time= "1.5s" />
        Shake <break time= "1s" />
        Shake <break time= "1s" /> 
        Shake <break time= "1s" />
        <prosody volume="x-loud">Freeze</prosody> <break time= "1.5s" />
        <say-as interpret-as="interjection">well done</say-as>. 
        <break time= "1s" />
        `,
    `Wiggle your arms.
        <break time= "1s" /> 
        Wiggle <break time= "0.6s" /> 
        Wiggle <break time= "1s" />
        <prosody volume="x-loud">Freeze</prosody> <break time= "1s" />
        Wiggle <break time= "1s" />
        Wiggle <break time= "0.7s" /> 
        Wiggle <break time= "1s" />
        Wiggle <break time= "0.4s" /> 
        <prosody volume="x-loud">Freeze</prosody> <break time= "1s" />
        Wiggle <break time= "1s" />
        Wiggle <break time= "0.8s" /> 
        Wiggle <break time= "1s" />
        <prosody volume="x-loud">Freeze</prosody> <break time= "1s" />
        <say-as interpret-as="interjection">well done</say-as>. 
        <break time= "1s" />
        `,
];

module.exports = activities;