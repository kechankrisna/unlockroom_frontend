<template>
  <div></div>
</template>

<script>
export default {
  layout: "dashboard",
  middleware: ["dashboard"],
  head() {
    return {
      title: `Administration Dashboard`,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "description",
          name: "description",
          content: `Login into your account in ${this.title}`
        }
      ]
    };
  }
};
</script>