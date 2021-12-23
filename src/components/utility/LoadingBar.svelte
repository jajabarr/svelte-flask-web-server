<script lang="ts">
</script>

<div class="loader">
  <div class="progress" />
</div>

<style>
  .loader {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: 2rem;
    height: 0.2rem;
    width: 80%;
    background-color: rgba(255, 255, 255, 0.2);
  }

  .progress {
    position: absolute;
    height: 100%;
    background-color: cyan;
    animation-name: progress;
    animation-duration: 2s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
  }

  @keyframes progress {
    from {
      width: 0;
      left: 0;
    }

    50% {
      width: 100%;
      left: 0;
    }

    to {
      width: 0;
      left: 100%;
    }
  }
</style>
