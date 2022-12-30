import React, { useState, useEffect } from 'react';

import AppBar from '../components/AppBar';
import Footer from '../components/Footer';

import Button from "../components/UI/Button"

/**
 * The first page a user sees when they visit the site. This page should be a simple description of the
 * product and a call to action to sign up for the beta.
 */
function Landing(props) {

    const [email, setEmail] = useState('');

    /**
     * Handle the call to action
     */
    const callToAction = () => { }

    return (
        <div>
            <AppBar/>
            <div>
                <section>
                <div className='p-20 justify-center h-screen'>
                    <div className='w-full rounded-md p-16 flex flex-col justify-center items-center'>
                        <h1 className='font-CerealXBd lg:text-5xl text-3xl mb-6 bg-gradient-to-r bg-clip-text text-transparent
                        from-emerald-500 via-indigo-500 to-emerald-500
                        animate-text'>[Header goes here]
                        </h1>
                        <p className='font-CerealBK text-slate-500 mb-8 lg:text-center lg:text-lg text-md'>
                            [Description goes here]
                        </p>
                        <button className='btn-primary mb-4' onClick={callToAction}>Call to action</button>
                        </div>
                </div>
                </section>

                <section class="py-10 bg-gray-50 sm:py-16 lg:py-24">
                    <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div class="max-w-xl mx-auto text-center">
                            <div class="inline-flex px-4 py-1.5 mx-auto rounded-full bg-gradient-to-r from-fuchsia-600 to-blue-600">
                                <p class="text-xs font-semibold tracking-widest text-white uppercase">130+ Handcoded Blocks</p>
                            </div>
                            <h2 class="mt-6 text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">Celebration helps you build beautiful website</h2>
                            <p class="mt-4 text-base leading-relaxed text-gray-600">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>
                        </div>

                        <div class="grid grid-cols-1 gap-5 mt-12 sm:grid-cols-3 lg:mt-20 lg:gap-x-12">
                            <div class="transition-all duration-200 bg-white hover:shadow-xl">
                                <div class="py-10 px-9">
                                    <svg class="w-16 h-16 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    <h3 class="mt-8 text-lg font-semibold text-black">Secured Payments</h3>
                                    <p class="mt-4 text-base text-gray-600">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>
                                </div>
                            </div>

                            <div class="transition-all duration-200 bg-white hover:shadow-xl">
                                <div class="py-10 px-9">
                                    <svg class="w-16 h-16 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                                    </svg>
                                    <h3 class="mt-8 text-lg font-semibold text-black">Secured Payments</h3>
                                    <p class="mt-4 text-base text-gray-600">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>
                                </div>
                            </div>

                            <div class="transition-all duration-200 bg-white hover:shadow-xl">
                                <div class="py-10 px-9">
                                    <svg class="w-16 h-16 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                    <h3 class="mt-8 text-lg font-semibold text-black">Secured Payments</h3>
                                    <p class="mt-4 text-base text-gray-600">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            
                <section class="py-10 bg-white sm:py-16 lg:py-24">
                    <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div class="max-w-2xl mx-auto text-center">
                            <h2 class="text-2xl font-bold text-gray-800 sm:text-4xl sm:leading-tight">Trusted by world class companies, design teams & popular designers</h2>
                        </div>

                        <div class="grid items-center max-w-4xl grid-cols-2 mx-auto mt-12 md:mt-20 md:grid-cols-4 gap-x-10 gap-y-16">
                            <div>
                                <img class="object-contain w-full h-6 mx-auto" src="https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-1.png" alt="" />
                            </div>

                            <div>
                                <img class="object-contain w-full h-8 mx-auto" src="https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-2.png" alt="" />
                            </div>

                            <div>
                                <img class="object-contain w-full h-8 mx-auto" src="https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-3.png" alt="" />
                            </div>

                            <div>
                                <img class="object-contain w-full mx-auto h-7" src="https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-4.png" alt="" />
                            </div>

                            <div class="hidden md:block">
                                <img class="object-contain w-full h-8 mx-auto" src="https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-5.png" alt="" />
                            </div>

                            <div class="hidden md:block">
                                <img class="object-contain w-full h-8 mx-auto" src="https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-6.png" alt="" />
                            </div>

                            <div class="hidden md:block">
                                <img class="object-contain w-full h-8 mx-auto" src="https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-7.png" alt="" />
                            </div>

                            <div class="hidden md:block">
                                <img class="object-contain w-full h-8 mx-auto" src="https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-8.png" alt="" />
                            </div>

                            <div class="hidden md:block">
                                <img class="object-contain w-full h-8 mx-auto" src="https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-9.png" alt="" />
                            </div>

                            <div class="hidden md:block">
                                <img class="object-contain w-full mx-auto h-7" src="https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-10.png" alt="" />
                            </div>

                            <div class="hidden md:block">
                                <img class="object-contain w-full h-8 mx-auto" src="https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-11.png" alt="" />
                            </div>

                            <div class="hidden md:block">
                                <img class="object-contain w-full h-8 mx-auto" src="https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-12.png" alt="" />
                            </div>
                        </div>

                        <div class="flex items-center justify-center mt-10 space-x-3 md:hidden">
                            <div class="w-2.5 h-2.5 rounded-full bg-blue-600 block"></div>
                            <div class="w-2.5 h-2.5 rounded-full bg-gray-300 block"></div>
                            <div class="w-2.5 h-2.5 rounded-full bg-gray-300 block"></div>
                        </div>

                        <p class="mt-10 text-base text-center text-gray-500 md:mt-20">and, 1000+ more companies</p>
                    </div>
                </section>

                <section class="py-10 bg-gray-50  sm:py-16 lg:py-24">
                    <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div class="grid grid-cols-1 gap-6 lg:gap-10 sm:grid-cols-2 md:grid-cols-3">
                            <div class="flex flex-col bg-white border border-gray-200 rounded-md">
                                <div class="flex flex-col justify-between flex-1 p-8">
                                    <div class="flex-1">
                                        <blockquote>
                                            <p class="text-lg text-gray-800">“You made it so simple. My new site is so much faster and easier to work with than my old site. I just choose the page, make the change and click save.”</p>
                                        </blockquote>
                                    </div>

                                    <div class="mt-8">
                                        <div class="w-full h-0 mb-8 border-t-2 border-gray-200 border-dotted"></div>
                                        <div class="flex items-center">
                                            <img class="flex-shrink-0 object-cover w-10 h-10 rounded-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/8/avatar-1.jpg" alt="" />
                                            <div class="ml-3">
                                                <p class="text-base font-semibold text-gray-800 truncate">Devon Lane</p>
                                                <p class="text-base text-gray-500 truncate">President of Sales</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="flex flex-col bg-white border border-gray-200 rounded-md">
                                <div class="flex flex-col justify-between flex-1 p-8">
                                    <div class="flex-1">
                                        <blockquote>
                                            <p class="text-lg text-gray-800">“Simply the best. Better than all the rest. I’d recommend this product to beginners and advanced users.”</p>
                                        </blockquote>
                                    </div>

                                    <div class="mt-8">
                                        <div class="w-full h-0 mb-8 border-t-2 border-gray-200 border-dotted"></div>
                                        <div class="flex items-center">
                                            <img class="flex-shrink-0 object-cover w-10 h-10 rounded-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/8/avatar-2.jpg" alt="" />
                                            <div class="min-w-0 ml-3">
                                                <p class="text-base font-semibold text-gray-800 truncate">Ronald Richards</p>
                                                <p class="text-base text-gray-500 truncate">Marketing Coordinator</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="flex flex-col bg-white border border-gray-200 rounded-md">
                                <div class="flex flex-col justify-between flex-1 p-8">
                                    <div class="flex-1">
                                        <blockquote>
                                            <p class="text-lg text-gray-800">“This is a top quality product. No need to think twice before making it live on web.”</p>
                                        </blockquote>
                                    </div>

                                    <div class="mt-8">
                                        <div class="w-full h-0 mb-8 border-t-2 border-gray-200 border-dotted"></div>
                                        <div class="flex items-center">
                                            <img class="flex-shrink-0 object-cover w-10 h-10 rounded-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/8/avatar-3.jpg" alt="" />
                                            <div class="min-w-0 ml-3">
                                                <p class="text-base font-semibold text-gray-800 truncate">Jane Cooper</p>
                                                <p class="text-base text-gray-500 truncate">Dog Trainer</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="flex flex-col bg-white border border-gray-200 rounded-md">
                                <div class="flex flex-col justify-between flex-1 p-8">
                                    <div class="flex-1">
                                        <blockquote>
                                            <p class="text-lg text-gray-800">“Finally, I’ve found a template that covers all bases for a bootstrapped startup. We were able to launch in days, not months.”</p>
                                        </blockquote>
                                    </div>

                                    <div class="mt-8">
                                        <div class="w-full h-0 mb-8 border-t-2 border-gray-200 border-dotted"></div>
                                        <div class="flex items-center">
                                            <img class="flex-shrink-0 object-cover w-10 h-10 rounded-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/8/avatar-4.jpg" alt="" />
                                            <div class="min-w-0 ml-3">
                                                <p class="text-base font-semibold text-gray-800 truncate">Theresa Webb</p>
                                                <p class="text-base text-gray-500 truncate">Web Designer</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="flex flex-col bg-white border border-gray-200 rounded-md">
                                <div class="flex flex-col justify-between flex-1 p-8">
                                    <div class="flex-1">
                                        <blockquote>
                                            <p class="text-lg text-gray-800">“My new site is so much faster and easier to work with than my old site. I just choose the page, make the change and click save.”</p>
                                        </blockquote>
                                    </div>

                                    <div class="mt-8">
                                        <div class="w-full h-0 mb-8 border-t-2 border-gray-200 border-dotted"></div>
                                        <div class="flex items-center">
                                            <img class="flex-shrink-0 object-cover w-10 h-10 rounded-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/8/avatar-5.jpg" alt="" />
                                            <div class="min-w-0 ml-3">
                                                <p class="text-base font-semibold text-gray-800 truncate">Darlene Robertson</p>
                                                <p class="text-base text-gray-500 truncate">Medical Assistant</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="flex flex-col bg-white border border-gray-200 rounded-md">
                                <div class="flex flex-col justify-between flex-1 p-8">
                                    <div class="flex-1">
                                        <blockquote>
                                            <p class="text-lg text-gray-800">“You made it so simple. My new site is so much faster and easier to work with than my old site. I just choose the page, make the change and click save.”</p>
                                        </blockquote>
                                    </div>

                                    <div class="mt-8">
                                        <div class="w-full h-0 mb-8 border-t-2 border-gray-200 border-dotted"></div>
                                        <div class="flex items-center">
                                            <img class="flex-shrink-0 object-cover w-10 h-10 rounded-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/8/avatar-6.jpg" alt="" />
                                            <div class="min-w-0 ml-3">
                                                <p class="text-base font-semibold text-gray-800 truncate">Floyd Miles</p>
                                                <p class="text-base text-gray-500 truncate">Nursing Assistant</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


                <section class="py-10 bg-white sm:py-16 lg:py-24">
                    <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div class="max-w-2xl mx-auto text-center">
                            <h2 class="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">Pricing & Plans</h2>
                            <p class="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis.</p>
                        </div>

                        <div class="grid max-w-md grid-cols-1 gap-6 mx-auto mt-8 text-center lg:max-w-full lg:mt-16 lg:grid-cols-3">
                            <div class="overflow-hidden bg-white border-2 border-gray-100 rounded-md">
                                <div class="p-8 xl:px-12">
                                    <h3 class="text-base font-semibold text-purple-600">Standard</h3>
                                    <p class="text-5xl font-bold text-black mt-7">$29</p>
                                    <p class="mt-3 text-base text-gray-600">One-time payment</p>

                                    <ul class="inline-flex flex-col items-start space-y-5 text-left mt-9">
                                        <li class="inline-flex items-center space-x-2">
                                            <svg class="flex-shrink-0 w-5 h-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                            </svg>
                                            <span class="text-base font-medium text-gray-900"> 1 Domain License </span>
                                        </li>

                                        <li class="inline-flex items-center space-x-2">
                                            <svg class="flex-shrink-0 w-5 h-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                            </svg>
                                            <span class="text-base font-medium text-gray-900"> Full Celebration Library </span>
                                        </li>

                                        <li class="inline-flex items-center space-x-2">
                                            <svg class="h-5 text-indigo-500 flex-shrink-0w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                            </svg>
                                            <span class="text-base font-medium text-gray-900"> 120+ Coded Blocks </span>
                                        </li>

                                        <li class="inline-flex items-center space-x-2">
                                            <svg class="h-5 text-indigo-500 flex-shrink-0w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                            </svg>
                                            <span class="text-base font-medium text-gray-900"> Design Files Included </span>
                                        </li>

                                        <li class="inline-flex items-center space-x-2">
                                            <svg class="flex-shrink-0 w-5 h-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                            </svg>
                                            <span class="pb-0.5 text-base font-medium text-gray-900 border-b border-black border-dashed"> Premium Support </span>
                                        </li>
                                    </ul>

                                    <a href="#" title="" class="inline-flex items-center justify-center px-10 py-4 mt-10 text-base font-semibold text-white transition-all duration-200 bg-blue-800 rounded-md hover:bg-blue-900 focus:bg-blue-900" role="button"> Get full access </a>
                                    <p class="mt-4 text-sm text-gray-500">14 Days Moneyback Guarantee</p>
                                </div>
                            </div>

                            <div class="overflow-hidden bg-white border-2 border-gray-100 rounded-md shadow-lg">
                                <div class="p-8 xl:px-12">
                                    <h3 class="text-base font-semibold text-purple-600">Professional</h3>
                                    <p class="text-5xl font-bold text-black mt-7">$49</p>
                                    <p class="mt-3 text-base text-gray-600">One-time payment</p>

                                    <ul class="inline-flex flex-col items-start space-y-5 text-left mt-9">
                                        <li class="inline-flex items-center space-x-2">
                                            <svg class="flex-shrink-0 w-5 h-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                            </svg>
                                            <span class="text-base font-medium text-gray-900"> 5 Domain License </span>
                                        </li>

                                        <li class="inline-flex items-center space-x-2">
                                            <svg class="flex-shrink-0 w-5 h-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                            </svg>
                                            <span class="text-base font-medium text-gray-900"> Full Celebration Library </span>
                                        </li>

                                        <li class="inline-flex items-center space-x-2">
                                            <svg class="flex-shrink-0 w-5 h-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                            </svg>
                                            <span class="text-base font-medium text-gray-900"> 120+ Coded Blocks </span>
                                        </li>

                                        <li class="inline-flex items-center space-x-2">
                                            <svg class="flex-shrink-0 w-5 h-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                            </svg>
                                            <span class="text-base font-medium text-gray-900"> Design Files Included </span>
                                        </li>

                                        <li class="inline-flex items-center space-x-2">
                                            <svg class="flex-shrink-0 w-5 h-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                            </svg>
                                            <span class="pb-0.5 text-base font-medium text-gray-900 border-b border-black border-dashed"> Premium Support </span>
                                        </li>
                                    </ul>

                                    <a href="#" title="" class="inline-flex items-center justify-center px-10 py-4 mt-10 text-base font-semibold text-white transition-all duration-200 rounded-md bg-gradient-to-r from-fuchsia-600 to-blue-800 hover:opacity-80 focus:opacity-80" role="button"> Get full access </a>
                                    <p class="mt-4 text-sm text-gray-500">14 Days Moneyback Guarantee</p>
                                </div>
                            </div>

                            <div class="overflow-hidden bg-white border-2 border-gray-100 rounded-md">
                                <div class="p-8 xl:px-12">
                                    <h3 class="text-base font-semibold text-purple-600">Exclusive</h3>
                                    <p class="text-5xl font-bold text-black mt-7">$79</p>
                                    <p class="mt-3 text-base text-gray-600">One-time payment</p>

                                    <ul class="inline-flex flex-col items-start space-y-5 text-left mt-9">
                                        <li class="inline-flex items-center space-x-2">
                                            <svg class="flex-shrink-0 w-5 h-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                            </svg>
                                            <span class="text-base font-medium text-gray-900"> Unlimited Domain License </span>
                                        </li>

                                        <li class="inline-flex items-center space-x-2">
                                            <svg class="flex-shrink-0 w-5 h-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                            </svg>
                                            <span class="text-base font-medium text-gray-900"> Full Celebration Library </span>
                                        </li>

                                        <li class="inline-flex items-center space-x-2">
                                            <svg class="flex-shrink-0 w-5 h-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                            </svg>
                                            <span class="text-base font-medium text-gray-900"> 120+ Coded Blocks </span>
                                        </li>

                                        <li class="inline-flex items-center space-x-2">
                                            <svg class="flex-shrink-0 w-5 h-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                            </svg>
                                            <span class="text-base font-medium text-gray-900"> Design Files Included </span>
                                        </li>

                                        <li class="inline-flex items-center space-x-2">
                                            <svg class="flex-shrink-0 w-5 h-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                            </svg>
                                            <span class="pb-0.5 text-base font-medium text-gray-900 border-b border-black border-dashed"> Premium Support </span>
                                        </li>
                                    </ul>

                                    <a href="#" title="" class="inline-flex items-center justify-center px-10 py-4 mt-10 text-base font-semibold text-white transition-all duration-200 bg-blue-800 rounded-md hover:bg-blue-900 focus:bg-blue-900" role="button"> Get full access </a>
                                    <p class="mt-4 text-sm text-gray-500">14 Days Moneyback Guarantee</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="py-10 bg-white sm:py-16 lg:py-24">
                    <div class="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                        <div class="max-w-2xl mx-auto text-center">
                            <h2 class="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">Frequently Asked Questions</h2>
                            <p class="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600">Amet minim mollit non deserunt ullamco est sit aliqua dolor do</p>
                        </div>

                        <div class="max-w-3xl mx-auto mt-8 space-y-4 md:mt-16">
                            <div class="transition-all duration-200 bg-white border border-gray-200 shadow-lg cursor-pointer hover:bg-gray-50">
                                <button type="button" class="flex items-center justify-between w-full px-4 py-5 sm:p-6">
                                    <span class="flex text-lg font-semibold text-black"> How to create an account? </span>

                                    <svg class="w-6 h-6 text-gray-400 rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                <div class="px-4 pb-5 sm:px-6 sm:pb-6">
                                    <p>Amet minim mollit non deserunt ullamco est sit <a href="#" title="" class="text-blue-600 transition-all duration-200 hover:underline">aliqua dolor</a> do amet sint. Velit officia consequat duis enim velit mollit.</p>
                                </div>
                            </div>

                            <div class="transition-all duration-200 bg-white border border-gray-200 cursor-pointer hover:bg-gray-50">
                                <button type="button" class="flex items-center justify-between w-full px-4 py-5 sm:p-6">
                                    <span class="flex text-lg font-semibold text-black"> How can I make payment using Paypal? </span>

                                    <svg class="w-6 h-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                <div class="hidden px-4 pb-5 sm:px-6 sm:pb-6">
                                    <p>Amet minim mollit non deserunt ullamco est sit <a href="#" title="" class="text-blue-600 transition-all duration-200 hover:underline">aliqua dolor</a> do amet sint. Velit officia consequat duis enim velit mollit.</p>
                                </div>
                            </div>

                            <div class="transition-all duration-200 bg-white border border-gray-200 cursor-pointer hover:bg-gray-50">
                                <div class="">
                                    <button type="button" class="flex items-center justify-between w-full px-4 py-5 sm:p-6">
                                        <span class="flex text-lg font-semibold text-black"> Can I cancel my plan? </span>

                                        <svg class="w-6 h-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>

                                    <div class="hidden px-4 pb-5 sm:px-6 sm:pb-6">
                                        <p>Amet minim mollit non deserunt ullamco est sit <a href="#" title="" class="text-blue-600 transition-all duration-200 hover:underline">aliqua dolor</a> do amet sint. Velit officia consequat duis enim velit mollit.</p>
                                    </div>
                                </div>
                            </div>

                            <div class="transition-all duration-200 bg-white border border-gray-200 cursor-pointer hover:bg-gray-50">
                                <button type="button" class="flex items-center justify-between w-full px-4 py-5 sm:p-6">
                                    <span class="flex text-lg font-semibold text-black"> How can I reach to support? </span>

                                    <svg class="w-6 h-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                <div class="hidden px-4 pb-5 sm:px-6 sm:pb-6">
                                    <p>Amet minim mollit non deserunt ullamco est sit <a href="#" title="" class="text-blue-600 transition-all duration-200 hover:underline">aliqua dolor</a> do amet sint. Velit officia consequat duis enim velit mollit.</p>
                                </div>
                            </div>
                        </div>

                        <p class="text-center text-gray-600 textbase mt-9">Didn’t find the answer you are looking for? <a href="#" title="" class="font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 focus:text-blue-700 hover:underline">Contact our support</a></p>
                    </div>
                </section>


                <section class="py-10 bg-gray-50 sm:pt-16 lg:pt-24">
                    <div class="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                        <div class="grid grid-cols-2 md:col-span-3 lg:grid-cols-6 gap-y-16 gap-x-12">
                            <div class="col-span-2 md:col-span-3 lg:col-span-2 lg:pr-8">
                                <img class="w-auto h-9" src="https://cdn.rareblocks.xyz/collection/celebration/images/logo.svg" alt="" />

                                <p class="text-base leading-relaxed text-gray-600 mt-7">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>

                                <ul class="flex items-center space-x-3 mt-9">
                                    <li>
                                        <a href="#" title="" class="flex items-center justify-center text-white transition-all duration-200 bg-gray-800 rounded-full w-7 h-7 hover:bg-blue-600 focus:bg-blue-600">
                                            <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                <path
                                                    d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"
                                                ></path>
                                            </svg>
                                        </a>
                                    </li>

                                    <li>
                                        <a href="#" title="" class="flex items-center justify-center text-white transition-all duration-200 bg-gray-800 rounded-full w-7 h-7 hover:bg-blue-600 focus:bg-blue-600">
                                            <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path>
                                            </svg>
                                        </a>
                                    </li>

                                    <li>
                                        <a href="#" title="" class="flex items-center justify-center text-white transition-all duration-200 bg-gray-800 rounded-full w-7 h-7 hover:bg-blue-600 focus:bg-blue-600">
                                            <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M11.999 7.377a4.623 4.623 0 1 0 0 9.248 4.623 4.623 0 0 0 0-9.248zm0 7.627a3.004 3.004 0 1 1 0-6.008 3.004 3.004 0 0 1 0 6.008z"></path>
                                                <circle cx="16.806" cy="7.207" r="1.078"></circle>
                                                <path
                                                    d="M20.533 6.111A4.605 4.605 0 0 0 17.9 3.479a6.606 6.606 0 0 0-2.186-.42c-.963-.042-1.268-.054-3.71-.054s-2.755 0-3.71.054a6.554 6.554 0 0 0-2.184.42 4.6 4.6 0 0 0-2.633 2.632 6.585 6.585 0 0 0-.419 2.186c-.043.962-.056 1.267-.056 3.71 0 2.442 0 2.753.056 3.71.015.748.156 1.486.419 2.187a4.61 4.61 0 0 0 2.634 2.632 6.584 6.584 0 0 0 2.185.45c.963.042 1.268.055 3.71.055s2.755 0 3.71-.055a6.615 6.615 0 0 0 2.186-.419 4.613 4.613 0 0 0 2.633-2.633c.263-.7.404-1.438.419-2.186.043-.962.056-1.267.056-3.71s0-2.753-.056-3.71a6.581 6.581 0 0 0-.421-2.217zm-1.218 9.532a5.043 5.043 0 0 1-.311 1.688 2.987 2.987 0 0 1-1.712 1.711 4.985 4.985 0 0 1-1.67.311c-.95.044-1.218.055-3.654.055-2.438 0-2.687 0-3.655-.055a4.96 4.96 0 0 1-1.669-.311 2.985 2.985 0 0 1-1.719-1.711 5.08 5.08 0 0 1-.311-1.669c-.043-.95-.053-1.218-.053-3.654 0-2.437 0-2.686.053-3.655a5.038 5.038 0 0 1 .311-1.687c.305-.789.93-1.41 1.719-1.712a5.01 5.01 0 0 1 1.669-.311c.951-.043 1.218-.055 3.655-.055s2.687 0 3.654.055a4.96 4.96 0 0 1 1.67.311 2.991 2.991 0 0 1 1.712 1.712 5.08 5.08 0 0 1 .311 1.669c.043.951.054 1.218.054 3.655 0 2.436 0 2.698-.043 3.654h-.011z"
                                                ></path>
                                            </svg>
                                        </a>
                                    </li>

                                    <li>
                                        <a href="#" title="" class="flex items-center justify-center text-white transition-all duration-200 bg-gray-800 rounded-full w-7 h-7 hover:bg-blue-600 focus:bg-blue-600">
                                            <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                <path
                                                    fill-rule="evenodd"
                                                    clip-rule="evenodd"
                                                    d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"
                                                ></path>
                                            </svg>
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <p class="text-sm font-semibold tracking-widest text-gray-400 uppercase">Company</p>

                                <ul class="mt-6 space-y-4">
                                    <li>
                                        <a href="#" title="" class="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> About </a>
                                    </li>

                                    <li>
                                        <a href="#" title="" class="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Features </a>
                                    </li>

                                    <li>
                                        <a href="#" title="" class="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Works </a>
                                    </li>

                                    <li>
                                        <a href="#" title="" class="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Career </a>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <p class="text-sm font-semibold tracking-widest text-gray-400 uppercase">Help</p>

                                <ul class="mt-6 space-y-4">
                                    <li>
                                        <a href="#" title="" class="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Customer Support </a>
                                    </li>

                                    <li>
                                        <a href="#" title="" class="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Delivery Details </a>
                                    </li>

                                    <li>
                                        <a href="#" title="" class="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Terms & Conditions </a>
                                    </li>

                                    <li>
                                        <a href="#" title="" class="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Privacy Policy </a>
                                    </li>
                                </ul>
                            </div>

                            <div class="col-span-2 md:col-span-1 lg:col-span-2 lg:pl-8">
                                <p class="text-sm font-semibold tracking-widest text-gray-400 uppercase">Subscribe to newsletter</p>

                                <form action="#" method="POST" class="mt-6">
                                    <div>
                                        <label for="email" class="sr-only">Email</label>
                                        <input type="email" name="email" id="email" placeholder="Enter your email" class="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600" />
                                    </div>

                                    <button type="submit" class="inline-flex items-center justify-center px-6 py-4 mt-3 font-semibold text-white transition-all duration-200 bg-blue-800 rounded-md hover:bg-blue-700 focus:bg-blue-900">Subscribe</button>
                                </form>
                            </div>
                        </div>

                        <hr class="mt-16 mb-10 border-gray-200" />

                        <p class="text-sm text-center text-gray-600">© Copyright 2023, All Rights Reserved by [COMPANY NAME]</p>
                    </div>
                </section>
                </div>
            {/* <Footer /> */}
        </div>
    );
}

export default Landing;
