<template>
    <div id="petals-container" class="block fixed top-0 left-0 w-full h-full" z-index="-1">
        <div class="petal" v-for="i in petalNumber" :key="i">
        </div>
    </div>
</template>

<style>
#petals-container {
    overflow-y: hidden;
    overflow-x: hidden;
    pointer-events: none;
}

.petal {
    width: 1.2rem;
    height: auto;
    display: inline-block;
    position: absolute;
    top: -10rem;
    bottom: 0;
    z-index: 150;
}

.petal .rotate {
    animation: driftyRotate 1s infinite both ease-in-out;
    perspective: 1000;
}

.petal .askew {
    background: currentColor;
    /* transform: skewY(10deg); */
    display: block;
    animation: drifty 1s infinite alternate both ease-in-out;
    perspective: 1000;
}

.petal {
    color: rgba(0, 0, 0, 0);
}

.petal:nth-of-type(7n) .askew {
    animation-delay: -.6s;
    animation-duration: 2.25s;
}

.petal:nth-of-type(7n + 1) .askew {
    animation-delay: -.879s;
    animation-duration: 3.5s;
}

.petal:nth-of-type(7n + 2) .askew {
    animation-delay: -.11s;
    animation-duration: 1.95s;
}

.petal:nth-of-type(7n + 3) .askew {
    animation-delay: -.246s;
    animation-duration: .85s;
}

.petal:nth-of-type(7n + 4) .askew {
    animation-delay: -.43s;
    animation-duration: 2.5s;
}

.petal:nth-of-type(7n + 5) .askew {
    animation-delay: -.56s;
    animation-duration: 1.75s;
}

.petal:nth-of-type(7n + 6) .askew {
    animation-delay: -.76s;
    animation-duration: 1.5s;
}

.petal:nth-of-type(9n) .rotate {
    animation-duration: 2s;
}

.petal:nth-of-type(9n + 1) .rotate {
    animation-duration: 2.3s;
}

.petal:nth-of-type(9n + 2) .rotate {
    animation-duration: 1.1s;
}

.petal:nth-of-type(9n + 3) .rotate {
    animation-duration: 1.1s;
}

.petal:nth-of-type(9n + 4) .rotate {
    animation-duration: 4.3s;
}

.petal:nth-of-type(9n + 5) .rotate {
    animation-duration: 3.05s;
}

.petal:nth-of-type(9n + 6) .rotate {
    animation-duration: 2.76s;
}

.petal:nth-of-type(9n + 7) .rotate {
    animation-duration: 3.6s;
}

.petal:nth-of-type(9n + 8) .rotate {
    animation-duration: 1.78s;
}

/* .petal:nth-of-type(n) .askew {
    opacity: .7;
}
.petal:nth-of-type(3n+1) .rotate {
    opacity: .5;
}
.petal:nth-of-type(3n+2) .askew {
    opacity: .3;
} */

@keyframes drifty {
    0% {
        transform: skewY(10deg) translate3d(-50%, 0, 0) rotateZ(0deg);
        display: block;
    }

    100% {
        transform: skewY(-12deg) translate3d(350%, 0, 0) rotateZ(90deg);
        display: block;
    }
}

@keyframes driftyRotate {
    0% {
        transform: rotateX(0) rotateY(0) rotateZ(0);
        display: block;
    }

    100% {
        transform: rotateX(359deg) rotateY(45) rotateZ(75);
        display: block;
    }
}
</style>

<script>
//turn the code above into vue
export default {
    data() {
        return {
            petalPlayers: [],
            // imgSrc: '/asset/plum.svg',
            //get all svg files in the asset folder
            imgSrc: [],
            petalNumber: 70
        }
    },
    methods: {
        animatePetals() {
            //get all petals and check if the browser supports Web Animations API
            var petals = document.querySelectorAll('.petal');

            if (!petals[0].animate) {
                var petalsContainer = document.getElementById('petals-container');
                petalsContainer.prepend("Uh oh, it seems like your browser doesn't support Web Animations API yet. Have you tried this in Firefox or Chrome?");
                return false;
            }

            for (var i = 0, len = petals.length; i < len; ++i) {
                var petal = petals[i];
                var image = Math.floor(Math.random() * this.imgSrc.length);
                petal.innerHTML = '<div class="rotate"><img src="' + this.imgSrc[image] + '" class="askew"></div>';
                // petal.innerHTML = '<div class="rotate"><img src="' + this.imgSrc + '" class="askew"></div>';
                var scale = Math.random() * 0.8 + .4;


                var player = petal.animate([
                    { transform: 'translate3d(' + (i / len * 100 + 30) + 'vw,' + (i / len * 60) + 'vh,0) scale(' + scale + ')', opacity: scale },
                    { transform: 'translate3d(' + (i / len * -50) + 'vw,170vh,0) scale(' + scale + ')', opacity: 0 }
                ], {
                    duration: Math.random() * 60000 + 3000,
                    iterations: Infinity,
                    delay: -(Math.random() * 5000)
                });
                this.petalPlayers.push(player);
            }
        }
    },
    mounted() {
        const folder = '/assets/plum/'
        for (let i = 1; i <= 16; i++) {
            this.imgSrc.push(folder + 'plum' + i + '.svg')
        }
        this.animatePetals();
    }
}
</script>