<template>
    <div class="loader">
      <div class="loadingio-spinner-dual-ring-nq4q5u6dq7r">
        <div class="ldio-x2uulkbinbj">
          <div></div>
          <div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "GlobalLoader",
    created() { },
    data() {
      return {};
    },
    props: {},
    methods: {},
  };
  </script>
  
  <style lang="scss" scoped>
  @keyframes loaderParts {
    0% {
      opacity: 1
    }
  
    100% {
      opacity: 0
    }
  }
  
  .loader {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
  }
  
  @keyframes ldio-x2uulkbinbj {
    0% {
      transform: rotate(0)
    }
  
    100% {
      transform: rotate(360deg)
    }
  }
  
  .ldio-x2uulkbinbj div {
    box-sizing: border-box !important
  }
  
  .ldio-x2uulkbinbj>div {
    position: absolute;
    width: 96px;
    height: 96px;
    top: 2px;
    left: 2px;
    border-radius: 50%;
    border: 6px solid #000;
    border-color: #000000 transparent #000000 transparent;
    animation: ldio-x2uulkbinbj 1.2129032258064517s linear infinite;
  }
  
  .ldio-x2uulkbinbj>div:nth-child(2) {
    border-color: transparent
  }
  
  .ldio-x2uulkbinbj>div:nth-child(2) div {
    position: absolute;
    width: 100%;
    height: 100%;
    transform: rotate(45deg);
  }
  
  .ldio-x2uulkbinbj>div:nth-child(2) div:before,
  .ldio-x2uulkbinbj>div:nth-child(2) div:after {
    content: "";
    display: block;
    position: absolute;
    width: 6px;
    height: 6px;
    top: -6px;
    left: 39px;
    background: #000000;
    border-radius: 50%;
    box-shadow: 0 90px 0 0 #000000;
  }
  
  .ldio-x2uulkbinbj>div:nth-child(2) div:after {
    left: -6px;
    top: 39px;
    box-shadow: 90px 0 0 0 #000000;
  }
  
  .loadingio-spinner-dual-ring-nq4q5u6dq7r {
    width: 63px;
    height: 63px;
    display: inline-block;
    overflow: hidden;
    background: none;
  }
  
  .ldio-x2uulkbinbj {
    width: 100%;
    height: 100%;
    position: relative;
    transform: translateZ(0) scale(0.63);
    backface-visibility: hidden;
    transform-origin: 0 0;
    /* see note above */
  }
  
  .ldio-x2uulkbinbj div {
    box-sizing: content-box;
  }</style>