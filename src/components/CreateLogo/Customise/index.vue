<template>
    <div>
        <button @click="saveLogoObject">dkjkljklj</button>
    </div>
</template>

<script>

    export default {
        name: 'Customise',
        components: {},
        data: () => ({}),
        methods:{
            saveLogoObject() {
                let localStorage = window.localStorage.getItem('localStorage');
                let viewStorage = [];
                viewStorage.push(localStorage);
                /* eslint-disable no-console */
                window.localStorage.setItem('viewStorage', JSON.stringify({viewStorage}));
            }
        }
    };

</script>

<style lang="scss" scoped>
    @import '../../../style/customise.scss'
</style>
