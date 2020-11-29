<template>
  <div class="user-card box-card">
    <div class="user-card-head">
      <img class="thumbnail-s" src="~/assets/images/dummy/user/user_1.png">
      <div class="user-card-head-content">
        <h3>ガパ男</h3>
        <star />
      </div>
    </div>
    <div class="user-card-description">
      <p>
        テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります...
      </p>
    </div>
    <dl class="user-card-info">
      <dt>得意なこと</dt>
      <dd><span>グラフィックデザイン</span><span>Webデザイン</span></dd>
    </dl>
    <dl class="user-card-info">
      <dt>学びたいコト</dt>
      <dd><span>グラフィックデザイン</span><span>Webデザイン</span></dd>
    </dl>
  </div>
</template>

<script>
  import Star from './Star'

  export default {
    name: 'UserCard',
    components: {Star}
  }
</script>

<style scoped lang="scss">
  .user-card-head {
    display: flex;
    align-items: center;
    margin-bottom: $size-m;
  }

  .user-card-head-content {
    flex-grow: 1;
    margin-left: $size-m;
  }

  .user-card-description {
    font-size: $font-size-12;
    overflow: hidden;
    width: 100%;
    p {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
    }
  }

  .user-card-info {
    font-size: $font-size-12;
    margin-top: $size-m;
    dt {
      font-weight: bold;
    }
    dd {
      display: flex;
      flex-wrap: wrap;
      font-size: $font-size-10;
      span {
        background: $color-gray;
        margin: $size-s $size-s 0 0;
        padding: $size-xs $size-s;
      }
    }
  }
</style>
