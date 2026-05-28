<script setup lang="ts">
import { useCvStore } from '../stores/cvStore';
const store = useCvStore();
</script>

<template>
  <section class="mb-10">
    <button
      class="w-full text-left mb-6 group"
      @click="store.setActiveSection('projects')"
    >
      <h2
        class="font-mono text-xs font-semibold tracking-widest uppercase text-muted flex items-center gap-2 group-hover:text-vue transition-colors"
      >
        <span class="w-2 h-2 rounded-full bg-vue inline-block shrink-0" />
        Projects
      </h2>
    </button>

    <div class="space-y-6">
      <article
        v-for="(project, i) in store.projects"
        :key="i"
        class="border-l-2 border-border pl-4 hover:border-vue transition-colors duration-200"
      >
        <div class="flex justify-between items-start mb-1 gap-4">
          <h3 class="font-syne font-bold text-foreground leading-tight">
            {{ project.title }}
          </h3>
          <span class="font-mono text-xs text-muted shrink-0 tabular-nums">
            {{ project.period }}
          </span>
        </div>

        <p class="text-muted text-sm leading-relaxed mb-3">
          {{ project.description }}
        </p>

        <div class="flex flex-wrap gap-1.5 mb-2">
          <span
            v-for="t in project.tech"
            :key="t"
            class="font-mono text-xs px-2 py-0.5 rounded bg-surface border border-vue/20 text-vue/80"
          >
            {{ t }}
          </span>
        </div>

        <a
          v-if="project.url"
          :href="project.url"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1 font-mono text-xs text-vue hover:underline"
        >
          ↗ {{ project.url.replace('https://', '') }}
        </a>
      </article>
    </div>
  </section>
</template>
