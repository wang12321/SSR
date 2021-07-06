<template>
  <div class="error-container">
    <div class="error-container-wrapper">
      <div class="site-content">
        <p class="not-found-desc">
          抱歉！您访问的页面<em>失联</em>啦 ...
        </p>
        <nuxt-link to="/" class="not-found-btn-gohome" style="color: royalblue">
          返 回 首 页
        </nuxt-link>
        <!-- <nuxt></nuxt> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
.error-container {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
}
.error-container .error-container-wrapper {
  padding: 0;
  margin: 0;
  background-color: #fff;
}
.error-container .error-container-wrapper .site-content {
  position: fixed;
  top: 15%;
  left: 50%;
  z-index: 2;
  padding: 30px;
  text-align: center;
  transform: translate(-50%, 0);
}
.error-container .error-container-wrapper .not-found-title {
  margin: 20px 0 15px;
  font-size: 10em;
  font-weight: 400;
  color: rgb(55, 71, 79);
}
.error-container .error-container-wrapper .not-found-desc {
  margin: 0 0 30px;
  font-size: 26px;
  text-transform: uppercase;
  color: rgb(118, 131, 143);
}
.error-container .error-container-wrapper .not-found-desc > em {
  font-style: normal;
  color: #ee8145;
}
.error-container .error-container-wrapper .not-found-btn-gohome {
  margin-left: 30px;
}
</style>
