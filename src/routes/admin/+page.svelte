<script lang="ts">
  import { onMount } from 'svelte';
  import { projectsStore, type Project, type TechStackItem } from '$lib/stores/projects';

  let projects: Project[] = [];
  let isEditing = false;
  let editingId: string | null = null;
  let notificationMessage = '';
  let notificationType: 'success' | 'error' = 'success';

  // Form Fields
  let title = '';
  let description = '';
  let solvesInput = '';
  let status = 'Completed';
  let image = '';
  let liveLink = '';
  let githubLink = '';
  let techStackItems: TechStackItem[] = [];
  let customIcon = '';
  let customName = '';

  const PRESET_ICONS = [
    { icon: 'php', name: 'PHP' },
    { icon: 'laravel', name: 'Laravel' },
    { icon: 'svelte', name: 'Svelte' },
    { icon: 'ts', name: 'TypeScript' },
    { icon: 'js', name: 'JavaScript' },
    { icon: 'react', name: 'React' },
    { icon: 'vue', name: 'Vue.js' },
    { icon: 'flutter', name: 'Flutter' },
    { icon: 'dart', name: 'Dart' },
    { icon: 'kotlin', name: 'Kotlin' },
    { icon: 'python', name: 'Python' },
    { icon: 'express', name: 'Express JS' },
    { icon: 'solidity', name: 'Solidity' },
    { icon: 'cpp', name: 'C++' },
    { icon: 'mysql', name: 'MySQL' },
    { icon: 'tailwind', name: 'Tailwind' },
    { icon: 'bootstrap', name: 'Bootstrap' },
    { icon: 'git', name: 'Git' }
  ];

  const unsubscribe = projectsStore.subscribe((value) => {
    projects = value;
  });

  onMount(() => {
    return () => unsubscribe();
  });

  function showNotification(msg: string, type: 'success' | 'error' = 'success') {
    notificationMessage = msg;
    notificationType = type;
    setTimeout(() => {
      notificationMessage = '';
    }, 4000);
  }

  function resetForm() {
    isEditing = false;
    editingId = null;
    title = '';
    description = '';
    solvesInput = '';
    status = 'Completed';
    image = '';
    liveLink = '';
    githubLink = '';
    techStackItems = [];
    customIcon = '';
    customName = '';
  }

  function editProject(proj: Project) {
    isEditing = true;
    editingId = proj.id;
    title = proj.title;
    description = proj.description;
    solvesInput = proj.solves.join(', ');
    status = proj.status;
    image = proj.image || '';
    liveLink = proj.links.live || '';
    githubLink = proj.links.github || '';
    techStackItems = [...proj.techStack];
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function addPresetTech(item: TechStackItem) {
    if (!techStackItems.some((t) => t.icon === item.icon)) {
      techStackItems = [...techStackItems, item];
    }
  }

  function addCustomTech() {
    if (!customIcon.trim() || !customName.trim()) return;
    techStackItems = [...techStackItems, { icon: customIcon.trim().toLowerCase(), name: customName.trim() }];
    customIcon = '';
    customName = '';
  }

  function removeTech(iconName: string) {
    techStackItems = techStackItems.filter((t) => t.icon !== iconName);
  }

  function handleSubmit() {
    if (!title.trim() || !description.trim()) {
      showNotification('Please provide at least a project title and description.', 'error');
      return;
    }

    const solves = solvesInput
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const projectPayload = {
      title: title.trim(),
      description: description.trim(),
      solves: solves.length > 0 ? solves : ['Project'],
      status,
      image: image.trim() || undefined,
      techStack: techStackItems,
      links: {
        live: liveLink.trim() || undefined,
        github: githubLink.trim() || undefined
      }
    };

    if (isEditing && editingId) {
      projectsStore.updateProject(editingId, projectPayload);
      showNotification(`Project "${title}" updated successfully!`);
    } else {
      projectsStore.addProject(projectPayload);
      showNotification(`New project "${title}" added successfully!`);
    }

    resetForm();
  }

  function handleDelete(id: string, projTitle: string) {
    if (confirm(`Are you sure you want to delete "${projTitle}"?`)) {
      projectsStore.deleteProject(id);
      showNotification(`Project "${projTitle}" deleted.`);
    }
  }

  function handleResetDefault() {
    if (confirm('Reset all projects to default list? Local additions/edits will be cleared.')) {
      projectsStore.resetToDefault();
      showNotification('Projects reset to default data.');
    }
  }
</script>

<svelte:head>
  <title>Admin Dashboard - Manage Projects</title>
</svelte:head>

<div class="min-h-screen bg-black text-white px-4 py-24 sm:px-8 max-w-6xl mx-auto">
  <!-- Top Navigation & Header -->
  <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 pb-6 border-b border-white/10">
    <div>
      <h1 class="text-3xl sm:text-4xl font-extrabold text-gradient">Admin Project Manager</h1>
      <p class="text-neutral-400 text-sm mt-1">Add new projects or edit existing portfolio items</p>
    </div>
    <div class="flex gap-3">
      <a
        href="/"
        class="px-4 py-2 text-sm font-medium rounded-full bg-white/10 hover:bg-white/20 text-white transition-all flex items-center gap-2 border border-white/10"
      >
        <i class="fas fa-arrow-left text-xs"></i> Back to Portfolio
      </a>
      <button
        on:click={handleResetDefault}
        class="px-4 py-2 text-sm font-medium rounded-full bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-all border border-red-500/20"
      >
        Reset Defaults
      </button>
    </div>
  </div>

  <!-- Notifications -->
  {#if notificationMessage}
    <div
      class={`p-4 mb-6 rounded-xl border flex justify-between items-center ${notificationType === 'success' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-red-500/10 border-red-500/30 text-red-300'}`}
    >
      <div class="flex items-center gap-2">
        <i class={`fas ${notificationType === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}`}></i>
        <span class="text-sm font-medium">{notificationMessage}</span>
      </div>
      <button on:click={() => (notificationMessage = '')} class="text-xs opacity-70 hover:opacity-100" aria-label="Close notification">
        <i class="fas fa-times"></i>
      </button>
    </div>
  {/if}

  <!-- Form Section -->
  <div class="bg-neutral-900/90 border border-white/10 rounded-2xl p-6 sm:p-8 mb-12 shadow-2xl backdrop-blur-xl">
    <div class="flex justify-between items-center mb-6 pb-4 border-b border-white/10">
      <h2 class="text-2xl font-bold text-gradient">
        {isEditing ? '✏️ Edit Project' : '➕ Add New Project'}
      </h2>
      {#if isEditing}
        <button
          on:click={resetForm}
          class="text-xs px-3 py-1.5 rounded-lg bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
        >
          Cancel Editing
        </button>
      {/if}
    </div>

    <form on:submit|preventDefault={handleSubmit} class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Title -->
        <div>
          <label for="admin-title" class="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">Project Title *</label>
          <input
            id="admin-title"
            type="text"
            bind:value={title}
            placeholder="e.g. Smart Smart Agriculture App"
            class="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500 text-sm"
            required
          />
        </div>

        <!-- Status -->
        <div>
          <label for="admin-status" class="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">Status</label>
          <select
            id="admin-status"
            bind:value={status}
            class="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-emerald-500 text-sm"
          >
            <option value="Completed">Completed</option>
            <option value="In Progress">In Progress</option>
          </select>
        </div>
      </div>

      <!-- Description -->
      <div>
        <label for="admin-desc" class="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">Description *</label>
        <textarea
          id="admin-desc"
          bind:value={description}
          rows="3"
          placeholder="Brief overview of what this project does and problems it solves..."
          class="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500 text-sm"
          required
        ></textarea>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Image URL -->
        <div>
          <label for="admin-img" class="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">Image URL</label>
          <input
            id="admin-img"
            type="url"
            bind:value={image}
            placeholder="https://example.com/project-thumbnail.png"
            class="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500 text-sm"
          />
        </div>

        <!-- Tags/Solves -->
        <div>
          <label for="admin-tags" class="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">Tags / Solves (Comma-separated)</label>
          <input
            id="admin-tags"
            type="text"
            bind:value={solvesInput}
            placeholder="Mobile App, Flutter, IoT Integration"
            class="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500 text-sm"
          />
        </div>
      </div>

      <!-- Links -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label for="admin-github" class="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">GitHub Repo Link</label>
          <input
            id="admin-github"
            type="url"
            bind:value={githubLink}
            placeholder="https://github.com/ForceClose31/my-repo.git"
            class="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500 text-sm"
          />
        </div>
        <div>
          <label for="admin-live" class="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">Live Demo Link</label>
          <input
            id="admin-live"
            type="url"
            bind:value={liveLink}
            placeholder="https://my-app.vercel.app"
            class="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500 text-sm"
          />
        </div>
      </div>

      <!-- Tech Stack Picker -->
      <div>
        <label for="admin-tech-preset" class="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">Tech Stack Icons</label>
        
        <!-- Presets -->
        <div class="flex flex-wrap gap-2 mb-4 p-3 bg-black/40 rounded-xl border border-white/5">
          <span class="text-xs text-neutral-400 self-center mr-2">Click to add:</span>
          {#each PRESET_ICONS as preset}
            <button
              type="button"
              on:click={() => addPresetTech(preset)}
              class="px-2.5 py-1 text-xs rounded-lg bg-neutral-800 hover:bg-emerald-500/20 hover:border-emerald-500/40 border border-white/10 flex items-center gap-1.5 transition-all"
            >
              <img src={`https://skillicons.dev/icons?i=${preset.icon}`} alt={preset.name} class="w-4 h-4 object-contain" />
              {preset.name}
            </button>
          {/each}
        </div>

        <!-- Custom Add Tech -->
        <div class="flex gap-2 mb-4">
          <input
            type="text"
            bind:value={customIcon}
            placeholder="skillicon key (e.g. docker)"
            class="w-1/3 px-3 py-1.5 text-xs rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none"
          />
          <input
            type="text"
            bind:value={customName}
            placeholder="Name (e.g. Docker)"
            class="w-1/3 px-3 py-1.5 text-xs rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none"
          />
          <button
            type="button"
            on:click={addCustomTech}
            class="px-4 py-1.5 text-xs font-semibold rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/10"
          >
            Add Custom
          </button>
        </div>

        <!-- Selected Tech Items -->
        <div class="flex flex-wrap gap-2">
          {#each techStackItems as item}
            <span class="px-3 py-1 text-xs rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 flex items-center gap-2">
              <img src={`https://skillicons.dev/icons?i=${item.icon}`} alt={item.name} class="w-4 h-4" />
              {item.name}
              <button type="button" on:click={() => removeTech(item.icon)} class="text-neutral-400 hover:text-red-400" aria-label={`Remove ${item.name}`}>
                <i class="fas fa-times text-[10px]"></i>
              </button>
            </span>
          {/each}
          {#if techStackItems.length === 0}
            <span class="text-xs text-neutral-500 italic">No tech stack selected yet.</span>
          {/if}
        </div>
      </div>

      <!-- Action Button -->
      <div class="pt-4 border-t border-white/10 flex justify-end gap-3">
        {#if isEditing}
          <button
            type="button"
            on:click={resetForm}
            class="px-6 py-2.5 text-sm font-semibold rounded-full bg-neutral-800 text-neutral-300 hover:bg-neutral-700 transition-all"
          >
            Cancel
          </button>
        {/if}
        <button
          type="submit"
          class="px-8 py-2.5 text-sm font-bold rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-black hover:opacity-90 transition-all shadow-lg shadow-emerald-500/20"
        >
          {isEditing ? 'Save Changes' : 'Create Project'}
        </button>
      </div>
    </form>
  </div>

  <!-- Projects List Table / Cards -->
  <div>
    <h2 class="text-2xl font-bold text-gradient mb-6">Existing Projects ({projects.length})</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      {#each projects as proj (proj.id)}
        <div class="bg-neutral-900/80 border border-white/10 rounded-2xl p-5 backdrop-blur-md flex flex-col justify-between hover:border-white/20 transition-all">
          <div>
            <div class="flex justify-between items-start gap-2 mb-3">
              <h3 class="text-xl font-bold text-white line-clamp-1">{proj.title}</h3>
              <span class={`text-xs px-2.5 py-0.5 rounded-full border ${proj.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-amber-500/10 text-amber-400 border-amber-500/30'}`}>
                {proj.status}
              </span>
            </div>

            {#if proj.image}
              <div class="w-full h-36 overflow-hidden rounded-xl bg-black/40 mb-3 border border-white/5">
                <img src={proj.image} alt={proj.title} class="w-full h-full object-cover" />
              </div>
            {/if}

            <p class="text-neutral-400 text-xs line-clamp-2 mb-3">{proj.description}</p>

            <div class="flex flex-wrap gap-1.5 mb-4">
              {#each proj.techStack as t}
                <span class="px-2 py-0.5 text-[11px] rounded bg-white/5 border border-white/10 text-neutral-300 flex items-center gap-1">
                  <img src={`https://skillicons.dev/icons?i=${t.icon}`} alt={t.name} class="w-3.5 h-3.5" />
                  {t.name}
                </span>
              {/each}
            </div>
          </div>

          <div class="pt-3 border-t border-white/10 flex justify-between items-center mt-2">
            <div class="flex gap-2">
              {#if proj.links.github}
                <a href={proj.links.github} target="_blank" rel="noopener noreferrer" class="text-xs text-neutral-400 hover:text-white">
                  <i class="fab fa-github"></i> GitHub
                </a>
              {/if}
              {#if proj.links.live}
                <a href={proj.links.live} target="_blank" rel="noopener noreferrer" class="text-xs text-emerald-400 hover:underline">
                  <i class="fas fa-external-link-alt text-[10px]"></i> Live
                </a>
              {/if}
            </div>

            <div class="flex gap-2">
              <button
                on:click={() => editProject(proj)}
                class="px-3 py-1 text-xs rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 font-medium transition-all"
              >
                <i class="fas fa-edit"></i> Edit
              </button>
              <button
                on:click={() => handleDelete(proj.id, proj.title)}
                class="px-3 py-1 text-xs rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 font-medium transition-all"
              >
                <i class="fas fa-trash-alt"></i> Delete
              </button>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>
