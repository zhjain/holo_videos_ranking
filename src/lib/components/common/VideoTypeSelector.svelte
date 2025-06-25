<script lang="ts">
  export let videoTypes: { label: string; value: string }[];
  export let selected: string;
  export let onChange: (value: string) => void;
</script>
<div class="flex justify-center gap-2 md:gap-4 my-4">
  {#each videoTypes as type}
    <button
      class="px-5 py-2 rounded-full font-semibold shadow-sm border transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-green-300
        {selected === type.value
          ? 'bg-gradient-to-r from-green-500 to-green-400 text-white scale-105 shadow-lg border-green-500'
          : 'bg-white text-green-700 border-gray-200 hover:bg-green-50 hover:text-green-600'}"
      aria-pressed={selected === type.value}
      on:click={() => onChange(type.value)}>
      {type.label}
    </button>
  {/each}
</div>
