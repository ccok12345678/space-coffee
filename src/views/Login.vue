<template lang="pug">
.container-fluid.d-flex.flex-column.align-items-center.vh-100
  .text-brand.text-light.text-center.mt-auto
    h1.m-0 Space Coffee
    p.fs-5 Admin Login
  main.card.mb-auto.border-0.overflow-hidden
    .card-body.d-flex.flex-column
      img.mx-auto(src="@/assets/images/ufo-catch-cow.svg" width="100")
      form.d-flex.flex-column
        .my-3
          label.form-label.fw-bold(for="login_email") 登入信箱：
          input#login_email.form-control(type="email" placeholder="✉" required)
        .mb-3
          label.form-label.fw-bold(for="login_password") 密碼：
          input#login_password.form-control(type="password" placeholder="🔒︎"
            autocomplete="current-password" required)
        button.btn.btn-outline-blue.d-block(type="button")
          i.bi.bi-door-open.me-1
          span 登入
</template>

<style lang="scss" scoped>
.container-fluid {
  background: radial-gradient(at top left, #51bbd6, #020b5f);
}
.card {
  width: 40%;
  backdrop-filter: blur(5px);

  @media (max-width: 768px) {
    width: 55%;
  }
  @media (max-width: 576px) {
    width: 75%;
  }
  @media (max-width: 575.98px) {
    width: 100%;
  }
}

img:hover {
  animation: fly_away;
  animation-duration: 3s;
  animation-fill-mode: forwards;
}

@keyframes fly_away {
  0% {
    transform: translateY(0px);
    transform: translateX(0px);
  }
  25% {
    transform: translateY(-10px) translateX(10px) rotate(25deg);
  }
  50% {
    transform: translateY(-20px) translateX(10px);
  }
  75% {
    transform: translateY(-30px) translateX(-5px) rotate(-10deg);
  }
  100% {
    transform: translateY(-130px) translateX(0px);
  }
}
</style>
