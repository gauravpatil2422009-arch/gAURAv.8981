/* =========================================================
   GAURAV PORTFOLIO
   CINEMATIC INTRO CONTROLLER
========================================================= */


/* =========================================================
   DOM ELEMENTS
========================================================= */

const intro =
    document.getElementById("intro");

const canvas =
    document.getElementById("introCanvas");

const ctx =
    canvas.getContext("2d");

const portfolio =
    document.getElementById("portfolio");

const pullInstruction =
    document.getElementById("pullInstruction");

const secondPullInstruction =
    document.getElementById("secondPullInstruction");


/* =========================================================
   BASIC SAFETY CHECK
========================================================= */

if (
    !intro ||
    !canvas ||
    !ctx ||
    !portfolio ||
    !pullInstruction ||
    !secondPullInstruction
) {
    console.error(
        "GAURAV INTRO ERROR: Required HTML elements are missing."
    );
}


/* =========================================================
   BODY STATE
========================================================= */

document.body.classList.add(
    "intro-active"
);


/* =========================================================
   CANVAS
========================================================= */

let width = 0;
let height = 0;
let dpr = 1;


/* =========================================================
   COLORS
========================================================= */

const COLORS = {

    black:
        "#000000",

    white:
        "#ffffff",

    pink:
        "#f9d1d9",

    yellow:
        "#feffaf"

};


/* =========================================================
   STATES
========================================================= */

const STATES = {

    WAITING_FIRST_PULL:
        "WAITING_FIRST_PULL",

    GAURAV:
        "GAURAV",

    POWER_CUT:
        "POWER_CUT",

    WAITING_SECOND_PULL:
        "WAITING_SECOND_PULL",

    START:
        "START",

    FINISHED:
        "FINISHED"

};


/* =========================================================
   CURRENT STATE
========================================================= */

let state =
    STATES.WAITING_FIRST_PULL;


/* =========================================================
   LAMP
========================================================= */

const lamp = {

    x: 0,

    y: 0,

    width: 92,

    height: 48,

    ropeTopY: 0,

    ropeLength: 115,

    ropeOffset: 0,

    pulling: false,

    pullStartY: 0,

    currentPull: 0,

    maxPull: 58,

    on: false,

    glow: 0

};


/* =========================================================
   START POSITION / HIT AREA
========================================================= */

const startArea = {

    x: 0,

    y: 0,

    width: 0,

    height: 0

};


/* =========================================================
   GAURAV LETTERS
========================================================= */

const gauravText =
    "GAURAV";


/* =========================================================
   GLITCH DATA
========================================================= */

let glitchLines = [];

let glitchFragments = [];

let powerCutStart =
    0;

let gauravStart =
    0;

let secondPullStart =
    0;

let startPulse =
    0;


/* =========================================================
   RANDOM HELPERS
========================================================= */

function random(
    min,
    max
) {

    return (
        Math.random() *
        (max - min)
    ) + min;

}


function randomInt(
    min,
    max
) {

    return Math.floor(
        random(
            min,
            max + 1
        )
    );

}


/* =========================================================
   CANVAS RESIZE
========================================================= */

function resizeCanvas() {

    dpr =
        Math.min(
            window.devicePixelRatio || 1,
            2
        );

    width =
        window.innerWidth;

    height =
        window.innerHeight;

    canvas.width =
        Math.floor(
            width * dpr
        );

    canvas.height =
        Math.floor(
            height * dpr
        );

    canvas.style.width =
        width + "px";

    canvas.style.height =
        height + "px";

    ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );

    updateLampPosition();

}


window.addEventListener(
    "resize",
    resizeCanvas
);


/* =========================================================
   LAMP POSITION
========================================================= */

function updateLampPosition() {

    lamp.x =
        width / 2;

    lamp.y =
        Math.max(
            92,
            height * 0.18
        );

    lamp.ropeTopY =
        lamp.y -
        135;

}


/* =========================================================
   EASING
========================================================= */

function easeOutCubic(
    t
) {

    return 1 -
        Math.pow(
            1 - t,
            3
        );

}


function easeInOut(
    t
) {

    return (
        t < 0.5
            ? 4 * t * t * t
            : 1 -
                Math.pow(
                    -2 * t + 2,
                    3
                ) / 2
    );

}


/* =========================================================
   PULL INSTRUCTION
========================================================= */

function showFirstPull() {

    pullInstruction.classList.add(
        "visible"
    );

}


function hideFirstPull() {

    pullInstruction.classList.remove(
        "visible"
    );

}


function showSecondPull() {

    secondPullInstruction.classList.add(
        "visible"
    );

}


function hideSecondPull() {

    secondPullInstruction.classList.remove(
        "visible"
    );

}


/* =========================================================
   DRAW HELPERS
========================================================= */

function clearCanvas() {

    ctx.clearRect(
        0,
        0,
        width,
        height
    );

}


function drawGlowCircle(
    x,
    y,
    radius,
    alpha,
    color
) {

    const gradient =
        ctx.createRadialGradient(
            x,
            y,
            0,
            x,
            y,
            radius
        );

    gradient.addColorStop(
        0,
        color.replace(
            ")",
            `, ${alpha})`
        )
    );

}


/* =========================================================
   REALISTIC LAMP
========================================================= */

function drawLamp() {

    const x =
        lamp.x;

    const y =
        lamp.y;

    const ropeEnd =
        lamp.ropeTopY +
        lamp.ropeLength +
        lamp.ropeOffset;


    /* -----------------------------------------------------
       Ceiling point
    ----------------------------------------------------- */

    ctx.save();

    ctx.strokeStyle =
        "rgba(255,255,255,0.18)";

    ctx.lineWidth = 1;

    ctx.beginPath();

    ctx.moveTo(
        x,
        0
    );

    ctx.lineTo(
        x,
        lamp.ropeTopY
    );

    ctx.stroke();


    /* -----------------------------------------------------
       Small ceiling mount
    ----------------------------------------------------- */

    ctx.fillStyle =
        "rgba(255,255,255,0.5)";

    ctx.beginPath();

    ctx.arc(
        x,
        lamp.ropeTopY,
        3,
        0,
        Math.PI * 2
    );

    ctx.fill();


    /* -----------------------------------------------------
       Rope
    ----------------------------------------------------- */

    ctx.strokeStyle =
        "rgba(210,210,210,0.78)";

    ctx.lineWidth = 1.4;

    ctx.beginPath();

    ctx.moveTo(
        x,
        lamp.ropeTopY
    );

    ctx.lineTo(
        x,
        ropeEnd
    );

    ctx.stroke();


    /* -----------------------------------------------------
       Rope small shadow
    ----------------------------------------------------- */

    ctx.strokeStyle =
        "rgba(0,0,0,0.65)";

    ctx.lineWidth = 0.8;

    ctx.beginPath();

    ctx.moveTo(
        x + 1,
        lamp.ropeTopY
    );

    ctx.lineTo(
        x + 1,
        ropeEnd
    );

    ctx.stroke();


    /* -----------------------------------------------------
       Pull handle
    ----------------------------------------------------- */

    ctx.fillStyle =
        "#cfcfcf";

    ctx.beginPath();

    ctx.roundRect(
        x - 5,
        ropeEnd - 2,
        10,
        17,
        5
    );

    ctx.fill();


    /* -----------------------------------------------------
       Lamp glow
    ----------------------------------------------------- */

    if (
        lamp.on ||
        lamp.glow > 0
    ) {

        const glowStrength =
            lamp.on
                ? 0.34
                : lamp.glow * 0.34;

        const glowRadius =
            190 +
            lamp.glow * 120;

        const gradient =
            ctx.createRadialGradient(
                x,
                y + 22,
                0,
                x,
                y + 22,
                glowRadius
            );

        gradient.addColorStop(
            0,
            `rgba(255,245,185,${glowStrength})`
        );

        gradient.addColorStop(
            0.25,
            `rgba(255,230,145,${glowStrength * 0.5})`
        );

        gradient.addColorStop(
            1,
            "rgba(255,220,120,0)"
        );

        ctx.fillStyle =
            gradient;

        ctx.beginPath();

        ctx.arc(
            x,
            y + 25,
            glowRadius,
            0,
            Math.PI * 2
        );

        ctx.fill();

    }


    /* -----------------------------------------------------
       Lamp shade shadow
    ----------------------------------------------------- */

    ctx.shadowBlur =
        lamp.on
            ? 28
            : 0;

    ctx.shadowColor =
        "rgba(255,231,151,0.85)";


    /* -----------------------------------------------------
       Lamp shade
    ----------------------------------------------------- */

    const shadeGradient =
        ctx.createLinearGradient(
            x,
            y - 10,
            x,
            y + 42
        );

    shadeGradient.addColorStop(
        0,
        "#202020"
    );

    shadeGradient.addColorStop(
        0.65,
        "#101010"
    );

    shadeGradient.addColorStop(
        1,
        "#050505"
    );

    ctx.fillStyle =
        shadeGradient;

    ctx.beginPath();

    ctx.moveTo(
        x - 25,
        y - 4
    );

    ctx.lineTo(
        x + 25,
        y - 4
    );

    ctx.lineTo(
        x + 44,
        y + 34
    );

    ctx.quadraticCurveTo(
        x,
        y + 47,
        x - 44,
        y + 34
    );

    ctx.closePath();

    ctx.fill();


    /* -----------------------------------------------------
       Shade edge
    ----------------------------------------------------- */

    ctx.shadowBlur = 0;

    ctx.strokeStyle =
        "rgba(255,255,255,0.22)";

    ctx.lineWidth = 1;

    ctx.beginPath();

    ctx.moveTo(
        x - 44,
        y + 34
    );

    ctx.quadraticCurveTo(
        x,
        y + 47,
        x + 44,
        y + 34
    );

    ctx.stroke();


    /* -----------------------------------------------------
       Bulb
    ----------------------------------------------------- */

    if (lamp.on) {

        ctx.shadowBlur =
            35;

        ctx.shadowColor =
            "rgba(255,236,155,0.95)";

        ctx.fillStyle =
            "#fff5b5";

        ctx.beginPath();

        ctx.arc(
            x,
            y + 28,
            8,
            0,
            Math.PI * 2
        );

        ctx.fill();

        ctx.shadowBlur =
            0;

    }


    ctx.restore();

}


/* =========================================================
   DRAW GAURAV
========================================================= */

function drawGaurav(
    time
) {

    const centerX =
        width / 2;

    const centerY =
        height * 0.58;

    const fontSize =
        Math.min(
            width * 0.15,
            155
        );

    ctx.save();

    ctx.textAlign =
        "center";

    ctx.textBaseline =
        "middle";

    ctx.font =
        `600 ${fontSize}px "Times New Roman", serif`;

    ctx.shadowColor =
        COLORS.pink;

    ctx.shadowBlur =
        24 +
        Math.sin(time * 0.006) * 8;

    ctx.fillStyle =
        COLORS.pink;

    ctx.fillText(
        gauravText,
        centerX,
        centerY
    );


    /* -----------------------------------------------------
       Additional subtle glow
    ----------------------------------------------------- */

    ctx.globalAlpha =
        0.28;

    ctx.shadowBlur =
        55;

    ctx.fillText(
        gauravText,
        centerX,
        centerY
    );

    ctx.restore();

}


/* =========================================================
   GAURAV GLITCH EFFECT
========================================================= */

function createGlitchData() {

    glitchLines = [];

    glitchFragments = [];


    /* -----------------------------------------------------
       Horizontal glitch lines
    ----------------------------------------------------- */

    const lineCount =
        randomInt(
            14,
            30
        );

    for (
        let i = 0;
        i < lineCount;
        i++
    ) {

        glitchLines.push({

            y:
                random(
                    height * 0.40,
                    height * 0.70
                ),

            height:
                random(
                    1,
                    7
                ),

            offset:
                random(
                    -35,
                    35
                ),

            width:
                random(
                    width * 0.15,
                    width * 0.75
                ),

            alpha:
                random(
                    0.18,
                    0.75
                )

        });

    }


    /* -----------------------------------------------------
       Small fragments
    ----------------------------------------------------- */

    const fragmentCount =
        randomInt(
            20,
            55
        );

    for (
        let i = 0;
        i < fragmentCount;
        i++
    ) {

        glitchFragments.push({

            x:
                random(
                    width * 0.25,
                    width * 0.75
                ),

            y:
                random(
                    height * 0.43,
                    height * 0.68
                ),

            width:
                random(
                    5,
                    60
                ),

            height:
                random(
                    2,
                    12
                ),

            offset:
                random(
                    -50,
                    50
                ),

            alpha:
                random(
                    0.2,
                    0.9
                )

        });

    }

}


/* =========================================================
   DRAW GLITCH
========================================================= */

function drawGlitch(
    progress
) {

    ctx.save();


    /* -----------------------------------------------------
       Original GAURAV becomes unstable
    ----------------------------------------------------- */

    const centerX =
        width / 2;

    const centerY =
        height * 0.58;

    const fontSize =
        Math.min(
            width * 0.15,
            155
        );


    /*
       Draw increasingly transparent text.
    */

    const textAlpha =
        Math.max(
            0,
            1 - progress * 1.45
        );


    ctx.textAlign =
        "center";

    ctx.textBaseline =
        "middle";

    ctx.font =
        `600 ${fontSize}px "Times New Roman", serif`;

    ctx.globalAlpha =
        textAlpha;

    ctx.fillStyle =
        COLORS.pink;

    ctx.shadowColor =
        COLORS.pink;

    ctx.shadowBlur =
        25;

    ctx.fillText(
        gauravText,
        centerX,
        centerY
    );


    /* -----------------------------------------------------
       Flickering copies
    ----------------------------------------------------- */

    if (
        Math.random() <
        0.72
    ) {

        ctx.globalAlpha =
            random(
                0.12,
                0.55
            );

        ctx.shadowBlur =
            0;

        ctx.fillStyle =
            Math.random() > 0.5
                ? "#ffffff"
                : COLORS.pink;

        ctx.fillText(
            gauravText,
            centerX +
                random(
                    -12,
                    12
                ),
            centerY +
                random(
                    -5,
                    5
                )
        );

    }


    /* -----------------------------------------------------
       Horizontal glitch slices
    ----------------------------------------------------- */

    ctx.globalAlpha = 1;

    for (
        const line
        of glitchLines
    ) {

        if (
            Math.random() <
            0.75
        ) {

            ctx.fillStyle =
                Math.random() > 0.5
                    ? COLORS.pink
                    : "#ffffff";

            ctx.globalAlpha =
                line.alpha *
                (1 - progress * 0.35);

            ctx.fillRect(
                centerX -
                    line.width / 2 +
                    line.offset,
                line.y,
                line.width,
                line.height
            );

        }

    }


    /* -----------------------------------------------------
       Fragment blocks
    ----------------------------------------------------- */

    for (
        const fragment
        of glitchFragments
    ) {

        if (
            Math.random() <
            0.65
        ) {

            ctx.fillStyle =
                Math.random() > 0.5
                    ? COLORS.pink
                    : "#ffffff";

            ctx.globalAlpha =
                fragment.alpha *
                (1 - progress * 0.3);

            ctx.fillRect(
                fragment.x +
                    fragment.offset *
                    progress,
                fragment.y,
                fragment.width,
                fragment.height
            );

        }

    }


    /* -----------------------------------------------------
       Power flash
    ----------------------------------------------------- */

    if (
        progress > 0.65 &&
        Math.random() < 0.25
    ) {

        ctx.fillStyle =
            `rgba(255,255,255,${random(
                0.03,
                0.14
            )})`;

        ctx.fillRect(
            0,
            0,
            width,
            height
        );

    }


    ctx.restore();

}


/* =========================================================
   DRAW START
========================================================= */

function drawStart(
    time
) {

    const centerX =
        width / 2;

    const centerY =
        height * 0.58;


    const fontSize =
        Math.min(
            width * 0.13,
            135
        );


    const pulse =
        0.75 +
        Math.sin(
            time * 0.004
        ) * 0.25;


    ctx.save();

    ctx.textAlign =
        "center";

    ctx.textBaseline =
        "middle";

    ctx.font =
        `600 ${fontSize}px "Times New Roman", serif`;


    /* -----------------------------------------------------
       Glow
    ----------------------------------------------------- */

    ctx.shadowColor =
        COLORS.yellow;

    ctx.shadowBlur =
        24 +
        pulse * 18;

    ctx.fillStyle =
        COLORS.yellow;

    ctx.globalAlpha =
        0.92;

    ctx.fillText(
        "START",
        centerX,
        centerY
    );


    /* -----------------------------------------------------
       Stronger inner glow
    ----------------------------------------------------- */

    ctx.shadowBlur =
        45;

    ctx.globalAlpha =
        0.22;

    ctx.fillText(
        "START",
        centerX,
        centerY
    );


    ctx.restore();


    /* -----------------------------------------------------
       Update broad clickable area
    ----------------------------------------------------- */

    const measured =
        ctx.measureText(
            "START"
        );

    startArea.x =
        centerX -
        measured.width / 2 -
        45;

    startArea.y =
        centerY -
        fontSize / 2 -
        40;

    startArea.width =
        measured.width +
        90;

    startArea.height =
        fontSize +
        80;

}


/* =========================================================
   WAITING FIRST PULL
========================================================= */

function beginWaitingFirstPull() {

    state =
        STATES.WAITING_FIRST_PULL;

    lamp.on =
        false;

    lamp.glow =
        0;

    lamp.ropeOffset =
        0;

    showFirstPull();

}


/* =========================================================
   FIRST PULL
========================================================= */

function triggerFirstPull() {

    if (
        state !==
        STATES.WAITING_FIRST_PULL
    ) {

        return;

    }


    hideFirstPull();

    lamp.on =
        true;

    lamp.glow =
        1;

    state =
        STATES.GAURAV;

    gauravStart =
        performance.now();


    /*
       GAURAV remains visible
       for exactly 4 seconds.
    */

    setTimeout(
        () => {

            if (
                state ===
                STATES.GAURAV
            ) {

                beginPowerCut();

            }

        },
        4000
    );

}


/* =========================================================
   POWER CUT
========================================================= */

function beginPowerCut() {

    if (
        state !==
        STATES.GAURAV
    ) {

        return;

    }

    state =
        STATES.POWER_CUT;

    powerCutStart =
        performance.now();

    createGlitchData();

    lamp.on =
        false;

    lamp.glow =
        0;

}


/* =========================================================
   FINISH POWER CUT
========================================================= */

function finishPowerCut() {

    state =
        STATES.WAITING_SECOND_PULL;

    secondPullStart =
        performance.now();

    showSecondPull();

}


/* =========================================================
   SECOND PULL
========================================================= */

function triggerSecondPull() {

    if (
        state !==
        STATES.WAITING_SECOND_PULL
    ) {

        return;

    }


    hideSecondPull();

    lamp.on =
        true;

    lamp.glow =
        1;

    state =
        STATES.START;

    startPulse =
        performance.now();

}


/* =========================================================
   START CLICK
========================================================= */

function startClicked(
    clientX,
    clientY
) {

    if (
        state !==
        STATES.START
    ) {

        return false;

    }


    /*
       Use a broad area so the user
       doesn't have to click exactly
       on one pixel.
    */

    const inside =
        clientX >=
            startArea.x &&
        clientX <=
            startArea.x +
                startArea.width &&
        clientY >=
            startArea.y &&
        clientY <=
            startArea.y +
                startArea.height;


    return inside;

}


/* =========================================================
   FINISH INTRO
========================================================= */

function finishIntro() {

    /*
       Prevent duplicate execution.
    */

    if (
        state ===
        STATES.FINISHED
    ) {

        return;

    }


    state =
        STATES.FINISHED;


    hideFirstPull();

    hideSecondPull();


    /*
       Stop intro scrolling lock.
    */

    document.body.classList.remove(
        "intro-active"
    );


    /*
       Show portfolio immediately.
       This avoids relying only on
       CSS timing.
    */

    portfolio.classList.add(
        "show"
    );


    /*
       Force the important visibility
       values as an additional safety
       layer.
    */

    portfolio.style.opacity =
        "1";

    portfolio.style.visibility =
        "visible";

    portfolio.style.transform =
        "translateY(0)";


    /*
       Fade intro away.
    */

    intro.classList.add(
        "hide"
    );


    /*
       Disable intro interaction.
    */

    intro.style.pointerEvents =
        "none";


    /*
       Completely remove intro after
       the fade finishes.
    */

    setTimeout(
        () => {

            intro.style.display =
                "none";

        },
        1200
    );


    /*
       Put user at top of portfolio.
    */

    window.scrollTo(
        0,
        0
    );

}


/* =========================================================
   POINTER DOWN
========================================================= */

canvas.addEventListener(
    "pointerdown",
    function(event) {

        /*
           START stage:
           Clicking anywhere in the broad
           START area opens portfolio.
        */

        if (
            state ===
            STATES.START
        ) {

            if (
                startClicked(
                    event.clientX,
                    event.clientY
                )
            ) {

                finishIntro();

                return;

            }

        }


        /*
           Pull stages.
        */

        if (
            state !==
            STATES.WAITING_FIRST_PULL &&
            state !==
            STATES.WAITING_SECOND_PULL
        ) {

            return;

        }


        const dx =
            event.clientX -
            lamp.x;

        const dy =
            event.clientY -
            (
                lamp.ropeTopY +
                lamp.ropeLength +
                lamp.ropeOffset
            );


        const distance =
            Math.sqrt(
                dx * dx +
                dy * dy
            );


        /*
           User grabbed rope.
        */

        if (
            distance < 80 ||
            (
                Math.abs(dx) < 80 &&
                event.clientY >
                    lamp.ropeTopY
            )
        ) {

            lamp.pulling =
                true;

            lamp.pullStartY =
                event.clientY;

            canvas.setPointerCapture(
                event.pointerId
            );

        }

    }
);


/* =========================================================
   POINTER MOVE
========================================================= */

canvas.addEventListener(
    "pointermove",
    function(event) {

        if (
            !lamp.pulling
        ) {

            return;

        }


        const movement =
            event.clientY -
            lamp.pullStartY;


        lamp.currentPull =
            Math.max(
                0,
                Math.min(
                    lamp.maxPull,
                    movement
                )
            );


        lamp.ropeOffset =
            lamp.currentPull;


        /*
           If rope pulled far enough,
           trigger corresponding action.
        */

        if (
            lamp.currentPull >=
            lamp.maxPull * 0.72
        ) {

            lamp.pulling =
                false;

            lamp.ropeOffset =
                0;


            if (
                state ===
                STATES.WAITING_FIRST_PULL
            ) {

                triggerFirstPull();

            }

            else if (
                state ===
                STATES.WAITING_SECOND_PULL
            ) {

                triggerSecondPull();

            }

        }

    }
);


/* =========================================================
   POINTER UP
========================================================= */

canvas.addEventListener(
    "pointerup",
    function(event) {

        if (
            lamp.pulling
        ) {

            lamp.pulling =
                false;

            lamp.currentPull =
                0;

            lamp.ropeOffset =
                0;

        }


        try {

            canvas.releasePointerCapture(
                event.pointerId
            );

        }

        catch (error) {

            /*
               Safe to ignore.
            */

        }

    }
);


/* =========================================================
   POINTER CANCEL
========================================================= */

canvas.addEventListener(
    "pointercancel",
    function() {

        lamp.pulling =
            false;

        lamp.currentPull =
            0;

        lamp.ropeOffset =
            0;

    }
);


/* =========================================================
   CLICK FALLBACK FOR START
========================================================= */

/*
   This is intentionally separate from
   pointerdown.

   If a browser behaves differently with
   touch/click handling, START still works.
*/

canvas.addEventListener(
    "click",
    function(event) {

        if (
            state !==
            STATES.START
        ) {

            return;

        }


        /*
           If START is visible, use the
           broad hitbox.
        */

        if (
            startClicked(
                event.clientX,
                event.clientY
            )
        ) {

            finishIntro();

        }

    }
);


/* =========================================================
   KEYBOARD ACCESS
========================================================= */

window.addEventListener(
    "keydown",
    function(event) {

        /*
           Enter or Space can activate
           START when it is visible.
        */

        if (
            state ===
            STATES.START &&
            (
                event.key ===
                    "Enter" ||
                event.key ===
                    " " ||
                event.key ===
                    "Spacebar"
            )
        ) {

            event.preventDefault();

            finishIntro();

        }

    }
);


/* =========================================================
   DRAW LOOP
========================================================= */

function animationLoop(
    time
) {

    clearCanvas();


    /* -----------------------------------------------------
       Waiting for first pull
    ----------------------------------------------------- */

    if (
        state ===
        STATES.WAITING_FIRST_PULL
    ) {

        drawLamp();

    }


    /* -----------------------------------------------------
       GAURAV stage
    ----------------------------------------------------- */

    else if (
        state ===
        STATES.GAURAV
    ) {

        drawLamp();

        drawGaurav(
            time
        );

    }


    /* -----------------------------------------------------
       Power cut / glitch
    ----------------------------------------------------- */

    else if (
        state ===
        STATES.POWER_CUT
    ) {

        const elapsed =
            time -
            powerCutStart;

        const duration =
            1050;

        const progress =
            Math.min(
                1,
                elapsed /
                    duration
            );


        /*
           Lamp rapidly loses power.
        */

        lamp.glow =
            Math.max(
                0,
                1 - progress * 2
            );

        drawLamp();

        drawGlitch(
            progress
        );


        if (
            progress >= 1
        ) {

            finishPowerCut();

        }

    }


    /* -----------------------------------------------------
       Waiting for second pull
    ----------------------------------------------------- */

    else if (
        state ===
        STATES.WAITING_SECOND_PULL
    ) {

        drawLamp();

    }


    /* -----------------------------------------------------
       START stage
    ----------------------------------------------------- */

    else if (
        state ===
        STATES.START
    ) {

        drawLamp();

        drawStart(
            time
        );

    }


    /* -----------------------------------------------------
       Finished
    ----------------------------------------------------- */

    else if (
        state ===
        STATES.FINISHED
    ) {

        /*
           Nothing is drawn.
           Portfolio is visible.
        */

    }


    requestAnimationFrame(
        animationLoop
    );

}


/* =========================================================
   START EVERYTHING
========================================================= */

resizeCanvas();

beginWaitingFirstPull();

requestAnimationFrame(
    animationLoop
);


/* =========================================================
   SAFETY: IF USER RETURNS TO PAGE
========================================================= */

window.addEventListener(
    "pageshow",
    function() {

        if (
            state !==
            STATES.FINISHED
        ) {

            document.body.classList.add(
                "intro-active"
            );

        }

    }
);


/* =========================================================
   CONSOLE MESSAGE
========================================================= */

console.log(
    "GAURAV Portfolio loaded successfully."
);