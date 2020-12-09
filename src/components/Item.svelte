<script>
  export let i
  export let order
  export let weekDay
  export let weekEndDay

  let startDate = new Date(order.attributes.starts_at)
  let endDate = new Date(order.attributes.stops_at)

  function orderEndsAt() {
    let daysBetween = endDate.getDay() - startDate.getDay()

    if (daysBetween < 0) daysBetween = 7

    return daysBetween
  }

  function leadingZero(value) {
    if (value < 10) {
      return "0" + value
    } else {
      return value
    }
  }
</script>

<div class="item { endDate > weekEndDay ? "item--overflowing" : "" }" style="grid-column: { i + 1 } / { Math.min(i + 2 + orderEndsAt(), 8) }">
  <div class="item__content">
    <span>{ leadingZero(startDate.getHours()) }:{ leadingZero(startDate.getMinutes()) }</span>
    <span>{ leadingZero(endDate.getHours()) }:{ leadingZero(endDate.getMinutes()) }</span>
  </div>

  <div class="item__extra">
    <span>#{ order.attributes.number }</span>

    { #if (endDate > weekEndDay) }
      <span>{ endDate.getDate() } ➜</span>
    { /if }
  </div>
</div>

<style lang="scss">
  .item {
    position: relative;
    background: blueviolet;
    word-break: break-all;
    padding: .5rem;
    border-radius: 5px;
    margin: .25rem .5rem;

    &--overflowing {
      margin-right: 0;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      background-image: linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .35) 100%);
      background-size: 10rem 100%;
      background-repeat: no-repeat;
      background-position: right;
    }
  }

  .item__content {
    display: flex;
    justify-content: space-between;
  }

  .item__extra {
    display: flex;
    justify-content: space-between;
    margin-top: .5rem;
    font-style: italic;
    opacity: .75;
    font-size: .75rem;
  }
</style>
