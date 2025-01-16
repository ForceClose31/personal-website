<script lang="ts">
import { onMount } from 'svelte';
    import Button from "$lib/components/reusable/button.svelte";  
  import Typewriter from '$lib/components/reusable/typer.svelte';
    import Heading from '$lib/components/reusable/heading.svelte';
    interface TechStackItem {
        icon: string;
        name: string;
    }

    interface ProjectLinks {
        live?: string;   
        github?: string; 
    }

    interface Project {
        title: string;
        description: string;
        solves: string[];
        status: string;
        techStack: TechStackItem[];
        links: ProjectLinks;
        image?: string;      
    }

const projects: Project[] = [
    {
        title: 'Backend Roompi',
        description: 'This coding is the backend of a mobile application called roompi, this backend uses Laravel to be used as an API which will later be integrated into the mobile application.',
        solves: ['API Application', 'Course Application', 'Backend Roompi'],
        status: 'Completed',
        techStack: [
            { icon: 'php', name: 'PHP' },
            { icon: 'laravel', name: 'Laravel' }
        ],
        links: {
            github: 'https://github.com/ForceClose31/backend-roompi.git',
        },
        image: 'https://play-lh.googleusercontent.com/saDCIVTLBu7rZofJ9FypwO7KAQnZdEIcbWd-1wI5lZh_XIGliSm2noTUlGvqvK9Gws4=w480-h960-rw',
    },
    {
        title: 'Mantab',
        description: 'This great application is aimed at sheep farmers, where in this application farmers can monitor their sheep in an organized and regular manner.',
        solves: ['Mobile Application', 'Farmer Application', 'Flutter Project'],
        status: 'Completed',
        techStack: [
            { icon: 'flutter', name: 'Flutter' },
            { icon: 'dart', name: 'Dart' }
        ],
        links: {
            github: 'https://github.com/ForceClose31/Mantab.git',
        },
        image:
        'https://github.com/ForceClose31/template/blob/main/Sempol%20Sejahtera%201.png?raw=true',
    },
    {
        title: 'Subur',
        description: 'This Subur application is used by rice farmers so they can detect diseases in their rice plants and carry out early treatment and prevention on their rice plants.',
        solves: ['Mobile Application', 'Farmer Application', 'Machine Learning Integration'],
        status: 'Completed',
        techStack: [
            { icon: 'kotlin', name: 'Kotlin' },
            { icon: 'python', name: 'Python' },
            { icon: 'express', name: 'Express JS' },
        ],
        links: {
            live: 'https://youtube.com/shorts/8Nr7qW2GpMg?si=4WWVD0_ej_Y6kO3X',
            github: 'https://github.com/ForceClose31/subur.git',
        },
        image:
        'https://github.com/ForceClose31/subur/blob/main/Group%201.png?raw=true',
    },
    {
        title: 'Si-Klinik',
        description: 'Si-Klinik is a health website for health workers at the Jember Paru clinic, where on this website health workers can record patients, determine the type of disease, medication, and medical record history.',
        solves: ['Website Development', 'PHP', 'Medical Website'],
        status: 'Completed',
        techStack: [
            { icon: 'js', name: 'JavaScript' },
            { icon: 'laravel', name: 'Laravel' },
            { icon: 'php', name: 'PHP' },
        ],
        links: {
            github: 'https://github.com/ForceClose31/si-klinik.git',
        },
        image: 'https://github.com/ForceClose31/template/blob/main/s200_klinik%201.png?raw=true',
    },
    {
        title: 'Sortcoff',
        description: 'Sortcoff is a mobile application integrated with IOT with the function of sorting coffee beans according to color and size. This application is intended for coffee bean farmers who still have difficulty sorting their coffee beans.',
        solves: ['Mobile Application', 'Farmer Application', 'IOT Integration'],
        status: 'Completed',
        techStack: [
            { icon: 'flutter', name: 'Flutter' },
            { icon: 'dart', name: 'Dart' },
            { icon: 'c', name: 'C++' },
        ],
        links: {
            github: 'https://github.com/ForceClose31/sortcoff.git',
        },
        image: 'https://github.com/ForceClose31/template/blob/main/Sort_Coff-removebg-preview%201.png?raw=true',
    },
    {
        title: 'API Easy Vote',
        description: 'This Easy Vote API is used for the Easy Vote website and is integrated with blockchain with the aim of making the backend of this website implement the concept of decentralization when users vote on nominated candidates.',
        solves: ['API Integration', 'Blockchain', 'Backend Development'],
        status: 'Completed',
        techStack: [
            { icon: 'express', name: 'Express JS' },
        ],
        links: {
            github: 'https://github.com/ForceClose31/api-easy-vote.git',
        },
        image: 'https://alexanderfo.com/wp-content/uploads/2019/12/1139px-Cloud-API-Logo.svg_.png',
    },
    {
        title: 'HardHat Easy Vote',
        description: 'This is a continuation of the Easy Vote API where in this project there is a smart contract integrated with the blockchain using hardhat and solidity for the smart contract.',
        solves: ['Blockchain', 'Smart Contract', 'Solidity'],
        status: 'Completed',
        techStack: [
            { icon: 'javascript', name: 'Javascript' },
            { icon: 'solidity', name: 'Solidity' },
        ],
        links: {
            github: 'https://github.com/ForceClose31/easy-vote-hardhat.git',
        },
        image: 'https://raw.githubusercontent.com/codetesla51/web-site-files/main/images/fc1943b8-2cde-409e-b3a9-b6f5b7129ecf.jpeg',
    },
    {
        title: 'Linguabond',
        description: 'This application is used for English courses for children. This application also has a face-to-face meeting feature with a mentor and there is also a point system.',
        solves: ['Mobile Application', 'Course Application', 'Flutter Project'],
        status: 'Completed',
        techStack: [
            { icon: 'flutter', name: 'Flutter' },
            { icon: 'dart', name: 'Dart' },
        ],
        links: {
            github: 'https://github.com/ForceClose31/linguabond.git',
        },
        image: 'https://github.com/ForceClose31/template/blob/main/snapedit_1711770890291-removebg-preview%208.png?raw=true',
    },
];

    onMount(() => {
        new Swiper('.mySwiper2', {
            grabCursor: true,
            effect: 'creative',
            creativeEffect: {
                prev: {
                    shadow: true,
                    translate: ['-120%', 0, -500],
                },
                next: {
                    shadow: true,
                    translate: ['120%', 0, -500],
                },
            },
            slidesPerView: 'auto', 
            loop: false, 
            centeredSlides: true,
            speed: 600, 
            navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                640: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 1,
                },
                1024: {
                    slidesPerView: 1,
                },
            },
        });
    });
</script>



<section id="projects">
    <!-- Heading Component -->
<Heading 
    heading="Featured Projects" 
    subheading="Showing off my latest Projects" 
    subicon="fas fa-briefcase" 
/>
<Typewriter 
  Class="text-center font-medium text-xl mt-14 leading-relaxed"
  text="I have worked on many projects. Here are some of the projects I have completed. Swipe left or right or click the arrow buttons to navigate."
  typingSpeed={50}
  replay={false} 
/>
    <div class="swiper-container mySwiper2">
        <div class="swiper-wrapper " data-aos="fade-down">
            {#each projects as project}
                <div class="swiper-slide flex justify-center items-center">
                    
                    <div class="px-4 py-4 bg-bg rounded xl:w-[600px] w-[560px] md:w-[550px]  mt-24">
                        <div>
                            <h2 class="text-gradient text-4xl md-3 mt-3
                            font-black" data-aos="fade-right">{project.title}</h2>
                            
                            {#if project.image}
                                <img data-aos=fade-down class="tech-icon
                                h-[25rem] w-full  mt-4 mb-4 rounded"
                                    src={project.image}
                                    alt="Project Image" /> 
                            {:else}
                                <p class="text-red-500 mt-4 mb-4">Image not available</p>
                            {/if}

                            <p data-aos="zoom-in" class="mt-4 mb-4 leading-relaxed text-xl">{project.description}</p>
                        </div>
                        <div class="line w-full h-[1px] bg-br opacity-40"></div>
                        <div class="flex mt-4 mb-4" data-aos="fade-down">
                            <div class="flex items-center">
                                <p class="text-xl">Tags:</p>
                                <div class="flex justify-center gap-4 ml-4">
                                    {#each project.solves as solve}
                                        <p class="bgt text-base font-medium">{solve}</p>
                                    {/each}
                                </div>
                            </div>
                        </div>
                        <div class="flex justify-between items-center"
                        data-aos="fade-up">
                            <div class="flex items-center gap-3">
                                <p class="text-xl">Status:</p>
                                <p class={project.status === 'Completed' ? 'text-green-400' : 'text-yellow-400'}>
                                    {project.status}
                                </p>
                            </div>
                            <div>
                                <div class="flex items-center gap-3 mb-3 mt-3"
                                data-aos="fade-left">
                                    <p class="text-xl">Tech Stack:</p>
                                    <div class="flex justify-center gap-3">
                                        {#each project.techStack as stack}
                                            <div class="flex flex-col items-center">
                                                <img class="tech-icon w-[25px]"
                                                    src={`https://skillicons.dev/icons?i=${stack.icon}`}
                                                    alt={stack.name} />
                                            </div>
                                        {/each}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Buttons with Conditional Logic -->
                        <div class="flex gap-4 items-center mt-4 mb-4"
                        data-aos="fade-right">
                            <a href={project.links.live} target="_blank" rel="noopener noreferrer"><button 
                                class="w-[130px] px-3 h-[35px] text-white
                                disabled:opacity-40" 
                                on:click={() => window.open(project.links.live, '_blank')}
                                disabled={!project.links.live}
                            >
                                {project.links.live ? 'Live Demo' : 'Not Available'}
                            </button>
                            </a>
                            <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                            <button 
                                class="w-[130px] px-3 h-[35px] text-white
                                disabled:opacity-40" 
                                on:click={() => window.open(project.links.github, '_blank')}
                                disabled={!project.links.github}
                            >
                                {project.links.github ? 'GitHub Repo' : 'Not Available'}
                            </button>
                            </a>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
    </div>
    <div class="flex flex-col justify-center items-center">
<Typewriter 
  Class="text-center font-medium text-xl mt-14 leading-relaxed"
  text="Explore more of my work on GitHub. Click the button below to check it out."
  typingSpeed={50}
  replay={false} 
/>
      <Button
      text="Github"
      link="https://github.com/ForceCLose31"
      />

</div>

</section>
<style>
  .mySwiper2 {
    width: 100%;
    height: 100%;
    overflow: hidden; 
}

</style>