<template>
  <div :class="'keypad-dialog ' + animation">
    <div class="keypad-container">
      <template v-for="n in 12">
        <div :key="n" class="keypad-flex keypad-class">
          <div v-if="n == 10 && onReset" class="keypad" @click="onReset">
            <el-button type="info" plain class="keypad-center">
              <strong class="keypad-delete"><i class="el-icon-delete" /></strong>
            </el-button>
          </div>
          <div
            v-if="n != 10 && n != 12"
            class="keypad"
            @click="(n==11)?onInput(0):onInput(n)"
          >
            <el-button v-if="n < 10" type="info" plain class="keypad-center">{{ n }}</el-button>
            <el-button v-if="n == 11" type="info" plain class="keypad-center">0</el-button>
          </div>
          <div v-if="n == 12 && onDelete" class="keypad" @click="onDelete(n)">
            <el-button v-if="n == 12" type="info" plain class="keypad-center">
              <strong class="keypad-delete"><i class="el-icon-back" /></strong>
            </el-button>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Numpad',
  props: {
    keypadClass: { type: String, default: 'keypad-class', required: false },
    show: { type: Boolean, default: true, required: false },
    close: { type: String, default: 'Close', required: false },
    onInput: { type: Function, required: true },
    onDelete: { type: Function, default: null, required: false },
    onReset: { type: Function, default: null, required: false }
  },
  data: () => ({
    n: 0,
    animation: 'keypad-hide'
  }),
  watch: {
    show() {
      this.animation === 'slideInUp'
        ? (this.animation = 'slideOutDown')
        : (this.animation = 'slideInUp')
    }
  },
  mounted() {
    this.show ? (this.animation = 'slideInUp') : (this.animation = 'hide')
  },
  methods: {
    closeMe() {
      this.animation = 'slideOutDown'
    }
  }
}
</script>

<style>
.keypad-hide {
  visibility: hidden;
}

.keypad-class {
  color: #888;
  background: #304156;
}

.keypad-dialog {
  width: 100%;
}

.keypad-container {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-flex: 1;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  min-width: 0;
  flex-direction: row;
}

.keypad-value {
  width: 100%;
  text-align: right;
}

.keypad-flex {
  flex-basis: 33.3%;
  -webkit-box-flex: 0;
  -ms-flex-positive: 0;
  flex-grow: 0;
  max-width: 33.3%;
  min-height: 4rem;
}

.keypad {
  width: 100%;
  height: 100%;
  text-align: center;
  vertical-align: center;
  margin: 0 auto;
}

.keypad-center {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  font-size: 2rem;
  width: 100%;
  height: 100%;
  border-radius: 0px;
}

.keypad-delete {
  font-size: 1.5rem;
}
.slideInUp {
  -webkit-animation-name: slideInUp;
  animation-name: slideInUp;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}
@-webkit-keyframes slideInUp {
  0% {
    -webkit-transform: translateY(100%);
    transform: translateY(100%);
    visibility: visible;
  }
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
}
@keyframes slideInUp {
  0% {
    -webkit-transform: translateY(100%);
    transform: translateY(100%);
    visibility: visible;
  }
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
}

.slideOutDown {
  -webkit-animation-name: slideOutDown;
  animation-name: slideOutDown;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}
@-webkit-keyframes slideOutDown {
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
  100% {
    visibility: hidden;
    -webkit-transform: translateY(100%);
    transform: translateY(100%);
  }
}
@keyframes slideOutDown {
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
  100% {
    visibility: hidden;
    -webkit-transform: translateY(100%);
    transform: translateY(100%);
  }
}
</style>
