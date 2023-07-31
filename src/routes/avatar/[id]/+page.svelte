<script>
	import { goto } from '$app/navigation';

    /** @type {import('./$types').PageData} */
    export let data;

    const priceName = (/** @type {string} */ key) => {
        switch(key) {
            case 'cardmarket_price': return 'Market.';
            case 'tcgplayer_price': return 'TCP Player.';
            case 'ebay_price': return 'eBay.';
            case 'amazon_price': return 'Amazon.';
            case 'coolstuffinc_price': return 'Cool Stuff Inc.';
            default: 'Other';
        }
    }
</script>

<div class="mx-auto max-w-7xl pt-12 px-6 lg:px-8">
    <div class="mb-8">
        <button type="button" class="rounded-full bg-indigo-600 p-1 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            on:click|preventDefault|stopPropagation={(e) => goto('/', { replaceState: true })}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
            </svg>
        </button>
    </div>
    <div class="relative px-4 sm:px-0">
      <h3 class="text-base font-semibold leading-7 text-white">{data.name}</h3>
      <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-400">{data.type}</p>
      {#if data.card_images?.length > 0}
        <div class="md:absolute top-0 right-2">        
            <img class="mx-auto h-48 w-48 rounded-full md:h-16 md:w-16" src={data.card_images[0].image_url_cropped} alt="">
        </div>
      {/if}
    </div>
    <div class="mt-6 border-t border-white/10">
      <dl class="divide-y divide-white/10">
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6 text-white">Description</dt>
          <dd class="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">{data.desc}</dd>
        </div>
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6 text-white">Attack</dt>
          <dd class="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">{data.atk ?? 0}</dd>
        </div>
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6 text-white">Defense</dt>
          <dd class="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">{data.def ?? 0}</dd>
        </div>
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6 text-white">Level</dt>
          <dd class="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">{data.level ?? 0}</dd>
        </div>
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6 text-white">Race</dt>
          <dd class="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">{data.race}</dd>
        </div>
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-white">Attribute</dt>
            <dd class="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">{data.attribute}</dd>
          </div>
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6 text-white">Images</dt>
          <dd class="mt-2 text-sm text-white sm:col-span-2 sm:mt-0">
            <div class="flex flex-wrap w-full space-x-2">
                {#each data?.card_images ?? [] as cardImage }
                    <img src={cardImage.image_url} alt="" class="w-1/3 object-cover rounded-lg" />
                    <!-- <img src={cardImage.image_url_small} alt="" class="w-1/3 object-cover" /> -->
                    <img src={cardImage.image_url_cropped} alt="" class="w-1/3 object-cover rounded-lg" />
                {/each}
            </div>
          </dd>
        </div>

        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-white">Prices</dt>
            <dd class="mt-2 text-sm text-white sm:col-span-2 sm:mt-0">
              <div class="flex flex-wrap w-full space-x-2">
                  {#each data?.card_prices ?? [] as cardPrice }
                    {#each Object.keys(cardPrice) as key}
                        <div class="mb-8 px-6 sm:px-4">
                            <h2 class="text-lg font-medium leading-6 text-orange-300">{priceName(key)}</h2>
                            <p class="mt-4">
                            <span class="text-4xl font-bold tracking-tight text-gray-200">${cardPrice[key]}</span>
                            <span class="text-base font-medium text-gray-500">/usd</span>
                            </p>
                            <!-- <p class="mt-4 text-sm text-gray-500">Quis suspendisse ut fermentum neque vivamus non tellus.</p>
                            <a href="javascript:;" class="mt-6 block w-full rounded-md border border-transparent bg-gradient-to-r from-orange-500 to-pink-500 py-2 text-center text-sm font-semibold text-white shadow hover:to-pink-600">Buy Basic</a> -->
                        </div>
                    {/each}
                  {/each}
              </div>
            </dd>
        </div>
      </dl>
    </div>
</div>