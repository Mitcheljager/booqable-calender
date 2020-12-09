<script>
  import { onMount, afterUpdate } from "svelte"

  import { orders } from "../stores/data.js"
  import { startDateOfWeek } from "../stores/dates.js"

  import Item from "./Item.svelte"
  import Loading from "./Loading.svelte"

  $: loading = true
  $: endDate = new Date($startDateOfWeek.getTime() + 86400000 * 7)
  $: dateArray = []
  $: days = Array(7)
  $: getData($startDateOfWeek)
  $: resetPageData($startDateOfWeek)

  let page = 1
  let reachedFinalPage = false
  let itemsPerPage = 20
  let debounce

  afterUpdate(() => {
    createDateArray()
  })

  onMount(() => {
    document.querySelector("[data-role='content']").addEventListener("scroll", loadMoreOnScroll)
  })

  function getData() {
    loading = true

    clearTimeout(debounce)
    debounce = setTimeout(() => {
      const apiKey = "25de2829cb40988699612bc98a118b51"
      const url = `https://demo.booqable.com/api/3/orders?api_key=${ apiKey }&filter[date][type]=query&filter[date][starts_at][gte]=${ $startDateOfWeek.toISOString() }&filter[date][starts_at][lt]=${ endDate.toISOString() }&sort=starts_at&page[per]=${ itemsPerPage }&page[number]=${ page }`

      fetch(url, {
        method: "get"
      })
      .then(response => response.text())
      .then(data => {
        const parsedData = JSON.parse(data)

        if (parsedData.data.length < itemsPerPage) reachedFinalPage = true

        orders.set([...$orders, ...parsedData.data])
      })
      .catch(error => {
        console.log(error)
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
    if ($orders) {
      return $orders.filter(order => {
        if (order.attributes) {
          const parsedOrderDate = new Date(Date.parse(order.attributes.starts_at)).toDateString()
          return parsedOrderDate == date.toDateString()
        }
      })
    } else {
      return []
    }
  }

  function loadMoreOnScroll() {
    if (reachedFinalPage || loading) return

    const parentElement = event.target
    const parentElementHeight = parentElement.offsetHeight
    const element = parentElement.querySelector(".grid")
    const elementHeight = element.offsetHeight
    const scrollDepth = parentElement.scrollTop

    if (scrollDepth + parentElementHeight + 100 > elementHeight) {
      clearTimeout(debounce)
      debounce = setTimeout(() => {
        page++
        getData()
      }, 100)
    }
  }

  function resetPageData() {
    page = 1
    reachedFinalPage = false
  }
</script>

<div class="grid { loading ? "grid--loading" : "" }">
  { #each days as day, i }
    { #each ordersOnDate(day) as order }
      <Item order={ order } i={i} weekEndDay={ endDate } />
    { /each }
  { /each }
</div>

{ #if loading }
  <Loading />
{ /if }

<style lang="scss">
  .grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    padding-top: .25rem;
    padding-bottom: 10rem;

    &--loading {
      padding-bottom: 0;
    }
  }
</style>
