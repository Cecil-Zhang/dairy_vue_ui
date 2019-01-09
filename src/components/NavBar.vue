<template>
  <div>
    <b-nav pills fill>
        <b-nav-item :to="'/diary'">Diary Home</b-nav-item>
        <b-nav-item :to="'/diary/write'">Write</b-nav-item>
    </b-nav>
    <b-row>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>
