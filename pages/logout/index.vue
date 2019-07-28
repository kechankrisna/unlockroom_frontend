<template>
    <div>
        
    </div>
</template>

<script>
export default {
    middleware: ['auth'],
    mounted() {
        this.$auth.logout();
    },
}
</script>