<template>
    <div class="cube-loader select-none">
        <div class="cube-top"></div>
        <div class="cube-wrapper">
    <span class="cube-span" style="--i:0">
      <span style="text-align: center; font-size: 50px;" class="taco-container">🍕</span>
    </span>
            <span class="cube-span" style="--i:1">
      <span style="text-align: center; font-size: 50px;" class="taco-container">🍔</span>
    </span>
            <span class="cube-span" style="--i:2">
      <span style="text-align: center; font-size: 50px;" class="taco-container">🍗</span>
    </span>
            <span class="cube-span" style="--i:3">
      <span style="text-align: center; font-size: 50px;" class="taco-container">🍩</span>
    </span>
        </div>
    </div>
</template>

<style>

.cube-loader {
    position: relative;
    width: 77px;
    height: 76px;
    transform-style: preserve-3d;
    transform: rotateX(-30deg);
    animation: animate 4s linear infinite;
}

@keyframes animate {
    0% {
        transform: rotateX(-30deg) rotateY(0);
    }

    100% {
        transform: rotateX(-30deg) rotateY(360deg);
    }
}

.cube-loader .cube-wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
}

.dark {
    .cube-loader .cube-wrapper .cube-span {
        background: -webkit-linear-gradient(90deg, hsla(230, 42%, 26%, 0.85) 1%, hsla(258, 34%, 57%, 0.85) 99%);
    }

    .cube-top {
        background: -webkit-linear-gradient(90deg, hsla(230, 42%, 26%, 0.85) 1%, hsla(258, 34%, 57%, 0.85) 99%);
    }

    .cube-top::before {
        background: -webkit-linear-gradient(90deg, hsla(230, 42%, 26%, 0.85) 1%, hsla(258, 34%, 57%, 0.85) 99%);
    }
}

.cube-loader .cube-wrapper .cube-span {
    position: absolute;
    width: 100%;
    height: 100%;
    transform: rotateY(calc(90deg * var(--i))) translateZ(38px);
    background: -webkit-linear-gradient(90deg, hsla(230, 39%, 41%, 0.85) 1%, hsla(257, 47%, 55%, 0.85) 99%);
}

.cube-top {
    position: absolute;
    width: 77px;
    height: 76px;
    background: -webkit-linear-gradient(90deg, hsla(230, 39%, 41%, 0.85) 1%, hsla(257, 47%, 55%, 0.85) 99%);
    transform: rotateX(90deg) translateZ(38px);
    transform-style: preserve-3d;
}

.cube-top::before {
    content: '';
    position: absolute;
    width: 77px;
    height: 76px;
    background: -webkit-linear-gradient(90deg, hsla(230, 39%, 41%, 0.85) 1%, hsla(257, 47%, 55%, 0.85) 99%);
    transform: translateZ(-90px);
    filter: blur(10px);
}

</style>