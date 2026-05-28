<script setup lang="ts">
import { useCvStore } from '../stores/cvStore';
const store = useCvStore();
</script>

<template>
  <section class="mb-10">
    <button
      class="w-full text-left mb-6 group"
      @click="store.setActiveSection('education')"
    >
      <h2
        class="font-mono text-xs font-semibold tracking-widest uppercase text-muted flex items-center gap-2 group-hover:text-vue transition-colors"
      >
        <span class="w-2 h-2 rounded-full bg-vue inline-block shrink-0" />
        Education
      </h2>
    </button>

    <div class="space-y-5">
      <article
        v-for="(edu, i) in store.education"
        :key="i"
        class="border-l-2 border-border pl-4 hover:border-vue transition-colors duration-200"
      >
        <div class="flex justify-between items-start mb-1 gap-4">
          <h3 class="font-syne font-bold text-foreground leading-tight">
            {{ edu.degree }}
          </h3>
          <span class="font-mono text-xs text-muted shrink-0 tabular-nums">
            {{ edu.years }}
          </span>
        </div>
        <p class="text-vue text-sm font-medium">{{ edu.institution }}</p>
      </article>
    </div>
  </section>
</template>
