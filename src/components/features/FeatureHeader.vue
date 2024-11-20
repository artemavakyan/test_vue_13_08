<template>
  <header class="header py-6 shadow-custom">
    <div class="c-container flex gap-4 justify-between">
      <img class="w-[100px] h-auto object-contain" src="@/assets/images/logo.jpg" alt="">
      <ul class="flex gap-4 items-center text-textGray">
        <li>
          <router-link to="/">
            Форма
          </router-link>
        </li>
        <li>
          <router-link to="/preview">
            Превью
          </router-link>
        </li>
      </ul>
      <span></span>
    </div>
  </header>
</template>

<style scoped lang="postcss">
.router-link-active {
  @apply text-primary;
}

</style>
