const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function firstpageanim() {
    var tl = gsap.timeline();
    tl.from("#nav", {
        y: "-10",
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut
    })

        .to(".boundingelem", {
            y: "0",
            ease: Expo.easeInOut,
            duration: 1.5,
            delay: -1,
            stagger: .2
        })
        .from("#herofooter", {
            y: -10,
            opacity: 0,
            duration: 1.5,
            ease: Expo.easeInOut,
            delay: -1
        })
}
firstpageanim();

var timeout;
function circleskew() {

    let xscale = 1;
    let yscale = 1;

    let xprev = 0;
    let yprev = 0;
    window.addEventListener("mousemove", function (dets) {

        clearTimeout(timeout);

        xscale = gsap.utils.clamp(.8, 1.2, dets.clientX - xprev);
        yscale = gsap.utils.clamp(.8, 1.2, dets.clientY - yprev);


        xprev = dets.clientX;
        yprev = dets.clientY;

        circlemouseFollow(xscale, yscale);

        timeout = setTimeout(function () {
            document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1`;

        }, 100)

    })
}

circleskew();

function circlemouseFollow(xscale, yscale) {
    window.addEventListener("mousemove", function (dets) {
        document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale}`;
    })
}
circlemouseFollow();


// second page animation

document.querySelectorAll(".elem")
.forEach(function(elem){
    let rotate = 0;
    let diffrot = 0;

    elem.addEventListener("mouseleave", function (details) {
        gsap.to(elem.querySelector("img"), {
          opacity: 0,
          ease: Power3,
          duration: 0.5,
        });
      });

    elem.addEventListener("mousemove", function(details){

        let diff = details.clientY - elem.getBoundingClientRect().top;
        diffrot = details.clientX - rotate;
        rotate = details.clientX;
       gsap.to(elem.querySelector("img"), {
        opacity: 1,
        ease: Power3,
        top: diff,
        left: details.clientX,
        rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5)
       })
    });
});