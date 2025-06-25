<script lang="ts">
  export let timeRanges: { label: string; value: string }[];
  export let selected: string;
  export let onChange: (value: string) => void;
</script>
<div class="flex justify-center gap-2 md:gap-4 my-4">
  {#each timeRanges as range}
    <button
      class="px-5 py-2 rounded-full font-semibold shadow-sm border transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-blue-300
        {selected === range.value
          ? 'bg-gradient-to-r from-blue-500 to-blue-400 text-white scale-105 shadow-lg border-blue-500'
          : 'bg-white text-blue-700 border-gray-200 hover:bg-blue-50 hover:text-blue-600'}"
      aria-pressed={selected === range.value}
      on:click={() => onChange(range.value)}>
      {range.label}
    </button>
  {/each}
</div>
