<template>
    <div>
        <h2>Customise</h2>
        <h2>Customise</h2>
        <h2>Customise</h2>
        <h2>Customise</h2>
        <h2>Customise</h2>
        <h2>Customise</h2>
        <button @click="saveLogoObject">dkjkljklj</button>
    </div>
</template>

<script>

export default {
  name: 'Customise',
  components: {
 
  },
  data: () => ({

  }),
  methods:{
   saveLogoObject() {
       let localStorage = window.localStorage.getItem('localStorage');
       let viewStorage = [];
       viewStorage.push(localStorage);
        /* eslint-disable no-console */
       console.log(viewStorage);
       window.localStorage.setItem('viewStorage', JSON.stringify({viewStorage}));
   }
  }
};
</script>
<style lang="scss" scoped>
   
</style>