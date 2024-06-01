<script setup>

</script>

<template>
    <div class="max-w-lg w-full">
        <div style="box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);"
             class="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
            <div class="p-8">
                <h2 class="text-center text-3xl font-extrabold text-white">
                    Welcome Back
                </h2>
                <p class="mt-4 text-center text-gray-400">Sign in to continue</p>
                <form method="POST" action="#" class="mt-8 space-y-6">
                    <div class="rounded-md shadow-sm">
                        <div>
                            <label class="text-gray-200" for="email">Email address</label>
                            <input
                                    class="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Please input your username" :required="true" autocomplete="email" type="email" name="email"
                                    id="email"/>
                        </div>
                        <div class="mt-4">
                            <label class="text-gray-200" for="password">Password</label>
                            <input class="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                   placeholder="Please input your password" required="" autocomplete="current-password" type="password"
                                   name="password" id="password"
                            />
                        </div>
                    </div>
                    <div>
                        <p-button
                                class="dark:text-gray-200 group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-gray-900 bg-indigo-500 hover:bg-indigo-600"
                                type="submit" label="Sign In" color="rgb(241, 245, 249)">
                            Sign In
                        </p-button>
                    </div>
                </form>
            </div>
            <div class="px-8 py-4 bg-gray-700 text-center">
                <span class="text-gray-400">Powered by DevRunner</span>
                <a class="font-medium text-indigo-500 hover:text-indigo-400" href="#"> ACM1PT</a>
            </div>
        </div>
    </div>

</template>
