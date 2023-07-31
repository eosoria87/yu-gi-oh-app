<script>
	import { onMount } from 'svelte';
  import service from '$lib/data'
	import { goto } from '$app/navigation';

  /** @type {import('./$types').PageData} */
  export let data;

  /** @type {any[]} */
  let items = [];

  /** @type {number} */
  let skip = 0;

  /** @type {number} */
  let take = 15;

  /** @type {number} */
  let total = data.total;

  /** @type {string | null} */
  let filter = null;

  onMount(async () => {
    items = data.items ?? [];
  });

  const viewAvatar = (/** @type {any} */e, /** @type {any} */ item) => {
    goto(`/avatar/${item.id}`, { replaceState: true });
  };

  const updateData = async () => {    
    let result = await service.list(skip, take, filter);
    items = result.items;
    total = result.total;
  }

  const searchItem = async (/** @type {any} */ e) => { 
    filter = e.target.value && e.target.value !== '' ? e.target.value : null;
    await updateData();
  }

  const next = async () => {
    skip += take; 
    await updateData();
  }

  const preview = async () => {
    skip -= take;
    await updateData();
  }

</script>

<div class="bg-gray-900 py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 text-center lg:px-8">
      <div class="mx-auto max-w-2xl">
        <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">Yu-Gi-Oh! API by YGOPRODeck</h2>
        <p class="mt-4 text-lg leading-8 text-gray-400">Our Yu-Gi-Oh! API is now available for public consumption. Below are the details on how to use the API and what kind of response is to be expected from the API.</p>
      </div>

      <div class="mx-auto max-w-2xl">
        <label for="search" class="block text-sm font-medium leading-6 text-gray-900">Search</label>
        <div class="relative mt-2 rounded-md shadow-sm">
          <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-gray-400">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </div>
          <input type="text" name="search" id="search" class="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Search..." 
            on:keyup={(e) => searchItem(e)}/>
        </div>
      </div>

      <ul role="list" class="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8">
        
        {#each items as item}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
          <li class="rounded-2xl bg-gray-800 px-8 py-10 cursor-pointer" on:click|preventDefault|stopPropagation={(e) => viewAvatar(e, item)}>
            <img class="mx-auto h-48 w-48 rounded-full md:h-56 md:w-56" src={item.card_images[0].image_url_cropped} alt="">
            <h3 class="mt-6 text-base font-semibold leading-7 tracking-tight text-white">{item.name}</h3>
            <p class="text-sm leading-6 text-gray-400">{item.type}</p>
            <ul role="list" class="mt-6 flex justify-center items-center gap-x-6">
              <li>
                <a href="jascript:;" class="text-gray-400 hover:text-gray-300">
                  <span class="sr-only">Twitter</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                </a>
              </li>
              <li>
                <a href="#" class="text-gray-400 hover:text-gray-300">
                  <span class="sr-only">LinkedIn</span>
                  {item.atk ?? 0}
                </a>
              </li>
            </ul>
          </li>
        {/each}
        
      </ul>
    </div>
    
    <div class="mx-auto max-w-7xl px-6 lg:px-8 my-4">
      <hr />
    </div>
    
    <div class="grid grid-cols-3 grid-flow-col text-gray-50 mx-auto max-w-7xl px-6 lg:px-8">
      <div class="-mt-px text-start">
        {#if skip > 0}
          <a href="javascript:;" class="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
            on:click|preventDefault|stopPropagation={preview}>
            <svg class="mr-3 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M18 10a.75.75 0 01-.75.75H4.66l2.1 1.95a.75.75 0 11-1.02 1.1l-3.5-3.25a.75.75 0 010-1.1l3.5-3.25a.75.75 0 111.02 1.1l-2.1 1.95h12.59A.75.75 0 0118 10z" clip-rule="evenodd" />
            </svg>
            Previous
          </a>
        {/if}
      </div>
      <div class="-mt-px text-center">
        <span>Showing <strong>{skip + 1}</strong> to <strong>{skip + take}</strong> of <strong> {total} </strong> Entries</span>
      </div>
      <div class="-mt-px text-end">
        {#if (skip + take) < total}
          <a href="javascript:;" class="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
            on:click|preventDefault|stopPropagation={next}>
            Next
            <svg class="ml-3 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z" clip-rule="evenodd" />
            </svg>
          </a>
        {/if}
      </div>
    </div>
</div>
