<template>
  <div class="tooltip">
    <slot/>
    <div class="tooltip_text" :class="position">
      {{text}}
    </div>
  </div>
</template>
<script>
export default {
  name: 'TooltipComponent',
  props: {
    text: {
      type: String
    },
    position: {
      type: String,
      default: 'bottom'
    }
  },
}
</script>
<style scoped>
.tooltip {
  display: inline-block;
  position: relative;
  cursor: pointer;
}
.tooltip_text {
  visibility: hidden;
  background: rgb(88, 88, 88);
  color: white;
  text-align: center;
  border-radius: 6px;
  padding: 4px 8px;
  position: absolute;
  z-index: 1;
  font-size: 14px;
  line-height: 20px;
  opacity: 0;
  transition: visibility 0s, opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
  width: max-content;
}
.tooltip:hover .tooltip_text {
  visibility: visible;
  opacity: 1;
}
.bottom {
  left: 50%;
  top: 150%;
  transform: translateX(-50%);
}
.left {
  right: 150%;
  top: 50%;
  transform: translateY(-50%);
}
.right {
  left: 150%;
  top: 50%;
  transform: translateY(-50%);
}
.top {
  bottom: 150%;
  left: 50%;
  transform: translateX(-50%);
}
</style>
