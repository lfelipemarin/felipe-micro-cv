<script setup lang="ts">
import { useCvStore } from '../stores/cvStore';
import { computed } from 'vue';

const store = useCvStore();
// Reactive snapshot of the entire Pinia state
const stateJson = computed(() => JSON.stringify(store.$state, null, 2));
</script>

<template>
  <details class="mt-10 border border-border rounded-lg overflow-hidden">
    <summary
      class="px-4 py-3 bg-surface cursor-pointer flex items-center gap-2 select-none hover:bg-border/50 transition-colors list-none"
    >
      <span class="font-mono text-xs font-bold text-vue">[Pinia Store]</span>
      <span class="font-mono text-xs text-muted ml-auto">▾ live state</span>
    </summary>
    <pre
      class="p-4 bg-[#0a0a0d] font-mono text-xs text-muted/80 overflow-auto max-h-72 leading-relaxed whitespace-pre-wrap break-all"
    >{{ stateJson }}</pre>
  </details>
</template>
