<script>
  import { onMount, afterUpdate } from "svelte"

  import { orders } from "../stores/data.js"
  import { startDateOfWeek } from "../stores/dates.js"

  import Item from "./Item.svelte"

  $: loading = true
  $: endDate =  new Date($startDateOfWeek.getTime() + 86400000 * 7)
  $: dateArray = []
  $: days = Array(7)
  $: getData($startDateOfWeek)

  let debounce

  afterUpdate(() => {
    createDateArray()
  })

  function getData() {
    loading = true

    clearTimeout(debounce)
    debounce = setTimeout(() => {
      const apiKey = "25de2829cb40988699612bc98a118b51"
      const url = `https://demo.booqable.com/api/3/orders?api_key=${ apiKey }&filter[date][type]=query&filter[date][starts_at][gte]=${ $startDateOfWeek.toISOString() }&filter[date][starts_at][lt]=${ endDate.toISOString() }`

      fetch(url, {
        method: "get"
      })
      .then(response => response.text())
      .then(data => {
        const parsedData = JSON.parse(data)
        orders.set(parsedData)
      })
      .catch(() => {
        alert("Something went wrong when retrieving your data")

        orders.set([])
      })
      .finally(() => {
        loading = false
      })
    }, 500)
  }

  function createDateArray() {
    Array.from(days).forEach((day, i) => {
      days[i] = new Date($startDateOfWeek.getTime() + 86400000 * i)
    })
  }

  function ordersOnDate(date) {
    if ($orders.data) {
      return $orders.data.filter(order => {
        const parsedOrderDate = new Date(Date.parse(order.attributes.starts_at)).toDateString()
        return parsedOrderDate == date.toDateString()
      })
    } else {
      return []
    }
  }
</script>

<div class="grid">
  { #if loading }
    <div class="loading">
      <div class="spinner"></div>
    </div>
  { /if }

  { #each days as day, i }
    { #each ordersOnDate(day) as order }
      <Item order={ order } i={i} weekDay={ day } weekEndDay={ endDate } />
    { /each }
  { /each }
</div>

<style lang="scss">
  .grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    padding-top: .25rem;
  }

  .loading {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
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
