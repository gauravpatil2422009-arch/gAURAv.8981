/* =========================================================
   ELEMENTS
========================================================= */

const intro =
    document.getElementById("intro");

const glitchScreen =
    document.querySelector(".glitch-screen");

const glitchText =
    document.getElementById("glitchText");

const nameContainer =
    document.getElementById("nameContainer");

const stickman =
    document.getElementById("stickman");

const stickmanShadow =
    document.getElementById("stickmanShadow");

const bulbSystem =
    document.getElementById("bulbSystem");

const ceilingWire =
    document.getElementById("ceilingWire");

const controlArea =
    document.getElementById("controlArea");

const lampButton =
    document.getElementById("lampButton");

const lightRays =
    document.getElementById("lightRays");

const startArea =
    document.getElementById("startArea");

const startButton =
    document.getElementById("startButton");

const website =
    document.getElementById("website");


/* =========================================================
   INTRO TIMELINE
========================================================= */

window.addEventListener("load", () => {

    /*
        0 - 1 sec
        Complete darkness.
    */


    /* =====================================================
       GLITCH
    ===================================================== */

    setTimeout(() => {

        glitchScreen.classList.add("active");

        glitchText.classList.add("active");

    }, 1000);


    /* =====================================================
       NAME ENTERS
    ===================================================== */

    setTimeout(() => {

        nameContainer.classList.add("enter");

    }, 1750);


    /* =====================================================
       STICKMAN ENTERS
    ===================================================== */

    setTimeout(() => {

        stickman.classList.add("enter");

        stickmanShadow.classList.add("show");

    }, 2050);


    /* =====================================================
       PUSHING STARTS
    ===================================================== */

    setTimeout(() => {

        stickman.classList.add("pushing");

        nameContainer.classList.add("pushed");

    }, 3300);


    /* =====================================================
       FIRST STRUGGLE
    ===================================================== */

    setTimeout(() => {

        stickman.classList.add("struggle");

    }, 3600);


    /* =====================================================
       SECOND PUSH
    ===================================================== */

    setTimeout(() => {

        nameContainer.style.transform =
            "translate(-50%, -50%) translateX(-7px)";

    }, 3950);


    setTimeout(() => {

        nameContainer.style.transform =
            "translate(-50%, -50%) translateX(3px)";

    }, 4200);


    /* =====================================================
       PUSHING ENDS
    ===================================================== */

    setTimeout(() => {

        stickman.classList.remove("pushing");
        stickman.classList.remove("struggle");

        nameContainer.style.transform =
            "translate(-50%, -50%)";

    }, 4550);


    /* =====================================================
       BULB ARRIVES FROM TOP LEFT
    ===================================================== */

    setTimeout(() => {

        ceilingWire.classList.add("show");

        bulbSystem.classList.add("show");

    }, 4800);


    /* =====================================================
       CONTROL APPEARS
    ===================================================== */

    setTimeout(() => {

        controlArea.classList.add("show");

    }, 5600);

});


/* =========================================================
   MOVE STICKMAN TO BUTTON
========================================================= */

function moveStickmanToButton() {

    const buttonRect =
        lampButton.getBoundingClientRect();

    const stickRect =
        stickman.getBoundingClientRect();


    /*
        We don't hard-code the destination.

        We calculate it from the real button position.
        This makes the animation work much better
        on different screen sizes.
    */

    const currentX =
        stickRect.left + stickRect.width / 2;

    const currentY =
        stickRect.top + stickRect.height;


    const targetX =
        buttonRect.left +
        buttonRect.width / 2 -
        5;


    const targetY =
        buttonRect.top +
        buttonRect.height;


    const distanceX =
        targetX - currentX;

    const distanceY =
        targetY - currentY;


    return {
        distanceX,
        distanceY
    };
}


/* =========================================================
   WALK TO BUTTON
========================================================= */

function walkToButton() {

    const movement =
        moveStickmanToButton();


    stickman.classList.add("walking");


    stickman.style.transition =
        "transform 1.35s cubic-bezier(.16,1,.3,1)";


    /*
        Keep the original vertical positioning
        while moving horizontally.
    */

    stickman.style.transform =
        `translateY(-50%) translateX(${movement.distanceX}px)`;


    stickmanShadow.style.transition =
        "transform 1.35s cubic-bezier(.16,1,.3,1)";


    stickmanShadow.style.transform =
        `translateX(${movement.distanceX}px) scale(1)`;


    setTimeout(() => {

        stickman.classList.remove("walking");

    }, 1350);
}


/* =========================================================
   CROUCH BEFORE JUMP
========================================================= */

function prepareJump() {

    stickman.classList.add("crouch");

}


/* =========================================================
   NATURAL JUMP
========================================================= */

function performJump() {

    const movement =
        moveStickmanToButton();


    stickman.classList.remove("crouch");

    /*
        Force the browser to recognize the crouch
        before starting the jump.
    */

    void stickman.offsetWidth;


    stickman.classList.add("jump");

    stickmanShadow.classList.add("jump-shadow");


    /*
        The jump itself is controlled by CSS.

        The JS calculates where the button is,
        then we use that horizontal distance.
    */

    stickman.style.setProperty(
        "--jump-x",
        `${movement.distanceX}px`
    );


    /*
        Small delay to simulate reaching
        and physically pressing the button.
    */

    setTimeout(() => {

        lampButton.classList.add("pressed");

    }, 820);


    /*
        Button is actually considered pressed
        near the bottom of the jump.
    */

    setTimeout(() => {

        turnOnBulb();

    }, 960);


    /*
        Proper landing.
    */

    setTimeout(() => {

        stickman.classList.remove("jump");

        stickman.classList.remove("crouch");

        stickman.classList.add("land");

        stickman.style.transform =
            `translateY(-50%)
             translateX(${movement.distanceX}px)`;


        stickmanShadow.classList.remove("jump-shadow");

        stickmanShadow.style.transform =
            `translateX(${movement.distanceX}px)
             scale(1)`;


        setTimeout(() => {

            stickman.classList.remove("land");

        }, 500);

    }, 1150);

}


/* =========================================================
   BULB ON
========================================================= */

function turnOnBulb() {

    bulbSystem.classList.add("on");

    lightRays.classList.add("on");


    /*
        Little physical button release.
    */

    setTimeout(() => {

        lampButton.classList.remove("pressed");

    }, 220);


    /*
        Wait for the light to spread before
        revealing START.
    */

    setTimeout(() => {

        startArea.classList.add("visible");

    }, 1250);

}


/* =========================================================
   BUTTON CLICK
========================================================= */

let activated = false;

lampButton.addEventListener("click", () => {

    if (activated) {
        return;
    }

    activated = true;


    /*
        User clicking the button directly still works.
    */

    lampButton.classList.add("pressed");

    turnOnBulb();

});


/* =========================================================
   KEYBOARD ACCESS
========================================================= */

lampButton.addEventListener("keydown", (event) => {

    if (
        event.key === "Enter" ||
        event.key === " "
    ) {

        event.preventDefault();

        lampButton.click();

    }

});


/* =========================================================
   MAKE STICKMAN INTERACT WITH BUTTON
========================================================= */

const originalButtonClick =
    lampButton.onclick;


/*
    Override the automatic intro interaction.

    The user doesn't need to click immediately.
    The stickman will perform the sequence.
*/

setTimeout(() => {

    /*
        Wait until the bulb and button have appeared.
    */

    const autoSequence =
        () => {

            if (activated) {
                return;
            }

            activated = true;


            /* Walk */

            walkToButton();


            /* Crouch */

            setTimeout(() => {

                prepareJump();

            }, 1350);


            /* Jump */

            setTimeout(() => {

                performJump();

            }, 1650);

        };


    autoSequence();

}, 6000);


/* =========================================================
   START BUTTON
========================================================= */

startButton.addEventListener("click", () => {

    startButton.style.transform =
        "scale(0.9)";


    setTimeout(() => {

        startButton.style.transform =
            "scale(1.03)";

    }, 150);


    setTimeout(() => {

        intro.classList.add("hide");

        website.classList.add("show");

        document.body.style.overflow =
            "auto";

    }, 500);

});


/* =========================================================
   PROJECT CARD 3D EFFECT
========================================================= */

const projectCards =
    document.querySelectorAll(".project-card");


projectCards.forEach((card) => {

    card.addEventListener("mousemove", (event) => {

        const rect =
            card.getBoundingClientRect();

        const x =
            event.clientX - rect.left;

        const y =
            event.clientY - rect.top;

        const centerX =
            rect.width / 2;

        const centerY =
            rect.height / 2;

        const rotateX =
            ((y - centerY) / centerY) * -5;

        const rotateY =
            ((x - centerX) / centerX) * 5;

        card.style.transform =
            `perspective(800px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             scale(1.02)`;

    });


    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "perspective(800px) rotateX(0) rotateY(0) scale(1)";

    });

});


/* =========================================================
   SKILL CARD EFFECT
========================================================= */

const skillCards =
    document.querySelectorAll(".skill-card");


skillCards.forEach((card) => {

    card.addEventListener("mouseenter", () => {

        card.style.transform =
            "translateY(-15px) scale(1.03)";

    });


    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "translateY(0) scale(1)";

    });

});