<template>
   <div class="w-full h-full overflow-hidden">
    <div class="night pr-4 pl-4 ml-42">
  <div class="shooting_star"></div>
  <div class="shooting_star"></div>
  <div class="shooting_star"></div>
  <div class="shooting_star"></div>
  <div class="shooting_star"></div>
  <div class="shooting_star"></div>
  <div class="shooting_star"></div>
  <div class="shooting_star"></div>
  <div class="shooting_star"></div>
  <div class="shooting_star"></div>
  <div class="shooting_star"></div>
  <div class="shooting_star"></div>
  <div class="shooting_star"></div>
  <div class="shooting_star"></div>
  <div class="shooting_star"></div>
  <div class="shooting_star"></div>
  <div class="shooting_star"></div>
  <div class="shooting_star"></div>
  <div class="shooting_star"></div>
  <div class="shooting_star"></div>
  </div>
   </div>
</template>

    <style scoped>
.night {
  position: absolute;
  width: 100%;
  height: 100%;
  transform: rotateZ(45deg);
}

.shooting_star {
  position: absolute;
  left: 50%;
  top: 50%;
  height: 2px;
  background: linear-gradient(-45deg, #e27516, rgba(0, 0, 255, 0));
  border-radius: 999px;
  filter: drop-shadow(0 0 6px #dc2e07);
  -webkit-animation: tail 3000ms ease-in-out infinite, shooting 3000ms ease-in-out infinite;
          animation: tail 3000ms ease-in-out infinite, shooting 3000ms ease-in-out infinite;
}
.shooting_star::before {
  content: "";
  position: absolute;
  top: calc(50% - 1px);
  right: 0;
  height: 2px;
  background: linear-gradient(-45deg, rgba(0, 0, 255, 0), #e25d16, rgba(0, 0, 255, 0));
  transform: translateX(50%) rotateZ(45deg);
  border-radius: 100%;
  -webkit-animation: shining 3000ms ease-in-out infinite;
          animation: shining 3000ms ease-in-out infinite;
}
.shooting_star::after {
  content: "";
  position: absolute;
  top: calc(50% - 1px);
  right: 0;
  height: 2px;
  background: linear-gradient(-45deg, rgba(0, 0, 255, 0), #e29e16, rgba(0, 0, 255, 0));
  transform: translateX(50%) rotateZ(45deg);
  border-radius: 100%;
  -webkit-animation: shining 3000ms ease-in-out infinite;
          animation: shining 3000ms ease-in-out infinite;
  transform: translateX(50%) rotateZ(-45deg);
}

.shooting_star:nth-child(1) {
  top: calc(50% - 200px);
  left: calc(50% - 84px);
  -webkit-animation-delay: 8922ms;
          animation-delay: 8922ms;
}
.shooting_star:nth-child(1)::before, .shooting_star:nth-child(1)::after {
  -webkit-animation-delay: 8922ms;
          animation-delay: 8922ms;
}
.shooting_star:nth-child(2) {
  top: calc(50% - 119px);
  left: calc(50% - 273px);
  -webkit-animation-delay: 4666ms;
          animation-delay: 4666ms;
}
.shooting_star:nth-child(2)::before, .shooting_star:nth-child(2)::after {
  -webkit-animation-delay: 4666ms;
          animation-delay: 4666ms;
}
.shooting_star:nth-child(3) {
  top: calc(50% - -23px);
  left: calc(50% - 214px);
  -webkit-animation-delay: 4908ms;
          animation-delay: 4908ms;
}
.shooting_star:nth-child(3)::before, .shooting_star:nth-child(3)::after {
  -webkit-animation-delay: 4908ms;
          animation-delay: 4908ms;
}
.shooting_star:nth-child(4) {
  top: calc(50% - 140px);
  left: calc(50% - 256px);
  -webkit-animation-delay: 587ms;
          animation-delay: 587ms;
}
.shooting_star:nth-child(4)::before, .shooting_star:nth-child(4)::after {
  -webkit-animation-delay: 587ms;
          animation-delay: 587ms;
}
.shooting_star:nth-child(5) {
  top: calc(50% - -127px);
  left: calc(50% - 72px);
  -webkit-animation-delay: 4601ms;
          animation-delay: 4601ms;
}
.shooting_star:nth-child(5)::before, .shooting_star:nth-child(5)::after {
  -webkit-animation-delay: 4601ms;
          animation-delay: 4601ms;
}
.shooting_star:nth-child(6) {
  top: calc(50% - -125px);
  left: calc(50% - 298px);
  -webkit-animation-delay: 110ms;
          animation-delay: 110ms;
}
.shooting_star:nth-child(6)::before, .shooting_star:nth-child(6)::after {
  -webkit-animation-delay: 110ms;
          animation-delay: 110ms;
}
.shooting_star:nth-child(7) {
  top: calc(50% - 200px);
  left: calc(50% - 72px);
  -webkit-animation-delay: 6192ms;
          animation-delay: 6192ms;
}
.shooting_star:nth-child(7)::before, .shooting_star:nth-child(7)::after {
  -webkit-animation-delay: 6192ms;
          animation-delay: 6192ms;
}
.shooting_star:nth-child(8) {
  top: calc(50% - 161px);
  left: calc(50% - 186px);
  -webkit-animation-delay: 492ms;
          animation-delay: 492ms;
}
.shooting_star:nth-child(8)::before, .shooting_star:nth-child(8)::after {
  -webkit-animation-delay: 492ms;
          animation-delay: 492ms;
}
.shooting_star:nth-child(9) {
  top: calc(50% - -42px);
  left: calc(50% - 90px);
  -webkit-animation-delay: 8551ms;
          animation-delay: 8551ms;
}
.shooting_star:nth-child(9)::before, .shooting_star:nth-child(9)::after {
  -webkit-animation-delay: 8551ms;
          animation-delay: 8551ms;
}
.shooting_star:nth-child(10) {
  top: calc(50% - 7px);
  left: calc(50% - 223px);
  -webkit-animation-delay: 3943ms;
          animation-delay: 3943ms;
}
.shooting_star:nth-child(10)::before, .shooting_star:nth-child(10)::after {
  -webkit-animation-delay: 3943ms;
          animation-delay: 3943ms;
}
.shooting_star:nth-child(11) {
  top: calc(50% - -58px);
  left: calc(50% - 34px);
  -webkit-animation-delay: 1791ms;
          animation-delay: 1791ms;
}
.shooting_star:nth-child(11)::before, .shooting_star:nth-child(11)::after {
  -webkit-animation-delay: 1791ms;
          animation-delay: 1791ms;
}
.shooting_star:nth-child(12) {
  top: calc(50% - 124px);
  left: calc(50% - 178px);
  -webkit-animation-delay: 5010ms;
          animation-delay: 5010ms;
}
.shooting_star:nth-child(12)::before, .shooting_star:nth-child(12)::after {
  -webkit-animation-delay: 5010ms;
          animation-delay: 5010ms;
}
.shooting_star:nth-child(13) {
  top: calc(50% - -62px);
  left: calc(50% - 213px);
  -webkit-animation-delay: 6066ms;
          animation-delay: 6066ms;
}
.shooting_star:nth-child(13)::before, .shooting_star:nth-child(13)::after {
  -webkit-animation-delay: 6066ms;
          animation-delay: 6066ms;
}
.shooting_star:nth-child(14) {
  top: calc(50% - 200px);
  left: calc(50% - 210px);
  -webkit-animation-delay: 7657ms;
          animation-delay: 7657ms;
}
.shooting_star:nth-child(14)::before, .shooting_star:nth-child(14)::after {
  -webkit-animation-delay: 7657ms;
          animation-delay: 7657ms;
}
.shooting_star:nth-child(15) {
  top: calc(50% - -53px);
  left: calc(50% - 119px);
  -webkit-animation-delay: 9150ms;
          animation-delay: 9150ms;
}
.shooting_star:nth-child(15)::before, .shooting_star:nth-child(15)::after {
  -webkit-animation-delay: 9150ms;
          animation-delay: 9150ms;
}
.shooting_star:nth-child(16) {
  top: calc(50% - -187px);
  left: calc(50% - 84px);
  -webkit-animation-delay: 7601ms;
          animation-delay: 7601ms;
}
.shooting_star:nth-child(16)::before, .shooting_star:nth-child(16)::after {
  -webkit-animation-delay: 7601ms;
          animation-delay: 7601ms;
}
.shooting_star:nth-child(17) {
  top: calc(50% - 136px);
  left: calc(50% - 55px);
  -webkit-animation-delay: 1865ms;
          animation-delay: 1865ms;
}
.shooting_star:nth-child(17)::before, .shooting_star:nth-child(17)::after {
  -webkit-animation-delay: 1865ms;
          animation-delay: 1865ms;
}
.shooting_star:nth-child(18) {
  top: calc(50% - 142px);
  left: calc(50% - 260px);
  -webkit-animation-delay: 8385ms;
          animation-delay: 8385ms;
}
.shooting_star:nth-child(18)::before, .shooting_star:nth-child(18)::after {
  -webkit-animation-delay: 8385ms;
          animation-delay: 8385ms;
}
.shooting_star:nth-child(19) {
  top: calc(50% - -46px);
  left: calc(50% - 230px);
  -webkit-animation-delay: 535ms;
          animation-delay: 535ms;
}
.shooting_star:nth-child(19)::before, .shooting_star:nth-child(19)::after {
  -webkit-animation-delay: 535ms;
          animation-delay: 535ms;
}
.shooting_star:nth-child(20) {
  top: calc(50% - 59px);
  left: calc(50% - 250px);
  -webkit-animation-delay: 2404ms;
          animation-delay: 2404ms;
}
.shooting_star:nth-child(20)::before, .shooting_star:nth-child(20)::after {
  -webkit-animation-delay: 2404ms;
          animation-delay: 2404ms;
}

@-webkit-keyframes tail {
  0% {
    width: 0;
  }
  30% {
    width: 100px;
  }
  100% {
    width: 0;
  }
}

@keyframes tail {
  0% {
    width: 0;
  }
  30% {
    width: 100px;
  }
  100% {
    width: 0;
  }
}
@-webkit-keyframes shining {
  0% {
    width: 0;
  }
  50% {
    width: 30px;
  }
  100% {
    width: 0;
  }
}
@keyframes shining {
  0% {
    width: 0;
  }
  50% {
    width: 30px;
  }
  100% {
    width: 0;
  }
}
@-webkit-keyframes shooting {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(300px);
  }
}
@keyframes shooting {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(300px);
  }
}
@-webkit-keyframes sky {
  0% {
    transform: rotate(45deg);
  }
  100% {
    transform: rotate(405deg);
  }
}
@keyframes sky {
  0% {
    transform: rotate(45deg);
  }
  100% {
    transform: rotate(405deg);
  }
}

</style>