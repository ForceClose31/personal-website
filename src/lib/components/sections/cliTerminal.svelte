<script lang="ts">
  import { onMount } from 'svelte';
  import Heading from '$lib/components/reusable/heading.svelte';
  import { themeStore } from '$lib/stores/theme';

  interface LogItem {
    text: string;
    type: 'system' | 'info' | 'user' | 'response' | 'error';
  }

  let history: LogItem[] = [
    { text: 'Nur Bashori Cyber Command Shell [v3.5.0-production]', type: 'system' },
    { text: 'Type "help" or click quick action buttons below to run CLI commands.', type: 'info' }
  ];
  let inputVal = '';
  let terminalBoxRef: HTMLElement | null = null;

  function scrollToBottom() {
    if (terminalBoxRef) {
      terminalBoxRef.scrollTop = terminalBoxRef.scrollHeight;
    }
  }

  function runCmd(cmdStr: string) {
    const cmd = cmdStr.trim().toLowerCase();
    if (!cmd && cmd !== 'clear') return;

    if (cmd === 'clear') {
      history = [];
      inputVal = '';
      return;
    }

    const newLogs: LogItem[] = [...history, { text: `visitor@nur-bashori:~$ ${cmdStr}`, type: 'user' }];

    switch (cmd) {
      case 'help':
        newLogs.push({
          text: `AVAILABLE COMMANDS:\n  help        - Display list of CLI commands\n  about       - Query developer profile & background\n  skills      - Query technical stack & proficiency\n  projects    - List featured software projects & repos\n  contact     - Display direct contact coordinates\n  theme       - Toggle Dark / Light visual theme\n  socials     - List GitHub & LinkedIn links\n  date        - Display system timestamp\n  whoami      - Query current shell session user\n  clear       - Wipe terminal output`,
          type: 'response'
        });
        break;

      case 'about':
        newLogs.push({
          text: `NUR BASHORI RAHMAT OKTAVIANTO HERMAN\nRole: Full Stack, Laravel & Mobile Software Engineer\nFocus: Building scalable API systems, cross-platform mobile apps (Flutter/Kotlin), and high-performance web applications.\nLocation: Indonesia`,
          type: 'response'
        });
        break;

      case 'skills':
        newLogs.push({
          text: `TECHNICAL STACK MATRIX:\n  Languages:   TypeScript, JavaScript, PHP, Python, Dart, Kotlin, C++, Solidity\n  Backend:     Laravel, Express.js, RESTful API, MySQL\n  Frontend:    Svelte, SvelteKit, React, Tailwind CSS, Sass, HTML5\n  Mobile:      Flutter, Kotlin, Android SDK\n  DevOps/VCS:  Git, GitHub Actions, Docker`,
          type: 'response'
        });
        break;

      case 'projects':
        newLogs.push({
          text: `FEATURED PORTFOLIO PROJECTS:\n  [1] Backend Roompi   - Laravel API for Roompi Mobile App\n  [2] Mantab           - Flutter Livestock Monitoring System\n  [3] Subur            - Rice Crop Disease Machine Learning App\n  [4] Si-Klinik        - Health Record Management System (Laravel)\n  [5] Sortcoff         - IoT Coffee Bean Color Sorting App (Flutter/C++)\n  [6] API Easy Vote    - Decentralized Voting API (Express/Blockchain)\n  [7] HardHat Easy Vote- Blockchain Smart Contracts (Solidity/Hardhat)\n  [8] Linguabond       - Interactive Language Course App (Flutter)\n\nVisit #projects section to view interactive project cards.`,
          type: 'response'
        });
        break;

      case 'contact':
        newLogs.push({
          text: `CONTACT COORDINATES:\n  Email:    forceclose31@gmail.com\n  GitHub:   https://github.com/ForceClose31\n  LinkedIn: https://www.linkedin.com/in/nur-bashori-rahmat-oktavianto-herman/\n  WhatsApp: https://wa.me/6281393418944`,
          type: 'response'
        });
        break;

      case 'theme':
        themeStore.toggleTheme();
        newLogs.push({
          text: `[SYSTEM] Visual theme mode successfully toggled!`,
          type: 'response'
        });
        break;

      case 'socials':
        newLogs.push({
          text: `SOCIAL NETWORKS:\n  GitHub:   https://github.com/ForceClose31\n  LinkedIn: https://www.linkedin.com/in/nur-bashori-rahmat-oktavianto-herman/`,
          type: 'response'
        });
        break;

      case 'date':
        newLogs.push({
          text: `CURRENT SYSTEM TIME: ${new Date().toLocaleString()}`,
          type: 'response'
        });
        break;

      case 'whoami':
        newLogs.push({
          text: `visitor@guest-terminal (Role: Portfolio Explorer)`,
          type: 'response'
        });
        break;

      default:
        newLogs.push({
          text: `bash: command not found: "${cmdStr}". Type "help" for a list of available commands.`,
          type: 'error'
        });
        break;
    }

    history = newLogs;
    inputVal = '';
    setTimeout(scrollToBottom, 50);
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      e.preventDefault();
      runCmd(inputVal);
    }
  }
</script>

<section id="cli" class="py-16">
  <Heading 
    heading="Command Terminal" 
    subheading="Interactive CLI Interface" 
    subicon="fas fa-terminal" 
  />

  <p class="text-center font-medium text-sm sm:text-base mt-2 mb-8 leading-relaxed max-w-xl mx-auto text-neutral-400 px-4">
    Query system commands, developer skills, and project telemetry directly from the interactive shell.
  </p>

  <div class="max-w-4xl mx-auto px-4">
    <!-- Quick Command Pill Buttons -->
    <div class="flex flex-wrap gap-2 justify-center mb-4">
      <span class="text-xs text-neutral-400 self-center mr-1 font-mono">Quick Run:</span>
      {#each ['help', 'about', 'skills', 'projects', 'contact', 'theme', 'clear'] as qCmd}
        <button
          type="button"
          on:click={() => runCmd(qCmd)}
          class="px-3 py-1 text-xs font-mono font-semibold rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-all hover:scale-105"
        >
          {qCmd}
        </button>
      {/each}
    </div>

    <!-- Terminal Window Container -->
    <div class="glass-card rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black/90">
      <!-- Window Titlebar -->
      <div class="px-5 py-3 bg-neutral-900/90 border-b border-white/10 flex justify-between items-center">
        <div class="flex items-center gap-2">
          <span class="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
          <span class="w-3 h-3 rounded-full bg-yellow-500/80 inline-block"></span>
          <span class="w-3 h-3 rounded-full bg-green-500/80 inline-block"></span>
          <span class="font-mono text-xs text-neutral-400 ml-2">bash - visitor@nur-bashori-cli:~</span>
        </div>
        <div class="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
          <i class="fas fa-terminal text-xs"></i>
          <span>BASH 5.2</span>
        </div>
      </div>

      <!-- Terminal Output Screen -->
      <div
        bind:this={terminalBoxRef}
        class="font-mono p-5 min-h-[260px] max-h-[360px] overflow-y-auto text-xs sm:text-sm leading-relaxed text-neutral-200"
      >
        {#each history as item}
          <div
            class={`mb-2.5 whitespace-pre-wrap ${
              item.type === 'user'
                ? 'text-emerald-400 font-semibold'
                : item.type === 'error'
                ? 'text-red-400'
                : item.type === 'info'
                ? 'text-neutral-400'
                : item.type === 'system'
                ? 'text-cyan-400 font-bold'
                : 'text-neutral-200'
            }`}
          >
            {item.text}
          </div>
        {/each}

        <!-- Prompt Line -->
        <div class="flex items-center gap-2 mt-3 pt-2 border-t border-white/5">
          <span class="text-emerald-400 font-bold font-mono">visitor@nur-bashori:~$</span>
          <input
            type="text"
            bind:value={inputVal}
            on:keydown={handleKeyDown}
            placeholder="type 'help', 'skills', 'projects', 'contact'..."
            class="flex-1 bg-transparent border-none outline-none text-white font-mono text-xs sm:text-sm focus:ring-0"
          />
          <span class="text-xs text-neutral-500 font-mono hidden sm:inline">Press Enter ↵</span>
        </div>
      </div>
    </div>
  </div>
</section>
