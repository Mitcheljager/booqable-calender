<div class="loading">
  <div class="spinner"></div>
</div>

<style lang="scss">
  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 10rem;
    width: calc(100% - 6rem);
    margin: 3rem;
    border-radius: 1rem;
    background: rgba(0, 0, 0, .5);
  }

  @keyframes spinner {
    to {
      transform: rotate(360deg);
    }
  }

  .spinner {
    display: block;
    width: 4rem;
    height: 4rem;

    &::after {
      content: "";
      display: block;
      width: 4rem;
      height: 4rem;
      border-radius: 50%;
      border: .5rem solid white;
      border-color: white rgba(255, 255, 255, .1) rgba(255, 255, 255, .1);
      animation: spinner 750ms linear infinite;
    }
  }
</style>
