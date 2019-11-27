<script>
export default {
  name: 'MeetupCard',
  props: ['meetup'],
  computed: {
    meetupUrl() {
      return `/meetup/${this.meetup._id}`
    }
  }
}
</script>

<template lang="pug">
article.card
  img(:src="`https://picsum.photos/300/200?random=${meetup._id}`", alt="")
  h2.card-title 
    router-link(:to="meetupUrl") {{ meetup.name }} 
  p {{ meetup.location }}
</template>

<style scoped>
.card {
  display: inline-block;
  text-align: left;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 3px;
  margin: 20px;
  min-width: 200px;
}
</style>