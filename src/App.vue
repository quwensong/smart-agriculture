<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
// import axios from 'axios'
export default {
  name: "App",
  mounted(){
    // axios.get('/v1/dict/all')
	  //   .then(res => {
	  //     console.log('333',res.data)
	  //   })
	  //   .catch(err => {
	  //     console.error(err); 
	  //   })
  }
};
</script>
<style lang="scss" scoped>
#app {
  width: 100%;
  height: 100%;
}
</style>
