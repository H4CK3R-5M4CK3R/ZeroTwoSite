window.ScrubGSAPTimeline = function (d) {
    document.body.childNodes.forEach(function (a) { a.style && (a.style.pointerEvents = "none") }); var g = gsap.timeline(); if ("[object Array]" === Object.prototype.toString.call(d)) for (var h = d.length; -1 < --h;)g.add(d[h], 0); else g = d; (function (a) {
        var k = function (c) { b.innerHTML = parseFloat(a.time()).toFixed(2); a.pause(); a.progress(c.clientX / window.innerWidth); e = c.clientX; f = c.clientY; gsap.set(b, { x: e >= window.innerWidth - 48 ? e - 48 : e, y: 20 >= f ? f + 20 : f - 20 }) }, l = function (c) {
            a.pause(); a.play(0);
            gsap.set(b, { autoAlpha: 1 })
        }, m = function (c) { a.play(c.clientX / window.innerWidth * a.duration()); gsap.set(b, { autoAlpha: 0 }) }, b = document.createElement("div"), e, f; b.style.cssText = "position:fixed;border-radius:4px;font-size:14px;padding:5px;user-select:none;pointer-events:none;text-align:center;color:#53A018;top:0;left:0;font-family:Helvetica, Arial, sans-serif;background-color:#262626;line-height:1 !important;z-index:99999999"; document.body.appendChild(b); document.body.onmousemove = k; document.body.onmouseover =
            l; document.body.onmouseout = m; document.body.ondblclick = function (c) { document.body.onmousemove ? (gsap.to(b, { duration: .2, color: "#A31632" }), document.body.onmousemove = null, document.body.onmouseover = null, document.body.onmouseout = null, a.pause()) : (gsap.to(b, { duration: .2, color: "#53A018" }), document.body.onmousemove = k, document.body.onmouseover = l, document.body.onmouseout = m) }
    })(g)
};

function showLoading() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.style.display = 'flex';
    }
}

function hideLoading() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.style.display = 'none';
    }
}

gsap.config({ trialWarn: false });
let select = s => document.querySelector(s),
    toArray = s => gsap.utils.toArray(s),
    mainSVG = select('#mainSVG'),
    allBars = toArray('.bar'),
    allSweeps = toArray('.sweep'),
    barHeight = 62,
    nodeHeight = 24,
    mainTl = gsap.timeline({ repeat: -1 })

gsap.set('svg', {
    visibility: 'visible'
})
allBars.forEach((c, i) => {
    gsap.set(c, {
        transformOrigin: '50% 90%',
        y: (i * ((barHeight * 2 - nodeHeight)))
    })
    gsap.set(allSweeps[i], {
        attr: {
        }
    })
    let tl = gsap.timeline();
    tl.to(c, {
        rotation: i % 2 ? '-=180' : '+=180',
        duration: 2,
        ease: 'elastic(0.7, 0.4)'
    })
        .to(allSweeps[i], {
            duration: 2,
            transformOrigin: '50% 50%',
            ease: 'linear'
        }, 0)
        .fromTo(allSweeps[i], {
            drawSVG: '25% 25%',
        }, {
            stroke: '#FFE66D',
            strokeWidth: 4,
            duration: 1,
            drawSVG: i % 2 ? '25% 75%' : '-75% -125%',
            ease: 'power1.in'
        }, 0)
        .to(allSweeps[i], {
            duration: 1,
            drawSVG: i % 2 ? '125% 125%' : '-125% -125%',
            ease: 'power4'
        }, '-=1')
    mainTl.add(tl, i * 0.26)
})
gsap.set('#allBars', {
    rotation: -90,
    transformOrigin: '50% 50%'
})
let moveTl = gsap.timeline();
moveTl.to('#allBars', {
    x: `-=${(53 - nodeHeight / 2)}`,
    ease: 'linear',
    duration: mainTl.duration()
})
mainTl.add(moveTl, 0)
gsap.globalTimeline.timeScale(0.82)
