<script setup lang="ts">
import { useCvStore } from '../stores/cvStore';
const store = useCvStore();
</script>

<template>
  <section class="mb-10">
    <button
      class="w-full text-left mb-6 group"
      @click="store.setActiveSection('about')"
    >
      <h2
        class="font-mono text-xs font-semibold tracking-widest uppercase text-muted flex items-center gap-2 group-hover:text-vue transition-colors"
      >
        <span class="w-2 h-2 rounded-full bg-vue inline-block shrink-0" />
        About
      </h2>
    </button>

    <p class="text-foreground text-sm leading-relaxed mb-6">
      {{ store.about.summary }}
    </p>

    <div>
      <p class="font-mono text-xs text-muted uppercase tracking-wider mb-3">
        Open to
      </p>
      <div class="flex flex-wrap gap-2">
        <span
          v-for="item in store.about.openTo"
          :key="item"
          class="font-mono text-xs px-3 py-1 rounded-full bg-vue/10 text-vue border border-vue/30 cursor-default hover:bg-vue/20 transition-colors"
        >
          {{ item }}
        </span>
      </div>
    </div>
  </section>
</template>
