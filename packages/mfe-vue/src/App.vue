<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useCvStore } from './stores/cvStore';

const store = useCvStore();
const tab   = ref<'projects' | 'education' | 'about'>('projects');

type Tab = 'projects' | 'education' | 'about';
const TABS: Tab[] = ['projects', 'education', 'about'];

function switchTab(t: Tab) {
  tab.value = t;
  store.activeSection = t;
}

function emitAction(result: string) {
  window.dispatchEvent(new CustomEvent('cv:vue-action', { detail: { result } }));
}

// Listen for shell-dispatched actions
function handleShellVue(e: Event) {
  const { action, payload } = (e as CustomEvent<{ action: string; payload?: string }>).detail;
  console.log(action, payload);
  
  store.commits += 1;

  if (action === 'setSection' && payload && TABS.includes(payload as Tab)) {
    switchTab(payload as Tab);
    emitAction(`setSection("${payload}")`);
  } else if (action === 'fetchProjects') {
    store.fetchProjects();
    emitAction('fetchProjects() → resolved [4 items]');
  } else if (action === 'broadcastEvent') {
    store.broadcastEvent();
    emitAction('broadcastEvent("mfe:update")');
  }
}

onMounted(()   => window.addEventListener('cv:shell-vue', handleShellVue));
onUnmounted(() => window.removeEventListener('cv:shell-vue', handleShellVue));
</script>

<template>
  <div class="mfe-root">

    <!-- Panel header -->
    <div class="panel-header">
      <span class="panel-title">
        <span class="panel-dot" />
        mfe-vue / src / App.vue
      </span>
      <div class="tech-badges">
        <span class="tech-badge tb-vue">Vue 3</span>
        <span class="tech-badge tb-pinia">Pinia</span>
        <span class="tech-badge tb-vite">Vite</span>
      </div>
    </div>

    <!-- Pinia store block -->
    <div class="store-block">
      <div class="store-label pinia-label">▸ pinia store state</div>
      <div class="store-row">
        <span class="store-key">activeSection</span>
        <span class="store-val section-v">{{ tab }}</span>
      </div>
      <div class="store-row">
        <span class="store-key">locale</span>
        <span class="store-val active">{{ store.locale }}</span>
      </div>
      <div class="store-row">
        <span class="store-key">mfeConnected</span>
        <span class="store-val active">true</span>
      </div>
      <div class="store-row">
        <span class="store-key">commits</span>
        <span class="store-val">{{ store.commits }}</span>
      </div>
    </div>

    <!-- Nav tabs -->
    <div class="nav-tabs">
      <button
        v-for="t in TABS"
        :key="t"
        :class="['nav-tab', tab === t ? 'active-vue' : '']"
        @click="switchTab(t)"
      >{{ t }}</button>
    </div>

    <!-- Section content -->
    <div class="cv-section">

      <!-- Projects -->
      <template v-if="tab === 'projects'">
        <div class="section-label-inner">personal projects</div>
        <div v-for="p in store.projects" :key="p.title" class="proj-item">
          <div class="proj-name">{{ p.title }}</div>
          <div class="proj-desc">{{ p.description }} <span style="font-family:'DM Mono',monospace;font-size:12px;color:#7a7890">{{ p.period }}</span></div>
          <a v-if="p.url" :href="p.url" target="_blank" rel="noopener" class="proj-link">↗ {{ p.url }}</a>
        </div>
      </template>

      <!-- Education -->
      <template v-else-if="tab === 'education'">
        <div class="section-label-inner">education</div>
        <div v-for="e in store.education" :key="e.degree" class="edu-item">
          <div class="edu-degree">{{ e.degree }}</div>
          <div class="edu-meta">{{ e.institution }} · {{ e.years }}</div>
        </div>
      </template>

      <!-- About -->
      <template v-else-if="tab === 'about'">
        <div class="section-label-inner">professional summary</div>
        <p v-for="(para, i) in store.about.paragraphs" :key="i" class="about-para">{{ para }}</p>
        <div class="open-to-chips">
          <span v-for="item in store.about.openTo" :key="item" class="open-to-chip">{{ item }}</span>
        </div>
      </template>

    </div>
  </div>
</template>
